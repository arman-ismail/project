import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import Dashboard from '../components/Dashboard';
import { useAuthStore } from '../store/authStore';

export default function Home() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening in your book clubs.</p>
        </div>
        <button
          onClick={() => navigate('/create-club')}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Create Club</span>
        </button>
      </div>

      <Dashboard />
    </div>
  );
}