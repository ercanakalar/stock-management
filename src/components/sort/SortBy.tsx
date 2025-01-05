import { sortOptions } from '../../constants/sortConstant';
import { CardBase } from '../card/base/CardBase';

import './SortBy.scss';

export const SortBy = (props: {
  className?: string;
  title: string;
  selectedSort?: string;
  handleSortChange: (value: string) => void;
}) => {
  return (
    <CardBase position={props.className} title={props.title} width="sort-by-card">
      <div className="sort-by-container">
        {sortOptions.map((filter) => (
          <div key={filter} className="sort-by-option">
            <input
              type="radio"
              id={filter}
              name="sortBy"
              value={filter}
              className="radio-input"
              checked={props.selectedSort === filter}
              onChange={() => props?.handleSortChange(filter)}
            />
            <label htmlFor={filter} className="radio-label">
              {filter}
            </label>
          </div>
        ))}
      </div>
    </CardBase>
  );
};
