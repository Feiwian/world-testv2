import { ArrowLeft, Info, Plus, CreditCard, Snowflake } from "lucide-react"
import Link from "next/link"

export default function CardDetails() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white min-h-[100vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white">
          <Link href="/worldcoin-vault">
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
          </Link>
          <h1 className="text-xl font-medium">Card</h1>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Info className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center px-6 pt-8">
          {/* Balance */}
          <div className="w-full text-center mb-2">
            <span className="text-4xl font-bold">2,432 WLD</span>
          </div>
          <div className="text-gray-500 mb-8 flex items-center">
            Available to spend
            <Info className="w-4 h-4 ml-1" />
          </div>

          {/* Card */}
          <div className="w-full mb-8 relative">
            <div className="w-full h-56 rounded-xl overflow-hidden bg-gradient-to-br from-teal-300 via-cyan-400 to-green-300 p-4 flex flex-col justify-between shadow-lg">
              <div className="text-white text-2xl font-bold">World</div>
              <div className="flex justify-between items-end">
                <div className="text-white text-sm">
                  <div>Worldcoin Card</div>
                  <div>**** **** **** 8489</div>
                </div>
                <div className="text-white text-xl font-bold">VISA</div>
              </div>
            </div>
          </div>

          {/* Card Info */}
          <div className="w-full flex justify-center items-center mb-8">
            <span className="font-medium">Digital card</span>
            <span className="mx-2">•••• 8489</span>
          </div>

          {/* Action Buttons */}
          <div className="w-full grid grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col items-center gap-2">
              <button className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center">
                <Plus className="w-6 h-6 text-green-800" />
              </button>
              <span className="text-sm font-medium">Add money</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-green-800" />
              </button>
              <span className="text-sm font-medium">Card details</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center">
                <Snowflake className="w-6 h-6 text-green-800" />
              </button>
              <span className="text-sm font-medium">Freeze card</span>
            </div>
          </div>

          {/* Card Limit */}
          <div className="w-full mt-12 p-4 bg-gray-50 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Card limit</span>
              <span className="text-gray-500">5,000 WLD / month</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "48.6%" }}></div>
            </div>
            <div className="text-xs text-gray-500 mt-2">2,432 WLD available of 5,000 WLD</div>
          </div>

          {/* Recent Transactions */}
          <div className="w-full mt-8">
            <h2 className="text-lg font-medium mb-4">Recent transactions</h2>
            <div className="flex items-center justify-between py-4 border-b">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium">Amazon</div>
                  <div className="text-sm text-gray-500">Yesterday</div>
                </div>
              </div>
              <div className="font-medium text-red-500">-£24.99</div>
            </div>
            <div className="flex items-center justify-between py-4 border-b">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium">Tesco</div>
                  <div className="text-sm text-gray-500">Mar 25</div>
                </div>
              </div>
              <div className="font-medium text-red-500">-£42.15</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

