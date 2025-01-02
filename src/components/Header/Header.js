import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <header className="Header">
      <h2>{props.headerText}</h2>
    </header>
  );
}

export default Header;
