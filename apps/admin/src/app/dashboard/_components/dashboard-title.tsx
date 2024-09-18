import { Fragment } from "react";
import Link from "next/link";
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
  showLoadingIndicator: boolean;
}

export function SimpleTitle({
  title,
  showLoadingIndicator: isLoading,
}: SimpleTitleProps) {
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
  showLoadingIndicator?: boolean;
}

export function BreadcrumbTitle({
  sections,
  showLoadingIndicator: isLoading = false,
}: BreadcrumbTitleProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-2xl font-normal text-[#3A3A3A]">
        {sections.map(({ title, href, isLoading }, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={href ?? ""}>{title}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index !== sections.length - 1 && (
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
            )}
          </Fragment>
        ))}
        {isLoading && <Loader2 className="animate-spin" />}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
