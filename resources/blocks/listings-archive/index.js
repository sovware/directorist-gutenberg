/**
 * Internal dependencies
 */
import registerBlock from '@directorist-gutenberg/gutenberg/register-block';
import './style.scss';
import Edit from './edit';
import metadata from './block.json';

const exampleAttributes = {
	is_preview: true,
};

registerBlock( {
	metadata, 
	Edit,
	exampleAttributes,
} );
