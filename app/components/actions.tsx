'use client';
import { useDebounceCallback } from '@/utils/debounce';
import { useCallback, useState } from 'react';

const tempActions = {
  like: false,
  favorite: false,
  watched: true,
};

const Actions = () => {
  const [buttonActions, setButtonActions] = useState(tempActions);

  const handleClickEvent = useCallback(async (title: string) => {
    console.log(title);
    const res = await fetch(`/api/movieNight?title=${title}`);
    const json: boolean = await res.json();

    setButtonActions((prevState) => ({
      ...prevState,
      [title]: json,
    }));
  }, []);

  const debouncedHandleClickEvent = useDebounceCallback(handleClickEvent, 500);

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
            const title = event.currentTarget.innerText;
            debouncedHandleClickEvent(title);
          }}
        >
          {actionType}
        </button>
      ))}
    </div>
  );
};

export default Actions;
