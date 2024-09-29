const { Transaction } = require("../models");

class TransactionRepository {
  static async createTransaction({ date, description, type, amount, userId }) {
    try {
      const newTransaction = await Transaction.create({
        date,
        description,
        type,
        amount,
        userId,
      });
      return newTransaction;
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  }

  static async getAllTransactions(userId) {
    try {
      const transactions = await Transaction.findAll({
        where: { userId },
      });
      return transactions;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  }

  static async getTransactionById(transactionId, userId) {
    try {
      const transaction = await Transaction.findOne({
        where: { id: transactionId, userId },
      });
      return transaction;
    } catch (error) {
      console.error("Error fetching transaction by ID:", error);
      throw error;
    }
  }

  static async updateTransaction(transactionId, updates, userId) {
    try {
      const [updated] = await Transaction.update(updates, {
        where: { id: transactionId, userId },
      });
      return updated;
    } catch (error) {
      console.error("Error updating transaction:", error);
      throw error;
    }
  }

  static async deleteTransaction(transactionId, userId) {
    try {
      const deleted = await Transaction.destroy({
        where: { id: transactionId, userId },
      });
      return deleted;
    } catch (error) {
      console.error("Error deleting transaction:", error);
      throw error;
    }
  }

  static async getBalance(userId) {
    try {
      const transactions = await Transaction.findAll({
        where: { userId },
      });

      const balance = transactions.reduce((acc, transaction) => {
        return transaction.type === "income"
          ? acc + transaction.amount
          : acc - transaction.amount;
      }, 0);

      return balance;
    } catch (error) {
      console.error("Error fetching balance:", error);
      throw error;
    }
  }
}

module.exports = TransactionRepository;
