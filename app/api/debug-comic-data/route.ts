import { NextResponse } from 'next/server'
import { getLatestUpdatedComics, getComicsByType } from '@/lib/supabase'

export async function GET() {
  try {
    const [latestComics, mangaComics] = await Promise.all([
      getLatestUpdatedComics(),
      getComicsByType('Manga')
    ])

    return NextResponse.json({
      latestComics: latestComics.slice(0, 3), // Only first 3 for debugging
      mangaComics: mangaComics.slice(0, 3),
      totalLatest: latestComics.length,
      totalManga: mangaComics.length
    })
  } catch (error) {
    console.error('Debug API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}