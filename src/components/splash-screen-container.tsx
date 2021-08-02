import styles from './splash-screen-container.module.css';

export const SplashScreenContainer: React.FC = ({ children }) => {
    return <div className={styles.SplashScreenContainer}>{children}</div>;
};
