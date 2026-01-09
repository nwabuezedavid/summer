"use server"

import prisma from "./db"

 

// Client-side KYC actions
export async function uploadKycDocument(userId, documentPath) {
    console.log(userId);
    
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        kycDocument: documentPath,
       
      },
    })
    return { success: true, data: user }
  } catch (error) {
    console.error("[v0] KYC upload error:", error)
    return { success: false, error: error.message }
  }
}

export async function getKycStatus(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        kycStatus: true,
        kycDocument: true,
        kycNote: true,
        kycReviewedAt: true,
        fullName: true,
        email: true,
      },
    })
    return { success: true, data: user }
  } catch (error) {
    console.error("[v0] KYC status error:", error)
    return { success: false, error: error.message }
  }
}

// Admin-side KYC actions
export async function getKycSubmissions(status = null) {
  try {
 
    const submissions = await prisma.user.findMany({
     where: {
    kycDocument: { not: null } // adjust filter as needed
  },
      select: {
        id: true,
        username: true,
        email: true, 
        fullName: true,
        kycDocument: true,
        kycStatus: true,
        kycReviewedAt: true,
        kycNote: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    })
    return { success: true, data: submissions }
  } catch (error) {
    console.error("[v0] Get KYC submissions error:", error)
    return { success: false, error: error.message }
  }
}

export async function approveKyc(userId, adminNote = "") {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        kycStatus: "APPROVED",
        kycReviewedAt: new Date(),
        kycNote: adminNote,
        isVerified: true,
      },
    })
    return { success: true, data: user }
  } catch (error) {
    console.error("[v0] Approve KYC error:", error)
    return { success: false, error: error.message }
  }
}

export async function rejectKyc(userId, rejectionReason) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        kycStatus: "REJECTED",
        kycReviewedAt: new Date(),
        kycNote: rejectionReason,
        isVerified: false,
      },
    })
    return { success: true, data: user }
  } catch (error) {
    console.error("[v0] Reject KYC error:", error)
    return { success: false, error: error.message }
  }
}

export async function resubmitKyc(userId) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        kycStatus: "PENDING",
        kycReviewedAt: null,
        kycNote: null,
      },
    })
    return { success: true, data: user }
  } catch (error) {
    console.error("[v0] Resubmit KYC error:", error)
    return { success: false, error: error.message }
  }
}
