import styles from "./Loading.module.scss";

export default function Loading() {
  return (
    <section className={styles.container}>
      <div className={styles.elipse}>
        <div />
        <div />
        <div />
        <div />
      </div>
      <p>Carregando pacotes</p>
    </section>
  );
}
