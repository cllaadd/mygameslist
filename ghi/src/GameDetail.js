import { useEffect, useState } from "react";
import { useToken } from "./Auth";
import { useParams, Link } from "react-router-dom";
import './GameDetail.css';

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
    const [showMore, setShowMore] = useState(false);
    const [rating, setRating] = useState(false);
    const {id} = useParams()


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
        } else {
            console.log('Error')
        }
    }
    loadData()
}, [id, refresh, rating])
  return (
    <div>
    <div className="main-body">
        {games?.map(game => {
            return (
                <div>
                    <div className="game-header-container">
                        <div className="game-cover-container">
                                <img className="game-cover" src={game.cover}/>
                        </div>
                        <div className="game-name-container">
                            <div className="game-name">
                                <h1 key={game.id}>{game.name}</h1>
                                <h4>Released {game.first_release_date}</h4>
                            </div>
                        </div>
                        <div className="game-important-details">
                            <div className="game-about-container">
                                <div className="game-about">
                                    <p>
                                        <span>Genres: </span>
                                        {game.genres_id.map((genre, index) => (
                                        <a>{genre.name}</a>))}
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


                    <h4>Alternative Names</h4>
                    {Object.values(game.alternative_names).slice(0, showMore ? undefined : 5).join(', ')}
                    {Object.values(game.alternative_names).length > 5 && (
                        <button onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'Show Less' : 'Show More'}
                        </button>
                    )}
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
                            <body>{franchise.name}</body>
                        </div>
                        ))}
                    <h4>Game Modes</h4>
                    {game.game_modes_id.map((game_mode, index) => (
                        <div key={index}>
                            <body>{game_mode.name}</body>
                        </div>
                        ))}
                    <h4>Genres</h4>
                    {game.genres_id.map((genre, index) => (
                        <div key={index}>
                            <body>{genre.name}</body>
                        </div>
                        ))}
                    <h4>Involved Companies</h4>
                    {game.involved_companies_id.map((company, index) => (
                        <div key={index}>
                            <h5>{company.name}</h5>
                            <img src={company.logo} className="img-responsive logo_med logo_med" />
                        </div>
                        ))}
                    <h4>Keywords</h4>
                    <body>
                        {Object.values(game.keywords_id).slice(0, showMore ? undefined : 10).join(', ')}
                    </body>
                        <button onClick={() => setShowMore(!showMore)}>
                    {showMore ? 'Show Less' : 'Show More'}
                    </button>
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
                    <h4>Similar Games</h4>
                    <table>
                    <tbody>
                        {game.similar_games_id.map((similarGame, index) => (
                        <tr key={index}>
                            <td><img src={similarGame.cover} className="img-fluid" style={{width: '132px', height: '187px'}}/></td>
                            <td>
                            <Link to={`/games/${similarGame.id}`} onClick={() => setRefresh(true)}>
                                <h3>{similarGame.name}</h3>
                            </Link>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                    <h4>Summary</h4>
                    <body>{game.summary}</body>
                    <h4>Storyline</h4>
                    <body>{game.storyline}</body>
                    <h4>Status</h4>
                    <body>{game.status}</body>
                    <h4>Screenshots</h4>
                    <div style={{display: "flex", flexWrap: "nowrap", overflowX: "scroll"}}>
                    {game.screenshots.map((screenshot, index) => (
                        <img src={screenshot} key={index} className="img-fluid" style={{height: "288px", width: "512px"}}/>
                    ))}
                    </div>
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

            );
        })}
    </div>

    </div>
  );
}

export default GameDetail;

// const GameDetail = (props) => {
//   const [rating, setRating] = useState(0);

//   useEffect(() => {
//     setRating(props.game.total_rating);
//   }, [props.game]);

//   const { id } = useParams();
//   const [game, setGame] = useState([]);
//   useEffect(() => {
//     const loadData = async () => {
//       const url = `http://localhost:8000/games/${id}`;
//       const response = await fetch(url);

//       if (response.ok) {
//         const data = await response.json();
//         setGame(data);
//       } else {
//         console.log("Error");
//       }
//     };
//     loadData();
//   }, [id]);

//   return (
//     <div>
//       {game ? (
//         <div>
//           <h1 key={game.id}>{game.name}</h1>
//           <div className="rating-circle" style={{ "--rating": rating }}>
//             <span className="rating-number">{game.total_rating}</span>
//             <svg className="rating-fill">
//               <circle
//                 cx="50"
//                 cy="50"
//                 r="40"
//                 stroke="#00ff00"
//                 stroke-width="5"
//                 fill="white"
//                 strokeDasharray={`${rating} ${100 - rating}`}
//               />
//             </svg>
//           </div>
//           {/* the rest of the component */}
//         </div>
//       ) : (
//         <div>Loading...</div>
//       )}
//     </div>
//   );
// };

// export default GameDetail;
