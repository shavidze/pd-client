import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
