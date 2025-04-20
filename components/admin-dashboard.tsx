import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Mock data for admin dashboard
const mockChartData = [
  { name: "Jan", properties: 40, users: 24, revenue: 12000 },
  { name: "Feb", properties: 45, users: 28, revenue: 14000 },
  { name: "Mar", properties: 55, users: 35, revenue: 18000 },
  { name: "Apr", properties: 60, users: 40, revenue: 22000 },
  { name: "May", properties: 75, users: 48, revenue: 28000 },
  { name: "Jun", properties: 85, users: 55, revenue: 32000 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,234</div>
            <p className="text-xs text-gray-500">+85 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5,678</div>
            <p className="text-xs text-gray-500">+120 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹1,45,000</div>
            <p className="text-xs text-gray-500">+32% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="properties" name="Properties" fill="#4f46e5" />
                <Bar dataKey="users" name="Users" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="font-medium">New property verification request</p>
                <p className="text-sm text-gray-500">3 minutes ago</p>
              </div>
              <div className="border-b pb-4">
                <p className="font-medium">User reported a property</p>
                <p className="text-sm text-gray-500">15 minutes ago</p>
              </div>
              <div className="border-b pb-4">
                <p className="font-medium">New featured listing payment</p>
                <p className="text-sm text-gray-500">1 hour ago</p>
              </div>
              <div className="border-b pb-4">
                <p className="font-medium">New user registration</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
              <div>
                <p className="font-medium">Property removed by owner</p>
                <p className="text-sm text-gray-500">3 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="font-medium">5 properties pending verification</p>
                <p className="text-sm text-gray-500">Oldest: 2 days ago</p>
              </div>
              <div className="border-b pb-4">
                <p className="font-medium">3 user reports to review</p>
                <p className="text-sm text-gray-500">Oldest: 1 day ago</p>
              </div>
              <div className="border-b pb-4">
                <p className="font-medium">2 payment disputes</p>
                <p className="text-sm text-gray-500">Oldest: 3 days ago</p>
              </div>
              <div>
                <p className="font-medium">7 support tickets open</p>
                <p className="text-sm text-gray-500">Oldest: 12 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
