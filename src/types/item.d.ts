export interface Item {
  _id: string;
  __v: number;
	name: string;
	price: number;
	description: string;
	status: boolean;
	reviewCount: number;
	rating: number;
	imageUrl: string;
	shopId: string;
	categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}