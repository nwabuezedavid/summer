'use server'
import prisma from "@/action/db";
import { notFound } from "next/navigation";

export const  investclientside = async (params)  => {
    console.log(await params,"params");
    
  const {id} = await params  
 
  
  if (!Number(id) ) { 
    notFound();
  }
  const plan = await prisma.investmentPlan.findUnique({ where: { id: Number(id) }, });
  

  if (!plan) {
    notFound();
  }
  
const minAmount = Number(plan.minAmount);
const maxAmount = plan.maxAmount ? Number(plan.maxAmount) : null;  
 const plainpan = {
    ...plan,
    minAmount: plan.minAmount ? Number(plan.minAmount) : 0,
    profitPercent: plan.profitPercent ? Number(plan.profitPercent) : 0,
    maxAmount: plan.maxAmount ? Number(plan.maxAmount) : 0,
   
  };
  console.log(plainpan);
  
return {id:id, plan: plainpan,minAmount: minAmount, maxAmount:maxAmount}
}
