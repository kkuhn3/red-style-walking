
function Walker(height, width, canvas){
	var ctx = canvas.getContext('2d');
	var cellWidth = canvas.width/height;
	var cellHeight = canvas.height/width;
	this.offsetX = 0;
	this.offsetY = 0;
	this.xDir = 0;
	this.yDir = 0;
	this.xCurDir = 0;
	this.yCurDir = 0;
	this.inWalk = 0;
	this.inA = 0;
	this.doStop = true;
	this.init = function(){
		ctx.save();
		this.draw();
	}
	this.draw = function(){
		ctx.clearRect(0-this.offsetX, 0-this.offsetY, canvas.width, canvas.height)
		for(var x=0;x<width;x++){
			for(var y=0;y<height;y++){
				this.drawCell(x,y);
			}
		}
		this.drawPlayer();
	}
	this.drawCell = function(x, y){
		var left = x*cellWidth;
		var top = y*cellHeight;
		ctx.fillStyle="#00FF00";
		ctx.fillRect(left+1,top+1,cellWidth-2,cellHeight-2);
	}
	this.drawPlayer = function(){
		var playerLeft = Math.floor(width/2)*cellWidth - this.offsetX;
		var playerTop = Math.floor(height/2)*cellHeight - this.offsetY;
		ctx.fillStyle="#FF0000";
		ctx.fillRect(playerLeft+4,playerTop+4,cellWidth-8,cellHeight-8);
	}
	this.newDir = function(xDir, yDir){
		this.xDir = 3*xDir;
		this.yDir = 3*yDir;
		this.doStop = false;
	}
	this.hitA = function(){
		this.inA = 2;
	}
	this.stop = function(){
		this.doStop = true;
	}
	this.drawFrame = function(){
		if(this.inWalk < 1 && this.inA < 1){
			if(this.xDir !== 0 || this.yDir !== 0){
				if(this.doStop){
					this.xDir = 0;
					this.yDir = 0;
				}
				else{
					this.inWalk = 17;
					this.xCurDir = this.xDir;
					this.yCurDir = this.yDir;
				}
			}
		}
		else if(this.inWalk < 1 && this.inA > 0){
			this.inA--;
		}
		else if(this.inWalk > 0){
			ctx.translate(-1*this.xCurDir, this.yCurDir);
			this.offsetX = this.offsetX - this.xCurDir;
			this.offsetY = this.offsetY + this.yCurDir;
			this.inWalk--;
		}
		this.draw();
	}
}
