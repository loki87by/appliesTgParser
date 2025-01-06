import React from "react";
import "./Footer.css";

function Footer(props) {
  return (
    <footer className="Footer">
      <h2
        onClick={() => {
          if (!props.isAsideOpened || props.asideDataLength === props.fullCounter) {
            props.setAsideOpened(!props.isAsideOpened);
          }
          props.setAsideDataLength(props.fullCounter);
        }}
      >
        Всего: <span>{props.fullCounter}</span>
      </h2>
      <h2
        onClick={() => {
          if (!props.isAsideOpened || props.asideDataLength === props.sentCounter) {
            props.setAsideOpened(!props.isAsideOpened);
          }
          props.setAsideDataLength(props.sentCounter);
        }}
      >
        Отправлено: <span>{props.sentCounter}</span>
      </h2>
      <h2
        onClick={() => {
          if (!props.isAsideOpened || props.asideDataLength === props.fullCounter - props.sentCounter) {
            props.setAsideOpened(!props.isAsideOpened);
          }
          props.setAsideDataLength(props.fullCounter - props.sentCounter);
        }}
      >
        Осталось: <span>{props.fullCounter - props.sentCounter}</span>
      </h2>
    </footer>
  );
}

export default Footer;
