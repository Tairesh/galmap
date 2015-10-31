galaxymap.prototype.labelBasic = function(text, x, y, size, color)
{
    var geometry = new THREE.Geometry();

    var backgroundMargin = 50;
    var canvas1 = document.createElement('canvas');
    var context1 = canvas1.getContext('2d');

    canvas1.width = 900;
    canvas1.height = 900;

    context1.font = "Normal "+(size*2)+"px Tahoma";
    context1.fillStyle = "rgba(255,255,255,1)";
    context1.textAlign = "center";
    context1.fillStyle = color;
    context1.textBaseline = "middle";
    context1.fillText(text, canvas1.width / 2, canvas1.height / 2);
    

    texture1 = new THREE.Texture(canvas1) 
    texture1.needsUpdate = true;


    var vertex = new THREE.Vector3();
    vertex.x = x;
    vertex.y = y;
    vertex.z = 0;

    geometry.vertices.push( vertex );

    material = new THREE.ParticleBasicMaterial( { size: 215, sizeAttenuation: true, map: texture1, transparent: true } );
    

    particles = new THREE.ParticleSystem( geometry, material );
    particles.sortParticles = true;
    return particles;
}


galaxymap.prototype.label = function(text, x, y, size, color)
{
    var geometry = new THREE.Geometry();

    var backgroundMargin = 50;
    var canvas1 = document.createElement('canvas');
    var context1 = canvas1.getContext('2d');

    canvas1.width = 900;
    canvas1.height = 900;

    context1.font = "Normal "+(size*4)+"px Tahoma";
    context1.fillStyle = "rgba(255,255,255,1)";
    context1.textAlign = "center";
    context1.fillStyle = color;
    context1.textBaseline = "middle";
    context1.fillText(text, canvas1.width / 2, canvas1.height / 2);
    

    texture1 = new THREE.Texture(canvas1) 
    texture1.needsUpdate = true;


    var vertex = new THREE.Vector3();
    vertex.x = x;
    vertex.y = y;
    vertex.z = 0;

    geometry.vertices.push( vertex );

    material = new THREE.ParticleBasicMaterial( { size: 85, sizeAttenuation: true, map: texture1, transparent: true } );
    

    particles = new THREE.ParticleSystem( geometry, material );
    particles.sortParticles = true;
    return particles;
}
