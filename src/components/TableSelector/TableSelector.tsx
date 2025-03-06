import { FC, useEffect } from 'react';
import './table-selector.scss';

interface ITableProps {
  onTableSelect: (table: number, guests: number) => void;
  selectedTime: string;
  reservedTables: number[];
}

const TableSelector: FC<ITableProps> = ({ onTableSelect, selectedTime, reservedTables }) => {
  useEffect(() => {}, [selectedTime]);

  return (
    <div>
      <h3 className="table__title">Select your table:</h3>
      <div className="table__wrapper">
        {[
          { id: 1, guests: 2 },
          { id: 2, guests: 4 },
          { id: 3, guests: 6 },
          { id: 4, guests: 8 },
          { id: 5, guests: 1 },
          { id: 6, guests: 7 },
          { id: 7, guests: 10 },
          { id: 8, guests: 5 },
        ].map(table => {
          const isReserved = reservedTables.includes(table.id);

          return (
            <fieldset className="table__fieldset" key={table.id}>
              <input
                className="table__radio"
                type="radio"
                id={`table${table.id}`}
                name="table"
                disabled={isReserved}
                onClick={() => onTableSelect(table.id, table.guests)}
              />
              <label
                className={`table__label ${isReserved ? 'table__label--disabled' : ''}`}
                htmlFor={`table${table.id}`}
              >
                Table {table.id} ({table.guests} guests)
                {isReserved && ' - Reserved'}
              </label>
            </fieldset>
          );
        })}
      </div>
    </div>
  );
};

export default TableSelector;
