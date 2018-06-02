'use strict';
class SimController{
	constructor(pg, e){
		this.pg = pg;
		this.w = 555;
		this.h = 555;
		this.engine = new SimEngine(this.w,this.h);
		this.run = true;
	}
	resize(w,h){
		this.w=w;
		this.h = h;
		this.engine.resize(w,h);
	}
	getEngine(){
		return "Engine is running!";
	}
	stopElement(e){
		this.engine.objects.forEach((obj)=>{
			if(e===obj.el){
				obj.heldDown=true;
			}
		})
	}
	startElement(e){
		this.engine.objects.forEach((obj)=>{
			if(e===obj.el){
			//	console.log(e.style);
				obj.x = e.getBoundingClientRect().left;
				obj.y = e.getBoundingClientRect().top;
				obj.heldDown=false;
			}
		})
	}
	addObject(el,
		x = Math.floor(this.w * Math.random()),
		y = Math.floor(this.h * Math.random())){
			this.engine.addObject(new FieldObject(x,y,el.clientWidth,el.clientHeight,this.engine.objFieldX, this.engine.objFieldY, el));
			el.style.transform="translate("+x+"px, "+y+"px)";
	}
	removeObject(el){
		for(let i=0 ;i<this.engine.objects.length;i++){
			if(this.engine.objects[i].el.id == el.id){
				//console.log(this.engine.objects[i].el)
				this.engine.removeObject(i);
				el.remove();
			}
		}
	}
	draw(){
		this.engine.objects.forEach((object,i,a)=>{
			object.el.style.transform="translate("+object.x+"px,"+object.y+"px)";
			//console.log(object.el.style.transform)
		});
		if(this.run){
			requestAnimationFrame(this.draw.bind(this));
			this.objects =  this.engine.getNextFrame(1);
		}
	}

}