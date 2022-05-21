// Bring React in to build a component.
import React from 'react';
// Import from react-dom the ability to create a root render
import { createRoot } from 'react-dom/client';
import RatingReviews from './Ratings-Reviews/components/RRapp.jsx';
// create the root of the app by selection where the app should be mounted in the dom
const root = createRoot(document.getElementById('root'));

// creates component in js syntax (hence, no <> allowed, js doesn't know what it means)
// const App = React.createElement("h1",null,"Hello World");
// root.render(<App />); -> will NOT render!! root.render(App); -> will

// render the root element with the provided component
root.render(<RatingReviews />);
