// https://stackoverflow.com/questions/44655095/global-variables-are-undefined-in-typescript-coming-from-webpack
// required for webpack DefinePlugin
declare const BASE_API: string
const baseApi = BASE_API // replaced with value from webpack define plugin

export {
	baseApi,
}
