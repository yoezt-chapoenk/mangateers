import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search Comics - Comic Reading Hub',
  description: 'Search and discover your favorite manga, manhwa, and manhua comics'
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}