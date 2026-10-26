import { useRef } from "react";
import { Camera } from "lucide-react";
import { Button } from "./ui/button";

interface ScanImageButtonProps {
  onScan: (query: string) => void;
  className?: string;
}

export function ScanImageButton({ onScan, className }: ScanImageButtonProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Captured file:", file);

      // For now, we just simulate it detected "shirt"
      onScan("shirt");
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        onClick={handleClick}
        className={`border border-[#393E46]/20 text-[#222831] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 font-medium transition-all duration-200 px-4 py-2 flex items-center gap-1 px-2 py-1 rounded-full bg-white transition text-xs sm:text-sm md:text-base cursor-pointer ${className}`}
      >
        <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
        <span className="text-gray-700 hidden md:block">Scan Image</span>
      </Button>

      {/* Hidden input that opens camera */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        //capture="environment"
        className="hidden"
        onChange={handleCapture}
      />
    </div>
  );
}
