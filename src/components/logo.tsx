import { Waves } from "lucide-react";
import type { LucideProps } from "lucide-react";

export function Logo({ className, ...props }: LucideProps) {
  return <Waves className={className} {...props} />;
}
