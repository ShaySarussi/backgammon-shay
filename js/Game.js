class Game {
    constructor() {

        
            this.startCheckersPlaces = {
                1  : { type  : 'black', count : 2 },
                2  : { type  : 'black', count : 2 },
                3  : { type  : 'black', count : 2 },
                4  : { type  : 'black', count : 2 },
                5 : { type  : 'black', count : 2 },
                6 : { type  : 'black', count : 2 },
                19 : { type  : 'white', count : 2 },
                20 : { type  : 'white', count : 2 },
                21 : { type  : 'white', count : 2 },
                22 : { type  : 'white', count : 2 },
                22 : { type  : 'white', count : 2 },
                22 : { type  : 'white', count : 2 },
             };
        
         
         /*
        this.startCheckersPlaces = {
            1: { type: 'white', count: 2 },
            //20  : { type  : 'white', count : 1 },
            6: { type: 'black', count: 5 },
            8: { type: 'black', count: 3 },
            12: { type: 'white', count: 5 },
            13: { type: 'black', count: 5 },
            17: { type: 'white', count: 3 },
            19: { type: 'white', count: 5 },
            24: { type: 'black', count: 2 }
        };
        */

        this.checkrsElemnetOnBoard = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
            10: [],
            11: [],
            12: [],
            13: [],
            14: [],
            15: [],
            16: [],
            17: [],
            18: [],
            19: [],
            20: [],
            21: [],
            22: [],
            23: [],
            24: [],

        }

        this.blotCheckers = {
            black: [],
            white: [],

        }



        this.diceWidth = 50;
        this.dice1 = null;
        this.dice2 = null;
        this.black = 'black';
        this.white = 'white';
        this.playerTurnCount = 0;
        this.turn = this.white; // Default whites start
        this.dicesIsReversed = false;
        this.idBoxDestination = 0; //idBoxDestination


    }

    getRandNumber() {
        return Math.ceil(Math.random() * 6);
    }

    getElementById(id) {
        return document.getElementById(id);
    }


    initDice() {


        let dice1 = this.getElementById('dice-1'),
            dice2 = this.getElementById('dice-2');


        //this.dice1 = 4;
        //this.dice2 = this.getRandNumber();


        this.dice1 = this.getRandNumber();
        this.dice2 = this.getRandNumber();


        dice1.style = '';
        dice2.style = '';
        dice1.style.backgroundPosition = '-' + ((this.dice1 - 1) * this.diceWidth) + 'px top';
        dice2.style.backgroundPosition = '-' + ((this.dice2 - 1) * this.diceWidth) + 'px top';

    }


    insertCheckersToArray() {

        let k = 1;
        for (let i in this.startCheckersPlaces) {

            for (let j = 0, jl = this.startCheckersPlaces[i]['count']; j < jl; j++) {

            let checker = new Checker(k, this.startCheckersPlaces[i]['type'], parseInt(i));
                this.checkrsElemnetOnBoard[i].push(checker);
                k++;
            }
        }
    };

    drawCheckers() {

        let isCheckerOutOfGame; 

        for (let i in this.checkrsElemnetOnBoard) {

            if (this.checkrsElemnetOnBoard[i].length > 0) {
                
                let backgammonBoxDomElement = this.getElementById('step-' + i);
                isCheckerOutOfGame = false;

                for (let j = 0, jl = this.checkrsElemnetOnBoard[i].length; j < jl; j++) {

                    backgammonBoxDomElement.innerHTML += this.checkrsElemnetOnBoard[i][j].getCheckerDomElement(this.checkrsElemnetOnBoard[i][j].color, isCheckerOutOfGame);

                }

                this.addClickEvent(backgammonBoxDomElement);
            }
        }

        
       


        for (let i in this.blotCheckers) {

            if (this.blotCheckers[i].length > 0) {
                
                let hitedBox = this.getElementById('hited-' + i + '-items');
                isCheckerOutOfGame = true; 

                for (let j = 0, jl = this.blotCheckers[i].length; j < jl; j++) {

                    hitedBox.innerHTML += this.blotCheckers[i][j].getCheckerDomElement(this.blotCheckers[i][j].color, isCheckerOutOfGame);

                }

                this.addClickEvent(hitedBox);
            }
        }


    };





    addClickEvent(boxDomElement) {

        let checkersInBoxDomElements = boxDomElement.getElementsByClassName('checker');

        for (let i = 0, l = checkersInBoxDomElements.length; i < l; i++) {
            checkersInBoxDomElements[i].addEventListener("click", this.myOnClick);
        };


    };





    setTransparencyForCurrentDice() {

        switch (true) {
            case
                (0 < this.playerTurnCount && this.dice1 !== this.dice2 && !this.dicesIsReversed) ||
                (1 < this.playerTurnCount && this.dice1 === this.dice2 && !this.dicesIsReversed):
                this.getElementById('dice-1').style.opacity = .5;
                break;
            case
                (0 < this.playerTurnCount && this.dice1 !== this.dice2 && this.dicesIsReversed) ||
                (1 < this.playerTurnCount && this.dice1 === this.dice2 && this.dicesIsReversed):
                this.getElementById('dice-2').style.opacity = .5;
                break;
            default:
        }

    };

    getBoxDomElement(colorType, boxId) {

        let currentDiceNumber;

        if (colorType === this.white) {

            if (this.playerTurnCount < 3) {
                currentDiceNumber = 'dice' + this.playerTurnCount;
                boxId = boxId + this[currentDiceNumber];
                this.idBoxDestination = boxId;
            }
            else {
                boxId = boxId + this.dice1;
                this.idBoxDestination = boxId;

            }

        } else {

            if (this.playerTurnCount < 3) {

                currentDiceNumber = 'dice' + this.playerTurnCount;
                boxId = boxId - this[currentDiceNumber];
                this.idBoxDestination = boxId;
            }
            else {

                boxId = (boxId - this.dice1);
                this.idBoxDestination = boxId;
            }
        }

        return this.getElementById('step-' + boxId);

    };






    afterClick(checkerDomElement, self, stepCount) { 

        let colorType = checkerDomElement.getAttribute('data-type'),
            diceDomElement = document.getElementsByClassName('dice-box')[0];




        if (self.turn === colorType) {


            let blotCheckersArray = this.blotCheckers[colorType],
                blotCheckersArrayIsEmpty = (blotCheckersArray.length != 0) ? true : false,
                boxId = (blotCheckersArrayIsEmpty) ? (colorType === this.white ? 0 : 25) : Number(checkerDomElement.parentNode.id.replace('step-', '')),
                boxDomElement = self.getBoxDomElement(colorType, boxId),
                isThisCheckerOutOfGame = (checkerDomElement.getAttribute('is-out-of-game') === 'true'); 



            if (!isThisCheckerOutOfGame && blotCheckersArray.length != 0) {
                alert('Hey you have hited item. First play it.');
                self.playerTurnCount--;
                return;
            }

            if (boxDomElement === null) {
                alert('Hey you cant move to this box it doesent exists');
                self.playerTurnCount--;
                return;
            }


            if (!blotCheckersArrayIsEmpty) {
                if (!this.isFirstCheckerOnStack(checkerDomElement, boxId))
                    return;
            }
            else {
                if (!this.canPieceReturnToBoard(colorType, boxId, diceDomElement))
                    return;
            }


            let boxDestinationArray = this.checkrsElemnetOnBoard[this.idBoxDestination], 
                boxOriginArray = (blotCheckersArrayIsEmpty) ? blotCheckersArray : this.checkrsElemnetOnBoard[boxId]; 


            if (!this.isLegalBoxDestination(boxDestinationArray, boxDomElement, colorType, self))
                   return;



            let checkerForMove = boxOriginArray[boxOriginArray.length - 1];

            checkerForMove.move(boxDestinationArray, boxOriginArray, this.idBoxDestination,self);

            this.setTransparencyForCurrentDice();
            let checkersDomElements = document.getElementsByClassName('checker');

            this.cleanBoard(checkersDomElements);
            this.drawCheckers();


            if (self.playerTurnCount === stepCount)
                this.switchTurn(diceDomElement, colorType);



        }
    };

    getIndexOfBox(id, diceNumber, colorType) {


        let iddestination = (colorType === this.white) ? id + diceNumber : id - diceNumber;
        return iddestination;

    }


    canPieceReturnToBoard(colorType, boxId, diceDomElement) {

        let firstBoxId = this.getIndexOfBox(boxId, this.dice1, colorType),
            secondBoxId = this.getIndexOfBox(boxId, this.dice2, colorType),
            firstBoxArray = this.checkrsElemnetOnBoard[firstBoxId],
            secondBoxArray = this.checkrsElemnetOnBoard[secondBoxId];

        if ((firstBoxArray.length > 1 && firstBoxArray[0].color !== colorType) && (secondBoxArray.length > 1 && secondBoxArray[0].color !== colorType)) {
            alert('Hey you cant move in this situation..!! therfore you should pass your turn');
            this.switchTurn(diceDomElement, colorType);
            return false;
        }

        return true;

    }


    isFirstCheckerOnStack(checkerDomElement, boxId) {

        let boxOriginDomElement = this.getElementById('step-' + boxId),  
            checkersInBoxOrigin = boxOriginDomElement.getElementsByClassName('checker'),
            firstCheckerInStack = checkersInBoxOrigin[checkersInBoxOrigin.length - 1];

        if (firstCheckerInStack !== checkerDomElement) {
            alert('this is not first checker on stack');
            this.playerTurnCount--;
            return false;
        }

        return true;

    }



    isLegalMoveRemain(colorType, diceNumber) {

        for (let i in this.checkrsElemnetOnBoard) {
            i = parseInt(i);
            if ((this.checkrsElemnetOnBoard[i].length > 0) && (this.checkrsElemnetOnBoard[i][0].color === colorType)) {
                let j = (this.checkrsElemnetOnBoard[i][0].color === 'white') ? i + diceNumber : i - diceNumber;

                if (this.checkrsElemnetOnBoard[j] === undefined)
                    continue;

                if (this.checkrsElemnetOnBoard[j].length === 0 || this.checkrsElemnetOnBoard[j][0].color === colorType || ((this.checkrsElemnetOnBoard[j].length === 1) && (this.checkrsElemnetOnBoard[j][0].color !== colorType))) {
                    return true;
                }
            }
        }

        alert('Hello ' + this.turn + ', you got die with the number "' + diceNumber + '" & unfortunately you dont have a legal move with this number :-(')
        return false;
    }




    switchTurn(diceDomElement, colorType) {

        if (colorType === this.black) {
            this.turn = this.white;
            diceDomElement.className = 'dice-box on-right';
        } else {
            this.turn = this.black;
            diceDomElement.className = 'dice-box';
        }

        this.playerTurnCount = 0;
        this.dicesIsReversed = false;
        this.initDice();

    }

    isLegalBoxDestination(boxDestinationArray, boxDomElement, colorType, self) { 

        if (!boxDomElement || (boxDestinationArray.length > 1 && boxDestinationArray[0].color !== colorType)) {
            self.playerTurnCount--;

            if (/red\-row/.test(boxDomElement.className)) {
                return false;
            }

            boxDomElement.className += ' red-row';

            setTimeout(function () {
                boxDomElement.className = boxDomElement.className.replace(/red\-row/, '').trim();
            }, 1000);

            return false;


        }

        return true;
    }



    cleanBoard(checkersDomElements) {

        const arrayLength = checkersDomElements.length;

        for (let i = arrayLength - 1; i >= 0; i--) {
            checkersDomElements[i].parentNode.removeChild(checkersDomElements[i]);
        }


    };


    toggleDiceReverse() {

        let self = this;
        document.getElementsByClassName('reverse-btn')[0].onclick = function () {

            if (self.playerTurnCount) {
                alert('Hey you can\'t do reverse, you\'re already played one.');
                return;
            }

            let diceDomElement = document.getElementsByClassName('dice-box')[0];

            if (self.dicesIsReversed) {

                self.dicesIsReversed = false;
                diceDomElement.className = 'dice-box';

            } else {

                self.dicesIsReversed = true;
                diceDomElement.className = 'dice-box dice-box--reverse';

            }

            if (self.turn === 'white') {
                diceDomElement.className += ' on-right';
            }

            let temp = self.dice1;
            self.dice1 = self.dice2;
            self.dice2 = temp;

        };

    };


    isBearingOffStage() {

        const startBoxToCheckWhite = 1,
              endBoxToCheckWhite = 18,
              startBoxToCheckBlack = 7,
              endBoxToCheckBlack = 24;



        if (this.turn === 'white') {
            for (let i = startBoxToCheckWhite; i <= endBoxToCheckWhite; i++)
                if ((this.checkrsElemnetOnBoard[i].length > 0) && (this.checkrsElemnetOnBoard[i][0].color === 'white'))
                    return false;


            return true;
        }
        else {

            for (let i = startBoxToCheckBlack; i <= endBoxToCheckBlack; i++)
                if ((this.checkrsElemnetOnBoard[i].length > 0) && (this.checkrsElemnetOnBoard[i][0].color === 'black'))
                    return false;


            return true;
        }
    }

    
    canAnyCheckersUseNextDie() { 
        return !this.isLegalMoveRemain(this.turn, ((this.playerTurnCount == 1) ? this.dice1 : this.dice2));
    }


    moveToTheNextDie(diceDomElement) {

        do {

            let stepCount;

            if (this.dice1 === this.dice2) {
                stepCount = 4;
            } else {
                stepCount = 2;
            }

            this.setTransparencyForCurrentDice();
            if (this.playerTurnCount === stepCount) {
                this.switchTurn(diceDomElement, this.turn);

            }
            this.playerTurnCount++;
            var dice = (this.playerTurnCount % 2 == 0) ? this.dice2 : this.dice1;

        } while (!this.isExistsCheckerToBearOff(dice) && (!this.isLegalMoveRemain(this.turn, dice)))



    }


    isExistsCheckerToBearOff(dice) { 


        const boxIdStartPositionBlack = 0,
              boxIdStartPositionWhite = 25;

        let isBearingOffStage = this.isBearingOffStage(this.turn),
            boxIdToBearOffChecker = (this.turn === 'white') ? boxIdStartPositionWhite - dice : boxIdStartPositionBlack + dice;

        if (isBearingOffStage) {
            if (this.checkrsElemnetOnBoard[boxIdToBearOffChecker].length > 0 && this.checkrsElemnetOnBoard[boxIdToBearOffChecker][0].color === this.turn)
                return true;
        }

        return false;


    }



    myOnClick() {

        let self = backgammon,
            checkerDomElement = this,
            colorType = checkerDomElement.getAttribute('data-type');


        if (colorType !== self.turn) {
            alert('this not your turn');
            return;

        }


        let diceDomElement = document.getElementsByClassName('dice-box')[0],
            stepCount = 2;
        self.playerTurnCount++;

        let blotCheckersArray = self.blotCheckers[colorType],  
            blotCheckersArrayIsEmpty = (blotCheckersArray.length != 0) ? true : false,
            boxId = (blotCheckersArrayIsEmpty) ? (colorType === self.white ? 0 : 25) : Number(checkerDomElement.parentNode.id.replace('step-', '')),
            boxDomElement = self.getBoxDomElement(colorType, boxId);



        if (!blotCheckersArrayIsEmpty) {
            if (!self.isFirstCheckerOnStack(checkerDomElement, boxId)) {
                self.playerTurnCount--;
                return;
            }

        }
        else {
            if (!self.canPieceReturnToBoard(colorType, boxId, diceDomElement)) {
                self.playerTurnCount--;
                return;

            }

        }



        if (self.dice1 === self.dice2) {
            stepCount = 4;
        }



        const boxIdStartPositionBlack = 0,
              boxIdStartPositionWhite = 25;

        if (self.isBearingOffStage(self.turn)) {

            let currentNumberOfDie = ((self.playerTurnCount % 2) === 0) ? self.dice2 : self.dice1,
                boxIdToBearOffChecker = (self.turn === 'white') ? boxIdStartPositionWhite - currentNumberOfDie : boxIdStartPositionBlack + currentNumberOfDie;
                
                
                if (boxId == boxIdToBearOffChecker && self.checkrsElemnetOnBoard[boxIdToBearOffChecker].length > 0 && self.checkrsElemnetOnBoard[boxIdToBearOffChecker][0].color === self.turn) {
                    self.popFromStack(self, stepCount, boxIdToBearOffChecker, diceDomElement, colorType);

                    if (self.hasColorWon(colorType)) {
                        alert('Hey ' + colorType + ' You win the game yehhhh :-)');
                        return;
                    }

                    self.progressDiceToNextLegalMove(self);
                    return;
                }

                if (boxDomElement === null) {
                    alert('Hey you cant move to this box it doesent exists');
                    self.playerTurnCount--;
                    return;

                }
        }



        self.afterClick(checkerDomElement, backgammon, stepCount);

        if (self.hasColorWon(colorType)) {
            alert('Hey ' + colorType + ' You win the game yehhhh :-)');
            return;
        }

        self.progressDiceToNextLegalMove(self);


    };


    init() {


        this.insertCheckersToArray();
        this.drawCheckers();
        this.initDice();
        this.toggleDiceReverse();


    };

    popFromStack(self, stepCount, boxIdToBearOffChecker, diceDomElement, colorType) {

        self.checkrsElemnetOnBoard[boxIdToBearOffChecker].pop();
        self.setTransparencyForCurrentDice();
        let checkersDomElements = document.getElementsByClassName('checker');
        self.cleanBoard(checkersDomElements);
        self.drawCheckers();
        if (self.playerTurnCount === stepCount)
            self.switchTurn(diceDomElement, colorType);

    }


    hasColorWon(colorType) {


        for (let i in this.checkrsElemnetOnBoard) {

            i = parseInt(i);
            if ((this.checkrsElemnetOnBoard[i].length > 0) && (this.checkrsElemnetOnBoard[i][0].color === colorType))
                return false;

        }
        return true;

    }




    progressDiceToNextLegalMove(self) { 

        let diceDomElement = document.getElementsByClassName('dice-box')[0],
            isBearingOffStage = self.isBearingOffStage(self.turn);

        const boxIdStartPositionBlack = 0,
              boxIdStartPositionWhite = 25;

        self.playerTurnCount++;

        if (isBearingOffStage){
            let dice = ((self.playerTurnCount % 2) === 0) ? self.dice2 : self.dice1,
                boxIdToBearOffChecker = (self.turn === 'white') ? boxIdStartPositionWhite - dice : boxIdStartPositionBlack + dice;


            if (!(self.checkrsElemnetOnBoard[boxIdToBearOffChecker].length > 0 && self.checkrsElemnetOnBoard[boxIdToBearOffChecker][0].color === self.turn)) {
                if (self.canAnyCheckersUseNextDie())
                    self.moveToTheNextDie(diceDomElement);
            }

        }else{
                
                if (self.canAnyCheckersUseNextDie())
                    self.moveToTheNextDie(diceDomElement);

        }

        self.playerTurnCount--;
    }

}

var backgammon = new Game();
backgammon.init();


