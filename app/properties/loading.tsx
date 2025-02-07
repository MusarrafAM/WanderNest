"use client";

// Remember to add "use client" to all the loading.tsx to avoid future bugs
import { Skeleton } from "@/components/ui/skeleton";
function loading() {
  return <Skeleton className="h-[300px] md:h-[500px] w-full rounded" />;
}

export default loading;
