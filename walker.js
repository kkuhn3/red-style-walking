
function Walker(height, width, canvas){
	var ctx = canvas.getContext('2d');
	var cellWidth = canvas.width/height;
	var cellHeight = canvas.height/width;
	this.offsetX = 0;
	this.offsetY = 0;
	this.init = function(){
		this.draw();
	}
	this.draw = function(){
		ctx.fillStyle="#000000";
		ctx.fillRect(0,0,canvas.width,canvas.height);
		for(var x=0;x<width;x++){
			for(var y=0;y<height;y++){
				this.drawCell(x,y);
			}
		}
	}
	this.drawCell = function(x, y){
		var left = x*cellWidth + this.offsetX;
		var top = y*cellHeight + this.offsetY;
		ctx.fillStyle="#00FF00";
		ctx.fillRect(left+1,top+1,cellWidth-2,cellHeight-2);
		
		var playerLeft = Math.floor(height/2)*cellWidth;
		var playerTop = Math.floor(height/2)*cellHeight;
		ctx.fillStyle="#FF0000";
		ctx.fillRect(playerLeft+4,playerTop+4,cellWidth-8,cellHeight-8);
	}
	this.newDir = function(xDir, yDir){
		this.offsetX = this.offsetX - xDir;
		this.offsetY = this.offsetY + yDir;
		this.draw();
	}
}
