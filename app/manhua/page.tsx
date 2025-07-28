import { getComicsByType } from '@/lib/supabase'
import { ComicVerticalList } from '@/components/comic-vertical-list'

export const metadata = {
  title: 'Manhua - Comic Reading Hub',
  description: 'Browse and read the latest manhua comics online'
}

export default async function ManhuaPage() {
  const manhuaComics = await getComicsByType('Manhua')

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Manhua
          </h1>
          <p className="text-muted-foreground">
            Discover and read the latest manhua comics
          </p>
        </div>
        
        <ComicVerticalList comics={manhuaComics} />
      </div>
    </div>
  )
}