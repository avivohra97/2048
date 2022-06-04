document.addEventListener('DOMContentLoaded', ()=>{
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    let squares = []
    let score = 0
    function createBoard(){
        for(let i=0;i < width*width;i++){
            let square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
    }
    createBoard()

    /** 
     * generate a number randomaly
     */
    function generate(){
        let randomNumber = Math.floor(Math.random()*squares.length)
        if(squares[randomNumber].innerHTML == 0){
            squares[randomNumber].innerHTML = 2;
            checkForGameOver()
        }else generate()
    }

    /**
     * swipe right
     */
    function moveRight(){
        for(let i=0;i<squares.length;i++){
            if(i%4 === 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
                let filterRow = row.filter(num => num)
                console.log(filterRow)
                let missing = 4 - filterRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filterRow)
                for(let j=0;j<newRow.length;j++){
                    squares[i+j].innerHTML = newRow[j]
                }
                
            }
        }
    }

    function moveLeft(){
        for(let i=0;i<squares.length;i++){
            if(i%4 === 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
                let filterRow = row.filter(num => num)
                console.log(filterRow)
                let missing = 4 - filterRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filterRow.concat(zeros)
                for(let j=0;j<newRow.length;j++){
                    squares[i+j].innerHTML = newRow[j]
                }
                
            }
        }
    }

    function moveDown(){
        for(let i=0;i<4;i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+width].innerHTML
            let totalThree = squares[i+width*2].innerHTML
            let totalFour = squares[i+width*3].innerHTML
            let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
            let filterColumn = column.filter(num => num)
            let missing = 4 - filterColumn.length
            let zeros = Array(missing).fill(0)
            let newCol = zeros.concat(filterColumn)
            for(let j=0;j<newCol.length;j++){
                squares[i+(width*j)].innerHTML = newCol[j]
            }
        }
    }

    function moveUp(){
        for(let i=0;i<4;i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+width].innerHTML
            let totalThree = squares[i+width*2].innerHTML
            let totalFour = squares[i+width*3].innerHTML
            let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
            let filterColumn = column.filter(num => num)
            let missing = 4 - filterColumn.length
            let zeros = Array(missing).fill(0)
            let newCol = filterColumn.concat(zeros)
            for(let j=0;j<newCol.length;j++){
                squares[i+(width*j)].innerHTML = newCol[j]
            }
        }
    }

    function combineRow(){
        for(let i=0;i<15;i++){
            if(squares[i].innerHTML === squares[i+1].innerHTML){
                let combineTotal = parseInt(squares[i].innerHTML)+ parseInt(squares[i+1].innerHTML)
                squares[i+1].innerHTML = combineTotal
                squares[i].innerHTML = 0
                score = score + combineTotal
                scoreDisplay.innerHTML =  score
            }
        }
        checkForWin()
    }

    function combineColumn(){
        for(let i=0;i<12;i++){
            if(squares[i].innerHTML === squares[i+width].innerHTML){
                let combineTotal = parseInt(squares[i].innerHTML)+ parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = combineTotal
                squares[i+width].innerHTML = 0
                score = score + combineTotal
                scoreDisplay.innerHTML =  score
            }
        }
        checkForWin()
    }

    function control(e){
        if(e.keyCode === 39){
            keyRight()
        }else if(e.keyCode === 37){
            keyLeft()
        }else if(e.keyCode === 38){
            keyUp()
        }else if(e.keyCode === 40){
            keyDown()
        }
    }

    document.addEventListener('keyup',control)

    function keyRight(){
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

    function keyLeft(){
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }

    function keyDown(){
        moveDown()
        combineColumn()
        moveDown()
        generate()
    }
  
    function keyUp(){
        moveUp()
        combineColumn()
        moveUp()
        generate()
    }

    function checkForWin(){
        console.log(squares)
        for(let i=0;i<squares.length;i++){
            if(squares[i].innerHTML == 16 ){
                resultDisplay.innerHTML = 'You win!'
                resultDisplay.className = 'win'
                document.removeEventListener('keyup',control)
            }
        }
    }

    function checkForGameOver(){
        let zeros = 0
        for(let j=0;j< squares.length;j++){
            if(squares[j].innerHTML == 0){
                zeros++
            }
        }
        if(zeros == 0){
            resultDisplay.innerHTML = 'You Lose!'
            resultDisplay.className = 'lose'
            document.removeEventListener('keyup',control)
            scoreDisplay.innerHTML = 0
        }
    }
    document.getElementById("restart-button").addEventListener('click', () => {
        scoreDisplay.innerHTML = 0
        for(let i=0;i < width*width;i++){
            squares[i].innerHTML = 0
        }
        generate()
        generate()
        console.log('clicked')
    })
})