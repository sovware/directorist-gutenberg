/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import IconPicker from '@directorist-gutenberg/gutenberg/components/controls/icon-picker';
import { useSubmissionFields } from '@directorist-gutenberg/gutenberg/hooks/useSubmissionFields';

export default function Controls( { attributes, setAttributes } ) {
    const { directoryTypeId, getFieldsOptions } = useSubmissionFields();

    useEffect( () => {
        setAttributes( { directory_type_id: directoryTypeId } );
    }, [ directoryTypeId ] );

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

                <div style={{ height: '16px' }}></div>

                <SelectControl
                    label={ __( 'Select Field', 'directorist-gutenberg' ) }
                    value={ attributes.meta_key }
                    options={ getFieldsOptions( 'custom', 'checkbox' ) }
                    onChange={ ( value ) => setAttributes( { meta_key: value } ) }
                />
            </PanelBody>
        </InspectorControls>
    );
}