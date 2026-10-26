import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  showBackButton?: boolean;
}

export function PageHeader({ title, subtitle, onBack, showBackButton = true }: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-[#222831] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 p-2 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#222831]">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[#6B7280]">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}