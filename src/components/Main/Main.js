import React, { useState } from "react";
import Slider from "../Slider/Slider";
import left from "../../assets/left.svg";
import right from "../../assets/right.svg";
import "./Main.css";

function Main(props) {
  const [direction, setDirection] = useState(0);
  const [position, setPosition] = useState(0); //need upd
  const [clicked, setClicked] = useState([]);

  function toLeft(event) {
    setDirection(1);
    let newPosition;
    if (position > 0) {
      newPosition = position - 1;
    } else if (event.ctrlKey) {
      newPosition = props.showedData.length - 1;
    }
    if(!isNaN(newPosition)){
    setPosition(newPosition);
    setClicked([]);}
  }

  function toRight(event) {
    setDirection(0);
    let newPosition;
    if (position < props.showedData.length - 1) {
      newPosition = position + 1;
    } else if (event.ctrlKey) {
      newPosition = 0;
    }
    if(!isNaN(newPosition)){
    setPosition(newPosition);
    setClicked([]);
    }
  }

  return (
    <main>
      <img
        src={left}
        className="arrow"
        alt="Назад"
        onClick={(e) => toLeft(e)}
        title={position === 0 ? 'Ctrl+click для перехода в конец' : 'Назад'}
      />
      <section className="slider-wrapper" >
        <Slider
          shift="50"
          unit="%"
          direction={direction}
          position={position}
          slides={props.showedData}
          clicked={clicked}
          data={props.data}
          setClicked={setClicked}
          setData={props.setData}
        />
      </section>
      <img
        src={right}
        className="arrow"
        alt="Вперед"
        title={position === props.showedData.length - 1 ? 'Ctrl+click для запуска сначала' : 'Вперёд'}
        onClick={(e) => toRight(e)}
      />
    </main>
  );
}

export default Main;

/*

*/
