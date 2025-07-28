import { getComicsByType } from '@/lib/supabase'
import { ComicVerticalList } from '@/components/comic-vertical-list'

export const metadata = {
  title: 'Manga - Comic Reading Hub',
  description: 'Browse and read the latest manga comics online'
}

export default async function MangaPage() {
  const mangaComics = await getComicsByType('Manga')

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Manga
          </h1>
          <p className="text-muted-foreground">
            Discover and read the latest manga comics
          </p>
        </div>
        
        <ComicVerticalList comics={mangaComics} />
      </div>
    </div>
  )
}