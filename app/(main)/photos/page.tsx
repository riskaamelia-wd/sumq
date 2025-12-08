import Link from "next/link";
import Image from "next/image";

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

export default function PhotosPage() {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-6">Photo Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Link
            key={photo.id}
            href={`/photos/${photo.id}`}
            className="group block glass-card p-4 hover:shadow-xl transition-all duration-200"
          >
            <div className="relative h-64 mb-3 rounded overflow-hidden bg-gray-200">
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
                unoptimized
              />
            </div>
            <p className="text-center font-semibold text-gray-800">
              {photo.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
