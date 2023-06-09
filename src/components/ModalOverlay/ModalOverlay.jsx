import PropTypes from "prop-types";
import { useContext } from 'react';
import styles from "./ModalOverlay.module.css";
import { ModalContext } from "../../service/appContext";


function ModalOverlay({ active, setActive, children }) {
  return (
    <>
      <div className={styles.overlay} onClick={() => setActive(false)}></div>
    </>
  );
}


export default ModalOverlay;
