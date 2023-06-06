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
import getIngredients from "../../utils/burger-api";
import Modal from "../Modal/Modal";

function App() {
  const [api, setApi] = useState({
    error: null,
    ingredients: [],
  });

  

  useEffect(() => {
    getIngredients()
      .then(
      (res) => {
        let isBun = false;
        res.data.forEach((e) => {
          if (e.type === "bun" && isBun === false) {
            e.count = 1;
            isBun = true;
          } else if (e.type === "bun") {
            e.count = 0;
          } else {
            e.count = 1; //Это сделано для демонстрации работы BurgerConstructor. В будующем я это уберу.
          }
        });
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
    );;
  }, []);

  function isBunSelected() {
    for (let i = 0; i < api.ingredients.length; i++) {
      if (api.ingredients[i].type === "bun" && api.ingredients[i].count > 0) {
        return true;
      }
    }
    return false;
  }

  function addIngredient(_id) {
    let index = 0;
    for (let i = 0; i < api.ingredients.length; i++) {
      if (
        api.ingredients[i]._id === _id &&
        api.ingredients[i].type === "bun" &&
        isBunSelected()
      ) {
        return;
      } else if (api.ingredients[i]._id === _id) {
        index = i;
        break;
      }
    }
    let newmap = [...api.ingredients];
    newmap[index].count += 1;

    setApi({ ...api, ingredients: newmap });
  }

  function addIngredients(_ids) {
    let indexes = [];
    let isBuns = false;
    let newmap = [...api.ingredients];
    if (api.ingredients.length <= 0) {
      return;
    }
    for (let i = 0; i < api.ingredients.length; i++) {
      for (let j = 0; j < _ids.length; j++) {
        if (
          api.ingredients[i]._id === _ids[j] &&
          api.ingredients[i].type === "bun" &&
          (isBunSelected() || isBuns)
        ) {
          continue;
        } else if (api.ingredients[i]._id === _ids[j]) {
          if (api.ingredients[i].type === "bun") {
            isBuns = true;
          }
          indexes.push(i);
        }
      }
      indexes.forEach((e) => {
        newmap[e].count += 1;
      });
    }
    setApi({ ...api, ingredients: newmap });
  }

  function removeIngredient(_id) {
    let index = 0;
    let newmap = [...api.ingredients];

    for (let i = 0; i < api.ingredients.length; i++) {
      if (api.ingredients[i]._id === _id) {
        index = i;
        break;
      }
    }

    if (newmap[index].count === 0) {
      return;
    }

    newmap[index].count -= 1;
    setApi({ ...api, ingredients: newmap });
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
              setActiveDetails={modalDetails}
              data={api.ingredients}
              addIngredient={addIngredient}
            />
          </div>
          <div style={{ width: "600px" }}>
            <BurgerConstructor
              data={api.ingredients}
              setActive={setModelOrderActive}
              removeIngredient={removeIngredient}
            />
          </div>
        </div>
      </div>
      <OrderDetails active={modalOrderActive} setActive={setModelOrderActive} />
      
      <Modal setActive={setModelDetailsActive} active={modalDetailsActive}>
      
        <IngredientDetails
          modalData={modalData}
          data={api.ingredients}
          active={modalDetailsActive}
        />
        
      </Modal>
    </div>
  );
}

export default App;
