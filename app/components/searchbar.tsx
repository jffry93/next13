'use client';
import { useDebounceCallback } from '@/utils/debounce';
import Link from 'next/link';
import React, { useState } from 'react';

export interface Movies {
  title: string;
  id: string;
  poster_path: string;
}
[];

const Searchbar = () => {
  const [movies, setMovies] = useState<Movies[] | null>(null);
  const searchMovies = async (e: { target: { value: string } }) => {
    const data = await fetch(`/api/imdb/movies?title=${e.target.value}`);
    const json: Movies[] = await data.json();
    setMovies(json);
  };
  const debounceMovieSearch = useDebounceCallback(searchMovies, 250);
  return (
    <div className="relative w-full max-w-md m-auto my-8 animate-fade-in">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 cursor-pointer dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          onChange={debounceMovieSearch}
          type="search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Movies..."
          required
        />
      </div>

      {movies && (
        <div
          className="relative w-full mt-2 origin-top-right bg-gray-900 rounded-md z-1000"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {movies &&
            movies.map((movie, index) => {
              if (index < 10)
                return (
                  <div key={movie.id} className="py-1" role="none">
                    <Link
                      href={'/movieDetails/' + movie.id}
                      className="block px-4 py-2 text-sm text-gray-300 "
                      role="menuitem"
                      id="menu-item-0"
                    >
                      {movie.title}
                    </Link>
                  </div>
                );
            })}
          {movies.length > 10 && (
            <div className="py-1" role="none">
              <Link
                href="/movies/1"
                className="block px-4 py-2 text-sm text-gray-300 "
                role="menuitem"
                id="menu-item-0"
              >
                See more...
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
