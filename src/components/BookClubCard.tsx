import React from 'react';
import { Users, BookOpen, Calendar } from 'lucide-react';
import type { BookClub } from '../types';

interface BookClubCardProps {
  club: BookClub;
}

export default function BookClubCard({ club }: BookClubCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{club.name}</h3>
        <p className="mt-2 text-gray-600">{club.description}</p>
        
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm">{club.members.length} members</span>
          </div>
          
          {club.currentBook && (
            <div className="flex items-center text-gray-500">
              <BookOpen className="w-4 h-4 mr-1" />
              <span className="text-sm">{club.currentBook.title}</span>
            </div>
          )}
          
          {club.meetingSchedule && (
            <div className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              <span className="text-sm">{club.meetingSchedule}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-100">
        <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
          Join Club
        </button>
      </div>
    </div>
  );
}