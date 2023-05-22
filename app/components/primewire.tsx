import { constructMovieUrl } from '@/db/helpers/getPrimewireLink';

interface PropType {
  movies: { title: string; id: number }[];
}

const Primewire = ({ movies }: PropType) => {
  if (movies.length <= 0) {
    return <div className="text-red-500">Movie not found</div>;
  }
  return (
    <>
      {movies.map((movie) => {
        return (
          <div key={movie.id}>
            <a
              className="text-gray-700"
              href={constructMovieUrl(movie.id, movie.title)}
              target="_blank"
            >
              Watch - {movie.title}
            </a>
          </div>
        );
      })}
    </>
  );
};

export default Primewire;
