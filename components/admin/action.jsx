// app/actions/resetPassword.js
'use server';
 
import prisma from "@/action/db"; 
 
 

export const getAlluser = async () => {
console.log('done');

const users = await prisma.user.findMany({
  select:{
    id:true,
    username:true
  }});
  return users
}
export const getOneuser = async (usersd) => {
  console.log('done',usersd);

  const users = await prisma.user.findUnique({
    
 
    where:{
      id:usersd
    }, 
    select:{
    id:true,
    username:true
  }
  });
  return users
}