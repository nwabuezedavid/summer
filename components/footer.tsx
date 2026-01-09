import Link from "next/link"
import { Facebook, Instagram, Twitter, Github, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <>

    <Leadership/>
    <EmaForr/>
    <footer className="bg-[#0f172a] text-gray-300 py-12">
      <div className="container mx-auto px-4">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            About US
          </Link>
          <Link href="/policy" className="hover:text-white transition-colors">
            Policy
          </Link>
          <Link href="/faq" className="hover:text-white transition-colors">
            FAQ
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact Us
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 mb-8">
          <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
            <Twitter size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors" aria-label="YouTube">
            <Youtube size={20} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm">© 2026 {process.env.NEXT_PUBLIC_SITE_NAME}, Inc. All rights reserved.</div>
      </div>
    </footer></>
  )
}


 

const EmaForr = () => {
  return (
    <div><div className ="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
  <div className ="mx-auto max-w-7xl px-6 lg:px-8">
    <div className ="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
      <div className ="max-w-xl lg:max-w-lg">
        <h2 className ="text-4xl font-semibold tracking-tight text-white">Subscribe to our newsletter</h2>
        <p className ="mt-4 text-lg text-gray-300">
          Investing is the key to growing your wealth over time, securing your financial future, and achieving your goals. Stay informed with expert insights, market trends, and smart strategies delivered right to your inbox.
        </p>
        <div className ="mt-6 flex max-w-md gap-x-4">
          <label htmlFor="email-address" className ="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className ="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className ="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Subscribe
          </button>
        </div>
      </div>
      <dl className ="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
        <div className ="flex flex-col items-start">
          <div className ="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
            <svg className ="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>
          </div>
          <dt className ="mt-4 text-base font-semibold text-white">Weekly articles</dt>
          <dd className ="mt-2 text-base/7 text-gray-400">Receive well-researched articles and insights covering the latest in investment and market opportunities.</dd>
        </div>
        <div className ="flex flex-col items-start">
          <div className ="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
            <svg className ="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002" />
            </svg>
          </div>
          <dt className ="mt-4 text-base font-semibold text-white">No spam</dt>
          <dd className ="mt-2 text-base/7 text-gray-400">We respect your inbox and send only valuable, relevant information — no spam, guaranteed.</dd>
        </div>
      </dl>
    </div>
  </div>
  <div className ="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
    <div
      className ="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
         
    ></div>
  </div>
</div></div>
  )
}

 
const Leadership = () => {
  const leaders = [
    {
      name: 'Morgan Johnson',
      title: 'Co-Founder / CTO',
      image: 'https://monerium.com/images/team/individuals/sveinn.jpg',
    },
    {
      name: 'Leslie Alexander',
      title: 'Director Of Product',
      image: 'https://monerium.com/images/team/individuals/jon-helgi.jpg',
    },
    {
      name: 'Mark James',
      title: 'Co-Founder / CEO',
      image: 'https://i.pinimg.com/736x/dc/5f/a5/dc5fa5fb5beb76d747c79de9377d5154.jpg',
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
            Meet our leadership
          </h2>
          <p className="mt-6 text-lg/8 text-gray-600">
            We're a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {leaders.map((leader, index) => (
            <li key={index}>
              <div className="flex items-center gap-x-6">
                <img className="size-16 rounded-full" src={leader.image} alt="" />
                <div>
                  <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
                    {leader.name}
                  </h3>
                  <p className="text-sm/6 font-semibold text-indigo-600">
                    {leader.title}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};