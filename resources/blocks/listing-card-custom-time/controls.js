/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	Popover,
	ColorPicker,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import IconPicker from '@directorist-gutenberg/gutenberg/components/controls/icon-picker';
import ColorPickerControl from '@directorist-gutenberg/gutenberg/components/controls/color-picker-control';
import { useSubmissionFields } from '@directorist-gutenberg/gutenberg/hooks/useSubmissionFields';

export default function Controls( { attributes, setAttributes } ) {
	const [ isIconColorPickerOpen, setIsIconColorPickerOpen ] =
		useState( false );
	const iconColor = attributes.icon_color || '';
	const { getFieldsOptions } = useSubmissionFields();

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'General Settings', 'directorist-gutenberg' ) }
				initialOpen={ true }
			>
				<IconPicker
					attr_key="icon"
					attributes={ attributes }
					setAttributes={ setAttributes }
					label={ __( 'Icon', 'directorist-gutenberg' ) }
				/>

				{ attributes?.icon && (
					<>
						<ColorPickerControl
							label={ __(
								'Icon Color',
								'directorist-gutenberg'
							) }
							color={ attributes.icon_color }
							defaultColor={ attributes.icon_color || '#808080' }
							onChange={ ( color ) =>
								setAttributes( { icon_color: color } )
							}
							isOpen={ isIconColorPickerOpen }
							onToggle={ () =>
								setIsIconColorPickerOpen(
									! isIconColorPickerOpen
								)
							}
						/>

						<UnitControl
							label={ __( 'Icon Size', 'directorist-gutenberg' ) }
							value={ attributes.icon_size || '16px' }
							onChange={ ( value ) =>
								setAttributes( { icon_size: value || '16px' } )
							}
							units={ [
								{ value: 'px', label: 'px' },
								{ value: 'em', label: 'em' },
								{ value: 'rem', label: 'rem' },
								{ value: 'vh', label: 'vh' },
								{ value: 'vw', label: 'vw' },
							] }
						/>
					</>
				) }

				<div style={ { height: '16px' } }></div>

				<SelectControl
					label={ __( 'Select Field', 'directorist-gutenberg' ) }
					value={ attributes.meta_key }
					options={ getFieldsOptions( 'custom', 'time' ) }
					onChange={ ( value ) =>
						setAttributes( { meta_key: value } )
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
