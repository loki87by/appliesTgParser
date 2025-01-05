import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { TMP_ARR } from '../../utils/consts'
import "../../vendor/normalize.css";
import "./App.css";

function App() {
  const [data, setData] = useState(TMP_ARR);
  const [showedData, setShowedData] = useState([]);
  const [socket, setSocket] = useState(null);
  const [tick, setTick] = useState(false);
  const [isDataSent, setDataSent] = useState(false);
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

  // фильтрация и показанные данные
  useEffect(() => {
    switch (filter) {
      case "sent":
        setShowedData(data.filter((item) => item.sent));
        break;
      case "unsent":
        setShowedData(data.filter((item) => !item.sent));
        break;
      default:
        setShowedData(data);
        break;
    }
  }, [data, filter]);

  return (
    <>
      <Header
        fullCounter={data.length}
        sentCounter={data.filter((i) => i.sent).length}
        filter={filter}
        setFilter={setFilter}
        delay={delay}
        setDelay={setDelay}
      />
      <Main showedData={showedData} data={data} setData={setData} />
      <Footer />
    </>
  );
}

export default App;
