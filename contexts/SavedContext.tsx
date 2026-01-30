"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type SavedContextType = {
  savedIds: string[]
  toggleSave: (id: string) => void
  isSaved: (id: string) => boolean
}

const SavedContext = createContext<SavedContextType | undefined>(undefined)

export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([])

  // 1. Load from LocalStorage on startup
  useEffect(() => {
    const stored = localStorage.getItem("saved_properties")
    if (stored) setSavedIds(JSON.parse(stored))
  }, [])

  // 2. Function to Save/Unsave
  const toggleSave = (id: string) => {
    let newIds
    if (savedIds.includes(id)) {
      newIds = savedIds.filter((item) => item !== id) // Remove
    } else {
      newIds = [...savedIds, id] // Add
    }
    setSavedIds(newIds)
    localStorage.setItem("saved_properties", JSON.stringify(newIds))
  }

  // 3. Check if Saved
  const isSaved = (id: string) => savedIds.includes(id)

  return (
    <SavedContext.Provider value={{ savedIds, toggleSave, isSaved }}>
      {children}
    </SavedContext.Provider>
  )
}

export function useSaved() {
  const context = useContext(SavedContext)
  if (!context) throw new Error("useSaved must be used within a SavedProvider")
  return context
}