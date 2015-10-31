galaxymap.prototype.events = function() 
{
    var isMove = false; //Двигаем ли камеру
    var oldX = 0; var oldY = 0;

    //Прокрутка мыши
    this.mousewheel = function (e) {
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
    };
    
    this.mousedown = function (e) {
        if (e.which == 1) {
            isMove = true;

            oldX = e.pageX;
            oldY = e.pageY;
        }
    };

    this.mouseup = function (e) {
        isMove = false; 
    };

    this.mousemove = function (e) {
        
        //класический способ перевода координат мыши в мировые координаты
        var projector = new THREE.Projector();
        var vector = new THREE.Vector3(
        ( e.pageX / window.innerWidth ) * 2 - 1,
        - ( e.pageY / window.innerHeight ) * 2 + 1,
        0.5 );

        var pos = projector.unprojectVector( vector, e.data.self.camera );
        //дальше пересоздаем отдельную сцену для названия
        e.data.self.sceneNames = new THREE.Scene();
        //Вытаскиваем из KDTree ближайшии звезды от позиции мыши
        var items = e.data.self.tree.nearest({x:pos.x,y:pos.y}, 1, 100);
        //Далее создаем собственно label
        for (var i = 0; i < items.length; i++) {
            e.data.self.sceneNames.add(e.data.self.labelBasic(items[i][0].name,vector.x, vector.y, 60, "#f00"));
        }
    
        
        if (!isMove) {
            return;
        }

        x = e.pageX;
        y = e.pageY;

        e.data.self.camera.position.x -= (x - oldX) / (1/e.data.self.camera.scale.x);
        e.data.self.camera.position.y += (y - oldY) / (1/e.data.self.camera.scale.x);

        oldX = x;
        oldY = y;
        

    };
    
    this.contextmenu = function (e) {
        return false; 
    };

}
