// api.js

const apiKey = '9100e82d37msh4dd17f63f14e224p178b7ejsnb1b6f2435921';

// Function to fetch data from Deezer API
async function fetchData(endpoint) {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/${endpoint}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        'X-RapidAPI-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    // Restructure the data to only include relevant information (artist name and song title)
    const restructuredData = data.data.map(item => ({
      artist: item.artist.name,
      title: item.title,
      albumcover: item.album.cover,
      link: item.link,
      songpreview: item.preview,
      duration: item.duration,
    }));

    return restructuredData;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error; // Re-throw the error to handle it in the calling code
  }
}

// Example usage
async function searchArtists(query) {
  const endpoint = 'search';
  const results = await fetchData(`${endpoint}?q=${query}`);
  return results;
}

export { searchArtists };
