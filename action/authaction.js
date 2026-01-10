// app/actions/resetPassword.js
'use server';
import { cookies } from "next/headers";
import nodemailer from "nodemailer";
import prisma from "./db"; // your prisma client
import crypto from "crypto";
 
import { serialize } from "cookie";
import { createToken } from "@/lib/auth";
import { redirect } from 'next/navigation';
import { investmentPlans } from "@/context/seedinvestpla";
 
 

export async function resetPassword(formData) {
  const password = formData.get("password");
  const cpassword = formData.get("cpassword");

  if (password !== cpassword) {
    throw new Error("Passwords do not match");
  }
 
  await prisma.user.update({
    where: { id: 1 }, // replace with auth user
    data: { password: password },
  });
}
  



export async function investmentPlanseed() {

await prisma.investmentPlan.createMany({
  data: investmentPlans.map(plan => ({
    name: plan.name,
    description: plan.description,
    minAmount: plan.minAmount,
    maxAmount: plan.maxAmount ?? 999999999,
    profitPercent: plan.returnPercent,
    durationDays: plan.durationDays,
    isActive: true,
  })),
});


}
export async function loginAuth(formData) {
  const usernameoremail = formData.usernameoremail;
  const password = formData.password;

 
 
 const user = await prisma.user.findFirst({
  where: {
    OR: [
      { email: usernameoremail },
      { username: usernameoremail },
    ],
    password: password, // ✅ direct match because it’s plain text
  },
  select: {
    id: true,
    uuid: true,
    username: true,
    email: true,
    kycDocument: true,
    avatar: true,
    fullName: true,
    phone: true,
    country: true,
    address: true,
    isActive: true,
    isVerified: true,
    rank: true,
    mainBalance: true,
    profitBalance: true,
    referralCode: true,
    referredById: true,
    createdAt: true,
    updatedAt: true,
    password:true,
    // relations (optional)
    investments: true,
    deposits: true,
    withdrawals: true,
  },
});


if (!user) {
 
  return { error: "Invalid credentials" }
}else{
     delete user.investments
     delete user.deposits
  const plainUser = {
    ...user,
    balance: user.balance ? Number(user.balance) : 0,
    createdAt: user.createdAt ? user.createdAt.toISOString() : null,
  };

console.log(plainUser);

 const token = createToken(plainUser);
  
 
    const cookieStore = await cookies();
   cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
 
 
return { user: {
    ...user,
    mainBalance: Number(user.mainBalance),
    profitBalance: Number(user.profitBalance),
    token:token,
    balance: user.mainBalance !== undefined ? Number(user.mainBalance) : undefined,
  } };

}
}
 

 

export async function logoutActionadmin() {
  const cookieStore = await cookies();

  cookieStore.delete("adminToken"); // ✅ remove session cookie

  redirect("/admin/login"); // ✅ force logout redirect
}
export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("session"); // ✅ remove session cookie

  redirect("/login"); // ✅ force logout redirect
}

function generateReferralCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
function generateReferralCode2(length = 18) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

 

 
/**
 * Create a new user
 * @param {Object} data
 * @param {string} data.username
 * @param {string} data.email
 * @param {string} data.password
 * @param {string} [data.fullName]
 * @param {string} [data.phone]
 * @param {string} [data.country]
 * @param {string} [data.address]
 */
export async function createUser(data) {
  console.log(data);
  
  const { username, email, password, fullName, phone, country, address, referralcode } = data;

  // Check if username or email already exists
  const referralCodedd = await prisma.user.findFirst({
    where: {
 referralCode:referralcode
    }
  });

  if (!referralCodedd &  referralcode !='' ){
    return {error:'referral Code incorrect'}
  }
  
  const existing = await prisma.user.findFirst({
    where: {
      OR: [
        { username },
        { email }
      ]
    }
  });

  if (existing) {
   return { error:"Username or email already exists"};
  }

  // Create new user
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password, // plain password for now; hash it in production
      fullName,
      phone,
      country,
      address,
      referralCode:generateReferralCode(),
      token:generateReferralCode2(),
      referredById: referralCodedd?.id || null,
    }
  });
 createToken(user)
  redirect('/dashboard');
  return {sucess:'successfully logged in ' , user:user} ;
}





export async function resetPassa(data) {
  const user = await prisma.user.findFirst({
    where:{
      email:data.email
    }
  })
  if (!user){
    return {error:'email doesnt exist'}
  }
const token =  user.token
const email =  data.email
 
console.log(user);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,       // smtp.gmail.com
  port: Number(process.env.EMAIL_PORT), // 587
  secure: process.env.EMAIL_USE_SSL === "true", // false for TLS
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  // Send email
  await transporter.sendMail({
    from: `${process.env.NEXT_PUBLIC_SITE_NAME} <${process.env.EMAIL_HOST_USER}>`,
    to: email,
    subject: "Reset Your Password",
    html: `
       <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
    <p className="text-gray-600 mb-6">
      You recently requested a password reset for your account. No worries, we've got you covered!
    </p>
    <a
      href=${resetUrl}
      target="_blank"
      className="inline-block px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors"
    >
      Reset Password
    </a>
    <p className="text-gray-500 mt-6 text-sm">
      If you didn't request this, you can safely ignore this email.
    </p>
    <hr className="my-6 border-gray-200" />
    <footer className="text-center text-gray-400 text-xs">
      <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      <p>
        <a href="#" className="text-blue-400 hover:text-blue-600">
          Terms
        </a>
        {' | '}
        <a href="#" className="text-blue-400 hover:text-blue-600">
          Privacy
        </a>
      </p>
    </footer>
  </div>
    `,
  });
 
  return {sucess:'successfully sent reset mail ' , user:user} ;
}

 

/**
 * Create a notification for a user
 * @param {Object} params
 * @param {number} params.userId - User ID
 * @param {string} params.title - Notification title
 * @param {string} params.message - Notification message
 */
export async function createNotification({
  userId,
  title,
  message,
}) {
  if (!userId || !title || !message) {
    throw new Error("Missing notification fields");
  }

  return prisma.notification.create({
    data: {
      userId,
      title,
      message,
    },
  });
}



 

 
export const walletAll = async () => {

const walletc = await prisma.wallet.findMany( );

const WALLETS = walletc.reduce((acc, wallet) => {
  acc[wallet.name] = {
    label: wallet.name,
    address: wallet.address,
    note: `Send only ${wallet.name} to this wallet`,
  };
 
  
  return acc;
}, {});
  return WALLETS
}
