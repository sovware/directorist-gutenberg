/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import {
	SelectControl,
	__experimentalUnitControl as UnitControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalUseCustomUnits as useCustomUnits,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { useSettings } from '@wordpress/block-editor';

const SCALE_OPTIONS = (
	<>
		<ToggleGroupControlOption
			value="cover"
			label={ _x(
				'Cover',
				'Scale option for Image dimension control',
				'directorist-gutenberg'
			) }
		/>
		<ToggleGroupControlOption
			value="contain"
			label={ _x(
				'Contain',
				'Scale option for Image dimension control',
				'directorist-gutenberg'
			) }
		/>
		<ToggleGroupControlOption
			value="fill"
			label={ _x(
				'Fill',
				'Scale option for Image dimension control',
				'directorist-gutenberg'
			) }
		/>
	</>
);

const DEFAULT_SCALE = 'cover';

const scaleHelp = {
	cover: __(
		'Image is scaled and cropped to fill the entire space without being distorted.',
		'directorist-gutenberg'
	),
	contain: __(
		'Image is scaled to fill the space without clipping nor distorting.',
		'directorist-gutenberg'
	),
	fill: __(
		'Image will be stretched and distorted to completely fill the space.',
		'directorist-gutenberg'
	),
};

const DimensionControls = ( {
	clientId,
	attributes: { aspectRatio, width, height, scale },
	setAttributes,
} ) => {
	const [ availableUnits, defaultRatios, themeRatios, showDefaultRatios ] =
		useSettings(
			'spacing.units',
			'dimensions.aspectRatios.default',
			'dimensions.aspectRatios.theme',
			'dimensions.defaultAspectRatios'
		);

	const safeAvailableUnits = Array.isArray( availableUnits )
		? availableUnits
		: [ 'px', '%', 'vw', 'em', 'rem' ];

	const units =
		useCustomUnits( {
			availableUnits: safeAvailableUnits,
		} ) || safeAvailableUnits;

	const onDimensionChange = ( dimension, nextValue ) => {
		const parsedValue = parseFloat( nextValue );
		/**
		 * If we have no value set and we change the unit,
		 * we don't want to set the attribute, as it would
		 * end up having the unit as value without any number.
		 */
		if ( isNaN( parsedValue ) && nextValue ) {
			return;
		}
		setAttributes( {
			[ dimension ]: parsedValue < 0 ? '0' : nextValue,
		} );
	};
	const scaleLabel = _x(
		'Scale',
		'Image scaling options',
		'directorist-gutenberg'
	);

	const showScaleControl =
		height || ( aspectRatio && aspectRatio !== 'auto' );

	const themeOptions = Array.isArray( themeRatios )
		? themeRatios.map( ( { name, ratio } ) => ( {
				label: name,
				value: ratio,
		  } ) )
		: [];

	const defaultOptions = Array.isArray( defaultRatios )
		? defaultRatios.map( ( { name, ratio } ) => ( {
				label: name,
				value: ratio,
		  } ) )
		: [];

	const aspectRatioOptions = [
		{
			label: _x(
				'Original',
				'Aspect ratio option for dimensions control',
				'directorist-gutenberg'
			),
			value: 'auto',
		},
		...( showDefaultRatios ? defaultOptions : [] ),
		...( themeOptions || [] ),
	];

	return (
		<>
			<ToolsPanelItem
				hasValue={ () => !! aspectRatio }
				label={ __( 'Aspect ratio', 'directorist-gutenberg' ) }
				onDeselect={ () => setAttributes( { aspectRatio: undefined } ) }
				resetAllFilter={ () => ( {
					aspectRatio: undefined,
				} ) }
				isShownByDefault
				panelId={ clientId }
			>
				<SelectControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={ __( 'Aspect ratio', 'directorist-gutenberg' ) }
					value={ aspectRatio }
					options={ aspectRatioOptions }
					onChange={ ( nextAspectRatio ) =>
						setAttributes( { aspectRatio: nextAspectRatio } )
					}
				/>
			</ToolsPanelItem>
			<ToolsPanelItem
				className="single-column"
				hasValue={ () => !! height }
				label={ __( 'Height', 'directorist-gutenberg' ) }
				onDeselect={ () => setAttributes( { height: undefined } ) }
				resetAllFilter={ () => ( {
					height: undefined,
				} ) }
				isShownByDefault
				panelId={ clientId }
			>
				<UnitControl
					__next40pxDefaultSize
					label={ __( 'Height', 'directorist-gutenberg' ) }
					labelPosition="top"
					value={ height || '' }
					min={ 0 }
					onChange={ ( nextHeight ) =>
						onDimensionChange( 'height', nextHeight )
					}
					units={
						Array.isArray( units ) ? units : safeAvailableUnits
					}
				/>
			</ToolsPanelItem>
			<ToolsPanelItem
				className="single-column"
				hasValue={ () => !! width }
				label={ __( 'Width', 'directorist-gutenberg' ) }
				onDeselect={ () => setAttributes( { width: undefined } ) }
				resetAllFilter={ () => ( {
					width: undefined,
				} ) }
				isShownByDefault
				panelId={ clientId }
			>
				<UnitControl
					__next40pxDefaultSize
					label={ __( 'Width', 'directorist-gutenberg' ) }
					labelPosition="top"
					value={ width || '' }
					min={ 0 }
					onChange={ ( nextWidth ) =>
						onDimensionChange( 'width', nextWidth )
					}
					units={
						Array.isArray( units ) ? units : safeAvailableUnits
					}
				/>
			</ToolsPanelItem>
			{ showScaleControl && (
				<ToolsPanelItem
					hasValue={ () => !! scale && scale !== DEFAULT_SCALE }
					label={ scaleLabel }
					onDeselect={ () =>
						setAttributes( {
							scale: DEFAULT_SCALE,
						} )
					}
					resetAllFilter={ () => ( {
						scale: DEFAULT_SCALE,
					} ) }
					isShownByDefault
					panelId={ clientId }
				>
					<ToggleGroupControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ scaleLabel }
						value={ scale }
						help={ scaleHelp[ scale ] }
						onChange={ ( value ) =>
							setAttributes( {
								scale: value,
							} )
						}
						isBlock
					>
						{ SCALE_OPTIONS }
					</ToggleGroupControl>
				</ToolsPanelItem>
			) }
		</>
	);
};

export default DimensionControls;
