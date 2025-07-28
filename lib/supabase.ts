import { createClient } from "@supabase/supabase-js"
import { cache } from "react"

// Define types for your Supabase tables based on user's schema
export type ComicChapter = {
  comic_title: string
  comic_slug: string
  chapter_number: number
  chapter_slug: string
  cover_url: string
  created_at: string
  description?: string
  original_title?: string
  localized_title?: string
  type?: string
  author?: string
  status?: string
  age_rating?: string
  reading_direction?: string
  genre?: string
}

export type ChapterImage = {
  chapter_slug: string
  image_index: number
  image_url: string
}

// Derived types for UI components
export type Comic = {
  title: string
  slug: string
  cover_url: string | null
  latest_chapter_number: number | null
  latest_chapter_created_at: string | null
  description?: string
  original_title?: string
  localized_title?: string
  type?: string
  author?: string
  status?: string
  age_rating?: string
  reading_direction?: string
  genre?: string
}

export type Chapter = {
  chapter_number: number
  chapter_slug: string
  created_at: string
}

// Type for comics with their latest chapter information
export type ComicWithLatestChapter = Comic & {
  latest_chapter_number: number | null
}

// Supabase configuration
// Environment variables with fallbacks for build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Check if we have valid Supabase configuration
const hasValidSupabaseConfig = () => {
  return supabaseUrl !== 'https://placeholder.supabase.co' && 
         supabaseAnonKey !== 'placeholder-key' &&
         supabaseUrl.includes('supabase.co')
}

// Server-side Supabase client
// This client is used in Server Components and Route Handlers
export const createServerSupabaseClient = cache(() => {
  if (!hasValidSupabaseConfig()) {
    console.warn('Supabase configuration not found. Using placeholder client.')
  }
  return createClient(supabaseUrl, supabaseAnonKey)
})

// Client-side Supabase client (singleton pattern)
// This client is used in Client Components
let clientSupabase: ReturnType<typeof createClient> | undefined

export const createClientSupabaseClient = () => {
  if (!clientSupabase) {
    if (!hasValidSupabaseConfig()) {
      console.warn('Supabase configuration not found. Using placeholder client.')
    }
    clientSupabase = createClient(supabaseUrl, supabaseAnonKey)
  }
  return clientSupabase
}

// --- Data Fetching Functions ---

export async function getComics(): Promise<Comic[]> {
  if (!hasValidSupabaseConfig()) {
    console.warn('Supabase not configured, returning empty comics array')
    return []
  }
  
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('comic_chapters')
      .select('comic_title, comic_slug, cover_url, created_at, original_title')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching comics:', error)
      return []
    }

    // Group by comic_slug and get the latest chapter for each comic
    const comicsMap = new Map<string, Comic>()
    
    data?.forEach((row: any) => {
      if (!comicsMap.has(row.comic_slug)) {
        comicsMap.set(row.comic_slug, {
          title: row.original_title || row.comic_title,
          slug: row.comic_slug,
          cover_url: null, // Will be set separately
          latest_chapter_number: null,
          latest_chapter_created_at: row.created_at
        })
      }
    })

    // Get cover URLs for each comic from the first chapter that has one
    const comics = Array.from(comicsMap.values())
    for (const comic of comics) {
      const { data: coverData } = await supabase
        .from('comic_chapters')
        .select('cover_url')
        .eq('comic_slug', comic.slug)
        .not('cover_url', 'is', null)
        .order('chapter_number', { ascending: true })
        .limit(1)
        .single()
      
      if (coverData?.cover_url) {
        comic.cover_url = coverData.cover_url
      }
    }

    return comics
  } catch (error) {
    console.error('Error in getComics:', error)
    return []
  }
}

