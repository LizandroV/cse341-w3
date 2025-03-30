import mongoose from 'mongoose';
import 'dotenv/config';

class dbClient {
	constructor() {
		this.connectDB();
	}

	async connectDB() {
		try {
			const dbName = 'cse341';
			const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/${dbName}?retryWrites=true&w=majority`;
			await mongoose.connect(queryString);
			console.log(
				`Conectado a la base de datos ${mongoose.connection.name || dbName}`,
			);
		} catch (error) {
			console.error(`Error al conectar a la Base de Datos, Error: ${error}`);
		}
	}

	async closeConnection() {
		try {
			await mongoose.disconnect();
			console.log('Connection closed');
		} catch (e) {
			console.error('Error in disconnect: ', e);
		}
	}
}

export default new dbClient();
