import {
	AWS_ACCESS_KEY_ID,
	AWS_REGION,
	AWS_SECRET_ACCESS_KEY,
	EMAIL_FROM,
	EMAIL_TO
} from 'astro:env/server';

type EmailParams = {
	to: string;
};

export async function sendEmail({ to }: EmailParams) {
	// TODO: Send email using AWS SES
	console.log(`Todo: `, to, AWS_ACCESS_KEY_ID);
	await new Promise((resolve) => setTimeout(resolve, 500));
}
