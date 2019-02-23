import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Calendar, CalendarControls } from 'react-yearly-calendar';
import moment from 'moment';
import './SearchResults.scss';
import Loader from './Loader';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2019,
      pickedDate: ''
    };
    this.handleCalendarClick = this.handleCalendarClick.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.onPrevYear = this.onPrevYear.bind(this);
    this.onNextYear = this.onNextYear.bind(this);
  }

  componentDidMount() {
    const { match: { params }, onInit } = this.props;

    onInit(params.url);
  }

  componentDidUpdate() {
    const { archivedDate, history, registeredUrl } = this.props;

    if (registeredUrl) {
      setTimeout(() => {
        history.push(`/web/${registeredUrl}/${archivedDate}`);
      }, 3000);
    }
  }

  handleCalendarClick(pickedDate, formattedDates) {
    if (formattedDates.includes(moment(pickedDate).format('YYYY-MM-DD'))) {
      this.setState({
        pickedDate
      });
    }
  }

  handleModalClick(ev) {
    if (ev.target.classList.contains('SearchResults__modal') ||
        ev.target.classList.contains('SearchResults__modal__close')) {
      this.setState({
        pickedDate: ''
      });
    }
  }

  handleRegisterClick(ev) {
    const { onRegisterClick, requestUrl } = this.props;

    onRegisterClick(requestUrl);
  }

  handleTimeClick(pickedTime) {
    const { match: { params }, history } = this.props;

    history.push(`/web/${params.url}/${pickedTime}`);
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

      if (date === formattedPickDate) {
        const archiveTime = datesOfArchives[index];
        const formattedArchiveTime = moment(archiveTime).format('lll');

        return (
          <li
            key={formattedArchiveTime}
            onClick={this.handleTimeClick.bind(this, archiveTime)}
          >
            {formattedArchiveTime}
          </li>
        );
      }
    });
  }

  render() {
    const { pickedDate, year } = this.state;
    const {
      datesOfArchives,
      isValidUrl,
      loading,
      registeredUrl,
      requestUrl
    } = this.props;

    const formattedDates = datesOfArchives.map((date) => {
      return moment(date).format('YYYY-MM-DD');
    });

    const customCSSclasses = {
      datesOfArchives: formattedDates
    };

    return (
      <div className="SearchResults">
        <div className="SearchResults__result">
          <span>{requestUrl}</span>
          saved
          <span>{formattedDates.length}</span>
          times
        </div>
        <div className="SearchResults__contents">
          {!requestUrl && <span className="SearchResults__contents__loading">Loading...</span>}
          {requestUrl &&
            isValidUrl &&
            (formattedDates.length ? (
              <Fragment>
                <h2 className="SearchResults__contents__info">
                  Click the date of archive you want to take out from our library
                </h2>
                <CalendarControls
                  year={year}
                  onPrevYear={this.onPrevYear}
                  onNextYear={this.onNextYear}
                />
                <div className="SearchResults__contents__table">
                  <Calendar
                    year={year}
                    customClasses={customCSSclasses}
                    onPickDate={ev => this.handleCalendarClick(ev, formattedDates)}
                  />
                </div>
              </Fragment>
            ) : (
              <div className="SearchResults__contents__empty">
                {!registeredUrl ? (
                  <Fragment>
                    <h2 className="SearchResults__contents__empty__title">
                      There is no archive for
                      <br />
                      <span>{requestUrl}</span>
                    </h2>
                    <p>Do your want to register this page?</p>
                    <input
                      type="button"
                      value="register"
                      className="SearchResults__contents__empty__register"
                      onClick={this.handleRegisterClick}
                    />
                  </Fragment>
                ) : (
                  <Fragment>
                    <h2 className="SearchResults__contents__empty__title">
                      Yeah~! We just register and archive
                      <br />
                      <span>{registeredUrl}</span>
                    </h2>
                    <p>Go to the page we just saved, after 5 seconds...</p>
                  </Fragment>
                )}
              </div>
            ))}
          {requestUrl && !isValidUrl && (
            <Fragment>
              <h2 className="SearchResults__contents__invalid__title">
                This URL is invalid.
                <br />
                <span>{requestUrl}</span>
              </h2>
              <p>Please check URL</p>
            </Fragment>
          )}
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
              <input
                type="button"
                value="&#10005;"
                className="SearchResults__modal__close"
                onClick={this.handleModalClick}
              />
            </div>
          </div>
        )}
        {loading && <Loader />}
      </div>
    );
  }
}

export default withRouter(SearchResults);
