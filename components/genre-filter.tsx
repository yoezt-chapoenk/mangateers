"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface GenreFilterProps {
  genres: string[]
  onGenreChange: (genre: string) => void
  selectedGenre: string
}

export function GenreFilter({ genres, onGenreChange, selectedGenre }: GenreFilterProps) {
  return (
    <Select onValueChange={onGenreChange} value={selectedGenre}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by Genre" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Genres</SelectItem>
        {genres.map((genre) => (
          <SelectItem key={genre} value={genre}>
            {genre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
