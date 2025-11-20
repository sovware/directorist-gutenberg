/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { RadioControl, Button } from '@wordpress/components';
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

const TEMPLATE_TYPES = [
	{
		label: __( 'Full Template Pack', 'directorist-gutenberg' ),
		value: 'full',
		description: __(
			'Creates archive layout with grid and list cards in one go.',
			'directorist-gutenberg'
		),
	},
	{
		label: __( 'Archive Template', 'directorist-gutenberg' ),
		value: 'listings-archive',
		description: __(
			'Search bar, filters and listing feed page.',
			'directorist-gutenberg'
		),
	},
	{
		label: __( 'Grid View Template', 'directorist-gutenberg' ),
		value: 'listings-archive-grid-view',
		description: __(
			'Card layout for grid views.',
			'directorist-gutenberg'
		),
	},
	{
		label: __( 'List View Template', 'directorist-gutenberg' ),
		value: 'listings-archive-list-view',
		description: __(
			'Card layout for list view.',
			'directorist-gutenberg'
		),
	},
];

export default function CreateTemplate( { createType, onClose, directoryType } ) {
	const [ selectedTemplateType, setSelectedTemplateType ] = useState( 'full' );
	const [ isCreatingTemplate, setIsCreatingTemplate ] = useState( false );
	const [ loadingProgress, setLoadingProgress ] = useState( 0 );

	// Handle create template
	const handleCreateTemplate = async () => {
		if ( ! directoryType ) {
			console.error( 'Directory type is required' );
			return;
		}

		setIsCreatingTemplate( true );
		setLoadingProgress( 0 );

		try {
			let requestPromise;
			let redirectUrl = null;

			// Use different API based on template type
			if ( selectedTemplateType === 'full' ) {
				// Full template pack - use existing API
				requestPromise = postData( 'admin/templates/create-all', {
					directory_type: directoryType,
					status: 'private',
				} );
			} else {
				// Single template - use new API
				requestPromise = postData( 'admin/templates/create-single', {
					directory_type: directoryType,
					template_type: selectedTemplateType,
					status: 'private',
				} );
			}

			// Create template request, delay 0 to 50%
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

			// Determine redirect URL based on template type
			if ( selectedTemplateType === 'full' ) {
				// For full template pack, redirect to listings-archive
				if (
					response?.created_items?.[ 'listings-archive' ]?.edit_url
				) {
					redirectUrl =
						response.created_items[ 'listings-archive' ].edit_url;
				}
			} else {
				// For single templates, redirect to the created template
				if ( response?.edit_url ) {
					redirectUrl = response.edit_url;
				} else if (
					response?.created_items?.[ selectedTemplateType ]?.edit_url
				) {
					redirectUrl =
						response.created_items[ selectedTemplateType ].edit_url;
				}
			}

			if ( redirectUrl ) {
				window.location.href = redirectUrl;
			} else {
				onClose();
			}
		} catch ( error ) {
			console.error( 'Error creating template:', error );
			setIsCreatingTemplate( false );
			setLoadingProgress( 0 );
		}
	};

	// Render template type selector
	const renderTemplateTypeSelector = () => {
		return (
			<div className="directorist-gutenberg-choose-template-type">
				<h2>
					{ __(
						'Create Listings template',
						'directorist-gutenberg'
					) }
				</h2>
				<p>
					{ __(
						'Create a template for your directory archive, grid view or list view.',
						'directorist-gutenberg'
					) }
				</p>

				<div className="directorist-gutenberg-template-type-options">
					<RadioControl
						selected={ selectedTemplateType }
						options={ TEMPLATE_TYPES.map( ( type ) => ( {
							label: (
								<div className="directorist-gutenberg-template-type-option">
									<div className="directorist-gutenberg-template-type-option-label">
										{ type.label }
									</div>
									<div className="directorist-gutenberg-template-type-option-description">
										{ type.description }
									</div>
								</div>
							),
							value: type.value,
						} ) ) }
						onChange={ setSelectedTemplateType }
					/>
				</div>

				<div className="directorist-gutenberg-create-template-modal-content-actions">
					<Button
						variant="secondary"
						onClick={ onClose }
						className="directorist-gutenberg-create-template-modal-cancel"
					>
						{ __( 'Cancel', 'directorist-gutenberg' ) }
					</Button>
					<Button
						variant="primary"
						onClick={ handleCreateTemplate }
						className="directorist-gutenberg-create-template-modal-confirm"
					>
						{ __( 'Confirm', 'directorist-gutenberg' ) }
					</Button>
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
			{ renderTemplateTypeSelector() }
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
