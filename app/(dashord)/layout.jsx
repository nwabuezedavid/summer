 
 
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
