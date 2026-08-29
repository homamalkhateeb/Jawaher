import type {
  ProductImage,
} from '../../../types/product'

import {
  useProductGallery,
} from '../../../hooks/useProductGallery'


type ProductGalleryProps = {
  images: ProductImage[]
  productTitle: string
}


function ProductGallery({
  images,
  productTitle,
}: ProductGalleryProps) {

  const {
    selectedImageIndex,
    selectedImage,
    hasImages,
    showPreviousImage,
    showNextImage,
    selectImage,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useProductGallery(images)


  return (
    <div className="product-details-gallery">

      <div className="product-details-image-wrapper">

        <div
          className="product-details-image"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >

          {selectedImage ? (

            <img
              key={selectedImage.id}
              src={selectedImage.image}
              alt={productTitle}
            />

          ) : (

            <div className="product-details-no-image">
              لا توجد صورة لهذا المنتج
            </div>

          )}

        </div>


        {hasImages &&
          images.length > 1 && (

          <>

            <button
              type="button"
              className="product-details-gallery-button product-details-gallery-button-prev"
              onClick={showPreviousImage}
              aria-label="الصورة السابقة"
            >
              ←
            </button>


            <button
              type="button"
              className="product-details-gallery-button product-details-gallery-button-next"
              onClick={showNextImage}
              aria-label="الصورة التالية"
            >
              →
            </button>

          </>

        )}


        {hasImages &&
          images.length > 1 && (

          <span className="product-details-image-counter">

            {selectedImageIndex + 1}

            {' / '}

            {images.length}

          </span>

        )}

      </div>


      {images.length > 1 && (

        <div className="product-details-thumbnails-wrapper">

          <div
            className="product-details-thumbnails"
            aria-label="صور المنتج"
          >

            {images.map(
              (image, index) => (

              <button
                key={image.id}
                type="button"
                aria-label={`عرض صورة ${
                  index + 1
                } من ${productTitle}`}
                aria-pressed={
                  selectedImageIndex === index
                }
                className={`product-details-thumbnail ${
                  selectedImageIndex === index
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  selectImage(index)
                }
              >

                <img
                  src={image.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />

              </button>

            )
            )}

          </div>

        </div>

      )}

    </div>
  )
}


export default ProductGallery
