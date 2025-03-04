import { prisma } from './db';
import { Hono } from 'hono';

const app = new Hono();

// Root route
app.get('/', (c) => {
	return c.text('Hello Hono!');
});

// Get all users
app.get('/users', async (c) => {
	const users = await prisma.user.findMany();
	return c.json(users);
});

// Create a new user
app.post('/users', async (c) => {
	const body = await c.req.json();
	const user = await prisma.user.create({
		data: {
			name: body.name,
			email: body.email,
		},
	});
	return c.json(user, 201);
});

// Handle not found
app.notFound((c) => {
	return c.text('Route not found', 404);
});

export default app;
