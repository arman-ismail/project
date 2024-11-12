import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, UserMinus, BookOpen } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import type { User } from '../types';

interface UserCardProps {
  user: User;
  isFollowing: boolean;
}

export default function UserCard({ user, isFollowing }: UserCardProps) {
  const navigate = useNavigate();
  const { followUser, unfollowUser } = useUserStore();

  const handleFollowToggle = () => {
    if (isFollowing) {
      unfollowUser(user.id);
    } else {
      followUser(user.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.bio}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BookOpen className="w-4 h-4" />
            <span>{user.booksRead.length} books read</span>
          </div>
          <button
            onClick={handleFollowToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isFollowing
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isFollowing ? (
              <>
                <UserMinus className="w-4 h-4" />
                Unfollow
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Follow
              </>
            )}
          </button>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {user.favoriteGenres.map(genre => (
            <span
              key={genre}
              className="inline-block px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}