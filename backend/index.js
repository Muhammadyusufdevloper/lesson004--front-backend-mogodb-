const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const Users = require("./routes/users")

app.use("/users", Users);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
