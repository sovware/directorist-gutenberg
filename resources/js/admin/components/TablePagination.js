/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import ReactSVG from 'react-inlinesvg';

/**
 * Internal dependencies
 */
import arrowLeftIcon from '@icon/arrow-left.svg';
import arrowRightIcon from '@icon/arrow-right.svg';
import {
	StyledTablePagination,
	StyledPaginationButton,
	StyledPaginationEllipsis,
} from '../style';

export default function TablePagination( {
	currentPage = 1,
	totalPages = 1,
	onPageChange,
} ) {
	if ( totalPages <= 1 ) {
		return null;
	}

	const handlePrevious = () => {
		if ( currentPage > 1 && onPageChange ) {
			onPageChange( currentPage - 1 );
		}
	};

	const handleNext = () => {
		if ( currentPage < totalPages && onPageChange ) {
			onPageChange( currentPage + 1 );
		}
	};

	const handlePageClick = ( page ) => {
		if ( onPageChange && page !== currentPage ) {
			onPageChange( page );
		}
	};

	// Generate page numbers to display
	const getPageNumbers = () => {
		const pages = [];
		const maxVisible = 5;

		if ( totalPages <= maxVisible ) {
			// Show all pages if total is less than max visible
			for ( let i = 1; i <= totalPages; i++ ) {
				pages.push( i );
			}
		} else {
			// Show pages with ellipsis
			if ( currentPage <= 3 ) {
				// Near the start
				for ( let i = 1; i <= 4; i++ ) {
					pages.push( i );
				}
				pages.push( 'ellipsis' );
				pages.push( totalPages );
			} else if ( currentPage >= totalPages - 2 ) {
				// Near the end
				pages.push( 1 );
				pages.push( 'ellipsis' );
				for ( let i = totalPages - 3; i <= totalPages; i++ ) {
					pages.push( i );
				}
			} else {
				// In the middle
				pages.push( 1 );
				pages.push( 'ellipsis' );
				for ( let i = currentPage - 1; i <= currentPage + 1; i++ ) {
					pages.push( i );
				}
				pages.push( 'ellipsis' );
				pages.push( totalPages );
			}
		}

		return pages;
	};

	return (
		<StyledTablePagination>
			<StyledPaginationButton
				onClick={ handlePrevious }
				disabled={ currentPage === 1 }
				aria-label={ __( 'Previous page', 'directorist-gutenberg' ) }
			>
				<ReactSVG src={ arrowLeftIcon } width={ 20 } height={ 20 } />
			</StyledPaginationButton>

			{ getPageNumbers().map( ( page, index ) => {
				if ( page === 'ellipsis' ) {
					return (
						<StyledPaginationEllipsis key={ `ellipsis-${ index }` }>
							...
						</StyledPaginationEllipsis>
					);
				}

				const isActive = page === currentPage;

				return (
					<StyledPaginationButton
						key={ page }
						onClick={ () => handlePageClick( page ) }
						aria-label={ __( 'Page', 'directorist-gutenberg' ) + ` ${ page }` }
						aria-current={ isActive ? 'page' : undefined }
						$isActive={ isActive }
					>
						{ page }
					</StyledPaginationButton>
				);
			} ) }

			<StyledPaginationButton
				onClick={ handleNext }
				disabled={ currentPage === totalPages }
				aria-label={ __( 'Next page', 'directorist-gutenberg' ) }
			>
				<ReactSVG src={ arrowRightIcon } width={ 20 } height={ 20 } />
			</StyledPaginationButton>
		</StyledTablePagination>
	);
}

