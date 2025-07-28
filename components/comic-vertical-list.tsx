import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ComicWithLatestChapter } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ComicVerticalListProps {
  comics: ComicWithLatestChapter[]
}

interface ComicVerticalCardProps {
  comic: ComicWithLatestChapter
}

function ComicVerticalCard({ comic }: ComicVerticalCardProps) {
  // Check if cover_url is a valid URL, otherwise use placeholder
  const getValidImageSrc = (url: string | null | undefined): string => {
    if (!url) return "/placeholder.svg";
    
    // Check if it's a valid HTTP/HTTPS URL
    try {
      const urlObj = new URL(url);
      if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
        // Additional check for common invalid domains
        if (url.includes('example.com') || url.includes('placeholder.com')) {
          return "/placeholder.svg";
        }
        return url;
      }
    } catch {
      // Invalid URL format
    }
    
    return "/placeholder.svg";
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Comic Cover */}
          <div className="w-full sm:w-32 md:w-40 flex-shrink-0">
            <Link href={`/${comic.type?.toLowerCase() || 'manga'}/${comic.slug}`}>
              <div className="relative w-full aspect-[3/4] sm:aspect-[3/4]">
                <Image
                  src={getValidImageSrc(comic.cover_url)}
                  alt={`Cover of ${comic.title}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 128px, 160px"
                />
              </div>
            </Link>
          </div>
          
          {/* Comic Details */}
          <div className="flex-1 p-4 sm:p-6">
            <div className="flex flex-col h-full justify-between">
              <div>
                {/* Title and Type Badge */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <Link href={`/${comic.type?.toLowerCase() || 'manga'}/${comic.slug}`}>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground hover:text-primary transition-colors line-clamp-2">
                      {comic.title}
                    </h3>
                  </Link>
                  {comic.type && (
                    <Badge variant="secondary" className="w-fit">
                      {comic.type}
                    </Badge>
                  )}
                </div>
                
                {/* Description */}
                {comic.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {comic.description}
                  </p>
                )}
              </div>
              
              {/* Chapter Info and Action */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
                  <span className="text-primary font-medium">
                    Awal: Chapter 1
                  </span>
                  {comic.latest_chapter_number && (
                    <span className="text-secondary-foreground font-medium">
                      Terbaru: Chapter {comic.latest_chapter_number}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {comic.latest_chapter_created_at && (
                    <span className="text-xs text-muted-foreground">
                      {new Date(comic.latest_chapter_created_at).toLocaleDateString('id-ID')}
                    </span>
                  )}
                  <Link href={`/${comic.type?.toLowerCase() || 'manga'}/${comic.slug}`}>
                    <Button size="sm" className="px-6">
                      Baca
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ComicVerticalList({ comics }: ComicVerticalListProps) {
  if (comics.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          Tidak ada komik yang ditemukan.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {comics.map((comic) => (
        <ComicVerticalCard key={comic.slug} comic={comic} />
      ))}
    </div>
  )
}