export async function getComicBySlug(slug: string): Promise<Comic | null> {
  if (!hasValidSupabaseConfig()) {
    console.warn('Supabase not configured, returning null for comic')
    return null
  }
  
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('comic_chapters')
      .select('comic_title, comic_slug, cover_url, created_at, description, original_title, localized_title, type, author, status, age_rating, reading_direction, genre')
      .eq('comic_slug', slug)
      .limit(1)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // No rows found
      console.error('Error fetching comic by slug:', error)
      return null
    }

    return {
      title: data.original_title || data.comic_title,
      slug: data.comic_slug,
      cover_url: data.cover_url,
      latest_chapter_number: null,
      latest_chapter_created_at: data.created_at,
      description: data.description,
      original_title: data.original_title,
      localized_title: data.localized_title,
      type: data.type,
      author: data.author,
      status: data.status,
      age_rating: data.age_rating,
      reading_direction: data.reading_direction,
      genre: data.genre
    }
  } catch (error) {
    console.error('Error in getComicBySlug:', error)
    return null
  }
}

export async function getChaptersByComicSlug(comicSlug: string): Promise<Chapter[]> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('comic_chapters')
    .select('chapter_number, chapter_slug, created_at')
    .eq('comic_slug', comicSlug)
    .order('chapter_number', { ascending: false })

  if (error) throw error

  return data || []
}

// Updated function name to match the new schema
export async function getChaptersByComicId(comicId: string): Promise<Chapter[]> {
  // This function is kept for backward compatibility but now uses comic_slug
  return getChaptersByComicSlug(comicId)
}

export async function getImagesByChapterSlug(chapterSlug: string): Promise<ChapterImage[]> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('chapter_images')
    .select('chapter_slug, image_index, image_url')
    .eq('chapter_slug', chapterSlug)
    .order('image_index', { ascending: true })

  if (error) throw error

  return data || []
}

// Updated function name to match the new schema
export async function getPagesByChapterId(chapterId: string): Promise<any[]> {
  // This function is kept for backward compatibility but now uses chapter_slug
  const images = await getImagesByChapterSlug(chapterId)
  
  // Convert to the old format for compatibility
  return images.map((image, index) => ({
    id: `${image.chapter_slug}-${image.image_index}`,
    chapter_id: image.chapter_slug,
    page_number: image.image_index,
    image_url: image.image_url,
    created_at: new Date().toISOString()
  }))
}

export async function getLatestUpdatedComics(): Promise<ComicWithLatestChapter[]> {
  if (!hasValidSupabaseConfig()) {
    console.warn('Supabase not configured, returning empty latest comics array')
    return []
  }
  
  try {
    const supabase = createServerSupabaseClient()
    
    // Get all comic chapters with their details including type
    const { data, error } = await supabase
      .from('comic_chapters')
      .select('comic_title, comic_slug, chapter_number, cover_url, created_at, type, localized_title, original_title')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching latest updated comics:', error)
      return []
    }

    // Group by comic_slug and find the latest chapter for each
    const comicsMap = new Map<string, ComicWithLatestChapter>()
    
    data?.forEach((row: any) => {
      const existing = comicsMap.get(row.comic_slug)
      
      if (!existing || new Date(row.created_at) > new Date(existing.latest_chapter_created_at || '')) {
        // Use original_title if available, otherwise use comic_title
        const title = row.original_title || row.comic_title
        
        comicsMap.set(row.comic_slug, {
          title: title,
          slug: row.comic_slug,
          cover_url: null, // Will be set separately
          latest_chapter_number: row.chapter_number,
          latest_chapter_created_at: row.created_at,
          type: row.type
        })
      }
    })

    // Filter out comics without type (invalid data)
    const validComics = Array.from(comicsMap.values()).filter(comic => comic.type)
    
    // Get cover URLs for each comic from the first chapter that has one
    for (const comic of validComics) {
      const { data: coverData } = await supabase
        .from('comic_chapters')
        .select('cover_url')
        .eq('comic_slug', comic.slug)
        .not('cover_url', 'is', null)
        .order('chapter_number', { ascending: true })
        .limit(1)
        .single()
      
      if (coverData?.cover_url) {
        comic.cover_url = coverData.cover_url
      }
    }

    // Sort by latest chapter update (most recent first)
    return validComics.sort((a, b) => {
      const dateA = new Date(a.latest_chapter_created_at || 0).getTime()
      const dateB = new Date(b.latest_chapter_created_at || 0).getTime()
      return dateB - dateA
    })
  } catch (error) {
    console.error('Error in getLatestUpdatedComics:', error)
    return []
  }
}

