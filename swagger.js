import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endPointsFiles = ['./server.js'];

const doc = {
	openapi: '3.0.0',
	info: {
		title: 'Adoption API',
		description: 'API for managing pet adoptions.',
		version: '1.0.0',
	},
	servers: [
		{
			url: 'https://cse341-w3-adoptionapi.onrender.com',
			description: 'Production Server',
		},
		{
			url: 'http://localhost:8080',
			description: 'Development Server',
		},
	],
	tags: [
		{
			name: 'Adoption',
			description: 'Operations related to pet adoptions',
		},
		{
			name: 'Owner',
			description: 'Operations related to pet owners',
		},
	],
	components: {
		securitySchemes: {
			BearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
		},
		schemas: {
			Pet: {
				type: 'object',
				properties: {
					name: { type: 'string', example: 'Bella' },
					type: { type: 'string', example: 'Dog' },
					race: { type: 'string', example: 'Labrador Retriever' },
					age: { type: 'integer', example: 3 },
					gender: { type: 'string', example: 'Female' },
					vaccinated: { type: 'boolean', example: true },
					sterilized: { type: 'boolean', example: false },
					description: {
						type: 'string',
						example: 'Friendly and energetic, great with kids.',
					},
				},
				required: ['name', 'type', 'age'],
			},
			Owner: {
				type: 'object',
				properties: {
					name: { type: 'string', example: 'John Doe' },
					email: { type: 'string', example: 'johndoe@example.com' },
					password: { type: 'string', example: 'SecurePass123' },
					phone: { type: 'string', example: '1234567890' },
				},
				required: ['name', 'email', 'password'],
			},
		},
		parameters: {
			petId: {
				in: 'path',
				name: 'id',
				required: true,
				schema: {
					type: 'string',
				},
				description: 'Pet ID',
				example: '60d0fe4f5311236168a109ca',
			},
		},
	},
	paths: {
		'/adoption': {
			post: {
				tags: ['Adoption'],
				summary: 'Create a new pet for adoption',
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Pet',
							},
						},
					},
				},
				responses: {
					201: { description: 'Pet created successfully' },
					500: { description: 'Server error' },
				},
			},
		},
		'/adoption/{id}': {
			put: {
				tags: ['Adoption'],
				summary: 'Update an existing pet',
				parameters: [{ $ref: '#/components/parameters/petId' }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Pet',
							},
						},
					},
				},
				responses: {
					200: { description: 'Pet updated successfully' },
					401: { description: 'Unauthorized' },
					500: { description: 'Server error' },
				},
			},
			get: {
				tags: ['Adoption'],
				summary: 'Get a pet by ID',
				parameters: [{ $ref: '#/components/parameters/petId' }],
				responses: {
					200: { description: 'Success' },
					404: { description: 'Pet not found' },
				},
			},
			delete: {
				tags: ['Adoption'],
				summary: 'Delete a pet by ID',
				parameters: [{ $ref: '#/components/parameters/petId' }],
				responses: {
					204: { description: 'Pet deleted successfully' },
					401: { description: 'Unauthorized' },
					500: { description: 'Server error' },
				},
			},
		},
		'/owner/register': {
			post: {
				tags: ['Owner'],
				summary: 'Register a new owner',
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Owner',
							},
						},
					},
				},
				responses: {
					201: { description: 'Owner registered successfully' },
					400: { description: 'Invalid data' },
				},
			},
		},
		'/owner/login': {
			post: {
				tags: ['Owner'],
				summary: 'Login owner',
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									email: { type: 'string', example: 'johndoe@example.com' },
									password: { type: 'string', example: 'SecurePass123' },
								},
								required: ['email', 'password'],
							},
						},
					},
				},
				responses: {
					200: {
						description: 'Login successful',
						content: {
							'application/json': {
								example: {
									token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
								},
							},
						},
					},
					401: { description: 'Invalid credentials' },
				},
			},
		},
		'/owner/profile': {
			get: {
				tags: ['Owner'],
				summary: 'Get owner profile',
				security: [{ BearerAuth: [] }], // Protegido con Bearer Token
				responses: {
					200: { description: 'Success' },
					401: { description: 'Unauthorized' },
				},
			},
		},
	},
};

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endPointsFiles, doc);
