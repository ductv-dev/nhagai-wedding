import { HomePage } from "@/containers/home-page/page";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <HomePage />
    </Suspense>
  );
}
