import React, { Component } from "react";
import { getFeedback } from "../ApiHandler.js";
import FeedbackCard from "../Components/FeedbackCard";

export default class HomePage extends Component {
  state = {
    feedbacks: null,
    page: 1,
    language: "en",
  };

  // ORIGINAL RENDERING OF FIRST PAGE OF FEEDBACKS THROUGH API CALL
  componentDidMount() {
    getFeedback({})
      .then((res) => this.setState({ feedbacks: res }))
      .catch((error) => console.log(error));
  }

  // IF STATE OF PAGE NUMBER CHANGES, COMPONENT WILL UPDATE TO RENDER NEXT PAGE OF FEEDBACKS
  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      getFeedback({ page: this.state.page })
        .then((res) => this.setState({ feedbacks: res }))
        .catch((error) => console.log(error));
    }
  }

  incrementPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  decrementPage = () => {
    this.setState({ page: this.state.page - 1 });
  };

  handleChange = (e) => {
    this.setState({ language: e.target.value });
  };

  render() {
    return (
      <div className="HomePage">
        <div className="header">
          <h1>
            Please feel free to select one of these cards to find more details
          </h1>
          <div className="language-input">
            Choose a Language:&nbsp;
            <select
              name="language"
              className="input"
              onChange={this.handleChange}
            >
              <option value="-1" disabled>
                Select a Language
              </option>
              <option value="en" onChange={this.handleChange}>
                English
              </option>
              <option value="fr" onChange={this.handleChange}>
                French
              </option>
              <option value="es" onChange={this.handleChange}>
                Spanish
              </option>
              <option value="zh" onChange={this.handleChange}>
                Mandarin
              </option>
              <option value="ru" onChange={this.handleChange}>
                Russian
              </option>
            </select>
          </div>
          <div id="buttons-group">
            <button
              onClick={this.decrementPage}
              className={`button ${this.state.page > 1 ? "" : "active"}`}
            >
              Previous Page
            </button>
            &nbsp;
            <button
              onClick={this.incrementPage}
              className={`button ${
                this.state.feedbacks &&
                this.state.page <= this.state.feedbacks.last_page
                  ? ""
                  : "active"
              }`}
            >
              Next Page
            </button>
          </div>
        </div>
        <div className="feedbacks-grid">
          {this.state.feedbacks &&
            this.state.feedbacks.data &&
            this.state.feedbacks.data.map((person, key) => (
              <FeedbackCard
                key={key}
                person={person}
                view="home-page"
                language={this.state.language}
              />
            ))}
        </div>
      </div>
    );
  }
}
