import { Input } from 'shared/ui';

import styles from './SearchForm.module.css';

export function SearchForm() {
  return (
    <section className={styles.wrapper}>
      <form className={styles.form}>
        <Input label="Search" placeholder="MyTask 1" />
      </form>
    </section>
  );
}
