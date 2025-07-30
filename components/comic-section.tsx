import React from 'react'
import { ComicWithLatestChapter } from '@/lib/supabase'
import { ComicCard } from './comic-card'

interface ComicSectionProps {
  title: string
  comics: ComicWithLatestChapter[]
}

export function ComicSection({ title, comics }: ComicSectionProps) {
  if (comics.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {comics.map((comic, index) => (
          <ComicCard 
            key={comic.slug} 
            comic={comic} 
            priority={index < 6} 
            index={index}
          />
        ))}
      </div>
    </section>
  )
}