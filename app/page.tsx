import { PayBlock } from "@/components/Pay";
import { SignIn } from "@/components/SignIn";
import { VerifyBlock } from "@/components/Verify";
import WorldcoinVault from "@/components/worldcoin-vault";
import Link from "next/link";
export default function Home() {
  return (
    <main>
      

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
