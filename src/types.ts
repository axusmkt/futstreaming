export interface SubChannel {
  id: string;
  name: string;
  url: string;
  type?: 'telegram' | 'direct' | 'website';
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  logo: string;
  thumbnail?: string;
  status?: 'online' | 'offline' | 'live';
  url: string;
  category: string;
  subChannels?: SubChannel[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
