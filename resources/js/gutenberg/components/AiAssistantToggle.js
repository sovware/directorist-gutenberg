/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import ReactSVG from 'react-inlinesvg';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import aiStarIcon from '@icon/ai-star.svg';

export default function AiAssistantToggle() {
	const handleClick = () => {
		// Dispatch custom event to open/close the chat panel
		window.dispatchEvent( new CustomEvent( 'directorist-ai-assistant-toggle' ) );
	};

	return (
		<Button
			className="directorist-gutenberg-ai-assistant-toggle"
			onClick={ handleClick }
		>
			<ReactSVG width={ 24 } height={ 24 } src={ aiStarIcon } />
			<span>
				{ __( 'AI Assistant', 'directorist-gutenberg' ) }
			</span>
		</Button>
	);
}
