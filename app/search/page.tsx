'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ComicList } from '@/components/comic-list'
import { getLatestUpdatedComics } from '@/lib/supabase'
import type { ComicWithLatestChapter } from '@/lib/supabase'

function SearchContent() {
  const [comics, setComics] = useState<ComicWithLatestChapter[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  useEffect(() => {
    async function fetchComics() {
      try {
        setLoading(true)
        const allComics = await getLatestUpdatedComics()
        setComics(allComics)
      } catch (error) {
        console.error('Error fetching comics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchComics()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Loading comics...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Search Comics
          </h1>
          <p className="text-muted-foreground">
            {query ? `Search results for "${query}"` : 'Search for your favorite comics'}
          </p>
        </div>
        
        <ComicList comics={comics} />
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Loading search...</p>
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}