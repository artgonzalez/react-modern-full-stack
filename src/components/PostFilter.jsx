import PropTypes from 'prop-types'
import { memo } from 'react';

// Use memo for performance optimization since this is a simple, potentially frequently used input
export const PostFilter = memo(({ label, value, onChange }) => {
    // Generate a unique ID for accessibility best practices (label htmlFor matches input id)
    const inputId = `filter-${label.toLowerCase().replace(/\s/g, '-')}`;

    return (
        <div>
            <label htmlFor={inputId}>{label}: </label>
            <input
                type='text'
                name={inputId}
                id={inputId}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={`Filter by ${label}`}
            />
        </div>
    );
});

// Define PropTypes for type checking
PostFilter.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

// Define displayName for memoized components in React DevTools
PostFilter.displayName = 'PostFilter';