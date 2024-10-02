/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('CreditScores').del();
  await knex('Loans').del();
  await knex('Budgets').del();
  await knex('Goals').del();
  await knex('Transactions').del();
  await knex('Accounts').del();
  await knex('Users').del();

  //Inserts users
  await knex('Users').insert([
    {
      user_id: 1,
      github_id: 239,
      avatar_url: 'exampleurl.com',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'hashedpassword1'
    },
    {
      user_id: 2,
      github_id: 275,
      avatar_url: 'exampleurl2.com',
      name: 'Jane snow',
      email: 'janesnow@example.com',
      password: 'hashedpassword2'
    }
  ]);

  //Inserts accounts
  await knex('Accounts').insert([
    { 
      account_id: 1,
      user_id: 1,
      bank_name: 'Chase',
      account_type: 'Checking',
      balance: 2500.75,
      account_number: '1234567890'
    },
    { 
      account_id: 2,
      user_id: 1,
      bank_name: 'Capital One',
      account_type: 'Credit Card',
      balance: -500.00,
      account_number: '9876543210'
    },
    { 
      account_id: 3,
      user_id: 2,
      bank_name: 'Wells Fargo',
      account_type: 'Savings',
      balance: 10000.00,
      account_number: '1122334455'
    }
  ]);

  //Inserts transactions
  await knex('Transactions').insert([
    { 
      transaction_id: 1,
      account_id: 1,
      amount: -50.00,
      transaction_type: 'expense',
      category: 'Groceries',
      date: '2024-09-20',
      description: 'Grocery Store'
    },
    { 
      transaction_id: 2,
      account_id: 1,
      amount: 1500.00,
      transaction_type: 'income',
      category: 'Salary',
      date: '2024-09-15',
      description: 'Monthly Paycheck'
    },
    { 
      transaction_id: 3,
      account_id: 2,
      amount: -100.00,
      transaction_type: 'expense',
      category: 'Utilities',
      date: '2024-09-18',
      description: 'Electricity Bill'
    }
  ]);

  //Inserts goals
  await knex('Goals').insert([
    {
      goal_id: 1,
      user_id: 1, 
      goal_type: 'Save for Vacation',
      target_amount: 5000,
      current_savings: 1000,
      deadline: '2025-06-01'
    },
    {
      goal_id: 2,
      user_id: 2, 
      goal_type: 'Emergency Fund',
      target_amount: 10000,
      current_savings: 3000,
      deadline: '2026-12-31'
    }
  ]);

  //Inserts loans
  await knex('Loans').insert([
    {
      loan_id: 1,
      user_id: 1,
      loan_type: 'Student Loan',
      outstanding_balance: 15000,
      interest_rate: 4.5,
      payment_schedule: 'Monthly'
    },
    {
      loan_id: 2,
      user_id: 2,
      loan_type: 'Mortgage',
      outstanding_balance: 250000,
      interest_rate: 3.8,
      payment_schedule: 'Monthly'
    }
  ]);

  //Insert credit scores
  await knex('CreditScores').insert([
    {
      score_id: 1,
      user_id: 1,
      current_score: 720,
      score_history: JSON.stringify(
        [
          {
            date: '2024-08-01', score: 710
          },
          {
            date: '2024-09-01', score: 720
          }
        ]
      ),
      credit_utilization: 25.0
    },
    {
      score_id: 2,
      user_id: 2,
      current_score: 680,
      score_history: JSON.stringify(
        [
          {
            date: '2024-08-01', score: 670
          },
          {
            date: '2024-09-01', score: 680
          }
        ]
      ),
      credit_utilization: 35.0
    }
  ]);
};
