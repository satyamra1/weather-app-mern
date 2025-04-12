const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Route = require("./routes/weather");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use("/weather", Route);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
