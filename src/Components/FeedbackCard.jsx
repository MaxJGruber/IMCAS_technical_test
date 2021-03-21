import React from "react";
import { Link } from "react-router-dom";

// IMPORTING LODASH FUNCTION TRUNCATE TO CUT QUOTES THAT ARE TOO LONG TO FIT CARD
// WE ONLY TRUNCATE ON HOMEPAGE VIEW!
import truncate from "lodash/truncate";

function FeedbackCard(props) {
  // FUNCTIONS TO FIND ENGLISH TRANSLATIONS FROM ARRAY

  function findingCorrectQuoteTranslation() {
    return props.person.translations.find((elem) => elem.locale === "en");
  }
  function findingCorrectJobTranslation() {
    return props.person.user.specialty.translations.find(
      (elem) => elem.locale === "en"
    );
  }
  function findingCorrectCountryTranslation() {
    return props.person.user.country.translations.find(
      (elem) => elem.locale === "en"
    );
  }

  return (
    <div className="FeedbackCard-field">
      <Link
        to={`/feedback/${props.person.id}`}
        className={`FeedbackCard ${
          props.view !== "feedback-page"
            ? "hovering-feedbackcard"
            : "card-size-if-feedback-page  "
        }`}
      >
        <div className="profile-pic-frame">
          <img
            src={props.person.user.picture_url}
            alt=""
            className="profile-pic"
          />
        </div>
        <div className="person-info">
          <strong>{props.person.user.fullname}</strong>
          <span className="person-location">
            &nbsp;-&nbsp;{findingCorrectJobTranslation().name}
            ,&nbsp;
            {findingCorrectCountryTranslation().name}
          </span>
        </div>
        <div></div>

        <div className="quote">
          {findingCorrectQuoteTranslation().content.length <= 250 && (
            <i>"{findingCorrectQuoteTranslation().content}"</i>
          )}
          {props.view === "feedback-page" && (
            <i>"{findingCorrectQuoteTranslation().content}"</i>
          )}
          {props.view === "home-page" &&
            findingCorrectQuoteTranslation().content.length > 250 && (
              <i>
                "
                {truncate(findingCorrectQuoteTranslation().content, {
                  length: 250,
                })}
                "
              </i>
            )}
        </div>
      </Link>
    </div>
  );
}

export default FeedbackCard;
