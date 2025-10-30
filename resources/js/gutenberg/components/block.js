/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

export default function Block( {
	fields,
	Edit,
	attributes,
	setAttributes,
	metaData,
	clientId,
} ) {
	const blockProps = useBlockProps();

	return (
		<>
			<div
				{ ...blockProps }
				className={ `${
					blockProps.className
				} directorist-gbt-field-width-${ Math.trunc(
					attributes.block_width
				) }` }
			>
				<Edit
					attributes={ attributes }
					setAttributes={ setAttributes }
					metaData={ metaData }
					clientId={ clientId }
				/>
			</div>
		</>
	);
}
