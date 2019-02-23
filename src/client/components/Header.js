import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  parseUrl(url) {
    const parser = document.createElement('a');

    parser.href = url;

    return parser.hostname;
  }

  handleChange(ev) {
    this.setState({
      inputValue: ev.currentTarget.value.trim()
    });
  }

  handleClick(ev) {
    const { onLinkClick } = this.props;

    onLinkClick();
  }

  handleSubmit(ev) {
    const { inputValue } = this.state;
    const { history, onSubmit } = this.props;

    ev.preventDefault();

    if (inputValue) {
      const parsedUrl = this.parseUrl(inputValue);

      onSubmit(parsedUrl);
      history.push(`/web/${parsedUrl}`);
    }
  }

  render() {
    const { inputValue } = this.state;
    const { requestUrl } = this.props;

    return (
      <Fragment>
        {requestUrl ? (
          <Fragment>
            <h1 className="Header__title">
              <Link to="/" onClick={this.handleClick}>
                Vanilla_Archive
              </Link>
            </h1>
            <div className="Header__wrapper">
              <form className="Header__form" onSubmit={this.handleSubmit}>
                <input
                  type="url"
                  value={inputValue}
                  placeholder="https://example.com"
                  pattern="(https|http)://.*"
                  className="Header__form__text"
                  onChange={this.handleChange}
                />
                <input
                  type="submit"
                  value="GO"
                  className="Header__form__submit"
                />
              </form>
            </div>
          </Fragment>
        ) : (
          <h1 className="Header__title main">
            <Link to="/" onClick={this.handleClick}>
              Vanilla_Archive
            </Link>
          </h1>
        )}
      </Fragment>
    );
  }
}

Header.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  onLinkClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  requestUrl: PropTypes.string.isRequired
};

export default withRouter(Header);
