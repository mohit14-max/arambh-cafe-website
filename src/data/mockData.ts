// ─── MENU ITEMS ───────────────────────────────────────────────────────────────
export type StockStatus = 'available' | 'low' | 'out';
export type MenuCategory = 'Coffee' | 'Snacks' | 'Desserts' | 'Cold Drinks';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  stock: StockStatus;
  rating: number;
  isPopular?: boolean;
  isBestSeller?: boolean;
  tags?: string[];
}

export const menuItems: MenuItem[] = [
  // Coffee
  {
    id: 'm1',
    name: 'Arambh Signature Latte',
    description: 'Our house blend espresso with velvety steamed milk and a hint of cardamom foam art.',
    price: 180,
    category: 'Coffee',
    image: 'https://images.pexels.com/photos/28496565/pexels-photo-28496565.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    stock: 'available',
    rating: 4.9,
    isPopular: true,
    isBestSeller: true,
    tags: ['Hot', 'Signature'],
  },
  {
    id: 'm2',
    name: 'Classic Cappuccino',
    description: 'Double shot espresso topped with thick microfoam and a light dusting of cocoa powder.',
    price: 150,
    category: 'Coffee',
    image: 'https://images.pexels.com/photos/5151354/pexels-photo-5151354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    stock: 'available',
    rating: 4.7,
    tags: ['Hot', 'Classic'],
  },
  {
    id: 'm3',
    name: 'Cold Brew Drip',
    description: 'Slow-steeped for 18 hours. Smooth, bold, and refreshing — served over clear ice.',
    price: 190,
    category: 'Coffee',
    image: 'https://images.pexels.com/photos/21802643/pexels-photo-21802643.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    stock: 'available',
    rating: 4.8,
    tags: ['Cold', 'Strong'],
  },
  {
    id: 'm4',
    name: 'Masala Chai Latte',
    description: 'Aromatic Indian spices blended with premium Assam tea and frothy milk.',
    price: 130,
    category: 'Coffee',
    image: 'https://images.pexels.com/photos/15801056/pexels-photo-15801056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    stock: 'low',
    rating: 4.6,
    isPopular: true,
    tags: ['Hot', 'Indian'],
  },
  {
    id: 'm5',
    name: 'Hazelnut Mocha',
    description: 'Espresso meets rich chocolate sauce and roasted hazelnut syrup, finished with whipped cream.',
    price: 200,
    category: 'Coffee',
    image: 'https://images.pexels.com/photos/34579318/pexels-photo-34579318.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    stock: 'available',
    rating: 4.5,
    tags: ['Hot', 'Sweet'],
  },
  {
    id: 'm6',
    name: 'Black Eye Espresso',
    description: 'A bold drip coffee with two espresso shots. Not for the faint-hearted.',
    price: 160,
    category: 'Coffee',
    image: 'https://images.pexels.com/photos/15801080/pexels-photo-15801080.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    stock: 'out',
    rating: 4.4,
    tags: ['Hot', 'Strong', 'Bold'],
  },

  // Snacks
  {
    id: 'm7',
    name: 'Grilled Paneer Sandwich',
    description: 'Cottage cheese, capsicum, and mint chutney grilled between toasted brown bread.',
    price: 160,
    category: 'Snacks',
    image: 'https://images.pexels.com/photos/6416558/pexels-photo-6416558.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    stock: 'available',
    rating: 4.7,
    isBestSeller: true,
    tags: ['Veg', 'Hot'],
  },
  {
    id: 'm8',
    name: 'Masala Fries',
    description: 'Crispy golden fries tossed with house chaat masala and a squeeze of lime.',
    price: 120,
    category: 'Snacks',
    image: 'https://images.pexels.com/photos/31822989/pexels-photo-31822989.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    stock: 'available',
    rating: 4.5,
    tags: ['Veg', 'Crispy'],
  },
  {
    id: 'm9',
    name: 'Avocado Toast',
    description: 'Sourdough topped with smashed avocado, cherry tomatoes, and sprinkle of chilli flakes.',
    price: 180,
    category: 'Snacks',
    image: 'https://images.pexels.com/photos/5713766/pexels-photo-5713766.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    stock: 'low',
    rating: 4.6,
    isPopular: true,
    tags: ['Veg', 'Healthy'],
  },
  {
    id: 'm10',
    name: 'Butter Croissant',
    description: 'Flaky, buttery French-style croissant baked fresh every morning.',
    price: 110,
    category: 'Snacks',
    image: 'https://images.pexels.com/photos/12176273/pexels-photo-12176273.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    stock: 'available',
    rating: 4.4,
    tags: ['Bakery', 'Fresh'],
  },

  // Desserts
  {
    id: 'm11',
    name: 'Belgian Chocolate Brownie',
    description: 'Dense, fudgy chocolate brownie made with 70% cocoa. Best paired with a scoop of vanilla.',
    price: 150,
    category: 'Desserts',
    image: 'https://images.pexels.com/photos/34623626/pexels-photo-34623626.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    stock: 'available',
    rating: 4.9,
    isBestSeller: true,
    isPopular: true,
    tags: ['Sweet', 'Chocolate'],
  },
  {
    id: 'm12',
    name: 'Tiramisu Cup',
    description: 'Classic Italian dessert layered with espresso-soaked ladyfingers and mascarpone cream.',
    price: 180,
    category: 'Desserts',
    image: 'https://images.pexels.com/photos/6166474/pexels-photo-6166474.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    stock: 'low',
    rating: 4.8,
    tags: ['Italian', 'Coffee'],
  },
  {
    id: 'm13',
    name: 'Mango Cheesecake',
    description: 'Seasonal Alphonso mango on a buttery biscuit base with silky cream cheese filling.',
    price: 200,
    category: 'Desserts',
    image: 'https://images.pexels.com/photos/6166474/pexels-photo-6166474.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    stock: 'out',
    rating: 4.7,
    isPopular: true,
    tags: ['Seasonal', 'Fruity'],
  },

  // Cold Drinks
  {
    id: 'm14',
    name: 'Virgin Mojito',
    description: 'Fresh lime, mint, and soda water over crushed ice. The classic café refresher.',
    price: 130,
    category: 'Cold Drinks',
    image: 'https://images.pexels.com/photos/12176273/pexels-photo-12176273.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    stock: 'available',
    rating: 4.5,
    tags: ['Refreshing', 'Mocktail'],
  },
  {
    id: 'm15',
    name: 'Iced Matcha Latte',
    description: 'Premium Japanese matcha whisked with cold oat milk. Earthy, creamy, and calming.',
    price: 170,
    category: 'Cold Drinks',
    image: 'https://images.pexels.com/photos/21802643/pexels-photo-21802643.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    stock: 'available',
    rating: 4.6,
    isPopular: true,
    tags: ['Healthy', 'Trendy'],
  },
  {
    id: 'm16',
    name: 'Watermelon Cooler',
    description: 'Fresh watermelon blended with mint and a hint of black salt. Summer in a glass.',
    price: 140,
    category: 'Cold Drinks',
    image: 'https://images.pexels.com/photos/5713766/pexels-photo-5713766.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    stock: 'low',
    rating: 4.4,
    tags: ['Seasonal', 'Fruity'],
  },
];

