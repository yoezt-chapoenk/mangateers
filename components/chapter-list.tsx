import Link from "next/link"
import type { Chapter } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ChapterListProps {
  chapters: Chapter[]
  comicSlug: string
  comicType: string
}

export function ChapterList({ chapters, comicSlug, comicType }: ChapterListProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Chapters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {chapters.length > 0 ? (
            chapters.map((chapter) => (
              <div
                key={chapter.chapter_slug}
                className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0"
              >
                <span className="text-lg font-medium">Chapter {chapter.chapter_number}</span>
                <Link href={`/${comicType.toLowerCase()}/${comicSlug}/${chapter.chapter_slug}`} passHref>
                  <Button variant="outline">Read Chapter</Button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No chapters available yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
