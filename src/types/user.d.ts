export interface User {
  _id: string;
  __v?: number;
  name: string;
  pictureUrl: string;
  address?: string;
  createAt: Date;
  updatedAt: Date;
}