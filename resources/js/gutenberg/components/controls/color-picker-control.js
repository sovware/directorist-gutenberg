/**
 * WordPress dependencies
 */
import { Button, Popover, ColorPicker } from '@wordpress/components';

/**
 * Convert color value to string format
 *
 * @param {Object} colorValue - Color value from ColorPicker
 * @returns {string} Color string (rgba or hex)
 */
export const getColorString = (colorValue) => {
	return colorValue.rgb
		? `rgba(${colorValue.rgb.r}, ${colorValue.rgb.g}, ${colorValue.rgb.b}, ${colorValue.rgb.a})`
		: colorValue.hex || '';
};

/**
 * Color Picker Control Component
 *
 * @param {Object} props - Component props
 * @param {string} props.label - Label for the color picker
 * @param {string} props.color - Current color value
 * @param {string} props.defaultColor - Default color if none is set
 * @param {Function} props.onChange - Callback when color changes
 * @param {boolean} props.isOpen - Whether the picker is open
 * @param {Function} props.onToggle - Toggle function for picker open state
 */
export default function ColorPickerControl({ label, color, defaultColor, onChange, isOpen, onToggle }) {
	return (
		<div className="directorist-gutenberg-color-picker-container">
			<label className="directorist-gutenberg-color-picker-label">
				{label}
			</label>
			<div className="directorist-gutenberg-color-picker-wrapper">
				<Button
					onClick={onToggle}
					style={{
						backgroundColor: color || defaultColor,
					}}
				/>
				{isOpen && (
					<Popover
						onClose={onToggle}
						placement="left-start"
						offset={20}
					>
						<ColorPicker
							color={color || defaultColor}
							onChangeComplete={(colorValue) => {
								onChange(getColorString(colorValue));
							}}
							enableAlpha
						/>
					</Popover>
				)}
			</div>
		</div>
	);
}

