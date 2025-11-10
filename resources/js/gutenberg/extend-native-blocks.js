/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import ShadowControl from '@directorist-gutenberg/gutenberg/components/controls/shadow-control';

/**
 * List of native blocks to extend with shadow control
 */
const BLOCKS_TO_EXTEND = [
	'core/group',
	'core/column',
	'core/columns',
    'core/row',
    'core/stack',
    'core/grid',
];

/**
 * Add drop_shadow attribute to block settings
 */
addFilter(
	'blocks.registerBlockType',
	'directorist-gutenberg/add-drop-shadow-attribute',
	(settings, name) => {
		// Only add attribute to specified blocks
		if (!BLOCKS_TO_EXTEND.includes(name)) {
			return settings;
		}

		return {
			...settings,
			attributes: {
				...settings.attributes,
				drop_shadow: {
					type: 'string',
					default: '0px 0px 0px 0px rgba(0, 0, 0, 0.3)',
				},
			},
		};
	}
);

/**
 * Add shadow control to InspectorControls
 */
const withShadowControl = createHigherOrderComponent(
	(BlockEdit) => (props) => {
		const { name, attributes, setAttributes } = props;

		// Only add control to specified blocks
		if (!BLOCKS_TO_EXTEND.includes(name)) {
			return <BlockEdit {...props} />;
		}

		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<ShadowControl
						attributes={attributes}
						setAttributes={setAttributes}
						attrName="drop_shadow"
						label="Custom Drop Shadow"
						initialOpen={false}
					/>
				</InspectorControls>
			</>
		);
	},
	'withShadowControl'
);

addFilter(
	'editor.BlockEdit',
	'directorist-gutenberg/add-shadow-control',
	withShadowControl
);

/**
 * Apply shadow styles to block wrapper
 */
addFilter(
	'blocks.getSaveContent.extraProps',
	'directorist-gutenberg/apply-shadow-styles',
	(props, blockType, attributes) => {
		// Only apply to specified blocks
		if (!BLOCKS_TO_EXTEND.includes(blockType.name)) {
			return props;
		}

		// Apply shadow style if drop_shadow attribute exists
		if (attributes.drop_shadow) {
			const existingStyle = props.style || {};
			return {
				...props,
				style: {
					...existingStyle,
					boxShadow: attributes.drop_shadow,
				},
			};
		}

		return props;
	}
);

/**
 * Apply shadow styles in editor (for edit view)
 * This modifies the block wrapper to include shadow styles
 */
addFilter(
	'editor.BlockListBlock',
	'directorist-gutenberg/apply-shadow-styles-editor',
	(BlockListBlock) => (props) => {
		const { name, attributes } = props;

		// Only apply to specified blocks
		if (!BLOCKS_TO_EXTEND.includes(name) || !attributes.drop_shadow) {
			return <BlockListBlock {...props} />;
		}

		// Get wrapper props and add shadow style
		const wrapperProps = props.wrapperProps || {};
		const existingStyle = wrapperProps.style || {};

		const newWrapperProps = {
			...wrapperProps,
			style: {
				...existingStyle,
				boxShadow: attributes.drop_shadow,
			},
		};

		return <BlockListBlock {...props} wrapperProps={newWrapperProps} />;
	}
);

