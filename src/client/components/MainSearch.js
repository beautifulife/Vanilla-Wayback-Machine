import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './MainSearch.scss';

class MainSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
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

  handleSubmit(ev) {
    const { inputValue } = this.state;
    const { history } = this.props;

    ev.preventDefault();

    if (inputValue) {
      const parsedUrl = this.parseUrl(inputValue);

      history.push(`/web/${parsedUrl}`);
    }
  }

  render() {
    const { inputValue } = this.state;

    return (
      <div className="MainSearch">
        <div className="MainSearch__search">
          <form
            className="MainSearch__search__form"
            onSubmit={this.handleSubmit}
          >
            <input
              type="text"
              value={inputValue}
              placeholder="https://example.com"
              pattern="(https|http)://.*"
              className="MainSearch__search__form__text"
              onChange={this.handleChange}
            />
            <input
              type="submit"
              value="GO"
              className="MainSearch__search__form__submit"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(MainSearch);
