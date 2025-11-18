/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { SelectControl, Button } from '@wordpress/components';
import fetchData from '@directorist-gutenberg/helper/fetchData';
import postData from '@directorist-gutenberg/helper/postData';

/**
 * External dependencies
 */
import ReactSVG from 'react-inlinesvg';

/**
 * Internal dependencies
 */
import Header from './Header';
import aiFeelIcon from '@icon/ai-feel.svg';
import plusIcon from '@icon/plus-solid.svg';
import { StyledModalContents } from '../style';
import {
	animateProgress,
	createDelay,
} from '@directorist-gutenberg/utils/utils';

/**
 * Constants
 */
const PROGRESS_DURATION = 1000; // 1 seconds
const DELAY_DURATION = 1000; // 1 seconds

export default function CreateTemplate( { createType, onClose, directoryTypes } ) {
	const [ directoryType, setDirectoryType ] = useState( '' );
	const [ isCreatingTemplate, setIsCreatingTemplate ] = useState( false );
	const [ loadingProgress, setLoadingProgress ] = useState( 0 );

    useEffect( () => {
        setDirectoryType( directoryTypes[ 0 ].value );
    }, [ directoryTypes ] );

	// Handle directory type change
	const handleDirectoryTypeChange = ( value ) => {
		setDirectoryType( value );
	};

	// Handle create template
	const handleCreateTemplate = async () => {
		setIsCreatingTemplate( true );
		setLoadingProgress( 0 );

		try {
			// Create template request, delay 0 to 50%
			const requestPromise = postData( 'admin/templates/create-all', {
				directory_type: directoryType,
				status: 'private',
			} );
			const progressPromise = animateProgress(
				setLoadingProgress,
				0,
				50,
				PROGRESS_DURATION
			);
			const [ response ] = await Promise.all( [
				requestPromise,
				progressPromise,
			] );
			console.log( 'Template creation success:', response );
			setLoadingProgress( 50 );

			// Delay 50% to 80%
			const delay1Promise = createDelay( DELAY_DURATION );
			const progress1Promise = animateProgress(
				setLoadingProgress,
				50,
				80,
				PROGRESS_DURATION
			);
			await Promise.all( [ delay1Promise, progress1Promise ] );

			// Delay 80% to 100%
			const delay2Promise = createDelay( DELAY_DURATION );
			const progress2Promise = animateProgress(
				setLoadingProgress,
				80,
				100,
				PROGRESS_DURATION
			);
			await Promise.all( [ delay2Promise, progress2Promise ] );

			setLoadingProgress( 100 );

			// Redirect to listings-archive edit URL
			if (
				response?.created_items?.[ 'listings-archive' ]?.edit_url
			) {
				window.location.href =
					response.created_items[ 'listings-archive' ].edit_url;
			} else {
				onClose();
			}
		} catch ( error ) {
			console.error( 'Error creating template:', error );
			setIsCreatingTemplate( false );
			setLoadingProgress( 0 );
		}
	};

	// Render directory type selector
	const renderDirectoryTypeSelector = () => {
		if ( createType !== 'all' ) {
			return (
				<span>
					{ __( 'Select a template type', 'directorist-gutenberg' ) }
				</span>
			);
		}

		return (
			<div className="directorist-gutenberg-choose-directory-type">
				<h2>
					{ __(
						'Create a new directory template',
						'directorist-gutenberg'
					) }
				</h2>
				<p>
					{ __(
						"Choose your directory type - we'll generate the base templates for you.",
						'directorist-gutenberg'
					) }
				</p>

				<div className="directorist-gutenberg-choose-directory-type-options">
					<h3>
						{ __( 'Select Directory', 'directorist-gutenberg' ) }
					</h3>
					<SelectControl
						value={ directoryType }
						onChange={ handleDirectoryTypeChange }
						options={ directoryTypes }
					/>
				</div>
			</div>
		);
	};

	// Render loading state
	const renderLoadingState = () => (
		<div className="directorist-gutenberg-create-template-modal-content-loading">
			<ReactSVG src={ aiFeelIcon } />
			<h2>
				{ __(
					'Please wait, your template is creating',
					'directorist-gutenberg'
				) }
			</h2>
			<span
				className="directorist-gutenberg-loading-progress"
				style={ {
					'--directorist-gutenberg-loading-progress': `${ loadingProgress }%`,
				} }
			/>
		</div>
	);

	// Render form content
	const renderFormContent = () => (
		<>
			{ renderDirectoryTypeSelector() }
			<div className="directorist-gutenberg-create-template-modal-content-actions">
				<Button variant="primary" onClick={ handleCreateTemplate }>
					<ReactSVG src={ plusIcon } />
					{ __( 'Start Creating Template', 'directorist-gutenberg' ) }
				</Button>
				<span>
					{ __(
						'Each template can be edited in Gutenberg and enhanced using AI-assisted design conversation.',
						'directorist-gutenberg'
					) }
				</span>
			</div>
		</>
	);

	return (
		<StyledModalContents>
			<Header onClose={ onClose } />
			<div className="directorist-gutenberg-create-template-modal-content">
				{ isCreatingTemplate
					? renderLoadingState()
					: renderFormContent() }
			</div>
		</StyledModalContents>
	);
}
