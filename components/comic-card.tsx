import Image from "next/image"
import Link from "next/link"
import type { ComicWithLatestChapter } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ComicCardProps {
  comic: ComicWithLatestChapter
}

export function ComicCard({ comic }: ComicCardProps) {
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
    <Card className="overflow-hidden rounded-lg shadow-md transition-all hover:scale-[1.02] hover:shadow-lg">
      <Link href={`/${comic.type?.toLowerCase() || 'manga'}/${comic.slug}`} className="group block" prefetch={false}>
        <CardContent className="p-0">
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <Image
              src={getValidImageSrc(comic.cover_url)}
              alt={`Cover of ${comic.title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
          <div className="p-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <h3 className="text-lg font-semibold line-clamp-1 leading-tight cursor-help">
                    {comic.title}
                  </h3>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{comic.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {comic.latest_chapter_number && (
              <p className="text-sm text-muted-foreground mt-1">Latest: Chapter {comic.latest_chapter_number}</p>
            )}
            {comic.latest_chapter_created_at && (
              <p className="text-xs text-muted-foreground mt-1">
                Updated: {new Date(comic.latest_chapter_created_at).toLocaleDateString()}
              </p>
            )}
          </div>
        </CardContent>
      </Link>
      <div className="p-4 pt-0">
        <Link href={`/${comic.type?.toLowerCase() || 'manga'}/${comic.slug}`} passHref>
          <Button className="w-full">
            Read
          </Button>
        </Link>
      </div>
    </Card>
  )
}
