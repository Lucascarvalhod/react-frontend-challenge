export type ReadingStatus = 'Quero ler' | 'Lendo' | 'Concluído';
export type Book = {
  id: string;
  title: string;
  authors: string[];
  publishedDate: string;
  description: string;
  publisher: string;
  thumbnail: string;
  previewLink?: string;
  status?: ReadingStatus;
};
export type GoogleVolumeInfo = {
  title?: string;
  authors?: string[];
  publisher?: string;
  description?: string;
  publishedDate?: string;
  previewLink?: string;
  imageLinks?: { thumbnail?: string; smallThumbnail?: string };
};

export type GoogleVolume = {
  id: string;
  volumeInfo: GoogleVolumeInfo;
};

export type BookSearchResponse = {
  items?: GoogleVolume[];
  totalItems?: number;
};