
var array = [];

class SudokuSolver {
  

  validate(puzzleString) {
    
    if(puzzleString.length != 81){
      return { error: 'Expected puzzle to be 81 characters long' }
    } else {

        //regex
    let invalidValues
    let myRegex = /[^\.*^\d*]/g
    invalidValues = myRegex.test(puzzleString)

    if(invalidValues == false){
      //puzzleString is valid
      return true
    } else {
      return { error: 'Invalid characters in puzzle' }
    }
           

    }

    
  }

  validateCheck(row,column,value){
    let validValues = /[1-9]/g
    let myRowRegex = /[a-i]/g

    if(!myRowRegex.test(row.toLowerCase())){
      return { error: 'Invalid coordinate'}
    } else if(column <= 0 || column >= 10){
      return { error: 'Invalid coordinate' }
    } else if(value <= 0 || value >= 10){
      return { error: 'Invalid value' }
    } else if(!validValues.test(value)){
      return { error: 'Invalid value' }
    } else {
      return true
    }

  }

  solvable(puzzleTable){

    var solvable = []

    for (let i = 0; i < puzzleTable.length; i++)
        { 
            for (let j = i + 1; j < puzzleTable.length; j++)
            {
                if(puzzleTable[i].value != "."){
                  if(puzzleTable[j].value != "."){
                    
                    //console.log(puzzleTable[i].value, puzzleTable[j].value)

                    if (puzzleTable[i].value == puzzleTable[j].value){
                      
                  solvable.push(false)
                }

                  }
                }
                
                    
            }
        }

        //console.log(solvable, puzzleTable)

        if(solvable.length > 0){
          return false
        } else {
          return true
        }

  }


  checkRowPlacement(puzzleString, row, column, value) {
    var output = this.validate(puzzleString)
    var outputV2 = this.validateCheck(row,column,value)
            


    if( output != true){
      return output
    } else
    if(outputV2 != true){
      return outputV2
    }

    

    let puzzleTable = []
    let rowValues = "abcdefghi"

    let exists = false
      
      for(let j = 0; j < rowValues.length; j++){

        
        if(rowValues[j] == row.toLowerCase()){
         
              var columnCount = 1;

              for(let i = (rowValues.length*(j+1)) - (rowValues.length-1); i <= rowValues.length*(j+1); i++){
              var myRow = rowValues[j]+(columnCount) 
              var myStr = puzzleString[i-1]

              if((myRow == row.toLowerCase()+column) && (myStr == value)){
                exists = true
              }

              


       //       console.log(myRow, myStr)
              array.push({coord: myRow, value: myStr})
              puzzleTable.push( {coord: myRow, value: myStr})
              columnCount++
            }

          

          
          }

        }

        //console.log(puzzleTable)
        

         if(this.solvable(puzzleTable)){
           var puzzleFilter = []

        if(puzzleTable.length > 0){
          for(let item in puzzleTable){
            if(puzzleTable[item].value == value){
              puzzleFilter.push(puzzleTable[item])
            }

          }
          
        }

     //   console.log(puzzleFilter)

        if(puzzleFilter.length > 0  && exists){
          return "exists"
        } else if(puzzleFilter.length > 0){
          return "conflict"
        } else{
          return true
        }

         } else {
          return 'Puzzle cannot be solved' 


         }




        
        

                 
      
    

  }

  checkColPlacement(puzzleString, row, column, value) {
    var output = this.validate(puzzleString)
    var outputV2 = this.validateCheck(row,column,value)


    if( output != true){
      return output
    } else
    if(outputV2 != true){
      return outputV2
    }

    let columnLength = 9
    let rowValues = "abcdefghi"

    let puzzleTable = []
    let exists = false

    //loop row
    for(let i = 1; i <= rowValues.length; i++){


        //loop column
      for(let j = 1; j <= columnLength; j++){
      //if match column number, print

      if(j == column){
         var myRow = rowValues[i-1]+j
         var myStr = puzzleString[((columnLength*i) + (j-1))-(columnLength)]

         if((myRow == row.toLowerCase()+column) && (myStr == value)){
                exists = true
              }

         array.push({coord: myRow, value: myStr})

         
         puzzleTable.push( {coord: myRow, value: myStr})

        
      }


      }


    }

   
    
  //  console.log(puzzleTable)

    if(this.solvable(puzzleTable)){

      var puzzleFilter = []

        if(puzzleTable.length > 0){
          for(let item in puzzleTable){
            if(puzzleTable[item].value == value){
              puzzleFilter.push(puzzleTable[item])
            }

          }
          
        }

       // console.log(puzzleFilter)

        if(puzzleFilter.length > 0  && exists){
          return "exists"
        } else if(puzzleFilter.length > 0){
          return "conflict"
        } else{
          return true
        }

    } else {
          return 'Puzzle cannot be solved' 
    }

    

  }

