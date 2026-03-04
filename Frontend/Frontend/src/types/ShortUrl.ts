export interface ShortUrl {
  id: number;
  originalUrl: string;
  shortCode: string;
  createdDate: Date;
  createdByUsername: string;
  createdByUserId: number;
}
