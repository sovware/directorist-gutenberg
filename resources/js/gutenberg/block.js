/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Set custom class names to the block
 *
 * @param {string|string[]|undefined} classNames - Class names as string, array, or undefined
 * @returns {string} Custom class names string
 */

const setCustomClassNames = (classNames) => {
	if (!classNames) {
		return '';
	}
	return Array.isArray(classNames) ? classNames.filter(Boolean).join(' ') : classNames;
};

/**
 * Block wrapper component that centralizes useBlockProps
 *
 * @param {Object} props - Component props
 * @param {Function} props.Edit - The Edit component to wrap
 * @param {Object} props.attributes - Block attributes
 * @param {Function} props.setAttributes - Function to set block attributes
 * @param {string|string[]} props.classNames - Additional custom class names to add
 * @param {Object} props.rest - Additional props to pass to Edit component
 */
export default function Block( {
	Edit,
	attributes,
	setAttributes,
    Controls,
	classNames = '',
	...rest
} ) {
	const customClasses = setCustomClassNames(classNames);

	// Block props
	const blockProps = useBlockProps({ className: `directorist-gutenberg-listing-card-block ${customClasses} directorist-gutenberg-block-width-${Math.trunc(attributes.block_width)}` });

	return (
        <div {...blockProps}>
            { Controls && <Controls attributes={attributes} setAttributes={setAttributes} /> }
            <Edit attributes={attributes} setAttributes={setAttributes} {...rest} />
        </div>
    );
}