import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { ToggleControl, SelectControl, Spinner } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const TemplateSettingsPanel = () => {
	const [ directoryTypes, setDirectoryTypes ] = useState( [] );
	const [ isLoading, setIsLoading ] = useState( true );

	const { isEnabled, directoryTypeId } = useSelect( ( select ) => {
		const meta = select( 'core/editor' ).getEditedPostAttribute( 'meta' ) || {};
		return {
			isEnabled: meta.is_enabled || false,
			directoryTypeId: meta.directory_type_id || 0,
		};
	}, [] );

	const { editPost } = useDispatch( 'core/editor' );

	// Fetch directory types from the taxonomy
	useEffect( () => {
		setIsLoading( true );
		
		// Fetch all directory types (per_page=-1 gets all results)
		apiFetch( {
			path: '/wp/v2/atbdp_listing_types?per_page=-1&orderby=name&order=asc',
		} )
			.then( ( terms ) => {
				const options = [
					{ label: __( 'Select Directory Type', 'directorist-gutenberg' ), value: 0 },
					...terms.map( ( term ) => ( {
						label: term.name,
						value: term.id,
					} ) ),
				];
				setDirectoryTypes( options );
				setIsLoading( false );
			} )
			.catch( ( error ) => {
				console.error( 'Error fetching directory types:', error );
				setDirectoryTypes( [
					{ label: __( 'Error loading directory types', 'directorist-gutenberg' ), value: 0 },
				] );
				setIsLoading( false );
			} );
	}, [] );

	const handleToggle = ( value ) => {
		editPost( {
			meta: {
				is_enabled: value,
			},
		} );
	};

	const handleDirectoryTypeChange = ( value ) => {
		editPost( {
			meta: {
				directory_type_id: parseInt( value, 10 ),
			},
		} );
	};

	return (
		<PluginDocumentSettingPanel
			name="template-settings-panel"
			title={ __( 'Template Settings', 'directorist-gutenberg' ) }
			className="template-settings-panel"
		>
		{ isLoading ? (
			<Spinner />
		) : (
			<SelectControl
				label={ __( 'Directory Type', 'directorist-gutenberg' ) }
				value={ directoryTypeId }
				options={ directoryTypes }
				onChange={ handleDirectoryTypeChange }
				disabled={ directoryTypeId ? true : false }
			/>
		) }

		<div style={ { marginTop: '16px' } } />

		<ToggleControl
			label={ __( 'Enable the template', 'directorist-gutenberg' ) }
			checked={ isEnabled }
			onChange={ handleToggle }
		/>
		</PluginDocumentSettingPanel>
	);
};

registerPlugin( 'directorist-gutenberg-template-settings', {
	render: TemplateSettingsPanel,
} );

