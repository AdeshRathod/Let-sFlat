import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Home, Building, Users, Store, Search } from "lucide-react"
import SearchFilters from "@/components/search-filters"
import FeaturedProperties from "@/components/featured-properties"
import HeroSection from "@/components/hero-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Property Types */}
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Browse Properties By Type</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/properties?type=rent" className="group">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-gray-100 transition-all hover:shadow-lg">
              <div className="p-3 bg-blue-50 rounded-full mb-4 group-hover:bg-blue-100">
                <Home className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">For Rent</h3>
              <p className="text-gray-500 text-sm text-center mt-2">Find apartments and houses for rent</p>
            </div>
          </Link>

          <Link href="/properties?type=pg" className="group">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-gray-100 transition-all hover:shadow-lg">
              <div className="p-3 bg-blue-50 rounded-full mb-4 group-hover:bg-blue-100">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">PG/Hostel</h3>
              <p className="text-gray-500 text-sm text-center mt-2">Discover PGs and hostels near you</p>
            </div>
          </Link>

          <Link href="/properties?type=sharing" className="group">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-gray-100 transition-all hover:shadow-lg">
              <div className="p-3 bg-blue-50 rounded-full mb-4 group-hover:bg-blue-100">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">Flatmate/Sharing</h3>
              <p className="text-gray-500 text-sm text-center mt-2">Find roommates and shared accommodations</p>
            </div>
          </Link>

          <Link href="/properties?type=commercial" className="group">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-gray-100 transition-all hover:shadow-lg">
              <div className="p-3 bg-blue-50 rounded-full mb-4 group-hover:bg-blue-100">
                <Store className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">Commercial</h3>
              <p className="text-gray-500 text-sm text-center mt-2">Browse offices, shops, and commercial spaces</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Properties</h2>
            <Link href="/properties">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <FeaturedProperties />
        </div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto py-12">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Find Your Perfect Property</h2>
          <SearchFilters />
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Search Properties</h3>
            <p className="text-gray-600">
              Browse thousands of properties with our advanced filters to find your perfect match.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visit Locations</h3>
            <p className="text-gray-600">Schedule visits to your favorite properties and explore the neighborhood.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Home className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Your Property</h3>
            <p className="text-gray-600">Contact owners directly and finalize your deal with our secure platform.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
