"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Phone, MessageSquare } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"

// Replace shadcn components with custom components
import { CustomButton } from "@/components/custom-button"
import { CustomInput } from "@/components/custom-input"
import { Textarea } from "@/components/ui/textarea"

interface PropertyContactFormProps {
  propertyId: string
  ownerEmail: string
}

export default function PropertyContactForm({ propertyId, ownerEmail }: PropertyContactFormProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("I'm interested in this property. Please contact me with more information.")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ propertyId, ownerEmail, name, email, phone, message }),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Message sent!",
        description: "The property owner will contact you soon.",
      })

      // Reset form
      setMessage("")
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <CustomInput placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <CustomInput
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <CustomInput
          type="tel"
          placeholder="Your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div>
        <Textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          required
        />
      </div>
      <div className="space-y-2">
        <CustomButton type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <MessageSquare className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </CustomButton>
        <CustomButton type="button" variant="outline" className="w-full">
          <Phone className="mr-2 h-4 w-4" />
          Request Call Back
        </CustomButton>
      </div>
    </form>
  )
}
