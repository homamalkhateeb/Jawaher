import { useState } from 'react'

import type { TouchEvent } from 'react'

import type { ProductImage } from '../types/product'


type UseProductGalleryResult = {
  selectedImageIndex: number
  selectedImage: ProductImage | null
  hasImages: boolean
  showPreviousImage: () => void
  showNextImage: () => void
  selectImage: (index: number) => void
  handleTouchStart: (
    event: TouchEvent<HTMLDivElement>
  ) => void
  handleTouchMove: (
    event: TouchEvent<HTMLDivElement>
  ) => void
  handleTouchEnd: () => void
}


export function useProductGallery(
  images: ProductImage[]
): UseProductGalleryResult {

  const [selectedImageIndex, setSelectedImageIndex] =
    useState(() => {

      const mainImageIndex =
        images.findIndex(
          (image) => image.is_main
        )

      return mainImageIndex >= 0
        ? mainImageIndex
        : 0

    })


  const [touchStartX, setTouchStartX] =
    useState<number | null>(null)


  const [touchEndX, setTouchEndX] =
    useState<number | null>(null)


  const hasImages =
    images.length > 0


  const safeImageIndex =
    hasImages &&
    selectedImageIndex >= 0 &&
    selectedImageIndex < images.length
      ? selectedImageIndex
      : 0


  const selectedImage =
    hasImages
      ? images[safeImageIndex]
      : null


  function showPreviousImage() {

    const imagesCount =
      images.length


    if (imagesCount <= 1) {
      return
    }


    setSelectedImageIndex(
      (currentIndex) => {

        if (currentIndex <= 0) {
          return imagesCount - 1
        }

        return currentIndex - 1

      }
    )

  }


  function showNextImage() {

    const imagesCount =
      images.length


    if (imagesCount <= 1) {
      return
    }


    setSelectedImageIndex(
      (currentIndex) => {

        if (
          currentIndex >=
          imagesCount - 1
        ) {
          return 0
        }

        return currentIndex + 1

      }
    )

  }


  function selectImage(
    index: number
  ) {

    if (
      index < 0 ||
      index >= images.length
    ) {
      return
    }


    setSelectedImageIndex(index)

  }


  function handleTouchStart(
    event: TouchEvent<HTMLDivElement>
  ) {

    setTouchEndX(null)

    setTouchStartX(
      event.touches[0].clientX
    )

  }


  function handleTouchMove(
    event: TouchEvent<HTMLDivElement>
  ) {

    setTouchEndX(
      event.touches[0].clientX
    )

  }


  function handleTouchEnd() {

    if (
      touchStartX === null ||
      touchEndX === null
    ) {
      return
    }


    const distance =
      touchStartX - touchEndX


    const minimumSwipeDistance =
      50


    if (
      Math.abs(distance) <
      minimumSwipeDistance
    ) {

      setTouchStartX(null)
      setTouchEndX(null)

      return
    }


    if (distance > 0) {
      showNextImage()
    } else {
      showPreviousImage()
    }


    setTouchStartX(null)
    setTouchEndX(null)

  }


  return {
    selectedImageIndex: safeImageIndex,
    selectedImage,
    hasImages,
    showPreviousImage,
    showNextImage,
    selectImage,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  }

}