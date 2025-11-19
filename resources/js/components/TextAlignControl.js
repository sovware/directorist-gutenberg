import { BlockControls, AlignmentControl } from '@wordpress/block-editor';

export default function TextAlignControl( { textAlign, setAttributes } ) {
    return (
        <BlockControls group="block">
            <AlignmentControl
                value={ textAlign }
                onChange={ ( nextAlign ) => {
                    setAttributes( { textAlign: nextAlign } );
                } }
            />
        </BlockControls>
    )
}