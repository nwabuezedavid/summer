'use client'
import Link from "next/link";
import { useState } from "react";
export default function HomeSsjsSS({id}) {

  
const [user, setuser] = useState({
    password: "",
    cpassword: "",
  
  })


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
    <form action="" method="post"  className="w-full flex mt-[30px] gap-4 flex-col">
    <label htmlFor="username" className="flex flex-col w-full text-left px-4">
      <h1 className="flex text-xs text-gray-600">New Password</h1>
      <input id="username" required type="text" onChange={handleChange} name="usernameoremail" className="border-b-1 hover:border-b-green-600 focus:border-b-2 focus:border-b-green-600  outline-none border-b-gray-400"  value={user.password} />
    </label>
    <label htmlFor="username" className="flex flex-col w-full text-left px-4">
      <h1 className="flex text-xs text-gray-600">Confirm-Password</h1>
      <input id="username" required type="password" onChange={handleChange} name="cpassword" className="border-b-1 hover:border-b-green-600 focus:border-b-2 focus:border-b-green-600  outline-none border-b-gray-400"  value={user.cpassword} />
    </label>
     
 


<button type="submit" className="uppercase w-full h-fit py-2 bg-gradient-to-l from-green-600 text-white rounded to-green-800 text-xs cursor-pointer">Reset Password </button>
    
    
    </form>
    </div>
  );
}
