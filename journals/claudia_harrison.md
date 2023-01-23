12/19/2022

We decided to make a website that keeps tracks of games you've played or want to play, simialr to My Anime List. For our primary models, were going to make a User, List, and Game model, with the game data imported from an outside API. For stretch goals, we we are also eventually considering making a Review or Follower model. We also made a render.com account. Garret found a way to get our game data from igdb.com as well as price data from arethereanydeals.com.  We can pull images, genre, and suggested games. Instructors approved our models and suggested us to work on the core three for now.


12/20/2022

Started on the wireframes for the site and decided on color scheme and logo. The log will be a little green controller and we chose the color scheme from those colros. We are also thinking of makeing the background a randomized game screenshot or something like that.

12/21/2022

Finished the wireframes and decided what we want the nav bar, main page and various views to look like. Also added success and fail pages for various actions and what pages the user will be redirected to. Used the logo and color scheme we selected yesterday.

12/22/2022

Presented wireframes to instructors. Got advice on color palette. Discussed how to split up project work. Do we all want to work on a part of the backend? Should we do one model per team member. We all want to be familiar with FastAPI and MongoDB so we are thinking we should all have some responsibility for the backend.

1/03/2023

Presented our project idea to the class. Began thinking about routers. Added missing wireframe for creating a list. Discussed whether we wanted to add a reviews or followers model and whether we could do user avatars. Cloned the project base code down and creatred GitLab group for our team.

1/04/2023

Talked to Dalonte about the benefits and drawbacks of SQL vs non SQL databases. Began building containers for the database and fastapi backend. Got early version of game model working. Started on user model and authentication.

1/05/2023

Finished user model. Game model will need to draw from the igdb api so we worked on that. Next is games list model and that will complete our three basic models.

1/09/2023

Found some bugs in the user model with authentication that we resolved. Started the list model, deciding that a user must be logged in to create a list and setting the crteate view for lists such that it will grab the account_id from the logged in user and associate it with that list.

1/10/2023
Started list model which we called MGL to avoid confusion. I was able to make the create view the way I wanted so that it only works for a logged in user. I made the get view such that it gets the lists only for that logged in user as well.

1/11/2023
Still working on list model and running into some difficulties with adding a game to a list. Was able to do the delete view for the list but not an update view for just the name and description. Will probably want a separate update view for add game to list. I'm having trouble finding examples of someone adding a document from another collection into a field of a document of another collection.

1/12/2023
Garrett was able to get over 2000 games into our database by scraping them with igdb. Brian and I helped experiment with regex to grab just the titles from the top 500 games rather than the list numbers and years. Worked on list views and how to add and remove games from a list.


1/13/2023
Finished up backend and started thinking about how we want our fornt end to look, using the wireframes for reference. We are thinking of ammending our account model to include a boolean field for public vs private accounts so that if a user doesn't want their lists or profile to be seen by others, they can set it as private. We're also considering making a company detail page that the game detail page links to. The first thing we need to get working is the search bar for the games database.

1/18/2023
Worked on front end authentication and completed login/logout pages. Still having issues iwht sign up. Figured out how to check whether a user was logged in or not by looking at the storage and checking whether a token was cached.

1/19
