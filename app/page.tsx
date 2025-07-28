import { getLatestUpdatedComics, getComicsByType } from '@/lib/supabase'
import { ComicSection } from '@/components/comic-section'

export default async function HomePage() {
  // Fetch data for all sections
  const [latestComics, mangaComics, manhwaComics, manhuaComics] = await Promise.all([
    getLatestUpdatedComics(),
    getComicsByType('Manga'),
    getComicsByType('Manhwa'),
    getComicsByType('Manhua')
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
        Comic Reading Hub
      </h1>
      
      <ComicSection title="Latest Updates" comics={latestComics} />
      <ComicSection title="Manga" comics={mangaComics} />
      <ComicSection title="Manhwa" comics={manhwaComics} />
      <ComicSection title="Manhua" comics={manhuaComics} />
    </div>
  )
}
