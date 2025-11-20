/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import {
	withColors,
	__experimentalUseGradient,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { dimRatioToClass } from './utils';

const Overlay = ( { attributes, overlayColor = {} } ) => {
	const { dimRatio } = attributes;
	const { gradientClass, gradientValue } = __experimentalUseGradient();
	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	if ( ! colorGradientSettings.hasColorsOrGradients || ! dimRatio ) {
		return null;
	}

	const overlayStyles = {
		backgroundColor: overlayColor?.color,
		backgroundImage: gradientValue,
	};

	return (
		<span
			aria-hidden="true"
			className={ clsx(
				'directorist-gutenberg-listing-card-thumbnail-overlay',
				dimRatioToClass( dimRatio ),
				{
					[ overlayColor?.class ]: overlayColor?.class,
					'has-background-dim': dimRatio !== undefined,
					'has-background-gradient': gradientValue,
					[ gradientClass ]: gradientClass,
				}
			) }
			style={ overlayStyles }
		/>
	);
};

export default compose( [
	withColors( { overlayColor: 'background-color' } ),
] )( Overlay );
