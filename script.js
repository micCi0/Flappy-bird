class Game{
    constructor(){
        //DOM elements 
        this.btn = document.querySelector(".playNow");
        this.scoreElement = document.querySelector(".score");
        this.pipeTop = document.querySelector(".top");
        this.pipeBottom = document.querySelector(".bottom");

        //Game state
        this.interval = null;
        this.pipeInterval = null;
        this.game = false;
        this.jumping = false;
        this.score = 0;

        // Bird and pipe position
        this.direction = {
            top:50,
            bottom:10,
            left:10,
            velocityX:1,
            velocityY:1
        };
        this.pipes = {left:390};
    }
    start(){
        // start btn click event
        this.btn.addEventListener("click" , () =>{
            this.btn.style.display = "none";
            this.game = true;
            this.pipeInterval = setInterval(() =>{
                // check if left edge of the pipes is greater than 0
                if(this.pipes.left>0){
                    this.pipes.left--;
                    this.pipeBottom.style.left = this.pipes.left + "px";
                    this.pipeTop.style.left = this.pipes.left + "px";
                }
                else{
                    this.pipes.left = 390;
                    this.pipeBottom.style.left = this.pipes.left + "px";
                    this.pipeTop.style.left = this.pipes.left + "px";
                }
            } , 4)
        })
        // handle event listeners
        addEventListener("keydown" , ({code}) =>{
            if(code == "Space" && this.game) this.jumping = true;
        })
        addEventListener("keyup" , ({code}) =>{
            if(code == "Space" && this.game) this.jumping = false;
        })
        setInterval(() =>{
            if(this.game) this.collision();
        })

        // bird animation
        this.interval = setInterval(() =>{
            if(!this.game) return;
            let bird = document.querySelector(".bird");
            this.jumping ? (this.direction.velocityY = -3) : (this.direction.velocityY += 0.1);
            this.direction.top += this.direction.velocityY;
            this.direction.left += this.direction.velocityX;
            bird.style.top = this.direction.top + "px";
            
            while(this.direction.left <200){
                bird.style.left = this.direction.left + "px";
                break;
            }
        } , 14)
    }
    
    // detect collision between bird and obstacle
    collision(){
        // declaration
        const bird = document.querySelector(".bird");
        const birdRect = bird.getBoundingClientRect();
        const topPipe = document.querySelector(".top");
        const topPipeRect = topPipe.getBoundingClientRect();
        const bottom = document.querySelector(".bottom");
        const bottomPipeRect = bottom.getBoundingClientRect();

        if(
              //Check if the right edge of the bird is to the right of the left edge of the top pipe
              birdRect.left + birdRect.width > topPipeRect.left &&
                //Check if the left edge of the bird is to the left of the right edge of the top pipe  
             birdRect.left < topPipeRect.left + topPipeRect.width &&
             //Check if the bird is either above the bottom edge of the top pipe or below the top edge of the bottom pipe
             birdRect.top < topPipeRect.bottom ||  birdRect.bottom > bottomPipeRect.top   
        )
        {
            this.game = false;
            alert("Game Over !");
            //clear intervals
            clearInterval(this.interval);
            clearInterval(this.pipeInterval);
        }
        else{
            this.score++;
            this.scoreElement.textContent = this.score;
        }
       
    }  

}


const game = new Game();
game.start();