/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Controls( { attributes, setAttributes } ) {
	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Listings Thumbnail Settings', 'directorist-gutenberg' ) }
				initialOpen={ true }
			>
				<SelectControl
					label={ __( 'Image Quality', 'directorist-gutenberg' ) }
					value={ attributes.image_quality }
					onChange={ ( value ) => setAttributes( { image_quality: value } ) }
					options={ [
						{ label: __( 'Default', 'directorist-gutenberg' ), value: 'default' },
						{ label: __( 'Large', 'directorist-gutenberg' ), value: 'large' },
						{ label: __( 'Medium', 'directorist-gutenberg' ), value: 'medium' },
						{ label: __( 'Full', 'directorist-gutenberg' ), value: 'full' },
					] }
				/>
			</PanelBody>
		</InspectorControls>
	);
}