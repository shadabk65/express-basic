import mongoose from 'mongoose';

// database connections
const ConnectDb = async (DB_URL) => {
	try {
		const DB_OPTIONS = {
			dbName:"authapp"
		}
		await mongoose.connect(DB_URL, DB_OPTIONS )
		console.log("Connected Successfully.....")
	}catch(error){
		console.log(error)
	}
}

export default ConnectDb