

var game = {
	
	screen: {
		canvas: document.querySelector('canvas'),
		ctxHeight: 300,
		ctxWidth: 400,
		ctx: this.canvas.getContext('2d'),
	},

	platforms: {
		platformList: [
			{
				posY: 255,
				posX: 110,
				pHeight: 10,
				pWidth: 75,
			},
			{
				posY: 210,
				posX: 150,
				pHeight: 10,
				pWidth: 75, 
			},
			{
				posY: 170,
				posX: 210,
				pHeight: 10,
				pWidth: 75,
			},
			{
				posY: 130,
				posX: 300,
				pHeight: 12,
				pWidth: 35,
			}, 
			{
				posY: 220,
				posX: 290,
				pHeight: 10,
				pWidth: 16,
			}, 
		],
		// posY: 250,
		// posX: 110,
		// pHeight: 10,
		// pWidth: 75,
		platformImage: function() {
			var platformSprite = new Image();
			platformSprite.src = 'platformSprite.png';
			return platformSprite;
		},
		drawPlatforms: function() {
			for (var i = 0; i < game.platforms.platformList.length; i++) {
				//game.screen.ctx.fillRect(game.platforms.platformList[i].posX, game.platforms.platformList[i].posY, game.platforms.platformList[i].pWidth, game.platforms.platformList[i].pHeight);
				game.screen.ctx.drawImage(this.platformImage(), game.platforms.platformList[i].posX, game.platforms.platformList[i].posY, game.platforms.platformList[i].pWidth, game.platforms.platformList[i].pHeight);
			}
			game.screen.ctx.fillStyle = 'dimgrey';
		},
	},
	
	rect: {
		rWidth: 15,
		rHeight: 15,
		bunny: function() {
			var bunnySprite = new Image();
			bunnySprite.src = 'bunnySprite.png';
			return bunnySprite;
		},
		bunnyDirectionSx: 0,
		checkBunnyDirection: function() {
			if (this.speedX > 0) {
				this.bunnyDirectionSx = 10;
			} else if (this.speedX < 0) {
				this.bunnyDirectionSx = 0;
			}
		},
		posX: 50,
		posY: 0,
		speedX: 0,
		speedY: 5,
		jumpHeight: 70,
		nextJump: 0,

		isJump: false,
		isJumpUp: false,
		isOnTheGround: false,
		isOnThePlatform: false,

		isMoveRight: false,
		isMoveLeft: false,
		isHeadBump: function() {
			for (var i = 0; i < game.platforms.platformList.length; i++) {
				if (this.isJump && (this.speedY < 0) && (this.posY > game.platforms.platformList[i].posY) && ( this.posY <= game.platforms.platformList[i].posY + game.platforms.platformList[i].pHeight ) && (this.posX + this.rWidth > game.platforms.platformList[i].posX) && (this.posX < game.platforms.platformList[i].posX + game.platforms.platformList[i].pWidth)) {
					return true;

				}
			}
			return false;
		},
		move: function() {
			console.log(this.speedY);
			// console.log(this.isOnThePlatform);
			// console.log(this.isOnTheGround);
			console.log(this.nextjump);
			console.log(this.isJump);
			console.log(this.isOnThePlatform);

			// Setting nextjump value
			if (this.isOnTheGround && !this.isJump) {
				this.nextJump = game.screen.ctxHeight - this.jumpHeight;
			}
			if (this.isOnThePlatform && !this.isJump) {
				this.nextJump = this.posY - this.jumpHeight;
			}
			//Jump from the ground behavior
			if (this.isJump && (this.posY > this.nextJump)) { // *** jump up
				this.posY += this.speedY;
			} 
			if ((this.isJump && (this.posY <= this.nextJump)) || this.isHeadBump()) {
				this.isJump = false;
				this.speedY = -1 * this.speedY;
			}
			//***
			// Condition for isOnThePlatform
			// Injecting cycle for isontheplatform condition
			for (var i = 0; i < game.platforms.platformList.length; i++) {
				if ( (this.posY == game.platforms.platformList[i].posY - this.rHeight) && (this.posX >= game.platforms.platformList[i].posX - this.rWidth) && (this.posX <= game.platforms.platformList[i].posX + game.platforms.platformList[i].pWidth) ) {
					this.isJump = false;
					this.isOnThePlatform = true;
					if(this.isOnThePlatform && (this.speedY < 0)) {
						this.speedY = -1 * this.speedY;
					}
				break;
				} else if ( (this.posX < game.platforms.platformList[i].posX) || (this.posX > game.platforms.platformList[i].posX + game.platforms.platformList[i].pWidth) ) {
					this.isOnThePlatform = false;
					this.isOnTheGround = false;
				}
			}
			//***
			// Conditions for X coordinates collisions with platforms
			for (var i = 0; i < game.platforms.platformList.length; i++) {
				if ( (this.posX + this.rWidth == game.platforms.platformList[i].posX) && (this.posY <= game.platforms.platformList[i].posY + game.platforms.platformList[i].pHeight )  && (this.posY >= game.platforms.platformList[i].posY)) {
					this.isMoveRight = false;
					break;
				} 
			}
			for (var i = 0; i < game.platforms.platformList.length; i++) {
				if ( (this.posX == game.platforms.platformList[i].posX + game.platforms.platformList[i].pWidth) && (this.posY <= game.platforms.platformList[i].posY + game.platforms.platformList[i].pHeight )  && (this.posY >= game.platforms.platformList[i].posY)) {
					this.isMoveLeft = false;
					break;
				} 
			}

			// X coordinatie movement conditions
			if ( this.isMoveRight && (game.rect.posX <= game.screen.ctxWidth - game.rect.rWidth) ){
				this.posX += this.speedX;
			}
			if ( this.isMoveLeft && (game.rect.posX >= 0) ){
				this.posX += this.speedX;
			}
			// Condition for isOnTheGround
			if (this.posY >= game.screen.ctxHeight - this.rHeight) {
				this.isOnTheGround = true;
				this.isJump = false;
				//return;
			}
			// Main gravitation Code
			if (!this.isOnThePlatform && !this.isOnTheGround) {
				this.posY += this.speedY;
			}
		},
		jump: function() {

			window.onkeydown = function(e) {
				if ( e.keyCode == 38 && game.rect.isOnTheGround) {
					game.rect.speedY = -1 * game.rect.speedY;
					game.rect.isJump = true;
					game.rect.isOnThePlatform = false;
					game.rect.isOnTheGround = false;
				}
				if ( e.keyCode == 38 && game.rect.isOnThePlatform) {
					game.rect.speedY = -1 * game.rect.speedY;
					game.rect.isJump = true;
					game.rect.isOnThePlatform = false;
					game.rect.isOnTheGround = false;
				}
				if (e.keyCode == 39) {
					game.rect.isMoveRight = true;
					game.rect.speedX = 2;
				} 
				
				if (e.keyCode == 37) {
					game.rect.isMoveLeft = true;
					game.rect.speedX = -2;
				}
			}
			window.onkeyup = function(e) {
				if ( (e.keyCode == 39) ) {
					game.rect.isMoveRight = false;
					game.rect.speedX = 0;
				}
				if ( (e.keyCode == 37) ) {
					game.rect.isMoveLeft = false;
					game.rect.speedX = 0;
				}
			}
		},
		drawRect: function() {		
			this.jump();
			this.move();
			//game.screen.ctx.fillRect(this.posX, this.posY, this.rWidth, this.rHeight);
			this.checkBunnyDirection();
			game.screen.ctx.drawImage(this.bunny(), this.bunnyDirectionSx, 0, 10, 10, this.posX, this.posY, 15, 15);
			//game.screen.ctx.fillStyle = 'black';
		},
	},
	setCanvasProps: function() {
		game.screen.ctx.height = game.screen.ctxHeight;
		game.screen.ctx.width = game.screen.ctxwidth;
	},

	start: function() {
		game.setCanvasProps();
		game.screen.ctx.clearRect(0, 0, game.screen.ctxWidth, game.screen.ctxHeight);
		game.rect.drawRect();
		game.platforms.drawPlatforms();
		
		requestAnimationFrame(game.start);
	},
}


window.onload = function() {

	var requestId = window.requestAnimationFrame(game.start);
	
}
	
