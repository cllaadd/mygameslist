import { useEffect, useState } from "react";
import { useToken } from "../Auth";
import { useParams, Link } from "react-router-dom";
import '../styling/GameDetail.css';
import $ from 'jquery';
import Carousel from "../components/Carousel"



const CircularProgressBar = (props) => {
  const sqSize = props.sqSize;
  const radius = (props.sqSize - props.strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - dashArray * props.percentage / 100;

  return (
    <svg
        width={props.sqSize}
        height={props.sqSize}
        viewBox={viewBox}>
        <circle
          className="circle-background"
          cx={props.sqSize / 2}
          cy={props.sqSize / 2}
          r={radius}
          strokeWidth={`${props.strokeWidth}px`} />
        <circle
          className="circle-progress"
          cx={props.sqSize / 2}
          cy={props.sqSize / 2}
          r={radius}
          strokeWidth={`${props.strokeWidth}px`}
          transform={`rotate(-90 ${props.sqSize / 2} ${props.sqSize / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset
          }} />
        <text
          className="circle-text"
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle">
          {`${props.percentage}/100`}
        </text>
    </svg>
  );
}


const GameDetail = () => {
    const [games, setGame] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [showMoreAlternativeNames, setShowMoreAlternativeNames] = useState(false);
    const [showMoreKeywords, setShowMoreKeywords] = useState(false);
    const [rating, setRating] = useState(false);
    const {id} = useParams()
    const [keywords, setKeywords] = useState([])
    const [altnames, setAltNames] = useState([])
    const [showLimitAlternativeNames, setShowLimitAlternativeNames] = useState(10);
    const [showLimitKeywords, setShowLimitKeywords] = useState(10);



    useEffect(() => {
        window.scrollTo(0,0)
        const loadData = async () => {
        const url = `http://localhost:8000/games/${id}`
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setGame(data);
            setRefresh(false);
            setRating(data[0].total_rating)
            setKeywords(data[0].keywords_id)
            setAltNames(data[0].alternative_names)
        } else {
            console.log('Error')
        }
    }
    loadData()
}, [id, refresh, rating])
const visibleKeywords = showMoreKeywords ? keywords.slice(0, showLimitKeywords) : keywords.slice(0, 10);
const visibleAlternativeNames = showMoreAlternativeNames ? altnames.slice(0, showLimitAlternativeNames) : altnames.slice(0, 5);
  return (
    <div>
    <div className="main-body">

        {games?.map(game => {
            return (
                <div>

                     <div className="game-header-container">
                        <div className="game-cover-name-container">
                            <div className="game-cover-container">
                                    <img className="game-cover" src={game.cover}/>
                            </div>
                            <div className="game-name-container">
                                <div className="game-name">
                                    <h1 key={game.id}>{game.name}</h1>
                                    <h4>Released {game.first_release_date}</h4>
                                </div>
                            </div>
                        </div>
                            <div className="game-important-details">
                                <div className="game-about-container">
                                    <div className="game-about">
                                        <p>
                                            <span>Genres: </span>
                                            {game.genres_id.map((genre, index) => (
                                                <a className="genres"href={`/games/search?search_param=Genres&search_param_name=${genre.name}&query_param=genres_id&param_id=${genre._id}`}>{genre.name}</a>
                                            ))}
                                        </p>
                                        <p>
                                            <span>Platforms: </span>
                                            {game.platforms_id.map((platform, index) => (
                                                <a className="platforms"href={`/games/search?search_param=Platform&search_param_name=${platform.name}&query_param=platforms_id&param_id=${platform._id}`}>{platform.name}</a>
                                            ))}
                                        </p>
                                        <div>{game.summary}</div>
                                    </div>
                                </div>
                                <div className="game-rating-container">
                                    <div className="game-rating">
                                        <CircularProgressBar
                                        strokeWidth="7"
                                        sqSize="100"
                                        percentage={rating}/>
                                        <div className="game-rating-count">
                                            <text classname="game-rating-text">
                                                Based on {game.total_rating_count} user ratings
                                            </text>
                                        </div>
                                    </div>
                                </div>
                            </div>

                    </div>

                    <div className="screenshots-container">
                        <h4>Screenshots</h4>
                        <div className='screenshots-carousel' style={{maxWidth: 1024}}>
                            <Carousel>
                                {game.screenshots.map((screenshot, index) => (
                                    <div >
                                        <img className="screenshots_image" src={screenshot} key={index} style={{height: "576px", width: "1024px"}}/>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>

                    <div className="right-side-sidebar-info">

                        <h4>Category</h4>
                        <body>{game.category}</body>

                        <h4>Collection</h4>
                        {game.collection_id.map((collection, index) => (
                            <div key={index}>
                                <body>{collection.name}</body>
                            </div>
                            ))}

                        <h4>DLCS</h4>
                        <body>{game.dlcs_id}</body>

                        <h4>Franchises</h4>
                        {game.franchises_id.map((franchise, index) => (
                            <div key={index}>
                                <a href={`/games/search?search_param=Franchise&search_param_name=${franchise.name}&query_param=franchises_id&param_id=${franchise.id}`}>{franchise.name}</a>
                            </div>
                            ))}
                        <h4>Alternative Names</h4>
                        <div>
                            {visibleAlternativeNames.map((altname, index) => (
                                <div key={index} className='keyword-button-container'>
                                    <text className="alternative-names">{altname}</text>
                                </div>
                            ))}
                             {keywords.length > 10 && (
                            <button className="show-more-button" onClick={() => {
                                setShowMoreAlternativeNames(!showMoreAlternativeNames)
                                if(!showMoreAlternativeNames) setShowLimitAlternativeNames(100)
                                else setShowLimitAlternativeNames(10)
                                }}>
                                {showMoreAlternativeNames ? "Show Less" : "Show More"}
                            </button>
                             )}
                        </div>
                        <h4>Keywords</h4>
                        <div className="keyword-container">
                            {visibleKeywords.map((keyword, index) => (
                            <div key={index} className='keyword-button-container'>
                                <a className="keyword-button" href={`/games/search?search_param=Keywords&search_param_name=${keyword.name}&query_param=keywords_id&param_id=${keyword.id}`}>{keyword.name}</a>
                            </div>
                            ))}
                            {keywords.length > 10 && (
                            <button className="show-more-button" onClick={() => {
                                setShowMoreKeywords(!showMoreKeywords)
                                if(!showMoreKeywords) setShowLimitKeywords(100)
                                else setShowLimitKeywords(10)
                                }}>
                                {showMoreKeywords ? "Show Less" : "Show More"}
                            </button>
                            )}
                        </div>
                    </div>

                    <div className="similar-game-container">
                        <h4>Similar Games</h4>
                        <div className='similar-game-carousel' style={{maxWidth: 420}}>
                            <Carousel>
                                {game.similar_games_id.map((similarGame, index) => (
                                    <div>
                                        <img src={similarGame.cover} className="cover_art" alt={similarGame.name} />
                                        <a href={`/games/${similarGame.id}`} onClick={() => setRefresh(true)}>
                                            <h3>{similarGame.name}</h3>
                                        </a>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>








                    <h4>Collection</h4>
                    {game.collection_id.map((collection, index) => (
                        <div key={index}>
                            <body>{collection.name}</body>
                        </div>
                        ))}

                    <h4>DLCS</h4>
                    <body>{game.dlcs_id}</body>



                    <h4>Game Modes</h4>
                    {game.game_modes_id.map((game_mode, index) => (
                        <div key={index}>
                            <a href={`/games/search?search_param=Game Mode&search_param_name=${game_mode.name}&query_param=game_modes_id&param_id=${game_mode._id}`}>{game_mode.name}</a>
                        </div>
                        ))}

                    <h4>Genres</h4>
                    {game.genres_id.map((genre, index) => (
                        <div key={index}>
                            <a href={`/games/search?search_param=Genres&search_param_name=${genre.name}&query_param=genres_id&param_id=${genre._id}`}>{genre.name}</a>
                        </div>
                        ))}

                    <h4>Involved Companies</h4>
                    {game.involved_companies_id.map((company, index) => (
                        <div key={index}>
                            <h5>{company.name}</h5>
                            <img  src={company.logo} className="company-logo" />
                        </div>
                        ))}




                    <h4>Platforms</h4>
                    {game.platforms_id.map((platform, index) => (
                        <div key={index}>
                            <body>{platform.name}</body>
                        </div>
                        ))}

                    <h4>Player Perspectives</h4>
                    {game.player_perspectives_id.map((perspective, index) => (
                        <div key={index}>
                            <body>{perspective.name}</body>
                        </div>
                        ))}

                    <h4>Ports</h4>
                    <body>{game.ports_id}</body>

                    <h4>Remakes</h4>
                    <body>{game.remakes_id}</body>

                    <h4>Remasters</h4>
                    <body>{game.remasters_id}</body>

                    <h4>Storyline</h4>
                    <body>{game.storyline}</body>

                    <h4>Status</h4>
                    <body>{game.status}</body>

                    {/* <h4>Screenshots</h4>
                    <div style={{display: "flex", flexWrap: "nowrap", overflowX: "scroll"}}>
                    {game.screenshots.map((screenshot, index) => (
                        <img src={screenshot} key={index} className="img-fluid" style={{height: "288px", width: "512px"}}/>
                    ))}
                    </div> */}

                    <h4>Themes</h4>
                    {game.themes_id.map((theme, index) => (
                        <div key={index}>
                            <body>{theme.name}</body>
                        </div>
                        ))}

                    <h4>Total Rating Count</h4>
                    <body>{game.total_rating_count}</body>

                    <h4>Version Parent</h4>
                    <body>{game.version_parent_id}</body>

                    <h4>Version Title</h4>
                    <body>{game.version_title}</body>
                </div>




    );})}
    </div>
    </div>
  );
}

export default GameDetail;
