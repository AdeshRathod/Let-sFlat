import { CustomButton } from "@/components/custom-button"
import Link from "next/link"
import { Search } from "lucide-react"

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
      <div className="relative container mx-auto px-4 py-24 sm:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">Find Your Perfect Property</h1>
          <p className="text-xl mb-8 text-blue-50">
            Browse thousands of properties for rent, PG/hostel, flatmate sharing, and commercial use.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/properties">
              <CustomButton size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                <Search className="mr-2 h-5 w-5" />
                Browse Properties
              </CustomButton>
            </Link>
            <Link href="/auth/register">
              <CustomButton size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                List Your Property
              </CustomButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
