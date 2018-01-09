import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

jest.dontMock('../Header');

it('renders without crashing', () => {
  shallow(<App />);
});

const proxyquire =  require('proxyquire')
const assert     =  require('assert')
const pathStub   =  { };

const moviesAPI = proxyquire('./api/movies', {
  'path': pathStub
});
// assert.equal(moviesAPI.all(), 'myjwt');

it('calls the mock moviesAPI.all() function', () => {
  jest.mock('./api/movies');
  const allMockFunction = jest.fn().mockName('allMockFunction')
  App.mockImplementation(() => {
    return {
      all: allMockFunction
    }
  })

  const app = new App();
  app.all();
  expect(allMockFunction).toHaveBeenCalled();
});


// Jest Mock Function
   jest.mock('movies'); // src/__mocks__/movies.js

   // Assertion for a promise must be returned.
   it('works with promises on mock functions', () => {
     expect.assertions(1);
     return App.getMovies().then(data => expect(data.token).toEqual('mytoken'));
   });
