import PropertyCard from "./property-card"

// Mock data for properties
const mockProperties = [
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
    isFeatured: false,
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
  {
    id: "5",
    title: "1BHK Flat for Rent in Gated Community",
    type: "rent",
    price: 12000,
    location: "Electronic City, Bangalore",
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    image: "/placeholder.svg?height=300&width=500&text=1BHK+Flat",
    isVerified: false,
    isFeatured: false,
  },
  {
    id: "6",
    title: "Shared Room in 3BHK Apartment",
    type: "sharing",
    price: 7000,
    location: "Indiranagar, Bangalore",
    bedrooms: 1,
    bathrooms: 2,
    area: 300,
    image: "/placeholder.svg?height=300&width=500&text=Shared+Room",
    isVerified: true,
    isFeatured: false,
  },
  {
    id: "7",
    title: "Fully Furnished Studio Apartment",
    type: "rent",
    price: 15000,
    location: "JP Nagar, Bangalore",
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    image: "/placeholder.svg?height=300&width=500&text=Studio+Apartment",
    isVerified: true,
    isFeatured: false,
  },
  {
    id: "8",
    title: "Premium PG for Women with Meals",
    type: "pg",
    price: 11000,
    location: "Marathahalli, Bangalore",
    bedrooms: 1,
    bathrooms: 1,
    area: 200,
    image: "/placeholder.svg?height=300&width=500&text=Women+PG",
    isVerified: true,
    isFeatured: false,
  },
]

// Function to filter properties based on search params
function filterProperties(properties: any[], searchParams: { [key: string]: string | string[] | undefined }) {
  return properties.filter((property) => {
    // Filter by property type
    if (searchParams.type && property.type !== searchParams.type) {
      return false
    }

    // Filter by location (case insensitive partial match)
    if (
      searchParams.location &&
      !property.location.toLowerCase().includes(String(searchParams.location).toLowerCase())
    ) {
      return false
    }

    // Filter by price range
    if (searchParams.minPrice && property.price < Number(searchParams.minPrice)) {
      return false
    }
    if (searchParams.maxPrice && property.price > Number(searchParams.maxPrice)) {
      return false
    }

    // Filter by bedrooms
    if (searchParams.bedrooms && property.bedrooms !== Number(searchParams.bedrooms)) {
      return false
    }

    return true
  })
}

export default function PropertyList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // In a real app, this would be an API call with the search params
  // const properties = await fetchProperties(searchParams);

  // Using mock data for now
  const filteredProperties = filterProperties(mockProperties, searchParams)

  if (filteredProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">No properties found</h2>
        <p className="text-gray-500">Try adjusting your search filters to find more properties.</p>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-6 text-gray-500">{filteredProperties.length} properties found</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}
