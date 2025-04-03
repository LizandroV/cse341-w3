import modelOwner from '../models/modelOwners.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../helpers/authentication.js';

class ownerController {
	constructor() {}

	async register(req, res) {
		/* 
        #swagger.tags = ['Owner']
        #swagger.summary = 'Register a new owner'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Owner"
                    }
                }
            }
        }
        #swagger.responses[201] = {
            description: "Owner registered successfully"
        }
        #swagger.responses[400] = {
            description: "The user already exists"
        }
        #swagger.responses[500] = {
            description: "Server error"
        }
        */
		try {
			const { name, email, password, phone } = req.body;

			const usuarioExists = await modelOwner.getOne({ email });
			if (usuarioExists) {
				return res.status(400).json({ error: 'The user exists' });
			}

			const passEncrypt = await bcrypt.hash(password, 10);
			const data = await modelOwner.create({
				email,
				name,
				phone,
				password: passEncrypt,
			});
			return res.status(201).json(data);
		} catch (e) {
			return res.status(500).json({ message: `${e}` });
		}
	}

	async login(req, res) {
		/* 
        #swagger.tags = ['Owner']
        #swagger.summary = 'Login owner'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            email: { type: "string", example: "johndoe@example.com" },
                            password: { type: "string", example: "SecurePass123" }
                        },
                        required: ["email", "password"]
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: "Login successful",
            content: {
                "application/json": {
                    example: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
                }
            }
        }
        #swagger.responses[400] = {
            description: "Invalid credentials"
        }
        #swagger.responses[500] = {
            description: "Server error"
        }
        */
		try {
			const { email, password } = req.body;

			const usuarioExists = await modelOwner.getOne({ email });
			if (!usuarioExists) {
				return res.status(400).json({ error: 'The user does not exist' });
			}

			const valid = await bcrypt.compare(password, usuarioExists.password);
			if (!valid) {
				return res.status(400).json({ error: 'The password is incorrect' });
			}

			const token = generateToken(email);
			return res.status(200).json({ msg: 'Login Successful', token });
		} catch (e) {
			return res.status(500).send(e);
		}
	}

	async profile(req, res) {
		/* 
        #swagger.tags = ['Owner']
        #swagger.summary = 'Get owner profile'
        #swagger.security = [{
            "BearerAuth": []
        }]
        #swagger.responses[200] = {
            description: "Owner profile retrieved successfully"
        }
        #swagger.responses[401] = {
            description: "Unauthorized"
        }
        #swagger.responses[500] = {
            description: "Server error"
        }
        */
		try {
			const data = await modelOwner.getOne({ email: req.emailConnected });
			return res.status(200).json(data);
		} catch (error) {
			return res
				.status(500)
				.json({ message: `Error fetching profile, Error: ${error}` });
		}
	}
}

export default new ownerController();
