import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

import './Search.scss';

export const Search = (props: {
  className: string;
  width?: string;
  value?: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className={`search-container ${props.className}`}>
      <span className="search-icon">
        <SearchIcon data-testid="search-icon" />
      </span>
      <input
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
        type="text"
        className={`search-input ${props.width || 'search-default'}`}
        placeholder="Search"
      />
    </div>
  );
};
