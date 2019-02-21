import React, { Component, Fragment } from 'react';
import './SearchResults.scss';
import {Calendar, CalendarControls} from 'react-yearly-calendar';
import moment from 'moment';

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2019,
      pickedDate: ''
    };
    this.handleCalendarClick = this.handleCalendarClick.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
    this.onPrevYear = this.onPrevYear.bind(this);
    this.onNextYear = this.onNextYear.bind(this);
  }

  componentDidMount() {
    const { onInit, match: { params } } = this.props;

    console.log('여기는 서치리져트', params.url)
    onInit(params.url);
  }

  handleCalendarClick(pickedDate) {
    console.log(pickedDate);

    this.setState({
      pickedDate
    });
  }

  handleModalClick(ev) {
    if (ev.target.classList.contains('SearchResults__modal') ||
        ev.target.classList.contains('SearchResults__modal__close')) {
      this.setState({
        pickedDate: ''
      });
    }
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

  renderDatesOfArchive() {
    return (
      <Fragment>
        <li>
          {`${moment()}`}
        </li>
        <li>
          {`${moment()}`}
        </li>
      </Fragment>
    );
  }

  render() {
    const { pickedDate, year } = this.state;
    const { requestUrl, datesOfArchives } = this.props;

    const formattedDates = datesOfArchives.map((archive) => {
      return moment(archive.date).format('YYYY-MM-DD');
      // 2018-04-25
    });

    const customCSSclasses = {
      datesOfArchives: formattedDates,
    };

    return (
      <div className="SearchResults">
        <div className="SearchResults__result">
          <span>{requestUrl}</span>
          saved
          <span>{datesOfArchives.length}</span>
          times
        </div>
        <div className="SearchResults__contents">
          {requestUrl && (datesOfArchives.length ? (
            <Fragment>
              <CalendarControls
                year={year}
                onPrevYear={this.onPrevYear}
                onNextYear={this.onNextYear}
              />
              <Calendar
                year={year}
                selectedDay={pickedDate || moment()}
                onPickDate={this.handleCalendarClick}
                customClasses={customCSSclasses}
              />
            </Fragment>
          ) : (
            <Fragment>
              <div>
                <span>
                  {requestUrl}없어유, 등록하실래유?
                </span>
              </div>
            </Fragment>
          ))}
          {!requestUrl && (<div>Loading</div>)}
        </div>
        {!pickedDate && (
          <div className="SearchResults__modal" onClick={this.handleModalClick}>
            <div className="SearchResults__modal__box">
              <div className="SearchResults__modal__box__title">
                <span>select archive</span>
              </div>
              <ul className="SearchResults__modal__box__list">
                {this.renderDatesOfArchive()}
              </ul>
              <button className="SearchResults__modal__close" type="button" onClick={this.handleModalClick}>&#10005;</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
