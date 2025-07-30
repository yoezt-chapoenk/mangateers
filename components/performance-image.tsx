'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

interface PerformanceImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

export function PerformanceImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  sizes,
  priority = false,
  placeholder = 'blur',
  blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
}: PerformanceImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px'
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  const imageProps = {
    src,
    alt,
    className: `${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`,
    onLoad: () => setIsLoaded(true),
    priority,
    loading: priority ? 'eager' as const : 'lazy' as const,
    placeholder,
    blurDataURL,
    sizes
  }

  if (fill) {
    return (
      <div ref={imgRef} className="relative w-full h-full">
        {isInView && (
          <Image
            {...imageProps}
            fill
          />
        )}
      </div>
    )
  }

  return (
    <div ref={imgRef}>
      {isInView && (
        <Image
          {...imageProps}
          width={width}
          height={height}
        />
      )}
    </div>
  )
}