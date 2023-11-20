const mongoose = require('mongoose');
require('dotenv').config();

// 1. Creation of a person schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] },
});

const Person = mongoose.model('Person', personSchema);

// 2. Use of all CRUD operations

// 2.1. Create and Save a Record of a Model
const personData = {
  name: 'John Doe',
  age: 25,
  favoriteFoods: ['Pizza', 'Burger'],
};

const person = new Person(personData);

person.save((err, data) => {
  if (err) return console.error(err);
  console.log('Person saved successfully:', data);

  // 3. Create Many Records with model.create()
  const arrayOfPeople = [
    { name: 'Alice', age: 30, favoriteFoods: ['Sushi', 'Pasta'] },
    { name: 'Bob', age: 28, favoriteFoods: ['Steak', 'Salad'] },
  ];

  Person.create(arrayOfPeople, (err, createdPeople) => {
    if (err) return console.error(err);
    console.log('People created successfully:', createdPeople);

    // 4. Use model.find() to Search Your Database
    Person.find({ name: 'Alice' }, (err, people) => {
      if (err) return console.error(err);
      console.log('People with name "Alice":', people);

      // 5. Use model.findOne() to Return a Single Matching Document
      Person.findOne({ favoriteFoods: 'Pizza' }, (err, person) => {
        if (err) return console.error(err);
        console.log('Person with favorite food "Pizza":', person);

        // 6. Use model.findById() to Search Your Database By _id
        const personId = person._id;
        Person.findById(personId, (err, foundPerson) => {
          if (err) return console.error(err);
          console.log('Person with id', personId, ':', foundPerson);

          // 7. Perform Classic Updates by Running Find, Edit, then Save
          foundPerson.favoriteFoods.push('Hamburger');
          foundPerson.save((err, updatedPerson) => {
            if (err) return console.error(err);
            console.log('Person updated successfully:', updatedPerson);

            // 8. Perform New Updates on a Document Using model.findOneAndUpdate()
            const personName = 'John Doe';
            Person.findOneAndUpdate(
              { name: personName },
              { age: 20 },
              { new: true },
              (err, updatedPerson) => {
                if (err) return console.error(err);
                console.log('Person updated by name:', updatedPerson);

                // 9. Delete One Document Using model.findByIdAndRemove
                Person.findByIdAndRemove(personId, (err, removedPerson) => {
                  if (err) return console.error(err);
                  console.log('Person removed:', removedPerson);

                  // 10. MongoDB and Mongoose - Delete Many Documents with model.remove()
                  Person.remove({ name: 'Mary' }, (err, result) => {
                    if (err) return console.error(err);
                    console.log('People named Mary removed:', result);

                    // 11. Chain Search Query Helpers to Narrow Search Results
                    Person.find({ favoriteFoods: 'burritos' })
                      .sort('name')
                      .limit(2)
                      .select('-age')
                      .exec((err, burritoLovers) => {
                        if (err) return console.error(err);
                        console.log('Burrito lovers:', burritoLovers);
                      });
                  });
                });
              }
            );
          });
        });
      });
    });
  });
});

