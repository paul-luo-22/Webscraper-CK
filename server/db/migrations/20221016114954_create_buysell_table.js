/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('buysell', (table) => {
    table.increments('id')
    table.string('cardName')
    table.int('sellPrice')
    table.int('buyPrice')
    table.int('sellBuyPercentage')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('buysell')
}
