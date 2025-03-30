"use client"

import { ArrowLeft, Info, Lock, CreditCard } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import {
  MiniKit,
  tokenToDecimals,
  Tokens,
  PayCommandInput,
} from "@worldcoin/minikit-js";
import {
  VerificationLevel,
  ISuccessResult,
  MiniAppVerifyActionErrorPayload,
  IVerifyResponse,
} from "@worldcoin/minikit-js";
import { useCallback } from "react";

export type VerifyCommandInput = {
  action: string;
  signal?: string;
  verification_level?: VerificationLevel; // Default: Orb
};

const verifyPayload: VerifyCommandInput = {
  action: "test-action", // This is your action ID from the Developer Portal
  signal: "",
  verification_level: VerificationLevel.Device, // Orb | Device
};


const sendPayment = async () => {
  try {
    const res = await fetch(`/api/initiate-payment`, {
      method: "POST",
    });

    const { id } = await res.json();

    console.log(id);

    const payload: PayCommandInput = {
      reference: id,
      to: "0x0c892815f0B058E69987920A23FBb33c834289cf", // Test address
      tokens: [
        {
          symbol: Tokens.WLD,
          token_amount: tokenToDecimals(0.5, Tokens.WLD).toString(),
        },
        {
          symbol: Tokens.USDCE,
          token_amount: tokenToDecimals(0.1, Tokens.USDCE).toString(),
        },
      ],
      description: "Watch this is a test",
    };
    if (MiniKit.isInstalled()) {
      return await MiniKit.commandsAsync.pay(payload);
    }
    return null;
  } catch (error: unknown) {
    console.log("Error sending payment", error);
    return null;
  }
};

const handlePay = async () => {
  if (!MiniKit.isInstalled()) {
    console.error("MiniKit is not installed");
    return;
  }
  const sendPaymentResponse = await sendPayment();
  const response = sendPaymentResponse?.finalPayload;
  if (!response) {
    return;
  }

  if (response.status == "success") {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/confirm-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: response }),
    });
    const payment = await res.json();
    if (payment.success) {
      // Congrats your payment was successful!
      console.log("SUCCESS!");
    } else {
      // Payment failed
      console.log("FAILED!");
    }
  }
};


export default function WorldcoinVault() {
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 11,
    minutes: 55,
    seconds: 31,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0")
  }

  const [handleVerifyResponse, setHandleVerifyResponse] = useState<
  MiniAppVerifyActionErrorPayload | IVerifyResponse | null
>(null);

const handleVerify = useCallback(async () => {
  if (!MiniKit.isInstalled()) {
    console.warn("Tried to invoke 'verify', but MiniKit is not installed.");
    return null;
  }

  const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

  // no need to verify if command errored
  if (finalPayload.status === "error") {
    console.log("Command error");
    console.log(finalPayload);

    setHandleVerifyResponse(finalPayload);
    return finalPayload;
  }

  // Verify the proof in the backend
  const verifyResponse = await fetch(`/api/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payload: finalPayload as ISuccessResult, // Parses only the fields we need to verify
      action: verifyPayload.action,
      signal: verifyPayload.signal, // Optional
    }),
  });

  // TODO: Handle Success!
  const verifyResponseJson = await verifyResponse.json();

  if (verifyResponseJson.status === 200) {
    console.log("Verification success!");
    console.log(finalPayload);
  }

  setHandleVerifyResponse(verifyResponseJson);
  return verifyResponseJson;
}, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white min-h-[100vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white">
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-xl font-medium">Worldcoin Vault</h1>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"  onClick={handleVerify}>
            <Info className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center px-6 pt-8">
          {/* Lock Icon */}
          <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <Lock className="w-8 h-8 text-gray-800" />
            </div>
          </div>

          {/* Balance */}
          <div className="flex items-center mb-2">
            <span className="text-4xl font-bold">€10</span>
          </div>

          {/* Info Cards */}
          <div className="w-full grid grid-cols-2 gap-0 mb-8 border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-4 flex flex-col items-center justify-center border-r border-gray-200">
              <div className="flex items-center mb-2">
                <span className="text-sm text-gray-500">Tasa actual</span>
                <Info className="w-4 h-4 text-gray-400 ml-1" />
              </div>
              <div className="text-green-500 font-bold text-xl">10% APY</div>
            </div>
            <div className="p-4 flex flex-col items-center justify-center">
              <div className="text-sm text-gray-500 mb-2">Próximo pago</div>
              <div className="font-bold text-xl">
                {formatTime(timeRemaining.hours)} : {formatTime(timeRemaining.minutes)} :{" "}
                {formatTime(timeRemaining.seconds)}
              </div>
            </div>
          </div>

          {/* Card Preview */}
          <Link href="/card-details" className="w-full mb-8">
            <div className="w-full p-4 bg-gray-50 rounded-xl flex items-center justify-between hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-300 to-green-300 flex items-center justify-center mr-4">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium">Worldcoin Card</div>
                  <div className="text-sm text-gray-500">2,432 WLD available</div>
                </div>
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-500 transform rotate-180" />
            </div>
          </Link>

          {/* History */}
          <div className="w-full mb-8">
            <h2 className="text-lg text-gray-600 mb-4">Historia</h2>
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                  <span className="text-2xl">€</span>
                </div>
                <div>
                  <div className="font-medium">Depositado en la Caja Fuerte</div>
                  <div className="text-sm text-gray-500">12 ago 2024</div>
                </div>
              </div>
              <div className="font-medium">€ 10.00</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 ">
            <button className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl py-6" onClick={handlePay}>
              Depósito
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 border-0 rounded-xl py-6">
              Retirar
            </button>
          </div>
        </div>



      </div>
    </div>
  )
}

