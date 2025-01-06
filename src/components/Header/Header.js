import React from "react";
import "./Header.css";

function Header(props) {
  const delayCorrection = (arg) => {
    const timeArgs = arg.split(" ");
    let koef = 1;

    if (timeArgs[1].startsWith("час")) {
      koef = 60;
    }
    return +timeArgs[0] * koef * 60 * 1000;
  };

  return (
    <header>
      <section>
        <h2>{`Режим отображения: `}</h2>
        <select
          defaultValue={props.filter}
          onChange={(e) => props.setFilter(e.target.value)}
        >
          <option value="all">Все</option>
          <option value="sent">Отправленные</option>
          <option value="unsent">Неотправленные</option>
        </select>
      </section>
      <section>
        <h2>{`Частота обновления: `}</h2>
        <select
          defaultValue={props.delay}
          onChange={(e) => props.setDelay(delayCorrection(e.target.value))}
        >
          <option value="1 минута">1 минута</option>
          <option value="2 минуты">2 минуты</option>
          <option value="3 минуты">3 минуты</option>
          <option value="5 минут">5 минут</option>
          <option value="10 минут">10 минут</option>
          <option value="15 минут">15 минут</option>
          <option value="20 минут">20 минут</option>
          <option value="30 минут">30 минут</option>
          <option value="45 минут">45 минут</option>
          <option value="1 час">1 час</option>
          <option value="2 часа">2 часа</option>
          <option value="3 часа">3 часа</option>
          <option value="4 часа">4 часа</option>
        </select>
      </section>
    </header>
  );
}

export default Header;
