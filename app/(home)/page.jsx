"use client"

import VideoSlider from "@/components/video-slider"
import TestimonialModal from "@/components/testimonial-modal"
import Link from "next/link"
import { Shield, TrendingUp, Headphones, Wallet } from "lucide-react"
import AppPlan from "@/components/investplan"
 
const stats = [
  { value: "15,000+", label: "Active investors" },
  { value: "2.5%", label: "Average monthly return" },
  { value: "99.99%", label: "Platform uptime" },
  { value: "$120M+", label: "Capital invested" },
]

export default function Home() {
const siteName = process.env.SITE_NAME;

  return (
    <main className="w-full">
      <TestimonialModal />

      {/* Video Slider Hero */}
      <VideoSlider />

      {/* Image Section */}
      <div className="w-full h-[650px]">
        <img
          src="https://res.cloudinary.com/devnawgxu/image/upload/fl_preserve_transparency/v1751222827/WhatsApp_Image_2025-06-26_at_12.42.44_975ccc6b_hbjhun.jpg?_s=public-apps"
          alt="Trading platform overview"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-indigo-400 font-semibold text-sm uppercase mb-2">Our track record</h3>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Trusted by thousands of investors globally
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto">
            With a focus on transparency, security, and performance, we've built a platform where investors can
            confidently grow their money.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <p className="text-3xl font-extrabold">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="w-full flex mt-[4%] max-md:flex-col-reverse text-black min-h-[400px] gap-4">
        <video className="w-1/2 max-md:w-full h-[300px] object-fill p-3" muted playsInline autoPlay loop>
          <source src="https://res.cloudinary.com/devnawgxu/video/upload/v1749721432/ff_sstutq.mp4" type="video/mp4" />
        </video>
        <div className="text-black p-4 flex flex-col w-1/2 max-md:w-full justify-center">
          <h1 className="font-bold text-3xl p-2 w-fit rounded-md uppercase">{siteName}</h1>
          <p className="text-gray-600 p-4">
            Grow Your Wealth with Confidence. Welcome to a smarter way to invest. Our platform lets you choose
            investment plans with specific durations and guaranteed profit returns. Whether you're saving for the short
            term or building long-term wealth, we make it easy, transparent, and secure.
          </p>
          <ul className="list-disc list-inside mt-3 text-sm text-gray-700 pl-4 space-y-1">
            <li>Intuitive, beginner-friendly interface</li>
            <li>Real-time market data and smart analytics</li>
            <li>Ultra-low trading fees and zero hidden charges</li>
            <li>Fully responsive — trade from any device</li>
            <li>Bank-level security and biometric login</li>
            <li>Global markets, local support</li>
          </ul>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="text-center">
              <Shield className="text-gray-400 mb-2 w-10 h-10 mx-auto" />
              <h3 className="font-semibold text-neutral-800">Secure Investments</h3>
            </div>
            <div className="text-center">
              <TrendingUp className="text-gray-400 mb-2 w-10 h-10 mx-auto" />
              <h3 className="font-semibold text-neutral-800">Performance Tracking</h3>
            </div>
            <div className="text-center">
              <Headphones className="text-gray-400 mb-2 w-10 h-10 mx-auto" />
              <h3 className="font-semibold text-neutral-800">24/7 Support</h3>
            </div>
            <div className="text-center">
              <Wallet className="text-gray-400 mb-2 w-10 h-10 mx-auto" />
              <h3 className="font-semibold text-neutral-800">Easy Withdrawals</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-5xl mx-auto mt-20 px-6 mb-20">
        <h2 className="text-4xl font-bold mb-10 text-center text-black">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-gray-900 rounded-lg p-8 shadow-lg hover:shadow-blue-600 transition-shadow">
            <div className="w-12 h-12 mb-4 text-blue-600">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v8" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Trusted & Secure</h3>
            <p className="text-gray-300">
              We prioritize your security with top-notch encryption and regulatory compliance.
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-8 shadow-lg hover:shadow-blue-600 transition-shadow">
            <div className="w-12 h-12 mb-4 text-blue-600">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Expert Guidance</h3>
            <p className="text-gray-300">Our seasoned advisors help you make informed investment decisions.</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-8 shadow-lg hover:shadow-blue-600 transition-shadow">
            <div className="w-12 h-12 mb-4 text-blue-600">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M9 6v12M15 6v12" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Transparent Fees</h3>
            <p className="text-gray-300">No hidden charges—what you see is what you get.</p>
          </div>
        </div>
      </section>

      {/* Investment Plans */}
      <section id="planxs" className="py-20 bg-gradient-to-b from-white to-neutral-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-800 mb-4 uppercase">Strategic Investment Plans</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Choose the investment strategy that aligns with your financial goals.
            </p>
          </div>

          <AppPlan/>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-purple-50 to-purple-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 uppercase">
            What Our Investors Are Saying
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                text: `I was skeptical at first, but after investing with ${process.env.NEXT_PUBLIC_SITE_NAME}, I've seen a significant increase in my returns. Their team is knowledgeable, responsive, and always available to answer my questions. I've been able to achieve my financial goals and feel more secure about my future. Thank you, ${process.env.NEXT_PUBLIC_SITE_NAME}!" - Emily R., Investor`,
                author: "Alex Murphy",
                handle: "@alexbuildswealth",
                image: "https://randomuser.me/api/portraits/men/33.jpg",
              },
              {
                text: `"I've been investing with ${process.env.NEXT_PUBLIC_SITE_NAME} for over a year now, and I'm blown away by their expertise and customer service. They've helped me diversify my portfolio and achieve consistent returns, even in a volatile market. I appreciate their transparency and willingness to explain complex concepts in a way that's easy to understand. Highly recommend!`,
                author: "Jessica Lee",
                handle: "@jessicaprofits",
                image: "https://randomuser.me/api/portraits/women/55.jpg",
              },
              {
                text: `I was hesitant to invest in cryptocurrency, but ${process.env.NEXT_PUBLIC_SITE_NAME} made it easy and accessible. Their platform is user-friendly, and their team is always available to help with any questions or concerns. I've seen impressive returns on my investment and feel confident in their ability to manage my assets. Thank you for making investing simple and stress-free!`,
                author: "Daniel Carter",
                handle: "@cartercapital",
                image: "https://randomuser.me/api/portraits/men/48.jpg",
              },
              {
                text: "Upgrading to the Platinum Plan was the best decision. I started with $35,000 and made significant gains.",
                author: "mark james",
                handle: "@cartercapital",
                image: "https://randomuser.me/api/portraits/men/48.jpg",
              },
              {
                text: `I've tried other investment platforms in the past, but none have compared to ${process.env.NEXT_PUBLIC_SITE_NAME}. Their team is dedicated, knowledgeable, and always puts their clients first. I've seen significant growth in my investments, and I appreciate their regular updates and insights. Highly recommend!`,
                author: "Rachel  daniel",
                handle: "@cartercapital",
                image: "https://randomuser.me/api/portraits/men/48.jpg",
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-700 mb-4">{testimonial.text}</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-500 text-sm">{testimonial.handle}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqFdjfjf/>
    </main>
  )
}
import React, { useState } from 'react';

