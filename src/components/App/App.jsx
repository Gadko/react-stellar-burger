import PropTypes from "prop-types";
import styles from "./App.module.css";
import React, { useState } from 'react';
import AppHeader from '../Header/AppHeader'
import Title from '../Title/Title'
import Tab from '../Tab/Tabs'
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients"
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor"
import ModalOrder from '../ModalOrder/ModalOrder'
import data from "../../utils/data";

function App() {

  const [ingredients, setIngredients] = useState(new Map())

  function addIngredient(_id){
    let newmap = new Map(ingredients);
    
    if(newmap.get(_id) === undefined){
      newmap.set(_id, 1)
    }else {
      for(let i = 0; i<data.data.length; i++){
        if(data.data[i]._id === _id && data.data[i].type === "bun"){
          return
        }
      }
      newmap.set(_id, newmap.get(_id)+1)
    }
    setIngredients(newmap);
  }
  function removeIngredient(_id){
    let newmap = new Map(ingredients);
    newmap.set(_id, newmap.get(_id)-1)
    setIngredients(newmap)
  }

  const [modalActive, setModelActive] = useState(false);


  return (
    <div className={styles.app}>
      <AppHeader />
      <div style={{width: "1243px"}}>
        <Title />
        <div style={{display: 'flex', gap: "40px"}}>
          <div style={{width: '600px'}}>
            <Tab />
            <BurgerIngredients addIngredient={addIngredient} ingredients={ingredients} />
          </div>
          <div style={{width: '600px'}}>
            <BurgerConstructor setActive={setModelActive} removeIngredient={removeIngredient} ingredients={ingredients} />
          </div>
        </div>
      </div>
      <ModalOrder active={modalActive} setActive={setModelActive} />
    </div>
  );
}

export default App;
