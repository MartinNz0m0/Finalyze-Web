import { useHistory, Link } from "react-router-dom";

const NavBar = ({ searchText, setSearchText }) => {
  const history = useHistory();
  const updateSearch = (e) => {
    history.push("/search");
    setSearchText(e.target.value);
  };

  return (
    <div className="navbdiv">
      <nav class="navbar navbar-expand-lg bg-dark bg-opacity-25 text-light">
        <div class="container-fluid">
          
       
          <div class="collapse navbar-collapse mt-2" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/">
                  <p className="text-white">Home</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/about">
                  <p className="text-white">About</p>
                </Link>{" "}
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/whackmole">
                  <p className="text-white">whackmole</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/Statement">
                  <p className="text-white">Statements</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/Upload">
                  <p className="text-white">Upload</p>
                </Link>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input
                class="form-control me-2 bg-dark border-dark text-light"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchText}
                onChange={updateSearch}
              />
              <button class="btn btn-outline-dark text-light" type="submit">
                <Link to="/search"></Link>
                Go
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
