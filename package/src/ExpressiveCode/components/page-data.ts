export type PageData = {
	url: string
	blockGroupIndex: number
}

// Map of request to page data
const pageDataMap = new Map<Request, PageData>()

// Get the page data for a request
export function getPageData(request: Request): PageData {
	let data = pageDataMap.get(request)
	if (!data) {
		data = {
			url: request.url,
			blockGroupIndex: -1,
		}
		pageDataMap.set(request, data)
	}
	return data
}