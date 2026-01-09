export async function approveKyc(userId) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      kycStatus: "APPROVED",
      isVerified: true,
      kycReviewedAt: new Date(),
    },
  });
}