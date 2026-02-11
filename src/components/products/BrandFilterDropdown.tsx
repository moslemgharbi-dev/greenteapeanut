import { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BrandFilterDropdownProps {
  vendors: string[];
  selectedVendor: string;
  onVendorChange: (vendor: string) => void;
}

export function BrandFilterDropdown({ vendors, selectedVendor, onVendorChange }: BrandFilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on scroll
  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    window.addEventListener('scroll', handler, true);
    return () => window.removeEventListener('scroll', handler, true);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const displayLabel = selectedVendor === 'all' ? 'Toutes les marques' : selectedVendor;

  return (
    <div className="flex items-center gap-2">
      <Filter className="h-4 w-4 text-muted-foreground" />
      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-9 w-[180px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <span className="truncate">{displayLabel}</span>
          <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform", open && "rotate-180")} />
        </button>

        {open && (
          <div className="absolute top-full left-0 z-50 mt-1 w-[200px] rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
            <div className="max-h-60 overflow-y-auto select-scrollbar p-1">
              <button
                type="button"
                onClick={() => { onVendorChange('all'); setOpen(false); }}
                className={cn(
                  "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                  selectedVendor === 'all' && "bg-accent text-accent-foreground"
                )}
              >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  {selectedVendor === 'all' && <Check className="h-4 w-4" />}
                </span>
                Toutes les marques
              </button>
              {vendors.map((vendor) => (
                <button
                  key={vendor}
                  type="button"
                  onClick={() => { onVendorChange(vendor); setOpen(false); }}
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                    selectedVendor === vendor && "bg-accent text-accent-foreground"
                  )}
                >
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    {selectedVendor === vendor && <Check className="h-4 w-4" />}
                  </span>
                  {vendor}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
