import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, MessageCircle, Heart, Send, Search } from 'lucide-react';
import { communityGroups, discussions } from '../data/mockData';

const chatMessages = [
  { id: 1, user: 'Priya S.', avatar: 'PS', message: 'Anyone heading to the Anime Night this weekend? 🌸', time: '2:14 PM', mine: false },
  { id: 2, user: 'Arjun M.', avatar: 'AM', message: 'Yes! Already registered. Going to be amazing!', time: '2:16 PM', mine: false },
  { id: 3, user: 'You', avatar: 'AV', message: 'Just booked my spot too. See you all there!', time: '2:18 PM', mine: true },
  { id: 4, user: 'Sneha N.', avatar: 'SN', message: 'Don\'t forget the Signature Latte before it starts 😄', time: '2:19 PM', mine: false },
  { id: 5, user: 'Rohan D.', avatar: 'RD', message: 'I\'m bringing my sketchbook for the fan art session!', time: '2:22 PM', mine: false },
];

export default function Community() {
  const [activeTab, setActiveTab] = useState<'groups' | 'discussions' | 'chat'>('groups');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState(chatMessages);
  const [joinedGroups, setJoinedGroups] = useState<string[]>(['g1']);
  const [likedDiscussions, setLikedDiscussions] = useState<string[]>([]);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        user: 'You',
        avatar: 'AV',
        message: chatInput,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        mine: true,
      },
    ]);
    setChatInput('');
  };

  const toggleJoin = (id: string) => {
    setJoinedGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const toggleLike = (id: string) => {
    setLikedDiscussions((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  return (
    <main className="min-h-screen bg-[#fdf8f3]">
      {/* Header */}
      <section className="bg-[#3c2a15] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold tracking-widest text-[#c8a87a] uppercase font-lato mb-3 block">Your People Await</span>
          <h1 className="font-playfair text-5xl font-bold text-[#fdf8f3] mb-3">Community</h1>
          <p className="text-[#c8a87a] font-lato max-w-xl">
            Find your tribe. Join groups, join conversations, and make friends over coffee.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-[#e8d9cc] pb-0">
          {(['groups', 'discussions', 'chat'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium capitalize font-lato border-b-2 transition-colors -mb-px ${
                activeTab === tab
                  ? 'border-[#8d5930] text-[#8d5930]'
                  : 'border-transparent text-[#7a5838] hover:text-[#3c2a15]'
              }`}
            >
              {tab === 'groups' ? 'Interest Groups' : tab === 'discussions' ? 'Discussions' : 'Community Chat'}
            </button>
          ))}
        </div>

        {/* GROUPS TAB */}
        {activeTab === 'groups' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {communityGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-2xl p-6 border border-[#e8d9cc] hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{group.emoji}</div>
                    <div>
                      <h3 className="font-playfair font-semibold text-[#3c2a15] text-lg">{group.name}</h3>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full border font-lato font-medium ${
                        group.category === 'Gaming' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        group.category === 'Anime' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        group.category === 'Music' ? 'bg-violet-50 text-violet-700 border-violet-200' :
                        'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {group.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleJoin(group.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all font-lato ${
                      joinedGroups.includes(group.id)
                        ? 'bg-[#f9edd9] text-[#8d5930] border border-[#c8a87a]'
                        : 'bg-[#8d5930] text-[#fdf8f3] hover:bg-[#744728]'
                    }`}
                  >
                    {joinedGroups.includes(group.id) ? 'Joined ✓' : 'Join'}
                  </button>
                </div>

                <p className="text-sm text-[#5e3921] font-lato leading-relaxed mb-4">{group.description}</p>

                <div className="flex items-center justify-between text-xs text-[#7a5838] font-lato">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    {group.members} members
                  </span>
                  <span className="flex items-center gap-1.5 text-[#5e3921]">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Active now
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-[#f0e6d3]">
                  <p className="text-xs text-[#7a5838] font-lato">
                    <span className="text-[#5e3921] font-medium">Recent: </span>
                    {group.recentActivity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* DISCUSSIONS TAB */}
        {activeTab === 'discussions' && (
          <div>
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c8a87a]" />
              <input
                type="text"
                placeholder="Search discussions..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#e8d9cc] rounded-xl text-sm focus:outline-none focus:border-[#8d5930] text-[#3c2a15] placeholder-[#c8a87a]"
              />
            </div>

            <div className="space-y-4">
              {discussions.map((disc) => (
                <div key={disc.id} className="bg-white rounded-2xl p-5 border border-[#e8d9cc] hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-9 h-9 bg-[#8d5930] rounded-full flex items-center justify-center text-[#fdf8f3] text-xs font-semibold flex-shrink-0">
                        {disc.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-sm font-medium text-[#3c2a15] font-lato">{disc.author}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-lato ${
                            disc.category === 'Food' ? 'bg-[#f9edd9] text-[#8d5930]' :
                            disc.category === 'Anime' ? 'bg-rose-50 text-rose-600' :
                            disc.category === 'Community' ? 'bg-emerald-50 text-emerald-700' :
                            'bg-blue-50 text-blue-600'
                          }`}>
                            {disc.category}
                          </span>
                          <span className="text-xs text-[#c8a87a] font-lato">{disc.time}</span>
                        </div>
                        <h3 className="font-semibold text-[#3c2a15] text-base font-playfair mb-1">{disc.title}</h3>
                        <p className="text-sm text-[#7a5838] font-lato line-clamp-2">{disc.preview}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#f0e6d3]">
                    <button
                      onClick={() => toggleLike(disc.id)}
                      className={`flex items-center gap-1.5 text-xs font-lato transition-colors ${
                        likedDiscussions.includes(disc.id) ? 'text-red-500' : 'text-[#7a5838] hover:text-red-400'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${likedDiscussions.includes(disc.id) ? 'fill-red-500' : ''}`} />
                      {disc.likes + (likedDiscussions.includes(disc.id) ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-[#7a5838] hover:text-[#8d5930] transition-colors font-lato">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {disc.replies} replies
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHAT TAB */}
        {activeTab === 'chat' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-[#e8d9cc] overflow-hidden">
              {/* Chat Header */}
              <div className="bg-[#f9edd9] px-5 py-4 border-b border-[#e8d9cc] flex items-center gap-3">
                <div className="text-xl">🌸</div>
                <div>
                  <p className="font-semibold text-[#3c2a15] text-sm">Otaku Adda — Anime Night Chat</p>
                  <p className="text-xs text-[#7a5838] font-lato">94 members · 12 online</p>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-5 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex items-end gap-2 ${msg.mine ? 'flex-row-reverse' : ''}`}>
                    {!msg.mine && (
                      <div className="w-7 h-7 bg-[#8d5930] rounded-full flex items-center justify-center text-[#fdf8f3] text-xs font-semibold flex-shrink-0">
                        {msg.avatar}
                      </div>
                    )}
                    <div className={`max-w-xs ${msg.mine ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                      {!msg.mine && <span className="text-xs text-[#c8a87a] font-lato px-1">{msg.user}</span>}
                      <div className={`px-4 py-2.5 rounded-2xl text-sm font-lato leading-relaxed ${
                        msg.mine
                          ? 'bg-[#8d5930] text-[#fdf8f3] rounded-br-sm'
                          : 'bg-[#f9edd9] text-[#3c2a15] rounded-bl-sm'
                      }`}>
                        {msg.message}
                      </div>
                      <span className="text-xs text-[#c8a87a] font-lato px-1">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="px-4 py-3 border-t border-[#e8d9cc] flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 bg-[#f9edd9] rounded-full text-sm text-[#3c2a15] placeholder-[#c8a87a] focus:outline-none focus:ring-1 focus:ring-[#8d5930]"
                />
                <button
                  onClick={sendMessage}
                  className="w-10 h-10 bg-[#8d5930] hover:bg-[#744728] rounded-full flex items-center justify-center text-[#fdf8f3] transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Meetup CTA */}
      <section className="bg-[#3c2a15] py-14 mt-10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl font-bold text-[#fdf8f3] mb-4">Plan a Meetup at Arambh</h2>
          <p className="text-[#c8a87a] font-lato mb-8 leading-relaxed">
            Found your people online? Bring the conversation to life over chai and coffee. Book a group table and make it memorable.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/booking" className="inline-flex items-center gap-2 bg-[#8d5930] hover:bg-[#c8802e] text-[#fdf8f3] px-7 py-3.5 rounded-full font-medium transition-colors font-lato">
              Book Group Table
            </Link>
            <Link to="/events" className="inline-flex items-center gap-2 border-2 border-[#c8a87a] text-[#fdf8f3] hover:bg-[#fdf8f3]/10 px-7 py-3.5 rounded-full font-medium transition-colors font-lato">
              Join an Event
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
