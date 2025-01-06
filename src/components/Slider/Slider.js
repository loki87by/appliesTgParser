import React, { useEffect } from "react";
import { useClipboard } from "use-clipboard-copy";
import copy from "../../assets/copy.svg";
import ok from "../../assets/ok.svg";
import "./Slider.css";

function Slider(props) {
  const clipBuffer = useClipboard({
    onSuccess() {
      console.log("Text was copied successfully!");
    },
    onError() {
      alert("Что-то пошло не так, попробуйте скопировать еще раз.");
    },
  });

  function copyBuffer(text) {
    clipBuffer.copy(text);
  }

  function clickHandler(text, index) {
    copyBuffer(text);
    const array = [...props.clicked, index];
    const newSet = Array.from(new Set(array)).sort();
    props.setClicked(newSet);
  }

  function getContent(i) {
    return `Поступил новый отклик.
    Вакансия  -  ${i.company.vacancy}
    ФИО соискателя  -  ${i.person.name}
    Контакты для связи:  ${i.person.phone}
    ${i.person.link && "Контакты для связи: ".concat(i.person.link)}`;
  }

  useEffect(() => {
    function updateData() {
      const newData = props.data.slice();
      const current = props.slides[props.position].uid;
      const currIndex = newData.findIndex((i) => i.uid === current);
      newData[currIndex].sent = true;
      props.setData(newData);
    }

    if (props.clicked.length === 2) {
      updateData();
      props.setClicked([...props.clicked, ""]);
    }
  }, [props]);

  function isCopied(ind) {
    return props.clicked.some((i) => i === ind);
  }

  return (
    <div
      className="slider"
      style={props.position > 0 ? { transform: "translateX(25%)" } : {}}
    >
      {props.slides.map((i, ind) => {
        return (
          <div
            key={ind}
            className={`Slider-slide ${
              props.position === 0 && ind === 0 && "Slider-slide--first"
            }`}
            style={{
              transform: `rotateY(${
                ind === props.position ? 0 : ind < props.position ? -60 : 60
              }deg) translateX(-${(props.position + ind) * props.shift}${
                props.unit
              }`,
            }}
          >
            <img src={ok} alt="Отправлено" className={`null ${i.sent && "sended"}`} />
            <div className="Slider-slide-content">
              <h2 className="Slider-slide-text">{i.company.id}</h2>
              <img
                src={isCopied(1) ? ok : copy}
                alt={isCopied(1) ? "Скопировано" : "Скопировать"}
                title={isCopied(1) ? "Скопировано" : "Скопировать"}
                style={!isCopied(1) ? {cursor: 'pointer'}:{}}
                className="Slider-slide-link"
                onClick={() => clickHandler(i.company.id, 1)}
              />
            </div>
            <div className="Slider-slide-content">
              <div className="Slider-slide-text_content">
                <h3 className="Slider-slide-text">Поступил новый отклик.</h3>
                <h3 className="Slider-slide-text">{`Вакансия  -  ${i.company.vacancy}`}</h3>
                <h3 className="Slider-slide-text">{`ФИО соискателя  -  ${i.person.name}`}</h3>
                <h3 className="Slider-slide-text">{`Контакты для связи:  ${i.person.phone}`}</h3>
                {i.person.link ? (
                  <h4 className="Slider-slide-text">{`Контакты для связи:  ${i.person.link}`}</h4>
                ) : (
                  ""
                )}
              </div>
              <img
                src={isCopied(2) ? ok : copy}
                alt={isCopied(2) ? "Скопировано" : "Скопировать"}
                title={isCopied(2) ? "Скопировано" : "Скопировать"}
                style={!isCopied(2) ? {cursor: 'pointer'}:{}}
                className="Slider-slide-link"
                onClick={() => clickHandler(getContent(i), 2)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Slider;
