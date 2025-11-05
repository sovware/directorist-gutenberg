/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import IconPicker from '@directorist-gutenberg/gutenberg/components/controls/icon-picker';

export default function Controls( { attributes, setAttributes } ) {
    return (
        <InspectorControls>
            <PanelBody
                title={ __( 'Listings Category Settings', 'directorist-gutenberg' ) }
                initialOpen={ true }
            >
                <IconPicker
                    attr_key="icon"
                    attributes={ attributes }
                    setAttributes={ setAttributes }
                    label={ __( 'Icon', 'directorist-gutenberg-template' ) }
                />
            </PanelBody>
        </InspectorControls>
    );
}