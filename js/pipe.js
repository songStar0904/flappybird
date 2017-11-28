
function drawP(i){
	//console.log(pies[i].canX,spd);
	//console.log(bgHeight,landH);
	pies[i].canX-=spd;
	if(pies[i].canX<=-52){
		//console.log("del");
		//canCount=true;
		pies.shift();
	}
	if(pies[i].canX+52<w/2&&pies.length<2){
		creatPipe();
		//console.log("asd");
	}
	var down=bgHeight-100+pies[i].imgH;
	var up=pies[i].imgH;
	if(up<-320) up=-320;
	if(down>320) down=320;
	ctx.drawImage(atlas,pies[i].imgX,pies[i].imgY,pies[i].imgW,up,pies[i].canX,pies[i].canY,-pies[i].imgW,-pies[i].imgH);
	ctx.drawImage(atlas,168,646,-pies[i].imgW,down,pies[i].canX,-pies[i].imgH+bgHeight/6,-pies[i].imgW,bgHeight-bgHeight/6+pies[i].imgH);
	//ctx.drawImage(atlas,this.imgX,this.imgY,this.imgW,this.imgH,this.canX,this.canY,this.imgW,this.imgH);
	
}

function creatPipe(){
	canCount=true;
	var ranH=-Math.random()*(bgHeight-60);
	if(ranH>-bgHeight/2) {ranH-=30;}
	if(ranH<=-bgHeight/2){
		ranH+=60;
	}
	var pipe={
	imgX:163,
	imgY:965,
	imgW:-52,
	imgH:ranH,    //[30,h-30]    [0,h]
	canX:w,
	canY:0,
	draw:drawP
};
	pies.push(pipe);
}