import React from 'react';
import PropTypes from 'prop-types';

/**
 * Combine all the context
 * @param {array} contexts array of context
 * @param {component} children child component
 * @returns Grouped Context
 */

export default function CombinedContext({ contexts, children }) {
	return contexts.reduce((accumulate, context) => {
		const Context = context.context;
		return <Context.Provider value={context.value}>{accumulate}</Context.Provider>;
	}, children);
}

CombinedContext.propTypes = {
	contexts: PropTypes.array.isRequired,
	children: PropTypes.element.isRequired,
};

