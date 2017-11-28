function landObj(){
	this.imgX=584;
	this.imgY=0;
	this.imgW=336;
	this.imgH;
	this.canX=0;
	
	this.canW;
	this.canH;
}

landObj.prototype.draw=function(){
	this.imgH=landH;
	this.canH=landH;
	this.canW=w*2;
	this.canY=bgHeight;
	if(this.canX<=-w)
		this.canX=0;
	//console.log(this.imgH);
	//console.log(this.imgX,this.imgY,this.imgW,this.imgH,this.canX,this.canY,this.canW,this.canH);

	ctx.drawImage(atlas,this.imgX,this.imgY,this.imgW,this.imgH,this.canX,this.canY,this.canW,this.canH);
	this.canX-=spd;
}