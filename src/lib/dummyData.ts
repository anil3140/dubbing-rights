export type RightsType = 'Dubbing' | 'SVOD' | 'AVOD' | 'Theatrical' | 'Digital Rights';
export type Status = 'Active' | 'Draft' | 'Unpublished';
export type DealStatus = 'Pending' | 'In Review' | 'Accepted' | 'Rejected';
export type UserRole = 'Buyer' | 'Seller';
export type UserStatus = 'Approved' | 'Pending';

export interface Title {
  id: string;
  name: string;
  genre: string;
  year: number;
  country: string;
  synopsis: string;
  poster: string;
  screenerUrl: string;
  rightsAvailable: string[];
  territories: string[];
  price: number;
  seller: string;
  sellerId: string;
  status: Status;
}

export interface DealRequest {
  id: string;
  titleId: string;
  titleName: string;
  buyer: string;
  rightsRequested: string;
  territory: string;
  budget: number;
  message: string;
  status: DealStatus;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  company: string;
  role: UserRole;
  country: string;
  status: UserStatus;
  email: string;
}

export const TITLES: Title[] = [
  {
    id: '1',
    name: 'Midnight Protocol',
    genre: 'Action / Thriller',
    year: 2024,
    country: 'India',
    synopsis: 'A high-stakes cyber-thriller set in Mumbai where a rogue intelligence operative must stop a global digital blackout while navigating a web of corporate espionage and political intrigue.',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80',
    screenerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rightsAvailable: ['LATAM Dubbing', 'EU SVOD'],
    territories: ['Latin America', 'Europe'],
    price: 45000,
    seller: 'Horizon Films',
    sellerId: 'seller-1',
    status: 'Active',
  },
  {
    id: '2',
    name: 'The Last Frontier',
    genre: 'Adventure / Drama',
    year: 2023,
    country: 'South Korea',
    synopsis: 'A sweeping epic following three generations of a Korean family as they navigate love, loss, and survival across 50 years of a nation\'s transformation.',
    poster: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&q=80',
    screenerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rightsAvailable: ['Global VOD', 'MENA Rights'],
    territories: ['Global', 'Middle East & North Africa'],
    price: 32000,
    seller: 'Seoul Pictures',
    sellerId: 'seller-2',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Silk Road Chronicles',
    genre: 'History / Epic',
    year: 2024,
    country: 'China',
    synopsis: 'An ambitious historical epic tracing the legendary Silk Road trade routes through the eyes of a Chinese merchant, a Persian scholar, and a Roman senator whose fates intertwine across continents.',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80',
    screenerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rightsAvailable: ['Theatrical', 'APAC Dubbing'],
    territories: ['Asia Pacific', 'Global Theatrical'],
    price: 78000,
    seller: 'Dragon Gate Studios',
    sellerId: 'seller-3',
    status: 'Active',
  },
  {
    id: '4',
    name: 'Neon Pulse',
    genre: 'Sci-Fi / Action',
    year: 2025,
    country: 'Japan',
    synopsis: 'In a neon-drenched Tokyo of 2087, a street-level hacker uncovers a conspiracy that threatens to erase human consciousness from the digital grid forever.',
    poster: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&q=80',
    screenerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rightsAvailable: ['Digital Rights', 'US SVOD'],
    territories: ['United States', 'Global Digital'],
    price: 55000,
    seller: 'Tokai Entertainment',
    sellerId: 'seller-4',
    status: 'Active',
  },
  {
    id: '5',
    name: 'Desert Storm',
    genre: 'Drama / War',
    year: 2023,
    country: 'Egypt',
    synopsis: 'Based on true events, this visceral war drama follows a group of journalists embedded with frontline forces during a forgotten conflict in the Saharan borderlands.',
    poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80',
    screenerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rightsAvailable: ['MENA Dubbing', 'EU Theatrical'],
    territories: ['Middle East & North Africa', 'Europe'],
    price: 28000,
    seller: 'Horizon Films',
    sellerId: 'seller-1',
    status: 'Active',
  },
  {
    id: '6',
    name: 'The Crimson Forest',
    genre: 'Horror / Thriller',
    year: 2024,
    country: 'Spain',
    synopsis: 'A group of urban explorers venture into an ancient Castilian forest and discover it harbors something far older and more dangerous than legend ever suggested.',
    poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80',
    screenerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rightsAvailable: ['LATAM Rights', 'US SVOD'],
    territories: ['Latin America', 'United States'],
    price: 19000,
    seller: 'Iberia Films',
    sellerId: 'seller-5',
    status: 'Active',
  },
  {
    id: '7',
    name: 'Aurora',
    genre: 'Romance / Drama',
    year: 2024,
    country: 'France',
    synopsis: 'A delicate, visually stunning love story set against the backdrop of the Norwegian fjords, following two strangers who meet during the aurora borealis and must choose between their separate worlds.',
    poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80',
    screenerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rightsAvailable: ['Global SVOD', 'Dubbing Rights'],
    territories: ['Global'],
    price: 41000,
    seller: 'Horizon Films',
    sellerId: 'seller-1',
    status: 'Active',
  },
  {
    id: '8',
    name: 'Iron Dynasty',
    genre: 'Action / Historical',
    year: 2025,
    country: 'South Korea',
    synopsis: 'A blood-soaked tale of betrayal and honor set in 14th century Korea, following a disgraced general who must reclaim his legacy and protect the last heir to a crumbling dynasty.',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    screenerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rightsAvailable: ['Theatrical', 'Global VOD'],
    territories: ['Global', 'Global Theatrical'],
    price: 92000,
    seller: 'Dynasty Media',
    sellerId: 'seller-6',
    status: 'Active',
  },
];

