Clock = function(){
	var jCanvas = $('<canvas width="450" height="300">');
	//jCanvas.on('mousemove',onMousemove);
	$(document.body).append(jCanvas);
	this.canvas = jCanvas[0];
	this.ctx = this.canvas.getContext('2d');
	this.ctx.strokeStyle = 'red';
	this.ctx.fillStyle = 'red';
	this.rect = {w:this.canvas.width,h:this.canvas.height,x:0,y:0};
	this.radius = 50;
	this.count = 1;
	this.interval = 1000;
};

Clock.prototype = {
	drawingMarks : function(){
		var radius = this.radius;
		var rx = radius;
		var ry = radius;
		//Hour Wheel Marks
		for(var i=1;i<=12;i++){
			var radian = (Math.PI * 2 / 12) * i;
			var p1 = this.getPoint(radian,radius - 8);
			var p2 = this.getPoint(radian,radius);
			this.ctx.moveTo(rx + p1.x , ry + p1.y);
			this.ctx.lineTo(rx + p2.x , ry + p2.y);
		}
		//Minute Wheel Marks
		for(var j=1;j<=60;j++){
			var radian = (Math.PI * 2 / 60) * j;
			var p1 = this.getPoint(radian,radius - 3);
			var p2 = this.getPoint(radian,radius);
			this.ctx.moveTo(rx + p1.x , ry + p1.y);
			this.ctx.lineTo(rx + p2.x , ry + p2.y);
		}
	},
	drawing : function(){
		var radius = this.radius;
		var rx = radius;
		var ry = radius;
		//Core Drawing 
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.beginPath();
		this.ctx.arc(rx,ry,radius,0,2 * Math.PI);
		var radian = (Math.PI * 2 / 12) * this.count;
		var p = this.getPoint(radian,radius);
		this.drawingMarks();
		//
		this.ctx.moveTo(rx, ry);
		this.ctx.arc(rx,ry,2,0,Math.PI*2);
		//
		var date = new Date();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		//Hour Wheel
		radian = (Math.PI * 2 / 12) * (hours - 12) + (Math.PI * 2 / 12) * (minutes / 60);
		var p1 = this.getPoint(radian - Math.PI/2,radius-25);
		this.ctx.moveTo(rx, ry);
		this.ctx.lineTo(rx + p1.x , ry + p1.y);
		//Minute Wheel
		radian = (Math.PI * 2 / 60) * minutes + (Math.PI * 2 / 12 / 60 / 60) * seconds;;
		var p2 = this.getPoint(radian - Math.PI/2,radius-15);
		this.ctx.moveTo(rx, ry);
		this.ctx.lineTo(rx + p2.x , ry + p2.y);
		//Second Wheel
		radian = (Math.PI * 2 / 60) * seconds;
		var p3 = this.getPoint(radian - Math.PI/2,radius);
		this.ctx.moveTo(rx, ry);
		this.ctx.lineTo(rx + p3.x , ry + p3.y);
		this.ctx.stroke();
	},
	getPoint : function(radian,radius){
		var x = Math.cos(radian) * radius;
		var y = Math.sin(radian) * radius;
		return {x : x , y : y};
	},
	start : function(){
		//this.drawing();
		setInterval($.proxy(this.drawing,this),this.interval);
	}
};

function globalToLocal(canvas, x, y) {
  var bbox = canvas.getBoundingClientRect();
  var x = x - bbox.left * (canvas.width / bbox.width);
	var y = y - bbox.top  * (canvas.height / bbox.height);
	return {x: x, y : y};
}


$(function(){
	var c = new Clock();
	c.start();
});
