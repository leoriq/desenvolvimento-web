
module.exports = {
  dialect: 'postgres',
  host:"localhost",
  username:"postgres",
  password:"docker",
  database:"pizzadb",
  port:"5432",
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
  //   },
  // },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
