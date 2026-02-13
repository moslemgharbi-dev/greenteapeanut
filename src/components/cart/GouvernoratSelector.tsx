import { motion } from "framer-motion";

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
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {GOUVERNORATS.map((gov) => {
        const isSelected = selected === gov;
        return (
          <motion.button
            key={gov}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(gov)}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundColor: isSelected ? "hsl(var(--primary))" : "hsl(var(--secondary) / 0.3)",
              color: isSelected ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
            }}
            transition={{ duration: 0.15 }}
            className="rounded-full border px-2.5 py-1.5 text-xs font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              borderColor: isSelected ? "hsl(var(--primary))" : "transparent",
            }}
          >
            {gov}
          </motion.button>
        );
      })}
    </div>
  );
}
