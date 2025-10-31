import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { ToggleControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const TemplateSettingsPanel = () => {
	const isEnabled = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'meta' )?.is_enabled || false;
	}, [] );

	const { editPost } = useDispatch( 'core/editor' );

	const handleToggle = ( value ) => {
		editPost( {
			meta: {
				is_enabled: value,
			},
		} );
	};

	return (
		<PluginDocumentSettingPanel
			name="template-settings-panel"
			title={ __( 'Template Settings', 'directorist-gutenberg' ) }
			className="template-settings-panel"
		>
			<ToggleControl
				label={ __( 'Enable', 'directorist-gutenberg' ) }
				checked={ isEnabled }
				onChange={ handleToggle }
			/>
		</PluginDocumentSettingPanel>
	);
};

registerPlugin( 'directorist-gutenberg-template-settings', {
	render: TemplateSettingsPanel,
} );

