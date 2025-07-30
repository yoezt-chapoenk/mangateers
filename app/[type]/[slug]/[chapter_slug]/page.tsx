import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import { createServerSupabaseClient, getChapterBySlug, getImagesByChapterSlug, getChapterNavigation } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ChapterPageProps {
  params: Promise<{
    type: string
    slug: string
    chapter_slug: string
  }>
}

export async function generateMetadata({ params }: ChapterPageProps) {
  const { type, slug, chapter_slug } = await params
  
  // Convert URL type to database type format
  const dbType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
  const chapter = await getChapterBySlug(slug, chapter_slug)
  
  if (!chapter) {
    return {
      title: 'Chapter Not Found',
      description: 'The requested chapter could not be found.'
    }
  }

  return {
    title: `${chapter.original_title || chapter.comic_title} - Chapter ${chapter.chapter_number}`,
    description: `Read Chapter ${chapter.chapter_number} of ${chapter.original_title || chapter.comic_title} online.`,
    openGraph: {
      title: `Chapter ${chapter.chapter_number} - ${chapter.original_title || chapter.comic_title}`,
      description: `Read Chapter ${chapter.chapter_number} online`,
      images: chapter.cover_url ? [chapter.cover_url] : undefined,
      type: 'website'
    }
  }
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { type, slug, chapter_slug } = await params
  
  // Validate type parameter
  const validTypes = ['manga', 'manhwa', 'manhua']
  if (!validTypes.includes(type.toLowerCase())) {
    notFound()
  }
  
  // Convert URL type to database type format
  const dbType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
  const chapter = await getChapterBySlug(slug, chapter_slug)
  
  if (!chapter || chapter.type !== dbType) {
    notFound()
  }

  // Get chapter images
  const images = await getImagesByChapterSlug(chapter_slug)
  
  // Get navigation info
  const navigation = await getChapterNavigation(slug, chapter.chapter_number)

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-2 py-2">
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1">
              <Link href={`/${type}/${slug}`}>
                <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                  <ArrowLeft className="h-3 w-3" />
                  <span className="hidden sm:inline ml-1">Back</span>
                </Button>
              </Link>
              <Link href="/" className="hidden sm:block">
                <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                  <Home className="h-3 w-3 mr-1" />
                  Home
                </Button>
              </Link>
            </div>
            
            <div className="text-center flex-1">
              <p className="text-xs text-muted-foreground">
                Ch. {chapter.chapter_number}
              </p>
            </div>
            
            <div className="flex items-center gap-1">
              {navigation.prevChapter && (
                <Link href={`/${type}/${slug}/${navigation.prevChapter.chapter_slug}`}>
                  <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                    <ArrowLeft className="h-3 w-3" />
                    <span className="hidden sm:inline ml-1">Prev</span>
                  </Button>
                </Link>
              )}
              {navigation.nextChapter && (
                <Link href={`/${type}/${slug}/${navigation.nextChapter.chapter_slug}`}>
                  <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                    <span className="hidden sm:inline mr-1">Next</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {images.length > 0 ? (
            <div className="space-y-4">
              {images.map((image, index) => (
                <Card key={`${image.chapter_slug}-${image.image_index}`} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative w-full">
                      <Image
                        src={image.image_url || "/placeholder.svg"}
                        alt={`Page ${image.image_index} of Chapter ${chapter.chapter_number}`}
                        width={800}
                        height={1200}
                        className="w-full h-auto object-contain"
                        priority={index < 2}
                        loading={index < 2 ? 'eager' : 'lazy'}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No images available for this chapter.</p>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-t">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {navigation.prevChapter ? (
              <Link href={`/${type}/${slug}/${navigation.prevChapter.chapter_slug}`}>
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Chapter {navigation.prevChapter.chapter_number}
                </Button>
              </Link>
            ) : (
              <div></div>
            )}
            
            <Link href={`/${type}/${slug}`}>
              <Button variant="default">
                Back to Comic
              </Button>
            </Link>
            
            {navigation.nextChapter ? (
              <Link href={`/${type}/${slug}/${navigation.nextChapter.chapter_slug}`}>
                <Button variant="outline">
                  Chapter {navigation.nextChapter.chapter_number}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}