# react.nodejs_starter
This repo is a starter kit that sets up front-end and back-end of a simple react and node app. This app's backend after auth connects with surrealdb and adds random users data to surrealdb as many times as we start the server . Front-end after auth connects with surrealdb then fetches the data from the surreal-db and displays in the UI. Just like a simple publish-subscribe model.
# steps to initialize the starter kit :
1. install surreal from the official page's documentation
2. start the surreal server using command : surreal.exe start memory -A --auth --user root --pass root
3. clone the repository and setup back-end and front-end seperately .
4. get into the front-end folder and type npm install & same for backend this will install all the dependencies .
5. now type npm run dev in the front-end and node app.js in the backend and the terminals will look something like this :

   front-end terminal:
   <img width="218" alt="front-end terminal" src="https://github.com/MSaiKiran9/react.nodejs_starter/assets/116418856/f3373ab4-513c-41a6-8c6c-137303405a27">

  back-end terminal:
<img width="437" alt="image" src="https://github.com/MSaiKiran9/react.nodejs_starter/assets/116418856/e615d44b-a2d3-41a7-befc-bcb3ff621bf0">

6. In the browser now go to http://localhost:5173/ where the vite is serving the front-end's webpage the ui will look something like this :
   <img width="614" alt="Ui" src="https://github.com/MSaiKiran9/react.nodejs_starter/assets/116418856/aec8e67c-1517-4779-a1ed-220f751cebc2">

#From Here:
1. This as a base point we can implement client - server model & so on with surreal db as database .
----> Any issues ?
   Feel free to raise the issue and contribute :)
