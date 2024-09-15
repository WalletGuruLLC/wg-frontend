import { Loader2 } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@wg-frontend/ui/breadcrumb";

interface SimpleTitleProps {
  title: string;
  isLoading: boolean;
}

export function SimpleTitle({ title, isLoading }: SimpleTitleProps) {
  return (
    <h1 className="flex flex-row items-center space-x-2 text-2xl font-normal text-[#3A3A3A]">
      <span>{title}</span>
      {isLoading && <Loader2 className="animate-spin" />}
    </h1>
  );
}

interface BreadcrumbTitleProps {
  sections: {
    title?: string;
    href?: string;
    isLoading: boolean;
  }[];
}

export function BreadcrumbTitle({ sections }: BreadcrumbTitleProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-2xl font-normal text-[#3A3A3A]">
        {sections.map(({ title, href, isLoading }, index) => (
          <>
            <BreadcrumbItem key={index}>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index !== sections.length - 1 && (
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
