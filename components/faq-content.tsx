"use client"

import { useState } from "react"
import { ChevronDown, Search } from "lucide-react"

const faqData = [
  {
    category: "invest",
    question: "What is this investment platform all about?",
    answer:
      "We offer fixed-term crypto investment plans with guaranteed profit. Select a plan, invest using crypto, and receive your return when the term ends.",
  },
  {
    category: "invest",
    question: "How does the profit system work?",
    answer:
      "Each plan displays a profit percentage. At the end of the term, your original crypto investment plus the promised profit is returned to your wallet.",
  },
  {
    category: "invest",
    question: "When will I get my returns?",
    answer:
      "Returns are processed automatically in crypto at the end of your plan's term and credited to your dashboard wallet.",
  },
  {
    category: "account",
    question: "Do I need to upload ID or documents?",
    answer:
      "No, this platform does not require government ID upload. You only need to fill your name, email, and crypto wallet details to get started.",
  },
  {
    category: "account",
    question: "Is 2FA required?",
    answer: "No, two-factor authentication is not required, but you may enable it optionally for additional security.",
  },
  {
    category: "payments",
    question: "What payment methods do you accept?",
    answer:
      "We accept crypto only. You can deposit with Bitcoin (BTC), Ethereum (ETH), Tether (USDT), and Binance Coin (BNB).",
  },
  {
    category: "payments",
    question: "How fast are crypto withdrawals?",
    answer: "Withdrawals in crypto are processed within 1–2 hours and sent to your provided wallet address.",
  },
]

export default function FAQContent() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filteredFaqs =
    selectedCategory === "all" ? faqData : faqData.filter((item) => item.category === selectedCategory)

  return (
    <>
      {/* Search Bar */}
      <section className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-6">
          <div className="flex items-center">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-black">Frequently Asked Questions</h2>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {["all", "account", "invest", "payments"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category === "all"
                ? "All Questions"
                : category === "account"
                  ? "Account & Profile"
                  : category === "invest"
                    ? "Investments"
                    : "Crypto & Payments"}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-300 rounded-md shadow-sm">
              <button
                onClick={() => setExpandedId(expandedId === idx ? null : idx)}
                className="w-full text-left p-4 flex justify-between items-center font-medium text-gray-800 hover:bg-gray-50"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform ${expandedId === idx ? "rotate-180" : ""}`}
                />
              </button>
              {expandedId === idx && <div className="px-4 pb-4 text-gray-600">{item.answer}</div>}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
