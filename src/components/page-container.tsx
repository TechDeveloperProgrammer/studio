import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("flex flex-col flex-1 p-4 sm:p-6 md:p-8 gap-6", className)}>
      {children}
    </div>
  );
}
