import React, { Component } from "react";
//IMPORTING APIHANDLER FILE TO CALL APIS
import ApiHandler from "../ApiHandler.js";

import FeedbackCard from "../Components/FeedbackCard";

export default class HomePage extends Component {
  state = {
    feedbacks: null,
    page: 1,
  };

  incrementPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  decrementPage = () => {
    this.setState({ page: this.state.page - 1 });
  };

  // ORIGINAL RENDERING OF FIRST PAGE OF FEEDBACKS THROUGH API CALL
  componentDidMount() {
    ApiHandler.getAllFeedbacks()
      .then((res) => this.setState({ feedbacks: res }))
      .catch((error) => console.log(error));
  }

  // IF STATE OF PAGE NUMBER CHANGES, COMPONENT WILL UPDATE TO RENDER NEXT PAGE OF FEEDBACKS
  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      ApiHandler.getSelectedPageFeedbacks(this.state.page)
        .then((res) => this.setState({ feedbacks: res }))
        .catch((error) => console.log(error));
    }
  }
  render() {
    return (
      <div className="HomePage">
        <div className="header">
          <h1>
            Please feel free to select one of these cards to find more details
          </h1>
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
              <FeedbackCard key={key} person={person} view="home-page" />
            ))}
        </div>
      </div>
    );
  }
}
