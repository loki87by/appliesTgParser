import React from "react";
import "./Footer.css";

function Footer(props) {
  return (
    <footer className="Footer">
      <h2
        onClick={() => {
          if (!props.isAsideOpened || props.asideData === "all") {
            props.setAsideOpened(!props.isAsideOpened);
          }
          props.setAsideData("all");
        }}
      >
        Всего: <span>{props.fullCounter}</span>
      </h2>
      <h2
        onClick={() => {
          if (!props.isAsideOpened || props.asideData === "sent") {
            props.setAsideOpened(!props.isAsideOpened);
          }
          props.setAsideData("sent");
        }}
      >
        Отправлено: <span>{props.sentCounter}</span>
      </h2>
      <h2
        onClick={() => {
          if (!props.isAsideOpened || props.asideData === "unsent") {
            props.setAsideOpened(!props.isAsideOpened);
          }
          props.setAsideData("unsent");
        }}
      >
        Осталось: <span>{props.fullCounter - props.sentCounter}</span>
      </h2>
      <h2
        onClick={() => {
          if (!props.isAsideOpened || props.asideData === "break") {
            props.setAsideOpened(!props.isAsideOpened);
          }
          props.setAsideData("break");
        }}
      >
        Проблемные: <span>{props.breakCounter}</span>
      </h2>
    </footer>
  );
}

export default Footer;
