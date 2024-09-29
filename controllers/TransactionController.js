const http = require("http");
const transactionRepository = require("../repository/TransactionRepository");

class TransactionController {
  static async createTransaction(req, res, next) {
    const { date, description, type, amount } = req.body;
    const userId = req.user.id;

    if (!date || !description || !type || !amount) {
      return res.status(400).json({
        status: http.STATUS_CODES[400],
        message: "All fields are required (date, description, type, amount)",
      });
    }

    try {
      const newTransaction = await transactionRepository.createTransaction({
        date,
        description,
        type,
        amount,
        userId,
      });

      return res.status(201).json({
        status: http.STATUS_CODES[201],
        message: "Transaction created successfully",
        data: {
          transaction: newTransaction,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllTransactions(req, res, next) {
    const userId = req.user.id;

    try {
      const transactions = await transactionRepository.getAllTransactions(
        userId
      );

      return res.status(200).json({
        status: http.STATUS_CODES[201],
        data: {
          transactions: transactions,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTransactionById(req, res, next) {
    const transactionId = req.params.id;
    const userId = req.user.id;

    try {
      const transaction = await transactionRepository.getTransactionById(
        transactionId,
        userId
      );

      if (!transaction) {
        return res.status(404).json({
          status: http.STATUS_CODES[404],
          message: "Transaction not found",
        });
      }

      return res.status(200).json({
        status: http.STATUS_CODES[200],
        data: {
          transaction: transaction,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateTransaction(req, res, next) {
    const transactionId = req.params.id;
    const { date, description, type, amount } = req.body;
    const userId = req.user.id;

    if (!date || !description || !type || !amount) {
      return res.status(400).json({
        status: http.STATUS_CODES[400],
        message: "All fields are required (date, description, type, amount)",
      });
    }

    try {
      const updatedTransaction = await transactionRepository.updateTransaction(
        transactionId,
        { date, description, type, amount },
        userId
      );

      if (!updatedTransaction) {
        return res.status(404).json({
          status: http.STATUS_CODES[404],
          message: "Transaction not found or update failed",
        });
      }

      const transaction = await transactionRepository.getTransactionById(
        transactionId,
        userId
      );

      return res.status(200).json({
        status: http.STATUS_CODES[200],
        message: "Transaction updated successfully",
        data: {
          transaction,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTransaction(req, res, next) {
    const transactionId = req.params.id;
    const userId = req.user.id;

    try {
      const deleted = await transactionRepository.deleteTransaction(
        transactionId,
        userId
      );

      if (!deleted) {
        return res.status(404).json({
          status: http.STATUS_CODES[404],
          message: "Transaction not found or delete failed",
        });
      }

      return res.status(200).json({
        status: http.STATUS_CODES[200],
        message: "Transaction deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getBalance(req, res, next) {
    const userId = req.user.id;

    try {
      const balance = await transactionRepository.getBalance(userId);

      return res.status(200).json({
        status: http.STATUS_CODES[200],
        balance,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TransactionController;
