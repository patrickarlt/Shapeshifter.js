Shapeshifter is a small library that simplifies executing javascript based on media queries.

# Usage

    var smallScreens = new Shapeshifter("min-width 320px", onQueryTrue, onQueryFalse);

Just instantiate a new Shapeshifter object with a media query and function to run when the query becomes true and a function to run when the query becomes false.

These functions are evaluated on every resize and orientationchange event but are only run when the query has changed as opposed to running every resize and orientation change.