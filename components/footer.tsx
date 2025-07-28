import React from "react"

function Footer() {
  return (
    <footer className="text-center py-6 text-sm text-muted-foreground border-t mt-12">
      <p className="mb-2">Copyright @ All right reserved.</p>
      <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 text-foreground">
        <span>|</span>
        <a href="/dmca" className="hover:underline">DMCA</a>
        <span>|</span>
        <a href="/terms" className="hover:underline">Terms of Usage</a>
        <span>|</span>
        <a href="/privacy" className="hover:underline">Privacy Policy</a>
        <span>|</span>
        <a href="/contact" className="hover:underline">Contact Us</a>
      </div>
    </footer>
  )
}

export { Footer }