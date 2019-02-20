import React, { Component, Fragment } from 'react';
import './SearchResults.scss';
import {Calendar, CalendarControls} from 'react-yearly-calendar';
import moment from 'moment';

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2019,
      date: moment()
    };
    this.onChange = this.onChange.bind(this);
    this.onPrevYear = this.onPrevYear.bind(this);
    this.onNextYear = this.onNextYear.bind(this);
  }

  componentDidMount() {
  }

  onChange(date) {
    console.log(date);
    this.setState({
      date
    });
  }

  onPrevYear(ev) {
    const { year } = this.state;

    this.setState({
      year: year - 1
    });
  }

  onNextYear(ev) {
    const { year } = this.state;

    this.setState({
      year: year + 1
    });
  }

  render() {
    const { date, year } = this.state;
    const { match } = this.props;
    console.log(match);

    const customCSSclasses = {
      archives: [
        '2018-04-25',
        '2018-05-01',
        '2018-06-02',
        '2018-08-15',
        '2018-11-01'
      ]
    };

    return (
      <div className="SearchResults">
        <div className="SearchResults__result">
          <span>url</span>
          <span>snapshot</span>
        </div>
        <div className="SearchResults__contents">
          <CalendarControls
            year={year}
            onPrevYear={this.onPrevYear}
            onNextYear={this.onNextYear}
          />
          <Calendar
            year={year}
            selectedDay={date}
            onPickDate={this.onChange}
            customClasses={customCSSclasses}
          />,
        </div>
      </div>
    );
  }
}
