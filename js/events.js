galaxymap.prototype.events = function() 
{
    var isMove = false; //Двигаем ли камеру
    var oldX = 0; var oldY = 0;

    var elem = $("canvas");
    elem.unbind();

    //Прокрутка мыши
    elem.bind("mousewheel", {camera:this.camera}, function (e) {
    	var delta =  e.originalEvent.wheelDelta;
    	var no_move = false;

        e.data.camera.scale.x = e.data.camera.scale.y -= delta*(0.0008*e.data.camera.scale.x);

        if (e.data.camera.scale.y > 1.52) {
            e.data.camera.scale.x = e.data.camera.scale.y = 1.52;
            no_move = true;
        }
        if(e.data.camera.scale.y < 0.0037) {
            e.data.camera.scale.x = e.data.camera.scale.y = 0.0037;
            no_move = true;
        }
        
        if (!no_move && delta > 0) { // смещение в сторону скролла
            x = e.pageX-window.innerWidth/2; 
            y = e.pageY-window.innerHeight/2;
			
            e.data.camera.position.x += (x*e.data.camera.scale.x)/(0.03*delta);
            e.data.camera.position.y -= (y*e.data.camera.scale.y)/(0.03*delta);
        }

        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    });
    elem.bind("mousedown", function (e) {
		if (e.which == 1) {
			isMove = true;

			oldX = e.pageX;
			oldY = e.pageY;
		}
    });

    elem.bind("mouseup", function (e) {
        isMove = false; 
    });

    elem.bind("mousemove", {camera:this.camera}, function (e) {
		
	
		
        if (!isMove) {
            return;
        }

        x = e.pageX;
        y = e.pageY;

        e.data.camera.position.x -= (x - oldX) / (1/e.data.camera.scale.x);
        e.data.camera.position.y += (y - oldY) / (1/e.data.camera.scale.x);

        oldX = x;
        oldY = y;
        

    });
    
    elem.bind("contextmenu", function (e) {
        return false; 
    });

}
