import mongoose from 'mongoose';

class Database {
  public async getConnection(
    mongoURL: string,
  ): Promise<mongoose.Connection> | undefined {
    let connection;
    try {
      connection = await mongoose.connect(mongoURL);

      return connection ? connection : undefined;
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  }

  public async closeConnection(connection: mongoose.Connection): Promise<void> {
    try {
      if (connection) await connection.close();
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  }
}

export default new Database();
