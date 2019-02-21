import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './MainSearch.scss';

export default class MainSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      toWebUrl: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(ev) {
    this.setState({
      inputValue: ev.currentTarget.value.trim()
    });
  }

  handleSubmit(ev) {
    const { inputValue } = this.state;

    ev.preventDefault();

    if (inputValue) {
      this.setState({
        toWebUrl: true
      });
    }
  }

  render() {
    const { inputValue, toWebUrl } = this.state;

    if (toWebUrl) {
      return <Redirect to={`/web/${inputValue}`} />;
    }

    return (
      <div className="MainSearch">
        <div className="MainSearch__search">
          <h2 className="MainSearch__search__title">
            Vanilla_Archive is non-profit library of WWW
          </h2>
          <form className="MainSearch__search__form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={inputValue}
              placeholder="Type URL"
              className="MainSearch__search__form__text"
              onChange={this.handleChange}
            />
            <input type="submit" value="GO" className="MainSearch__search__form__submit" />
          </form>
        </div>
      </div>
    );
  }
}
