import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Users, Library, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 sm:top-0 sm:bottom-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900 hidden sm:inline">BookClub</span>
          </Link>
          
          <div className="flex space-x-8">
            <NavItem
              icon={<Library className="w-5 h-5" />}
              label="Clubs"
              isActive={isActive('/')}
              onClick={() => navigate('/')}
            />
            <NavItem
              icon={<Users className="w-5 h-5" />}
              label="Members"
              isActive={isActive('/members')}
              onClick={() => navigate('/members')}
            />
            {user && (
              <NavItem
                icon={<User className="w-5 h-5" />}
                label="Profile"
                isActive={isActive('/profile')}
                onClick={() => navigate('/profile')}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center transition-colors ${
        isActive
          ? 'text-indigo-600'
          : 'text-gray-600 hover:text-indigo-600'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}