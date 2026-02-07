'use client';

export default function Avatar({ src, alt, className = '' }) {
  return (
    <div className={`inline-block h-10 w-10 rounded-full bg-gray-200 overflow-hidden ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full flex items-center justify-center text-gray-500">
          {alt ? alt.charAt(0).toUpperCase() : '?'}
        </div>
      )}
    </div>
  );
}