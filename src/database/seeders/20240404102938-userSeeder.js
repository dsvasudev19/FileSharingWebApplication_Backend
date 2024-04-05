'use strict';

/** @type {import('sequelize-cli').Migration} */
const {User}=require("../../models")
const bcrypt=require('bcrypt')
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await User.create({
     first_name:"darse",
     last_name:"vasudev",
     email:"vasudevds@devdrive.com",
     password:bcrypt.hashSync("password",10),
     phone:"9876543210",
     gender:"Male",
     dob:"2020-01-01",
     username:"ds.vasudev",
     location:"Hyderabad",
     createdAt:new Date(),
     updatedAt:new Date()
   })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