// ─── EVENTS ───────────────────────────────────────────────────────────────────
export interface CafeEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  category: 'Gaming' | 'Anime' | 'Music' | 'Social' | 'Books';
  image: string;
  seats: number;
  seatsLeft: number;
  price: number | 'Free';
  host: string;
}

export const cafeEvents: CafeEvent[] = [
  {
    id: 'e1',
    title: 'Anime Night: Demon Slayer Marathon',
    description: 'Join fellow anime fans for a cozy screening of Demon Slayer Season 3 with unlimited cold brew and snacks platters.',
    date: '2025-08-10',
    time: '6:00 PM – 10:00 PM',
    category: 'Anime',
    image: 'https://images.pexels.com/photos/11696469/pexels-photo-11696469.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    seats: 20,
    seatsLeft: 7,
    price: 299,
    host: 'Arambh Anime Club',
  },
  {
    id: 'e2',
    title: 'Open Mic Saturday',
    description: 'Share your poetry, music, or stand-up. Every voice matters. Open to all artists and first-timers.',
    date: '2025-08-16',
    time: '5:00 PM – 8:00 PM',
    category: 'Music',
    image: 'https://images.pexels.com/photos/34338427/pexels-photo-34338427.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    seats: 30,
    seatsLeft: 18,
    price: 'Free',
    host: 'Arambh Music Collective',
  },
  {
    id: 'e3',
    title: 'Board Game Bonanza',
    description: 'Catan, Codenames, Uno Flip, and 30+ games. Bring your crew or join an existing group. Coffee on us!',
    date: '2025-08-23',
    time: '3:00 PM – 9:00 PM',
    category: 'Gaming',
    image: 'https://images.pexels.com/photos/7898213/pexels-photo-7898213.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    seats: 40,
    seatsLeft: 24,
    price: 149,
    host: 'Game Nights by Arambh',
  },
  {
    id: 'e4',
    title: 'Book Club: "The God of Small Things"',
    description: 'Monthly book club discussing Arundhati Roy\'s masterpiece. Deep conversations over chai and brownies.',
    date: '2025-08-30',
    time: '11:00 AM – 1:00 PM',
    category: 'Books',
    image: 'https://images.pexels.com/photos/13006848/pexels-photo-13006848.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    seats: 15,
    seatsLeft: 5,
    price: 'Free',
    host: 'Arambh Readers Circle',
  },
  {
    id: 'e5',
    title: 'Indie Makers Meetup',
    description: 'Freelancers, founders, and makers connecting over coffee. Pitch ideas, find collaborators, grow together.',
    date: '2025-09-06',
    time: '2:00 PM – 6:00 PM',
    category: 'Social',
    image: 'https://images.pexels.com/photos/15362788/pexels-photo-15362788.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    seats: 25,
    seatsLeft: 12,
    price: 99,
    host: 'Community by Arambh',
  },
  {
    id: 'e6',
    title: 'Retro Gaming Tournament',
    description: 'Street Fighter, Mario Kart, and Tekken. Compete, cheer, and enjoy the nostalgia. Winner gets a month of free coffee!',
    date: '2025-09-13',
    time: '4:00 PM – 9:00 PM',
    category: 'Gaming',
    image: 'https://images.pexels.com/photos/29833130/pexels-photo-29833130.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    seats: 32,
    seatsLeft: 20,
    price: 199,
    host: 'Arambh Gaming',
  },
];

