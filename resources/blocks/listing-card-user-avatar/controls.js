/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	ToggleControl,
} from '@wordpress/components';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Controls( { attributes, setAttributes } ) {
	return (
		<InspectorControls>
			<PanelBody
				title={ __(
					'Listings User Avatar Settings',
					'directorist-gutenberg'
				) }
				initialOpen={ true }
			>
				<ToggleGroupControl
					isBlock
					size="__unstable-large"
					label={ __( 'Alignment', 'directorist-gutenberg' ) }
					onChange={ ( value ) =>
						setAttributes( { alignment: value } )
					}
					__nextHasNoMarginBottom
					value={ attributes.alignment }
				>
					<ToggleGroupControlOption label="Left" value="left" />
					<ToggleGroupControlOption label="Center" value="center" />
					<ToggleGroupControlOption label="Right" value="right" />
				</ToggleGroupControl>
				<ToggleControl
					label={ __(
						'Overlap Avatar on Image',
						'directorist-gutenberg'
					) }
					checked={ attributes.avatar_overlap }
					onChange={ ( value ) =>
						setAttributes( { avatar_overlap: value } )
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
