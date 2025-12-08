import Modal from "@/components/elements/Modals";
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

export default function PhotoModal({ params }: { params: { id: string } }) {
  const photo = photos.find((p) => p.id === params.id);

  if (!photo) return null;

  return (
    <Modal>
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{photo.title}</h2>
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden bg-gray-200">
          <Image
            src={photo.url}
            alt={photo.title}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      </div>
    </Modal>
  );
}
