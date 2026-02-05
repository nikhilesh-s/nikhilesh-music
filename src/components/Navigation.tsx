import { Home, Headphones, FileText } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'playlists', icon: Headphones, label: 'Playlists' },
    { id: 'reviews', icon: FileText, label: 'Album Reviews' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-[#0a0e1a]/80">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-center gap-12">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="group relative flex flex-col items-center gap-2 transition-all duration-300"
                aria-label={item.label}
              >
                <Icon
                  size={24}
                  strokeWidth={1.5}
                  className={`transition-all duration-300 ${
                    isActive
                      ? 'text-pink-400/80 drop-shadow-[0_0_8px_rgba(244,114,182,0.5)]'
                      : 'text-gray-500 group-hover:text-green-400/80 group-hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]'
                  }`}
                />
                <span
                  className={`text-xs font-light tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'text-pink-400/80 opacity-100'
                      : 'text-gray-500 opacity-0 group-hover:opacity-100 group-hover:text-green-400/80'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
