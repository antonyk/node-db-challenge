
exports.up = function(knex) {
  return knex.schema
  .createTable('projects', table => {
    table.increments('id');

    table.string('name', 255).notNullable();
    table.string('description');
    table.boolean('completed').notNullable().defaultTo(false);
  })
  .createTable('resources', table => {
    table.increments('id');

    table.string('name', 255).notNullable();
    table.string('description');
  })
  .createTable('tasks', table => {
    table.increments('id');

    table.string('description').notNullable();
    table.string('notes');
    table.boolean('completed').notNullable().defaultTo(false);

    // 1-* with projects
    table.integer('project_id').unsigned().notNullable()
      .references('id').inTable('projects').onDelete('CASCADE').onUpdate('CASCADE');
  })
  .createTable('project_resources', table => {
    table.increments('id');

    // *-*
    table.integer('project_id').unsigned().notNullable()
      .references('id').inTable('projects').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('resource_id').unsigned().notNullable()
      .references('id').inTable('resources').onDelete('CASCADE').onUpdate('CASCADE');
  })
};

exports.down = function(knex) {

  return knex.schema
    .dropIfTableExists('project_resources')
    .dropIfTableExists('tasks')
    .dropIfTableExists('resources')
    .dropIfTableExists('projects')
};
