"use client"

import { useState, useEffect } from "react"
import PropertyCard from "./property-card"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for featured properties
const mockFeaturedProperties = [
  {
    id: "1",
    title: "Modern 3BHK Apartment with Garden View",
    type: "rent",
    price: 25000,
    location: "Koramangala, Bangalore",
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    image: "/placeholder.svg?height=300&width=500&text=Modern+Apartment",
    isVerified: true,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Luxury 2BHK Flat Near Metro",
    type: "rent",
    price: 18000,
    location: "HSR Layout, Bangalore",
    bedrooms: 2,
    bathrooms: 2,
    area: 950,
    image: "/placeholder.svg?height=300&width=500&text=Luxury+Flat",
    isVerified: true,
    isFeatured: true,
  },
  {
    id: "3",
    title: "Spacious PG with AC Rooms",
    type: "pg",
    price: 8500,
    location: "BTM Layout, Bangalore",
    bedrooms: 1,
    bathrooms: 1,
    area: 250,
    image: "/placeholder.svg?height=300&width=500&text=PG+Accommodation",
    isVerified: true,
    isFeatured: true,
  },
  {
    id: "4",
    title: "Commercial Office Space in Business Park",
    type: "commercial",
    price: 45000,
    location: "Whitefield, Bangalore",
    bedrooms: 0,
    bathrooms: 2,
    area: 1800,
    image: "/placeholder.svg?height=300&width=500&text=Office+Space",
    isVerified: true,
    isFeatured: true,
  },
]

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call with a delay
    const fetchProperties = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/properties/featured');
        // const data = await response.json();

        // Using mock data for now
        setTimeout(() => {
          setProperties(mockFeaturedProperties)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching featured properties:", error)
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}
