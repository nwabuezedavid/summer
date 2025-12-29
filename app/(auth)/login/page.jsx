'use client'
import { loginAuth } from "@/action/authaction";
 
import Link from "next/link";
import { useRouter } from "next/navigation";


import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function HomeSsjsSS() {
const [user, setuser] = useState({
    usernameoremail: "",
    password: "",
  })
const [loadng, setloadng] = useState(false)
  const router = useRouter();
const handleChange = (e) => {
 
    const { name, value } = e.target;

    setuser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
   useEffect(() => {
     // first: code to run initially
     const timeoutId = setTimeout(() => {
      setloadng(false)
       // put your 'first' logic here if it should run after delay
     }, 3000); // 3000ms = 3 seconds
   
     // cleanup function
     return () => {
       clearTimeout(timeoutId); // second: cancel timeout on unmount or dependency change
       console.log("Cleanup function called");
     };
   }, [loadng]);

const handlesubmit = (e)=>{
  e.preventDefault();
  setloadng(true)
loginAuth(user)
.then((e)=>{
console.log(e);
if (e.error) {
  toast.error(`{${e.error}}`)
  setloadng(false)
}else{
  toast.success(`logged in successfully`)
    document.cookie = `session2=${JSON.stringify(e.user)}; path=/; max-age=86400`;
   
 router.push('/dashboard')
}
})
.catch((w)=>{
  toast.error(`error {${w}}`)

})
}

   
  return (
    <div className="w-full h-full text-black flex flex-col">
    <span  className="flex w-full text-center flex-col">
<h1 className="text-2xl font-bold">👋 welcome back!</h1>
<h4 className="text-gray-600 text-sm">sign in continue with User panel</h4>
    </span>
    <form onSubmit={handlesubmit} method="post"  className="w-full flex mt-[30px] gap-4 flex-col">
    <label htmlFor="username" className="flex flex-col w-full text-left px-4">
      <h1 className="flex text-xs text-gray-600">Email or Username</h1>
      <input id="username" required type="text" onChange={handleChange} name="usernameoremail" className="border-b-1 hover:border-b-green-600 focus:border-b-2 focus:border-b-green-600  outline-none border-b-gray-400"  value={user.usernameoremail} />
    </label>
    <label htmlFor="password" className="flex flex-col w-full text-left px-4">
      <h1 className="flex text-xs text-gray-600">Password</h1>
      <input id="password" required type="password"  onChange={handleChange} name="password" className="border-b-1 hover:border-b-green-600  focus:border-b-2 outline-none focus:border-b-green-600   border-b-gray-400"  value={user.password} />
    </label>
<span className="flex  justify-between w-full ">
  <small className="flex gap-2 px-4 items-center">
 <input type="checkbox" name="" id="" />
<h3>Remember me </h3>
  </small>

  <Link href={'/forgot-password'} className="text-xs  px-4 py-2 text-red-400 hover:text-gray-500">Forget Password</Link>
</span>


<button type="submit" disabled={loadng}  className={`uppercase w-full h-fit py-2 text-white rounded  text-xs cursor-pointer ${loadng ? '!bg-red-300' :'bg-gradient-to-l from-green-600 to-green-800 '}`}> {!loadng ? 'Account Login' :'loading...'}</button>
    
    <span className="flex justify-center items-center gap-1 text-center w-full text-xs">
      <p>Don't have an account </p>
      <Link href={'/register'} className="text-green-800">Sign-up for free</Link>
    </span>
    </form>
    </div>
  );
}
