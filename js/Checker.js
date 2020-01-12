class Checker {

    constructor(id,color,boxNumber){
     this.id = id;
     this.color = color;
     this.boxNumber = boxNumber;
    }
    
    getCheckerDomElement ( typeColor, isCheckerOutOfGame ){
        return '<button class="checker' + ( typeColor === 'black' ? ' checker-black' : '' ) + '" type="button" is-out-of-game="'+( isCheckerOutOfGame === true ? 'true':'false')+'" data-type="' + typeColor + '"></button>';
    };


    move (boxDestinationArray, boxOriginArray,BoxId,self){ 
    
        

        let isNeedPushCheckerToHitedBox = this.isNeedPushCheckerToHitedBox( boxDestinationArray, ( this.color === 'white' ? 'black' : 'white' ),self );
        if (isNeedPushCheckerToHitedBox){
            
            let checkerHit = boxDestinationArray[0];
            self.blotCheckers[( this.color === 'white' ? 'black' : 'white' )].push(checkerHit);
            boxDestinationArray.pop();
           
        }
              
        this.boxNumber = BoxId;
        boxDestinationArray.push(this);
        boxOriginArray.pop();
        
    };


    isNeedPushCheckerToHitedBox ( boxDestinationArray, typeColor){
        
        
        if ( boxDestinationArray[0] !== undefined && boxDestinationArray[0].color === typeColor ) 
           return true;
        else
           return false;
        	
    };

}

