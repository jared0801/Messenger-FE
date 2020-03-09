import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import App from './App';

export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
});

ReactDOM.render(<App />, document.querySelector("#root"));