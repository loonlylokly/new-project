import { Link } from '@tanstack/react-router';

import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Toodo</h2>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link className={styles.link} to="/">
                Home
              </Link>
            </li>
            <li className={styles.item}>
              <Link className={styles.link} to="/about">
                About
              </Link>
            </li>
            <li className={styles.item}>
              <Link
                className={styles.link}
                to="/tasks/$taskId"
                params={{
                  taskId: '123',
                }}
              >
                Task123
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
