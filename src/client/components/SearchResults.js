import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import {Calendar, CalendarControls} from 'react-yearly-calendar';
import moment from 'moment';
import './SearchResults.scss';


export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2019,
      pickedDate: '',
      pickedTime: ''
    };
    this.handleCalendarClick = this.handleCalendarClick.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
    this.onPrevYear = this.onPrevYear.bind(this);
    this.onNextYear = this.onNextYear.bind(this);
  }

  componentDidMount() {
    const { onInit, match: { params } } = this.props;

    console.log('여기는 서치리져트', params.url);
    onInit(params.url);
  }

  handleCalendarClick(pickedDate) {
    console.log(moment(pickedDate).format('YYYY-MM-DD'));

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

  handleTimeClick(pickedTime) {
    this.setState({
      pickedTime
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

  renderDatesOfArchive(formattedDates) {
    const { pickedDate } = this.state;
    const { datesOfArchives } = this.props;

    return formattedDates.map((date, index) => {
      const formattedPickDate = moment(pickedDate).format('YYYY-MM-DD');
      console.log(formattedPickDate, formattedDates);

      if (date === formattedPickDate) {
        const archiveTime = datesOfArchives[index].date;
        const formattedArchiveTime = moment(archiveTime).format('lll');

        return (
          <li key={formattedArchiveTime} onClick={this.handleTimeClick.bind(this, archiveTime)}>
            {formattedArchiveTime}
          </li>
        );
      }
    });
  }

  render() {
    const { year, pickedDate, pickedTime } = this.state;
    const { match: { params }, requestUrl, datesOfArchives } = this.props;

    const formattedDates = datesOfArchives.map((archive) => {
      return moment(archive.date).format('YYYY-MM-DD');
      // 2018-04-25
    });

    const customCSSclasses = {
      datesOfArchives: formattedDates,
    };

    if (pickedTime) {
      return <Redirect to={`/web/${params.url}/${pickedTime}`} />;
    }

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
        {pickedDate && (
          <div className="SearchResults__modal" onClick={this.handleModalClick}>
            <div className="SearchResults__modal__box">
              <div className="SearchResults__modal__box__title">
                <span>Select Archive</span>
              </div>
              <ul className="SearchResults__modal__box__list">
                {this.renderDatesOfArchive(formattedDates)}
              </ul>
              <button className="SearchResults__modal__close" type="button" onClick={this.handleModalClick}>&#10005;</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