// ─── REVIEWS ──────────────────────────────────────────────────────────────────
export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  category: 'Food' | 'Atmosphere' | 'Service' | 'Overall';
  comment: string;
  verified: boolean;
  helpful: number;
}

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Priya Sharma',
    avatar: 'PS',
    rating: 5,
    date: '2025-07-28',
    category: 'Overall',
    comment: "Arambh is my second home honestly. The vibe is unmatched — cozy corners, warm lighting, and staff who actually remember your name. The Signature Latte is life-changing. Been coming every weekend for 6 months!",
    verified: true,
    helpful: 42,
  },
  {
    id: 'r2',
    name: 'Arjun Mehta',
    avatar: 'AM',
    rating: 5,
    date: '2025-07-22',
    category: 'Atmosphere',
    comment: "Came for the anime night event and stayed for the community. Never felt so welcomed at a café before. The space is thoughtfully designed — not too loud, not too quiet. Perfect for both work and hangouts.",
    verified: true,
    helpful: 38,
  },
  {
    id: 'r3',
    name: 'Sneha Nair',
    avatar: 'SN',
    rating: 4,
    date: '2025-07-18',
    category: 'Food',
    comment: "The Paneer Sandwich and Masala Chai Latte combo is absolutely divine. Portions are generous, ingredients feel fresh. The Tiramisu runs out fast though — wish they made more! Overall solid 4.5 stars.",
    verified: true,
    helpful: 27,
  },
  {
    id: 'r4',
    name: 'Rohan Desai',
    avatar: 'RD',
    rating: 5,
    date: '2025-07-14',
    category: 'Service',
    comment: "Booked a table for our college reunion (8 people) and the team went above and beyond. Customized seating, helped arrange the space, even brought a little birthday surprise for a friend. Genuine hospitality.",
    verified: true,
    helpful: 55,
  },
  {
    id: 'r5',
    name: 'Kavitha Iyer',
    avatar: 'KI',
    rating: 4,
    date: '2025-07-08',
    category: 'Food',
    comment: "Mango Cheesecake was seasonal and absolutely worth it. The Cold Brew is consistently excellent. Prices are reasonable for the quality. Only wish the outdoor seating was bigger — it fills up fast on weekends.",
    verified: true,
    helpful: 19,
  },
  {
    id: 'r6',
    name: 'Dev Kapoor',
    avatar: 'DK',
    rating: 5,
    date: '2025-07-01',
    category: 'Overall',
    comment: "Found Arambh through the Board Game Night event. Now I'm basically a regular. The community here is incredible — made 3 genuine friends through the café's meetups. This place is doing something really special.",
    verified: true,
    helpful: 61,
  },
];

