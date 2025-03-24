import { MongoClient } from 'mongodb';
import 'dotenv/config';

class dbClient {
	constructor() {
		const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/`;
		this.client = new MongoClient(queryString);
		this.connect();
	}

	async connect() {
		try {
			await this.client.connect();
			this.db = this.client.db('cse341');
			console.log(`Conectado a la base de datos: ${this.db.databaseName}`);
		} catch (error) {
			console.error(`Error al conectar a la Base de Datos, Error: ${error}`);
		}
	}
}

export default new dbClient();
