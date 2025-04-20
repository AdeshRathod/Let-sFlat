"use client"

import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react"
import { Check, X, Eye, Edit, Trash, Search } from "lucide-react"

// Custom components
import { CustomButton } from "@/components/custom-button"
import { CustomInput } from "@/components/custom-input"
import { CustomSelect } from "@/components/custom-select"
import { CustomBadge } from "@/components/custom-badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for admin properties
const mockAdminProperties = [
  {
    id: "1",
    title: "Modern 3BHK Apartment with Garden View",
    type: "rent",
    price: 25000,
    location: "Koramangala, Bangalore",
    owner: "Rahul Sharma",
    status: "active",
    isVerified: true,
    isFeatured: true,
    postedOn: "2023-05-20",
  },
  {
    id: "2",
    title: "Luxury 2BHK Flat Near Metro",
    type: "rent",
    price: 18000,
    location: "HSR Layout, Bangalore",
    owner: "Priya Patel",
    status: "active",
    isVerified: true,
    isFeatured: false,
    postedOn: "2023-05-25",
  },
  {
    id: "3",
    title: "Spacious PG with AC Rooms",
    type: "pg",
    price: 8500,
    location: "BTM Layout, Bangalore",
    owner: "Amit Kumar",
    status: "pending",
    isVerified: false,
    isFeatured: false,
    postedOn: "2023-06-02",
  },
  {
    id: "4",
    title: "Commercial Office Space in Business Park",
    type: "commercial",
    price: 45000,
    location: "Whitefield, Bangalore",
    owner: "Deepak Verma",
    status: "active",
    isVerified: true,
    isFeatured: true,
    postedOn: "2023-05-18",
  },
  {
    id: "5",
    title: "1BHK Flat for Rent in Gated Community",
    type: "rent",
    price: 12000,
    location: "Electronic City, Bangalore",
    owner: "Sneha Reddy",
    status: "inactive",
    isVerified: false,
    isFeatured: false,
    postedOn: "2023-05-15",
  },
]

export default function AdminProperties() {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedProperties, setSelectedProperties] = useState<string[]>([])

  useEffect(() => {
    // Simulate API call with a delay
    const fetchProperties = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/admin/properties');
        // const data = await response.json();

        // Using mock data for now
        setTimeout(() => {
          setProperties(mockAdminProperties)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching properties:", error)
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const togglePropertySelection = (id: string) => {
    setSelectedProperties((prev) => (prev.includes(id) ? prev.filter((propId) => propId !== id) : [...prev, id]))
  }

  const toggleAllProperties = () => {
    if (selectedProperties.length === filteredProperties.length) {
      setSelectedProperties([])
    } else {
      setSelectedProperties(filteredProperties.map((property) => property.id))
    }
  }

  const toggleVerification = (id: string) => {
    setProperties(
      properties.map((property) => (property.id === id ? { ...property, isVerified: !property.isVerified } : property)),
    )
  }

  const toggleFeatured = (id: string) => {
    setProperties(
      properties.map((property) => (property.id === id ? { ...property, isFeatured: !property.isFeatured } : property)),
    )
  }

  const filteredProperties = properties.filter((property) => {
    // Apply search filter
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.owner.toLowerCase().includes(searchTerm.toLowerCase())

    // Apply status filter
    const matchesStatus = statusFilter === "all" || property.status === statusFilter

    // Apply type filter
    const matchesType = typeFilter === "all" || property.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  if (loading) {
    return <div>Loading properties...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <CustomInput
              placeholder="Search properties..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <CustomSelect
            options={[
              { value: "all", label: "All Status" },
              { value: "active", label: "Active" },
              { value: "pending", label: "Pending" },
              { value: "inactive", label: "Inactive" },
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
          />

          <CustomSelect
            options={[
              { value: "all", label: "All Types" },
              { value: "rent", label: "For Rent" },
              { value: "pg", label: "PG/Hostel" },
              { value: "sharing", label: "Flatmate" },
              { value: "commercial", label: "Commercial" },
            ]}
            value={typeFilter}
            onChange={setTypeFilter}
          />
        </div>

        <div className="flex gap-2">
          <CustomButton variant="outline" size="sm" disabled={selectedProperties.length === 0}>
            <Check className="mr-2 h-4 w-4" />
            Verify Selected
          </CustomButton>
          <CustomButton variant="outline" size="sm" disabled={selectedProperties.length === 0}>
            <Trash className="mr-2 h-4 w-4" />
            Delete Selected
          </CustomButton>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedProperties.length === filteredProperties.length && filteredProperties.length > 0}
                  onCheckedChange={toggleAllProperties}
                  aria-label="Select all properties"
                />
              </TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProperties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  No properties found
                </TableCell>
              </TableRow>
            ) : (
              filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProperties.includes(property.id)}
                      onCheckedChange={() => togglePropertySelection(property.id)}
                      aria-label={`Select property ${property.title}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="font-medium">{property.title}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <CustomBadge variant="outline" className="capitalize">
                      {property.type}
                    </CustomBadge>
                  </TableCell>
                  <TableCell>₹{property.price.toLocaleString()}</TableCell>
                  <TableCell>{property.owner}</TableCell>
                  <TableCell>
                    <CustomBadge
                      variant={
                        property.status === "active"
                          ? "success"
                          : property.status === "pending"
                            ? "secondary"
                            : "outline"
                      }
                      className="capitalize"
                    >
                      {property.status}
                    </CustomBadge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleVerification(property.id)}
                      className={property.isVerified ? "text-green-500" : "text-gray-400"}
                    >
                      {property.isVerified ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFeatured(property.id)}
                      className={property.isFeatured ? "text-blue-500" : "text-gray-400"}
                    >
                      {property.isFeatured ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
