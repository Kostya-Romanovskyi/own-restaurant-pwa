import { FC } from 'react';
import './children-selector.scss';

interface IChildrenProps {
  onChildrenSelect: (option: boolean) => void;
}

const ChildrenSelector: FC<IChildrenProps> = ({ onChildrenSelect }) => (
  <div>
    <h3 className="children__title">Will you be with small children?</h3>
    <div className="children__wrapper">
      <fieldset className="children__fieldset">
        <input
          className="children__radio"
          type="radio"
          id="children_yes"
          name="children"
          onClick={() => onChildrenSelect(true)}
        />
        <label className="children__label" htmlFor="children_yes">
          Yes
        </label>
      </fieldset>
      <fieldset className="children__fieldset">
        <input
          className="children__radio"
          type="radio"
          id="children_no"
          name="children"
          onClick={() => onChildrenSelect(false)}
        />
        <label className="children__label" htmlFor="children_no">
          No
        </label>
      </fieldset>
    </div>
  </div>
);

export default ChildrenSelector;
