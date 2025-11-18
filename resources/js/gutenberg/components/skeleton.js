/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Skeleton Loading Component
 *
 * A reusable animated skeleton loading component that provides a placeholder
 * while waiting for content to load.
 *
 * Use Cases:
 * - When a resource needs long time to load
 * - When the component contains lots of information, such as List or Card
 * - Only works when loading data for the first time
 * - Could be replaced by Spin in any situation, but can provide a better user experience
 *
 * Usage Examples:
 *
 * // Basic text skeleton
 * <Skeleton variant="text" width="100%" />
 *
 * // Circular avatar skeleton
 * <Skeleton variant="circular" width={40} height={40} />
 *
 * // Rectangular image skeleton
 * <Skeleton variant="rectangular" width="100%" height={200} />
 *
 * // Multiple card skeletons
 * <Skeleton variant="card" count={3} width="100%" />
 *
 * // Custom lines layout
 * <Skeleton
 *   lines={[
 *     { width: '100%', height: '16px' },
 *     { width: '80%', height: '16px' },
 *     { width: '60%', height: '16px' }
 *   ]}
 * />
 *
 * // Using convenience components
 * import { SkeletonText, SkeletonCard, SkeletonList } from '@directorist-gutenberg/gutenberg/components/skeleton';
 * <SkeletonText lines={4} />
 * <SkeletonCard />
 * <SkeletonList items={5} />
 *
 * @param {Object} props - Component props
 * @param {string} props.variant - Variant type: 'text', 'circular', 'rectangular', 'card', 'list'
 * @param {number|string} props.width - Width of the skeleton (e.g., '100%', 200, '50px')
 * @param {number|string} props.height - Height of the skeleton (e.g., '100%', 20, '40px')
 * @param {number} props.count - Number of skeleton items to render (for list/card variants)
 * @param {boolean} props.animated - Whether to show animation (default: true)
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 * @param {Array} props.lines - Array of line configurations for custom layouts
 *
 * @returns {JSX.Element} Skeleton component
 */
export default function Skeleton( {
	variant = 'text',
	width,
	height,
	count = 1,
	animated = true,
	className = '',
	style = {},
	lines = [],
} ) {
	const baseClassName = 'directorist-gutenberg-skeleton';
	const variantClassName = `${ baseClassName }--${ variant }`;
	const animationClassName = animated ? `${ baseClassName }--animated` : '';
	const combinedClassName = [
		baseClassName,
		variantClassName,
		animationClassName,
		className,
	]
		.filter( Boolean )
		.join( ' ' );

	// Custom inline styles
	const customStyle = {
		...( width && {
			width: typeof width === 'number' ? `${ width }px` : width,
		} ),
		...( height && {
			height: typeof height === 'number' ? `${ height }px` : height,
		} ),
		...style,
	};

	// Render multiple items for list/card variants
	if ( ( variant === 'list' || variant === 'card' ) && count > 1 ) {
		return (
			<div className={ `${ baseClassName }-container` }>
				{ Array.from( { length: count } ).map( ( _, index ) => (
					<Skeleton
						key={ index }
						variant={ variant }
						width={ width }
						height={ height }
						animated={ animated }
						className={ className }
						style={ style }
					/>
				) ) }
			</div>
		);
	}

	// Custom lines layout
	if ( lines.length > 0 ) {
		return (
			<div className={ combinedClassName } style={ customStyle }>
				{ lines.map( ( line, index ) => (
					<div
						key={ index }
						className={ `${ baseClassName }__line` }
						style={ {
							width: line.width || '100%',
							height: line.height || '12px',
							marginBottom: line.marginBottom || '8px',
						} }
					/>
				) ) }
			</div>
		);
	}

	// Single skeleton item
	return (
		<div
			className={ combinedClassName }
			style={ customStyle }
			aria-label={ __( 'Loading content', 'directorist-gutenberg' ) }
			role="status"
		/>
	);
}

/**
 * Skeleton Text Component
 * Convenience component for text skeleton
 */
export function SkeletonText( { lines = 3, ...props } ) {
	return (
		<Skeleton
			variant="text"
			lines={ Array.from( { length: lines } ).map( ( _, index ) => ( {
				width: index === lines - 1 ? '60%' : '100%',
				height: '12px',
				marginBottom: '8px',
			} ) ) }
			{ ...props }
		/>
	);
}

/**
 * Skeleton Card Component
 * Convenience component for card skeleton
 */
export function SkeletonCard( { ...props } ) {
	return (
		<div className="directorist-gutenberg-skeleton-card">
			<Skeleton
				variant="rectangular"
				width="100%"
				height={ 200 }
				{ ...props }
			/>
			<div style={ { padding: '16px' } }>
				<Skeleton
					variant="text"
					width="80%"
					height={ 20 }
					style={ { marginBottom: '12px' } }
					{ ...props }
				/>
				<Skeleton
					variant="text"
					width="100%"
					height={ 16 }
					style={ { marginBottom: '8px' } }
					{ ...props }
				/>
				<Skeleton
					variant="text"
					width="60%"
					height={ 16 }
					{ ...props }
				/>
			</div>
		</div>
	);
}

/**
 * Skeleton List Component
 * Convenience component for list skeleton
 */
export function SkeletonList( { items = 5, ...props } ) {
	return (
		<div className="directorist-gutenberg-skeleton-list">
			{ Array.from( { length: items } ).map( ( _, index ) => (
				<div
					key={ index }
					className="directorist-gutenberg-skeleton-list__item"
				>
					<Skeleton
						variant="circular"
						width={ 40 }
						height={ 40 }
						style={ { marginRight: '12px' } }
						{ ...props }
					/>
					<div style={ { flex: 1 } }>
						<Skeleton
							variant="text"
							width="80%"
							height={ 16 }
							style={ { marginBottom: '8px' } }
							{ ...props }
						/>
						<Skeleton
							variant="text"
							width="60%"
							height={ 14 }
							{ ...props }
						/>
					</div>
				</div>
			) ) }
		</div>
	);
}
