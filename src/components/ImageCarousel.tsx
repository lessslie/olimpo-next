'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

interface ImageCarouselProps {
  images: {
    url: string;
    alt: string;
  }[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full h-[400px] relative">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="h-[400px] relative">
            <div className="relative w-full h-full">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="100vw"
                priority={index === 0}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
