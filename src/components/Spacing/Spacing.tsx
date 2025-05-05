import PropTypes from 'prop-types';
import React from 'react';

export const SpacingX = ({ size = 'md' }) => {
    return <div style={{ width: `var(--space-${size})` }}></div>
}

SpacingX.propTypes = {
    size: PropTypes.oneOf('xs', 'sm', 'md', 'lg', 'xl')
}

export const SpacingY = ({ size = 'md' }) => {
    return <div style={{ height: `var(--space-${size})` }}></div>
}

SpacingY.propTypes = {
    size: PropTypes.oneOf('xs', 'sm', 'md', 'lg', 'xl')
}