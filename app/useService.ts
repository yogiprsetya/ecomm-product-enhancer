import { ChangeEvent, useRef, useState } from "react";
import {
  ProductData,
  OptimizeResponse,
  EnhanceImageResponse,
  ModalState,
} from "./types";
import { apiClient } from "~/config/http-config";

export const useService = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    currentSlot: 0,
    originalImage: null,
    enhancedImage: null,
    currentImageData: null,
    isEnhanced: false,
  });

  const openImageUpload = (slotIndex: number): void => {
    setModalState({
      isOpen: true,
      currentSlot: slotIndex,
      originalImage: null,
      enhancedImage: null,
      currentImageData: null,
      isEnhanced: false,
    });
  };

  const handleImageSlotClick =
    (index: number) =>
    (e: React.MouseEvent): void => {
      e.stopPropagation();
      openImageUpload(index);
    };

  const closeImageModal = (): void => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
      originalImage: null,
      enhancedImage: null,
      currentImageData: null,
      isEnhanced: false,
    }));
  };

  const [productData, setProductData] = useState<ProductData>({
    name: "",
    category: "",
    description: "",
    brand: "",
  });

  // Image management state
  const [images, setImages] = useState<(string | null)[]>(Array(5).fill(null));

  // Modal state

  // Loading states
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [isEnhancing, setIsEnhancing] = useState<boolean>(false);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper functions
  const updateCharCount = (value: string, maxLength: number): string => {
    return `${value.length}/${maxLength}`;
  };

  const updateProductData = (field: keyof ProductData, value: string): void => {
    setProductData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // API call for product optimization
  const optimizeProductInfo = async (): Promise<void> => {
    setIsOptimizing(true);
    try {
      const formData = new FormData();
      formData.append("title", productData.name);
      formData.append("description", productData.description);
      formData.append("category", productData.category);

      const targetUrl = "https://agent.gabah.xyz/webhook/edit-product";

      const response = await apiClient.post<OptimizeResponse>(
        targetUrl,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update product data with optimized results
      setProductData((prev) => ({
        name: response.data.judul || prev.name,
        description: response.data.deskripsi || prev.description,
        category: response.data.kategori_produk || prev.category,
        brand: response.data.brand || prev.brand,
      }));

      alert("Product information optimized successfully!");
    } catch (error) {
      console.error("Error optimizing product info:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      if (errorMessage.includes("CORS")) {
        alert(
          "CORS error: The server needs to allow cross-origin requests. Please contact your backend developer to add CORS headers.",
        );
      } else {
        alert("Error optimizing product information: " + errorMessage);
      }
    } finally {
      setIsOptimizing(false);
    }
  };

  // Image handling functions
  const previewImage = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string;
        if (result) {
          setModalState((prev) => ({
            ...prev,
            originalImage: result,
            currentImageData: result,
            isEnhanced: false,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const enhanceImage = async (): Promise<void> => {
    if (!modalState.originalImage) return;

    setIsEnhancing(true);
    try {
      const response = await fetch(modalState.originalImage);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("image", blob);

      const targetUrl = "https://agent.gabah.xyz/webhook/generate-image";

      const enhanceResponse = await apiClient.post<EnhanceImageResponse>(
        targetUrl,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (enhanceResponse.status !== 200) {
        throw new Error(`HTTP error! status: ${enhanceResponse.status}`);
      }

      if (enhanceResponse.data.image) {
        const enhanced = `data:image/png;base64,${enhanceResponse.data.image}`;
        setModalState((prev) => ({
          ...prev,
          enhancedImage: enhanced,
          currentImageData: enhanced,
          isEnhanced: true,
        }));
        alert("Image enhanced successfully!");
      } else {
        alert("Failed to enhance image. Please try again.");
      }
    } catch (error) {
      console.error("Error enhancing image:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      if (errorMessage.includes("CORS")) {
        alert(
          "CORS error: The server needs to allow cross-origin requests. Please contact your backend developer to add CORS headers.",
        );
      } else {
        alert("Error enhancing image: " + errorMessage);
      }
    } finally {
      setIsEnhancing(false);
    }
  };

  const backToOriginal = (): void => {
    if (modalState.originalImage) {
      setModalState((prev) => ({
        ...prev,
        currentImageData: prev.originalImage,
        isEnhanced: false,
      }));
    }
  };

  const saveImage = (): void => {
    if (modalState.currentImageData) {
      const newImages = [...images];
      newImages[modalState.currentSlot] = modalState.currentImageData;
      setImages(newImages);
      closeImageModal();
    }
  };

  // Event handlers
  const handleFileInputClick = (): void => {
    fileInputRef.current?.click();
  };

  return {
    handleImageSlotClick,
    modalState,
    closeImageModal,
    saveImage,
    handleFileInputClick,
    backToOriginal,
    enhanceImage,
    previewImage,
    optimizeProductInfo,
    isOptimizing,
    isEnhancing,
    updateCharCount,
    updateProductData,
    productData,
    images,
    openImageUpload,
    fileInputRef,
  };
};
