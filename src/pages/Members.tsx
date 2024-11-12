import React, { useState } from 'react';
import { Search, Users } from 'lucide-react';
import UserCard from '../components/UserCard';
import { useAuthStore } from '../store/authStore';
import { useUserStore } from '../store/userStore';

// Sample users data - replace with actual API call
const SAMPLE_USERS = [
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    bio: 'Fantasy and sci-fi enthusiast',
    joinedDate: '2024-01-15',
    readingGoal: 24,
    booksRead: ['1', '2', '3'],
    favoriteGenres: ['Fantasy', 'Science Fiction'],
    currentlyReading: '4'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    bio: 'History buff and mystery lover',
    joinedDate: '2024-02-01',
    readingGoal: 12,
    booksRead: ['5', '6'],
    favoriteGenres: ['History', 'Mystery'],
    currentlyReading: '7'
  },
  {
    id: '4',
    name: 'Sofia Rodriguez',
    email: 'sofia@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    bio: 'Romance and contemporary fiction reader',
    joinedDate: '2024-02-15',
    readingGoal: 30,
    booksRead: ['8', '9', '10', '11'],
    favoriteGenres: ['Romance', 'Fiction'],
    currentlyReading: '12'
  }
];

export default function Members() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const currentUser = useAuthStore(state => state.user);
  const { following } = useUserStore();

  const genres = Array.from(
    new Set(SAMPLE_USERS.flatMap(user => user.favoriteGenres))
  ).sort();

  const filteredUsers = SAMPLE_USERS.filter(user => {
    if (user.id === currentUser?.id) return false;
    
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.bio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = !selectedGenre || user.favoriteGenres.includes(selectedGenre);
    
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Book Club Members</h1>
          <p className="text-gray-600 mt-1">Connect with other readers</p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          <span className="text-gray-600">{SAMPLE_USERS.length} members</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              isFollowing={following.includes(user.id)}
            />
          ))
        ) : (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600">No members found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}