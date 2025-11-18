/**
 * WordPress dependencies
 */
import { Dropdown, Button } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

/**
 * External dependencies
 */
import ReactSVG from 'react-inlinesvg';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { getLocalizedBlockDataByKey } from '@directorist-gutenberg/gutenberg/localized-data';
import ChevronDownIcon from '@icon/chevron-down.svg';
import CheckSolid from '@icon/check-solid.svg';
import GridIcon from '@icon/grid.svg';

export default function ToggleViewsDropdown() {
	const templateLinks = getLocalizedBlockDataByKey( 'template_links' ) || [];

	// Find the current template
	const currentTemplate = templateLinks.find(
		( template ) => template.is_current === true
	);
	const currentViewTitle = currentTemplate
		? currentTemplate.title
		: __( 'View', 'directorist-gutenberg' );

	return (
		<Dropdown
			className="directorist-gutenberg-toggle-views-dropdown"
			contentClassName="directorist-gutenberg-toggle-views-dropdown-content"
			popoverProps={ { placement: 'bottom-end' } }
			renderToggle={ ( { isOpen, onToggle } ) => (
				<Button
					variant="tertiary"
					onClick={ onToggle }
					aria-expanded={ isOpen }
				>
					<ReactSVG src={ GridIcon } />
					<span>
						{ sprintf(
							__( 'Edit %s', 'directorist-gutenberg' ),
							currentViewTitle
						) }
					</span>
					<ReactSVG src={ ChevronDownIcon } />
				</Button>
			) }
			renderContent={ () => (
				<div>
					{ templateLinks.map( ( template ) => (
						<a
							key={ template.id }
							href={ template.url }
							className={ clsx(
								'directorist-gutenberg-toggle-views-dropdown-item',
								{
									'directorist-gutenberg-toggle-views-dropdown-item-current':
										template.is_current,
								}
							) }
						>
							<span>{ template.title }</span>
							{ template.is_current && (
								<ReactSVG src={ CheckSolid } />
							) }
						</a>
					) ) }
				</div>
			) }
		/>
	);
}
