import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize('TimKiemViecLamDB', 'root', 'ArandomPassword5@', {
  host: 'localhost',  // hoặc 'localhost:33060' nếu MySQL của bạn sử dụng cổng này
  dialect: 'mysql',
  logging: false, 
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL Database");

    await sequelize.sync({ force: false });  // `force: false` sẽ không xóa bảng hiện tại nếu đã tồn tại
    console.log("Database synced");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}

syncDatabase();

export default sequelize;