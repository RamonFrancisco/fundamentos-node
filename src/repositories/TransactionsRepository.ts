import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  type: 'income' | 'outcome',
  value: number;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initialValues = {
      income: 0,
      outcome: 0,
    }

    const {income, outcome} = this.transactions.reduce((acc, transaction) => {

      if (transaction.type.includes('income')) {
        return {
          ...acc,
          income: acc.income + transaction.value,
        }
      }
      
      return {
        ...acc,
        outcome: acc.outcome + transaction.value,
      }
    }, {...initialValues});

    const balance = {
      income,
      outcome,
      total: income - outcome,
    }

    return balance
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      type,
      value
    });

    this.transactions.push(transaction);

    return transaction
  }
}

export default TransactionsRepository;
