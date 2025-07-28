"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle" // Assuming you have a mode-toggle component

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/search')
    }
  }
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg" prefetch={false}>
          <span className="text-primary">-</span> Mangateers
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/manga" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Manga
          </Link>
          <Link href="/manhwa" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Manhwa
          </Link>
          <Link href="/manhua" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Manhua
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search comics..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <Button 
            variant="secondary" 
            size="sm" 
            className="hidden md:inline-flex"
            onClick={handleSearch}
          >
            Search
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
