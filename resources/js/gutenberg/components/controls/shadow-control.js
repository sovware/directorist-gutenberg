/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, Button, Popover, ColorPicker, RangeControl } from '@wordpress/components';
import { useState, useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ColorPickerControl from './color-picker-control';

/**
 * Parse drop shadow string to extract values
 * Format: "offset-x offset-y blur spread color"
 * Example: "10px 12px 15px 17px rgba(188, 2, 2, 0.3)"
 */
function parseDropShadow(shadowString) {
	if (!shadowString || typeof shadowString !== 'string') {
		return {
			x: 0,
			y: 0,
			blur: 0,
			spread: 0,
			color: 'rgba(0, 0, 0, 0.3)',
		};
	}

	// Remove trailing semicolon if present
	const cleaned = shadowString.trim().replace(/;\s*$/, '');
	const parts = cleaned.split(/\s+/);

	// Extract numeric values (remove 'px' unit)
	const x = parseInt(parts[0]?.replace('px', '') || '0', 10);
	const y = parseInt(parts[1]?.replace('px', '') || '0', 10);
	const blur = parseInt(parts[2]?.replace('px', '') || '0', 10);
	const spread = parseInt(parts[3]?.replace('px', '') || '0', 10);

	// Color is everything after the 4th space-separated part
	const color = parts.slice(4).join(' ').replace(/;\s*$/, '') || 'rgba(0, 0, 0, 0.3)';

	return { x, y, blur, spread, color };
}

/**
 * Reconstruct drop shadow string from values
 */
function buildDropShadow({ x, y, blur, spread, color }) {
	return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
}

/**
 * Shadow Control Component
 *
 * @param {Object} props - Component props
 * @param {Object} props.attributes - Block attributes
 * @param {Function} props.setAttributes - Function to update attributes
 * @param {string} props.attrName - Attribute name for drop_shadow (default: 'drop_shadow')
 * @param {string} props.label - Label for the panel
 * @param {boolean} props.initialOpen - Whether panel should be open initially
 */
export default function ShadowControl({
	attributes,
	setAttributes,
	attrName = 'drop_shadow',
	label = __( 'Custom Drop Shadow', 'directorist-gutenberg' ),
	initialOpen = false
}) {
	const dropShadow = attributes[attrName] || '';
	const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

	// Parse the drop shadow string
	const shadowValues = useMemo(() => {
		return parseDropShadow(dropShadow);
	}, [dropShadow]);

	// Update a specific shadow property
	const updateShadow = (property, value) => {
		const updated = {
			...shadowValues,
			[property]: value,
		};
		const newShadowString = buildDropShadow(updated);
		setAttributes({
			[attrName]: newShadowString,
		});
	};

	return (
		<PanelBody
			title={label}
			initialOpen={initialOpen}
		>
			<ColorPickerControl
				label={__( 'Shadow Color', 'directorist-gutenberg' )}
				color={shadowValues.color}
				onChange={(color) => updateShadow('color', color)}
				isOpen={isColorPickerOpen}
				onToggle={() => setIsColorPickerOpen(!isColorPickerOpen)}
			/>

			<RangeControl
				label={__( 'Horizontal Offset (X)', 'directorist-gutenberg' )}
				value={shadowValues.x}
				onChange={(value) => updateShadow('x', value || 0)}
				min={-100}
				max={100}
			/>

			<RangeControl
				label={__( 'Vertical Offset (Y)', 'directorist-gutenberg' )}
				value={shadowValues.y}
				onChange={(value) => updateShadow('y', value || 0)}
				min={-100}
				max={100}
			/>

			<RangeControl
				label={__( 'Blur Radius', 'directorist-gutenberg' )}
				value={shadowValues.blur}
				onChange={(value) => updateShadow('blur', value || 0)}
				min={0}
				max={100}
			/>

			<RangeControl
				label={__( 'Spread Radius', 'directorist-gutenberg' )}
				value={shadowValues.spread}
				onChange={(value) => updateShadow('spread', value || 0)}
				min={-100}
				max={100}
			/>
		</PanelBody>
	);
}
