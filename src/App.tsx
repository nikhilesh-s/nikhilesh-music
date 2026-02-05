import { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Playlists from './pages/Playlists';
import Reviews from './pages/Reviews';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'playlists':
        return <Playlists />;
      case 'reviews':
        return <Reviews />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        <main>{renderPage()}</main>
      </div>
    </div>
  );
}

export default App;
