
import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import { useEffect } from 'react';
import ReactDOM from 'react-dom'

const modalRoot = document.getElementById("react-modals");

function Modal({active, setActive, children}) {
  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === 'Escape') {
        setActive(false)
      }
    }
  
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])



  return ReactDOM.createPortal((
    <>
      <div className={active ? styles.popup + " " + styles.active : styles.popup}>
        <div className={styles.overlay} onClick={() => setActive(false)}></div>
          <div className={styles.container}>
            <button type="button" className={styles.close} onClick={() => setActive(false)}></button>
            {children}
          </div>
      </div>
    </>
  ), modalRoot);
}

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
};

export default Modal;
