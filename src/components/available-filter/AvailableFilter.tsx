import { CardBase } from '../card/base/CardBase';

export const AvailableFilter = (props: {
    className?: string;
    title: string;
    filter: string[];
    onChange: (value: string) => void;
    selectedFilter?: string;
}) => {
    return (
        <CardBase position={props.className} title={props.title} width="filter-card">
            <div className="filter-container">

                <div className="filter-options">
                    {props.filter.length > 0 &&
                        props.filter.map((filter) => (
                            <div key={filter} className="filter-option">
                                <input
                                    name={props.title}
                                    id={filter}
                                    type="checkbox"
                                    className="filter-checkbox"
                                    checked={filter === props.selectedFilter}
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
