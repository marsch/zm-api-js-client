export enum Namespace {
	Account = 'urn:zimbraAccount',
	Admin = 'urn:zimbraAdmin',
	Mail = 'urn:zimbraMail',
	All = 'urn:zimbra'
}

export type SessionId = string;
export type SessionSeq = number;

export interface BaseRequestOptions {
	accountId?: string;
	accountName?: string;
	credentials?: RequestCredentials;
	headers?: any;
	origin?: string;
	sessionId?: SessionId;
	sessionSeq?: SessionSeq;
	soapPathname?: string;
}

export interface RequestOptions {
	body?: any;
	name: string;
	namespace?: Namespace;
}

export interface JsonRequestOptions
	extends BaseRequestOptions,
		RequestOptions {}

export interface BatchRequestOptions extends BaseRequestOptions {
	requests: Array<RequestOptions>;
}

export interface RequestResponse {
	body?: any;
	error?: any;
	header: any;
	namespace: Namespace;
	originalResponse: Response;
}

export interface RequestError {
	error: any;
	originalResponse: Response;
}

export type RequestBody = any;

export interface SingleBatchRequestResponse {
	body?: RequestBody;
	errors?: any;
}

export interface BatchRequestResponse {
	header: any;
	namespace: Namespace;
	originalResponse: Response;
	requests: Array<SingleBatchRequestResponse | SingleBatchRequestError>;
}

export interface ParsedResponse extends Response {
	parsed?: any;
	parseError?: Error;
}

export interface NetworkError extends Error {
	parseError?: Error;
	response: ParsedResponse;
}

export interface SingleBatchRequestError extends NetworkError {
	faults: Array<any>;
}

export interface SOAPHeader {
	context: {
		_jsns: Namespace;
		account?: {
			_content: string;
			by: 'name' | 'id'; // name is the account's email address
		};
		csrfToken?: string;
		notify?: {
			seq: SessionSeq;
		};
		session?: {
			_content: SessionId;
			id: SessionId;
		};
		userAgent?: {
			name: string;
			version: string;
		};
	};
}
