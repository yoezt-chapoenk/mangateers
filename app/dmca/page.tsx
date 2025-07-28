import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DMCA - Digital Millennium Copyright Act',
  description: 'DMCA policy dan prosedur pelaporan pelanggaran hak cipta di Mangateers.',
  robots: {
    index: true,
    follow: true
  }
}

export default function DMCAPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          DMCA - Digital Millennium Copyright Act
        </h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Kebijakan DMCA</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Mangateers menghormati hak kekayaan intelektual dan berkomitmen untuk mematuhi 
              Digital Millennium Copyright Act (DMCA). Kami berfungsi sebagai agregator dan penampil konten yang tersedia secara publik di internet. Kami tidak menyimpan file gambar, komik, atau media lainnya secara langsung di server kami.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Prosedur Pelaporan</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Jika Anda yakin bahwa konten di situs kami melanggar hak cipta Anda, 
              silakan kirimkan pemberitahuan DMCA yang mencakup informasi berikut:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Identifikasi karya yang dilindungi hak cipta yang diklaim dilanggar</li>
              <li>Identifikasi materi yang diklaim melanggar dan lokasinya di situs</li>
              <li>Informasi kontak Anda (nama, alamat, telepon, email)</li>
              <li>Pernyataan bahwa Anda memiliki keyakinan yang baik bahwa penggunaan tersebut tidak diizinkan</li>
              <li>Pernyataan bahwa informasi dalam pemberitahuan akurat</li>
              <li>Tanda tangan elektronik atau fisik dari pemilik hak cipta</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Kontak DMCA</h2>
            <div className="bg-muted p-6 rounded-lg">
              <p className="mb-2 text-foreground font-medium">Email:</p>
              <p className="mb-4 text-muted-foreground">info@mangateers.com</p>
              
              <p className="mb-2 text-foreground font-medium">Alamat:</p>
              <p className="text-muted-foreground">
                DMCA Agent<br />
                Mangateers<br />
                Indonesia
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Counter-Notice</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Jika Anda yakin bahwa konten Anda dihapus secara keliru, Anda dapat 
              mengirimkan counter-notice yang mencakup:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Identifikasi materi yang telah dihapus</li>
              <li>Pernyataan bahwa Anda yakin materi dihapus secara keliru</li>
              <li>Informasi kontak Anda</li>
              <li>Pernyataan persetujuan terhadap yurisdiksi pengadilan federal</li>
              <li>Tanda tangan Anda</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Kebijakan Repeat Infringer</h2>
            <p className="text-muted-foreground leading-relaxed">
              Mangateers akan menghentikan akses pengguna yang berulang kali melanggar 
              hak cipta sesuai dengan kebijakan kami dan ketentuan DMCA.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}