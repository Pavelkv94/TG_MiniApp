import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTelegram } from "../useTelegram";

const Component2 = () => {
  const [name, setname] = useState("");
  const { tg } = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Send Form",
    });
  }, []);

  useEffect(() => {
    name.trim() !== "" ? tg.MainButton.show() : tg.MainButton.hide();
  }, [name]);

  //функция для отправки данных //!боту
  const onSendDataToBot = useCallback(() => {
    tg.sendData(JSON.stringify({ name })); //todo sendData -> A method used to send data to the bot. When this method is called, a service message is sent to the bot containing the data data of the length up to 4096 bytes, and the Mini App is closed
  }, [name]);

  //подписка и отписка от события клика по главной кнопке для отправки
  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendDataToBot);
    return () => {
      tg.offEvent("mainButtonClicked", onSendDataToBot);
    };
  }, [onSendDataToBot]);

  const onBack = useCallback(() => {
    navigate('/');
    tg.BackButton.hide();

  }, []);

  //подписка и отписка от события клика по главной кнопке для отправки
  useEffect(() => {
    tg.onEvent("backButtonClicked", onBack);
    return () => {
      tg.offEvent("backButtonClicked", onBack);
    };
  }, [onBack]);

  useEffect(() => {
    tg.BackButton.show();
  }, []);

  return (
    <div>
      Component2
      <br />
      To <Link to="/">Component1</Link>
      <br />
      <label>Enter your name</label>
      <input value={name} onChange={(e) => setname(e.currentTarget.value)} />
      <br />
      {name}
    </div>
  );
};

export default Component2;
