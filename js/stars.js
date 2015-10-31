galaxymap.prototype.stars = function(data) {

    //Добавить звезду
    var addStar = function(x, y, name) {
        var v = new THREE.Vector3();
        v.x = x * 10;
        v.y = y * 10;

        geometry.vertices.push(v);  
        this.points.push({x:v.x,y:v.y,name:name});
    }
    //Добавить маркер
    var addMarker = function(x, y) {
        //геометрия
        var g = new THREE.Geometry();
        //Материал системы частиц
        var m = new THREE.ParticleBasicMaterial({
              color: 0x550000,
              size: 35
        });
        for (var i = 0; i < 100; i++) {
            g.vertices.push({x:x,y:y});
        };
        
        //Система частиц
        var p = new THREE.ParticleSystem(
              g,
              m
        );

        this.sceneLabel.add(this.labelBasic(">>                ", x , y , 70, "#f00"));
        this.sceneLabel.add(this.labelBasic("                <<", x , y , 70, "#f00"));

        this.sceneLabel.add(this.labelBasic(this.points[this.here].name, x , y , 60, "#f00"));

        this.sceneLabel.add(p);
    }
    //Растояние между векторами
    var distance = function(a, b) {
        var dx = a.x-b.x;
        var dy = a.y-b.y;
        return dx*dx + dy*dy;
    }

    //геометрия
    var geometry = new THREE.Geometry();
    //Материал системы частиц
    var material = new THREE.ParticleSystemMaterial({
          color: 0xeeeeee,
          size: 3
    });
    //Система частиц
    var particleSystem = new THREE.ParticleSystem(
          geometry,
            material
    );
    for (var i = 0; i < data.length; i++) {
        

        addStar.bind(this).call(this, data[i].x, data[i].y, data[i].name);  

        if(data[i].here)
            addMarker.bind(this).call(this, data[i].x*10, data[i].y*10);    
    };

    this.tree = new kdTree(this.points, distance, ["x", "y","name"]);

    this.scene.add(particleSystem);

}