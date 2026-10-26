import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-[#393E46] mx-1 flex-shrink-0" />
            )}
            {index === items.length - 1 ? (
              // Last item (current page) - not clickable
              <span className="text-[#393E46] font-medium">
                {item.label}
              </span>
            ) : (
              // Clickable breadcrumb items
              <Button
                variant="ghost"
                size="sm"
                onClick={item.onClick}
                className="text-[#222831] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 p-1 h-auto font-medium transition-all duration-200"
              >
                {item.label}
              </Button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}