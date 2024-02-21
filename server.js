const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
