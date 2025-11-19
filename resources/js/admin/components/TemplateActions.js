/**
 * WordPress dependencies
 */
import { Button, Dropdown } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import ReactSVG from 'react-inlinesvg';

/**
 * Internal dependencies
 */
import { StyledTemplateActions } from '../style';
import { getIconSvgPath } from '@directorist-gutenberg/utils/utils';
import { getDirectories } from '@directorist-gutenberg/gutenberg/localized-data';
import gridIcon from '@icon/grid.svg';
import plusIcon from '@icon/plus-solid.svg';
import chevronDownIcon from '@icon/chevron-down.svg';
import checkIcon from '@icon/check-solid.svg';

// Preload all icons using require.context for webpack
const lineAwesomeIcons = require.context(
	'../../../svg/icons/icon-library/line-awesome',
	false,
	/\.svg$/
);
const fontAwesomeIcons = require.context(
	'../../../svg/icons/icon-library/font-awesome',
	false,
	/\.svg$/
);

// Create icon mapping: maps icon paths to webpack modules
const iconMap = {};

// Helper to extract icon name from require.context key
const extractIconName = ( key ) => key.replace( /^\.\//, '' ).replace( /\.svg$/, '' );

// Map Line Awesome icons
lineAwesomeIcons.keys().forEach( ( key ) => {
	const iconName = extractIconName( key );
	iconMap[ `line-awesome/${ iconName }` ] = lineAwesomeIcons( key );
} );

// Map Font Awesome icons
fontAwesomeIcons.keys().forEach( ( key ) => {
	const iconName = extractIconName( key );
	iconMap[ `font-awesome/${ iconName }` ] = fontAwesomeIcons( key );
} );

// Helper: Update URL query params
const updateQueryParams = ( value ) => {
	if ( ! value ) return;

	const queryParams = new URLSearchParams( window.location.search );
	queryParams.set( 'directory_type', value );
	window.history.pushState(
		{},
		'',
		window.location.pathname + '?' + queryParams.toString()
	);
};

// Helper: Get directory type from URL param
const getDirectoryTypeFromURL = () => {
	const queryParams = new URLSearchParams( window.location.search );
	const urlValue = queryParams.get( 'directory_type' );
	return urlValue ? parseInt( urlValue, 10 ) : null;
};

export default function TemplateActions( {
	onDirectoryTypeChange = () => {},
	onCreateTemplate = () => {},
	onDirectoryTypesReady = () => {}
} ) {
	const [ directoryTypes, setDirectoryTypes ] = useState( [] );
	const [ directoryType, setDirectoryType ] = useState( '' );

	// Initialize directory types and set initial directory type
	useEffect( () => {
		const localizedDirectories = getDirectories();

		if ( localizedDirectories && localizedDirectories.length > 0 ) {
			setDirectoryTypes( localizedDirectories );
			onDirectoryTypesReady( localizedDirectories );

			// Check URL param first
			const urlDirectoryType = getDirectoryTypeFromURL();
			if ( urlDirectoryType ) {
				// Verify the URL param exists in directories
				const directoryExists = localizedDirectories.some(
					( dir ) => dir.value === urlDirectoryType
				);
				if ( directoryExists ) {
					setDirectoryType( urlDirectoryType );
					return;
				}
			}

			// If no URL param, use the directory with is_default: true
			const defaultDirectory = localizedDirectories.find(
				( dir ) => dir.is_default === true
			);
			if ( defaultDirectory ) {
				setDirectoryType( defaultDirectory.value );
			} else {
				// Fallback to first directory
				setDirectoryType( localizedDirectories[ 0 ].value );
			}
		}
	}, [ onDirectoryTypesReady ] );

	// Notify parent when directory type changes
	useEffect( () => {
		if ( directoryType ) {
			onDirectoryTypeChange( directoryType );
			updateQueryParams( directoryType );
		}
	}, [ directoryType, onDirectoryTypeChange ] );

	// Get current directory label
	const currentDirectory = directoryTypes.find(
		( type ) => type?.value === directoryType
	);
	const currentDirectoryLabel = currentDirectory?.label || '';

	const handleDirectorySelect = ( selectedValue ) => {
		setDirectoryType( selectedValue );
	};

    // Helper: Construct SVG URL from icon name and folder
    const getSvgUrlFromIconName = ( iconName, folder ) => {
        if ( typeof gridIcon !== 'string' ) {
            return null;
        }
        // Extract base path from gridIcon: remove filename, keep directory
        const basePath = gridIcon.replace( /\/[^/]+\.svg$/, '' );
        return `${ basePath }/icon-library/${ folder }/${ iconName }.svg`;
    };

    // Helper: Extract icon name from webpack module
    const getIconNameFromModule = ( iconModule ) => {
        if ( ! iconModule ) {
            return null;
        }
        if ( typeof iconModule === 'string' ) {
            return iconModule;
        }
        if ( iconModule.__esModule && iconModule.default ) {
            return iconModule.default;
        }
        return null;
    };

    // Helper: Render icon (SVG or fallback to icon class)
    const renderIcon = ( iconClass, fallbackIcon = gridIcon ) => {
        if ( ! iconClass ) {
            return <ReactSVG src={ fallbackIcon } />;
        }

        const svgPath = getIconSvgPath( iconClass );
        if ( ! svgPath ) {
            return <i className={ iconClass }></i>;
        }

        // Extract icon key: @icon/icon-library/line-awesome/business-time-solid.svg -> line-awesome/business-time-solid
        const iconKey = svgPath.replace( '@icon/icon-library/', '' ).replace( /\.svg$/, '' );
        const iconModule = iconMap[ iconKey ];

        if ( ! iconModule ) {
            return <i className={ iconClass }></i>;
        }

        const iconName = getIconNameFromModule( iconModule );
        if ( ! iconName || typeof iconName !== 'string' ) {
            return <i className={ iconClass }></i>;
        }

        // Determine folder and construct URL
        const folder = iconKey.startsWith( 'line-awesome/' ) ? 'line-awesome' : 'font-awesome';
        const iconFileName = iconKey.replace( `${ folder }/`, '' );
        const iconUrl = getSvgUrlFromIconName( iconFileName, folder );

        if ( iconUrl ) {
            return <ReactSVG src={ iconUrl } />;
        }

        return <i className={ iconClass }></i>;
    };

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
                                { renderIcon( currentDirectory?.icon ) }
                            </div>
                            <div className="directorist-gutenberg-directory-type-name">
                                <span>{ __( 'Selected Directory', 'directorist-gutenberg' ) }</span>
                                <strong>{ currentDirectoryLabel || __( 'Select Directory', 'directorist-gutenberg' ) }</strong>
                            </div>
                            <div className="directorist-gutenberg-templates-types-toggle-icon">
                                <ReactSVG src={ chevronDownIcon } />
                            </div>
                        </div>
                    ) }
                    renderContent={ () => (
                        <div className="directorist-gutenberg-directory-type-popover">
                            <span className="directorist-gutenberg-directory-type-popover-title">
                                { __( 'Switch Directory', 'directorist-gutenberg' ) }
                            </span>
                            <div className="directorist-gutenberg-directory-type-dropdown-items">
                                { directoryTypes.map( ( type ) => {
                                    const isActive = type.value === directoryType;
                                    return (
                                        <div
                                            key={ type.value }
                                            className={ `directorist-gutenberg-directory-type-dropdown-item ${
                                                isActive ? 'active' : ''
                                            }` }
                                            onClick={ () => handleDirectorySelect( type.value ) }
                                        >
                                            { renderIcon( type.icon ) }
                                            <span>{ type.label }</span>
                                            { isActive && (
                                                <span className="directorist-gutenberg-directory-type-dropdown-item-active-icon">
                                                    <ReactSVG src={ checkIcon } />
                                                </span>
                                            ) }
                                        </div>
                                    );
                                } ) }
                            </div>
                        </div>
                    ) }
                />
            </div>
            <div className="directorist-gutenberg-create-template-action">
                <Button
                    variant="primary"
                    onClick={ onCreateTemplate }
                >
                    <ReactSVG src={ plusIcon } />
                    { __(
                        'Create New Template',
                        'directorist-gutenberg'
                    ) }
                </Button>
            </div>
        </StyledTemplateActions>
    );
}