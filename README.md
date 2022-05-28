# React Template

This is the sample react file structure template for myself. It contains some code for me to refer when needed. It is hosted under https://react.shyechern.com/. Feel free to look into it.

[Changelog](CHANGELOG.md)

## Sample code including but not limited to the following package

- React Router
- Material Table & React Table
- Axios
- React Chartjs 2 (with zoom plugin)
- React Hook Form

## Project Information

This project was created using [Create React App](https://create-react-app.dev/) with the css template [Creative Tim Demo](https://demos.creative-tim.com/light-bootstrap-dashboard-react/?_ga=2.235697025.1894030771.1619926308-1426218325.1619926308#/documentation/getting-started)

## Installation

1. Clone this repo
2. Run npm install
3. Update .env variables _(use localhost instead of 127.0.0.1 for cookie testing)_
4. Run npm start

**_To create a production bundle, run `npm run build`_**\
**_To run production in local, run `serve -s build` and `npm install -g serve` if you don't have serve_**

## Running in Docker

1. Create a file named docker-compose.yml and by following the format in docker-compose.yml.example
2. Run **docker-compose --env-file .env.production up** (Specify your .env file)

## Todo

- `show alert before cookie timeout`

Feel free to contact me at chern-97@hotmail.com
