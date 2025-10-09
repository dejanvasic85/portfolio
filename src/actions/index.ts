import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
	contact: defineAction({
		accept: 'form',
		input: z.object({
			name: z
				.string()
				.nullable()
				.transform((val) => val ?? '')
				.pipe(z.string().min(1, 'Name is required')),
			email: z
				.string()
				.nullable()
				.transform((val) => val ?? '')
				.pipe(z.string().min(1, 'Email is required').email('Please enter a valid email address')),
			projectType: z.string().optional(),
			message: z
				.string()
				.nullable()
				.transform((val) => val ?? '')
				.pipe(z.string().min(10, 'Message must be at least 10 characters'))
		}),
		async handler(input) {
			// TODO: Integrate AWS SES for sending emails
			// For now, just log the data
			console.log('Contact form submission:', input);

			// Simulate processing
			await new Promise((resolve) => setTimeout(resolve, 500));

			return {
				success: true,
				message: "Thank you for reaching out! I'll get back to you soon."
			};
		}
	})
};
