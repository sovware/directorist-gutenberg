/**
 * WordPress Interactivity API
 */
import { store, getContext } from '@wordpress/interactivity';

/**
 * Internal dependencies
 */
import { ajaxFetch } from './utils';

// Constants
const TOOLTIP_HIDE_DELAY = 3000;
const AJAX_ACTION = 'atbdp-favourites-all-listing';

// Helper function to hide tooltip after delay
const hideTooltipAfterDelay = (ctx) => {
    setTimeout(() => {
        ctx.showTooltip = false;
        ctx.tooltipMessage = '';
    }, TOOLTIP_HIDE_DELAY);
};

// Helper function to show tooltip
const showTooltip = (ctx, message) => {
    ctx.showTooltip = true;
    ctx.tooltipMessage = message;
    hideTooltipAfterDelay(ctx);
};

// Helper function to hide tooltip
const hideTooltip = (ctx) => {
    ctx.showTooltip = false;
    ctx.tooltipMessage = '';
};

store('directorist/favorite-button', {
    state: {
        get isFavorite() {
            return getContext().isFavorite === true;
        },
        get isNotFavorite() {
            return getContext().isFavorite !== true;
        },
        get tooltipMessage() {
            return getContext().tooltipMessage || '';
        },
        get showTooltip() {
            return getContext().showTooltip === true;
        },
    },
    actions: {
        toggleFavorite: async ({ event, context }) => {
            const ctx = context || getContext();
            const directorist = window.directorist || {};

            // Handle keyboard events - only allow Enter and Space
            if (event?.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') {
                return;
            }

            // Prevent default action
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            // Hide previous tooltips
            hideTooltip(ctx);

            // Validate required data
            if (!directorist.ajax_url || !directorist.directorist_nonce) {
                console.error('Directorist AJAX configuration missing');
                return;
            }

            // Prepare AJAX request data
            const requestData = {
                action: AJAX_ACTION,
                directorist_nonce: directorist.directorist_nonce,
                post_id: ctx.listingId,
            };

            try {
                const result = await ajaxFetch(directorist.ajax_url, requestData);

                // Handle response
                if (result === 'login_required') {
                    showTooltip(ctx, directorist.i18n_text?.please_login || 'Please login');
                } else if (result === 'false') {
                    ctx.isFavorite = false;
                    hideTooltip(ctx);
                } else {
                    // Success - listing was added to favorites
                    ctx.isFavorite = true;
                    showTooltip(ctx, directorist.i18n_text?.added_favourite || 'Added to favorites');
                }
            } catch (error) {
                console.error('Error toggling favorite:', error);
                hideTooltip(ctx);
            }
        },
    },
});
