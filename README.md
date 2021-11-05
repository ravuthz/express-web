# Express Web

Express boilerplate application using [express-generator](https://expressjs.com/en/starter/generator.html) and [sequlize](https://sequelize.org/)


## Project:
```bash
git clone https://github.com/ravuthz/express-web.git project_name
node ./bin/rename project_name
git remove remote origin
git remote add https://github.com/ravuthz/project_name.git
git add .
git commit -m "Clone and update project name"
cp sample.env .env
```


## Database support:
- sqlite
- postgresql


## Start to develop


Install dependencies
```bash
yarn install
yarn dev
```


Generate models:
```bash
yarn sequelize-cli model:generate --name User --attributes name:type,...
```


Generate seeders:
```bash
yarn sequelize-cli seed:generate --name users
```


Migrate data
```bash
yarn sequelize-cli db:migrate
```


Seed data
```bash
yarn sequelize-cli db:seed:all
``` 

Testing
```bash
yarn test
````