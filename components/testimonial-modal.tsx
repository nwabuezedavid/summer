"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

const testimonials = [
  {
    name: "David",
    img: "https://randomuser.me/api/portraits/men/75.jpg",
    invested: "$900",
    received: "$1,170",
    plan: "Basic Plan",
  },
  {
    name: "Lisa",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    invested: "$3,500",
    received: "$5,500",
    plan: "Executive Plan",
  },
  {
    name: "James",
    img: "https://randomuser.me/api/portraits/men/35.jpg",
    invested: "$32,000",
    received: "$45,000",
    plan: "Platinum Plan",
  },
]

export default function TestimonialModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(testimonials[0])

  useEffect(() => {
    const timer = setTimeout(() => {
      const random = testimonials[Math.floor(Math.random() * testimonials.length)]
      setCurrentTestimonial(random)
      setIsOpen(true)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-md p-6 testimonial-modal relative">
        <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
          <X size={24} />
        </button>

        <div className="flex flex-col items-center">
          <img
            src={currentTestimonial.img || "/placeholder.svg"}
            alt={currentTestimonial.name}
            className="w-24 h-24 rounded-full border-4 border-indigo-600 mb-4"
          />
          <h2 className="text-xl font-bold text-gray-800">{currentTestimonial.name} just got paid!</h2>
          <p className="text-center mt-3 text-gray-600 text-sm">
            {currentTestimonial.name} invested{" "}
            <span className="font-semibold text-green-600">{currentTestimonial.invested}</span> using the{" "}
            <span className="font-semibold text-indigo-600">{currentTestimonial.plan}</span> and just received{" "}
            <span className="font-semibold text-green-600">{currentTestimonial.received}</span> — straight to their
            wallet.
          </p>
          <a
            href="/register"
            className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg"
          >
            Start Investing Now
          </a>
        </div>
      </div>
    </div>
  )
}
