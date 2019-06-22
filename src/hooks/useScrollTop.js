import { useEffect } from "react";

// For unknown reasons, the cocktail page sometimes starts half-way scrolled down.
// this is probably the browser trying to help.. but in this case
// we want to force the scroll to the top when the user visits the
// page. This hook does that for you.

function useScrollTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

export default useScrollTop;
