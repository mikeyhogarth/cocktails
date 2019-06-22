import { useEffect, useState } from "react";

// Hook for getting the vertical scroll position
function useScroll() {
  const [scrollPos, setScrollPos] = useState(0);

  const handleScroll = () => {
    setScrollPos(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollPos;
}

export default useScroll;
