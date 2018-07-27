			if (this.isOnThePlatform) {
				this.nextJump = this.posY - this.jumpHeight;
				console.log(this.isJump);
				console.log(this.isJumpUp);
				console.log(this.nextJump);
				console.log(this.posY);
			}
			if ((game.rect.isJumpUp == true) && (game.rect.isJump == true) && ( this.posY >= this.nextJump ) && this.isOnThePlatform) {
				this.posY += this.speedY;
				this.speedY = -5;
			}
			
			if ((game.rect.isJumpUp == true) && (game.rect.isJump == true) && ( this.posY == this.nextJump ) && this.isOnThePlatform) {
				this.posY += this.speedY;
				this.speedY = 5;
				game.rect.isJump = false;
			 	game.rect.isJumpUp = false;
			}

// JUMP WIDHOUT PLATFORMS BEHAVIOR 
			if ((game.rect.isJumpUp == true) && (game.rect.isJump == true) && ( this.posY <= this.nextJump ) && !this.isOnThePlatform) {
				this.speedY = -5;
			}
			
			if ((game.rect.isJumpUp == true) && (game.rect.isJump == true) && ( this.posY <= this.nextJump ) && !this.isOnThePlatform) {
				this.speedY = 5;
				game.rect.isJump = false;
			 	game.rect.isJumpUp = false;
			}
			if ((this.posY <=  game.screen.ctxHeight - this.rHeight - 5 ) && this.speedY > 0 && !this.isOnThePlatform ) {
				this.posY += this.speedY;
				this.isOnTheGround = false;
			} else {
				this.isOnTheGround = true;
			}
// JUMP ON PLATFORM BEHAVIOR
			if ((this.posY + 10 == game.platforms.posY) && (!this.isOnTheGround) && (this.posX >= game.platforms.posX)) {
				// this.posY += this.speedY;
				this.isOnThePlatform = true;
			}
			if (this.posX < game.platforms.posX || this.posX > game.platforms.posX + game.platforms.pWidth) {
				this.isOnThePlatform = false;
			} 


			if ((this.speedY < 0) && this.isOnTheGround && !this.isOnThePlatform) {
				this.posY += this.speedY;
			}
			if ((this.speedX != 0) && this.isOnTheGround ) {
				this.posX += this.speedX;
			}