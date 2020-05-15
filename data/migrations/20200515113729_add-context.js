
exports.up = function(knex) {
  return knex.schema
  .createTable('contexts', table => {
    table.increments('id');

    table.string('name', 255).notNullable();
  })
  .createTable('task_contexts', table => {
    table.increments('id');

    table.integer('task_id').unsigned().notNullable()
      .references('id').inTable('tasks').onDelete('CASCADE').onUpdate('CASCADE');

    table.integer('context_id').unsigned().notNullable()
      .references('id').inTable('contexts').onDelete('CASCADE').onUpdate('CASCADE');
  })
  
};

exports.down = function(knex) {
  return knex.schema
    .dropIfTableExists('task_contexts')
    .dropIfTableExists('contexts')
};
