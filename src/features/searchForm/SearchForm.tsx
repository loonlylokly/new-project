import { Input } from 'shared/ui';

import styles from './SearchForm.module.css';

type Props = {
  setSearch: (text: string) => void;
};

export function SearchForm({ setSearch }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <Input
          label="Search"
          placeholder="MyTask 1"
          handleChange={handleChange}
          debounceTime={600}
        />
      </form>
    </div>
  );
}
