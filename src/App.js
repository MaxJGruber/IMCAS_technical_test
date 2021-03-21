import { Route, Switch } from "react-router-dom";

// IMPORTING OUR TWO VIEWS FOR ROUTING
import HomePage from "./Pages/HomePage.jsx"
import FeedbackPage from "./Pages/FeedbackPage.jsx"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/feedback/:id" component={FeedbackPage} />
      </Switch>
    </div>
  );
}

export default App;
