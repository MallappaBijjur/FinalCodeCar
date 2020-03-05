import React from 'react';
import { useRoutes } from "hookrouter";
import './App.css';
import Home from './components/home/Home';
import CarDetailsPage from './components/car/CarDetails';
import NotFound404 from './components/common/NotFound404';

const routes = {
  "/": () => <Home />,
  "/car/:stockNumber": ({stockNumber}) => <CarDetailsPage stockNumber={stockNumber}/>
};

function App() {
  const routeResult = useRoutes(routes);
  return (
          <div className="App" data-testid="app-main">
            {routeResult || <NotFound404 />}
          </div>
        );
}

export default App;
