 
import Link from 'next/link'
import React from 'react'
import SidebarLink from './navbtn'
import { logoutAction } from '@/action/authaction'
import { useUser } from '@/context/usecontext'
 
const DashNav =     () => {
const {user,setuser} =useUser()
  return (
    <main className='flex flex-col max-sm:hidden w-full h-full '>


        <nav className='items-center w-full p-4 border-b-1 border-white/40 flex  text-center justify-center gap-2'><img className='w-10 h-10 rounded-full' src={process.env.SITElogo} alt="" /> <h3 className='text-xl uppercase text-black font-light '>{process.env.SITENAME} </h3> </nav>
       <div className=' rounded flex flex-col  m-3  bg-gradient-to-r from-pink-700     to-orange-400  min-h-fit'>

<span className='flex  justify-between w-full p-2'>
  <h2 className='font-bold'>Account Balance</h2>
  <small className='bg-white text-gray-600 w-fit h-fit p-1 text-[50%] font-bold  uppercase'>wallet</small>
</span>

<span className='w-full flex justify-between p-2 font-light capitalize'>
<small className='flex gap-1 justify-center text-center  items-center'>
  
<i className="fa fa-wallet" aria-hidden="true"></i>
<b>main wallet</b>
   
</small>
<b>${user?.mainBalance}</b>

</span>
<span className='w-full flex justify-between p-2 font-light capitalize'>
<small className='flex gap-1 justify-center text-center  items-center'>
  
<i className="fa fa-university" aria-hidden="true"></i>
<b>profit wallet</b>
   
</small>
<b>${user?.profitBalance}</b>

</span>
       </div>

       <div className='border-b-1 !border-gray-300/10  w-full p-4  !py-[1px] !pb-4 gap-2 flex items-center tex-center justify-center'>
        <Link className='w-full bg-[#5364f1] text-xs text-center hover:bg-[#e73667]  p-2 rounded' href={'/add-money'}><i className='fa fa-plus-circle'></i> Deposit</Link>
        <Link className='w-full bg-green-600 text-xs text-center  hover:bg-[#e73667] p-2 rounded' href={'/all-schema'}><i className='fa fa-sack-dollar'></i> invest</Link>
       </div>


       <main className='w-full h-full overflow-auto items-left ml-10 gap-3 py-10 flex flex-col  no-scrollbar'>
       
  <SidebarLink href="/dashboardhome" icon="fa fa-th-large" label="Dashboard" />

<SidebarLink href="/all-schema" icon="fa fa-database" label="All Schema" />

<SidebarLink href="/schema-log" icon="fa fa-clipboard-list" label="Schema Logs" />

<SidebarLink href="/transactions" icon="fa fa-repeat" label="All Transactions" />

<SidebarLink href="/add-money" icon="fa fa-plus-circle" label="Add Money" />

<SidebarLink href="/add-money-log" icon="fa fa-file-invoice-dollar" label="Add Money Log" />

 
<SidebarLink href="/send-money" icon="fa fa-paper-plane" label="Send Money" />

<SidebarLink href="/send-money-log" icon="fa fa-clock-rotate-left" label="Send Money Log" />

<SidebarLink href="/withdraw" icon="fa fa-arrow-down-wide-short" label="Withdraw" />

<SidebarLink href="/withdraw-log" icon="fa fa-receipt" label="Withdraw Log" />

<SidebarLink href="/ranking-badge" icon="fa fa-star" label="Ranking Badge" />

<SidebarLink href="/referral" icon="fa fa-user-group" label="Referral" />

 

<SidebarLink href="/settings" icon="fa fa-gear" label="Settings" />

<SidebarLink href="/support-tickets" icon="fa fa-headset" label="Support Tickets" />

<SidebarLink href="/notifications" icon="fa fa-bell" label="Notifications" />
<button   onClick={logoutAction} className=' bg-gradient-to-r from-pink-700 w-[80%] text-center p-2 rounded-full     to-orange-400'> logout </button>
       </main>

       
    </main>
  )
}

export default DashNav