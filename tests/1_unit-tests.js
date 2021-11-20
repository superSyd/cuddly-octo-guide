const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');

let solver = new Solver();

suite('UnitTests', () => {

//Logic handles a valid puzzle string of 81 characters
 test("Logic handles a valid puzzle string of 81 characters", ()=>{
      assert.equal(solver.validate('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'), true,'valid puzzle string of 81 characters')
    });
//Logic handles a puzzle string with invalid characters (not 1-9 or .)
test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", ()=>{

      let output = { error: 'Invalid characters in puzzle' }
      assert.deepEqual(solver.validate('A..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'), output,'invalid characters (not 1-9 or .)')
    });
//Logic handles a puzzle string that is not 81 characters in length
test("Logic handles a puzzle string that is not 81 characters in length", ()=>{
      let output = { error: 'Expected puzzle to be 81 characters long' }
      assert.deepEqual(solver.validate('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...33'), output ,'puzzle string that is not 81 characters in length')
    });
//Logic handles a valid row placement
test("Logic handles a valid row placement", ()=>{
      assert.equal(solver.checkRowPlacement('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3', "A", 2, 4), true,'valid row placement')
    });
//Logic handles an invalid row placement
test("Logic handles an invalid row placement", ()=>{
      assert.equal(solver.checkRowPlacement('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3', "A", 2, 5), "conflict",'invalid row placement')
    });
//Logic handles a valid column placement
test("Logic handles a valid column placement", ()=>{
      assert.equal(solver.checkColPlacement('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3', "A", 2, 4), true,'valid column placement')
    });
//Logic handles an invalid column placement
test("Logic handles an invalid column placement", ()=>{
      assert.equal(solver.checkColPlacement('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3', "A", 2, 5), "conflict",'invalid column placement')
    });
//Logic handles a valid region (3x3 grid) placement
test("Logic handles a valid region (3x3 grid) placement", ()=>{
      assert.equal(solver.checkRegionPlacement('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3', "A", 2, 4), true,'valid region (3x3 grid) placement')
    });
//Logic handles an invalid region (3x3 grid) placement
test("Logic handles an invalid region (3x3 grid) placement", ()=>{
      assert.equal(solver.checkRegionPlacement('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3', "C", 3, 3), "conflict",'invalid region (3x3 grid) placement')
    });
//Valid puzzle strings pass the solver
test("Valid puzzle strings pass the solver", ()=>{
      assert.equal(solver.validate('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'), true,'Valid puzzle strings pass the solver')
    });
//Invalid puzzle strings fail the solver
test("Invalid puzzle strings fail the solver", ()=>{
  let output = { error: 'Puzzle cannot be solved' }
      assert.deepEqual(solver.solve('55.91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'), output,'Invalid puzzle strings fail the solver')
    });
//Solver returns the the expected solution for an incomplete puzzle
test("Solver returns the the expected solution for an incomplete puzzle", ()=>{
  let output = { solution: '568913724342687519197254386685479231219538467734162895926345178473891652851726943' }

      assert.deepEqual(solver.solve('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'), output,'expected solution for an incomplete puzzle')
    });

});
