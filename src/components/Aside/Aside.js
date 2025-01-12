import React from "react";
import "./Aside.css";

function Aside(props) {
  return (
    <aside className={props.isAsideOpened && "aside_opened"}>
      {props.data.map((i, ind) => (
        <article key={ind} onClick={() => {props.openFromAside(ind)}}>
          <p style={{ width: '3%', textAlign: 'right'}}>{`${ind +1}.`}</p>
          <p style={{ width: '7%', textAlign: 'center'}}>{i.company.id}</p>
          <p style={{ width: '15%', textAlign: 'left'}}>{i.company.vacancy}</p>
          <p style={{ width: '15%', textAlign: 'left'}}>{i.person.name}</p>
          <p style={{ width: '14%', textAlign: 'left'}}>{i.person.phone}</p>
          <p style={{ width: '10%', textAlign: 'center'}}>{i.person.city || "-"}</p>
          <p style={{ width: '26%', textAlign: 'left'}}>{i.person.link || "-"}</p>
          <p style={{ width: '10%', textAlign: 'left'}}>{i.sent ? "Отправлено" : "Не отправлено"}</p>
        </article>
      ))}
    </aside>
  );
}

export default Aside;
