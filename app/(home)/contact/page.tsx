"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  return (
    <main>
      <section
        className="px-8 py-8 lg:py-16 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-photo/closeup-businessman-using-mobile-phone_53876-14789.jpg?ga=GA1.1.753374989.1717678999&semt=ais_hybrid&w=740)",
        }}
      >
        <div className="container mx-auto text-center bg-black/60 p-4">
          <h5 className="block font-semibold text-base lg:text-2xl text-blue-gray-900 mb-4">Customer Care</h5>
          <h1 className="block font-semibold text-3xl lg:text-5xl text-blue-gray-900 mb-4">We're Here to Help</h1>
          <p className="block font-normal text-lg text-gray-100 mb-10 lg:mb-20 mx-auto max-w-3xl">
            Whether it's a question about our services, a request for technical assistance, or suggestions for
            improvement, our team is eager to hear from you.
          </p>
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
            <img
              src="https://media.istockphoto.com/id/1135177354/photo/contact-us-blue-keys-buttons-with-mail-and-phone-signs-on-a-computer-keyboard-banner-3d.jpg?b=1&s=612x612&w=0&k=20&c=_RmNNexVfpssjfxTNewuIUmb5LYvmcEsRAnn8sDxE0Y="
              alt="Contact"
              className="w-full h-full lg:max-h-[510px] rounded-lg"
            />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:max-w-sm">
              <p className="text-sm font-semibold text-white">Select Options for Business Engagement</p>
              <div className="flex gap-4">
                <button
                  type="button"
                  className="font-bold uppercase text-xs py-3 px-6 rounded-lg border border-gray-900 text-white hover:opacity-75 transition"
                >
                  General inquiry
                </button>
                <button
                  type="button"
                  className="font-bold uppercase text-xs py-3 px-6 rounded-lg border border-gray-900 text-white hover:opacity-75 transition"
                >
                  Product Support
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-gray-300 rounded-md px-3 py-3 text-white placeholder-gray-500 focus:border-gray-900 focus:border-2 outline-none"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-gray-300 rounded-md px-3 py-3 text-white placeholder-gray-500 focus:border-gray-900 focus:border-2 outline-none"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border border-gray-300 rounded-md px-3 py-3 text-white placeholder-gray-500 focus:border-gray-900 focus:border-2 outline-none"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-transparent border border-gray-300 rounded-md px-3 py-2.5 text-white placeholder-gray-500 focus:border-gray-900 focus:border-2 outline-none resize-none"
              />

              <button
                type="submit"
                className="font-bold uppercase text-xs py-3 px-6 rounded-lg bg-gray-900 text-white hover:shadow-lg transition w-full"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Contact Information</h2>

        <div className="bg-slate-100 p-6 rounded-lg border border-gray-300 mb-8">
          <p className="text-gray-600 mb-6">If you have questions or need support, please reach out to us:</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">General Inquiries</h3>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <Mail size={16} />
                <span>support@victoryarchiverstrade.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <p className="text-gray-600 text-sm">Hours: 24/7 Support Available</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">Data Protection Officer</h3>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <Mail size={16} />
                <span>privacy@victoryarchiverstrade.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <MapPin size={16} />
                <span>123 Trading Street, New York, NY 10004</span>
              </div>
            </div>
          </div>
        </div>

        {/* Updates Notice */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Policy Updates</h3>
          <p className="text-gray-700 text-sm">
            We may update our policies from time to time. We will notify you of any material changes via email or
            platform notification.
          </p>
        </div>
      </section>
    </main>
  )
}
