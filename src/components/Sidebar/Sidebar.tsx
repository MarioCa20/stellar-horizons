import styles from './Sidebar.module.css';

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          <li>Home</li>
          {/* Add more menu items */}
        </ul>
      </nav>
    </aside>
  );
};