export async function getComicsByType(type: string): Promise<ComicWithLatestChapter[]> {
  if (!hasValidSupabaseConfig()) {
    console.warn('Supabase not configured, returning empty comics by type array')
    return []
  }
  
  try {
    const supabase = createServerSupabaseClient()
    
    // Get all comic chapters with their details for the specific type
    const { data, error } = await supabase
      .from('comic_chapters')
      .select('comic_title, comic_slug, chapter_number, cover_url, created_at, type, localized_title, original_title, description')
      .eq('type', type)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching comics by type:', error)
      return []
    }

  // Group by comic_slug and find the latest chapter for each
  const comicsMap = new Map<string, ComicWithLatestChapter>()
  
  data?.forEach((row: any) => {
    const existing = comicsMap.get(row.comic_slug)
    
    if (!existing || new Date(row.created_at) > new Date(existing.latest_chapter_created_at || '')) {
      // Use original_title if available, otherwise use comic_title
      const title = row.original_title || row.comic_title
      
      comicsMap.set(row.comic_slug, {
        title: title,
        slug: row.comic_slug,
        cover_url: null, // Will be set separately
        latest_chapter_number: row.chapter_number,
        latest_chapter_created_at: row.created_at,
        type: row.type,
        description: row.description
      })
    }
  })

  // Get cover URLs for each comic from the first chapter that has one
  const comics = Array.from(comicsMap.values())
  for (const comic of comics) {
    const { data: coverData } = await supabase
      .from('comic_chapters')
      .select('cover_url')
      .eq('comic_slug', comic.slug)
      .not('cover_url', 'is', null)
      .order('chapter_number', { ascending: true })
      .limit(1)
      .single()
    
    if (coverData?.cover_url) {
      comic.cover_url = coverData.cover_url
    }
  }

  // Sort by latest chapter update (most recent first)
  return comics.sort((a, b) => {
    const dateA = new Date(a.latest_chapter_created_at || 0).getTime()
    const dateB = new Date(b.latest_chapter_created_at || 0).getTime()
    return dateB - dateA
  })
  } catch (error) {
    console.error('Error in getComicsByType:', error)
    return []
  }
}

export async function getGenres(): Promise<string[]> {
  // Since the user's schema doesn't include genres, return an empty array
  // or you could derive genres from comic titles if needed
  return []
}

// Helper function to get chapter details by slug
export async function getChapterBySlug(comicSlug: string, chapterSlug: string): Promise<ComicChapter | null> {
  if (!hasValidSupabaseConfig()) {
    console.warn('Supabase not configured, returning null for chapter')
    return null
  }
  
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('comic_chapters')
      .select('*')
      .eq('comic_slug', comicSlug)
      .eq('chapter_slug', chapterSlug)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // No rows found
      console.error('Error fetching chapter by slug:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getChapterBySlug:', error)
    return null
  }
}

// Helper function to get navigation info for chapters
export async function getChapterNavigation(comicSlug: string, currentChapterNumber: number) {
  if (!hasValidSupabaseConfig()) {
    console.warn('Supabase not configured, returning empty navigation')
    return { prevChapter: null, nextChapter: null }
  }
  
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('comic_chapters')
      .select('chapter_number, chapter_slug')
      .eq('comic_slug', comicSlug)
      .order('chapter_number', { ascending: true })

    if (error) {
      console.error('Error fetching chapter navigation:', error)
      return { prevChapter: null, nextChapter: null }
    }

    const chapters = data || []
    const currentIndex = chapters.findIndex((ch: { chapter_number: number; chapter_slug: string }) => ch.chapter_number === currentChapterNumber)
    
    return {
      prevChapter: currentIndex > 0 ? chapters[currentIndex - 1] : null,
      nextChapter: currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null,
      totalChapters: chapters.length
    }
  } catch (error) {
    console.error('Error in getChapterNavigation:', error)
    return { prevChapter: null, nextChapter: null, totalChapters: 0 }
  }
}
