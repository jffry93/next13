import { FreeMode } from 'swiper';
import { PopularCarousel } from '../components/libs/swiper/carousel';
import { PopularMovieSlide } from '../components/libs/swiper/slides/popular';
import Freemode from '../components/libs/swiper/freemode';

const fetchPopularMovies = async () => {
  // get movies
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_DB_KEY}&language=en-US&page=1`
  );
  const { results } = await res.json();

  return results;
};

interface TopSlideProps {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
}
[];

const Movies = async () => {
  const popularMovieData: TopSlideProps[] = await fetchPopularMovies();

  const popularSlideArray = popularMovieData.map((movie) => {
    return <PopularMovieSlide key={movie.id} {...movie} />;
  });

  return (
    <div className="flex flex-col">
      <PopularCarousel slideArray={popularSlideArray} hasPagination={true} />
      <Freemode />
    </div>
  );
};

export default Movies;
