// Generic helper function to get data by key from any window object
const getDataByKey = ( data, key, defaultValue = null ) => {
	return data[ key ] !== undefined ? data[ key ] : defaultValue;
};

// Gutenberg Block Editor Data
export const getLocalizedBlockData = () => {
	return window.directorist_gutenberg_block_data || {};
};

export const getLocalizedBlockDataByKey = ( key, defaultValue = null ) => {
	const data = getLocalizedBlockData();
	return getDataByKey( data, key, defaultValue );
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

// Admin Page Data
export const getLocalizedAdminData = () => {
	return window.directorist_gutenberg_data || {};
};

export const getLocalizedAdminDataByKey = ( key, defaultValue = null ) => {
	const data = getLocalizedAdminData();
	return getDataByKey( data, key, defaultValue );
};

export const getDirectories = () => {
	const data = getLocalizedAdminData();
	return getDataByKey( data, 'directories', [] );
};

export default {
	getLocalizedBlockData,
	getLocalizedBlockDataByKey,
	getSubmissionFormFields,
	getLocalizedAdminData,
	getLocalizedAdminDataByKey,
	getDirectories,
};
