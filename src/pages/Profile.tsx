import { useState } from 'react';
import { Calendar, Coffee, Users, Heart, Star, MapPin, Edit3 } from 'lucide-react';
import { userProfile, bookingHistory, menuItems, communityGroups, cafeEvents } from '../data/mockData';
import StarRating from '../components/StarRating';

type ProfileTab = 'overview' | 'bookings' | 'favorites' | 'events' | 'friends';

const statusColors: Record<string, string> = {
  confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  completed: 'bg-blue-50 text-blue-700 border-blue-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [editMode, setEditMode] = useState(false);

  const favoriteMenuItems = menuItems.filter((m) => userProfile.favoriteItems.includes(m.id));
  const joinedGroupData = communityGroups.filter((g) => userProfile.joinedGroups.includes(g.id));
  const upcomingEventData = cafeEvents.slice(0, 2);

  const tabs: { id: ProfileTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'bookings', label: 'My Bookings' },
    { id: 'favorites', label: 'Favourites' },
    { id: 'events', label: 'Events' },
    { id: 'friends', label: 'Friends' },
  ];

  return (
    <main className="min-h-screen bg-[#fdf8f3]">
      {/* Header Banner */}
      <div className="h-36 bg-gradient-to-r from-[#3c2a15] to-[#8d5930] relative">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url('https://images.pexels.com/photos/34338427/pexels-photo-34338427.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=1400')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Info */}
        <div className="relative -mt-14 mb-6 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
          <div className="w-24 h-24 bg-[#8d5930] rounded-2xl border-4 border-[#fdf8f3] flex items-center justify-center text-[#fdf8f3] text-3xl font-bold font-playfair shadow-md">
            {userProfile.avatar}
          </div>
          <div className="flex-1 pb-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-playfair text-3xl font-bold text-[#3c2a15]">{userProfile.name}</h1>
              <span className="text-xs px-3 py-1 bg-[#f9edd9] text-[#8d5930] border border-[#c8a87a] rounded-full font-lato font-medium">
                ☕ {userProfile.membershipLevel} Member
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-1">
              <p className="text-sm text-[#7a5838] font-lato">{userProfile.email}</p>
              <p className="text-sm text-[#7a5838] font-lato flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Joined {new Date(userProfile.joinedDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
          <button
            onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-2 px-4 py-2 border border-[#c8a87a] rounded-full text-sm text-[#8d5930] hover:bg-[#f9edd9] transition-colors font-lato"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Profile
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Coffee className="w-5 h-5" />, value: userProfile.totalVisits, label: 'Total Visits' },
            { icon: <Star className="w-5 h-5" />, value: `₹${userProfile.totalSpent.toLocaleString('en-IN')}`, label: 'Total Spent' },
            { icon: <Users className="w-5 h-5" />, value: userProfile.friends.length, label: 'Friends' },
            { icon: <Heart className="w-5 h-5" />, value: userProfile.favoriteItems.length, label: 'Favourites' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 border border-[#e8d9cc] text-center">
              <div className="w-9 h-9 bg-[#f9edd9] rounded-xl flex items-center justify-center text-[#8d5930] mx-auto mb-2">
                {stat.icon}
              </div>
              <p className="font-playfair font-bold text-xl text-[#3c2a15]">{stat.value}</p>
              <p className="text-xs text-[#7a5838] font-lato">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-[#e8d9cc] mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium font-lato whitespace-nowrap border-b-2 transition-colors -mb-px ${
                activeTab === tab.id
                  ? 'border-[#8d5930] text-[#8d5930]'
                  : 'border-transparent text-[#7a5838] hover:text-[#3c2a15]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="lg:col-span-2 space-y-5">
              {editMode ? (
                <div className="bg-white rounded-2xl p-6 border border-[#e8d9cc]">
                  <h3 className="font-playfair font-semibold text-[#3c2a15] mb-4">Edit Profile</h3>
                  <div className="space-y-4">
                    <input defaultValue={userProfile.name} className="w-full px-4 py-3 border border-[#e8d9cc] rounded-xl text-sm focus:outline-none focus:border-[#8d5930] bg-[#fdf8f3]" placeholder="Full Name" />
                    <input defaultValue={userProfile.email} className="w-full px-4 py-3 border border-[#e8d9cc] rounded-xl text-sm focus:outline-none focus:border-[#8d5930] bg-[#fdf8f3]" placeholder="Email" />
                    <input defaultValue={userProfile.phone} className="w-full px-4 py-3 border border-[#e8d9cc] rounded-xl text-sm focus:outline-none focus:border-[#8d5930] bg-[#fdf8f3]" placeholder="Phone" />
                    <button onClick={() => setEditMode(false)} className="px-5 py-2.5 bg-[#8d5930] text-[#fdf8f3] rounded-xl text-sm font-medium font-lato">Save Changes</button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-6 border border-[#e8d9cc]">
                  <h3 className="font-playfair font-semibold text-[#3c2a15] mb-4">Account Details</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Full Name', value: userProfile.name },
                      { label: 'Email', value: userProfile.email },
                      { label: 'Phone', value: userProfile.phone },
                      { label: 'Member Since', value: new Date(userProfile.joinedDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric', day: 'numeric' }) },
                    ].map((field) => (
                      <div key={field.label} className="flex items-start gap-3 py-2 border-b border-[#f0e6d3] last:border-0">
                        <p className="text-xs text-[#c8a87a] font-lato w-28 flex-shrink-0 pt-0.5">{field.label}</p>
                        <p className="text-sm text-[#3c2a15] font-lato">{field.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Joined Groups */}
              <div className="bg-white rounded-2xl p-6 border border-[#e8d9cc]">
                <h3 className="font-playfair font-semibold text-[#3c2a15] mb-4">My Groups</h3>
                <div className="space-y-3">
                  {joinedGroupData.map((group) => (
                    <div key={group.id} className="flex items-center gap-3">
                      <span className="text-2xl">{group.emoji}</span>
                      <div>
                        <p className="text-sm font-medium text-[#3c2a15] font-lato">{group.name}</p>
                        <p className="text-xs text-[#7a5838] font-lato">{group.members} members</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl p-5 border border-[#e8d9cc]">
                <h3 className="font-playfair font-semibold text-[#3c2a15] mb-3 text-base">Loyalty Progress</h3>
                <div className="text-center mb-3">
                  <p className="text-4xl font-playfair font-bold text-[#8d5930]">{userProfile.totalVisits}</p>
                  <p className="text-xs text-[#7a5838] font-lato">visits completed</p>
                </div>
                <div className="h-2 bg-[#f0e6d3] rounded-full mb-2">
                  <div className="h-full w-3/4 bg-[#8d5930] rounded-full" />
                </div>
                <p className="text-xs text-center text-[#7a5838] font-lato">16 more visits to Gold Member status</p>
              </div>

              <div className="bg-[#f9edd9] rounded-2xl p-5 border border-[#e8d9cc]">
                <p className="font-playfair text-[#3c2a15] font-semibold mb-1">Next Event</p>
                <p className="text-sm text-[#5e3921] font-lato">{upcomingEventData[0]?.title}</p>
                <p className="text-xs text-[#8d5930] font-lato mt-1">{upcomingEventData[0]?.date}</p>
              </div>
            </div>
          </div>
        )}

        {/* BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-4 mb-10">
            {bookingHistory.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl p-5 border border-[#e8d9cc] flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-12 h-12 bg-[#f9edd9] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {booking.type === 'Table' ? '🪑' : booking.type === 'Group' ? '👥' : '🎮'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-[#3c2a15] font-lato text-sm">{booking.type} Booking</span>
                    {booking.tableNumber && <span className="text-xs text-[#7a5838] font-lato">Table #{booking.tableNumber}</span>}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#7a5838] font-lato flex-wrap">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span>{booking.time} · {booking.people} {booking.people === 1 ? 'person' : 'people'}</span>
                  </div>
                  {booking.specialRequest && (
                    <p className="text-xs text-[#7a5838] mt-1 font-lato italic">"{booking.specialRequest}"</p>
                  )}
                </div>
                <span className={`text-xs px-3 py-1.5 rounded-full border font-lato font-medium capitalize flex-shrink-0 ${statusColors[booking.status]}`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* FAVORITES */}
        {activeTab === 'favorites' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {favoriteMenuItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-[#e8d9cc] hover:shadow-md transition-shadow group">
                <div className="h-40 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-playfair font-semibold text-[#3c2a15] mb-1">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <StarRating rating={item.rating} showValue />
                    <span className="font-bold text-[#8d5930] font-lato">₹{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EVENTS */}
        {activeTab === 'events' && (
          <div className="space-y-4 mb-10">
            {upcomingEventData.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl p-5 border border-[#e8d9cc] flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#3c2a15] font-lato mb-1">{event.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-[#7a5838] font-lato">
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                  </div>
                </div>
                <span className="text-xs px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-lato font-medium">
                  Registered
                </span>
              </div>
            ))}
          </div>
        )}

        {/* FRIENDS */}
        {activeTab === 'friends' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {userProfile.friends.map((friend) => (
              <div key={friend.name} className="bg-white rounded-2xl p-5 border border-[#e8d9cc] flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#8d5930] rounded-full flex items-center justify-center text-[#fdf8f3] font-semibold">
                  {friend.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#3c2a15] font-lato">{friend.name}</p>
                  <p className="text-xs text-[#7a5838] font-lato">{friend.mutual} mutual friends</p>
                </div>
                <button className="text-xs text-[#8d5930] hover:text-[#3c2a15] font-lato font-medium transition-colors">
                  Message
                </button>
              </div>
            ))}
            <div className="bg-[#f9edd9] rounded-2xl p-5 border border-dashed border-[#c8a87a] flex flex-col items-center justify-center text-center gap-2 hover:border-[#8d5930] transition-colors cursor-pointer">
              <span className="text-2xl">➕</span>
              <p className="text-sm text-[#8d5930] font-medium font-lato">Find more café friends</p>
              <p className="text-xs text-[#c8a87a] font-lato">Meet people from your groups</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
