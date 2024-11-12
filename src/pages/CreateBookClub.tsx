import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useClubStore } from '../store/clubStore';

export default function CreateBookClub() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [meetingSchedule, setMeetingSchedule] = useState('');
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const addClub = useClubStore((state) => state.addClub);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newClub = {
      id: Date.now().toString(),
      name,
      description,
      meetingSchedule,
      members: [user],
      createdBy: user
    };

    addClub(newClub);
    navigate(`/club/${newClub.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create a Book Club</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Club Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter club name"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Describe your book club"
            />
          </div>

          <div>
            <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">
              Meeting Schedule
            </label>
            <input
              type="text"
              id="schedule"
              value={meetingSchedule}
              onChange={(e) => setMeetingSchedule(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., Every Thursday at 7 PM"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create Club
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}