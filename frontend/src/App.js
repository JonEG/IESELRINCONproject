/*
 *  Copyright (C) 2020 ThePringaos
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published
 *  by the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CreateProfile from './modules/createProfile';
import EditProfile from './modules/editProfile';
import Signin from './modules/signin';
import CreateTimeTable from './modules/createTimetable';
import ShowDates from './modules/showDates';
import { ProtectedRoute } from './modules/protected.route';

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <div className='App'>
          <Switch>
            <ProtectedRoute exact path='/crear-perfil' component={CreateProfile} />
            <ProtectedRoute exact path='/editar-perfil' component={EditProfile} />
            <ProtectedRoute exact path='/definir-horario' component={CreateTimeTable} />
            <ProtectedRoute exact path='/' component={ShowDates} />

            <Route exact path='/signin' component={Signin} />
            <Route path='*' component={() => '404 NOT FOUND'} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
