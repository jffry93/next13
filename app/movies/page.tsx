import MovieCarousel from '../components/carousel';

const Movies = () => {
  return (
    <div className="flex flex-col">
      <MovieCarousel arrayData={[1, 2, 3, 4, 5, 6]} reverseDirection={false} />
      <MovieCarousel arrayData={[1, 2, 3, 4, 5, 6]} reverseDirection />
      <MovieCarousel arrayData={[1, 2, 3, 4, 5, 6]} reverseDirection={false} />
    </div>
  );
};

export default Movies;
