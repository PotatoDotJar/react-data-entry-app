# react-data-entry-app
A full stack web application used by my girlfriend to easily log data used in her statistics class. The front end is written in React + Axios and the backend uses an Express, Node JS, and MySQL stack.


### To use to app:
1. Clone the repo.
2. Run `npm i` in the `api/` directory and the `react-app/` directory.
3. In the `react-app/` directory, run `npm run build`.
4. Adjust the mysql settings in `api/config/db.config.js` to point to a local mysql server.
5. On the mysql server, create a database and a table. The scripts for creating the database and table are down below.
6. In the `api/` directory run `node server.js`.
7. Navigate to http://localhost:3001.


### MySQL schema create script:
```mysql
CREATE DATABASE `statistics-data-entry-dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
```

### MySQL table create script:
```mysql
CREATE TABLE `statistics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `isWorkDay` tinyint NOT NULL,
  `wakeUpDateTime` datetime NOT NULL,
  `entryDateTime` datetime NOT NULL,
  `notes` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```
