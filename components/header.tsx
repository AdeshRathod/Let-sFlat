"use client"

import { Button } from "@/components/ui/button"

import Link from "next/link"
import { CustomButton } from "@/components/custom-button"
import { useAuth } from "@/lib/hooks/use-auth"
import { useState } from "react"
import { Menu, X, LogOut, Home, Settings, MessageSquare } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "./theme-toggle"

export default function Header() {
  const { user, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {/* Update the platform name */}
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Let'sFlat
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/properties" className="text-foreground/80 hover:text-foreground">
                Browse
              </Link>
              <Link href="/properties?type=rent" className="text-foreground/80 hover:text-foreground">
                Rent
              </Link>
              <Link href="/properties?type=pg" className="text-foreground/80 hover:text-foreground">
                PG/Hostel
              </Link>
              <Link href="/properties?type=sharing" className="text-foreground/80 hover:text-foreground">
                Flatmate
              </Link>
              <Link href="/properties?type=commercial" className="text-foreground/80 hover:text-foreground">
                Commercial
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                      <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <Home className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/messages" className="cursor-pointer">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Messages</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex md:items-center md:space-x-4">
                <Link href="/auth/login">
                  <CustomButton variant="ghost">Log in</CustomButton>
                </Link>
                <Link href="/auth/register">
                  <CustomButton variant="primary">Sign up</CustomButton>
                </Link>
              </div>
            )}
            <button type="button" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/properties"
              className="block py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse
            </Link>
            <Link
              href="/properties?type=rent"
              className="block py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Rent
            </Link>
            <Link
              href="/properties?type=pg"
              className="block py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              PG/Hostel
            </Link>
            <Link
              href="/properties?type=sharing"
              className="block py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Flatmate
            </Link>
            <Link
              href="/properties?type=commercial"
              className="block py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Commercial
            </Link>
            {!user && (
              <>
                <div className="border-t border-gray-200 my-4"></div>
                <Link
                  href="/auth/login"
                  className="block py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/auth/register"
                  className="block py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
