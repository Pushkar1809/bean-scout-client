export interface Shop {
  _id: string;
  __v: number;
  name: string;
  address: string;
  email: string;
  description: string;
  status: boolean;
  reviewCount: number;
  rating: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}