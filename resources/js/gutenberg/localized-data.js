export const getLocalizedBlockData = () => {
	return window.directorist_gutenberg_block_data || {};
};

export const getLocalizedBlockDataByKey = ( key, defaultValue = null ) => {
	const data = getLocalizedBlockData();
	return data[ key ] !== undefined ? data[ key ] : defaultValue;
};

export default {
	getLocalizedBlockData,
	getLocalizedBlockDataByKey,
};

