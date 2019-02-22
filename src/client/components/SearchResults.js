import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Calendar, CalendarControls } from 'react-yearly-calendar';
import moment from 'moment';
import './SearchResults.scss';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2019,
      pickedDate: '',
    };
    this.handleCalendarClick = this.handleCalendarClick.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.onPrevYear = this.onPrevYear.bind(this);
    this.onNextYear = this.onNextYear.bind(this);
  }

  componentDidMount() {
    const {
      onInit,
      match: { params }
    } = this.props;

    console.log('여기는 서치리져트', params.url);
    onInit(params.url);
  }

  handleCalendarClick(pickedDate, formattedDates) {
    if (formattedDates.includes(moment(pickedDate).format('YYYY-MM-DD'))) {
      this.setState({
        pickedDate
      });
    }
  }

  handleModalClick(ev) {
    if (
      ev.target.classList.contains('SearchResults__modal') ||
      ev.target.classList.contains('SearchResults__modal__close')
    ) {
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
    const { history, match: { params } } = this.props;

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
      console.log(formattedPickDate, formattedDates);

      if (date === formattedPickDate) {
        const archiveTime = datesOfArchives[index].date;
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
    const { year, pickedDate } = this.state;
    const { requestUrl, datesOfArchives } = this.props;

    const formattedDates = datesOfArchives.map((archive) => {
      return moment(archive.date).format('YYYY-MM-DD');
    });

    const customCSSclasses = {
      datesOfArchives: formattedDates
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
          <h2>Click the date you want </h2>
          {requestUrl &&
            (datesOfArchives.length ? (
              <Fragment>
                <CalendarControls
                  year={year}
                  onPrevYear={this.onPrevYear}
                  onNextYear={this.onNextYear}
                />
                <Calendar
                  year={year}
                  onPickDate={ev => this.handleCalendarClick(ev, formattedDates)}
                  customClasses={customCSSclasses}
                />
              </Fragment>
            ) : (
              <Fragment>
                <div className="SearchResults__contents__empty">
                  <h2 className="SearchResults__contents__empty__title">
                    There is no archive for&nbsp;
                    <span>{requestUrl}</span>
                  </h2>
                  <span>Do your want to register this page?</span>
                  <input
                    type="button"
                    value="register"
                    className="SearchResults__contents__empty__register"
                    onClick={this.handleRegisterClick}
                  />
                </div>
              </Fragment>
            ))}
          {!requestUrl && <div>Loading</div>}
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
                className="SearchResults__modal__close"
                type="button"
                value="&#10005;"
                onClick={this.handleModalClick}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(SearchResults);
