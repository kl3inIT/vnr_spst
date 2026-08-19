"use client";

import dynamic from "next/dynamic";
import OverlayUI from "@/components/OverlayUI";

const Experience = dynamic(() => import("@/components/Experience"), {
  ssr: false,
  loading: () => (
    <div className="museum-loading" role="status">
      <span className="loading-mark" aria-hidden="true" />
      <p>Đang dựng không gian bảo tàng…</p>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="museum-shell">
      <Experience />
      <OverlayUI />
    </main>
  );
}
