import { PayBlock } from "@/components/Pay";
import { SignIn } from "@/components/SignIn";
import { VerifyBlock } from "@/components/Verify";
import WorldcoinVault from "@/components/worldcoin-vault";
import CardDetails from "@/components/card-details";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-3">
      

      <SignIn />
      {/* 
      
      <VerifyBlock />
      <PayBlock />
      
      */}

         {/* 
      
      <CardDetails />
      
      */}

      <WorldcoinVault />
      
    </main>
  );
}
