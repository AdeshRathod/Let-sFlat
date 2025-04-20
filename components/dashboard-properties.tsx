"use client"

import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Edit, Trash, MoreVertical, Eye, Star, StarOff } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
// Replace shadcn components with custom components
import { CustomButton } from "@/components/custom-button"
import { CustomBadge } from "@/components/custom-badge"

// Mock data for dashboard properties
const mockDashboardProperties = [
  {
    id: "1",
    title: "Modern 3BHK Apartment with Garden View",
    type: "rent",
    price: 25000,
    location: "Koramangala, Bangalore",
    image: "/placeholder.svg?height=300&width=500&text=Modern+Apartment",
    isVerified: true,
    isFeatured: true,
    status: "active",
    views: 245,
    inquiries: 12,
    postedOn: "2023-05-20",
  },
  {
    id: "2",
    title: "Luxury 2BHK Flat Near Metro",
    type: "rent",
    price: 18000,
    location: "HSR Layout, Bangalore",
    image: "/placeholder.svg?height=300&width=500&text=Luxury+Flat",
    isVerified: true,
    isFeatured: false,
    status: "active",
    views: 187,
    inquiries: 8,
    postedOn: "2023-05-25",
  },
  {
    id: "3",
    title: "Spacious PG with AC Rooms",
    type: "pg",
    price: 8500,
    location: "BTM Layout, Bangalore",
    image: "/placeholder.svg?height=300&width=500&text=PG+Accommodation",
    isVerified: false,
    isFeatured: false,
    status: "pending",
    views: 92,
    inquiries: 3,
    postedOn: "2023-06-02",
  },
  {
    id: "4",
    title: "Commercial Office Space in Business Park",
    type: "commercial",
    price: 45000,
    location: "Whitefield, Bangalore",
    image: "/placeholder.svg?height=300&width=500&text=Office+Space",
    isVerified: true,
    isFeatured: true,
    status: "active",
    views: 156,
    inquiries: 7,
    postedOn: "2023-05-18",
  },
]

interface DashboardPropertiesProps {
  type: string
}

export default function DashboardProperties({ type }: DashboardPropertiesProps) {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call with a delay
    const fetchProperties = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/dashboard/properties?type=${type}`);
        // const data = await response.json();

        // Using mock data for now
        setTimeout(() => {
          const filteredProperties =
            type === "all"
              ? mockDashboardProperties
              : mockDashboardProperties.filter((property) => property.type === type)

          setProperties(filteredProperties)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching properties:", error)
        setLoading(false)
      }
    }

    setLoading(true)
    fetchProperties()
  }, [type])

  const toggleFeatured = (id: string) => {
    setProperties(
      properties.map((property) => (property.id === id ? { ...property, isFeatured: !property.isFeatured } : property)),
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
            <Skeleton className="h-16 w-16 rounded" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
        ))}
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No properties found</h2>
        <p className="text-gray-500 mb-6">You haven't added any {type !== "all" ? type : ""} properties yet.</p>
        <Button>Add Your First Property</Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {properties.map((property) => (
        <div
          key={property.id}
          className="flex flex-col sm:flex-row items-start sm:items-center border rounded-lg p-4 gap-4"
        >
          <div className="relative h-20 w-32 rounded overflow-hidden">
            <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h3 className="font-semibold">{property.title}</h3>
              <div className="flex flex-wrap gap-2">
                <CustomBadge variant="outline" className="capitalize">
                  {property.type}
                </CustomBadge>
                <CustomBadge variant={property.status === "active" ? "success" : "secondary"} className="capitalize">
                  {property.status}
                </CustomBadge>
                {property.isFeatured && <CustomBadge className="bg-blue-500 hover:bg-blue-600">Featured</CustomBadge>}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-2 text-sm text-gray-500">
              <div>
                ₹{property.price.toLocaleString()}
                {property.type === "rent" ? "/month" : ""}
              </div>
              <div>{property.location}</div>
              <div>Posted on: {new Date(property.postedOn).toLocaleDateString()}</div>
            </div>
            <div className="flex gap-4 mt-2 text-sm">
              <div>
                <span className="font-medium">{property.views}</span> views
              </div>
              <div>
                <span className="font-medium">{property.inquiries}</span> inquiries
              </div>
            </div>
          </div>

          <div className="flex gap-2 self-end sm:self-center">
            <CustomButton variant="outline" size="sm" asChild>
              <Link href={`/properties/${property.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                View
              </Link>
            </CustomButton>
            <CustomButton variant="outline" size="sm" onClick={() => toggleFeatured(property.id)}>
              {property.isFeatured ? (
                <>
                  <StarOff className="h-4 w-4 mr-1" />
                  Unfeature
                </>
              ) : (
                <>
                  <Star className="h-4 w-4 mr-1" />
                  Feature
                </>
              )}
            </CustomButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <CustomButton variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </CustomButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}
