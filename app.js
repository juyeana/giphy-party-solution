console.log("Let's get this party started!");

const API_KEY = 'pbegGnknqDF4VAqDU5D9UtrMRojG9NAA';

// add event listener to the search form
$('#search-form').on('click', getGiphy);

/**
 * @desc AXIOS get search result
 */
async function getGiphy(e) {
  e.preventDefault();
  const searchTerm = $('#search').val();
  if (e.target.id === 'btn-search' && searchTerm) {
    const result = await axios.get('https://api.giphy.com/v1/gifs/search', {
      params: {
        q: searchTerm,
        api_key: API_KEY,
      },
    });

    const { data } = result.data;
    const randomNum = Math.round(Math.random() * data.length);
    const imgURL = data[randomNum].images.downsized.url;
    if (imgURL) {
      renderGifs(imgURL);
      $('#search').val('');
    }
  } else if (e.target.id === 'btn-remove') $('#gifs').children().remove();
}

/**
 * @desc render gif animations
 */
function renderGifs(url) {
  const gifGrid = $('<div>').addClass('col-sm-6 col-md-4 col-lg-3 my-2');
  const img = $('<img>').attr('src', url);
  gifGrid.append(img);
  $('#gifs').append(gifGrid);
}
