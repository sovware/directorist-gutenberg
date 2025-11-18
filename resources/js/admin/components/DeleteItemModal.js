/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import ReactSVG from 'react-inlinesvg';

/**
 * Internal dependencies
 */
import { StyledDeleteModal } from '../style';
import deleteData from '../../helper/deleteData';
import trashIcon from '@icon/trash.svg';
import closeIcon from '@icon/times.svg';

export default function DeleteItemModal({ items, onClose, onDeleteSuccess }) {
	const [isDeleting, setIsDeleting] = useState(false);
	const isBulkDelete = items && items.length > 1;
	const itemName = items && items.length === 1 ? items[0]?.title : '';

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			// Delete all selected items
			const deletePromises = items.map((item) =>
				deleteData(`admin/templates/${item.id}`)
			);
			await Promise.all(deletePromises);

			// Call success callback to refresh the table
			if (onDeleteSuccess) {
				onDeleteSuccess();
			}
			onClose();
		} catch (error) {
			console.error('Error deleting items:', error);
			setIsDeleting(false);
		}
	};

	return (
		<StyledDeleteModal className="directorist-gutenberg-delete-modal">
			<div className="directorist-gutenberg-delete-modal-header">
				<div className="directorist-gutenberg-delete-modal-header-left">
					<ReactSVG src={trashIcon} className="directorist-gutenberg-delete-modal-icon" />
					<h1>
						{isBulkDelete
							? __('Delete Templates', 'directorist-gutenberg')
							: __('Delete Template', 'directorist-gutenberg')}
					</h1>
				</div>
				<button
					className="directorist-gutenberg-delete-modal-close"
					onClick={onClose}
					type="button"
				>
					<ReactSVG src={closeIcon} />
				</button>
			</div>

			<div className="directorist-gutenberg-delete-modal-content">
				{isBulkDelete ? (
					<>
						<p>
							{__(
								`You are about to delete ${items.length} templates.`,
								'directorist-gutenberg'
							)}
						</p>
						<p>
							{__(
								'All data associated with these templates will be deleted forever.',
								'directorist-gutenberg'
							)}
						</p>
					</>
				) : (
					<>
						<p>
							{__('You are about to delete', 'directorist-gutenberg')}{' '}
							<strong>{itemName}</strong>.
						</p>
						<p>
							{__(
								'All data associated with this template will be deleted forever.',
								'directorist-gutenberg'
							)}
						</p>
					</>
				)}
			</div>

			<div className="directorist-gutenberg-delete-modal-actions">
				<Button
					onClick={onClose}
					variant="secondary"
					disabled={isDeleting}
				>
					{__('Cancel', 'directorist-gutenberg')}
				</Button>
				<Button
					onClick={handleDelete}
					variant="primary"
					isDestructive={true}
					disabled={isDeleting}
					isBusy={isDeleting}
				>
					{__('Delete', 'directorist-gutenberg')}
				</Button>
			</div>
		</StyledDeleteModal>
	);
}