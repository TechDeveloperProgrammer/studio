import type { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description?: string | ReactNode;
  children: ReactNode;
  className?: string;
  footerContent?: ReactNode;
  icon?: ReactNode;
}

export function FeatureCard({ title, description, children, className, footerContent, icon }: FeatureCardProps) {
  return (
    <Card className={cn("shadow-lg hover:shadow-xl transition-shadow duration-300", className)}>
      <CardHeader>
        <div className="flex items-center gap-3">
          {icon && <div className="text-primary">{icon}</div>}
          <div className="flex-1">
            <CardTitle className="font-headline text-xl">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footerContent && <CardFooter>{footerContent}</CardFooter>}
    </Card>
  );
}
