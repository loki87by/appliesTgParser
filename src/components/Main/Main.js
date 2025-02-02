import React, { useState } from "react";
import Slider from "../Slider/Slider";
import Arrow from "../Arrow/Arrow";
import "./Main.css";

function Main(props) {
  const [direction, setDirection] = useState(0);
  const [clicked, setClicked] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [clickedDirection, setClickedDirection] = useState("");

  console.log(props.data)
  function toLeft(event) {
    setDirection(1);
    let newPosition;

    if (props.position > 0) {
      newPosition = props.position - 1;
    } else if (event.ctrlKey) {
      newPosition = props.showedData.length - 1;
    }

    if (!isNaN(newPosition)) {
      props.setPosition(newPosition);
      setClicked([]);
    }
    setIsHovered(true);
    setClickedDirection("");
  }

  function toRight(event) {
    setDirection(0);
    let newPosition;

    if (props.position < props.showedData.length - 1) {
      newPosition = props.position + 1;
    } else if (event.ctrlKey) {
      newPosition = 0;
    }

    if (!isNaN(newPosition)) {
      props.setPosition(newPosition);
      setClicked([]);
    }
    setIsHovered(true);
    setClickedDirection("");
  }

  return (
    <main>
      <div style={{ position: "relative", width: "5%" }}>
        <Arrow
          dir="left"
          clickedDirection={clickedDirection}
          setClickedDirection={setClickedDirection}
          length={props.showedData.length}
          position={props.position}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          toLeft={toLeft}
          toRight={toRight}
        />
        <Arrow
          dir="left"
          clickedDirection={clickedDirection}
          setClickedDirection={setClickedDirection}
          length={props.showedData.length}
          position={props.position}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          toLeft={toLeft}
          toRight={toRight}
          index={1}
        />
        <Arrow
          dir="left"
          clickedDirection={clickedDirection}
          setClickedDirection={setClickedDirection}
          length={props.showedData.length}
          position={props.position}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          toLeft={toLeft}
          toRight={toRight}
          index={2}
        />
      </div>
      <section className="slider-wrapper">
        <Slider
          shift="50"
          unit="%"
          direction={direction}
          position={props.position}
          slides={props.showedData}
          clicked={clicked}
          data={props.data}
          setClicked={setClicked}
          setData={props.setData}
          sendMessage={props.sendMessage}
          setSendedObjId={props.setSendedObjId}
        />
      </section>
      <div style={{ position: "relative", width: "5%" }}>
        <Arrow
          dir="right"
          clickedDirection={clickedDirection}
          setClickedDirection={setClickedDirection}
          length={props.showedData.length}
          position={props.position}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          toLeft={toLeft}
          toRight={toRight}
        />
        <Arrow
          dir="right"
          clickedDirection={clickedDirection}
          setClickedDirection={setClickedDirection}
          length={props.showedData.length}
          position={props.position}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          toLeft={toLeft}
          toRight={toRight}
          index={-1}
        />
        <Arrow
          dir="right"
          clickedDirection={clickedDirection}
          setClickedDirection={setClickedDirection}
          length={props.showedData.length}
          position={props.position}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          toLeft={toLeft}
          toRight={toRight}
          index={-2}
        />
      </div>
    </main>
  );
}

export default Main;
