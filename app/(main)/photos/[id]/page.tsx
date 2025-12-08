import Image from "next/image";
import Link from "next/link";

const photos = [
  {
    id: "1",
    title: "Sunset",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
  },
  {
    id: "2",
    title: "Mountain",
    url: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
  },
  {
    id: "3",
    title: "Ocean",
    url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800",
  },
];

export default function PhotoPage({ params }: { params: { id: string } }) {
  const photo = photos.find((p) => p.id === params.id);

  if (!photo) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Photo not found</h1>
          <Link href="/photos" className="text-blue-600 hover:underline">
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      <Link
        href="/photos"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Gallery
      </Link>
      <h1 className="text-3xl font-bold mb-6">{photo.title}</h1>
      <div className="relative w-full max-w-4xl h-[600px] rounded-lg overflow-hidden glass-card shadow-lg">
        <Image
          src={photo.url}
          alt={photo.title}
          fill
          className="object-contain"
          unoptimized
        />
      </div>
    </div>
  );
}
