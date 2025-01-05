import React, { useState } from 'react';

import { CardBase } from '../card/base/CardBase';
import { Search } from '../search/Search';

import './Filter.scss';

export const Filter = (props: {
  className?: string;
  title: string;
  filter: Set<string>;
  onChange: (value: string) => void;
  selectedFilter?: Set<string>;
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtersArray = props.filter ? Array.from(props.filter) : [];
  const filteredArray = filtersArray.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CardBase position={props.className} title={props.title} width="filter-card">
      <div className="filter-container">
        <Search
          className="search-bar"
          value={searchTerm}
          onChange={setSearchTerm}
          width='search-default'
        />
        <div className="filter-options">
          {filteredArray.length > 0 &&
            filteredArray.map((filter) => (
              <div key={filter} className="filter-option">
                <input
                  name={props.title}
                  id={filter}
                  type="checkbox"
                  className="filter-checkbox"
                  checked={props.selectedFilter?.has(filter) ?? false}
                  onChange={() => props.onChange(filter)}
                />
                <label htmlFor={filter} className="filter-label">
                  {filter}
                </label>
              </div>
            ))}
        </div>
      </div>
    </CardBase>
  );
};
