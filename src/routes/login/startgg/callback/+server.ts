import {
	STARTGG_CLIENT_ID,
	STARTGG_CLIENT_REDIRECT_URI,
	STARTGG_CLIENT_SECRET
} from '$env/static/private';
import { Startgg, type OAuth2Token } from '$lib/server/oauth/providers/startgg';

export async function GET({ url }) {
	const code = url.searchParams.get('code');
	if (code === null) return new Response(null, { status: 400, statusText: 'Invalid request' });

	const startgg = new Startgg(
		STARTGG_CLIENT_ID,
		STARTGG_CLIENT_SECRET,
		STARTGG_CLIENT_REDIRECT_URI
	);

	let token: OAuth2Token;
	try {
		token = await startgg.validateAuthorizationCode(code, ['user.email', 'user.identity']);
	} catch (e) {
		return new Response(null, { status: 400, statusText: String(e) });
	}

	return new Response(JSON.stringify(token), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
