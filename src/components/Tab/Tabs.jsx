import {scroller} from 'react-scroll';
import React, {useRef, useState} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function Tabs() {
  const [current, setCurrent] = useState("Bun");
  return (
    <div style={{ display: "flex" }}>
      <Tab
        value="Bun"
        active={current === "Bun"}
        onClick={() => {
          setCurrent("Bun");
          scroller.scrollTo('buns', {
            smooth: true,
            containerId: 'container',
          });
        }}
      >
        Булки
      </Tab>
      <Tab
        value="Sous"
        active={current === "Sous"}
        onClick={() => {
          setCurrent("Sous");
          scroller.scrollTo('sauce', {
            smooth: true,
            containerId: 'container',
          });
        }}
      >
        Соусы
      </Tab>
      <Tab
        value="Main"
        active={current === "Main"}
        onClick={() => {
          setCurrent("Main");
          scroller.scrollTo('main', {
            smooth: true,
            containerId: 'container',
          });
        }}
      >
        Начинки
      </Tab>
    </div>
  );
}

export default Tabs;
