"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-black p-4 relative z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-white text-lg trucate max-sm:text-[80%] word-wrap font-semibold">
           {process.env.NEXT_PUBLIC_SITE_NAME}
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-4 items-center">
            <li>
              <Link href="/" className="text-gray-300 hover:text-white">
                HOME
              </Link>
            </li>
            <li>
              <Link href="/#planxs" className="text-gray-300 hover:text-white">
                INVESTMENTS PLANS
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-300 hover:text-white">
                ABOUT US
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-gray-300 hover:text-white">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-300 hover:text-white">
                CONTACT US
              </Link>
            </li>
          </ul>

          {/* Auth Buttons */}
          <ul className="hidden md:flex space-x-4 items-center">
            <li>
              <Link href="/login" className="bg-blue-100 text-red-600 hover:bg-red-500 hover:text-white p-2 rounded-sm">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="text-gray-300 hover:text-white bg-red-500 px-4 py-2 rounded">
                Register
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-red-500 hover:text-red-300 p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <ul className="md:hidden flex flex-col gap-4 mt-4 bg-black p-3 rounded">
            <li>
              <Link href="/" className="text-gray-300 hover:text-white block">
                HOME
              </Link>
            </li>
            <li>
              <Link href="/#planxs" className="text-gray-300 hover:text-white block">
                INVESTMENTS PLANS
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-300 hover:text-white block">
                ABOUT US
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-gray-300 hover:text-white block">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-300 hover:text-white block">
                CONTACT US
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-gray-300 hover:text-white block">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="text-gray-300 hover:text-white block">
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>

    </nav>
  )
}
