'use client';
import { useDebounceCallback } from '@/utils/debounce';
import { useCallback, useState } from 'react';
import type { MovieDetails } from '../movieDetails/[slug]/page';
import type { MovieOpinions } from '@/db/helpers/getUsersOpinion';
import UseAnimations from 'react-useanimations';
import heart from 'react-useanimations/lib/heart';
import bookmark from 'react-useanimations/lib/bookmark';
import star from 'react-useanimations/lib/star';
import { Animation } from 'react-useanimations/utils';

const ActionIcons: {
  [key: string]: Animation;
} = {
  recommend: heart,
  watchlist: bookmark,
  completed: star,
};

interface PropTypes {
  movieData: { title: string; id: number; poster_path: string };
  opinions: MovieOpinions;
  hasIcons?: boolean;
  direction?: 'row' | 'column';
  availableActions?: string[];
}

const Actions = ({
  movieData,
  opinions,
  direction = 'row',
  hasIcons = false,
  availableActions = ['recommend', 'watchlist', 'completed'],
}: PropTypes) => {
  const [buttonActions, setButtonActions] = useState(opinions);

  const handleClickEvent = useCallback(
    async (type: string, status: boolean) => {
      const res = await fetch(`/api/movieNight`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, movieData: movieData, status }),
      });
      const json: {} = await res.json();

      setButtonActions((prevState) => ({
        ...prevState,
        ...json,
      }));
    },
    [movieData]
  );

  const debouncedHandleClickEvent = useDebounceCallback(handleClickEvent, 150);

  return (
    <div
      className={`flex ${
        direction !== 'row' ? 'flex-col' : ''
      } gap-4 actions`}
    >
      {Object.entries(buttonActions).map(([actionType, status]) => {
        if (availableActions.includes(actionType) === false) return null;
        return (
          <>
            {hasIcons ? (
              <UseAnimations
                reverse={status}
                animation={ActionIcons[actionType]}
                size={40}
                fillColor="#ccc"
                strokeColor="#ccc"
                speed={0.5}
                onClick={(e) => {
									e.stopPropagation();
                  debouncedHandleClickEvent(actionType, status);
                }}
              />
            ) : (
              <button
                disabled={status && actionType === 'watched' && status}
                key={actionType}
                className={`px-6 py-3 text-gray-400 ${
                  status
                    ? 'hover:bg-orange-600 active:bg-orange-800 bg-orange-500'
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 '
                } rounded-md f focus:outline-none disabled:bg-gray-800 disabled:cursor-not-allowed`}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  debouncedHandleClickEvent(actionType, status);
                }}
              >
                {actionType}
              </button>
            )}
          </>
        );
      })}
    </div>
  );
};

export default Actions;
