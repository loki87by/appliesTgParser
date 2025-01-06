import React, { useState, useEffect } from "react";
import Aside from "../Aside/Aside";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { TMP_ARR } from "../../utils/consts";
import "../../vendor/normalize.css";
import "./App.css";

function App() {
  const [data, setData] = useState(TMP_ARR);
  const [position, setPosition] = useState(0);
  const [showedData, setShowedData] = useState([]);
  const [asideDataLength, setAsideDataLength] = useState(NaN);
  const [socket, setSocket] = useState(null);
  const [tick, setTick] = useState(false);
  const [isDataSent, setDataSent] = useState(false);
  const [isAsideOpened, setAsideOpened] = useState(false);
  const [filter, setFilter] = useState("all");
  const [delay, setDelay] = useState("5 минут");

  // WebSocket connect
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5348");

    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const content = JSON.parse(event.data);

      if (content) {
        console.log("content: ", content);
        if (content.data) {
          setData(content.data);
        }
      }
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // Функция для отправки сообщения в WebSocket
  useEffect(() => {
    if (socket && tick) {
      console.log("tick: ", tick);
      socket.send(
        JSON.stringify({ url: "unload/tg_server/get", params: data })
      );
      setDataSent(true);
    } else {
      console.error("WebSocket is not connected");
    }
  }, [tick, socket, data]);

  // interval send data
  useEffect(() => {
    if (tick && isDataSent) {
      setDataSent(false);
      setTick(false);
      const timer = setTimeout(() => {
        setTick(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [delay, isDataSent, tick]);

  // получение индекса элемента в другом массиве
  const getIndex = (array) => {
    let index = -1;
    const counter = position;
    const length = array.length;
    let left = counter;
    let right = counter;

    if (!showedData || !showedData[left] || !showedData[left].uid) {
      return 0
    }

    while (left >= 0 || right < length) {
      if (left >= 0) {
        index = array.findIndex((i) => i.uid === showedData[left].uid);

        if (index !== -1) {
          return index;
        }
        left--;
      }

      if (right < length && right !== left) {
        index = array.findIndex((i) => i.uid === showedData[right].uid);
        if (index !== -1) {
          return index;
        }
        right++;
      }
    }
    return 0;
  };

  // фильтрация и показанные данные
  useEffect(() => {
    let array;
    switch (filter) {
      case "sent":
        array = data.filter((item) => item.sent);
        break;
      case "unsent":
        array = data.filter((item) => !item.sent);
        break;
      default:
        array = data.slice();
    }
    setPosition(getIndex(array));
    setShowedData(array);
  }, [data, filter]);

  function getCurrData(len) {
    switch (len) {
      case data.length:
        return data;
      case data.filter((i) => i.sent).length:
        return data.filter((i) => i.sent);
      default:
        return data.filter((i) => !i.sent);
    }
  }

  return (
    <>
      <Aside
        isAsideOpened={isAsideOpened}
        data={getCurrData(asideDataLength)}
      />
      <Header
        filter={filter}
        setFilter={setFilter}
        delay={delay}
        setDelay={setDelay}
      />
      <Main
        showedData={showedData}
        data={data}
        isAsideOpened={isAsideOpened}
        asideDataLength={asideDataLength}
        position={position}
        setPosition={setPosition}
        setData={setData}
      />
      <Footer
        isAsideOpened={isAsideOpened}
        asideDataLength={asideDataLength}
        fullCounter={data.length}
        sentCounter={data.filter((i) => i.sent).length}
        setAsideOpened={setAsideOpened}
        setAsideDataLength={setAsideDataLength}
      />
    </>
  );
}

export default App;
