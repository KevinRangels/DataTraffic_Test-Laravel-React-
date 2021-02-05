import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { CharacterScreen } from '../components/characters/CharacterScreen';
import { CharactersScreen } from '../components/characters/CharactersScreen'
import { DashboardScreen } from '../components/dashboard/DashboardScreen'
import { EpisodeScreen } from '../components/episodes/EpisodeScreen';
import { EpisodesScreen } from '../components/episodes/EpisodesScreen'
import { LocationScreen } from '../components/locations/LocationScreen';
import { LocationsScreen } from '../components/locations/LocationsScreen'
import { NavBar } from '../components/ui/NavBar';

export const AppRouter = () => {
    return (
        <div className="app__main">
          <Router>
            <NavBar/>
            <div className="app__content">
              <Switch>
                <Route exact path="/" component={DashboardScreen} />
                <Route exact path="/characters" component={CharactersScreen} />
                <Route exact path="/character/:id" component={CharacterScreen} />
                <Route exact path="/locations" component={LocationsScreen} />
                <Route exact path="/location/:id" component={LocationScreen} />
                <Route exact path="/episodes" component={EpisodesScreen} />
                <Route exact path="/episode/:id" component={EpisodeScreen} />
                <Redirect to="/" />
              </Switch>
            </div>
          </Router>
        </div>
    )
}
