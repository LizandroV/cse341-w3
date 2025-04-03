import mongoose from 'mongoose';

// Validación personalizada para el nombre (entre 2 y 50 caracteres)
const isValidName = (name) => name.length >= 2 && name.length <= 50;

// Esquema de dueño (Owner)
const ownerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is required'],
			trim: true,
			validate: [isValidName, 'Name must be between 2 and 50 characters'],
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			trim: true,
			unique: true,
			lowercase: true,
			match: [/\S+@\S+\.\S+/, 'Email is invalid'],
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			trim: true,
			minlength: [8, 'Password must be at least 8 characters long'],
		},
		phone: {
			type: String,
			required: false,
			match: [/^\d{10,15}$/, 'Phone number must be between 10 and 15 digits'],
		},
		pets: {
			type: [String], // Array de strings (nombres de mascotas)
			required: false,
			default: [],
		},
	},
	{
		timestamps: true,
		collection: 'owners',
	},
);

export default mongoose.model('owners', ownerSchema);
