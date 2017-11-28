function check(birld){
//for(var i=0;i<pies.length;i++){
var across={
	top:-pies[0].imgH,
	bottom:bgHeight/6-pies[0].imgH,
	left:pies[0].canX,
	right:pies[0].canX-pies[0].imgW
}

var birldRect={
	top:birld.canH[0],
	bottom:birld.canH[0]+birld.imgH[0],
	left:birld.canW[0],
	right:birld.canW[0]+birld.imgW[0]
}
if(checkPipe(birldRect,across)){
	gameover=true;
	return ;
}
}

function checkPipe(b,a){
	var flag = false;
//console.log("aaaaaaaa","t",b.top,"b",b.bottom,"r",b.right,"l",b.left);
//console.log("bbbbbbbbb",a.top,a.bottom,a.right,a.left);
      
		if((a.left<b.right&&a.right>b.left)){//判断是否碰撞水管
			if(b.top<a.top||b.bottom>a.bottom)	
		{
			flag=true;		
			 $("#hit")[0].play();	
			 setTimeout($("#die")[0].play(),500000);
		}
}
                     if(b.bottom>bgHeight){ //判断是否撞地
                     	flag=true;
                     	 $("#die")[0].play();
                     }
                     //console.log(b.left,a.right);
                    if(b.left>a.right && canCount){ //过管+1
                    	score++;
                    	 $("#point")[0].play();
                    	canCount=false;
                    	//console.log(score);
                    }

		return flag;
}
