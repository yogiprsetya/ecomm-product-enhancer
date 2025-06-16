export interface ProductData {
  name: string;
  category: string;
  description: string;
  brand: string;
}

export interface OptimizeResponse {
  judul?: string;
  deskripsi?: string;
  kategori_produk?: string;
  brand?: string;
}

export interface EnhanceImageResponse {
  image?: string;
}

export interface ModalState {
  isOpen: boolean;
  currentSlot: number;
  originalImage: string | null;
  enhancedImage: string | null;
  currentImageData: string | null;
  isEnhanced: boolean;
}
