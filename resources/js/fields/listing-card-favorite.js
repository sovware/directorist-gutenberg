jQuery(document).ready(function($) {
    $('body').on(
        'click',
        '.directorist-mark-as-favorite__btn',
        function (event) {
            event.preventDefault();
            var data = {
                action: 'atbdp-favourites-all-listing',
                directorist_nonce: directorist.directorist_nonce,
                post_id: $(this).data('listing_id'),
            };
            var fav_tooltip_success =
                '<span>' +
                directorist.i18n_text.added_favourite +
                '</span>';
            var fav_tooltip_warning =
                '<span>' + directorist.i18n_text.please_login + '</span>';
            $('.directorist-favorite-tooltip').hide();
            $.post(directorist.ajax_url, data, function (response) {
                var post_id = data['post_id'].toString();
                var staElement = $('.directorist-fav_' + post_id);
                var data_id = staElement.attr('data-listing_id');

                if (response === 'login_required') {
                    staElement
                        .children('.directorist-favorite-tooltip')
                        .append(fav_tooltip_warning);
                    staElement
                        .children('.directorist-favorite-tooltip')
                        .fadeIn();
                    setTimeout(function () {
                        staElement
                            .children('.directorist-favorite-tooltip')
                            .children('span')
                            .remove();
                    }, 3000);
                } else if ('false' === response) {
                    staElement.removeClass('directorist-added-to-favorite');
                    $('.directorist-favorite-tooltip span').remove();
                } else {
                    if (data_id === post_id) {
                        staElement.addClass(
                            'directorist-added-to-favorite'
                        );
                        staElement
                            .children('.directorist-favorite-tooltip')
                            .append(fav_tooltip_success);
                        staElement
                            .children('.directorist-favorite-tooltip')
                            .fadeIn();
                        setTimeout(function () {
                            staElement
                                .children('.directorist-favorite-tooltip')
                                .children('span')
                                .remove();
                        }, 3000);
                    }
                }
            });
        }
    );
});