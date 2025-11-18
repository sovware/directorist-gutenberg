export const getLocalizedBlockData = () => {
	return window.directorist_gutenberg_block_data || {};
};

export const getLocalizedBlockDataByKey = ( key, defaultValue = null ) => {
	const data = getLocalizedBlockData();
	return data[ key ] !== undefined ? data[ key ] : defaultValue;
};

export const getSubmissionFormFields = () => {
	const data = getLocalizedBlockData();

	if (
		data &&
		data.submission_form_fields &&
		data.submission_form_fields.fields
	) {
		return data.submission_form_fields.fields;
	}

	return {};
};

export default {
	getLocalizedBlockData,
	getLocalizedBlockDataByKey,
	getSubmissionFormFields,
};
