import React from 'react';
import { Book, BookOpen, Users, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useClubStore } from '../store/clubStore';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const clubs = useClubStore((state) => state.clubs);

  if (!user) {
    navigate('/login');
    return null;
  }

  const userClubs = clubs.filter((club) =>
    club.members.some((member) => member.id === user.id)
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600 mt-1">{user.bio}</p>
              <p className="text-sm text-gray-500 mt-2">Member since {new Date(user.joinedDate).toLocaleDateString()}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold">Reading Stats</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Books Read</p>
              <p className="text-2xl font-bold text-gray-900">{user.booksRead?.length || 0}</p>
            </div>
            {user.readingGoal && (
              <div>
                <p className="text-gray-600">Reading Goal</p>
                <p className="text-2xl font-bold text-gray-900">{user.readingGoal} books</p>
              </div>
            )}
            {user.currentlyReading && (
              <div>
                <p className="text-gray-600">Currently Reading</p>
                <p className="text-lg font-medium text-indigo-600">Book Title</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold">Book Clubs</h2>
          </div>
          {userClubs.length > 0 ? (
            <ul className="space-y-3">
              {userClubs.map((club) => (
                <li
                  key={club.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{club.name}</p>
                    <p className="text-sm text-gray-600">{club.members.length} members</p>
                  </div>
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
            <p className="text-gray-600">Not a member of any book clubs yet</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Book className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold">Favorite Genres</h2>
          </div>
          {user.favoriteGenres?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.favoriteGenres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No favorite genres added yet</p>
          )}
        </div>
      </div>
    </div>
  );
}