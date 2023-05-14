import data from '../../data/index.json';

const constructMovieUrl = (id: number, title: string) => {
  const formattedTitle = title.split(' ').join('-');
  return `https://primewire.mx/movie/watch-${formattedTitle}-online-${id}`;
};

const searchMoviesArray = (
  searchString: string,
  movies: { title: string; id: number }[]
) => {
  const lowerCaseSearchString = searchString
    .toLowerCase()
    .replace(/[^a-z0-9é ]/g, '')
    .replace('é', 'e');

  const exactMatch = movies.filter(
    (movie) => movie.title.toLowerCase() === lowerCaseSearchString
  );

  if (exactMatch.length > 0) {
    return exactMatch;
  }

  const firstThreeWords = lowerCaseSearchString
    .split(' ')
    .slice(0, 3)
    .join(' ');

  const SimilarTitles = movies.filter((movie) =>
    movie.title.includes(firstThreeWords)
  );
  return SimilarTitles;
};

const Primewire = ({ title }: { title: string }) => {
  const movies = searchMoviesArray(title, data);
  console.log(movies);

  if (movies.length <= 0) {
    return <div className="text-red-500">Movie not found</div>;
  }

  return movies.map((movie) => {
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
  });
};

export default Primewire;
