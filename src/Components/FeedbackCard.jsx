import React from "react";
import { Link } from "react-router-dom";

// IMPORTING LODASH FUNCTION TRUNCATE TO CUT QUOTES THAT ARE TOO LONG TO FIT CARD
// WE ONLY TRUNCATE ON HOMEPAGE VIEW!
import truncate from "lodash/truncate";

function FeedbackCard(props) {

  // FUNCTION TO LOOK FOR SELECTED LANGUAGE GLOBALLY
  // IF IT DOES NOT EXIST, DEFAULT LANGUAGE IS ENGLISH

  function findCorrectTranslation(targetTranslationsArray) {
    return (
      targetTranslationsArray.find((elem) => elem.locale === props.language) ||
      targetTranslationsArray.find((elem) => elem.locale === "en")
    );
  }

  const quote = findCorrectTranslation(props.person.translations);

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
            &nbsp;-&nbsp;
            {
              findCorrectTranslation(props.person.user.specialty.translations)
                .name
            }
            ,&nbsp;
            {
              findCorrectTranslation(props.person.user.country.translations)
                .name
            }
          </span>
        </div>
        <div></div>

        {quote && (
          <div className="quote">
            {quote.content.length <= 250 && <i>"{quote.content}"</i>}
            {props.view === "feedback-page" && <i>"{quote.content}"</i>}
            {props.view === "home-page" && quote.content.length > 250 && (
              <i>
                "
                {truncate(quote.content, {
                  length: 250,
                })}
                "
              </i>
            )}
          </div>
        )}
      </Link>
    </div>
  );
}

export default FeedbackCard;
