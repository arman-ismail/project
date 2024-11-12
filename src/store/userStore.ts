import { create } from 'zustand';
import type { User } from '../types';

interface UserState {
  following: string[];
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  following: [],
  followUser: (userId) =>
    set((state) => ({ following: [...state.following, userId] })),
  unfollowUser: (userId) =>
    set((state) => ({
      following: state.following.filter((id) => id !== userId),
    })),
}));