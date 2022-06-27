# AniList App
Anime watchlist developed with Next.js using Material-UI and MongoDB.

## Develop
To run the database you need to run:
```bash
docker-compose up -d
```
To set up the enviromental variables rename the file __.env.template__ to __.env__ and make sure that the MONGODB_URL variable looks like:
```
mongodb://localhost:<port>/<service-name>
```
To seed the database make sure the app is running and call the endpoint:
```
localhost:3000/api/seed
```