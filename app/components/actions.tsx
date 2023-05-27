'use client';
import { useDebounceCallback } from '@/utils/debounce';
import { useCallback, useState } from 'react';
import type { MovieDetails } from '../movieDetails/[slug]/page';
import type { MovieOpinions } from '@/db/helpers/getUsersOpinion';

const Actions = (props: {
  movieData: MovieDetails;
  opinions: MovieOpinions;
}) => {
  const [buttonActions, setButtonActions] = useState(props.opinions);

  const handleClickEvent = useCallback(
    async (type: string, status: boolean) => {
      // const res = await fetch(`/api/movieNight`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ type, movieData: props.movieData, status }),
      // });
      // const json: {} = await res.json();
      // setButtonActions((prevState) => ({
      //   ...prevState,
      //   ...json,
      // }));
    },
    [props.movieData]
  );

  const debouncedHandleClickEvent = useDebounceCallback(handleClickEvent, 150);

  return (
    <div className="flex gap-4 my-4 actions">
      {Object.entries(buttonActions).map(([actionType, status]) => (
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
      ))}
    </div>
  );
};

export default Actions;
