/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Block wrapper component that centralizes useBlockProps
 *
 * @param {Object} props - Component props
 * @param {Function} props.Edit - The Edit component to wrap
 * @param {Object} props.attributes - Block attributes
 * @param {Function} props.setAttributes - Function to set block attributes
 * @param {Object} props.rest - Additional props to pass to Edit component
 */
export default function Block( {
	Edit,
	attributes,
	setAttributes,
    Controls,
	...rest
} ) {
	const blockProps = useBlockProps();

	return (
        <div {...blockProps}>
            { Controls && <Controls attributes={attributes} setAttributes={setAttributes} /> }
            <Edit attributes={attributes} setAttributes={setAttributes} {...rest} />
        </div>
    );
}