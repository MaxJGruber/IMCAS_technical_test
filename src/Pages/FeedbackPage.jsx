import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getFeedback } from "../ApiHandler";
import FeedbackCard from "../Components/FeedbackCard";

class FeedbackPage extends Component {
  state = {
    selectedFeedback: null,
    language: "",
  };
  // RENDERING OF SELECTED FEEDBACK THROUGH API CALL
  componentDidMount() {
    getFeedback({ id: this.props.match.params.id })
      .then((res) => this.setState({ selectedFeedback: res }))
      .catch((error) => console.log(error));
  }

  handleChange = (e) => {
    this.setState({ language: e.target.value });
  };

  render() {
    return (
      <div className="FeedbackPage">
        <div className="language-input ">
          &nbsp; Choose a Language:&nbsp;
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
        x
        {this.state.selectedFeedback && (
          <FeedbackCard
            person={this.state.selectedFeedback}
            view="feedback-page"
            language={this.state.language}
          />
        )}
        <div className="language-input">
          <Link to="/" className="button">
            Back to Home Page
          </Link>
        </div>
      </div>
    );
  }
}

export default FeedbackPage;
