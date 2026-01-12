"use client"

import { useEffect, useState } from "react"

const slides = [
  {
    title: `Welcome to Our  ${process.env.NEXT_PUBLIC_SITE_NAME} formally known as solid rock investment`,
    subtitle: "Trade Smarter, Not Harder",
    description: "Join the next-generation trading platform designed for both beginners and pros...",
    video: "./bg3.mp4",
  },
  {
    title: "Learn with Experts",
    subtitle: "Global Access, Local Advantage",
    description: "With multi-currency wallets, market insights in your language...",
    video: "./bg1.mp4",
  },
  {
    title: "Security You Can Trust",
    subtitle: "",
    description: "Our platform uses advanced encryption, biometric login, and cold wallet storage...",
    video: "./bg2.mp4",
  },
]

export default function VideoSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full overflow-hidden h-fit max-h-[590px] flex md:items-center max-md:items-start shadow-lg">
      <div className="overflow-hidden bg-black relative w-full">
        <div
          className="flex transition-transform max-md:h-[100vh] max-md:py-4 duration-700 ease-in-out w-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="relative w-full flex-shrink-0">
              <video className="w-full h-full object-cover" muted autoPlay playsInline loop>
                <source src={slide.video} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start p-6 space-y-3 fade-in text-white">
                <h1 className="text-2xl md:text-4xl font-bold">{slide.title}</h1>
                {slide.subtitle && <h2 className="text-2xl md:text-3xl font-bold">{slide.subtitle}</h2>}
                <p className="text-gray-300 md:text-lg max-w-xl">{slide.description}</p>
                <a
                  href="/register"
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                  Register Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
