var birdObj = function() {
    this.imgX;
    this.imgY;
    this.imgW;
    this.imgH;
    this.canW;
    this.canH;
    this.y;
    this.count = 0;
    this.index = 0;
    this.step = 1;
     this.t=4;
}

birdObj.prototype.init = function() {
    this.imgX = [174, 230, 230]; //在原图中x的坐标
    this.imgY = [982, 658, 710]; //在原图中y的坐标
    this.imgW = [34, 34, 34]; //在原图中宽度
    this.imgH = [24.24, 24]; //在原图中高度                                      
    var canW = w / 3;
    var canH = h / 2;
    this.canW = [canW, canW, canW]; //在画布中的宽度
    this.canH = [canH, canH, canH]; //在画布中的高度
    this.y = [canH, canH, canH];
}
birdObj.prototype.draw = function() {
    this.count++;
    if (this.count == 6) {
        this.index += this.step;
        this.count = 0;
    }

    if ((this.index == 2 && this.step == 1) || (this.index == 0 && this.step == -1)) {//01210
        this.step = -this.step;
    }

    if(isStarted){
    var c = 0.5 * 45;
    var a =  0.27*h/ 800;
    var t=this.t;
    dy = a* (t - c);
    
  //console.log(dy);
     if (this.canH[0] + dy <a*c) {
        canClick = false;   
    } else
        canClick = true;
    for (var i = 0; i < 3; i++) {
       this.canH[i] = this.canH[i] + Math.ceil(dy);
       if( this.canH[i]<0)  this.canH[i]=0;
       if( this.canH[i]>bgHeight-24) {
        this.canH[i]=bgHeight-24;
    }
       // console.log(this.canH[i], dy);
    }
    this.t++;
}
    //this.t++;
    //console.log(this.index);
    ctx.drawImage(atlas, this.imgX[this.index], this.imgY[this.index], 34, 24, this.canW[this.index], this.canH[this.index], 34, 24);
}
