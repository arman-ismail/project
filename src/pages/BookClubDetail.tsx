import React from 'react';
import { useParams } from 'react-router-dom';
import { Users, Calendar, BookOpen } from 'lucide-react';
import type { BookClub } from '../types';

const SAMPLE_CLUBS: Record<string, BookClub> = {
  '1': {
    id: '1',
    name: 'Fiction Fanatics',
    description: 'A community of fiction lovers exploring contemporary and classic novels together.',
    members: [{ id: '1', name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', bio: 'Book lover' }],
    currentBook: {
      id: '1',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
      description: 'Between life and death there is a library...'
    },
    meetingSchedule: 'Every Thursday, 7 PM',
    createdBy: { id: '1', name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', bio: 'Book lover' }
  }
};

export default function BookClubDetail() {
  const { id } = useParams<{ id: string }>();
  const club = id ? SAMPLE_CLUBS[id] : null;

  if (!club) return <div>Book club not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{club.name}</h1>
        <p className="text-gray-600 mb-6">{club.description}</p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{club.members.length} members</span>
          </div>
          {club.meetingSchedule && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{club.meetingSchedule}</span>
            </div>
          )}
        </div>
      </div>

      {club.currentBook && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold">Current Book</h2>
          </div>
          <div className="flex gap-6">
            <img
              src={club.currentBook.cover}
              alt={club.currentBook.title}
              className="w-32 h-48 object-cover rounded-lg shadow-sm"
            />
            <div>
              <h3 className="text-xl font-semibold">{club.currentBook.title}</h3>
              <p className="text-gray-600">by {club.currentBook.author}</p>
              <p className="mt-2 text-gray-600">{club.currentBook.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Members</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {club.members.map(member => (
            <div key={member.id} className="flex items-center gap-3">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{member.name}</p>
                {member.bio && <p className="text-sm text-gray-600">{member.bio}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}