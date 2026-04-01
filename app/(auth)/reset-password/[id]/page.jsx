'use client'
import { resetPassword } from "@/action/reset";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
export default function HomeSsjsSS() {
const [loadng, setloadng] = useState(false)

 const rount =useRouter()
   const params = useParams();
  const { type, id } = params;
const [user, setuser] = useState({
    password: "",
    cpassword: "",
  
  })

const  submittePass = async (e) => {
  if (user.password !== user.cpassword){
     toast.error(`{ password mismatch }`)
     return 
  }
  e.preventDefault();
  setloadng(true)
  console.log(id);
  
  resetPassword(id, user.password)
  .then(e=>{
    console.log(e);
    if (e.error){

      toast.error(`{${e.error}}`)
      setloadng(false)
    }
    if (e.success){

      toast.error(`{${e.success}}`)
      rount.push('/login/')
      setloadng(false)

    }
    })
    .catch(r=>{
    toast.error(`{${r.error}}`)

  })
};
const handleChange = (e) => {
    const { name, value } = e.target;

    setuser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="w-full h-full text-black flex flex-col">
    <span  className="flex w-full text-center flex-col">
<h1 className="text-2xl font-bold">Create new password</h1>
 
    </span>
    <form onSubmit={submittePass} method="post"  className="w-full flex mt-[30px] gap-4 flex-col">
    <label htmlFor="username" className="flex flex-col w-full text-left px-4">
      <h1 className="flex text-xs text-gray-600">New Password</h1>
      <input id="username" required type="text" onChange={handleChange} name="password" className="border-b-1 hover:border-b-green-600 focus:border-b-2 focus:border-b-green-600  outline-none border-b-gray-400"  value={user.password} />
    </label>
    <label htmlFor="username" className="flex flex-col w-full text-left px-4">
      <h1 className="flex text-xs text-gray-600">Confirm-Password</h1>
      <input id="username" required type="password" onChange={handleChange} name="cpassword" className="border-b-1 hover:border-b-green-600 focus:border-b-2 focus:border-b-green-600  outline-none border-b-gray-400"  value={user.cpassword} />
    </label>
     
 


<button type="submit" disabled={loadng}  className={`uppercase w-full h-fit py-2 text-white rounded  text-xs cursor-pointer ${loadng ? '!bg-red-300' :'bg-gradient-to-l from-green-600 to-green-800 '}`}> {!loadng ? 'change password' :'loading...'}</button>
    
    </form>
    </div>
  );
}
