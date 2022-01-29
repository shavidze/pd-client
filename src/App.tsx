import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DeckPage from "./features/DeckViewer/DeckPage";
import "./theme/styles.scss";
function App() {
  return (
    <div className="flex">
      <Switch>
        <Route exact path="/">
          <DeckPage />
        </Route>
      </Switch>
      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default App;
