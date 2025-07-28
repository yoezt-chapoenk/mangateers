import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Usage - Syarat dan Ketentuan Penggunaan',
  description: 'Syarat dan ketentuan penggunaan layanan Mangateers untuk membaca manga, manhwa, dan manhua online.',
  robots: {
    index: true,
    follow: true
  }
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Terms of Usage - Syarat dan Ketentuan
        </h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Penerimaan Syarat</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Dengan mengakses dan menggunakan situs Mangateers, Anda menyetujui untuk 
              terikat oleh syarat dan ketentuan ini. Jika Anda tidak setuju dengan 
              syarat ini, mohon untuk tidak menggunakan layanan kami.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Layanan yang Disediakan</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Mangateers menyediakan platform untuk membaca manga, manhwa, dan manhua 
              secara online. Kami berusaha memberikan pengalaman membaca yang terbaik 
              dengan koleksi yang terus diperbarui.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Penggunaan yang Diizinkan</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">Anda diizinkan untuk:</p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Membaca konten yang tersedia di situs</li>
              <li>Berbagi link ke halaman konten (bukan mengunduh)</li>
              <li>Menggunakan fitur pencarian dan navigasi</li>
              <li>Memberikan feedback yang konstruktif</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Penggunaan yang Dilarang</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">Anda dilarang untuk:</p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Mengunduh, menyalin, atau mendistribusikan konten tanpa izin</li>
              <li>Menggunakan bot, scraper, atau alat otomatis lainnya</li>
              <li>Mengganggu atau merusak fungsi situs</li>
              <li>Mengunggah konten yang melanggar hukum atau hak cipta</li>
              <li>Menggunakan situs untuk tujuan komersial tanpa izin</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Hak Kekayaan Intelektual</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Semua konten di situs ini, termasuk teks, gambar, dan desain, 
              dilindungi oleh hak cipta dan hak kekayaan intelektual lainnya. 
              Kami menghormati hak pemilik konten asli.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Privasi Pengguna</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Kami berkomitmen untuk melindungi privasi Anda. Informasi lebih lanjut 
              dapat ditemukan di halaman Privacy Policy kami.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Pembatasan Tanggung Jawab</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Mangateers tidak bertanggung jawab atas kerugian yang mungkin timbul 
              dari penggunaan situs ini. Layanan disediakan "sebagaimana adanya" 
              tanpa jaminan apapun.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Perubahan Syarat</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Kami berhak mengubah syarat dan ketentuan ini kapan saja. Perubahan 
              akan berlaku segera setelah dipublikasikan di situs ini.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Kontak</h2>
            <p className="text-muted-foreground leading-relaxed">
              Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, 
              silakan hubungi kami melalui halaman Contact Us.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}