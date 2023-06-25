import {
	getUserMovieOpinions
} from '@/db/helpers/getUsersOpinion';
import { PopularCarousel } from '../components/libs/swiper/carousel';
import Freemode from '../components/libs/swiper/freemode';
import { MovieCardSlide } from '../components/libs/swiper/slides/movieCard';
import { PopularMovieSlide } from '../components/libs/swiper/slides/popular';

const tmdbGenreIds = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Romance: 10749,
  Mystery: 9648,
  'Science Fiction': 878,
};

const fetchPopularMovies = async () => {
  // get movies
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_DB_KEY}&language=en-US&page=1`
  );
  const { results } = await res.json();

  return results;
};

const fetchPopularMoviesByGenre = async (genre: number) => {
  // get movies
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_DB_KEY}&language=en-US&sort_by=popularity.desc&vote_average.gte=5&with_genres=${genre}&page=1`
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

interface SecondarySlideProps {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
}
[];

const Movies = async () => {
  const userData = await getUserMovieOpinions();
  const popularMovieData: TopSlideProps[] = await fetchPopularMovies();

  const genreFetchPromises = Object.values(tmdbGenreIds).map(
    fetchPopularMoviesByGenre
  );

  const genreMovieData: SecondarySlideProps[][] = await Promise.all(
    genreFetchPromises
  );

	const genreMovieDataWithOpinions = genreMovieData.map((moviesByGenre) => {
		return moviesByGenre.map((movie) => {
			const userOpinion = userData.find((opinion) => {
				return opinion.imoID === movie.id;
			});
			return { ...movie, userOpinion };
		});
	})



  const popularMovieDataWithOpinions = popularMovieData.map((movie) => {
    const userOpinion = userData.find((opinion) => {
      return opinion.imoID === movie.id;
    });
    return { ...movie, userOpinion };
  });

  const popularSlideArray = popularMovieDataWithOpinions.map((movie) => {
    return <PopularMovieSlide key={movie.id} {...movie} />;
  });

  const genreSlidesArrays = genreMovieDataWithOpinions.map((moviesByGenre, index) => {
    return moviesByGenre.map((movie) => {
      return <MovieCardSlide key={movie.id} {...movie} />;
    });
  });


  return (
    <div className="flex flex-col">
      <PopularCarousel slideArray={popularSlideArray} hasPagination={true} />
      {genreSlidesArrays.map((genreSlides, index) => (
        <>
          <h1 className="p-4 pt-8 text-4xl font-bold">
            {Object.keys(tmdbGenreIds)[index]}
          </h1>
          <Freemode
            slideArray={genreSlides}
            key={Object.keys(tmdbGenreIds)[index]}
          />
        </>
      ))}
    </div>
  );
};

export default Movies;