// ─── COMMUNITY GROUPS ─────────────────────────────────────────────────────────
export interface CommunityGroup {
  id: string;
  name: string;
  category: 'Gaming' | 'Anime' | 'Music' | 'Books';
  members: number;
  description: string;
  recentActivity: string;
  color: string;
  emoji: string;
}

export const communityGroups: CommunityGroup[] = [
  {
    id: 'g1',
    name: 'Arambh Gamers',
    category: 'Gaming',
    members: 128,
    description: 'Board games, retro gaming, and gaming tournaments every weekend at Arambh. All levels welcome!',
    recentActivity: 'Rohan just posted the Catan tournament results',
    color: 'bg-amber-50 border-amber-200',
    emoji: '🎮',
  },
  {
    id: 'g2',
    name: 'Otaku Adda',
    category: 'Anime',
    members: 94,
    description: 'Weekly anime screenings, fan art showcases, and cosplay meetups. Japan lovers unite!',
    recentActivity: 'Next screening: One Piece Film Red this Friday',
    color: 'bg-rose-50 border-rose-200',
    emoji: '🌸',
  },
  {
    id: 'g3',
    name: 'Arambh Music Circle',
    category: 'Music',
    members: 76,
    description: 'Musicians, listeners, and lovers of all genres. Jam sessions, open mics, and music discovery.',
    recentActivity: 'Priya shared a Spotify playlist for the next Open Mic',
    color: 'bg-violet-50 border-violet-200',
    emoji: '🎵',
  },
  {
    id: 'g4',
    name: 'The Reading Corner',
    category: 'Books',
    members: 62,
    description: 'Monthly book clubs, reading challenges, and author discussions over chai. Bibliophiles only!',
    recentActivity: 'August pick announced: "The White Tiger" by Aravind Adiga',
    color: 'bg-emerald-50 border-emerald-200',
    emoji: '📚',
  },
];

// ─── DISCUSSIONS ──────────────────────────────────────────────────────────────
export interface Discussion {
  id: string;
  title: string;
  author: string;
  avatar: string;
  category: string;
  replies: number;
  likes: number;
  time: string;
  preview: string;
}

export const discussions: Discussion[] = [
  {
    id: 'd1',
    title: 'Best order for a rainy evening at Arambh?',
    author: 'Ananya K.',
    avatar: 'AK',
    category: 'Food',
    replies: 24,
    likes: 67,
    time: '2 hours ago',
    preview: 'It\'s been raining all evening and I\'m heading to Arambh after work. What\'s everyone\'s go-to rainy day order?',
  },
  {
    id: 'd2',
    title: 'Anyone else found their study buddy here?',
    author: 'Vikram S.',
    avatar: 'VS',
    category: 'Community',
    replies: 18,
    likes: 89,
    time: '5 hours ago',
    preview: 'Came alone to work on my thesis and ended up meeting a whole group of PhD students. Arambh is honestly magic.',
  },
  {
    id: 'd3',
    title: 'Anime Night suggestions for September?',
    author: 'Riya M.',
    avatar: 'RM',
    category: 'Anime',
    replies: 31,
    likes: 45,
    time: '1 day ago',
    preview: 'The Demon Slayer night was amazing! What should the next one be? Voting for Attack on Titan or Jujutsu Kaisen.',
  },
  {
    id: 'd4',
    title: 'Arambh just saved my presentation prep!',
    author: 'Harsh P.',
    avatar: 'HP',
    category: 'General',
    replies: 12,
    likes: 112,
    time: '2 days ago',
    preview: 'Needed a quiet space to prepare for a big pitch. The corner seats with good WiFi and unlimited refills are a godsend.',
  },
];

