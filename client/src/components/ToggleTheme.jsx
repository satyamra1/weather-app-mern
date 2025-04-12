import React from "react";

const ToggleTheme = ({ theme, setTheme }) => {
  return (
   <div className="themebtn">
     <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}> 
      {theme === "light" ? "Dark" : "Light"} mode
    </button>
   </div>
  );
};

export default ToggleTheme;
