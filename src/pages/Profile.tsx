import { useMemo, useState } from 'react';
import { Calendar, Coffee, Heart, MapPin, Package, Star, Users, Edit3 } from 'lucide-react';
import {
  bookingHistory,
  cafeEvents,
  communityGroups,
  userProfile,
} from '../data/mockData';
import StarRating from '../components/StarRating';
import OrderStatusBadge from '../components/OrderStatusBadge';
import InvoiceButton from '../components/InvoiceButton';
import { useCafe } from '../context/CafeContext';

type ProfileTab = 'overview' | 'orders' | 'bookings' | 'favorites' | 'events' | 'friends';

const bookingStatusColors: Record<string, string> = {
  confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  completed: 'bg-blue-50 text-blue-700 border-blue-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
};

export default function Profile() {
  const { menu, orders } = useCafe();
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [editMode, setEditMode] = useState(false);

  const favoriteMenuItems = menu.filter((menuItem) =>
    userProfile.favoriteItems.includes(menuItem.id)
  );
  const joinedGroupData = communityGroups.filter((group) =>
    userProfile.joinedGroups.includes(group.id)
  );
  const upcomingEventData = cafeEvents.slice(0, 2);
  const myOrders = useMemo(
    () => orders.filter((order) => order.customerName === userProfile.name),
    [orders]
  );

  const tabs: { id: ProfileTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'orders', label: 'My Orders' },
    { id: 'bookings', label: 'My Bookings' },
    { id: 'favorites', label: 'Favourites' },
    { id: 'events', label: 'Events' },
    { id: 'friends', label: 'Friends' },
  ];

  return (
    <main className="min-h-screen bg-[#fdf8f3]">
      <div className="relative h-36 bg-gradient-to-r from-[#3c2a15] to-[#8d5930]">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/34338427/pexels-photo-34338427.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=1400')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-14 mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-[#fdf8f3] bg-[#8d5930] font-playfair text-3xl font-bold text-[#fdf8f3] shadow-md">
            {userProfile.avatar}
          </div>
          <div className="flex-1 pb-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-playfair text-3xl font-bold text-[#3c2a15]">
                {userProfile.name}
              </h1>
              <span className="rounded-full border border-[#c8a87a] bg-[#f9edd9] px-3 py-1 font-lato text-xs font-medium text-[#8d5930]">
                Regular Member
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-4">
              <p className="font-lato text-sm text-[#7a5838]">{userProfile.email}</p>
              <p className="flex items-center gap-1 font-lato text-sm text-[#7a5838]">
                <MapPin className="h-3.5 w-3.5" />
                Joined{' '}
                {new Date(userProfile.joinedDate).toLocaleDateString('en-IN', {
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
          <button
            onClick={() => setEditMode((current) => !current)}
            className="flex items-center gap-2 rounded-full border border-[#c8a87a] px-4 py-2 font-lato text-sm text-[#8d5930] transition-colors hover:bg-[#f9edd9]"
          >
            <Edit3 className="h-3.5 w-3.5" />
            Edit Profile
          </button>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            {
              icon: <Coffee className="h-5 w-5" />,
              value: userProfile.totalVisits,
              label: 'Total Visits',
            },
            {
              icon: <Star className="h-5 w-5" />,
              value: `₹${userProfile.totalSpent.toLocaleString('en-IN')}`,
              label: 'Total Spent',
            },
            {
              icon: <Package className="h-5 w-5" />,
              value: myOrders.length,
              label: 'Orders',
            },
            {
              icon: <Heart className="h-5 w-5" />,
              value: userProfile.favoriteItems.length,
              label: 'Favourites',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#e8d9cc] bg-white p-4 text-center"
            >
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#f9edd9] text-[#8d5930]">
                {stat.icon}
              </div>
              <p className="font-playfair text-xl font-bold text-[#3c2a15]">{stat.value}</p>
              <p className="font-lato text-xs text-[#7a5838]">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 flex gap-1 overflow-x-auto border-b border-[#e8d9cc]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`-mb-px whitespace-nowrap border-b-2 px-4 py-3 font-lato text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-[#8d5930] text-[#8d5930]'
                  : 'border-transparent text-[#7a5838] hover:text-[#3c2a15]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-5 lg:col-span-2">
              {editMode ? (
                <div className="rounded-2xl border border-[#e8d9cc] bg-white p-6">
                  <h3 className="mb-4 font-playfair text-[#3c2a15] font-semibold">Edit Profile</h3>
                  <div className="space-y-4">
                    <input
                      defaultValue={userProfile.name}
                      className="w-full rounded-xl border border-[#e8d9cc] bg-[#fdf8f3] px-4 py-3 text-sm focus:border-[#8d5930] focus:outline-none"
                    />
                    <input
                      defaultValue={userProfile.email}
                      className="w-full rounded-xl border border-[#e8d9cc] bg-[#fdf8f3] px-4 py-3 text-sm focus:border-[#8d5930] focus:outline-none"
                    />
                    <input
                      defaultValue={userProfile.phone}
                      className="w-full rounded-xl border border-[#e8d9cc] bg-[#fdf8f3] px-4 py-3 text-sm focus:border-[#8d5930] focus:outline-none"
                    />
                    <button
                      onClick={() => setEditMode(false)}
                      className="rounded-xl bg-[#8d5930] px-5 py-2.5 font-lato text-sm font-medium text-[#fdf8f3]"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-[#e8d9cc] bg-white p-6">
                  <h3 className="mb-4 font-playfair text-[#3c2a15] font-semibold">Account Details</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Full Name', value: userProfile.name },
                      { label: 'Email', value: userProfile.email },
                      { label: 'Phone', value: userProfile.phone },
                      {
                        label: 'Member Since',
                        value: new Date(userProfile.joinedDate).toLocaleDateString('en-IN', {
                          month: 'long',
                          year: 'numeric',
                          day: 'numeric',
                        }),
                      },
                    ].map((field) => (
                      <div
                        key={field.label}
                        className="flex items-start gap-3 border-b border-[#f0e6d3] py-2 last:border-0"
                      >
                        <p className="w-28 flex-shrink-0 pt-0.5 font-lato text-xs text-[#c8a87a]">
                          {field.label}
                        </p>
                        <p className="font-lato text-sm text-[#3c2a15]">{field.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-[#e8d9cc] bg-white p-6">
                <h3 className="mb-4 font-playfair text-[#3c2a15] font-semibold">Recent Order Status</h3>
                {myOrders.length === 0 ? (
                  <p className="font-lato text-sm text-[#7a5838]">
                    Orders you place from the menu will appear here.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {myOrders.slice(0, 2).map((order) => (
                      <div key={order.id} className="rounded-xl bg-[#fdf8f3] p-4">
                        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="font-lato text-sm font-semibold text-[#3c2a15]">
                              {order.orderNumber}
                            </p>
                            <p className="font-lato text-xs text-[#7a5838]">
                              {new Date(order.createdAt).toLocaleString('en-IN')}
                            </p>
                          </div>
                          <OrderStatusBadge status={order.status} />
                        </div>
                        <p className="font-lato text-xs text-[#7a5838]">
                          {order.items.length} items · ₹{order.total.toLocaleString('en-IN')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-[#e8d9cc] bg-white p-6">
                <h3 className="mb-4 font-playfair text-[#3c2a15] font-semibold">My Groups</h3>
                <div className="space-y-3">
                  {joinedGroupData.map((group) => (
                    <div key={group.id} className="flex items-center gap-3">
                      <span className="text-2xl">{group.emoji}</span>
                      <div>
                        <p className="font-lato text-sm font-medium text-[#3c2a15]">{group.name}</p>
                        <p className="font-lato text-xs text-[#7a5838]">{group.members} members</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-[#e8d9cc] bg-white p-5">
                <h3 className="mb-3 font-playfair text-base font-semibold text-[#3c2a15]">
                  Loyalty Progress
                </h3>
                <div className="mb-3 text-center">
                  <p className="font-playfair text-4xl font-bold text-[#8d5930]">
                    {userProfile.totalVisits}
                  </p>
                  <p className="font-lato text-xs text-[#7a5838]">visits completed</p>
                </div>
                <div className="mb-2 h-2 rounded-full bg-[#f0e6d3]">
                  <div className="h-full w-3/4 rounded-full bg-[#8d5930]" />
                </div>
                <p className="text-center font-lato text-xs text-[#7a5838]">
                  16 more visits to Gold Member status
                </p>
              </div>

              <div className="rounded-2xl border border-[#e8d9cc] bg-[#f9edd9] p-5">
                <p className="mb-1 font-playfair font-semibold text-[#3c2a15]">Next Event</p>
                <p className="font-lato text-sm text-[#5e3921]">{upcomingEventData[0]?.title}</p>
                <p className="mt-1 font-lato text-xs text-[#8d5930]">{upcomingEventData[0]?.date}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="mb-10 space-y-4">
            {myOrders.length === 0 ? (
              <div className="rounded-2xl border border-[#e8d9cc] bg-white p-8 text-center">
                <p className="font-playfair text-xl text-[#3c2a15]">No orders yet</p>
                <p className="mt-2 font-lato text-sm text-[#7a5838]">
                  Place an order from the menu to track status and download invoices here.
                </p>
              </div>
            ) : (
              myOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-[#e8d9cc] bg-white p-5"
                >
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-playfair text-xl font-semibold text-[#3c2a15]">
                          {order.orderNumber}
                        </p>
                        <span className="rounded-full bg-[#f9edd9] px-2.5 py-1 font-lato text-xs text-[#8d5930]">
                          {order.orderType}
                        </span>
                      </div>
                      <p className="font-lato text-sm text-[#7a5838]">
                        {new Date(order.createdAt).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <OrderStatusBadge status={order.status} />
                      <InvoiceButton order={order} />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {order.items.map((item) => (
                      <div key={`${order.id}-${item.itemId}`} className="rounded-xl bg-[#fdf8f3] p-3">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-lato text-sm font-medium text-[#3c2a15]">{item.name}</p>
                            <p className="font-lato text-xs text-[#7a5838]">
                              {item.quantity} × ₹{item.price}
                            </p>
                          </div>
                          <p className="font-lato text-sm font-semibold text-[#8d5930]">
                            ₹{item.lineTotal}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-col gap-2 border-t border-[#f0e6d3] pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-lato text-sm text-[#7a5838]">
                      Invoice {order.invoice.invoiceNumber}
                    </p>
                    <p className="font-lato text-base font-semibold text-[#3c2a15]">
                      Total ₹{order.total.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="mb-10 space-y-4">
            {bookingHistory.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col gap-4 rounded-2xl border border-[#e8d9cc] bg-white p-5 sm:flex-row sm:items-center"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#f9edd9] text-2xl">
                  {booking.type === 'Table' ? 'T' : booking.type === 'Group' ? 'G' : 'P'}
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="font-lato text-sm font-semibold text-[#3c2a15]">
                      {booking.type} Booking
                    </span>
                    {booking.tableNumber && (
                      <span className="font-lato text-xs text-[#7a5838]">
                        Table #{booking.tableNumber}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 font-lato text-xs text-[#7a5838]">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(booking.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span>
                      {booking.time} · {booking.people} {booking.people === 1 ? 'person' : 'people'}
                    </span>
                  </div>
                  {booking.specialRequest && (
                    <p className="mt-1 font-lato text-xs italic text-[#7a5838]">
                      "{booking.specialRequest}"
                    </p>
                  )}
                </div>
                <span
                  className={`flex-shrink-0 rounded-full border px-3 py-1.5 font-lato text-xs font-medium capitalize ${bookingStatusColors[booking.status]}`}
                >
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteMenuItems.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-[#e8d9cc] bg-white transition-shadow hover:shadow-md"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-1 font-playfair font-semibold text-[#3c2a15]">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <StarRating rating={item.rating} showValue />
                    <span className="font-lato font-bold text-[#8d5930]">₹{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="mb-10 space-y-4">
            {upcomingEventData.map((event) => (
              <div
                key={event.id}
                className="flex flex-col gap-4 rounded-2xl border border-[#e8d9cc] bg-white p-5 sm:flex-row sm:items-center"
              >
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                  <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-lato text-sm font-semibold text-[#3c2a15]">{event.title}</h3>
                  <div className="flex items-center gap-3 font-lato text-xs text-[#7a5838]">
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                  </div>
                </div>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-lato text-xs font-medium text-emerald-700">
                  Registered
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'friends' && (
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {userProfile.friends.map((friend) => (
              <div
                key={friend.name}
                className="flex items-center gap-4 rounded-2xl border border-[#e8d9cc] bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8d5930] font-semibold text-[#fdf8f3]">
                  {friend.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-lato font-medium text-[#3c2a15]">{friend.name}</p>
                  <p className="font-lato text-xs text-[#7a5838]">{friend.mutual} mutual friends</p>
                </div>
                <button className="font-lato text-xs font-medium text-[#8d5930] transition-colors hover:text-[#3c2a15]">
                  Message
                </button>
              </div>
            ))}
            <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#c8a87a] bg-[#f9edd9] p-5 text-center transition-colors hover:border-[#8d5930]">
              <span className="text-2xl">+</span>
              <p className="font-lato text-sm font-medium text-[#8d5930]">Find more cafe friends</p>
              <p className="font-lato text-xs text-[#c8a87a]">Meet people from your groups</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