  checkRegionPlacement(puzzleString, row, column, value) {
    var output = this.validate(puzzleString)
    var outputV2 = this.validateCheck(row,column,value)


    if( output != true){
      return output
    } else
    if(outputV2 != true){
      return outputV2
    } 

    let columnLength = 9
    let rowValues = "abcdefghi"
    let regionLength = 3

    let exists = false

    let puzzleTable = []
      
      for(let j = 0; j < rowValues.length; j++){

        
        if(rowValues[j] == row.toLowerCase()){
         
              var columnCount = 1;

              for(let i = (rowValues.length*(j+1)) - (rowValues.length-1); i <= rowValues.length*(j+1); i++){
              var myRow = rowValues[j]+(columnCount) 
              var myStr = puzzleString[i-1]


             // console.log(myRow, myStr)

              puzzleTable.push( {coord: myRow, value: myStr})
              columnCount++
            }

          

          
          }

        }

    //loop row
    for(let i = 1; i <= rowValues.length; i++){


        //loop column
      for(let j = 1; j <= columnLength; j++){
      //if match column number, print

      if(j == column){
         var myRow = rowValues[i-1]+j
         var myStr = puzzleString[((columnLength*i) + (j-1))-(columnLength)]

         if(!puzzleTable.some( item => item.coord == myRow)){
           puzzleTable.push( {coord: myRow, value: myStr})

          }
      }

      }


    }
    
    //console.log(puzzleTable)

    let rowCount = 1;
    //let regionCount = 1;
    let regionTable = [];
    let myArray = [];
    
    for(let i = 0; i < rowValues.length + 1; i++){
      if(rowCount > regionLength){
        rowCount = 1
        //regionCount++
        regionTable.push(myArray)
        myArray = [];
      } 


        myArray.push({value: rowValues[i], count: i+1})
     
      rowCount++

    }

    //console.log(regionTable)

    let analyseGroup = []
    let analyseRow = []
    let analyseColumn = []

    for(let i = 0; i < regionTable.length; i++){
      for(let item in regionTable[i]){
        if(regionTable[i][item].value == row.toLowerCase()){
          analyseRow.push(regionTable[i])
        }

        if(regionTable[i][item].count == column){
          analyseColumn.push(regionTable[i])
        }

        
      }
    }

    //console.log(analyseRow, analyseColumn)

    let solveArray = []

    for(let item in analyseRow[0]){
      for(let j in analyseColumn[0]){

        var myRow = analyseRow[0][item].value + analyseColumn[0][j].count
        var myStr = puzzleString[((analyseRow[0][item].count * columnLength) - columnLength) + (analyseColumn[0][j].count-1)] 

        solveArray.push({coord: myRow, value: myStr})

        if(!puzzleTable.some( item => item.coord == myRow)){
           puzzleTable.push( {coord: myRow, value: myStr})

           if((myRow == row.toLowerCase()+column) && (myStr == value)){
                exists = true
              }
           array.push({coord: myRow, value: myStr})


          }

      }
      
    }

   

    //console.log(solveArray)

        if(this.solvable(solveArray)){

           // console.log(puzzleTable)

        var puzzleFilter = []

        if(solveArray.length > 0){
          for(let item in solveArray){
            if(solveArray[item].value == value){
              puzzleFilter.push(solveArray[item])
            }

          }
          
        }

        //console.log(puzzleFilter)

        if(puzzleFilter.length > 0  && exists){
          return "exists"
        } else if(puzzleFilter.length > 0){
          return "conflict"
        } else{
          return true
        } 

        } else {
          return 'Puzzle cannot be solved' 

        }


      


  }

