"use client";

import { ReactNode, useState } from "react";
import Card from "@/components/ui/Card";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function ServiceCard({ icon, title, description, className = "" }: ServiceCardProps) {
  const [hover, setHover] = useState(false);
  return (
    <Card
      variant="content"
      padding="p-8"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`h-full transition-[border-color,box-shadow] duration-200 ease-standard
        ${hover ? "border-primary shadow-soft" : "border-transparent"} ${className}`}
    >
      <div className="w-14 h-14 flex items-center justify-center bg-primary-pale text-ink-deep rounded-lg mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-ink m-0">{title}</h3>
      <p className="mt-2.5 text-base leading-6 text-body">{description}</p>
    </Card>
  );
}
