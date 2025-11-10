/**
 * WordPress dependencies
 */
import { useState, useMemo, useRef, useEffect, useCallback } from '@wordpress/element';
import { Button, Modal, SearchControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import ReactSVG from 'react-inlinesvg';

/**
 * Internal dependencies
 */
import { getIconUrl as getIconUrlFromPath } from '../../utils/icon-url';
import { IconPickerStyle } from '../style';
import { allIcons } from './icon-manifest';
import times from '@icon/times.svg';
import './icon-picker.scss';

// Get icon URL from icon object
function getIconUrl(icon) {
	const iconPath = `${icon.set === 'fa' ? 'font-awesome' : 'line-awesome'}/${icon.name}.svg`;
	return getIconUrlFromPath(iconPath);
}

// Filter icons by set
function getIconsBySet(set) {
	return allIcons.filter(icon => icon.set === set);
}

const fontAwesomeIcons = getIconsBySet('fa');
const lineAwesomeIcons = getIconsBySet('la');

// Number of icons to load per batch
const ICONS_PER_PAGE = 20;

// Lazy-loaded icon component that only loads SVG when visible
function LazyIcon({ icon, isSelected, onSelect, iconUrl }) {
	const [shouldLoad, setShouldLoad] = useState(false);
	const iconRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setShouldLoad(true);
					observer.disconnect();
				}
			},
			{ rootMargin: '50px' }
		);

		if (iconRef.current) {
			observer.observe(iconRef.current);
		}

		return () => observer.disconnect();
	}, []);

	const handleClick = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		if (!isSelected) {
			onSelect(icon);
		}
	}, [icon, isSelected, onSelect]);

	return (
		<div
			ref={iconRef}
			className={`directorist-gutenberg-icon-picker-icon ${
				isSelected ? 'is-selected' : ''
			}`}
			onClick={handleClick}
		>
			<div className="directorist-gutenberg-icon-picker-icon-svg">
				{shouldLoad ? (
					<ReactSVG src={iconUrl} />
				) : (
					<div className="directorist-gutenberg-icon-picker-icon-placeholder" />
				)}
			</div>
			<div className="directorist-gutenberg-icon-picker-icon-name">
				{icon.displayName}
			</div>
		</div>
	);
}

