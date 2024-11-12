export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  joinedDate: string;
  readingGoal?: number;
  booksRead: string[];
  favoriteGenres: string[];
  currentlyReading?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
}

export interface BookClub {
  id: string;
  name: string;
  description: string;
  members: User[];
  currentBook?: Book;
  meetingSchedule?: string;
  createdBy: User;
}

export interface BookSummary {
  id: string;
  bookId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface BookReview {
  id: string;
  bookId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}