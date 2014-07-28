
var game = new Phaser.Game(1024, 768, Phaser.CANVAS, 'mapContainer', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.tilemap('csu', 'assets/csu.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('background', 'assets/csumap.png');
    game.load.image('tiles', 'assets/tiles.png');
}

var map;
var tileset;
var layer;
var pathfinder

function create() {
    background = game.add.tileSprite(0, 0, 1024, 768, "background");
    map = game.add.tilemap('csu');
    map.addTilesetImage('tiles', 'tiles');
    layer = map.createLayer('layer1');
    layer.resizeWorld();

    var walkables = [2]; //walkable tiles, look in the csu.json file

    pathfinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
    pathfinder.setGrid(map.layers[0].data, walkables);
}

function getFormData() {
    var fromXY = document.getElementById('from').value;
    var toXY = document.getElementById('to').value;

    if (fromXY == toXY) {
    	alert('To: and From: must be different.');
    }
    else {
    	var fromArry = fromXY.split(",");
    	var toArry = toXY.split(",");
    	drawPath(parseInt(fromArry[0]), parseInt(fromArry[1]), parseInt(toArry[0]), parseInt(toArry[1]));
    }
}

function drawPath(fromTilex, fromTiley, toTilex, toTiley) {
    pathfinder.setCallbackFunction(function(path) {
        path = path || [];
        for(var i = 0, ilen = path.length; i < ilen; i++) {
            map.putTile(1, path[i].x, path[i].y); //mark each tile in the path as walkable
        }
    });
    pathfinder.preparePathCalculation([fromTilex,fromTiley], [toTilex,toTiley]);
    pathfinder.calculatePath();
}

function update() {
    
}

function render() {

}
