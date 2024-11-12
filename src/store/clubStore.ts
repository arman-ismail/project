import { create } from 'zustand';
import type { BookClub } from '../types';

interface ClubState {
  clubs: BookClub[];
  addClub: (club: BookClub) => void;
  joinClub: (clubId: string, userId: string) => void;
}

export const useClubStore = create<ClubState>((set) => ({
  clubs: [],
  addClub: (club) => set((state) => ({ clubs: [...state.clubs, club] })),
  joinClub: (clubId, userId) => set((state) => ({
    clubs: state.clubs.map((club) =>
      club.id === clubId
        ? {
            ...club,
            members: [...club.members, { id: userId, name: 'New Member', avatar: '' }],
          }
        : club
    ),
  })),
}));