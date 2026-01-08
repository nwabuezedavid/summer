"use client"

import { Shield, CheckCircle, Users } from "lucide-react"

const values = [
  {
    title: "Security First",
    description: "Bank-level security protocols and advanced encryption to protect your assets.",
    icon: Shield,
  },
  {
    title: "Transparency",
    description: "Clear pricing, no hidden fees, and complete transparency in all operations.",
    icon: CheckCircle,
  },
  {
    title: "User-Centric",
    description: "Every feature is made with our users' success and satisfaction in mind.",
    icon: Users,
  },
]

export default function About() {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative h-[300px] py-20 bg-cover"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200)",
        }}
      >
        <video className="absolute w-full h-full object-cover top-0 right-0" autoPlay muted>
          <source src="https://res.cloudinary.com/devnawgxu/video/upload/v1749721296/about_wpcdfb.mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 text-gray-100">About Our Platform</h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Empowering traders worldwide with cutting-edge technology and unparalleled market access since 2018.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Our Story */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-600">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2018 by a team of financial technology experts and seasoned traders, our platform was born
                from a simple vision: to democratize access to global financial markets.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a small fintech startup has grown into a trusted platform serving over 500,000 active
                traders across 120 countries. We've processed over $50 billion in trading volume.
              </p>
              <p className="text-gray-600">
                Our commitment to transparency, security, and user experience has earned us recognition as one of the
                fastest-growing trading platforms.
              </p>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg border border-gray-300">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Key Milestones</h3>
              <div className="space-y-4">
                {[
                  { year: "2018", event: "Platform launched" },
                  { year: "2020", event: "100,000 users milestone" },
                  { year: "2022", event: "Global expansion completed" },
                  { year: "2024", event: "500,000+ active traders" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mr-4" />
                    <div>
                      <div className="font-semibold text-gray-900">{item.year}</div>
                      <div className="text-gray-600">{item.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Our Mission</h3>
              <p className="text-gray-700">
                To provide every trader with access to professional-grade trading tools, real-time market data, and
                educational resources needed to make informed investment decisions.
              </p>
            </div>
            <div className="bg-green-50 p-8 rounded-lg border border-green-200">
              <h3 className="text-2xl font-bold mb-4 text-green-600">Our Vision</h3>
              <p className="text-gray-700">
                To become the world's most trusted and innovative trading platform, setting new standards for
                transparency and security.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon
              return (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Chief Executive Officer",
                bio: "Former Goldman Sachs executive with 15+ years in financial technology.",
                image:
                  "https://images.pexels.com/photos/19780063/pexels-photo-19780063/free-photo-of-man-in-a-suit-and-sunglasses-standing-outside.jpeg",
              },
              {
                name: "Michael Chen",
                role: "Chief Technology Officer",
                bio: "Tech innovator specializing in high-frequency trading systems.",
                image:
                  "https://images.pexels.com/photos/24513455/pexels-photo-24513455/free-photo-of-brunette-man-in-sunglasses-and-suit-jacket.jpeg",
              },
              {
                name: "David Rodriguez",
                role: "Chief Financial Officer",
                bio: "Seasoned financial expert with extensive risk management experience.",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnklcywWEUGpy2jDdldyycUl2HIL12auQBgguzbGXSqVbEFSh8nTp4Ti_67iNC5S-OmUo",
              },
            ].map((member, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg text-center border border-gray-300 shadow-sm">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-2 text-gray-900">{member.name}</h3>
                <p className="text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-400 p-8 rounded-lg border border-gray-300">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Platform Statistics</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500K+", label: "Active Traders" },
              { value: "$50B+", label: "Trading Volume" },
              { value: "120+", label: "Countries Served" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </main>
  )
}
