import React, { useState } from 'react';
import styles from './IngredientItem.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientItem(props) {
  const [isVisible, setIsVisible] = useState(false);
    
  function handleClick() {
    props.addIngredient(props._id)
    
  }

    return (
      <div onClick={handleClick} className={styles.content}>
        {props.count !== undefined && props.count>0 && <Counter count={props.count} />}
        <img className={styles.img} src={props.img} />
        <div style={{display: "flex"}}>
            <p className={styles.price}>{props.price}</p>
            <CurrencyIcon type="primary" />
        </div>
        <p className={styles.name}>{props.name}</p>
      </div>
    )
  }
  
  export default IngredientItem;