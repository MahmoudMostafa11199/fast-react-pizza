import styles from './SpinnerFullPage.module.css';

export default function SpinnerFullPage() {
  return (
    <div className={styles.SpinnerFullPage}>
      <Spinner />
    </div>
  );
}

function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
}
