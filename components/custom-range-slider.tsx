"use client"

import { useState, useEffect, useRef } from "react"

interface RangeSliderProps {
  min: number
  max: number
  step: number
  defaultValue: [number, number]
  onChange: (values: [number, number]) => void
}

export default function CustomRangeSlider({ min, max, step, defaultValue, onChange }: RangeSliderProps) {
  const [values, setValues] = useState<[number, number]>(defaultValue)
  const [dragging, setDragging] = useState<"min" | "max" | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseUp = () => {
      setDragging(null)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging || !trackRef.current) return

      const track = trackRef.current
      const trackRect = track.getBoundingClientRect()
      const trackWidth = trackRect.width
      const offsetX = e.clientX - trackRect.left

      // Calculate percentage of track (0 to 1)
      const percentage = Math.max(0, Math.min(1, offsetX / trackWidth))

      // Convert percentage to value
      let newValue = Math.round((percentage * (max - min) + min) / step) * step

      // Ensure values don't cross each other
      if (dragging === "min") {
        newValue = Math.min(newValue, values[1] - step)
        setValues([newValue, values[1]])
      } else {
        newValue = Math.max(newValue, values[0] + step)
        setValues([values[0], newValue])
      }

      onChange([values[0], values[1]])
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [dragging, min, max, step, values, onChange])

  // Calculate positions for thumbs
  const minThumbPosition = ((values[0] - min) / (max - min)) * 100
  const maxThumbPosition = ((values[1] - min) / (max - min)) * 100

  return (
    <div className="relative w-full h-12 py-4">
      {/* Track background */}
      <div ref={trackRef} className="absolute h-2 w-full bg-gray-200 rounded-full dark:bg-gray-700">
        {/* Active track */}
        <div
          className="absolute h-full bg-blue-500 rounded-full"
          style={{
            left: `${minThumbPosition}%`,
            width: `${maxThumbPosition - minThumbPosition}%`,
          }}
        />
      </div>

      {/* Min thumb */}
      <div
        className="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full cursor-pointer -mt-1.5 shadow-md hover:scale-110 transition-transform"
        style={{ left: `calc(${minThumbPosition}% - 10px)` }}
        onMouseDown={() => setDragging("min")}
      />

      {/* Max thumb */}
      <div
        className="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full cursor-pointer -mt-1.5 shadow-md hover:scale-110 transition-transform"
        style={{ left: `calc(${maxThumbPosition}% - 10px)` }}
        onMouseDown={() => setDragging("max")}
      />

      {/* Labels */}
      <div className="absolute w-full flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-300">
        <span>₹{min.toLocaleString()}</span>
        <span>₹{max.toLocaleString()}</span>
      </div>
    </div>
  )
}
