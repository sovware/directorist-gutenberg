/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Header from './Header';
import { StyledModalContents } from '../style';

export default function CreateTemplate() {
    return (
        <StyledModalContents>
            <Header />
            
        </StyledModalContents>
    );
}