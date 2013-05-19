var context, canvas, HEIGHT, WIDTHvar isCanvasValid = falsevar interval = 30var boxWidth, boxHeightboxWidth = boxHeight = 50//Mouse moving eventsvar mouseDown = false, dragBox, dragX, dragY, boxShift = 5var boxes = []function addBoxToCanvas(box){	context.fillStyle = box.fill	context.fillRect(box.x,box.y,box.w,box.h)	if(box.stroke != null){		context.strokeStyle = box.stroke		context.lineWidth = 3		context.strokeRect(box.x,box.y,box.w,box.h)	}	invalidate()}function Box(x,y,w,h, fill,stroke){	this.x = x	this.y = y	this.w = w	this.h = h	this.fill = fill		if(stroke === 'undefined')		this.stroke = null	else		this.stroke = stroke}$(document).ready(function(){	initListeners();	initGlobals()	setInterval(draw, interval)});function clearCanvas(){	context.clearRect(0,0,WIDTH, HEIGHT)}function draw(){	if(!isCanvasValid){		clearCanvas()		for(i=0;i<boxes.length;i+=1){			addBoxToCanvas(boxes[i])		}		isCanvasValid = true	}}function doesXYLieInRect(x,y,b){	if(x>b.x && x<b.x+b.w && y> b.y && y<b.y+b.h)		return true	else		return false}function strokeBox(box){	box.stroke = "rgb(0,255,0)"}function initListeners(){	$(document).keydown(function(event){		if(dragBox){			switch(event.keyCode){				case 37: dragBox.x -= boxShift;	invalidate(); break				case 38: dragBox.y -= boxShift; invalidate(); break;				case 39: dragBox.x += boxShift; invalidate(); break;				case 40: dragBox.y += boxShift; invalidate(); 	break			}		}	})	$("canvas").mousedown(function(event){		mouseDown = true		xpos = event.pageX - event.currentTarget.offsetLeft		ypos = event.pageY - event.currentTarget.offsetTop		//check if xpos and ypos lie in any of the box, go from last to first		dragBox = null		dragX = xpos		dragY = ypos		removeStrokeFlag = false		for(i=boxes.length-1;i>=0;i-=1){			if(!removeStrokeFlag && doesXYLieInRect(xpos, ypos, boxes[i])){				dragBox = boxes[i]				removeStrokeFlag = true			}			boxes[i].stroke = null		}		if(dragBox != null){			strokeBox(dragBox)			invalidate()		}		else			invalidate()			})	$("canvas").mouseup(function(event){		mouseDown = false	})	$("canvas").mousemove(function(event){		if(mouseDown && dragBox){			xpos = event.pageX - event.currentTarget.offsetLeft			ypos = event.pageY - event.currentTarget.offsetTop			xShift = xpos - dragX			yShift = ypos - dragY			dragX = xpos			dragY = ypos			dragBox.x += xShift			dragBox.y += yShift			invalidate()		}	})	$("canvas").dblclick(function(event){		xpos = event.pageX - event.currentTarget.offsetLeft		ypos = event.pageY - event.currentTarget.offsetTop		//if(xpos > boxWidth/2)			xpos = xpos - boxWidth/2		//else			//xpos = 0		//if(ypos > boxHeight/2)			ypos = ypos - boxHeight/2		//else			//ypos = 0		b = new Box(xpos, ypos, boxWidth, boxHeight, "rgb(255,0,0)")		boxes.push(b)		addBoxToCanvas(b)	})	}function invalidate(){	isCanvasValid = false}function initGlobals(){	context = $("#canvas").get(0).getContext("2d")	canvas = $("#canvas")	HEIGHT = canvas.height()	WIDTH = canvas.width()}