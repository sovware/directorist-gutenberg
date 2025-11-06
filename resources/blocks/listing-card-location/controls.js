/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';
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
                title={ __( 'Listings Location Settings', 'directorist-gutenberg' ) }
                initialOpen={ true }
            >
                <IconPicker
                    attr_key="icon"
                    attributes={ attributes }
                    setAttributes={ setAttributes }
                    label={ __( 'Icon', 'directorist-gutenberg' ) }
                />
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