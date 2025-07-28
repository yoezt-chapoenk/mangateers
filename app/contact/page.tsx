import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Hubungi Kami',
  description: 'Hubungi tim Mangateers untuk pertanyaan, saran, atau laporan terkait layanan manga, manhwa, dan manhua.',
  robots: {
    index: true,
    follow: true
  }
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Contact Us - Hubungi Kami
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-foreground">
              Informasi Kontak
            </h2>
            
            <div className="space-y-6">
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-foreground">Email Umum</h3>
                <p className="text-muted-foreground mb-2">Untuk pertanyaan umum dan saran:</p>
                <a href="mailto:info@mangateers.com" className="text-primary hover:underline">
                  info@mangateers.com
                </a>
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-foreground">DMCA & Hak Cipta</h3>
                <p className="text-muted-foreground mb-2">Untuk laporan pelanggaran hak cipta:</p>
                <a href="mailto:dmca@mangateers.com" className="text-primary hover:underline">
                  dmca@mangateers.com
                </a>
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-foreground">Technical Support</h3>
                <p className="text-muted-foreground mb-2">Untuk masalah teknis dan bug report:</p>
                <a href="mailto:support@mangateers.com" className="text-primary hover:underline">
                  support@mangateers.com
                </a>
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-foreground">Business Inquiry</h3>
                <p className="text-muted-foreground mb-2">Untuk kerjasama dan partnership:</p>
                <a href="mailto:business@mangateers.com" className="text-primary hover:underline">
                  business@mangateers.com
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-foreground">
              Kirim Pesan
            </h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="nama@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subjek *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                >
                  <option value="">Pilih kategori pesan</option>
                  <option value="general">Pertanyaan Umum</option>
                  <option value="technical">Masalah Teknis</option>
                  <option value="dmca">DMCA / Hak Cipta</option>
                  <option value="suggestion">Saran & Feedback</option>
                  <option value="business">Kerjasama Bisnis</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Pesan *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-vertical"
                  placeholder="Tulis pesan Anda di sini..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Kirim Pesan
              </button>
            </form>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Catatan:</strong> Kami berusaha merespons semua pesan dalam waktu 24-48 jam. 
                Untuk masalah mendesak, silakan gunakan email yang sesuai dengan kategori masalah Anda.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">
            Pertanyaan yang Sering Diajukan
          </h2>
          
          <div className="space-y-4">
            <details className="bg-muted p-6 rounded-lg">
              <summary className="font-medium text-foreground cursor-pointer hover:text-primary transition-colors">
                Bagaimana cara melaporkan konten yang melanggar hak cipta?
              </summary>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Silakan kirim laporan DMCA ke dmca@mangateers.com dengan menyertakan 
                informasi lengkap sesuai prosedur yang tercantum di halaman DMCA kami.
              </p>
            </details>

            <details className="bg-muted p-6 rounded-lg">
              <summary className="font-medium text-foreground cursor-pointer hover:text-primary transition-colors">
                Mengapa beberapa manga/manhwa tidak dapat diakses?
              </summary>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Konten mungkin tidak tersedia karena masalah hak cipta, pemeliharaan server, 
                atau permintaan penghapusan dari pemilik hak cipta. Hubungi kami untuk informasi lebih lanjut.
              </p>
            </details>

            <details className="bg-muted p-6 rounded-lg">
              <summary className="font-medium text-foreground cursor-pointer hover:text-primary transition-colors">
                Bagaimana cara mengajukan request manga/manhwa baru?
              </summary>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Kirim request melalui form di atas dengan kategori "Saran & Feedback" 
                atau email ke info@mangateers.com dengan detail judul yang diinginkan.
              </p>
            </details>

            <details className="bg-muted p-6 rounded-lg">
              <summary className="font-medium text-foreground cursor-pointer hover:text-primary transition-colors">
                Apakah Mangateers memiliki aplikasi mobile?
              </summary>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Saat ini kami belum memiliki aplikasi mobile, namun situs web kami 
                sudah dioptimalkan untuk perangkat mobile dan dapat diakses melalui browser.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}