import Hero from "./Hero";

// image url: https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png

const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
  return (
    <div className="col-lg-3 col-md-3 col-2 my-2">
      <div className="card">
        <img src={posterUrl} className="card-img-top" alt={movie.original_title} />
        <div className="card-body">
          <h5 className="card-title">{movie.original_title}</h5>
          <a href="#" className="btn btn-primary">
            Show Details
          </a>
        </div>
      </div>
    </div>
  );
};

const Noresults = () => {
  return (
    <div>
      <h1>No Results found</h1>
    </div>
    );
};

const SearchView = ({ keyword, searchResults, resultsFound }) => {
  const title = `You are seaching for ${keyword}`;
  const nores = resultsFound

  const results = searchResults.map((obj, i) => {
    return <MovieCard key={i} movie={obj} />;
  });
  return (
    <>
      <Hero text={title} />
      {results &&
        <div className="container">
          <div className="row">
            {results}
            </div>
        </div>
      }
      {
        nores &&
        <div> 
          <Noresults />
        </div>
      }
    </>
  );
};

export default SearchView;
