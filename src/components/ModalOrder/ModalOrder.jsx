
import PropTypes from "prop-types";
import styles from "./ModalOrder.module.css";
import done from '../../images/done.png'

function ModalOrder({active, setActive}) {
  return (
    <>
      <div className={active ? styles.popup + " " + styles.active : styles.popup}>
        <div className={styles.overlay}>
          <div className={styles.container}>
            <button type="button" className={styles.close} onClick={() => setActive(false)}></button>
            <h2 className={`${styles.number}`}>034536</h2>
            <p className={`text text_type_main-medium`}>идентификатор заказа</p>
            <img className={styles.img} src={done} />
            <p className={`text text_type_main-small`}>Ваш заказ начали готовить</p>
            <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
          </div>
        </div>
      </div>
    </>
  );
}

ModalOrder.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
};

export default ModalOrder;
