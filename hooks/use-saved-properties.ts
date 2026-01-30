"use client"

import { useState, useEffect } from "react"

export function useSavedProperties() {
  const [saved, setSaved] = useState<number[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load saved properties from localStorage on mount
  useEffect(() => {
    const savedIds = localStorage.getItem("savedProperties")
    setSaved(savedIds ? JSON.parse(savedIds) : [])
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever saved array changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("savedProperties", JSON.stringify(saved))
    }
  }, [saved, isLoaded])

  const toggleSave = (id: number) => {
    setSaved((prev) => (prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]))
  }

  const isSaved = (id: number) => saved.includes(id)

  return { saved, toggleSave, isSaved, isLoaded }
}