export const DEAL_REQUESTS: DealRequest[] = [
  {
    id: 'deal-1',
    titleId: '1',
    titleName: 'Midnight Protocol',
    buyer: 'StreamAsia',
    rightsRequested: 'APAC Dubbing',
    territory: 'Asia Pacific',
    budget: 40000,
    message: 'We are very interested in acquiring APAC dubbing rights for this title for our regional streaming platform. Please advise on availability.',
    status: 'Pending',
    createdAt: '2025-03-15',
  },
  {
    id: 'deal-2',
    titleId: '2',
    titleName: 'The Last Frontier',
    buyer: 'Prime Video',
    rightsRequested: 'EU SVOD',
    territory: 'Europe',
    budget: 30000,
    message: 'Prime Video EU is looking to license this title for our European SVOD catalog. We have reviewed the screener and are interested in moving forward.',
    status: 'In Review',
    createdAt: '2025-03-10',
  },
  {
    id: 'deal-3',
    titleId: '8',
    titleName: 'Iron Dynasty',
    buyer: 'NetflixEMEA',
    rightsRequested: 'Theatrical',
    territory: 'Global',
    budget: 85000,
    message: 'Netflix EMEA is pursuing theatrical rights for Iron Dynasty for a pan-European theatrical release window ahead of SVOD streaming.',
    status: 'Accepted',
    createdAt: '2025-03-01',
  },
];

export const USERS: User[] = [
  {
    id: 'user-1',
    name: 'Sarah Chen',
    company: 'StreamAsia',
    role: 'Buyer',
    country: 'Singapore',
    status: 'Approved',
    email: 'sarah.chen@streamasia.com',
  },
  {
    id: 'user-2',
    name: 'Marcus Webb',
    company: 'Prime Video',
    role: 'Buyer',
    country: 'USA',
    status: 'Approved',
    email: 'marcus.webb@primevideo.com',
  },
  {
    id: 'user-3',
    name: 'Yuki Tanaka',
    company: 'Tokai Entertainment',
    role: 'Seller',
    country: 'Japan',
    status: 'Approved',
    email: 'yuki.tanaka@tokai-ent.jp',
  },
  {
    id: 'user-4',
    name: 'Ahmed Hassan',
    company: 'Nile Productions',
    role: 'Seller',
    country: 'Egypt',
    status: 'Pending',
    email: 'ahmed.hassan@nileproductions.eg',
  },
  {
    id: 'user-5',
    name: 'Marie Dubois',
    company: 'Lumiere Collective',
    role: 'Seller',
    country: 'France',
    status: 'Pending',
    email: 'marie.dubois@lumiere.fr',
  },
];
