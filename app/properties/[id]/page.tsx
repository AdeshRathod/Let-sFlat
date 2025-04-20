import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
// Replace Tabs components with CustomTabs
import { CustomTabs, CustomTabsList, CustomTabsTrigger, CustomTabsContent } from "@/components/custom-tabs"
import { MapPin, Bed, Bath, Square, Calendar, Home, Check } from "lucide-react"
import PropertyContactForm from "@/components/property-contact-form"
import PropertyMap from "@/components/property-map"

// Replace shadcn components with custom components
import { CustomBadge } from "@/components/custom-badge"

// Mock data for a single property
const mockProperty = {
  id: "1",
  title: "Modern 3BHK Apartment with Garden View",
  description:
    "This beautiful 3BHK apartment offers a stunning garden view and is located in a prime area of Koramangala. The apartment features spacious rooms, modern amenities, and is close to all major facilities including shopping centers, hospitals, and schools.",
  type: "rent",
  price: 25000,
  location: "Koramangala, Bangalore",
  address: "123, 5th Block, Koramangala, Bangalore - 560034",
  bedrooms: 3,
  bathrooms: 2,
  area: 1200,
  images: [
    "/placeholder.svg?height=600&width=800&text=Living+Room",
    "/placeholder.svg?height=600&width=800&text=Kitchen",
    "/placeholder.svg?height=600&width=800&text=Bathroom",
  ],
  amenities: [
    "24/7 Security",
    "Power Backup",
    "Lift",
    "Parking",
    "Gym",
    "Swimming Pool",
    "Children's Play Area",
    "Clubhouse",
  ],
  furnishing: "Semi-Furnished",
  availableFrom: "2023-06-15",
  isVerified: true,
  isFeatured: true,
  owner: {
    id: "owner1",
    name: "Rahul Sharma",
    phone: "+91 9876543210",
    email: "rahul@example.com",
    image: "/placeholder.svg?height=100&width=100&text=RS",
  },
  postedOn: "2023-05-20",
  latitude: 12.9352,
  longitude: 77.6245,
}

async function getProperty(id: string) {
  // In a real app, this would be an API call
  // const response = await fetch(`/api/properties/${id}`);
  // if (!response.ok) return null;
  // return response.json();

  // Using mock data for now
  if (id === "1") {
    return mockProperty
  }
  return null
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id)

  if (!property) {
    return {
      title: "Property Not Found | PropertyHub",
      description: "The property you are looking for does not exist.",
    }
  }

  return {
    title: `${property.title} | PropertyHub`,
    description: property.description.substring(0, 160) + "...",
  }
}

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id)

  if (!property) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <Link href="/properties" className="text-blue-600 hover:text-blue-800">
              &larr; Back to properties
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-500 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.address}</span>
            </div>
            {/* Replace Badge with CustomBadge */}
            <div className="flex flex-wrap gap-2">
              {property.isVerified && <CustomBadge className="bg-green-500 hover:bg-green-600">Verified</CustomBadge>}
              {property.isFeatured && <CustomBadge className="bg-blue-500 hover:bg-blue-600">Featured</CustomBadge>}
              <CustomBadge variant="outline">{property.type === "rent" ? "For Rent" : property.type}</CustomBadge>
              <CustomBadge variant="outline">{property.furnishing}</CustomBadge>
            </div>
          </div>

          <div className="mb-8">
            <div className="aspect-video overflow-hidden rounded-lg mb-4">
              <Image
                src={property.images[0] || "/placeholder.svg"}
                alt={property.title}
                width={800}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {property.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${property.title} - Image ${index + 2}`}
                    width={200}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Replace Tabs with CustomTabs */}
          <CustomTabs defaultValue="details">
            <CustomTabsList className="mb-4">
              <CustomTabsTrigger value="details">Details</CustomTabsTrigger>
              <CustomTabsTrigger value="amenities">Amenities</CustomTabsTrigger>
              <CustomTabsTrigger value="location">Location</CustomTabsTrigger>
            </CustomTabsList>

            <CustomTabsContent value="details" className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Bed className="h-6 w-6 text-blue-600 mb-2" />
                    <span className="text-sm text-gray-500">Bedrooms</span>
                    <span className="font-semibold">{property.bedrooms}</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Bath className="h-6 w-6 text-blue-600 mb-2" />
                    <span className="text-sm text-gray-500">Bathrooms</span>
                    <span className="font-semibold">{property.bathrooms}</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Square className="h-6 w-6 text-blue-600 mb-2" />
                    <span className="text-sm text-gray-500">Area</span>
                    <span className="font-semibold">{property.area} sq.ft</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600 mb-2" />
                    <span className="text-sm text-gray-500">Available From</span>
                    <span className="font-semibold">{new Date(property.availableFrom).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Property Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Home className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-gray-700">Property Type:</span>
                    <span className="ml-2 font-medium capitalize">{property.type}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-gray-700">Posted On:</span>
                    <span className="ml-2 font-medium">{new Date(property.postedOn).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </CustomTabsContent>

            <CustomTabsContent value="amenities">
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </CustomTabsContent>

            <CustomTabsContent value="location">
              <h2 className="text-2xl font-semibold mb-4">Location</h2>
              <div className="h-[400px] bg-gray-100 rounded-lg overflow-hidden">
                <PropertyMap latitude={property.latitude} longitude={property.longitude} />
              </div>
              <p className="mt-4 text-gray-700">{property.address}</p>
            </CustomTabsContent>
          </CustomTabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="mb-6">
                <p className="text-3xl font-bold text-blue-600">₹{property.price.toLocaleString()}</p>
                <p className="text-gray-500">{property.type === "rent" ? "/month" : ""}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Contact Owner</h3>
                <div className="flex items-center mb-4">
                  <div className="mr-3">
                    <Image
                      src={property.owner.image || "/placeholder.svg"}
                      alt={property.owner.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{property.owner.name}</p>
                    <p className="text-sm text-gray-500">Property Owner</p>
                  </div>
                </div>
              </div>

              <PropertyContactForm propertyId={property.id} ownerEmail={property.owner.email} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
