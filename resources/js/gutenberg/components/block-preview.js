export default function BlockPreview( { image } ) {
	return (
		<div className="directorist-gutenberg-block-preview">
			<img
				src={ image }
				style={ { height: 'auto', width: '100%', textAlign: 'center' } }
			/>
		</div>
	);
}
