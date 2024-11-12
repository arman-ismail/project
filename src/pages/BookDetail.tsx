import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, MessageSquare } from 'lucide-react';
import type { Book } from '../types';

const SAMPLE_BOOKS: Record<string, Book> = {
  '1': {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?'
  }
};

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const book = id ? SAMPLE_BOOKS[id] : null;

  if (!book) return <div>Book not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex gap-8">
          <img
            src={book.cover}
            alt={book.title}
            className="w-48 h-72 object-cover rounded-lg shadow-sm"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
            <p className="text-xl text-gray-600 mt-1">by {book.author}</p>
            <p className="mt-4 text-gray-600">{book.description}</p>
            
            <div className="mt-6 flex gap-4">
              <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                <Star className="w-5 h-5" />
                <span>Rate Book</span>
              </button>
              <button className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span>Write Review</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        <p className="text-gray-600">No reviews yet</p>
      </div>
    </div>
  );
}