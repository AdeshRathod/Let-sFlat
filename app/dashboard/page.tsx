"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/hooks/use-auth"
// Replace shadcn components with custom components
import { CustomButton } from "@/components/custom-button"
import { CustomTabs, CustomTabsList, CustomTabsTrigger, CustomTabsContent } from "@/components/custom-tabs"
import { Plus, Home, Building, Users, Store } from "lucide-react"
import DashboardProperties from "@/components/dashboard-properties"
import DashboardStats from "@/components/dashboard-stats"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user.name}</p>
        </div>
        {/* Replace Button with CustomButton */}
        <CustomButton>
          <Plus className="mr-2 h-4 w-4" />
          Add New Property
        </CustomButton>
      </div>

      <DashboardStats />

      <div className="mt-8">
        {/* Replace Tabs with CustomTabs */}
        <CustomTabs defaultValue="all">
          <div className="flex justify-between items-center mb-6">
            <CustomTabsList>
              <CustomTabsTrigger value="all">All Properties</CustomTabsTrigger>
              <CustomTabsTrigger value="rent">
                <Home className="mr-2 h-4 w-4" />
                For Rent
              </CustomTabsTrigger>
              <CustomTabsTrigger value="pg">
                <Building className="mr-2 h-4 w-4" />
                PG/Hostel
              </CustomTabsTrigger>
              <CustomTabsTrigger value="sharing">
                <Users className="mr-2 h-4 w-4" />
                Flatmate
              </CustomTabsTrigger>
              <CustomTabsTrigger value="commercial">
                <Store className="mr-2 h-4 w-4" />
                Commercial
              </CustomTabsTrigger>
            </CustomTabsList>
          </div>

          <CustomTabsContent value="all">
            <DashboardProperties type="all" />
          </CustomTabsContent>

          <CustomTabsContent value="rent">
            <DashboardProperties type="rent" />
          </CustomTabsContent>

          <CustomTabsContent value="pg">
            <DashboardProperties type="pg" />
          </CustomTabsContent>

          <CustomTabsContent value="sharing">
            <DashboardProperties type="sharing" />
          </CustomTabsContent>

          <CustomTabsContent value="commercial">
            <DashboardProperties type="commercial" />
          </CustomTabsContent>
        </CustomTabs>
      </div>
    </div>
  )
}
