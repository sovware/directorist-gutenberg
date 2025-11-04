/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { ToggleControl, RadioControl } from '@wordpress/components';
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
                title={ __( 'Listings Posted Date Settings', 'directorist-gutenberg' ) }
                initialOpen={ true }
            >
                <IconPicker
                    attr_key="icon"
                    attributes={ attributes }
                    setAttributes={ setAttributes }
                    label={ __( 'Icon', 'directorist-gutenberg-template' ) }
                />
                <RadioControl
                    label={ __( 'Date Type', 'directorist-gutenberg' ) }
                    options={ [
                        { label: __( 'Posted Date', 'directorist-gutenberg' ), value: 'posted_date' },
                        { label: __( 'Days Ago', 'directorist-gutenberg' ), value: 'days_ago' },
                    ] }
                    onChange={ ( value ) => setAttributes( { date_type: value } ) }
                    selected={ attributes.date_type }
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