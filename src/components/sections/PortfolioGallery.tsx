"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function PortfolioGallery({ images }: { images: string[] }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      loop
      speed={600}
      autoplay={{ delay: 5000 }}
      slidesPerView={1}
      pagination={{ clickable: true }}
      className="overflow-hidden rounded-[8px]"
    >
      {images.map((src) => (
        <SwiperSlide key={src}>
          <Image
            src={src}
            alt="Portfolio project screenshot"
            width={1200}
            height={800}
            className="aspect-[3/2] w-full object-cover"
            sizes="(min-width: 768px) 66vw, 100vw"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}