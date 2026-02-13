import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const GOUVERNORATS = [
  "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa",
  "Jendouba", "Kairouan", "Kasserine", "Kébili", "Le Kef", "Mahdia",
  "La Manouba", "Médenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid",
  "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan",
];

interface GouvernoratSelectorProps {
  selected: string | null;
  onSelect: (gouvernorat: string) => void;
  disabled?: boolean;
}

export function GouvernoratSelector({ selected, onSelect, disabled }: GouvernoratSelectorProps) {
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Scroll selected item into view when opening
  useEffect(() => {
    if (open && selected && listRef.current) {
      const el = listRef.current.querySelector(`[data-gov="${selected}"]`);
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [open, selected]);

  return (
    <div className="w-full">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
      >
        <span className="flex items-center gap-2 truncate">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
          {selected || "Sélectionner un gouvernorat"}
        </span>
        <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div
              ref={listRef}
              className="mt-1 max-h-48 overflow-y-auto select-scrollbar rounded-md border bg-popover p-1"
            >
              {GOUVERNORATS.map((gov) => (
                <button
                  key={gov}
                  type="button"
                  data-gov={gov}
                  onClick={() => { onSelect(gov); setOpen(false); }}
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                    selected === gov && "bg-accent text-accent-foreground"
                  )}
                >
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    {selected === gov && <Check className="h-4 w-4" />}
                  </span>
                  {gov}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
