/**
 * WordPress dependencies
 */
import {
	AlignmentControl,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';
import { ToggleControl, PanelBody, Button, Popover, ColorPicker, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

export default function Controls( { attributes, setAttributes } ) {
	const { textAlign } = attributes;

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Listings Badge Popular Settings', 'directorist-gutenberg' ) }
				initialOpen={ true }
			>
				<AlignmentControl
					value={ textAlign }
					onChange={ ( nextAlign ) => {
						setAttributes( { textAlign: nextAlign } );
					} }
				/>
			</PanelBody>
		</InspectorControls>
	);
}