import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.45 0 .1 5.35.1 11.95c0 2.1.55 4.16 1.6 5.98L0 24l6.24-1.64a11.9 11.9 0 0 0 5.7 1.45h.01c6.6 0 11.95-5.35 11.95-11.95 0-3.2-1.25-6.21-3.38-8.37ZM11.95 21.8h-.01a9.9 9.9 0 0 1-5.05-1.39l-.36-.22-3.7.97.99-3.6-.24-.37a9.86 9.86 0 0 1-1.52-5.24C2.06 6.44 6.44 2.06 11.95 2.06c2.64 0 5.12 1.03 6.98 2.89a9.8 9.8 0 0 1 2.9 6.97c0 5.51-4.38 9.88-9.88 9.88Zm5.74-7.86c-.31-.15-1.84-.9-2.12-1.01-.28-.1-.49-.15-.7.15-.2.31-.8 1-.99 1.2-.18.2-.36.23-.67.08-.31-.15-1.3-.48-2.47-1.52-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.13-.63.13-.13.31-.36.46-.54.15-.18.2-.31.31-.51.1-.2.05-.39-.03-.54-.08-.15-.7-1.68-.96-2.3-.25-.6-.5-.52-.7-.53h-.6c-.2 0-.54.08-.82.39-.28.31-1.08 1.06-1.08 2.59 0 1.53 1.11 3.01 1.26 3.22.15.2 2.18 3.33 5.28 4.67.74.32 1.32.51 1.77.65.74.24 1.41.2 1.94.12.59-.09 1.84-.75 2.1-1.47.26-.72.26-1.34.18-1.47-.08-.13-.28-.2-.59-.36Z" />
  </svg>
);

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/21624433702"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "h-14 w-14 rounded-full shadow-xl",
        "bg-[#25D366] text-white",
        "grid place-items-center",
        "ring-2 ring-[#25D366]/20 ring-offset-2 ring-offset-background",
        "hover:shadow-2xl hover:shadow-[#25D366]/25",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "transition-shadow duration-300",
        "after:absolute after:inset-0 after:rounded-full after:bg-[#25D366] after:animate-ping after:opacity-30"
      )}
      aria-label="Nous contacter sur WhatsApp"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </motion.a>
  );
}
