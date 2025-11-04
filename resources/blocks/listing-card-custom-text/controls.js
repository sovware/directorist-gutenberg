/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { getSubmissionFormFields } from '@directorist-gutenberg/gutenberg/localized-data';
import IconPicker from '@directorist-gutenberg/gutenberg/components/controls/icon-picker';

export default function Controls( { attributes, setAttributes } ) {
    const submissionFields = getSubmissionFormFields();

    let customTextFields = [
        {
            value: '',
            label: __( 'Select...', 'directorist-gutenberg' ),
        },
    ];
    
    for ( const field of Object.values( submissionFields ) ) {
        if ( field.widget_group === 'custom' && field.widget_name === 'text' ) {
            customTextFields.push( {
                value: field.field_key,
                label: field.label,
            } );
        }
    }

    return (
        <InspectorControls>
            <PanelBody
                title={ __( 'Listings Custom Text Settings', 'directorist-gutenberg' ) }
                initialOpen={ true }
            >
                <IconPicker
                    attr_key="icon"
                    attributes={ attributes }
                    setAttributes={ setAttributes }
                    label={ __( 'Icon', 'directorist-gutenberg-template' ) }
                />

                <div style={{ height: '16px' }}></div>

                <SelectControl
                    label={ __( 'Select Field', 'directorist-gutenberg' ) }
                    value={ attributes.meta_key }
                    options={ customTextFields }
                    onChange={ ( value ) => setAttributes( { meta_key: value } ) }
                />
            </PanelBody>
        </InspectorControls>
    );
}