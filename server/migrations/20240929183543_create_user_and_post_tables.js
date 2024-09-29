/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    //Users Table
  return knex.schema
    .createTable('Users', (table) => {
        table.increments('user_id').primary();
        table.integer('github_id').notNullable();
        table.string('avatar_url').notNullable();
        table.string('name', 255).notNullable();
        table.string('email', 255).notNullable();
        table.string('password', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    })
    //Accounts Table
    .createTable('Accounts', (table) => {
        table.increments('account_id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.string('bank_name', 255).notNullable();
        table.string('account_type', 100).notNullable();
        table.decimal('balance', 14, 2).notNullable();
        table.string('account_number', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    
        table
        .foreign('user_id')
        .references('user_id')
        .inTable('Users')
        .onDelete('CASCADE');
    })
    //Transactions Table
    .createTable('Transactions', (table) => {
        table.increments('transaction_id').primary();
        table.integer('account_id').unsigned().notNullable();
        table.decimal('amount', 14, 2).notNullable();
        table.enu('transaction_type', ['income', 'expense']).notNullable();
        table.string('category', 255).notNullable();
        table.string('description', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    
        table
        .foreign('account_id')
        .references('account_id')
        .inTable('Accounts')
        .onDelete('CASCADE');
    })

    //Goals Table
    .createTable('Goals', (table) => {
        table.increments('goal_id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.string('goal_type', 255).notNullable();
        table.decimal('target_amount', 14, 2).notNullable();
        table.decimal('current_savings', 14, 2).defaultTo(0.00);
        table.date('deadline').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    
        table
        .foreign('user_id')
        .references('user_id')
        .inTable('Users')
        .onDelete('CASCADE');
    })
    //Budgets Table
    .createTable('Budgets', (table) => {
        table.increments('budget_id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.string('category', 255).notNullable();
        table.decimal('budgeted_amount', 14, 2).notNullable();
        table.decimal('actual_spent', 14, 2).defaultTo(0.00);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    
        table
        .foreign('user_id')
        .references('user_id')
        .inTable('Users')
        .onDelete('CASCADE');
    })
    //Loans Table
    .createTable('Loans', (table) => {
        table.increments('loan_id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.string('loan_type', 255).notNullable();
        table.decimal('outstanding_balance', 14, 2).notNullable();
        table.decimal('interest_rate', 5, 2).notNullable();
        table.string('payment_schedule', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    
        table
        .foreign('user_id')
        .references('user_id')
        .inTable('Users')
        .onDelete('CASCADE');
    })
    //Credit Scores Table
    .createTable('CreditScores', (table) => {
        table.increments('score_id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.integer('current_score').notNullable();
        table.json('score_history').nullable();
        table.decimal('credit_utilization', 5,2).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    
        table
        .foreign('user_id')
        .references('user_id')
        .inTable('Users')
        .onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('CreditScores')
  .dropTableIfExists('Loans')
  .dropTableIfExists('Budgets')
  .dropTableIfExists('Goals')
  .dropTableIfExists('Transactions')
  .dropTableIfExists('Accounts')
  .dropTableIfExists('Users');
};
