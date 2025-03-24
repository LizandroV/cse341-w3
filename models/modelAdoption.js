import { ObjectId } from 'mongodb';
import dbClient from '../config/dbClient.js';

class adoptionModel {
	async create(pet) {
		const colAdoption = dbClient.db.collection('adoption');
		return await colAdoption.insertOne(pet);
	}

	async getAll() {
		const colAdoption = dbClient.db.collection('adoption');
		return await colAdoption.find({}).toArray();
	}

	async getOne(id) {
		const ID = new ObjectId(id);
		const colAdoption = dbClient.db.collection('adoption');
		return await colAdoption.findOne({ _id: ID });
	}

	async update(id, pet) {
		const ID = new ObjectId(id);
		const colAdoption = dbClient.db.collection('adoption');
		return await colAdoption.updateOne({ _id: ID }, { $set: pet });
	}

	async delete(id) {
		const ID = new ObjectId(id);
		const colAdoption = dbClient.db.collection('adoption');
		return await colAdoption.deleteOne({ _id: ID });
	}
}

export default new adoptionModel();