const faqs = [
  {
    question: '1. What is this investment platform all about?',
    answer: 'We offer fixed-term investment plans with guaranteed profit. Select a plan, invest, and receive your return when the term ends.',
  },
  {
    question: '2. How does the profit system work?',
    answer: 'Each plan displays a profit percentage. At the end of the term, your original investment plus the promised profit is returned.',
  },
  {
    question: '3. Is my investment safe?',
    answer: 'Yes, we use bank-level security and only invest in low-risk, vetted opportunities. Your funds are safe and monitored 24/7.',
  },
  {
    question: '4. When will I get my returns?',
    answer: 'Returns are processed automatically at the end of the investment term and credited to your account balance.',
  },
  {
    question: '5. Can I withdraw before the term ends?',
    answer: 'Most plans are locked until maturity to ensure return stability. Some flexible plans allow early withdrawal with adjusted returns.',
  },
  {
    question: '6. What payment methods do you accept?',
    answer: 'We accept bank transfers, major credit/debit cards, and select cryptocurrencies including Bitcoin and USDT.',
  },
  {
    question: '7. How do I start investing?',
    answer: 'Simply create an account, verify your identity, deposit funds, and choose an investment plan to begin.',
  },
  {
    question: '8. Do I need investment experience?',
    answer: 'Not at all! Our platform is built for both beginners and experts. We guide you at every step.',
  },
  {
    question: '9. Are there any hidden fees?',
    answer: 'No. All fees are clearly displayed before you invest. Transparency is our priority.',
  },
  {
    question: '10. How do I contact support?',
    answer: 'You can reach us via live chat, email, or our contact form. Support is available 24/7.',
  },
  {
    question: '11. Is there a referral program?',
    answer: 'Yes! Invite friends and earn a bonus each time they invest. Details are on your dashboard.',
  },
  {
    question: '12. Is KYC required?',
    answer: 'Yes, for your security and compliance, identity verification is required before you can invest or withdraw.',
  },
];

const FaqFdjfjf = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl !text-black mt-[4%] font-bold text-center mb-10">Frequently Asked Questions</h2>

      <div className="space-y-4 !text-black">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-300 rounded-md bg-white shadow-sm">
            <button
              className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 focus:outline-none"
              onClick={() => handleToggle(index)}
            >
              <span>{faq.question}</span>
              <svg
                className={`w-5 h-5 transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {activeIndex === index && (
              <div className="px-4 pb-4">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

 