"use client";

import { ChangeEvent } from "react";
import { useService } from "./useService";

export const ProductInfoForm: React.FC = () => {
  const {
    handleImageSlotClick,
    backToOriginal,
    closeImageModal,
    enhanceImage,
    handleFileInputClick,
    modalState,
    optimizeProductInfo,
    previewImage,
    saveImage,
    updateCharCount,
    productData,
    updateProductData,
    isOptimizing,
    images,
    openImageUpload,
    fileInputRef,
    isEnhancing,
  } = useService();

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-white p-5 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Informasi Produk</h1>
        </div>

        {/* Form Container */}
        <div className="p-5">
          {/* Product Information Section */}
          <div className="mb-8">
            <div className="flex gap-8 mb-5">
              {/* Product Name */}
              <div className="flex-1">
                <label
                  htmlFor="productName"
                  className="block mb-1 font-bold text-gray-800"
                >
                  Nama Produk
                  <span className="text-red-500 text-xs bg-red-50 px-2 py-1 rounded ml-2">
                    Wajib
                  </span>
                </label>
                <input
                  id="productName"
                  type="text"
                  value={productData.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateProductData("name", e.target.value)
                  }
                  className="w-full p-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Contoh: Laptop Multimedia ABC"
                  maxLength={100}
                />
                <div className="text-right text-xs text-gray-600 mt-1">
                  {updateCharCount(productData.name, 100)}
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-3 flex items-center gap-3">
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    !
                  </div>
                  <div className="text-sm">
                    Nama produk min. 5 karakter dengan menyebutkan merek, jenis
                    produk, warna, bahan, atau tipe. Disarankan untuk tidak
                    menggunakan huruf kapital berlebih, menyebutkan lebih dari 1
                    merek, dan kata-kata promosi.
                  </div>
                </div>
              </div>

              {/* Product Category */}
              <div className="flex-1">
                <label
                  htmlFor="productCategory"
                  className="block mb-1 font-bold text-gray-800"
                >
                  Kategori Produk
                  <span className="text-red-500 text-xs bg-red-50 px-2 py-1 rounded ml-2">
                    Wajib
                  </span>
                </label>
                <input
                  id="productCategory"
                  type="text"
                  value={productData.category}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateProductData("category", e.target.value)
                  }
                  className="w-full p-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Cari Kategori Produk"
                />
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-3 flex items-center gap-3">
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    !
                  </div>
                  <div className="text-sm">
                    Pastikan Anda telah memilih kategori produk dengan benar,
                    agar produk Anda lebih mudah ditemukan oleh pembeli.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-8 mb-5">
              {/* Product Description */}
              <div className="flex-1">
                <label
                  htmlFor="productDescription"
                  className="block mb-1 font-bold text-gray-800"
                >
                  Deskripsi Produk
                  <span className="text-red-500 text-xs bg-red-50 px-2 py-1 rounded ml-2">
                    Wajib
                  </span>
                </label>
                <textarea
                  id="productDescription"
                  value={productData.description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    updateProductData("description", e.target.value)
                  }
                  rows={4}
                  className="w-full p-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Contoh: Laptop ABC Cocok Untuk Multimedia"
                  maxLength={2000}
                />
                <div className="text-right text-xs text-gray-600 mt-1">
                  {updateCharCount(productData.description, 2000)}
                </div>
              </div>

              {/* Product Brand */}
              <div className="flex-1">
                <label
                  htmlFor="productBrand"
                  className="block mb-1 font-bold text-gray-800"
                >
                  Brand Produk
                  <span className="text-gray-600 text-xs bg-gray-100 px-2 py-1 rounded ml-2">
                    Opsional
                  </span>
                </label>
                <input
                  id="productBrand"
                  type="text"
                  value={productData.brand}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateProductData("brand", e.target.value)
                  }
                  className="w-full p-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Brand produk, (maksimal 20 karakter)"
                  maxLength={20}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={optimizeProductInfo}
              disabled={isOptimizing}
              className="bg-blue-500 text-white px-8 py-3 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isOptimizing ? "Optimizing..." : "Enhance AI"}
            </button>
          </div>

          {/* Media Section */}
          <div className="border-t border-gray-200 pt-5">
            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Media Produk
            </h2>

            {/* Photo Upload */}
            <div>
              <label className="block mb-3 font-bold text-gray-800">
                Foto Produk
                <span className="text-red-500 text-xs bg-red-50 px-2 py-1 rounded ml-2">
                  Wajib
                </span>
              </label>
              <div className="grid grid-cols-5 gap-4 mb-5">
                {images.map((image: string | null, index: number) => (
                  <div
                    key={index}
                    onClick={() => openImageUpload(index)}
                    className={`aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors relative ${
                      image ? "border-solid p-0" : ""
                    }`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        openImageUpload(index);
                      }
                    }}
                  >
                    {image ? (
                      <>
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={handleImageSlotClick(index)}
                          className="absolute bottom-1 right-1 bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                        >
                          Enhance AI
                        </button>
                      </>
                    ) : (
                      <div className="text-xs text-gray-600 text-center">
                        Foto {index + 1}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-600">
                Gambar yang diunggah pertama akan digunakan sebagai default
                image. Pilih hingga 5 Gambar. Produk wajib memiliki minimal 1
                gambar. Resolusi min. 1000 x 1000 px, ukuran disarankan 1 MB
                (maksimal 5 MB), dengan format gambar JPG/PNG.
              </div>
            </div>

            {/* Video Upload */}
            {/* <div className="mt-8">
              <label className="block mb-3 font-bold text-gray-800">
                Video Produk
                <span className="text-gray-600 text-xs bg-gray-100 px-2 py-1 rounded ml-2">
                  Opsional
                </span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-blue-500 transition-colors">
                <div className="text-4xl mb-4">📹</div>
                <div className="mb-2">Klik untuk upload Video</div>
                <div className="text-xs text-gray-600">
                  Video maksimum 10MB dengan format MPEG, MP4, AVI, Quicktime,
                  dan lainnya.
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-5 w-4/5 max-w-2xl max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold">Upload Image</h3>
              <button
                type="button"
                onClick={closeImageModal}
                className="text-2xl text-gray-400 hover:text-black cursor-pointer"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* Image Preview */}
            <div className="text-center mb-5">
              {modalState.currentImageData ? (
                <img
                  src={modalState.currentImageData}
                  alt="Preview"
                  className="max-w-full max-h-96 rounded-lg shadow-lg mx-auto"
                />
              ) : (
                <p className="text-gray-600">Select an image to preview</p>
              )}
            </div>

            {/* Loading */}
            {isEnhancing && (
              <div className="text-center p-5">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-3"></div>
                <p>Enhancing image...</p>
              </div>
            )}

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={previewImage}
              className="hidden"
            />

            {/* Modal Buttons */}
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={handleFileInputClick}
                className="px-5 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Browse File
              </button>
              <button
                type="button"
                onClick={enhanceImage}
                disabled={!modalState.originalImage || isEnhancing}
                className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Enhance AI
              </button>
              <button
                type="button"
                onClick={backToOriginal}
                disabled={!modalState.isEnhanced}
                className="px-5 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Back to Original
              </button>
              <button
                type="button"
                onClick={saveImage}
                className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