export default function IconPicker({ attr_key, attributes, setAttributes, label }) {
	const [ isOpen, setOpen ] = useState(false);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ selectedIconSet, setSelectedIconSet ] = useState('fa');
	const [ visibleCount, setVisibleCount ] = useState(ICONS_PER_PAGE);
    const [ activeIcon, setActiveIcon ] = useState(null);
    const [ currentSelectedIcon, setCurrentSelectedIcon ] = useState(null);
	const iconsContainerRef = useRef(null);
	const isLoadingRef = useRef(false);

	const openModal = () => {
		// Set selectedIconSet based on currentIcon if it exists
		if (currentIcon) {
			const iconSet = currentIcon.includes('font-awesome') ? 'fa' :
			               currentIcon.includes('line-awesome') ? 'la' :
			               'fa'; // default to 'fa'
			setSelectedIconSet(iconSet);
		}
		setOpen(true);
		setVisibleCount(ICONS_PER_PAGE); // Reset to initial count when opening
	};

	const closeModal = () => {
		setOpen(false);
		setSearchTerm('');
		setVisibleCount(ICONS_PER_PAGE);
	};

	const currentIcon = attributes[attr_key] || null;

	// Detect icon set from currentIcon path and set selectedIconSet accordingly
	useEffect(() => {
		if (currentIcon) {
			const iconSet = currentIcon.includes('font-awesome') ? 'fa' :
			               currentIcon.includes('line-awesome') ? 'la' :
			               'fa'; // default to 'fa'
			setSelectedIconSet(iconSet);
		}
	}, [currentIcon]);

	// Filter icons based on selected set and search term
	const filteredIcons = useMemo(() => {
		let icons = selectedIconSet === 'fa' ? fontAwesomeIcons : lineAwesomeIcons;

		if (searchTerm) {
			const searchLower = searchTerm.toLowerCase();
			icons = icons.filter((icon) =>
				icon.name.toLowerCase().includes(searchLower) ||
				icon.displayName.toLowerCase().includes(searchLower)
			);
		}

		return icons;
	}, [selectedIconSet, searchTerm]);

	// Reset visible count when filters change
	useEffect(() => {
		setVisibleCount(ICONS_PER_PAGE);
	}, [selectedIconSet, searchTerm]);

	// Get visible icons (pagination)
	const visibleIcons = useMemo(() => {
		return filteredIcons.slice(0, visibleCount);
	}, [filteredIcons, visibleCount]);

	// Handle scroll to load more icons
	const handleScroll = useCallback((e) => {
		const container = e.target;
		const scrollBottom = container.scrollHeight - container.scrollTop - container.clientHeight;

		// Load more when within 100px of bottom
		if (scrollBottom < 100 && !isLoadingRef.current && visibleCount < filteredIcons.length) {
			isLoadingRef.current = true;
			setTimeout(() => {
				setVisibleCount((prev) => Math.min(prev + ICONS_PER_PAGE, filteredIcons.length));
				isLoadingRef.current = false;
			}, 100);
		}
	}, [filteredIcons.length, visibleCount]);

	const handleIconSelect = useCallback((icon) => {
		const iconPath = icon.set === 'fa'
			? `font-awesome/${icon.name}.svg`
			: `line-awesome/${icon.name}.svg`;

        setCurrentSelectedIcon(iconPath);
        setActiveIcon(icon);
	}, []);

    const handleSelectionDone = useCallback(() => {
        setAttributes({
            [attr_key]: currentSelectedIcon,
        });
        closeModal();
    }, [currentSelectedIcon, attr_key, setAttributes]);

	const handleIconRemove = () => {
		setCurrentSelectedIcon(null);
		setActiveIcon(null);
		setAttributes({
			[attr_key]: '',
		});
	};

	// Get the currently selected icon for preview
	const selectedIconData = useMemo(() => {
		if (!currentIcon) return null;

		const iconPathParts = currentIcon.split('/');
		const iconFileName = iconPathParts[iconPathParts.length - 1];
		const iconName = iconFileName.replace('.svg', '');
		const iconSet = currentIcon.includes('font-awesome') ? 'fa' : 'la';

        setActiveIcon(allIcons.find(
			(icon) => icon.name === iconName && icon.set === iconSet
		));

		return allIcons.find(
			(icon) => icon.name === iconName && icon.set === iconSet
		);
	}, [currentIcon]);

	return (
		<IconPickerStyle className="directorist-gutenberg-icon-picker">
			{label && (
				<div className="directorist-gutenberg-control-label">
					{label}
				</div>
			)}
			<div className="directorist-gutenberg-icon-picker-preview">
				{selectedIconData ? (
					<div className="directorist-gutenberg-icon-picker-preview-content">
						<div className="directorist-gutenberg-icon-picker-preview-icon">
							<ReactSVG src={getIconUrl(selectedIconData)} />
						</div>
						<div className="directorist-gutenberg-icon-picker-preview-name">
							{selectedIconData.displayName}
						</div>
						<span
							onClick={handleIconRemove}
							className="directorist-gutenberg-icon-picker-reset"
						>
							<ReactSVG src={times} />
						</span>
						<span
							className="directorist-gutenberg-icon-picker-change"
							onClick={openModal}
						>
							{__('Change', 'directorist-gutenberg')}
						</span>
					</div>
				) : (
					<div className="directorist-gutenberg-icon-picker-preview-empty"
						onClick={openModal}
					>
						<span>{__('No icon selected', 'directorist-gutenberg')}</span>
						<span
							className="directorist-gutenberg-icon-picker-change"
						>
							{__('Select Icon', 'directorist-gutenberg')}
						</span>
					</div>
				)}
			</div>

			{isOpen && (
				<Modal
					onRequestClose={closeModal}
					size="large"
					className="directorist-gutenberg-icon-picker-modal"
                    __experimentalHideHeader

				>
					<div className="directorist-gutenberg-icon-picker-content">
						<div className="directorist-gutenberg-icon-picker-sidebar">
							<div className="directorist-gutenberg-icon-picker-search">
								<SearchControl
									value={searchTerm}
									onChange={setSearchTerm}
									placeholder={__('Search Icons...', 'directorist-gutenberg')}
								/>
							</div>
							<div className="directorist-gutenberg-icon-picker-filter">
								<select
									value={selectedIconSet}
									onChange={(e) => setSelectedIconSet(e.target.value)}
									className="components-select-control__input"
								>
									<option value="fa">{__('Font Awesome', 'directorist-gutenberg')}</option>
									<option value="la">{__('Line Awesome', 'directorist-gutenberg')}</option>
								</select>
							</div>
							<div className="directorist-gutenberg-icon-picker-info">
								<p>
									{__('Total Icons:', 'directorist-gutenberg')}{' '}
									<strong>{filteredIcons.length}</strong>
								</p>
							</div>
                            {/* Active and Hovered Icon Preview */}
							{activeIcon && (
								<div className="directorist-gutenberg-icon-picker-preview-panel">
									<div className="directorist-gutenberg-icon-picker-preview-icon">
										<ReactSVG src={getIconUrl(activeIcon)} />
									</div>
									<div className="directorist-gutenberg-icon-picker-preview-name">
										{activeIcon?.displayName }
									</div>
									<div className="directorist-gutenberg-icon-picker-preview-path">
										<code>{activeIcon?.name}</code>
									</div>
								</div>
							)}
							<div className="directorist-gutenberg-icon-picker-done">
								<Button variant="primary" onClick={handleSelectionDone}>
									{__('Done', 'directorist-gutenberg')}
								</Button>
							</div>
						</div>
						<div className="directorist-gutenberg-icon-picker-main">
							<div className="directorist-gutenberg-icon-picker-header">
								<h2>
									{selectedIconSet === 'fa'
										? __('Font Awesome Icons', 'directorist-gutenberg')
										: __('Line Awesome Icons', 'directorist-gutenberg')}
								</h2>
								<button
									onClick={closeModal}
									className="directorist-gutenberg-icon-picker-close"
									type="button"
									aria-label={__('Close', 'directorist-gutenberg')}
								>
									<ReactSVG src={times} />
								</button>
							</div>
							<div
								className="directorist-gutenberg-icon-picker-icons"
								ref={iconsContainerRef}
								onScroll={handleScroll}
							>
								{visibleIcons.length > 0 ? (
									<>
										{visibleIcons.map((icon) => {
											const currentIconName = currentIcon
												? currentIcon.split('/').pop().replace('.svg', '')
												: null;
											const isSelected =
												currentIcon &&
												currentIconName &&
												icon.set === selectedIconSet &&
												currentIconName === icon.name;
											const iconUrl = getIconUrl(icon);

											return (
												<LazyIcon
													key={`${icon.set}-${icon.name}`}
													icon={icon}
													isSelected={isSelected}
													onSelect={handleIconSelect}
													iconUrl={iconUrl}
												/>
											);
										})}
										{visibleCount < filteredIcons.length && (
											<div className="directorist-gutenberg-icon-picker-loading">
												{__('Loading more icons...', 'directorist-gutenberg')}
											</div>
										)}
									</>
								) : (
									<div className="directorist-gutenberg-icon-picker-empty">
										<p>{__('No icons found. Try a different search term.', 'directorist-gutenberg')}</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</Modal>
			)}
		</IconPickerStyle>
	);
}
