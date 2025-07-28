import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Kebijakan Privasi',
  description: 'Kebijakan privasi Mangateers mengenai pengumpulan, penggunaan, dan perlindungan data pengguna.',
  robots: {
    index: true,
    follow: true
  }
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Privacy Policy - Kebijakan Privasi
        </h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-8">
            <p className="mb-4 text-muted-foreground leading-relaxed">
              <strong>Terakhir diperbarui:</strong> {new Date().toLocaleDateString('id-ID')}
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Mangateers berkomitmen untuk melindungi privasi pengguna kami. 
              Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, 
              menggunakan, dan melindungi informasi Anda.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Informasi yang Kami Kumpulkan</h2>
            
            <h3 className="text-xl font-medium mb-3">Informasi yang Diberikan Secara Sukarela</h3>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Alamat email (jika mendaftar newsletter)</li>
              <li>Feedback dan komentar yang Anda berikan</li>
              <li>Preferensi bacaan dan bookmark</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">Informasi yang Dikumpulkan Otomatis</h3>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Alamat IP dan lokasi geografis umum</li>
              <li>Jenis browser dan perangkat yang digunakan</li>
              <li>Halaman yang dikunjungi dan waktu kunjungan</li>
              <li>Referrer dan pola navigasi</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Bagaimana Kami Menggunakan Informasi</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">Kami menggunakan informasi untuk:</p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Menyediakan dan meningkatkan layanan kami</li>
              <li>Menganalisis penggunaan situs untuk optimisasi</li>
              <li>Mengirim update dan newsletter (jika berlangganan)</li>
              <li>Merespons pertanyaan dan feedback</li>
              <li>Mencegah penyalahgunaan dan aktivitas ilegal</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Cookies dan Teknologi Pelacakan</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Kami menggunakan cookies dan teknologi serupa untuk:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Mengingat preferensi dan pengaturan Anda</li>
              <li>Menganalisis lalu lintas dan penggunaan situs</li>
              <li>Menyediakan konten yang relevan</li>
              <li>Meningkatkan keamanan situs</li>
            </ul>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Anda dapat mengatur browser untuk menolak cookies, namun beberapa 
              fitur situs mungkin tidak berfungsi dengan optimal.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Berbagi Informasi dengan Pihak Ketiga</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Kami tidak menjual atau menyewakan informasi pribadi Anda. 
              Kami dapat berbagi informasi dalam situasi berikut:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Dengan penyedia layanan yang membantu operasional situs</li>
              <li>Untuk mematuhi kewajiban hukum</li>
              <li>Untuk melindungi hak dan keamanan kami atau pengguna lain</li>
              <li>Dalam kasus merger atau akuisisi (dengan pemberitahuan)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Keamanan Data</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Kami menerapkan langkah-langkah keamanan yang wajar untuk melindungi 
              informasi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. 
              Namun, tidak ada metode transmisi internet yang 100% aman.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Hak Pengguna</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">Anda memiliki hak untuk:</p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Mengakses informasi pribadi yang kami miliki tentang Anda</li>
              <li>Meminta koreksi informasi yang tidak akurat</li>
              <li>Meminta penghapusan informasi pribadi Anda</li>
              <li>Menolak atau membatasi pemrosesan data tertentu</li>
              <li>Berhenti berlangganan komunikasi marketing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Layanan Pihak Ketiga</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Situs kami dapat berisi link ke situs web pihak ketiga. Kami tidak 
              bertanggung jawab atas praktik privasi situs tersebut. Kami menyarankan 
              Anda untuk membaca kebijakan privasi setiap situs yang Anda kunjungi.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Perubahan Kebijakan</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. 
              Perubahan signifikan akan diberitahukan melalui situs atau email. 
              Penggunaan berkelanjutan setelah perubahan menunjukkan persetujuan Anda.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Hubungi Kami</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau 
              ingin menggunakan hak-hak Anda, silakan hubungi kami:
            </p>
            <div className="bg-muted p-6 rounded-lg">
              <p className="mb-2 text-foreground font-medium">Email:</p>
              <p className="mb-4 text-muted-foreground">info@mangateers.com</p>
              
              <p className="mb-2 text-foreground font-medium">Alamat:</p>
              <p className="text-muted-foreground">
                Privacy Officer<br />
                Mangateers<br />
                Indonesia
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}