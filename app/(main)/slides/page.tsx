"use client";

import { useRouter } from "next/navigation";
import { SlideEditor } from "@/components/SlideEditor";

export default function SlidesPage() {
  const router = useRouter();

  return <SlideEditor onViewSlides={() => router.push("/viewer")} />;
}
