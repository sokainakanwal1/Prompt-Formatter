import { cn } from "@/lib/utils";

interface AdSlotProps {
  slot: "top-banner" | "mid-content";
  className?: string;
}

export default function AdSlot({ slot, className }: AdSlotProps) {
  // In production, these would be real AdSense components
  // For now, showing placeholder structure that would be replaced with actual AdSense code

  const adConfig = {
    "top-banner": {
      title: "Advertisement Slot 1",
      description: "728x90 or responsive banner",
      testId: "ad-top-banner"
    },
    "mid-content": {
      title: "Advertisement Slot 2", 
      description: "320x50 mobile, 728x90 desktop",
      testId: "ad-mid-content"
    }
  };

  const config = adConfig[slot];

  return (
    <div className={cn("w-full", className)} data-testid={config.testId}>
      {/* This is where AdSense code would go in production */}
      {/* 
      Real implementation would be:
      <ins className="adsbygoogle"
           style={{display: "block"}}
           data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
           data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_1 || process.env.NEXT_PUBLIC_ADSENSE_SLOT_2}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      */}
      
      {/* Placeholder for development - remove in production */}
      <div className="bg-muted border border-border rounded-lg p-4 text-center text-muted-foreground">
        <div className="text-2xl mb-2">📢</div>
        <p className="font-medium" data-testid="text-ad-title">{config.title}</p>
        <p className="text-xs" data-testid="text-ad-description">{config.description}</p>
      </div>
    </div>
  );
}
