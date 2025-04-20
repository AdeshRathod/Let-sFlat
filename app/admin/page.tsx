"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/hooks/use-auth"
// Replace shadcn components with custom components
import { CustomTabs, CustomTabsList, CustomTabsTrigger, CustomTabsContent } from "@/components/custom-tabs"
import AdminUsers from "@/components/admin-users"
import AdminProperties from "@/components/admin-properties"
import AdminVerifications from "@/components/admin-verifications"
import AdminDashboard from "@/components/admin-dashboard"

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (user.role !== "admin") {
    return <div className="container mx-auto px-4 py-8">Access denied. Admin privileges required.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Replace Tabs with CustomTabs */}
      <CustomTabs defaultValue="dashboard">
        <CustomTabsList className="mb-8">
          <CustomTabsTrigger value="dashboard">Dashboard</CustomTabsTrigger>
          <CustomTabsTrigger value="properties">Properties</CustomTabsTrigger>
          <CustomTabsTrigger value="users">Users</CustomTabsTrigger>
          <CustomTabsTrigger value="verifications">Verifications</CustomTabsTrigger>
        </CustomTabsList>

        <CustomTabsContent value="dashboard">
          <AdminDashboard />
        </CustomTabsContent>

        <CustomTabsContent value="properties">
          <AdminProperties />
        </CustomTabsContent>

        <CustomTabsContent value="users">
          <AdminUsers />
        </CustomTabsContent>

        <CustomTabsContent value="verifications">
          <AdminVerifications />
        </CustomTabsContent>
      </CustomTabs>
    </div>
  )
}
