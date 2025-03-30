import mongoose from 'mongoose';

const isValidName = (name) => name.length >= 2 && name.length <= 50;
const isPositiveInteger = (num) => Number.isInteger(num) && num >= 0;

const adoptionSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is required'],
			trim: true,
			validate: [isValidName, 'Name must be between 2 and 50 characters'],
		},
		type: {
			type: String,
			required: [true, 'Type is required'],
			enum: {
				values: ['dog', 'cat', 'rabbit', 'bird', 'other'],
				message: 'Invalid type. Must be dog, cat, rabbit, bird, or other',
			},
		},
		breed: {
			type: String,
			trim: true,
			default: 'Unknown',
		},
		age: {
			type: Number,
			required: [true, 'Age is required'],
			validate: [isPositiveInteger, 'Age must be a positive integer'],
		},
		gender: {
			type: String,
			required: [true, 'Gender is required'],
			enum: {
				values: ['male', 'female'],
				message: 'Invalid gender. Must be male or female',
			},
		},
		size: {
			type: String,
			required: [true, 'Size is required'],
			enum: {
				values: ['small', 'medium', 'large'],
				message: 'Invalid size. Must be small, medium or large',
			},
		},
		color: {
			type: String,
			required: [true, 'Color is required'],
		},
		vaccinated: {
			type: Boolean,
			default: false,
		},
		neutered: {
			type: Boolean,
			default: false,
		},
		microchipped: {
			type: Boolean,
			default: false,
		},
		description: {
			type: String,
			trim: true,
			maxlength: [500, 'Description must be 500 characters or less'],
		},
	},
	{
		timestamps: true,
		collection: 'adoption',
	},
);

// Middleware to prevent duplicate names for the same type
adoptionSchema.pre('save', async function (next) {
	const existingAnimal = await mongoose.models.adoption.findOne({
		name: this.name,
		type: this.type,
	});
	if (existingAnimal) {
		return next(new Error('An animal with this name and type already exists'));
	}
	next();
});

export default mongoose.model('adoption', adoptionSchema);
