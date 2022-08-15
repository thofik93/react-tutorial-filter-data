import React from 'react';
import PropTypes from 'prop-types';

const Icon = (props) => {
    const { style, className } = props.options;
    return (
        <i className={className} style={{ ...style }} />
    )
}

Icon.propTypes = {
	options: PropTypes.object,
};

export default Icon