/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import clsx from 'clsx';

/**
 * Set custom class names to the block
 *
 * @param {string|string[]|undefined} classNames - Class names as string, array, or undefined
 * @returns {string} Custom class names string
 */

const setCustomClassNames = ( classNames ) => {
	if ( ! classNames ) {
		return '';
	}
	return Array.isArray( classNames )
		? classNames.filter( Boolean ).join( ' ' )
		: classNames;
};

/**
 * Block wrapper component that centralizes useBlockProps
 *
 * @param {Object} props - Component props
 * @param {Function} props.Edit - The Edit component to wrap
 * @param {Object} props.attributes - Block attributes
 * @param {Function} props.setAttributes - Function to set block attributes
 * @param {string|string[]} props.classNames - Additional custom class names to add
 * @param {string} props.name - Block name
 * @param {Object} props.rest - Additional props to pass to Edit component
 */
export default function Block( {
	Edit,
	attributes,
	setAttributes,
	Controls,
	StylesControls,
	classNames = '',
	name,
	...rest
} ) {
	const customClasses = setCustomClassNames( classNames );

	// For thumbnail block, don't use useBlockProps on outer wrapper (Edit component handles it)
	const isThumbnailBlock =
		name === 'directorist-gutenberg/listing-card-thumbnail';

	if ( isThumbnailBlock ) {
		return (
			<div
				className={ `directorist-gutenberg-listing-card-block ${ customClasses } directorist-gutenberg-block-width-${ Math.trunc(
					attributes.block_width
				) }` }
			>
				{ Controls && (
					<Controls
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				) }
				{ StylesControls && (
					<StylesControls
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				) }
				<Edit
					attributes={ attributes }
					setAttributes={ setAttributes }
					name={ name }
					{ ...rest }
				/>
			</div>
		);
	}

	// Block props with textAlign support
	const { textAlign } = attributes || {};

	// Apply drop shadow to parent for listings-archive-header block
	const isArchiveHeaderBlock =
		name === 'directorist-gutenberg/listings-archive-header';
	const shadowStyle =
		isArchiveHeaderBlock && attributes.drop_shadow
			? { boxShadow: attributes.drop_shadow }
			: {};

	const blockProps = useBlockProps( {
		className: clsx(
			'directorist-gutenberg-listing-card-block',
			customClasses,
			`directorist-gutenberg-block-width-${ Math.trunc(
				attributes.block_width || 100
			) }`,
			{
				[ `has-text-align-${ textAlign }` ]: textAlign,
			}
		),
		style: shadowStyle,
	} );

	return (
		<div { ...blockProps }>
			{ Controls && (
				<Controls
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			) }
			{ StylesControls && (
				<StylesControls
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			) }
			<Edit
				attributes={ attributes }
				setAttributes={ setAttributes }
				name={ name }
				{ ...rest }
			/>
		</div>
	);
}
