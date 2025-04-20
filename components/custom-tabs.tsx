"use client"

import type React from "react"

import { useState, createContext, useContext } from "react"

type TabsContextType = {
  activeTab: string
  setActiveTab: (id: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

function useTabs() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within a TabsProvider")
  }
  return context
}

interface TabsProps {
  defaultValue: string
  children: React.ReactNode
  className?: string
}

export function CustomTabs({ defaultValue, children, className = "" }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

export function CustomTabsList({ children, className = "" }: TabsListProps) {
  return (
    <div
      className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 dark:bg-gray-800 ${className}`}
    >
      {children}
    </div>
  )
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function CustomTabsTrigger({ value, children, className = "" }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabs()

  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 ${
        activeTab === value
          ? "bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-gray-50"
          : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      } ${className}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function CustomTabsContent({ value, children, className = "" }: TabsContentProps) {
  const { activeTab } = useTabs()

  if (activeTab !== value) return null

  return (
    <div
      className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:ring-offset-gray-950 ${className}`}
    >
      {children}
    </div>
  )
}
