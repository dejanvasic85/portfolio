import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { sendEmail } from '../lib/email';

const required = (field: string) =>
	z
		.string()
		.nullable()
		.transform((val) => val ?? '')
		.pipe(z.string().min(1, `${field} is required`));

export const server = {
	contact: defineAction({
		accept: 'form',
		input: z.object({
			name: required('Name'),
			email: required('Email').pipe(z.string().email('Please enter a valid email address')),
			projectType: z.string().optional(),
			message: required('Message').pipe(
				z.string().min(10, 'Message must be at least 10 characters')
			)
		}),
		async handler(input) {
			// TODO: Integrate AWS SES for sending emails
			// For now, just log the data
			console.log('Contact form submission:', input);

			await sendEmail({ to: input.email });

			return {
				success: true,
				message: "Thank you for reaching out! I'll get back to you soon."
			};
		}
	})
};
