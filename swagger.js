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
	],
	components: {
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
					500: { description: 'Server error' },
				},
			},
		},
	},
};

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endPointsFiles, doc);
