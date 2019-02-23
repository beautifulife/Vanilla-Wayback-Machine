import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Archive.scss';
import Loader from './Loader';

class Archive extends Component {
  componentDidMount() {
    const { match: { params }, onInit} = this.props;

    onInit(params.url, params.moment);
  }

  findSiblingDate(direction) {
    const { match: { params }, datesOfArchives } = this.props;
    const currentDateIndex = datesOfArchives.indexOf(params.moment);

    if (direction === 'previous') {
      return datesOfArchives[currentDateIndex - 1];
    }

    return datesOfArchives[currentDateIndex + 1];
  }

  handleClick(date, ev) {
    const { match: { params }, history, onInit } = this.props;

    if (date) {
      history.push(`/web/${params.url}/${date}`);
      onInit(params.url, date);
    }
  }

  render() {
    const { match: { params }, loading, pageSource, requestUrl } = this.props;
    const formattedDate = moment(params.moment).format('lll');
    const previousDate = this.findSiblingDate('previous');
    const nextDate = this.findSiblingDate('next');

    return (
      <div className="Archive">
        <div className="Archive__controller">
          <h2 className="Archive__controller__title">{requestUrl}</h2>
          <input
            type="button"
            value="&#10140;"
            className={
              previousDate
                ? 'Archive__controller__previous active'
                : 'Archive__controller__previous'
            }
            onClick={this.handleClick.bind(this, previousDate)}
          />
          <span className="Archive__controller__date">{formattedDate}</span>
          <input
            type="button"
            value="&#10140;"
            className={
              nextDate
                ? 'Archive__controller__next active'
                : 'Archive__controller__next'
            }
            onClick={this.handleClick.bind(this, nextDate)}
          />
          <span className="Archive__controller__info">Controller</span>
        </div>
        {pageSource && (
          <iframe
            className="Archive__iframe"
            srcDoc={pageSource}
            title="archive"
          />
        )}
        {loading && <Loader />}
      </div>
    );
  }
}

Archive.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  datesOfArchives: PropTypes.instanceOf(Array).isRequired,
  loading: PropTypes.bool.isRequired,
  onInit: PropTypes.func.isRequired,
  pageSource: PropTypes.string.isRequired,
  requestUrl: PropTypes.string.isRequired
};

export default withRouter(Archive);
