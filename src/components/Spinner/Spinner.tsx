import { CSSProperties, FC } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import './spinner.scss';
import styles from '../../styles/variables/variables.module.scss';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
};

interface ISpinner {
  size: number;
}

const Spinner: FC<ISpinner> = ({ size }) => {
  return (
    <ClipLoader
      color={styles.mainFontColor}
      cssOverride={override}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Spinner;
