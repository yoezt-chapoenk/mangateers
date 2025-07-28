# Comic Template - Next.js Application

Aplikasi web untuk membaca komik yang dibangun dengan Next.js 15, Supabase, dan Tailwind CSS.

## Fitur

- 📚 Tampilan komik dengan kategori (Manga, Manhwa, Manhua)
- 🔍 Pencarian komik
- 📖 Pembaca chapter dengan navigasi
- 🎨 Dark/Light mode
- 📱 Responsive design
- 🚀 Optimized untuk deployment Vercel

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm atau yarn
- Akun Supabase

### Installation

1. Clone repository:
```bash
git clone <repository-url>
cd comic-template-main
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` dengan kredensial Supabase Anda:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Jalankan development server:
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.

## Deployment ke Vercel

### Melalui GitHub (Recommended)

1. Push code ke GitHub repository
2. Buka [Vercel Dashboard](https://vercel.com/dashboard)
3. Klik "New Project" dan pilih repository GitHub Anda
4. Vercel akan otomatis mendeteksi Next.js project
5. Tambahkan environment variables di Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Deploy!

### Environment Variables untuk Production

Pastikan untuk menambahkan environment variables berikut di Vercel Dashboard:

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

### Build Commands

- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## Project Structure

```
├── app/                    # App Router pages
│   ├── [type]/            # Dynamic routes untuk kategori
│   ├── manga/             # Halaman manga
│   ├── manhwa/            # Halaman manhwa
│   ├── manhua/            # Halaman manhua
│   └── search/            # Halaman pencarian
├── components/            # React components
│   ├── ui/               # UI components (Radix UI)
│   └── ...               # Custom components
├── lib/                  # Utilities dan konfigurasi
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # Helper functions
├── public/               # Static assets
└── styles/               # Global styles
```

## Database Schema (Supabase)

Pastikan Anda memiliki tabel berikut di Supabase:

- `comics` - Data komik
- `comic_chapters` - Data chapter
- `chapter_images` - Gambar chapter

## Performance Optimizations

- ✅ Image optimization dengan Next.js Image
- ✅ Code splitting otomatis
- ✅ Static generation untuk halaman yang sesuai
- ✅ Optimized bundle size
- ✅ Caching strategy

## Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## License

MIT License - lihat file [LICENSE](LICENSE) untuk detail.
