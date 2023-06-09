import PropTypes from "prop-types";
import styles from "./OrderDetails.module.css";
import Modal from "../Modal/Modal";
import done from "../../images/done.png";
import { answer } from "../BurgerConstructor/BurgerConstructor";

function OrderDetails({ active, setActive }) {
  let order = 0;
  for(let i=0; i<answer.length; i++){
    if(order === 0){
      order += answer[i]
    }else {
      order = 0;
      order += answer[i]
    }
  } 


  return (
    <Modal active={active} setActive={setActive}>
      <h2 className={`${styles.number}`}>{order}</h2>
      <p className={`text text_type_main-medium`}>идентификатор заказа</p>
      <img className={styles.img} src={done} alt="Картинка заказа" />
      <p className={`text text_type_main-small`}>Ваш заказ начали готовить</p>
      <p
        className={`${styles.text} text text_type_main-default text_color_inactive`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </Modal>
  );
}

OrderDetails.propTypes = { 
  active: PropTypes.bool.isRequired, 
  setActive: PropTypes.func.isRequired, 
};

export default OrderDetails;