  solve(puzzleString) {
    var output = this.validate(puzzleString)

    if( output != true){
      return output
    }

    let numbers = 9
    let columnLength = 9
    let rowValues = "abcdefghi"
    let solutionAnalysis = []
                var unsolvable = [];


    let tempL = 0;
    let tempJ = 0;
    let tempK = 1;

    let columnCount = 1, numCount = 1, rowCount = 0
        

            for(let l = 0; l < puzzleString.length; l++){
   ////   console.log("loop l", l)

    //  tempL = l

                  if(puzzleString[l] == "."){
                    

                    //loop number values
          for(let i = 1; i <= numbers; i++){

                ////    console.log(rowValues[rowCount],columnCount,i,"puzzleString"+l, "value"+puzzleString[l])

            var error = [];

          var outputRow = this.checkRowPlacement(puzzleString,rowValues[rowCount],columnCount,i)

        ////  console.log(outputRow, rowValues[rowCount],columnCount,i)

          if(outputRow == true){ 

            var outputCol = this.checkColPlacement(puzzleString,rowValues[rowCount],columnCount,i)

       ////     console.log(outputCol, rowValues[rowCount],columnCount,i)


            if(outputCol == true){

              
              var outputRegion = this.checkRegionPlacement(puzzleString,rowValues[rowCount],columnCount,i)

      ////        console.log(outputRegion, rowValues[rowCount],columnCount,i)

              if(outputRegion == true){

                error.push(false)   
 

                  solutionAnalysis.push({coord: rowValues[rowCount]+columnCount, puzzleStringIndex : l, possibleValue: i })
                
                

              } else if(outputRegion == 'Puzzle cannot be solved'){
                unsolvable.push(true)

              }
                else{
                error.push(true)
              }

            } else if(outputCol == 'Puzzle cannot be solved' ){
                unsolvable.push(true)

              } else {
                error.push(true)
              }


          } else if(outputRow == 'Puzzle cannot be solved'){
                unsolvable.push(true)

              } else {
            error.push(true)
          } 


                  }

        }
        

        if(columnCount == columnLength){
        columnCount = 1
        rowCount++

      } else {
        columnCount++


      }

      if(numCount == numbers){
        numCount = 1
      } else {
        numCount++
      }


      }

      //console.log(unsolvable)

      if(unsolvable.length > 0){
        return { error: 'Puzzle cannot be solved' }
      }
   
   

   //// console.log(solutionAnalysis)

    let repeat = false
    let returnOutput = false
    let unableToSolve = false
    

    for(let item in solutionAnalysis){
      let solutionFilter = []

      solutionFilter = solutionAnalysis.filter(myObject => {
        return myObject.coord == solutionAnalysis[item].coord
      })

      if(solutionFilter.length  == 0){
        unableToSolve = true
      } else  if(solutionFilter.length > 1){
        repeat = true;

      } else
      if(solutionFilter.length == 1){
        

        var puzzleStringArray = puzzleString.split("");

        
        
        puzzleStringArray[solutionFilter[0].puzzleStringIndex] = solutionFilter[0].possibleValue 
        
        puzzleString = puzzleStringArray.join("")

        //solution.push(solutionFilter[0].possibleValue)

        if(item == solutionAnalysis.length - 1){
          repeat == false
        }
        
      } 
        //  console.log(solutionFilter)
        //  console.log(puzzleString)

    }

     // console.log(puzzleString, repeat, "HERERE")

      let puzzleRemaining = []
      let puzzleRemainingArray = puzzleString.split("")

      for(let item in puzzleString){
        

        puzzleRemaining = puzzleRemainingArray.filter(myObject => {
        return myObject == "."
      })

      }

     // console.log(puzzleString, repeat, puzzleRemaining.length,"HERERE")

      if(puzzleRemaining.length == 0){
       // console.log({"solution" : puzzleString},"DONE")
        //console.log(array)
        
       return { "solution" : puzzleString }
      } else if(puzzleRemaining.length > 0 && repeat == true){
       // console.log("Repeat")
        return this.solve(puzzleString)
      }
      
       if(puzzleRemaining.length > 0 && repeat == false){
       // console.log("Unable")
      return { error: 'Puzzle cannot be solved' }
      }

      
     
  }
}

module.exports = SudokuSolver;

