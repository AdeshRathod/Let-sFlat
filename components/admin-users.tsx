"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Lock, Unlock, Eye, Edit, Trash } from "lucide-react"

// Mock data for admin users
const mockAdminUsers = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    role: "owner",
    status: "active",
    properties: 3,
    joinedOn: "2023-01-15",
    image: "/placeholder.svg?height=40&width=40&text=RS",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya@example.com",
    role: "owner",
    status: "active",
    properties: 2,
    joinedOn: "2023-02-20",
    image: "/placeholder.svg?height=40&width=40&text=PP",
  },
  {
    id: "3",
    name: "Amit Kumar",
    email: "amit@example.com",
    role: "agent",
    status: "active",
    properties: 8,
    joinedOn: "2022-11-05",
    image: "/placeholder.svg?height=40&width=40&text=AK",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    email: "sneha@example.com",
    role: "tenant",
    status: "active",
    properties: 0,
    joinedOn: "2023-03-10",
    image: "/placeholder.svg?height=40&width=40&text=SR",
  },
  {
    id: "5",
    name: "Deepak Verma",
    email: "deepak@example.com",
    role: "owner",
    status: "suspended",
    properties: 1,
    joinedOn: "2023-01-25",
    image: "/placeholder.svg?height=40&width=40&text=DV",
  },
]

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  useEffect(() => {
    // Simulate API call with a delay
    const fetchUsers = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/admin/users');
        // const data = await response.json();

        // Using mock data for now
        setTimeout(() => {
          setUsers(mockAdminUsers)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching users:", error)
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const toggleUserSelection = (id: string) => {
    setSelectedUsers((prev) => (prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]))
  }

  const toggleAllUsers = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    }
  }

  const toggleUserStatus = (id: string) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: user.status === "active" ? "suspended" : "active" } : user,
      ),
    )
  }

  const filteredUsers = users.filter((user) => {
    // Apply search filter
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    // Apply role filter
    const matchesRole = roleFilter === "all" || user.role === roleFilter

    // Apply status filter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  if (loading) {
    return <div>Loading users...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="owner">Owner</SelectItem>
              <SelectItem value="tenant">Tenant</SelectItem>
              <SelectItem value="agent">Agent</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={selectedUsers.length === 0}>
            <Lock className="mr-2 h-4 w-4" />
            Suspend Selected
          </Button>
          <Button variant="outline" size="sm" disabled={selectedUsers.length === 0}>
            <Trash className="mr-2 h-4 w-4" />
            Delete Selected
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onCheckedChange={toggleAllUsers}
                  aria-label="Select all users"
                />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Properties</TableHead>
              <TableHead>Joined On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => toggleUserSelection(user.id)}
                      aria-label={`Select user ${user.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.properties}</TableCell>
                  <TableCell>{new Date(user.joinedOn).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "success" : "destructive"} className="capitalize">
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleUserStatus(user.id)}
                        title={user.status === "active" ? "Suspend User" : "Activate User"}
                      >
                        {user.status === "active" ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" title="View User">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit User">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500" title="Delete User">
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
