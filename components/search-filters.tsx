"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { CustomButton } from "./custom-button"
import { CustomInput } from "./custom-input"
import { CustomSelect } from "./custom-select"
import CustomRangeSlider from "./custom-range-slider"

export default function SearchFilters() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [priceRange, setPriceRange] = useState([5000, 50000])
  const [bedrooms, setBedrooms] = useState("")
  const [furnishing, setFurnishing] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Build query parameters
    const params = new URLSearchParams()
    if (location) params.append("location", location)
    if (propertyType) params.append("type", propertyType)
    if (priceRange) {
      params.append("minPrice", priceRange[0].toString())
      params.append("maxPrice", priceRange[1].toString())
    }
    if (bedrooms) params.append("bedrooms", bedrooms)
    if (furnishing) params.append("furnishing", furnishing)

    // Navigate to properties page with filters
    router.push(`/properties?${params.toString()}`)
  }

  const propertyTypeOptions = [
    { value: "", label: "Select type" },
    { value: "rent", label: "For Rent" },
    { value: "pg", label: "PG/Hostel" },
    { value: "sharing", label: "Flatmate/Sharing" },
    { value: "commercial", label: "Commercial" },
  ]

  const bedroomOptions = [
    { value: "", label: "Any" },
    { value: "1", label: "1 BHK" },
    { value: "2", label: "2 BHK" },
    { value: "3", label: "3 BHK" },
    { value: "4", label: "4+ BHK" },
  ]

  const furnishingOptions = [
    { value: "", label: "Any" },
    { value: "fully", label: "Fully Furnished" },
    { value: "semi", label: "Semi Furnished" },
    { value: "unfurnished", label: "Unfurnished" },
  ]

  return (
    <form onSubmit={handleSearch} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm font-medium">
            Location
          </label>
          <CustomInput
            id="location"
            placeholder="City, Locality or Landmark"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="property-type" className="block text-sm font-medium">
            Property Type
          </label>
          <CustomSelect options={propertyTypeOptions} value={propertyType} onChange={setPropertyType} />
        </div>

        <div className="space-y-2">
          <label htmlFor="bedrooms" className="block text-sm font-medium">
            Bedrooms
          </label>
          <CustomSelect options={bedroomOptions} value={bedrooms} onChange={setBedrooms} />
        </div>

        <div className="space-y-2">
          <label htmlFor="furnishing" className="block text-sm font-medium">
            Furnishing
          </label>
          <CustomSelect options={furnishingOptions} value={furnishing} onChange={setFurnishing} />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <label className="block text-sm font-medium">Price Range</label>
            <span className="text-sm text-gray-500">
              ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
            </span>
          </div>
          <CustomRangeSlider
            min={1000}
            max={100000}
            step={1000}
            defaultValue={[5000, 50000]}
            onChange={setPriceRange}
          />
        </div>

        <CustomButton type="submit" className="w-full">
          <Search className="mr-2 h-4 w-4" />
          Search Properties
        </CustomButton>
      </div>
    </form>
  )
}
