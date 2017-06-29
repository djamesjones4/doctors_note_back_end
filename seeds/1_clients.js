
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('clients').del()
    .then(function() {
      return Promise.all([
      // Inserts seed entries
        knex('clients').insert([
          { id: 1,
            firstname: 'Derek',
            lastname: 'Jones',
            username: 'djamesjones4',
            hashed_password: "",
            email: 'djamesjones4@gmail.com',
            isclient: true,
            ispractitioner: false,
            isadmin: false
          }
        ])
      ])
    }).then(() => {
      return knex.raw("SELECT setval('clients_id_seq', (SELECT MAX(id) FROM clients));")
    })
}