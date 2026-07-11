"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Room, formatPrice } from "@/lib/data";

interface HeroSliderProps {
    rooms: Room[];
}

export function HeroSlider({ rooms }: HeroSliderProps) {
    const [slide, setSlide] = useState(0);
    

    //auto rotate slider setiap 3 detik
    useEffect(() => {
        if(rooms.length === 0) return;
        const timer = setInterval(() => {
            setSlide((prev) => (prev + 1) % rooms.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [rooms.length]);

    if(rooms.length === 0) return null;
    
    return (
        <section className="relative w-full overflow-hidden" style={{height: 300}}>
            {rooms.map((room, i) => (
                <div
                    key={room.id}
                    className={`absolute inset-0 flex transititon-opacity duration-700 ${i === slide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                >
                    <Image
                        src={room.image}
                        alt={room.name}
                        className="w-1/2 object-cover"
                        width={800}
                        height={700}
                    />
                    <div className="w-1/2 flex flex-col justify-center px-12 gap-3 bg-purple">
                        <span className="text-xs font-semibold uppercase tracking-widest">
                            {room.category}
                        </span>
                        <h2 className="text-2xl font-bold">{room.name}</h2>
                        <p className="text-sm line-clamp-3">{room.description}</p>
                        <p className="text-xl font-bold">{formatPrice(room.price)}/hour</p>
                        <Link 
                            href={`/rooms/${room.id}`}
                            className="mt-2 w-fit text-sm px-6 py-2 rounded-full hover:opasity-700 transition"
                        >
                            More Details →
                        </Link>
                    </div>
                </div>
            ))};
                {/* dot indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {rooms.map((_, i) => (
                        <button 
                            key={i}
                            onClick={() => setSlide(i)}
                            className={`w-2 h-2 rounded-full transition-all ${i === slide ? "bg-lilac" : "bg-darkpurple"}`}
                        />
                    ))}
                </div>
            </section>
    );
}