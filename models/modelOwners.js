import mongoose from 'mongoose';
import Owner from '../schemas/schemaOwners.js';
import CustomError from '../utils/CustomError.js';

class OwnerModel {
	async create(owner) {
		try {
			const newOwner = await Owner.create(owner);
			return newOwner;
		} catch (error) {
			throw new CustomError(`${error.message}`, 400);
		}
	}

	async getAll() {
		try {
			const Owners = await Owner.find();
			return Owners;
		} catch (error) {
			throw new CustomError(`Error retrieving Owners: ${error.message}`, 500);
		}
	}

	async getOneById(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			throw new CustomError('Invalid ID format', 400);
		}
		try {
			const owner = await Owner.findById(id);
			if (!owner) {
				throw new CustomError('Owner not found', 404);
			}
			return owner;
		} catch (error) {
			throw new CustomError(`Error retrieving Owner: ${error.message}`, 500);
		}
	}

	async getOne(filter) {
		try {
			const user = await Owner.findOne(filter);
			return user;
		} catch (error) {
			throw new Error(`Error retrieving User: ${error.message}`);
		}
	}
	async update(id, owner) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			throw new CustomError('Invalid ID format', 400);
		}

		const allowedFields = ['name', 'email', 'password', 'phone', 'pets'];
		const invalidFields = Object.keys(owner).filter(
			(key) => !allowedFields.includes(key),
		);

		if (invalidFields.length > 0) {
			throw new CustomError(`Invalid fields: ${invalidFields.join(', ')}`, 400);
		}

		try {
			const updatedOwner = await Owner.findByIdAndUpdate(id, owner, {
				new: true,
				runValidators: true,
				context: 'query',
			});

			if (!updatedOwner) {
				throw new CustomError('Owner not found', 404);
			}

			return updatedOwner;
		} catch (error) {
			throw new CustomError(`Error updating Owner: ${error.message}`, 500);
		}
	}

	async delete(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			throw new CustomError('Invalid ID format', 400);
		}
		try {
			const deletedOwner = await Owner.findByIdAndDelete(id);
			if (!deletedOwner) {
				throw new CustomError('Owner not found', 404);
			}
			return deletedOwner;
		} catch (error) {
			throw new CustomError(`Error deleting Owner: ${error.message}`, 500);
		}
	}
}

export default new OwnerModel();
