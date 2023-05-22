import Fuse from 'fuse.js';
import data from '../../data/index.json';

const searchMoviesArray = (title: string) => {
  // Fuse.js options
  let options = {
    shouldSort: true,
    threshold: 0.4, // this will return matches "close enough" to the user input
    keys: ['title'], // keys of the json objects you want to search within
  };

  // Create a new instance of Fuse with your data and options
  let fuse = new Fuse(data, options);

  // Now search with the user's input
  let result = fuse.search(title);

  return result;
};

export const constructMovieUrl = (id: number, title: string) => {
  const formattedTitle = title.split(' ').join('-');
  return `https://primewire.mx/movie/watch-${formattedTitle}-online-${id}`;
};

export const getPrimeWireLink = (searchString: string) => {
  const lowerCaseSearchString = searchString
    .toLowerCase()
    .replace(/[^a-z0-9é ]/g, '')
    .replace('é', 'e');

  const exactMatch = data.filter(
    (movie) => movie.title.toLowerCase() === lowerCaseSearchString
  );

  if (exactMatch.length > 0) {
    return exactMatch;
  }

  // If no exact match, get fuzzy matches
  const fuzzyMatches = searchMoviesArray(lowerCaseSearchString);

  return fuzzyMatches.map((result) => result.item); // Map back to original object structure
};
