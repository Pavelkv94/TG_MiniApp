import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTelegram } from "../useTelegram";

const Component1 = () => {
  const { tg, queryId } = useTelegram();

  const [addedElements, setAddedElements] = useState([]);

  const addElement = () => setAddedElements([...addedElements, { name: "Test", number: 23 }]);

  const totalPrice = addedElements.reduce((acc, item) => {
    return acc += item.number
  }, 0);

  if(addedElements.length > 0) {
    tg.MainButton.show();
    tg.MainButton.setText(`Price is ${totalPrice}$`);

  } else {
    tg.MainButton.hide();
  }

  //! отправляем на наш сервак
  const onSendDataToBot = useCallback(() => {
    const data = {
      elements: addedElements,
      totalPrice,
      queryId //todo обязательно передать
    };
    fetch('http://localhost:3002/web-data', {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(data)
    })
  }, [addedElements, queryId, totalPrice]);

  //подписка и отписка от события клика по главной кнопке для отправки
  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendDataToBot);
    return () => {
      tg.offEvent("mainButtonClicked", onSendDataToBot);
    };
  }, [onSendDataToBot]);


  return (
    <div>
      Component1
      <br />
      To <Link to="/component2">Component2</Link>
      <button onClick={addElement}>Add</button>
      <br />
      <div style={{display: "flex", flexWrap: "wrap"}}>
        {addedElements.map((el, i) => (
          <div key={i} style={{ width: "100px", height: "50px", border: "2px solid blue", margin: "10px" }}>
            <p>{el.name}</p>
            <p>{el.number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Component1;
