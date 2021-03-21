import React, { Component } from "react";
//IMPORTING APIHANDLER FILE TO CALL APIS
import ApiHandler from "../ApiHandler";

import FeedbackCard from "../Components/FeedbackCard";

class FeedbackPage extends Component {
  state = {
    selectedFeedback: null,
  };
  // RENDERING OF SELECTED FEEDBACK THROUGH API CALL
  componentDidMount() {
    ApiHandler.getOneFeedback(this.props.match.params.id)
      .then((res) => this.setState({ selectedFeedback: res }))
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <div className="FeedbackPage">
        {this.state.selectedFeedback && (
          <FeedbackCard
            person={this.state.selectedFeedback}
            view="feedback-page"
          />
        )}
      </div>
    );
  }
}

export default FeedbackPage;
