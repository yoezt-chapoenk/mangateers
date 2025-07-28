"use client"

import * as React from "react"
import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ComicCard } from "@/components/comic-card"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import type { ComicWithLatestChapter } from "@/lib/supabase"

interface ComicListProps {
  comics: ComicWithLatestChapter[]
}

function ComicListContent({ comics }: ComicListProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = React.useState(searchParams.get('q') || "")

  const filteredComics = comics.filter((comic) => {
    const matchesSearch = comic.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full md:w-auto flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search comics by title..."
            className="w-full rounded-lg bg-background pl-8"
            value={searchTerm}
            onChange={(e) => {
              const value = e.target.value
              setSearchTerm(value)
              // Update URL with search query
              const params = new URLSearchParams(searchParams.toString())
              if (value) {
                params.set('q', value)
              } else {
                params.delete('q')
              }
              router.push(`/search?${params.toString()}`, { scroll: false })
            }}
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">Latest Updates</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {filteredComics.length > 0 ? (
          filteredComics.map((comic) => <ComicCard key={comic.slug} comic={comic} />)
        ) : (
          <div className="col-span-full text-center text-muted-foreground py-10">
            No comics found matching your criteria.
          </div>
        )}
      </div>
      {/* Pagination or infinite scroll can be added here */}
    </div>
  )
}

export function ComicList({ comics }: ComicListProps) {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Loading comics...</p>
        </div>
      </div>
    }>
      <ComicListContent comics={comics} />
    </Suspense>
  )
}
