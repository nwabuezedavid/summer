"use server";

import { getDepositLogs } from "@/action/tablelog";
import DepositLogPage from "@/components/ui/adddeposit";

 

 
 

export default async function Page() {
  const data = await getDepositLogs();
  return <DepositLogPage data={data} />;
}
