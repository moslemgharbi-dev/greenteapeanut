import { Facebook, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface ShareButtonsProps {
  productHandle: string;
  productTitle: string;
  productImage?: string;
  variant?: 'icon' | 'full';
}

export function ShareButtons({ productHandle, productTitle, productImage, variant = 'icon' }: ShareButtonsProps) {
  const productUrl = `${window.location.origin}/product/${productHandle}`;
  const encodedUrl = encodeURIComponent(productUrl);
  const encodedTitle = encodeURIComponent(productTitle);
  const encodedImage = productImage ? encodeURIComponent(productImage) : '';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedTitle}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      toast.success('Lien copié !');
    } catch {
      toast.error('Impossible de copier le lien');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size={variant === 'icon' ? 'icon' : 'sm'}
          className={variant === 'icon' ? 'h-8 w-8' : ''}
          onClick={(e) => e.preventDefault()}
        >
          <Share2 className="h-4 w-4" />
          {variant === 'full' && <span className="ml-2">Partager</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => handleShare('facebook')} className="cursor-pointer">
          <Facebook className="h-4 w-4 mr-2 text-[#1877F2]" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('twitter')} className="cursor-pointer">
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          X (Twitter)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('whatsapp')} className="cursor-pointer">
          <svg className="h-4 w-4 mr-2 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('pinterest')} className="cursor-pointer">
          <svg className="h-4 w-4 mr-2 text-[#E60023]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0a12 12 0 00-4.373 23.178c-.07-.937-.134-2.377.028-3.401.146-.926.944-3.999.944-3.999s-.241-.482-.241-1.193c0-1.117.648-1.951 1.454-1.951.686 0 1.017.515 1.017 1.132 0 .69-.439 1.72-.665 2.676-.189.8.401 1.451 1.19 1.451 1.428 0 2.525-1.506 2.525-3.679 0-1.924-1.382-3.267-3.357-3.267-2.287 0-3.629 1.715-3.629 3.489 0 .691.266 1.431.598 1.834a.24.24 0 01.056.23c-.061.254-.197.8-.223.912-.035.146-.115.177-.266.107-1.177-.547-1.913-2.268-1.913-3.651 0-2.972 2.159-5.699 6.227-5.699 3.269 0 5.809 2.329 5.809 5.442 0 3.246-2.046 5.858-4.884 5.858-.954 0-1.849-.495-2.156-1.08l-.586 2.235c-.212.817-.785 1.841-1.168 2.465A12 12 0 1012 0z"/>
          </svg>
          Pinterest
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          Copier le lien
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
