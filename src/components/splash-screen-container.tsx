import styles from './splash-screen-container.module.css';

export const SplashScreenContainer: React.FC = ({ children }) => {
    return (
        <div className={styles.container}>
            <div className={styles.splashScreenContainer}>{children}</div>
        </div>
    );
};
