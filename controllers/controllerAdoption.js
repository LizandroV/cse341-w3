import modelAdoption from '../models/modelAdoption.js';

class adoptionController {
	constructor() {
		this.adoption = [];
	}

	async create(req, res) {
		/*  #swagger.tags = ['Adoption']
            #swagger.summary = 'Create a new pet for adoption'
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Pet"
                        }
                    }
                }
            }
        */
		try {
			const data = await modelAdoption.create(req.body);
			res.status(201).json(data);
		} catch (error) {
			res.status(500).json({ message: `${error}` });
		}
	}

	async update(req, res) {
		/*  #swagger.tags = ['Adoption']
            #swagger.summary = 'Update an existing pet'
            #swagger.parameters['id'] = {
                in: 'path',
                required: true,
                description: 'ID of the pet to update',
                example: '60d0fe4f5311236168a109ca'
            }
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Pet"
                        }
                    }
                }
            }
        */
		try {
			const { id } = req.params;
			const data = await modelAdoption.update(id, req.body);
			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ message: `${error}` });
		}
	}

	async delete(req, res) {
		/*  #swagger.tags = ['Adoption']
            #swagger.summary = 'Delete a pet by ID'
            #swagger.parameters['id'] = {
                in: 'path',
                required: true,
                description: 'ID of the pet to delete',
                example: '60d0fe4f5311236168a109ca'
            }
        */
		try {
			const { id } = req.params;
			const data = await modelAdoption.delete(id);
			res.status(204).json(data);
		} catch (error) {
			res.status(500).json({ message: `${error}` });
		}
	}

	async getAll(req, res) {
		/*  #swagger.tags = ['Adoption']
            #swagger.summary = 'Retrieve all pets available for adoption'
        */
		try {
			const data = await modelAdoption.getAll();
			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ message: `${error}` });
		}
	}

	async getOne(req, res) {
		/*  #swagger.tags = ['Adoption']
            #swagger.summary = 'Retrieve a pet by ID'
            #swagger.parameters['id'] = {
                in: 'path',
                required: true,
                description: 'ID of the pet to retrieve',
                example: '60d0fe4f5311236168a109ca'
            }
        */
		try {
			const { id } = req.params;
			const data = await modelAdoption.getOne(id);
			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ message: `${error}` });
		}
	}
}

export default new adoptionController();
