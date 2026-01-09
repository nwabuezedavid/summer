'use client'
 
import { resetPassa } from "@/action/authaction";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
export default function HomeSsjsSS() {
const [user, setuser] = useState({
    email: "",
  
  })
const [loadng, setloadng] = useState(false)

const handleChange = (e) => {
    const { name, value } = e.target;

    setuser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handelesubmit = (e)=>{
  e.preventDefault();
  setloadng(true)
 resetPassa(user)
 .then(e =>{
  if (e.error){
    toast.error(e.error)

  }else{

    toast.success(e.sucess)
  }
 })
 .catch((d)=>{
  toast.success(`${d}`)
 })
 setloadng(false)

}
  
  return (
    <div className="w-full h-full text-black flex flex-col">
    <span  className="flex w-full text-center flex-col">
<h1 className="text-2xl font-bold">Password Reset!</h1>
<h4 className="text-gray-600 text-sm">Reset your Password</h4>
    </span>
    <form onSubmit={handelesubmit} method="post"  className="w-full flex mt-[30px] gap-4 flex-col">
    <label htmlFor="username" className="flex flex-col w-full text-left px-4">
      <h1 className="flex text-xs text-gray-600">Email</h1>
      <input id="username" required type="text" onChange={handleChange} name="email" className="border-b-1 hover:border-b-green-600 focus:border-b-2 focus:border-b-green-600  outline-none border-b-gray-400"  value={user.email} />
    </label>
     
 
<button type="submit" disabled={loadng}  className={`uppercase w-full h-fit py-2 text-white rounded  text-xs cursor-pointer ${loadng ? '!bg-red-300' :'bg-gradient-to-l from-green-600 to-green-800 '}`}> {!loadng ? 'EMAIL PASSWORD RESET LINK' :'loading...'}</button>
    
 
    
    <span className="flex justify-center items-center gap-1 text-center w-full text-xs">
      <p>Don't have an account </p>
      <Link href={'/login'} className="text-green-800">Already Have an account </Link>
    </span>
    </form>
    </div>
  );
}
