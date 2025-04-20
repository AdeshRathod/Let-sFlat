import { Suspense } from "react"
import PropertyList from "@/components/property-list"
import PropertyListSkeleton from "@/components/property-list-skeleton"
import SearchFilters from "@/components/search-filters"

export const metadata = {
  title: "Browse Properties | PropertyHub",
  description: "Find your perfect property for rent, PG/hostel, flatmate sharing, or commercial use.",
}

export default function PropertiesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Properties</h1>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
        <SearchFilters />
      </div>

      <Suspense fallback={<PropertyListSkeleton />}>
        <PropertyList searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
