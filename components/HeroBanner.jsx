import Link from 'next/link';
import Image from 'next/image';

export default function HeroBanner({ title, subtitle, ctaText }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#f9f5f0] to-[#f0e6d6] p-6 md:p-12 lg:p-16 text-[#5d4a3a]">
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#e8d5b5] opacity-30"></div>
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#d4b78f] opacity-20"></div>
      
      <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="w-full md:w-1/2 space-y-6 animate-fade-in-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-[#7a6652] max-w-lg">{subtitle}</p>
          {ctaText && (
            <Link
              href="/properties"
              className="inline-block bg-[#8d7364] hover:bg-[#6a584a] text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              aria-label="Voir les biens immobiliers"
            >
              {ctaText}
            </Link>
          )}
        </div>

        <div className="w-full md:w-1/2 mt-8 md:mt-0 animate-fade-in-right relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-2xl">
            <Image
              src="/image.jpg"
              alt="Salon moderne"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00000010] to-[#00000005]"></div>
          </div>
          
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#ffcd9e] rounded-lg z-[-1]"></div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-[#8d7364]"></div>
        <span className="text-sm font-medium text-[#8d7364]">2025</span>
      </div>

      <div className="absolute top-6 right-6 p-2 bg-white/30 backdrop-blur-sm rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#8d7364" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </div>
    </div>
  );
}