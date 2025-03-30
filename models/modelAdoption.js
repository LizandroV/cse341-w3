import mongoose from 'mongoose';
import Adoption from '../schemas/schemaAdoption.js';
import CustomError from '../utils/CustomError.js';

class AdoptionModel {
	async create(pet) {
		try {
			const newPet = await Adoption.create(pet);
			return newPet;
		} catch (error) {
			throw new CustomError(`${error.message}`, 400);
		}
	}

	async getAll() {
		try {
			const pets = await Adoption.find();
			return pets;
		} catch (error) {
			throw new CustomError(`Error retrieving pets: ${error.message}`, 500);
		}
	}

	async getOne(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			throw new CustomError('Invalid ID format', 400);
		}
		try {
			const pet = await Adoption.findById(id);
			if (!pet) {
				throw new CustomError('Pet not found', 404);
			}
			return pet;
		} catch (error) {
			throw new CustomError(`Error retrieving pet: ${error.message}`, 500);
		}
	}

	async update(id, pet) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			throw new CustomError('Invalid ID format', 400);
		}

		const allowedFields = [
			'name',
			'type',
			'breed',
			'age',
			'gender',
			'size',
			'color',
			'vaccinated',
			'neutered',
			'microchipped',
			'description',
		];
		const invalidFields = Object.keys(pet).filter(
			(key) => !allowedFields.includes(key),
		);

		if (invalidFields.length > 0) {
			throw new CustomError(`Invalid fields: ${invalidFields.join(', ')}`, 400);
		}

		try {
			const updatedPet = await Adoption.findByIdAndUpdate(id, pet, {
				new: true,
				runValidators: true,
				context: 'query',
			});

			if (!updatedPet) {
				throw new CustomError('Pet not found', 404);
			}

			return updatedPet;
		} catch (error) {
			throw new CustomError(`Error updating pet: ${error.message}`, 500);
		}
	}

	async delete(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			throw new CustomError('Invalid ID format', 400);
		}
		try {
			const deletedPet = await Adoption.findByIdAndDelete(id);
			if (!deletedPet) {
				throw new CustomError('Pet not found', 404);
			}
			return deletedPet;
		} catch (error) {
			throw new CustomError(`Error deleting pet: ${error.message}`, 500);
		}
	}
}

export default new AdoptionModel();
