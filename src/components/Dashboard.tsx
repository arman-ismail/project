import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Users, BookOpen } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useClubStore } from '../store/clubStore';
import { useUserStore } from '../store/userStore';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const clubs = useClubStore((state) => state.clubs);
  const following = useUserStore((state) => state.following);

  const userClubs = clubs.filter((club) =>
    club.members.some((member) => member.id === user?.id)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Book className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-semibold">Your Book Clubs</h2>
        </div>
        {userClubs.length > 0 ? (
          <ul className="space-y-3">
            {userClubs.map((club) => (
              <li
                key={club.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span>{club.name}</span>
                <button
                  onClick={() => navigate(`/club/${club.id}`)}
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">You haven't joined any book clubs yet.</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-semibold">Following</h2>
        </div>
        {following.length > 0 ? (
          <ul className="space-y-3">
            {following.map((userId) => (
              <li
                key={userId}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span>User {userId}</span>
                <button
                  onClick={() => navigate(`/profile/${userId}`)}
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  View Profile
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">You're not following anyone yet.</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-semibold">Reading Activity</h2>
        </div>
        <p className="text-gray-600">No recent reading activity.</p>
      </div>
    </div>
  );
}