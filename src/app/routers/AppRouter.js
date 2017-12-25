import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from '../components/Header';
import MainPage from '../components/MainPage';
import ForecastPage from '../components/ForecastPage';
import AboutPage from '../components/AboutPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header/>
            <Switch>
                <Route path="/" component={MainPage} exact />
                <Route path="/forecast" component={ForecastPage} />
                <Route path="/about" component={AboutPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;

