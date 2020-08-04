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

import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';

import Nav from '../components/nav';
import DayTemplate from '../templates/timetableDay';
import TimeTableController from '../controllers/timetableController';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      reloadTable: null,
      redirect: null,
      periodLenght: 30,
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {}
    };
  }

  componentDidMount () {
    this.isUserRegistered();
    this.setDaysInTimetable();
    console.log('createTimetable' + sessionStorage.getItem('userId'));
  }

  isUserRegistered () {
    if (sessionStorage.getItem('isUserRegistered') === 'false') {
      this.setState({ redirect: '/crear-perfil' });
    }
  }

  async setDaysInTimetable () {
    const weekDays = await TimeTableController.queryTimetable();
    if (weekDays) {
      $('#mondayRow').text(weekDays.monday);
      $('#tuesdayRow').text(weekDays.tuesday);
      $('#wednesdayRow').text(weekDays.wednesday);
      $('#thursdayRow').text(weekDays.thursday);
      $('#fridayRow').text(weekDays.friday);
    }
  }

  render () {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    if (this.state.reloadTable) {
      console.log(this.state.reloadTable);
      this.setDaysInTimetable();
      this.setState({ reloadTable: false });
    }
    return (
      <div>
        <Nav />
        <div className='container'>
          <div className='row my-5 mx-auto table-responsive-sm'>
            <table className='table table-bordered table-striped'>
              <thead>
                <tr>
                  <th scope='col'>Lunes</th>
                  <th scope='col'>Martes</th>
                  <th scope='col'>Miércoles</th>
                  <th scope='col'>Jueves</th>
                  <th scope='col'>Viernes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td id='mondayRow' />
                  <td id='tuesdayRow' />
                  <td id='wednesdayRow' />
                  <td id='thursdayRow' />
                  <td id='fridayRow' />
                </tr>
              </tbody>
            </table>
          </div>

          <DayTemplate
            dayName='Lunes'
            day={this.state.monday}
            handleChangeFrom={async time => {
              this.setState({ monday: await TimeTableController.handleChange(time, 'mondayFrom') });
            }}
            handleChangeTo={async time => {
              this.setState({ monday: await TimeTableController.handleChange(time, 'mondayTo') });
            }}
            myInterval={this.state.periodLenght}
            onClickAddPeriod={async () => {
              await TimeTableController.addPeriod('monday');
              this.setState({ reloadTable: true });
            }}
            onClickEmptyPeriod={async () => {
              await TimeTableController.emptyPeriod('monday');
              this.setState({ reloadTable: true });
            }}
          />

          <DayTemplate
            dayName='Martes'
            day={this.state.tuesday}
            handleChangeFrom={async time => {
              this.setState({ tuesday: await TimeTableController.handleChange(time, 'tuesdayFrom') });
            }}
            handleChangeTo={async time => {
              this.setState({ tuesday: await TimeTableController.handleChange(time, 'tuesdayTo') });
            }}
            myInterval={this.state.periodLenght}
            onClickAddPeriod={async () => {
              await TimeTableController.addPeriod('tuesday');
              this.setState({ reloadTable: true });
            }}
            onClickEmptyPeriod={async () => {
              await TimeTableController.emptyPeriod('tuesday');
              this.setState({ reloadTable: true });
            }}
          />

          <DayTemplate
            dayName='Miércoles'
            day={this.state.wednesday}
            handleChangeFrom={async time => {
              this.setState({ wednesday: await TimeTableController.handleChange(time, 'wednesdayFrom') });
            }}
            handleChangeTo={async time => {
              this.setState({ wednesday: await TimeTableController.handleChange(time, 'wednesdayTo') });
            }}
            myInterval={this.state.periodLenght}
            onClickAddPeriod={async () => {
              await TimeTableController.addPeriod('wednesday');
              this.setState({ reloadTable: true });
            }}
            onClickEmptyPeriod={async () => {
              await TimeTableController.emptyPeriod('wednesday');
              this.setState({ reloadTable: true });
            }}
          />

          <DayTemplate
            dayName='Jueves'
            day={this.state.thursday}
            handleChangeFrom={async time => {
              this.setState({ thursday: await TimeTableController.handleChange(time, 'thursdayFrom') });
            }}
            handleChangeTo={async time => {
              this.setState({ thursday: await TimeTableController.handleChange(time, 'thursdayTo') });
            }}
            myInterval={this.state.periodLenght}
            onClickAddPeriod={async () => {
              await TimeTableController.addPeriod('thursday');
              this.setState({ reloadTable: true });
            }}
            onClickEmptyPeriod={async () => {
              await TimeTableController.emptyPeriod('thursday');
              this.setState({ reloadTable: true });
            }}
          />

          <DayTemplate
            dayName='Viernes'
            day={this.state.friday}
            handleChangeFrom={async time => {
              this.setState({ friday: await TimeTableController.handleChange(time, 'fridayFrom') });
            }}
            handleChangeTo={async time => {
              this.setState({ friday: await TimeTableController.handleChange(time, 'fridayTo') });
            }}
            myInterval={this.state.periodLenght}
            onClickAddPeriod={async () => {
              await TimeTableController.addPeriod('friday');
              this.setState({ reloadTable: true });
            }}
            onClickEmptyPeriod={async () => {
              await TimeTableController.emptyPeriod('friday');
              this.setState({ reloadTable: true });
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
