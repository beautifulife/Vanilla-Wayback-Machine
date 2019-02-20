import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import './MainSearch.scss';

class MainSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      toWebUrl: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { onInit } = this.props;
  }

  handleChange(ev) {
    this.setState({
      inputValue: ev.currentTarget.value.trim()
    });
  }

  handleSubmit(ev) {
    const { inputValue } = this.state;
    const { onSubmit } = this.props;

    ev.preventDefault();

    if (inputValue) {
      onSubmit(inputValue);
      this.setState({
        toWebUrl: true
      });
    }
  }

  render() {
    const { inputValue, toWebUrl } = this.state;

    if (toWebUrl) {
      console.log(inputValue);
      return <Redirect to={`/web/${inputValue}`} />;
    }

    return (
      <div className="MainSearch">
        <form className="MainSearch__search" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={inputValue}
            placeholder="Type URL"
            className="MainSearch__search__text"
            onChange={this.handleChange}
            autoFocus
          />
          <input type="submit" value="GO" className="MainSearch__search__submit" />
        </form>
      </div>
    );
  }
}

export default MainSearch;
