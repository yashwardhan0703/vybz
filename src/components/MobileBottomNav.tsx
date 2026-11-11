import { LayoutGrid, Flame, Mic2, FolderHeart, Heart } from 'lucide-react';
import { usePlayerStore, type PlayerCategory } from '../store/playerStore';

interface MobileBottomNavProps {
  onCategorySelect?: () => void;
}

/**
 * Native-feeling thumb-zone bottom navigation bar for mobile viewports (< 768px).
 * Sits cleanly below the docked mini-player in flex flow so it never covers content.
 */
export default function MobileBottomNav({ onCategorySelect }: MobileBottomNavProps) {
  const { activeCategory, setActiveCategory, likedSongs } = usePlayerStore();

  const items: Array<{
    id: PlayerCategory;
    label: string;
    icon: React.ReactNode;
  }> = [
    { id: 'all', label: 'Home', icon: <LayoutGrid size={18} /> },
    { id: 'trending', label: 'Top 25', icon: <Flame size={18} /> },
    { id: 'artists', label: 'Artists', icon: <Mic2 size={18} /> },
    { id: 'playlists', label: 'Playlists', icon: <FolderHeart size={18} /> },
    {
      id: 'favorites',
      label: 'Liked',
      icon: (
        <span className="relative inline-flex">
          <Heart
            size={18}
            className={
              activeCategory === 'favorites'
                ? 'fill-rose-400 text-rose-400'
                : likedSongs.length > 0
                  ? 'text-rose-400'
                  : ''
            }
          />
          {likedSongs.length > 0 && (
            <span className="absolute -right-2 -top-1 rounded-full bg-rose-500 px-1 text-[0.52rem] font-bold leading-tight text-white">
              {likedSongs.length > 99 ? '99+' : likedSongs.length}
            </span>
          )}
        </span>
      ),
    },
  ];

  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden shrink-0 z-40 border-t border-white/10 bg-[#080c13]/98 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] select-none"
    >
      <div className="flex items-stretch justify-around px-1">
        {items.map((item) => {
          const isActive = activeCategory === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveCategory(item.id);
                if (window.location.hash.startsWith('#artist/')) {
                  window.history.back();
                }
                onCategorySelect?.();
              }}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-1 min-w-0 flex-col items-center justify-center gap-0.5 py-2 min-h-[52px] transition-colors active:scale-95 ${
                isActive ? 'text-amber-400' : 'text-white/55 hover:text-white/90'
              }`}
            >
              {item.icon}
              <span className="truncate max-w-full px-0.5 text-[0.62rem] font-semibold tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

