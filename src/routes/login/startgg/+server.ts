import {
	STARTGG_CLIENT_ID,
	STARTGG_CLIENT_REDIRECT_URI,
	STARTGG_CLIENT_SECRET
} from '$env/static/private';
import { Startgg } from '$lib/server/oauth/providers/startgg';

export async function GET() {
	const startgg = new Startgg(
		STARTGG_CLIENT_ID,
		STARTGG_CLIENT_SECRET,
		STARTGG_CLIENT_REDIRECT_URI
	);

	const url = startgg.createAuthorizationURL(['user.email', 'user.identity']);

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
}
