import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DeckPage from "./features/DeckViewer/DeckPage";
import "./theme/styles.scss";
function App() {
  return (
    <div className="p-4 bg-gray-100 h-full">
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
