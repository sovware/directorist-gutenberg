/**
 * WordPress dependencies
 */
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import clsx from 'clsx';

const widthOptions = [
	{ label: __( '100%', 'directorist-gutenberg' ), value: '100' },
	{ label: __( '75%', 'directorist-gutenberg' ), value: '75' },
	{ label: __( '67%', 'directorist-gutenberg' ), value: '67' },
	{ label: __( '50%', 'directorist-gutenberg' ), value: '50' },
	{ label: __( '33%', 'directorist-gutenberg' ), value: '33.33' },
	{ label: __( '25%', 'directorist-gutenberg' ), value: '25' },
];

export default function WidthControls( { attributes, setAttributes } ) {
	return (
		<BlockControls>
			<ToolbarGroup className="directorist-gutenberg-toolbar">
				{ widthOptions.map( ( { label, value } ) => (
					<ToolbarButton
						key={ value }
						variant="secondary"
						className={ clsx( {
							'is-selected': attributes.block_width === value,
						} ) }
						onClick={ () =>
							setAttributes( { block_width: value } )
						}
					>
						<span>{ label }</span>
					</ToolbarButton>
				) ) }
			</ToolbarGroup>
		</BlockControls>
	);
}
