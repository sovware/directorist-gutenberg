import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { SelectControl, Spinner } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const TemplateSettingsPanel = () => {
	const [ directoryTypes, setDirectoryTypes ] = useState( [] );
	const [ isLoading, setIsLoading ] = useState( true );

	const { directoryTypeId, templateType } = useSelect( ( select ) => {
		const meta = select( 'core/editor' ).getEditedPostAttribute( 'meta' ) || {};
		return {
			directoryTypeId: meta.directory_type_id || 0,
			templateType: meta.template_type || '',
		};
	}, [] );

	const { editPost } = useDispatch( 'core/editor' );

	// Update iframe body class based on template_type
	useEffect( () => {
		const updateIframeBodyClass = () => {
			// Find the editor iframe - try multiple selectors
			const iframeSelectors = [
				'iframe[name="editor-canvas"]',
				'iframe.editor-canvas__iframe',
				'.block-editor-iframe__container iframe',
				'iframe.block-editor-iframe__container',
			];

			let iframe = null;
			for ( const selector of iframeSelectors ) {
				iframe = document.querySelector( selector );
				if ( iframe ) break;
			}

			if ( ! iframe ) {
				return false;
			}

			const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
			if ( ! iframeDoc || ! iframeDoc.body ) {
				return false;
			}

			const iframeBody = iframeDoc.body;

			// Remove all existing directorist-gutenberg-* classes
			const classesToRemove = Array.from( iframeBody.classList ).filter( ( className ) =>
				className.startsWith( 'directorist-gutenberg-' )
			);
			classesToRemove.forEach( ( className ) => {
				iframeBody.classList.remove( className );
			} );

			// Add the new class if templateType exists
			if ( templateType ) {
				// Sanitize the template type to match PHP's sanitize_html_class behavior
				const sanitizedType = templateType.toLowerCase().replace( /[^a-z0-9-]/g, '-' );
				const className = 'directorist-gutenberg-' + sanitizedType;
				iframeBody.classList.add( className );
			}

			return true;
		};

		// Try to update immediately
		if ( updateIframeBodyClass() ) {
			return; // Success, no need to set up observers
		}

		// If iframe not found, set up observers and retries
		let retryCount = 0;
		const maxRetries = 50; // Try for ~5 seconds (50 * 100ms)

		const tryUpdate = () => {
			if ( updateIframeBodyClass() ) {
				return; // Success
			}

			retryCount++;
			if ( retryCount < maxRetries ) {
				setTimeout( tryUpdate, 100 );
			}
		};

		// Start trying
		const timeoutId = setTimeout( tryUpdate, 100 );

		// Also watch for iframe addition to DOM
		const observer = new MutationObserver( () => {
			if ( updateIframeBodyClass() ) {
				observer.disconnect();
			}
		} );

		observer.observe( document.body, {
			childList: true,
			subtree: true,
		} );

		// Listen for iframe load events
		const handleIframeLoad = ( event ) => {
			const iframe = event.target;
			if ( iframe.tagName === 'IFRAME' ) {
				setTimeout( () => {
					updateIframeBodyClass();
				}, 50 );
			}
		};

		document.addEventListener( 'load', handleIframeLoad, true );

		return () => {
			clearTimeout( timeoutId );
			observer.disconnect();
			document.removeEventListener( 'load', handleIframeLoad, true );
		};
	}, [ templateType ] );

	// Define template type options
	const templateTypeOptions = [
		{ label: __( 'Select Template Type', 'directorist-gutenberg' ), value: '' },
		{ label: __( 'Listings Archive', 'directorist-gutenberg' ), value: 'listings-archive' },
		{ label: __( 'Listings Archive - Grid View Item', 'directorist-gutenberg' ), value: 'listings-archive-grid-view' },
		{ label: __( 'Listings Archive - List View Item', 'directorist-gutenberg' ), value: 'listings-archive-list-view' },
	];

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

	const handleDirectoryTypeChange = ( value ) => {
		editPost( {
			meta: {
				directory_type_id: parseInt( value, 10 ),
			},
		} );
	};

	const handleTemplateTypeChange = ( value ) => {
		editPost( {
			meta: {
				template_type: value,
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

		<SelectControl
			label={ __( 'Template Type', 'directorist-gutenberg' ) }
			value={ templateType }
			options={ templateTypeOptions }
			onChange={ handleTemplateTypeChange }
		/>
		</PluginDocumentSettingPanel>
	);
};

registerPlugin( 'directorist-gutenberg-template-settings', {
	render: TemplateSettingsPanel,
} );

