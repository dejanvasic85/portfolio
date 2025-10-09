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
			try {
				// Send email with all contact form details
				await sendEmail({
					name: input.name,
					email: input.email,
					projectType: input.projectType,
					message: input.message
				});

				return {
					success: true,
					message: "Thank you for reaching out! I'll get back to you soon."
				};
			} catch (error) {
				console.error('Contact form error:', error);
				throw new Error('Failed to send your message. Please try again later.');
			}
		}
	})
};
