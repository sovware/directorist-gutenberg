/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { TextControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ColorPickerControl from '@directorist-gutenberg/gutenberg/components/controls/color-picker-control';

export default function Controls({ attributes, setAttributes }) {
	const [isTextColorPickerOpen, setIsTextColorPickerOpen] = useState(false);
	const [isBackgroundColorPickerOpen, setIsBackgroundColorPickerOpen] = useState(false);

	return (
		<InspectorControls>
			<PanelBody
				title={__( 'Badge Settings', 'directorist-gutenberg' )}
				initialOpen={true}
			>
				<TextControl
					label={__( 'Badge Text', 'directorist-gutenberg' )}
					value={attributes.text}
					onChange={(value) => setAttributes({ text: value })}
				/>

				<ColorPickerControl
					label={__( 'Text Color', 'directorist-gutenberg' )}
					color={attributes.text_color}
					defaultColor="#ffffff"
					onChange={(color) => setAttributes({ text_color: color })}
					isOpen={isTextColorPickerOpen}
					onToggle={() => setIsTextColorPickerOpen(!isTextColorPickerOpen)}
				/>

				<ColorPickerControl
					label={__( 'Background Color', 'directorist-gutenberg' )}
					color={attributes.background_color}
					defaultColor="#2C99FF"
					onChange={(color) => setAttributes({ background_color: color })}
					isOpen={isBackgroundColorPickerOpen}
					onToggle={() => setIsBackgroundColorPickerOpen(!isBackgroundColorPickerOpen)}
				/>
			</PanelBody>
		</InspectorControls>
	);
}