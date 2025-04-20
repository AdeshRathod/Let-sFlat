"use client"

import { useEffect, useRef } from "react"

interface PropertyMapProps {
  latitude: number
  longitude: number
}

export default function PropertyMap({ latitude, longitude }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // In a real app, this would initialize a map using Google Maps or Mapbox
    // For demo purposes, we'll just show a placeholder
    if (mapRef.current) {
      const mapElement = mapRef.current
      mapElement.innerHTML = `
        <div class="flex items-center justify-center h-full bg-gray-100">
          <div class="text-center">
            <p class="text-lg font-semibold mb-2">Map Location</p>
            <p>Latitude: ${latitude}</p>
            <p>Longitude: ${longitude}</p>
            <p class="mt-4 text-sm text-gray-500">(Map integration would be implemented here)</p>
          </div>
        </div>
      `
    }
  }, [latitude, longitude])

  return <div ref={mapRef} className="w-full h-full"></div>
}
