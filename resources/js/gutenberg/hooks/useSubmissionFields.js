/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { getSubmissionFormFields } from '@directorist-gutenberg/gutenberg/localized-data';

export const useSubmissionFields = () => {
	const fields = getSubmissionFormFields();

    function getFieldsOptions( type, name ) {
        const options = [
            {
                value: '',
                label: __( 'Select...', 'directorist-gutenberg' ),
            },
        ];

        for ( const field of Object.values( fields ) ) {
            if ( field.widget_group === type && field.widget_name === name ) {
                options.push( {
                    value: field.field_key,
                    label: field.label,
                } );
            }
        }

        return options;
    }

    function doesPresetFieldExist( name ) {
        for ( const field of Object.values( fields ) ) {
            if ( field.widget_group === 'preset' && field.widget_name === name ) {
                return true;
            }
        }

        return false;
    }

    function doesCustomFieldExist( name, fieldKey ) {
        for ( const field of Object.values( fields ) ) {
            if ( field.widget_group === 'custom' && field.widget_name === name && field.field_key === fieldKey ) {
                return true;
            }
        }

        return false;
    }

    return {
        fields,
        doesPresetFieldExist,
        doesCustomFieldExist,
        getFieldsOptions,
    };
};