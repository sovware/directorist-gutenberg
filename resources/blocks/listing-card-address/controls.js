/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { ToggleControl, PanelBody, Button, Popover, ColorPicker, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import IconPicker from '@directorist-gutenberg/gutenberg/components/controls/icon-picker';

export default function Controls( { attributes, setAttributes } ) {
	const [isIconColorPickerOpen, setIsIconColorPickerOpen] = useState(false);
	const iconColor = attributes.icon_color || '';

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Listings Address Settings', 'directorist-gutenberg' ) }
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
						<div style={{ marginBottom: '16px' }}>
							<label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
								{__( 'Icon Color', 'directorist-gutenberg' )}
							</label>
							<div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
								<Button
									onClick={() => setIsIconColorPickerOpen(!isIconColorPickerOpen)}
									style={{
										width: '100%',
										height: '30px',
										backgroundColor: iconColor || '#000',
										border: '1px solid #ccc',
										borderRadius: '3px',
										cursor: 'pointer',
									}}
								/>
								{isIconColorPickerOpen && (
									<Popover
										onClose={() => setIsIconColorPickerOpen(false)}
										placement="left-start"
										offset={20}
									>
										<ColorPicker
											color={iconColor}
											onChangeComplete={(colorValue) => {
												const colorString = colorValue.rgb
													? `rgba(${colorValue.rgb.r}, ${colorValue.rgb.g}, ${colorValue.rgb.b}, ${colorValue.rgb.a})`
													: colorValue.hex || '';
												setAttributes({ icon_color: colorString });
											}}
											enableAlpha
										/>
									</Popover>
								)}
							</div>
						</div>
						<UnitControl
							label={ __( 'Icon Size', 'directorist-gutenberg' ) }
							value={ attributes.icon_size || '16px' }
							onChange={ ( value ) => setAttributes( { icon_size: value || '16px' } ) }
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

				<ToggleControl
					label={ __( 'Show Label', 'directorist-gutenberg' ) }
					checked={ attributes.show_label }
					onChange={ ( value ) => setAttributes( { show_label: value } ) }
				/>

				<ToggleControl
					label={ __( 'Use Parent Style', 'directorist-gutenberg' ) }
					checked={ attributes.use_parent_style }
					onChange={ ( value ) => setAttributes( { use_parent_style: value } ) }
				/>
			</PanelBody>
		</InspectorControls>
	);
}