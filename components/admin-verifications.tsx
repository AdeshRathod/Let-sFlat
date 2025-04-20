"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X, Eye } from "lucide-react"

// Mock data for verification requests
const mockVerificationRequests = [
  {
    id: "1",
    propertyId: "101",
    propertyTitle: "Modern 3BHK Apartment with Garden View",
    ownerName: "Rahul Sharma",
    ownerEmail: "rahul@example.com",
    requestDate: "2023-06-05",
    status: "pending",
    documents: [
      "/placeholder.svg?height=200&width=300&text=Document+1",
      "/placeholder.svg?height=200&width=300&text=Document+2",
    ],
  },
  {
    id: "2",
    propertyId: "102",
    propertyTitle: "Luxury 2BHK Flat Near Metro",
    ownerName: "Priya Patel",
    ownerEmail: "priya@example.com",
    requestDate: "2023-06-04",
    status: "pending",
    documents: ["/placeholder.svg?height=200&width=300&text=Document+1"],
  },
  {
    id: "3",
    propertyId: "103",
    propertyTitle: "Spacious PG with AC Rooms",
    ownerName: "Amit Kumar",
    ownerEmail: "amit@example.com",
    requestDate: "2023-06-03",
    status: "approved",
    documents: [
      "/placeholder.svg?height=200&width=300&text=Document+1",
      "/placeholder.svg?height=200&width=300&text=Document+2",
      "/placeholder.svg?height=200&width=300&text=Document+3",
    ],
  },
  {
    id: "4",
    propertyId: "104",
    propertyTitle: "Commercial Office Space in Business Park",
    ownerName: "Deepak Verma",
    ownerEmail: "deepak@example.com",
    requestDate: "2023-06-02",
    status: "rejected",
    documents: ["/placeholder.svg?height=200&width=300&text=Document+1"],
    rejectionReason: "Incomplete documentation",
  },
]

export default function AdminVerifications() {
  const [verifications, setVerifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)

  useEffect(() => {
    // Simulate API call with a delay
    const fetchVerifications = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/admin/verifications');
        // const data = await response.json();

        // Using mock data for now
        setTimeout(() => {
          setVerifications(mockVerificationRequests)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching verification requests:", error)
        setLoading(false)
      }
    }

    fetchVerifications()
  }, [])

  const approveVerification = (id: string) => {
    setVerifications(
      verifications.map((verification) =>
        verification.id === id ? { ...verification, status: "approved" } : verification,
      ),
    )
  }

  const rejectVerification = (id: string) => {
    setVerifications(
      verifications.map((verification) =>
        verification.id === id
          ? { ...verification, status: "rejected", rejectionReason: "Rejected by admin" }
          : verification,
      ),
    )
  }

  const viewVerificationDetails = (verification: any) => {
    setSelectedRequest(verification)
  }

  if (loading) {
    return <div>Loading verification requests...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Property Verification Requests</h2>
        <div className="flex gap-2">
          <Badge variant="outline" className="px-3 py-1">
            Pending: {verifications.filter((v) => v.status === "pending").length}
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            Approved: {verifications.filter((v) => v.status === "approved").length}
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            Rejected: {verifications.filter((v) => v.status === "rejected").length}
          </Badge>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {verifications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No verification requests found
                </TableCell>
              </TableRow>
            ) : (
              verifications.map((verification) => (
                <TableRow key={verification.id}>
                  <TableCell>
                    <div className="font-medium">{verification.propertyTitle}</div>
                    <div className="text-sm text-gray-500">ID: {verification.propertyId}</div>
                  </TableCell>
                  <TableCell>
                    <div>{verification.ownerName}</div>
                    <div className="text-sm text-gray-500">{verification.ownerEmail}</div>
                  </TableCell>
                  <TableCell>{new Date(verification.requestDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        verification.status === "approved"
                          ? "success"
                          : verification.status === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                      className="capitalize"
                    >
                      {verification.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{verification.documents.length} document(s)</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => viewVerificationDetails(verification)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {verification.status === "pending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-green-500"
                            onClick={() => approveVerification(verification.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500"
                            onClick={() => rejectVerification(verification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedRequest && (
        <div className="mt-8 p-6 border rounded-lg">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold">{selectedRequest.propertyTitle}</h3>
              <p className="text-gray-500">Verification Request ID: {selectedRequest.id}</p>
            </div>
            <Badge
              variant={
                selectedRequest.status === "approved"
                  ? "success"
                  : selectedRequest.status === "rejected"
                    ? "destructive"
                    : "secondary"
              }
              className="capitalize"
            >
              {selectedRequest.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-2">Property Details</h4>
              <p>
                <span className="text-gray-500">ID:</span> {selectedRequest.propertyId}
              </p>
              <p>
                <span className="text-gray-500">Title:</span> {selectedRequest.propertyTitle}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Owner Details</h4>
              <p>
                <span className="text-gray-500">Name:</span> {selectedRequest.ownerName}
              </p>
              <p>
                <span className="text-gray-500">Email:</span> {selectedRequest.ownerEmail}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-2">Request Information</h4>
            <p>
              <span className="text-gray-500">Date Submitted:</span>{" "}
              {new Date(selectedRequest.requestDate).toLocaleDateString()}
            </p>
            {selectedRequest.status === "rejected" && (
              <p>
                <span className="text-gray-500">Rejection Reason:</span> {selectedRequest.rejectionReason}
              </p>
            )}
          </div>

          <div>
            <h4 className="font-semibold mb-4">Verification Documents</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {selectedRequest.documents.map((doc: string, index: number) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <Image
                    src={doc || "/placeholder.svg"}
                    alt={`Document ${index + 1}`}
                    width={300}
                    height={200}
                    className="w-full h-auto"
                  />
                  <div className="p-2 text-center text-sm">Document {index + 1}</div>
                </div>
              ))}
            </div>
          </div>

          {selectedRequest.status === "pending" && (
            <div className="mt-6 flex gap-4">
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => approveVerification(selectedRequest.id)}
              >
                <Check className="mr-2 h-4 w-4" />
                Approve Verification
              </Button>
              <Button variant="destructive" onClick={() => rejectVerification(selectedRequest.id)}>
                <X className="mr-2 h-4 w-4" />
                Reject Verification
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
