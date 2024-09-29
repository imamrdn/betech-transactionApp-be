const express = require("express");
const { config } = require("dotenv").config();
const usersRouter = require("./routes/UsersRouter");
const transactionsRouter = require("./routes/TransactionsRouter");
const authentication = require("./middleware/Authentication");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(usersRouter);
app.use(authentication);
app.use("/transactions", transactionsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Base URL: localhost:${process.env.PORT}`);
});

module.exports = app;
