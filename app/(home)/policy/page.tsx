"use client"

export default function Policy() {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative h-[300px] py-20 bg-cover"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1557821552-17105176677c?w=1200)",
        }}
      >
        <video className="absolute w-full h-full object-cover top-0 right-0" autoPlay muted>
          <source src="https://res.cloudinary.com/devnawgxu/video/upload/v1749721296/about_wpcdfb.mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
          <div className="text-center mx-auto px-6">
            <h1 className="text-5xl font-bold mb-6 text-gray-100">Privacy Policy & Terms</h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Your privacy and security are our top priorities. Learn how we protect and handle your information.
            </p>
            <p className="text-sm text-gray-100 mt-4">Last updated: January 15, 2024</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Sections */}
        <section id="information-collection" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-600">1. Information We Collect</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Personal Information</h3>
              <p className="text-gray-600 mb-4">When you create an account, we collect:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Full name, email address, and phone number</li>
                <li>Date of birth and government-issued identification</li>
                <li>Address and proof of residence</li>
                <li>Financial information including bank account details</li>
                <li>Employment and income information</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Technical Information</h3>
              <p className="text-gray-600 mb-4">We automatically collect technical data:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>IP address, browser type, and device information</li>
                <li>Trading activity and transaction history</li>
                <li>Platform usage patterns and preferences</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="information-use" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-600">2. How We Use Your Information</h2>

          <div className="space-y-4">
            {[
              {
                title: "Account Management",
                description: "We use your information to create and maintain your trading account.",
                bg: "bg-blue-50",
                border: "border-blue-200",
              },
              {
                title: "Trading Services",
                description: "Your data enables us to execute trades and provide market analysis.",
                bg: "bg-green-50",
                border: "border-green-200",
              },
              {
                title: "Compliance & Security",
                description: "We process your information to comply with regulatory requirements.",
                bg: "bg-yellow-50",
                border: "border-yellow-200",
              },
            ].map((item, idx) => (
              <div key={idx} className={`${item.bg} p-6 rounded-lg border ${item.border}`}>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="data-security" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-600">4. Data Security</h2>

          <div className="bg-slate-100 p-6 rounded-lg border border-gray-300">
            <p className="text-gray-600 mb-6">We implement industry-leading security measures:</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Technical Safeguards</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>256-bit SSL encryption</li>
                  <li>Multi-factor authentication</li>
                  <li>Regular security audits</li>
                  <li>Secure data centers</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Operational Safeguards</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Employee background checks</li>
                  <li>Access controls and monitoring</li>
                  <li>Incident response procedures</li>
                  <li>Regular staff training</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="terms-of-service" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-600">7. Terms of Service</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Account Responsibilities</h3>
              <p className="text-gray-600 mb-4">By using our platform, you agree to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not engage in market manipulation or fraudulent activities</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Trading Risks</h3>
              <p className="text-gray-600 mb-4">You acknowledge that:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Trading involves substantial risk of loss</li>
                <li>Past performance does not guarantee future results</li>
                <li>You should only trade with funds you can afford to lose</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section id="contact" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-600">8. Contact Information</h2>

          <div className="bg-slate-100 p-6 rounded-lg border border-gray-300">
            <p className="text-gray-600 mb-6">If you have questions about this Privacy Policy, please contact us:</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-gray-900">General Inquiries</h3>
                <p className="text-gray-600 text-sm mb-2">Email: support@victoryarchiverstrade.com</p>
                <p className="text-gray-600 text-sm mb-2">Phone: +1 (555) 123-4567</p>
                <p className="text-gray-600 text-sm">Hours: 24/7 Support Available</p>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-gray-900">Data Protection Officer</h3>
                <p className="text-gray-600 text-sm mb-2">Email: privacy@victoryarchiverstrade.com</p>
                <p className="text-gray-600 text-sm mb-2">Address: 123 Trading Street, New York, NY 10004</p>
              </div>
            </div>
          </div>
        </section>

        {/* Updates Notice */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Policy Updates</h3>
          <p className="text-gray-700 text-sm">
            We may update this Privacy Policy from time to time. We will notify you of any material changes via email or
            platform notification.
          </p>
        </div>
      </main>
    </main>
  )
}