// ─── BOOKINGS ─────────────────────────────────────────────────────────────────
export interface Booking {
  id: string;
  userId: string;
  type: 'Table' | 'Group' | 'Gaming';
  date: string;
  time: string;
  people: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  tableNumber?: number;
  specialRequest?: string;
}

export const bookingHistory: Booking[] = [
  {
    id: 'b1',
    userId: 'u1',
    type: 'Group',
    date: '2025-07-20',
    time: '3:00 PM',
    people: 8,
    status: 'completed',
    tableNumber: 7,
    specialRequest: 'Birthday celebration setup',
  },
  {
    id: 'b2',
    userId: 'u1',
    type: 'Table',
    date: '2025-08-02',
    time: '11:00 AM',
    people: 2,
    status: 'confirmed',
    tableNumber: 3,
  },
  {
    id: 'b3',
    userId: 'u1',
    type: 'Gaming',
    date: '2025-08-10',
    time: '5:00 PM',
    people: 4,
    status: 'pending',
    specialRequest: 'Board games setup please',
  },
];

// ─── ADMIN STATS ──────────────────────────────────────────────────────────────
export const adminStats = {
  todayRevenue: 24850,
  todayOrders: 142,
  activeBookings: 18,
  pendingReviews: 7,
  totalCustomers: 3247,
  weeklyRevenue: [18200, 21400, 19800, 24100, 22600, 26300, 24850],
  topItems: [
    { name: 'Arambh Signature Latte', orders: 48, revenue: 8640 },
    { name: 'Grilled Paneer Sandwich', orders: 36, revenue: 5760 },
    { name: 'Belgian Chocolate Brownie', orders: 29, revenue: 4350 },
    { name: 'Masala Chai Latte', orders: 24, revenue: 3120 },
  ],
  recentBookings: [
    { id: 'b10', name: 'Priya Sharma', type: 'Table', time: '2:30 PM', people: 2, status: 'confirmed' },
    { id: 'b11', name: 'Arjun Mehta', type: 'Group', time: '4:00 PM', people: 8, status: 'pending' },
    { id: 'b12', name: 'Sneha Nair', type: 'Gaming', time: '5:30 PM', people: 4, status: 'confirmed' },
    { id: 'b13', name: 'Rohan Desai', type: 'Table', time: '7:00 PM', people: 3, status: 'pending' },
  ],
  notifications: [
    { id: 'n1', message: 'New group booking request from Arjun Mehta (8 people)', time: '10 mins ago', type: 'booking' },
    { id: 'n2', message: 'Stock alert: Masala Chai Latte ingredients running low', time: '1 hour ago', type: 'stock' },
    { id: 'n3', message: 'New 5-star review from Dev Kapoor', time: '2 hours ago', type: 'review' },
    { id: 'n4', message: 'Anime Night event — 7 seats remaining', time: '3 hours ago', type: 'event' },
  ],
};

// ─── USER PROFILE ─────────────────────────────────────────────────────────────
export const userProfile = {
  id: 'u1',
  name: 'Aditya Verma',
  email: 'aditya.v@email.com',
  phone: '+91 98765 43210',
  joinedDate: '2025-02-14',
  totalVisits: 34,
  totalSpent: 12480,
  membershipLevel: 'Regular',
  avatar: 'AV',
  favoriteItems: ['m1', 'm11', 'm7'],
  joinedGroups: ['g1', 'g4'],
  upcomingBookings: ['b2', 'b3'],
  friends: [
    { name: 'Priya Sharma', avatar: 'PS', mutual: 3 },
    { name: 'Rohan Desai', avatar: 'RD', mutual: 5 },
    { name: 'Kavitha Iyer', avatar: 'KI', mutual: 2 },
  ],
};
