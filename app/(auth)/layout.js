import { Toaster } from "sonner";

export default function MainLayout({ children }) {
  return (
    <section
      className="
        relative
        min-h-screen
        w-screen
        bg-[url('/main.jpg')]
        bg-cover
        bg-center
        bg-no-repeat
        flex
        items-center
        justify-center
      "
    >
   
  <div className="md:absolute right-[90px] items-center text-center flex flex-col p-4 w-[90%]  md:w-[350px] bg-white min-h-[450px] rounded-md  top-0 md:top-[50px]">
    <span className="flex w-full  justify-center items-center text-center ">
<img src={process.env.SITElogo} className="w-10 h-10 object-fit" alt="" />
     <h1 className="uppercase text-black text-3xl font-light font-bold text-[.7em]">{process.env.NEXT_PUBLIC_SITE_NAME}</h1>
    </span>
     <Toaster />
        {children}
    </div>
       
    </section>
  );
}
