import { notFound } from "next/navigation"
import Image from "next/image"
import { createServerSupabaseClient, getChaptersByComicSlug } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ChapterList } from "@/components/chapter-list"

interface ComicDetailPageProps {
  params: Promise<{
    type: string
    slug: string
  }>
}

interface ComicData {
  comic_slug: string
  type: string
  localized_title: string
  original_title: string
  cover_url: string
  description: string
  genre: string
  author: string
  status: string
  age_rating: string
  reading_direction: string
}

async function getComicByTypeAndSlug(type: string, slug: string): Promise<ComicData | null> {
  const supabase = createServerSupabaseClient()
  
  // First, get the basic comic info from any chapter
  const { data: basicData, error: basicError } = await supabase
    .from('comic_chapters')
    .select(`
      comic_slug,
      type,
      localized_title,
      original_title,
      description,
      genre,
      author,
      status,
      age_rating,
      reading_direction
    `)
    .eq('comic_slug', slug)
    .eq('type', type)
    .limit(1)
    .single()

  if (basicError || !basicData) {
    return null
  }

  // Then, get the cover_url from the first chapter that has one
  const { data: coverData } = await supabase
    .from('comic_chapters')
    .select('cover_url')
    .eq('comic_slug', slug)
    .eq('type', type)
    .not('cover_url', 'is', null)
    .order('chapter_number', { ascending: true })
    .limit(1)
    .single()

  return {
    ...basicData,
    cover_url: coverData?.cover_url || null
  }
}

// Helper function to get valid image source with fallback
function getValidImageSrc(url: string | null): string {
  if (!url) {
    return "/placeholder.svg"
  }
  
  // Check if it's a valid HTTP/HTTPS URL
  try {
    const urlObj = new URL(url)
    
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return "/placeholder.svg"
    }
    
    // Check for common placeholder domains
    const invalidDomains = ['example.com', 'placeholder.com', 'via.placeholder.com']
    if (invalidDomains.some(domain => urlObj.hostname.includes(domain))) {
      return "/placeholder.svg"
    }
    
    return url
  } catch (error) {
    return "/placeholder.svg"
  }
}

export async function generateMetadata({ params }: ComicDetailPageProps) {
  const { type, slug } = await params
  
  // Convert URL type to database type format
  const dbType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
  const comic = await getComicByTypeAndSlug(dbType, slug)
  
  if (!comic) {
    return {
      title: 'Comic Not Found',
      description: 'The requested comic could not be found.'
    }
  }

  return {
    title: `${comic.original_title} - ${comic.type}`,
    description: comic.description || `Read ${comic.original_title} online.`,
    openGraph: {
      title: comic.original_title,
      description: comic.description,
      images: comic.cover_url ? [comic.cover_url] : undefined,
      type: 'website'
    }
  }
}

export default async function ComicDetailPage({ params }: ComicDetailPageProps) {
  const { type, slug } = await params
  
  // Validate type parameter
  const validTypes = ['manga', 'manhwa', 'manhua']
  if (!validTypes.includes(type.toLowerCase())) {
    notFound()
  }
  
  // Convert URL type to database type format
  const dbType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
  const comic = await getComicByTypeAndSlug(dbType, slug)
  
  if (!comic) {
    notFound()
  }

  // Get chapters for this comic
  const chapters = await getChaptersByComicSlug(slug)

  // Parse genres into array
  const genres = comic.genre ? comic.genre.split(',').map(g => g.trim()).filter(Boolean) : []

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cover Image */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={getValidImageSrc(comic.cover_url)}
                      alt={comic.original_title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Genre */}
            <div className="space-y-4">
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  {comic.original_title}
                </h1>
              </div>
              
              {genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Synopsis */}
            {comic.description && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Synopsis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {comic.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Comic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Comic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground mb-1">Type</dt>
                      <dd className="text-sm">
                        <Badge variant="outline">{comic.type}</Badge>
                      </dd>
                    </div>
                    
                    {comic.author && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground mb-1">Author</dt>
                        <dd className="text-sm">{comic.author}</dd>
                      </div>
                    )}
                    
                    {comic.status && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground mb-1">Status</dt>
                        <dd className="text-sm">
                          <Badge 
                            variant={comic.status.toLowerCase() === 'ongoing' ? 'default' : 'secondary'}
                          >
                            {comic.status}
                          </Badge>
                        </dd>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {comic.age_rating && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground mb-1">Age Rating</dt>
                        <dd className="text-sm">{comic.age_rating}</dd>
                      </div>
                    )}
                    
                    {comic.reading_direction && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground mb-1">Reading Direction</dt>
                        <dd className="text-sm">{comic.reading_direction}</dd>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chapter List */}
            <ChapterList chapters={chapters} comicSlug={slug} comicType={comic.type} />
          </div>
        </div>
      </main>
    </div>
  )
}