import React, { useState, useEffect } from "react";
import Aside from "../Aside/Aside";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import "../../vendor/normalize.css";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [position, setPosition] = useState(0);
  const [showedData, setShowedData] = useState([]);
  const [asideData, setAsideData] = useState("all");
  const [socket, setSocket] = useState(null);
  const [isAsideOpened, setAsideOpened] = useState(false);
  const [sendedObjId, setSendedObjId] = useState("");
  const [filter, setFilter] = useState("all");
  const [delay, setDelay] = useState(5 * 60 * 1000);

  // WebSocket connect
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5348");
    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const content = JSON.parse(event.data);

      if (content && content.data) {
        const arr = data.slice();
        content.data.forEach((i) => {
          const index = arr.length === 0 ? -1 : arr.findIndex((j) => i.uid === j.uid);

          if (index === -1) {
            arr.push(i);
          }

          if (index >= 0 && arr[index].isEmail !== undefined) {
            arr[index] = i;
          }
        });
        setData(arr);
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

  // Функция для получения данных из WebSocket
  const getContent = () => {
    if (socket) {
      socket.send(
        JSON.stringify({
          url: "unload/tg_server/get",
        })
      );
    } else {
      console.error("WebSocket is not connected");
    }
  };

  // Функция для отправки сообщения в WebSocket
  const sendMessage = () => {
    if (socket) {
      const current = data.find((i) => i.uid === sendedObjId);
      socket.send(
        JSON.stringify({
          url: "unload/tg_server/send",
          params: { data: current },
        })
      );
      setSendedObjId("");
    } else {
      console.error("WebSocket is not connected");
    }
  };

  useEffect(() => {
    if (sendedObjId !== "") {
      sendMessage();
    }
  });

  // interval send data
  useEffect(() => {
    getContent();
    const interval = setInterval(() => {
      getContent();
    }, delay);

    return () => clearInterval(interval);
  }, [socket, delay]);

  // получение индекса элемента в другом массиве
  const getIndex = (array) => {
    let index = -1;
    const counter = position;
    const length = array.length;
    let left = counter;
    let right = counter;

    if (!showedData || !showedData[left] || !showedData[left].uid) {
      return 0;
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
        if (right >= showedData.length) {
          return 0;
        }
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
      case "break":
        array = data.filter((item) => item.censored);
        break;
      default:
        array = data;
    }
    setPosition(getIndex(array));
    setShowedData(array);
  }, [data, filter]);

  function getCurrData(name) {
    switch (name) {
      case "all":
        return data;
      case "sent":
        return data.filter((i) => i.sent);
      case "unsent":
        return data.filter((i) => !i.sent);
      default:
        return data.filter((i) => i.censored);
    }
  }

  function openFromAside(index) {
    const arr = getCurrData(asideData);
    const cur = data.findIndex((i) => i.uid === arr[index].uid);
    setShowedData(data);
    setPosition(cur);
    setAsideOpened(false);
  }

  return (
    <>
      <Aside
        isAsideOpened={isAsideOpened}
        data={getCurrData(asideData)}
        openFromAside={openFromAside}
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
        position={position}
        setPosition={setPosition}
        setData={setData}
        sendMessage={sendMessage}
        setSendedObjId={setSendedObjId}
      />
      <Footer
        isAsideOpened={isAsideOpened}
        asideData={asideData}
        fullCounter={data.length}
        sentCounter={data.filter((i) => i.sent).length}
        breakCounter={data.filter((i) => i.censored).length}
        setAsideOpened={setAsideOpened}
        setAsideData={setAsideData}
      />
    </>
  );
}

export default App;
