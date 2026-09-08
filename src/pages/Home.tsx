import { featuredPlaylists } from '../data/playlists';
import PlaylistCard from '../components/PlaylistCard';

export default function Home() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <section className="mb-24 space-y-12">
          <div className="space-y-4">
            <h1 className="text-2xl font-light text-gray-400 leading-relaxed">
              hey i'm nikhilesh :)
              <br />
              i like listening to music a lot, literally all the time
              <br />
              this is where i keep the stuff that sticks w/me.
            </h1>
          </div>

          <div className="space-y-4 pt-8">
            <h2 className="text-xl font-light text-gray-500 leading-relaxed">
              music matters a lot to me because it's one of the easiest ways for me to feel
              understood without having to explain anything
              <br />
              it helps me slow down, notice patterns, and connect with people
            </h2>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-light text-gray-500 mb-8 tracking-wide">
            featured playlists
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPlaylists.map((playlist, index) => (
              <PlaylistCard
                key={playlist.spotifyId}
                playlist={playlist}
                index={index}
                accent="pink"
                height={playlist.embedHeight ?? 152}
                padding="p-8"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
