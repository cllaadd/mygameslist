import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function GameCards() {
  const [games, setGames] = useState([]);

  const getGameData = async () => {
    // const gamesUrl = 'http://localhost:8000/api/games/'
    // const fetchConfig = {query:{"limit": limit, "offset": offset}}
    const response = await fetch('http://localhost:8000/games/')
    const gameData = await response.json()
    setGames(gameData.games)
}

    useEffect(() => {
        getGameData();
    }, []
    )

  return (
    <div>
      {games.map((game) => (
      <Card style={{ width: '18rem' }} key={game.id} >
      <Card.Img variant="top" src={game.cover} />
      <Card.Body>
        <Card.Title>{game.name}</Card.Title>
        <Card.Text>
         {game.genre}
        </Card.Text>
        <Button variant="primary">See more</Button>
      </Card.Body>
    </Card>

      ))}
    </div>
  );
}

export default GameCards;


// const MovieCard = (props) => {
//   const { path } = useRouteMatch();

//   const { poster_path, title, vote_average, id } = props.movie;


//   const imageURL = `https://image.tmdb.org/t/p/w780${poster_path}`;



//   return (
//     <CardContainer>
//       <StyledImg
//         src={poster_path ? imageURL : AltPoster}
//         onClick={() => props.handleMovieClick(id, path)}
//         alt={`${title} cover`}
//       />
//       {/* {props.removeMode && (
//         <RemoveFavoriteButton
//           onClick={() => props.removeFavorite(props.movie)}
//         />
//       )} */}
//     </CardContainer>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     removeMode: state.favorites.removeMode,
//   };
// };

// export default connect(mapStateToProps, { handleMovieClick, removeFavorite })(
//   MovieCard
// );
