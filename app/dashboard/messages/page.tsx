"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/hooks/use-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Search } from "lucide-react"

// Replace shadcn components with custom components
import { CustomButton } from "@/components/custom-button"
import { CustomInput } from "@/components/custom-input"
import { CustomTabs, CustomTabsList, CustomTabsTrigger, CustomTabsContent } from "@/components/custom-tabs"

// Mock data for messages
const mockMessages = [
  {
    id: "1",
    conversationId: "conv1",
    sender: {
      id: "user2",
      name: "Rahul Sharma",
      image: "/placeholder.svg?height=40&width=40&text=RS",
    },
    property: {
      id: "prop1",
      title: "Modern 3BHK Apartment with Garden View",
    },
    lastMessage: "Is this property still available?",
    timestamp: "2023-06-05T10:30:00",
    unread: true,
  },
  {
    id: "2",
    conversationId: "conv2",
    sender: {
      id: "user3",
      name: "Priya Patel",
      image: "/placeholder.svg?height=40&width=40&text=PP",
    },
    property: {
      id: "prop2",
      title: "Luxury 2BHK Flat Near Metro",
    },
    lastMessage: "Can I schedule a visit this weekend?",
    timestamp: "2023-06-04T15:45:00",
    unread: false,
  },
  {
    id: "3",
    conversationId: "conv3",
    sender: {
      id: "user4",
      name: "Amit Kumar",
      image: "/placeholder.svg?height=40&width=40&text=AK",
    },
    property: {
      id: "prop3",
      title: "Spacious PG with AC Rooms",
    },
    lastMessage: "Thank you for the information.",
    timestamp: "2023-06-03T09:15:00",
    unread: false,
  },
]

// Mock data for conversation messages
const mockConversationMessages = [
  {
    id: "msg1",
    conversationId: "conv1",
    senderId: "user2",
    text: "Hello, I'm interested in your property 'Modern 3BHK Apartment with Garden View'.",
    timestamp: "2023-06-05T10:15:00",
  },
  {
    id: "msg2",
    conversationId: "conv1",
    senderId: "user1",
    text: "Hi there! Thank you for your interest. What would you like to know about the property?",
    timestamp: "2023-06-05T10:20:00",
  },
  {
    id: "msg3",
    conversationId: "conv1",
    senderId: "user2",
    text: "Is this property still available?",
    timestamp: "2023-06-05T10:30:00",
  },
]

export default function MessagesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [conversations, setConversations] = useState<any[]>([])
  const [activeConversation, setActiveConversation] = useState<any>(null)
  const [conversationMessages, setConversationMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    // Simulate API call to fetch conversations
    const fetchConversations = async () => {
      // In a real app, this would be an API call
      // const response = await fetch('/api/messages');
      // const data = await response.json();

      // Using mock data for now
      setTimeout(() => {
        setConversations(mockMessages)
      }, 1000)
    }

    if (user) {
      fetchConversations()
    }
  }, [user])

  useEffect(() => {
    if (activeConversation) {
      // Simulate API call to fetch conversation messages
      const fetchMessages = async () => {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/messages/${activeConversation.conversationId}`);
        // const data = await response.json();

        // Using mock data for now
        setTimeout(() => {
          setConversationMessages(mockConversationMessages)
        }, 500)
      }

      fetchMessages()

      // Mark conversation as read
      setConversations(
        conversations.map((conv) =>
          conv.conversationId === activeConversation.conversationId ? { ...conv, unread: false } : conv,
        ),
      )
    }
  }, [activeConversation, conversations])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !activeConversation) return

    // In a real app, this would be an API call
    // fetch(`/api/messages/${activeConversation.conversationId}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ text: newMessage }),
    // });

    // Optimistically add the message to the UI
    const newMsg = {
      id: `msg${Date.now()}`,
      conversationId: activeConversation.conversationId,
      senderId: user?.id || "user1",
      text: newMessage,
      timestamp: new Date().toISOString(),
    }

    setConversationMessages([...conversationMessages, newMsg])
    setNewMessage("")
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.property.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading || !user) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Messages</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 border rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <CustomInput
                placeholder="Search conversations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <CustomTabs defaultValue="all">
            <div className="px-4 pt-4">
              <CustomTabsList className="w-full">
                <CustomTabsTrigger value="all" className="flex-1">
                  All
                </CustomTabsTrigger>
                <CustomTabsTrigger value="unread" className="flex-1">
                  Unread
                </CustomTabsTrigger>
              </CustomTabsList>
            </div>

            <CustomTabsContent value="all" className="m-0">
              <div className="divide-y max-h-[600px] overflow-y-auto">
                {filteredConversations.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">No conversations found</div>
                ) : (
                  filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 ${
                        activeConversation?.conversationId === conversation.conversationId ? "bg-gray-50" : ""
                      } ${conversation.unread ? "font-medium" : ""}`}
                      onClick={() => setActiveConversation(conversation)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={conversation.sender.image || "/placeholder.svg"}
                            alt={conversation.sender.name}
                          />
                          <AvatarFallback>{conversation.sender.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className="font-medium truncate">{conversation.sender.name}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(conversation.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{conversation.property.title}</p>
                          <p className="text-sm truncate">{conversation.lastMessage}</p>
                        </div>
                        {conversation.unread && <div className="h-2 w-2 bg-blue-600 rounded-full"></div>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CustomTabsContent>

            <CustomTabsContent value="unread" className="m-0">
              <div className="divide-y max-h-[600px] overflow-y-auto">
                {filteredConversations.filter((c) => c.unread).length === 0 ? (
                  <div className="p-4 text-center text-gray-500">No unread messages</div>
                ) : (
                  filteredConversations
                    .filter((c) => c.unread)
                    .map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 ${
                          activeConversation?.conversationId === conversation.conversationId ? "bg-gray-50" : ""
                        } font-medium`}
                        onClick={() => setActiveConversation(conversation)}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={conversation.sender.image || "/placeholder.svg"}
                              alt={conversation.sender.name}
                            />
                            <AvatarFallback>{conversation.sender.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <p className="font-medium truncate">{conversation.sender.name}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(conversation.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{conversation.property.title}</p>
                            <p className="text-sm truncate">{conversation.lastMessage}</p>
                          </div>
                          <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </CustomTabsContent>
          </CustomTabs>
        </div>

        <div className="lg:col-span-2 border rounded-lg overflow-hidden flex flex-col h-[700px]">
          {activeConversation ? (
            <>
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={activeConversation.sender.image || "/placeholder.svg"}
                      alt={activeConversation.sender.name}
                    />
                    <AvatarFallback>{activeConversation.sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{activeConversation.sender.name}</p>
                    <p className="text-sm text-gray-600">{activeConversation.property.title}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversationMessages.map((message) => {
                  const isCurrentUser = message.senderId === user.id || message.senderId === "user1"

                  return (
                    <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          isCurrentUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${isCurrentUser ? "text-blue-100" : "text-gray-500"}`}>
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <CustomInput
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <CustomButton type="submit" disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </CustomButton>
                </form>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-center p-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
