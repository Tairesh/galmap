var galaxyMap = {};
$(document).ready(function main() {

	//Создаем рендер
	if(Detector.webgl)
    	var renderer = new THREE.WebGLRenderer();
    else
    {
    	alert("Увы, ваш браузер не поддерживает WebGL.")
    	return;
    }
    renderer.setClearColor(0x000000);
    renderer.setSize( window.innerWidth - 25, window.innerHeight - 25 );
	renderer.sortObjects = false;
	renderer.autoClear = false;

    document.body.appendChild( renderer.domElement );
    
    var data = (function() {
        var result = {list:[], here: -1};
        //Поворачиваем вектора на угл
        var VectorRot = function(dir, angle) {
            var vecRes = {x:0,y:0};
            vecRes.x = dir.x * Math.cos(angle) - dir.y * Math.sin(angle);
            vecRes.y = dir.x * Math.sin(angle) + dir.y * Math.cos(angle);
            return vecRes;
        }

        //переменные для построения логорифмической спирали
        var countStars = 20000;
        var a = 1.1;
        var b = 0.17;
        var windings = 3.7;
        var tMax = 2.0 * Math.PI * windings;        
        var drift = 0.3
        //Двумя циклами исправляем проблему с некрасивым центром спирали
        //Первым циклом генерим кольцо из точек
        for (var i = 0; i < 4000; i++) {
            var vec = {x:Math.sRandom(0.8, 1.7),y:0};
            var angle = Math.sRandom(0, Math.PI*2.5);
            vec = VectorRot(vec, angle);
            result.list.push({x:vec.x, y:vec.y, name: genName(), here: false});
        }
        //Вторым циклом генерим круг из точек
        for (var i = 0; i < 4000; i++) {
            var vec = {x:Math.sRandom(0.001, 0.8),y:0};
            var angle = Math.sRandom(0, Math.PI*2.5);
            vec = VectorRot(vec, angle);
            result.list.push({x:vec.x, y:vec.y, name: genName(), here: false});
        }

        //Строим логарифмическую спираль
        for (var i = 0; i < countStars; i++) {
            //формула + рандомное смещение точек
            var t = tMax * Math.random();
            var x = a * Math.exp(b * t) * Math.cos(t);
            x = x + (drift*x*Math.random()) - (drift*x*Math.random());
            var y = a * Math.exp(b * t) * Math.sin(t);
            y = y + (drift*y*Math.random()) - (drift*y*Math.random())
            //Зеркально равномерно распределяем точки
            if (Math.random() > 0.5) {
                result.list.push({x:x, y:y, name: genName(), here: false});
            }
            else { //Отражение спирали
                result.list.push({x:-x, y:-y, name: genName(), here: false});
            }
        }
        Math.seed = Math.random();
        result.here = Math.floor(Math.sRandom(0, countStars - 1));
        result.list[result.here].here = true;
        return result;
    })();


    galaxyMap = new galaxymap(renderer, data);

    $(document).bind("mouseup", galaxyMap.mouseup);
    $(document).bind("mousedown", galaxyMap.mousedown);
    $(document).bind("mousewheel", {camera:galaxyMap.camera}, galaxyMap.mousewheel);
    $(document).bind("mousemove", {self: galaxyMap}, galaxyMap.mousemove);
    
    var draw = function() 
    {

        requestAnimationFrame( draw );
        
        renderer.clear();

        galaxyMap.draw.bind(galaxyMap).call(galaxyMap, {});
    }
    draw();
});
