'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(images[0]);
  return (
    <div>
      <div className="card overflow-hidden">
        <Image src={active} alt={alt} width={1000} height={800} className="h-full w-full object-cover" priority />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {images.map((img) => (
          <button key={img} onClick={() => setActive(img)} className={`overflow-hidden rounded-xl border ${active===img?'border-brandGold':'border-black/10'}`}>
            <Image src={img} alt={alt} width={240} height={180} className="h-20 w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
