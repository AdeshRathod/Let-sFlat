import Image from "next/image"
import Link from "next/link"
import { CustomBadge } from "@/components/custom-badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react"
import { CustomButton } from "@/components/custom-button"

interface PropertyCardProps {
  property: {
    id: string
    title: string
    type: string
    price: number
    location: string
    bedrooms: number
    bathrooms: number
    area: number
    image: string
    isVerified: boolean
    isFeatured: boolean
  }
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <Image
            src={property.image || "/placeholder.svg?height=300&width=500"}
            alt={property.title}
            width={500}
            height={300}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute top-3 right-3">
          <CustomButton size="icon" variant="ghost" className="h-8 w-8 bg-white/80 hover:bg-white rounded-full">
            <Heart className="h-4 w-4 text-gray-600" />
            <span className="sr-only">Add to favorites</span>
          </CustomButton>
        </div>
        {property.isVerified && (
          <CustomBadge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">Verified</CustomBadge>
        )}
        {property.isFeatured && (
          <CustomBadge className="absolute bottom-3 left-3 bg-blue-500 hover:bg-blue-600">Featured</CustomBadge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-blue-600">₹{property.price.toLocaleString()}</p>
            <p className="text-xs text-gray-500">{property.type === "rent" ? "/month" : ""}</p>
          </div>
        </div>
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>
              {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
            </span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>
              {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
            </span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.area} sq.ft</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Link href={`/properties/${property.id}`} className="w-full">
          <CustomButton variant="outline" className="w-full">
            View Details
          </CustomButton>
        </Link>
      </CardFooter>
    </Card>
  )
}
