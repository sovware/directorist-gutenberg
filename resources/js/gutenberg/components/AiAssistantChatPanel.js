/**
 * WordPress dependencies
 */
import { Button, TextareaControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import ReactSVG from 'react-inlinesvg';

/**
 * Internal dependencies
 */
import aiStarIcon from '@icon/ai-star-alt.svg';
import closeIcon from '@icon/times.svg';
import arrowRightIcon from '@icon/arrow-right.svg';
import { StyledChatPanel } from './style';
import cube from '@icon/cube.svg';
import gridIcon from '@icon/grid-bar.svg';
import documentIcon from '@icon/document-text.svg';
import star from '@icon/star.svg';
import minusIcon from '@icon/minus.svg';
import aiCreditIcon from '@icon/ai-credit.svg';

export default function AiAssistantChatPanel() {
	const [ isOpen, setIsOpen ] = useState( false );
	const [ inputValue, setInputValue ] = useState( '' );

	const togglePanel = () => {
		setIsOpen( ! isOpen );
	};

	const suggestedActions = [
		{
			id: 'hover-shadow',
			label: __( 'Add subtle hover shadow', 'directorist-gutenberg' ),
			icon: 'cube',
		},
		{
			id: 'cards-per-row',
			label: __( 'Make cards 3 per row with rounded corners', 'directorist-gutenberg' ),
			icon: 'grid',
		},
		{
			id: 'title-on-hover',
			label: __( 'Show listing titles on hover', 'directorist-gutenberg' ),
			icon: 'document',
		},
		{
			id: 'price-above-rating',
			label: __( 'Move price above rating', 'directorist-gutenberg' ),
			icon: 'star',
		},
	];

	return (
		<StyledChatPanel className="directorist-gutenberg-ai-assistant-chat-panel">
			{ ! isOpen && (
				<Button
					className="directorist-gutenberg-ai-assistant-chat-toggle"
					onClick={ togglePanel }
					aria-label={ __( 'Open AI Assistant', 'directorist-gutenberg' ) }
				>
					<ReactSVG width={ 24 } height={ 24 } src={ aiStarIcon } />
				</Button>
			) }

			{ isOpen && (
				<div className="directorist-gutenberg-ai-assistant-chat-panel-content">
                    {/* Header */}
                    <div className="directorist-gutenberg-ai-assistant-chat-header">
                        <div className="directorist-gutenberg-ai-assistant-chat-header-left">
                            <Button
                                className="directorist-gutenberg-ai-assistant-chat-close"
                                onClick={ togglePanel }
                                aria-label={ __( 'Close', 'directorist-gutenberg' ) }
                            >
                                <ReactSVG width={ 16 } height={ 16 } src={ closeIcon } />
                            </Button>
                            <h3 className="directorist-gutenberg-ai-assistant-chat-title">
                                { __( 'AI Assistant', 'directorist-gutenberg' ) }
                            </h3>
                        </div>
                        <Button
                            className="directorist-gutenberg-ai-assistant-chat-minimize"
                            onClick={ togglePanel }
                            aria-label={ __( 'Minimize', 'directorist-gutenberg' ) }
                        >
                            <ReactSVG width={ 16 } height={ 16 } src={ minusIcon } />
                        </Button>
                    </div>
					<div className="directorist-gutenberg-ai-assistant-chat-content">
                        {/* Greeting Section */}
                        <div className="directorist-gutenberg-ai-assistant-chat-greeting">
                            <div className="directorist-gutenberg-ai-assistant-chat-greeting-icon">
                                <ReactSVG width={ 48 } height={ 48 } src={ aiStarIcon } />
                            </div>
                            <div className="directorist-gutenberg-ai-assistant-chat-greeting-text">
                                <h4 className="directorist-gutenberg-ai-assistant-chat-greeting-title">
                                    { __( "Hi, I'm your AI Design Assistant", 'directorist-gutenberg' ) }
                                </h4>
                                <p className="directorist-gutenberg-ai-assistant-chat-greeting-description">
                                    { __( 'Tell me what you want your All Listings to look. You can attach a screenshot for vives.', 'directorist-gutenberg' ) }
                                </p>
                            </div>
                        </div>

                        {/* Suggested Actions */}
                        <div className="directorist-gutenberg-ai-assistant-chat-suggestions">
                            { suggestedActions.map( ( action ) => (
                                <span
                                    key={ action.id }
                                    className="directorist-gutenberg-ai-assistant-chat-suggestion-button"
                                    onClick={ () => {
                                        setInputValue( action.label );
                                    } }
                                >
                                    <span className="directorist-gutenberg-ai-assistant-chat-suggestion-icon">
                                        { action.icon === 'cube' && (
                                            <ReactSVG width={ 20 } height={ 20 } src={ cube } />
                                        ) }
                                        { action.icon === 'grid' && (
                                            <ReactSVG width={ 20 } height={ 20 } src={ gridIcon } />
                                        ) }
                                        { action.icon === 'document' && (
                                            <ReactSVG width={ 20 } height={ 20 } src={ documentIcon } />
                                        ) }
                                        { action.icon === 'star' && (
                                            <ReactSVG width={ 20 } height={ 20 } src={ star } />
                                        ) }
                                    </span>
                                    <span className="directorist-gutenberg-ai-assistant-chat-suggestion-label">
                                        { action.label }
                                    </span>
                                </span>
                            ) ) }
                        </div>

                        {/* Conversation Area */}
                        <div className="directorist-gutenberg-ai-assistant-chat-conversation-area">
                            <div className="directorist-gutenberg-ai-assistant-chat-conversation-area-item">
                                <div className="directorist-gutenberg-ai-assistant-chat-icon">
                                    <ReactSVG width={ 20 } height={ 20 } src={ aiStarIcon } />
                                </div>
                                <div className="directorist-gutenberg-ai-assistant-chat-text">
                                    <span className="directorist-gutenberg-ai-assistant-chat-text-role">Ai Assistant</span>
                                    <span className="directorist-gutenberg-ai-assistant-chat-text-content">
                                        { __( 'Hello, how can I help you today?', 'directorist-gutenberg' ) }
                                    </span>
                                </div>
                            </div>
                            <div className="directorist-gutenberg-ai-assistant-chat-conversation-area-item">
                                <div className="directorist-gutenberg-ai-assistant-chat-icon">
                                    <ReactSVG width={ 20 } height={ 20 } src={ aiStarIcon } />
                                </div>
                                <div className="directorist-gutenberg-ai-assistant-chat-text">
                                    <span className="directorist-gutenberg-ai-assistant-chat-text-role">User Name</span>
                                    <span className="directorist-gutenberg-ai-assistant-chat-text-content">
                                        { __( 'The goal is to replace the current Vue-based directory builder with a fully WordPress-native, scalable, and flexible experience that feels like part of Gutenberg rather than a separate interface.', 'directorist-gutenberg' ) }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

					{/* Input Field */}
					<div className="directorist-gutenberg-ai-assistant-chat-input-wrapper">
						<TextareaControl
							className="directorist-gutenberg-ai-assistant-chat-input"
							value={ inputValue }
							onChange={ setInputValue }
							placeholder={ __( 'Ask for changes', 'directorist-gutenberg' ) }
							rows={ 3 }
						/>
						<div className="directorist-gutenberg-ai-assistant-chat-input-actions">
							<Button
								className="directorist-gutenberg-ai-assistant-chat-send"
								aria-label={ __( 'Send', 'directorist-gutenberg' ) }
								disabled={ ! inputValue.trim() }
							>
								<ReactSVG width={ 20 } height={ 20 } src={ arrowRightIcon } />
							</Button>
						</div>
					</div>

					{/* Footer */}
					<div className="directorist-gutenberg-ai-assistant-chat-footer">
						<span className="directorist-gutenberg-ai-assistant-chat-footer-text">
							{ __( 'Generation:', 'directorist-gutenberg' ) }
						</span>
						<span className="directorist-gutenberg-ai-assistant-chat-footer-credits">
							<ReactSVG width={ 16 } height={ 16 } src={ aiCreditIcon } />
							<span>0 { __( 'credits', 'directorist-gutenberg' ) }</span>
						</span>
					</div>
				</div>
			) }
		</StyledChatPanel>
	);
}
