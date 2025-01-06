import React from "react";
import left from "../../assets/left.svg";
import right from "../../assets/right.svg";
import "./Arrow.css";

function Arrow(props) {
  const getShift = () => {
    switch (props.index) {
      case -1:
        return "translateX(-50%)";
      case -2:
        return "translateX(-100%)";
      case 1:
        return "translateX(50%)";
      case 2:
        return "translateX(100%)";
      default:
        return "";
    }
  };

  return (
    <img
      src={props.dir === "left" ? left : right}
      className={`arrow ${props.index && "arrow_shadow"}`}
      alt={props.dir === "left" ? "Назад" : "Вперед"}
      title={
        props.dir === "left"
          ? props.position === 0
            ? "Ctrl+click для перехода в конец"
            : "Назад"
          : props.position === props.length - 1
          ? "Ctrl+click для запуска сначала"
          : "Вперёд"
      }
      onMouseEnter={() => props.setIsHovered(true)}
      onMouseLeave={() => props.setIsHovered(false)}
      style={
        props.isHovered && props.dir !== props.clickedDirection
          ? { transform: `scale(.75) ${getShift()}` }
          : {}
      }
      onMouseDown={() => {
        props.setClickedDirection(props.dir);
      }}
      onMouseUp={
        props.dir === "left" ? (e) => props.toLeft(e) : (e) => props.toRight(e)
      }
    />
  );
}

export default Arrow;
