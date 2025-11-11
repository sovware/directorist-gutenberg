/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import useArchiveBlockCommonTask from '@directorist-gutenberg/gutenberg/hooks/useArchiveBlockCommonTask';

export default function Controls( { attributes, setAttributes } ) {

	useArchiveBlockCommonTask( { setAttributes } );

    return (
        <InspectorControls>
            <PanelBody
                title={ __( 'Listings Archive Settings', 'directorist-gutenberg' ) }
                initialOpen={ true }
            >
				<TextControl
					label={ __( 'Filters Text', 'directorist-gutenberg' ) }
					value={ attributes.filters_text }
					onChange={ ( value ) => setAttributes( { filters_text: value } ) }
				/>

				<TextControl
					label={ __( 'Reset Text', 'directorist-gutenberg' ) }
					value={ attributes.reset_text }
					onChange={ ( value ) => setAttributes( { reset_text: value } ) }
				/>
            </PanelBody>
        </InspectorControls>
    );
}