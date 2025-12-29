"use client"

import DashNav from "@/componenet/dashnav"
import KYCNotice from "@/componenet/kyc"
import BottomNav from "@/componenet/modelscreenav"
import TopBar from "@/componenet/topindashb"
import { getSessionAction } from "@/context/session"
import { useEffect, useState } from "react"
import { Toaster } from "sonner"

 

const LaYa = ({children}) => {

      const [tog, settog] = useState(false)
      const [user, setUser] = useState(null);
   useEffect(() => {
    getSessionAction().then(setUser);
  }, []);
  return (
    < ><Toaster />
    
      <section
        className="flex w-full h-screen text-white bg-[#032836] no-scrollbar 
      "
      >
        <aside className={`bg-[#003049] lg:w-1/4 lg:translate-x-[0] max-sm:hidden md:translate-x-[100vw] md:w-0 max-sm:hidden ${!tog ?'!w-0 !translate-x-[-100vw] delay-100 transition-all   ' : ' '}`}>
          <DashNav />

        </aside>
        <BottomNav />

        <main className="flex-1 bg-black/30 h-full overflow-hidden pb-[6%] justify-center no-scrollbar">
          <TopBar value={{tog,settog}} />
          <KYCNotice />
<section className="w-full h-full overflow-auto pb-[90px] max-md:pb-[40%]">

          {children}
</section>

        </main>



      </section></>
  )
}

export default LaYa