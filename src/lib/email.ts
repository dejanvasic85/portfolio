import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import {
	AWS_ACCESS_KEY_ID,
	AWS_REGION,
	AWS_SECRET_ACCESS_KEY,
	EMAIL_FROM,
	EMAIL_TO
} from 'astro:env/server';

type EmailParams = {
	name: string;
	email: string;
	projectType?: string;
	message: string;
};

// Initialize SES client
const sesClient = new SESClient({
	region: AWS_REGION,
	credentials: {
		accessKeyId: AWS_ACCESS_KEY_ID,
		secretAccessKey: AWS_SECRET_ACCESS_KEY
	}
});

/**
 * Safely escape HTML to prevent XSS attacks
 */
function escapeHtml(text: string): string {
	const map: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};
	return text.replace(/[&<>"']/g, (char) => map[char] || char);
}

/**
 * Generate email HTML template with safe replacements
 */
function generateEmailTemplate(params: EmailParams): string {
	const { name, email, projectType, message } = params;

	// Safely escape all user inputs
	const safeName = escapeHtml(name);
	const safeEmail = escapeHtml(email);
	const safeProjectType = projectType ? escapeHtml(projectType) : 'Not specified';
	const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

	return `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>New Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
	<div style="background-color: #f4f4f4; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
		<h1 style="color: #0066cc; margin-top: 0;">New Contact Form Submission</h1>
		<p style="color: #666; margin-bottom: 0;">You have received a new message from your portfolio contact form.</p>
	</div>

	<div style="background-color: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
		<h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">Contact Details</h2>

		<div style="margin-bottom: 15px;">
			<strong style="color: #555;">Name:</strong>
			<p style="margin: 5px 0; padding: 10px; background-color: #f9f9f9; border-radius: 4px;">${safeName}</p>
		</div>

		<div style="margin-bottom: 15px;">
			<strong style="color: #555;">Email:</strong>
			<p style="margin: 5px 0; padding: 10px; background-color: #f9f9f9; border-radius: 4px;">
				<a href="mailto:${safeEmail}" style="color: #0066cc; text-decoration: none;">${safeEmail}</a>
			</p>
		</div>

		<div style="margin-bottom: 15px;">
			<strong style="color: #555;">Project Type:</strong>
			<p style="margin: 5px 0; padding: 10px; background-color: #f9f9f9; border-radius: 4px;">${safeProjectType}</p>
		</div>

		<div style="margin-bottom: 15px;">
			<strong style="color: #555;">Message:</strong>
			<p style="margin: 5px 0; padding: 10px; background-color: #f9f9f9; border-radius: 4px; white-space: pre-wrap;">${safeMessage}</p>
		</div>
	</div>

	<div style="margin-top: 20px; padding: 15px; background-color: #f4f4f4; border-radius: 8px; font-size: 12px; color: #666; text-align: center;">
		<p style="margin: 0;">This email was sent from your portfolio contact form.</p>
	</div>
</body>
</html>
	`.trim();
}

/**
 * Generate plain text version of the email
 */
function generatePlainTextEmail(params: EmailParams): string {
	const { name, email, projectType, message } = params;

	return `
New Contact Form Submission
============================

Name: ${name}
Email: ${email}
Project Type: ${projectType || 'Not specified'}

Message:
${message}

---
This email was sent from your portfolio contact form.
	`.trim();
}

/**
 * Send email using AWS SES
 */
export async function sendEmail(params: EmailParams): Promise<void> {
	console.log('\n=== Starting Email Send Process ===');
	console.log('Form data received:', {
		name: params.name,
		email: params.email,
		projectType: params.projectType || 'Not specified',
		messageLength: params.message.length
	});

	const htmlBody = generateEmailTemplate(params);
	const textBody = generatePlainTextEmail(params);

	const emailCommand = {
		Source: EMAIL_FROM,
		Destination: {
			ToAddresses: [EMAIL_TO]
		},
		Message: {
			Subject: {
				Data: `New Contact Form Submission from ${params.name}`,
				Charset: 'UTF-8'
			},
			Body: {
				Html: {
					Data: htmlBody,
					Charset: 'UTF-8'
				},
				Text: {
					Data: textBody,
					Charset: 'UTF-8'
				}
			}
		}
	};

	console.log('SES Command:', {
		Source: emailCommand.Source,
		Destination: emailCommand.Destination,
		Subject: emailCommand.Message.Subject.Data
	});

	const command = new SendEmailCommand(emailCommand);

	try {
		console.log('Sending email via AWS SES...');
		const result = await sesClient.send(command);
		console.log('✅ Email sent successfully!');
		console.log('SES Response:', {
			MessageId: result.MessageId,
			$metadata: {
				httpStatusCode: result.$metadata.httpStatusCode,
				requestId: result.$metadata.requestId
			}
		});
		console.log('Email delivered to:', EMAIL_TO);
		console.log('=== Email Send Complete ===\n');
	} catch (error: any) {
		console.error('\n❌ =========================');
		console.error('ERROR SENDING EMAIL');
		console.error('=========================');
		console.error('Error type:', error.name);
		console.error('Error message:', error.message);
		console.error('Error code:', error.Code || error.$metadata?.httpStatusCode);

		if (error.$metadata) {
			console.error('AWS Metadata:', {
				httpStatusCode: error.$metadata.httpStatusCode,
				requestId: error.$metadata.requestId,
				attempts: error.$metadata.attempts
			});
		}

		// Log specific AWS SES error details
		if (error.name === 'MessageRejected') {
			console.error('⚠️  MESSAGE REJECTED - Check if email addresses are verified in AWS SES');
		} else if (error.name === 'MailFromDomainNotVerifiedException') {
			console.error('⚠️  FROM address not verified in AWS SES');
		} else if (error.name === 'ConfigurationSetDoesNotExistException') {
			console.error('⚠️  Configuration set issue');
		}

		console.error('Full error object:', JSON.stringify(error, null, 2));
		console.error('=========================\n');

		throw new Error(`Failed to send email: ${error.message || 'Unknown error'}`);
	}
}
