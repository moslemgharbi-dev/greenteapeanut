import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';

interface FavoritesState {
  favoriteIds: string[];
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  loadFavorites: () => Promise<void>;
  toggleFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()((set, get) => ({
  favoriteIds: [],
  isAuthenticated: false,

  setAuthenticated: (auth: boolean) => {
    set({ isAuthenticated: auth });
    if (!auth) {
      set({ favoriteIds: [] });
    }
  },

  loadFavorites: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      set({ isAuthenticated: false, favoriteIds: [] });
      return;
    }
    set({ isAuthenticated: true });
    const { data } = await supabase
      .from('favorites')
      .select('product_id')
      .eq('user_id', user.id);
    if (data) {
      set({ favoriteIds: data.map(f => f.product_id) });
    }
  },

  toggleFavorite: async (productId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const current = get().favoriteIds;
    if (current.includes(productId)) {
      set({ favoriteIds: current.filter(id => id !== productId) });
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);
    } else {
      set({ favoriteIds: [...current, productId] });
      await supabase
        .from('favorites')
        .insert({ user_id: user.id, product_id: productId });
    }
  },

  isFavorite: (productId: string) => {
    return get().favoriteIds.includes(productId);
  },
}));
