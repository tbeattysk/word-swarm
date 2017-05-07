'use strict';
class SimController{
	constructor(pg, e){
		//this.e = e;
		window.addEventListener('mousemove', this.getMousePos.bind(this));
		window.addEventListener('mousedown', this.setMouseDown.bind(this));
		window.addEventListener('mouseup', this.setMouseUp.bind(this));
		this.mouseX = 0;
		this.mouseY = 0;
		this.mouseDown = false;
		this.pg = pg;
		//this.w = pg.clientWidth;
		//this.h = pg.clientWidth;
		//console.log(`${this.w} by ${this.h}`)
		this.w = 555;
		this.h = 555;
		this.engine = new SimEngine(this.w,this.h);
	}
	resize(w,h){
		this.w=w;
		this.h = h;
		this.engine.resize(w,h);
	}
	getMousePos(evt) {
		if(evt.srcElement.className == "word"){
		    this.mouseX = evt.clientX - this.pg.offsetLeft;
		    this.mouseY = evt.clientY - this.pg.offsetTop;
	    }
	}
	setMouseDown(evt){
		this.mouseDown=true;
	}
	setMouseUp(evt){
		this.mouseDown=false;
	}

	getEngine(){
		return "Engine is running!";
	}
	addObject(el){
			const x = Math.floor(this.w * Math.random()); //Uh Oh
			const y = Math.floor(this.h * Math.random());
			this.engine.addObject(new FieldObject(x,y,el.clientWidth,el.clientHeight,this.engine.objFieldX, this.engine.objFieldY, el));
			el.style.transform="translate("+x+"px, "+y+"px)";
	}

	draw(){
		this.engine.objects.forEach((object,i,a)=>{
			object.el.style.transform="translate("+object.x+"px,"+object.y+"px)";
			//console.log(object.el.style.transform)
		});
		requestAnimationFrame(this.draw.bind(this));
		this.objects =  this.engine.getNextFrame(1, this.mouseX, this.mouseY, this.mouseDown)
	}

}