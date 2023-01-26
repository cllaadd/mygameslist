import { useState, useEffect, useCallback } from "react";
import { NavLink, Link, useLocation, useNavigate, useParams, } from "react-router-dom";
import '../styling/NavSearch.css'

function NavSearch() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [refresh, setRefresh] = useState(false)

    const navigate = useNavigate();

    const handleSearch = async (e) => {
        setSearchValue(e.target.value);
        const response = await fetch(`http://localhost:8000/api/games/name/search/?param_name=${e.target.value}`);
        const searchResults = await response.json();
        setSearchResults(searchResults);
    }

    useEffect(() => {
        handleSearch({target:{value:searchValue}});
        setRefresh(false);
    }, [refresh])

    const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/searchresults?param_name=${searchValue}`);
    window.location.reload();
    }

    return (
    <div>
        <form className="nav-search-form-container" onSubmit={handleSubmit}>
            <input className="nav-search-form-input" type="text" placeholder="Search..." onChange={handleSearch} />
            <button className="nav-search-form-button" type="submit" >Search</button>
        </form>
        {searchResults.games &&
                <div className="nav-search-dropdown-container">
                    <ul className="nav-search-dropdown">
                        {searchResults.games.slice(0, 5).map((result, index) => (
                            <li className="nav-search-dropdown-item" key={index} value={result.id}>
                                <a className="nav-search-dropdown-item-link" href={`/games/${result.id}`} onClick={() => setRefresh(true)}>
                                    {result.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            }
    </div>
);

}

export default NavSearch;
