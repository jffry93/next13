const jsonInput = require('./sitemaps.json');
const fs = require('fs');

const extractMovieInfo = (url) => {
  const prefix = 'https://primewire.mx/movie/watch-';
  if (!url.startsWith(prefix)) {
    return null;
  }

  const movieIdAndTitle = url.slice(prefix.length);
  const parts = movieIdAndTitle.split('-');
  const id = parseInt(parts.pop(), 10);
  parts.pop(); // Remove "online"
  const title = parts.join(' ');

  return { id, title };
};

const processJson = (json) => {
  const movies = [];

  for (const sitemap of json) {
    const entries = sitemap.entries;

    for (const entry of entries) {
      const movieInfo = extractMovieInfo(entry.loc);
      if (movieInfo) {
        movies.push(movieInfo);
      }
    }
  }

  fs.writeFile(
    'data/index.json',
    JSON.stringify(movies, null, 2),
    'utf8',
    (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log('JSON file created successfully!');
      }
    }
  );
};

processJson(jsonInput);
