import { useEffect, useState } from "react";

export const useWindowsWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const handleWindowSizeChange = () => {
    setWindowWidth(window.innerWidth);
  };

  return {
    windowWidth,
  };
};
