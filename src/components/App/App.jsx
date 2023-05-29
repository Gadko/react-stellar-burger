import PropTypes from "prop-types";
import styles from "./App.module.css";
import React, { useState, useEffect, useRef } from "react";
import AppHeader from "../Header/AppHeader";
import Title from "../Title/Title";
import Tab from "../Tab/Tabs";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

function App() {
  const [api, setApi] = useState({
    error: null,
    ingredients: [],
  });

  function getIngredients() {
    fetch(`https://norma.nomoreparties.space/api/ingredients`)
      .then((res) => res.json())
      .then(
        (res) => {
          setApi({
            error: null,
            ingredients: res.data,
          });
        },
        (error) => {
          setApi({
            error,
          });
        }
      );
  }

  useEffect(() => {
    getIngredients();
  }, []);

  const [ingredients, setIngredients] = useState(new Map());

  function isBunSelected() {
    for (let i = 0; i < api.ingredients.length; i++) {
      if (
        api.ingredients[i].type === "bun" &&
        ingredients.get(api.ingredients[i]._id) > 0
      ) {
        return true;
      }
    }
    return false;
  }

  function addIngredient(_id) {
    for (let i = 0; i < api.ingredients.length; i++) {
      if (
        api.ingredients[i]._id === _id &&
        api.ingredients[i].type === "bun" &&
        isBunSelected()
      ) {
        return;
      }
    }
    let newmap = new Map(ingredients);

    if (newmap.get(_id) === undefined) {
      newmap.set(_id, 1);
    } else {
      newmap.set(_id, newmap.get(_id) + 1);
    }
    setIngredients(newmap);
  }
  function removeIngredient(_id) {
    let newmap = new Map(ingredients);
    newmap.set(_id, newmap.get(_id) - 1);
    setIngredients(newmap);
  }

  const [modalOrderActive, setModelOrderActive] = useState(false);
  const [modalDetailsActive, setModelDetailsActive] = useState(false);
  const [modalData, setModalData] = useState({});

  function modalDetails(_id) {
    for (let i = 0; i < api.ingredients.length; i++) {
      if (api.ingredients[i]._id === _id) {
        setModalData(api.ingredients[i]);
        setModelDetailsActive(true);
        return;
      }
    }
  }


  return (
    <div className={styles.app}>
      <AppHeader />
      <div style={{ width: "1243px" }}>
        <Title />
        <div style={{ display: "flex", gap: "40px" }}>
          <div style={{ width: "600px" }}>
            <Tab />
            <BurgerIngredients
              data={api}
              addIngredient={addIngredient}
              ingredients={ingredients}
            />
          </div>
          <div style={{ width: "600px" }}>
            <BurgerConstructor
              data={api}
              setActiveDetails={modalDetails}
              setActive={setModelOrderActive}
              removeIngredient={removeIngredient}
              ingredients={ingredients}
            />
          </div>
        </div>
      </div>
      <OrderDetails active={modalOrderActive} setActive={setModelOrderActive} />
      <IngredientDetails
        modalData={modalData}
        data={api}
        active={modalDetailsActive}
        setActive={setModelDetailsActive}
      />
    </div>
  );
}

export default App;
