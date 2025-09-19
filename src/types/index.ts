export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface DashboardStats {
  totalPosts: number;
  totalUsers: number;
  activeUsers: number;
  growth: number;
}

export type AnimationVariant = 'fade' | 'slide' | 'scale' | 'bounce';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}
