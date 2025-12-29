 
 
import prisma from "@/action/db";
import LaYa from "@/components/ui/lay";
import { UserProvider } from "@/context/usecontext";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
 

 
 

export  default  async  function MainLayout({ children }) {

 


 const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      username: true,
      email: true,
      avatar: true,
      rank: true,
      isVerified: true,

      mainBalance: true,
      profitBalance: true,

      createdAt: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  // ✅ CONVERT DECIMAL + DATE → PLAIN OBJECT
  const safeUser = {
    ...user,
    mainBalance: Number(user.mainBalance),
    profitBalance: Number(user.profitBalance),
    createdAt: user.createdAt.toISOString(),
  };

  return (


    <>
    <UserProvider initialUser={safeUser}>

    <LaYa  >
      {children}
    </LaYa>
    </UserProvider>
      </>
  );
}
