/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import ReactSVG from 'react-inlinesvg';

/**
 * Internal dependencies
 */
import { StyledHeader } from '../style';
import logo from '@icon/logo.svg';
import close from '@icon/times.svg';

export default function Header({ onClose }) {
    return (
        <StyledHeader className="directorist-gutenberg-templates-header">
            <div className="directorist-gutenberg-templates-header-logo">
                <ReactSVG src={ logo } />
            </div>
            <div className="directorist-gutenberg-templates-header-title">
                <h1>{ __( 'AI Template Builder', 'directorist-gutenberg' ) }</h1>
            </div>
            <div className="directorist-gutenberg-templates-header-actions">
                { onClose && (
                    <span className="directorist-gutenberg-templates-header-actions-close" onClick={onClose}>
                        <ReactSVG src={ close } />
                    </span>
                ) }
            </div>
        </StyledHeader>
    );
}