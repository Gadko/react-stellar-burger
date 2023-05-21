import styles from "./AppHeader.module.css";
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function Header() {
  return (
    <div className={styles.header}>
        <div className={styles.content}>
            <nav className={styles.nav}>
                <div className={styles.container}>
                    <BurgerIcon type="primary" />
                    <p className={styles.name}>Конструктор</p>
                </div>
                <div className={styles.container}>
                    <ListIcon type="secondary" />
                    <p className={styles.name} style={{color: '#8585AD'}}>Лента заказов</p>
                </div>
            </nav>
            <Logo />
            <nav className={styles.nav}>
                <div className={styles.container}>
                </div>
                <div className={styles.container}>
                    <ProfileIcon type="secondary" />
                    <p className={styles.name} style={{color: '#8585AD'}}>Личный кобинет</p>
                </div>
            </nav>
        </div>
        
    </div>
  );
}

export default Header;
