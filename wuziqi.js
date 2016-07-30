$(function () {


    
    var shijian=$('.jishi')
    var kaishi=$('.kaishi')
    var moshi=$('.moshi')
    var chonglai=$('.chonglai')
    var flag=true;
    var isAi=true;

    
 moshi.one('click',function(){
    shezhi();
 })

    var shezhi=function(){
        isAi=false;
        alert('已切换双人模式')
        moshi.text('人机游戏')
        moshi.one('click',function(){
        isAi=true;
        alert('已切换人机模式')
        moshi.text('双人游戏')
         moshi.one('click',function(){
            shezhi();
         })
        })


}
    //计时

    function startTime(){
        clearInterval(tt);
        tt = setInterval(jishi,1000);
    }
    function endTime(){
        clearInterval(tt);
    }
    var tt;
    var time=0; 
    var min=0;
    var second=0;
   function jishi(){
    time +=1;   
        second=time%60;
        if(time%60 == 0){
            min = parseInt(min);
            min += 1;
            min = (min<10)?'0'+min:min;
        }
        second = (second<10)?'0'+second:second;
        $(".jishi").html(min +':'+second);

   }









    function join(n1,n2) {
     return n1+'_'+n2;
    }

    var ai=function(){
        var zuobiao;
        var max=-Infinity;
        for(var i in kongbai){
            var weixie =panduan(kongbai[i],bai);
            if(weixie>max){
                max=weixie;
                zuobiao=kongbai[i];
            }
        }
        var zuobiao2;
        var max2=-Infinity;
        for(var i in kongbai){
            var weixie =panduan(kongbai[i],hei);
            if(weixie>max2){
                max2=weixie;
                zuobiao2=kongbai[i];
            }
        }

/*        console.log(max)
        console.log(zuobiao)*/
        /*return zuobiao;*/
        return (max>max2)?zuobiao:zuobiao2;
    }


    
   chonglai.on('click',function(){
    time = 0;
    min=0;
    second=0;
    $('.qipan').empty();
    chong();
    kaishi.trigger('click')

   })

   chong();  
  function chong(){
     hei={};
     bai={};
    kongbai={};
    for (var i = 0; i < 15; i++) {
       $('<b>').addClass('heng').appendTo('.qipan');
        $('<i>').addClass('shu').appendTo('.qipan');
        for (var j = 0; j < 15; j++) {
            kongbai[i+'_'+j]={x:i,y:j};
            $('<div>').addClass('qizi').appendTo('.qipan')
                .attr('id',i+'_'+j)
                .data('pos',{'x':i,'y':j});

        }
    }
    kaishi.on('click',function(){
        $('.jishi').addClass('tanchu')
        console.log( $('.jishi'));
         startTime();
    $('.qizi').on('click',function () {
        if($(this).hasClass('hei')||$(this).hasClass('bai')){
            return;
        }
        var pos=$(this).data('pos');

        if(flag){
            $(this).addClass('bai')
            delete kongbai[join(pos.x,pos.y)]
            bai[pos.x+'_'+pos.y]=true;
            if(panduan(pos,bai)>=5){
                endTime();
                alert("白胜");
                $('.qizi').off('click');
                return;
            }
            console.log(isAi)
            flag=!flag;


            if(isAi){

                var pos = ai();
                delete kongbai[join(pos.x,pos.y)]
                hei[pos.x + '_' + pos.y] = true
                if (panduan(pos, hei) >= 5) {
                    endTime();
                      alert("黑胜");
                    $('.qizi').off('click');

                }
                $('#'+join(pos.x,pos.y)).addClass('hei');
                flag=!flag;
                return;
            }

        }else{
            $(this).addClass('hei');
            hei[pos.x+'_'+pos.y]=true;
            if(panduan(pos,hei)>=5){
                endTime();
                alert("黑胜");
                $('.qizi').off('click');
            }

            flag=!flag;
        }
    })

 })
}












        var panduan =function (pos,biao) {
            var shu = 1,hang=1,zuo=1,you=1;
            var tx,ty;
            /*行*/
            // console.log(pos.x,pos.y)
            tx=pos.x;
            ty=pos.y;
        while ( biao [join(tx,ty-1) ]){
          hang ++;ty--;
        }
            tx=pos.x;
            ty=pos.y;
         while (biao [join(tx,ty+1) ]){
        hang ++;ty++;
         }
            /*if(hang>=5){return true}*/
            /*竖*/
            tx=pos.x;
            ty=pos.y;
            while(biao[join(tx-1,ty)]){
             shu++,tx--;
          }
            tx=pos.x;
            ty=pos.y;
          while(biao[join(tx+1,ty)]){
              shu++,tx++;
          }
            /*if(shu>=5){return true}*/


        /* you*/
            tx=pos.x;
            ty=pos.y;
          while(biao[join(tx+1,ty+1)]){
              tx++,ty++,you++
          }
            tx=pos.x;
            ty=pos.y;
            while(biao[join(tx-1,ty-1)]){
                tx--,ty--,you++
            }
           /* if(you>=5){return true}*/
           /* console.log(zuo);*/
        /* zuo*/
            tx=pos.x;
            ty=pos.y;
            while(biao[join(tx+1,ty-1)]){
                tx++,ty--,zuo++
            }
            tx=pos.x;
            ty=pos.y;
            while(biao[join(tx-1,ty+1)]){
                tx--,ty++,zuo++
            }
            /*if(zuo>=5){return true}*/
            // console.log(Math.max(hang,shu,zuo,you))
            return Math.max(hang,shu,zuo,you);
       }



})
