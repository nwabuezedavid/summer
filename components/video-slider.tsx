"use client"

import { useEffect, useState } from "react"

const slides = [
  {
    title: "Welcome to Our Platform",
    subtitle: "Trade Smarter, Not Harder",
    description: "Join the next-generation trading platform designed for both beginners and pros...",
    video: "https://videocdn.cdnpk.net/videos/d591b66b-f22e-4ffe-a6cc-d01d3bc05832/horizontal/previews/clear/large.mp4?token=exp=1767821487~hmac=1764eae3d4023436ad837abbe8b64f09de7ac98aecf4d6f80d7a483067a05644",
  },
  {
    title: "Learn with Experts",
    subtitle: "Global Access, Local Advantage",
    description: "With multi-currency wallets, market insights in your language...",
    video: "https://videocdn.cdnpk.net/videos/152e7d14-5f55-4027-9d67-c3db57e3e67c/horizontal/previews/clear/large.mp4?token=exp=1767821732~hmac=3909d797aa070c8c04ac23b02a0fb9761516d6847b0fb9ccad653f5210af3a61",
  },
  {
    title: "Security You Can Trust",
    subtitle: "",
    description: "Our platform uses advanced encryption, biometric login, and cold wallet storage...",
    video: "https://videocdn.cdnpk.net/videos/fc206a99-545f-59e6-8eea-8494d31da0ee/horizontal/previews/clear/large.mp4?token=exp=1767821802~hmac=f0a58ae0e3c46ebdffaef0d302d9904d3aa4cab9c915b6c926adcc314549436c",
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
