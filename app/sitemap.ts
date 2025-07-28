import { MetadataRoute } from 'next'
import { getLatestUpdatedComics, getComicsByType, getChaptersByComicSlug } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.mangateers.com'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/manga`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/manhwa`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/manhua`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/dmca`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  try {
    // Get all comics from different types
    const [mangaComics, manhwaComics, manhuaComics] = await Promise.all([
      getComicsByType('Manga'),
      getComicsByType('Manhwa'),
      getComicsByType('Manhua')
    ])

    const allComics = [...mangaComics, ...manhwaComics, ...manhuaComics]
    
    // Generate comic pages
    const comicPages: MetadataRoute.Sitemap = []
    
    for (const comic of allComics) {
      const type = comic.type?.toLowerCase() || 'manga'
      const lastModified = comic.latest_chapter_created_at 
        ? new Date(comic.latest_chapter_created_at)
        : new Date()
      
      // Add comic detail page
      comicPages.push({
        url: `${baseUrl}/${type}/${comic.slug}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.7,
      })

      // Get chapters for this comic and add chapter pages
      try {
        const chapters = await getChaptersByComicSlug(comic.slug)
        
        for (const chapter of chapters) {
          comicPages.push({
            url: `${baseUrl}/${type}/${comic.slug}/${chapter.chapter_slug}`,
            lastModified: new Date(chapter.created_at),
            changeFrequency: 'monthly',
            priority: 0.5,
          })
        }
      } catch (error) {
        console.error(`Error fetching chapters for comic ${comic.slug}:`, error)
        // Continue with other comics even if one fails
      }
    }

    return [...staticPages, ...comicPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return at least static pages if dynamic content fails
    return staticPages
  }
}