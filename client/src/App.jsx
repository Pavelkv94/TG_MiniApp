import { useEffect } from "react";
import "./App.css";
import { useTelegram } from "./useTelegram";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Component1 from "./Component1/Component1";
import Component2 from "./Component2/Component2";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
    tg.expand();
  }, []);

  console.log(tg);
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route index element={<Component1 />} />
        <Route path={"component2"} element={<Component2 />} />
      </Routes>
    </div>
  );
}

export default App;
