'use strict';
const chai = require('chai');
const expect = chai.expect;
const Person = require('../../models/person');

describe("Person", function(){
it('should have a full name', function() {
  const person = new Person({firstName: 'kasumi',lastName: 'takeshima'})

    expect(person.fullName()).to.equal('kasumi takeshima');

  });
});
