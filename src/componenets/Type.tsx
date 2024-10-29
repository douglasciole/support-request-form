import { z } from "zod";

export const schema = z.object({
	fullName: z.string().min(1, "Full Name is required"),
	email: z.string().email("Invalid email address").min(1, "Email is required"),
	issueType: z.string().min(1, "Issue Type is required"),
	tags: z.array(z.string()).optional(),
	steps: z
		.array(
			z.object({
				title: z.string().min(1, "Step title is required"),
			})
		)
		.min(1, "At least one step is required"),
});

export type FormData = z.infer<typeof schema>;
