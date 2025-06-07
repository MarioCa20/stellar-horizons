import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Stellar Horizons</div>
      <div className={styles.menu}>
        {/* Add menu items here */}
      </div>
    </nav>
  );
};
