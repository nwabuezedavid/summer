import { Suspense } from "react"
import FAQContent from "@/components/faq-content"

function FAQHero() {
  return (
    <section
      className="relative h-[400px] py-20 bg-cover bg-center"
      style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200)",
      }}
    >
      <video className="absolute w-full h-full object-cover top-0 right-0" autoPlay muted>
        <source src="https://res.cloudinary.com/devnawgxu/video/upload/v1749721296/about_wpcdfb.mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
        <div className="text-center mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6 text-gray-100">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Find answers to common questions about our trading platform, account management, and trading services.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function FAQ() {
  return (
    <main>
      <FAQHero />
      <Suspense fallback={null}>
        <FAQContent />
      </Suspense>
    </main>
  )
}
