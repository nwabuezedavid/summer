'use client'
import HomeSsjsSS from "@/action/register";


import { Suspense } from "react";
 

export default function Page() {
 

  return (
    <Suspense fallback="Loading...">
      <HomeSsjsSS/>
    </Suspense>
  );
}
