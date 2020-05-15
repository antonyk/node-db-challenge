
exports.up = function(knex) {
  return knex.schema
  .createTable('projects', table => {
    table.increments('id');

    table.string('name', 255).notNullable();
    table.string('description');
    table.boolean('completed').notNullable().defaultTo(false);
  })
  .createTable('tasks', table => {
    table.increments('id');

    table.string('description').notNullable();
    table.string('notes');
    table.boolean('completed').notNullable().defaultTo(false);

    table.integer('project_id').unsigned().notNullable()
      .references('id').inTable('projects').onDelete('CASCADE').onUpdate('CASCADE');
  })
  .createTable('resources', table => {
    table.increments('id');

    table.string('name', 255).notNullable();
    table.string('description');

    table.integer('project_id').unsigned().notNullable()
      .references('id').inTable('projects').onDelete('CASCADE').onUpdate('CASCADE');
  })
};

exports.down = function(knex) {

  return knex.schema
    .dropIfTableExists('resources')
    .dropIfTableExists('tasks')
    .dropIfTableExists('projects')
};
