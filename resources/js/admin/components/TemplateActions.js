/**
 * WordPress dependencies
 */
import { Button, Dropdown } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import ReactSVG from 'react-inlinesvg';

/**
 * Internal dependencies
 */
import { StyledTemplateActions } from '../style';
import gridIcon from '@icon/grid.svg';
import plusIcon from '@icon/plus-solid.svg';
import chevronDownIcon from '@icon/chevron-down.svg';

export default function TemplateActions() {
    return (
        <StyledTemplateActions className="directorist-gutenberg-templates-actions">
            <div className="directorist-gutenberg-directory-type-switch">
                <Dropdown
                    className="directorist-gutenberg-directory-type-dropdown"
                    contentClassName="directorist-gutenberg-directory-type-dropdown-content"
                    popoverProps={ { placement: 'bottom-start' } }
                    renderToggle={ ( { isOpen, onToggle } ) => (
                    <div
                        className="directorist-gutenberg-directory-type-button"
                        onClick={ onToggle }
                        aria-expanded={ isOpen }
                    >
                        <div className="directorist-gutenberg-directory-type-icon">
                            <ReactSVG src={ gridIcon } />
                        </div>
                        <div className="directorist-gutenberg-directory-type-name">
                            <span>All Templates</span>
                            <strong>Classified Ads</strong>
                        </div>
                        <div className="directorist-gutenberg-templates-types-toggle-icon">
                            <ReactSVG src={ chevronDownIcon } />
                        </div>
                    </div>
                    ) }
                    renderContent={ () =>
                        <div className="directorist-gutenberg-directory-type-popover">
                            <span>Switch Directory</span>
                            <div className="directorist-gutenberg-directory-type-dropdown-items">
                                <div className="directorist-gutenberg-directory-type-dropdown-item">
                                    <ReactSVG src={ gridIcon } />
                                    <span>Classified Ads</span>
                                </div>
                                <div className="directorist-gutenberg-directory-type-dropdown-item">
                                    <ReactSVG src={ gridIcon } />
                                    <span>Listings</span>
                                </div>
                                <div className="directorist-gutenberg-directory-type-dropdown-item">
                                    <ReactSVG src={ gridIcon } />
                                    <span>Map</span>
                                </div>
                            </div>
                        </div>
                    }
                />
            </div>

            <div className="directorist-gutenberg-create-template-action">
                <Button
                    variant="primary"
                    onClick={ () =>{} }
                >
                    <ReactSVG src={ plusIcon } />
                    { __(
                        'Create New Template',
                        'directorist-gutenberg'
                    ) }
                </Button>
            </div>
        </StyledTemplateActions>
    )
}