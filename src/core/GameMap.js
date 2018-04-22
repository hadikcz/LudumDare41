'use strict';
import 'phaser';

export default class {
    constructor () {
        /**
        * @type {Phaser.Game}
        */
        this.game = window.game;

        /**
         * @type {Phaser.Tilemap}
         */
        this.tilemap = null;

        /**
         * Place when will be spawned passangers before arrive in to the station
         * @type {array}
         */
        this.stations = [];

        /**
         * Spawn spots for passangers for example escalators etc.
         * @type {array}
         */
        this.stationIncomeSpawnZones = [];

        /**
         * Camera triggers for focus to station or train
         * @type {array}
         */
        this.cameraTriggers = [];

        this._loadTilemap();
    }

    _loadTilemap () {
        this.tilemap = this.game.add.tilemap('map');
        this.tilemap.addTilesetImage('default', 'default');
        this.tilemap.addTilesetImage('tileset', 'tileset');
        this.tilemap.layer = [];
        this.tilemap.layer[0] = this.tilemap.createLayer('dirt');
        this.tilemap.layer[0].resizeWorld();
        window.world._createDirtTexture();
        this.tilemap.layer[1] = this.tilemap.createLayer('underground');
        this.tilemap.layer[1].resizeWorld();
        this.tilemap.layer[2] = this.tilemap.createLayer('ground');
        this.tilemap.layer[2].resizeWorld();
        this.tilemap.layer[3] = this.tilemap.createLayer('onGround');
        this.tilemap.layer[3].resizeWorld();
        this.tilemap.layer[4] = this.tilemap.createLayer('onGround2');
        this.tilemap.layer[4].resizeWorld();

        // this.tilemap.setCollisionBetween(0, 9999, true, this.tilemap.layer[3]);

        this.stations = this.tilemap.objects.stations;
        this.stationIncomeSpawnZones = this.tilemap.objects.stationIncomeSpawnZones;
        this.cameraTriggers = this.tilemap.objects.cameraTriggers;
        this.playerSpawn = this.tilemap.objects.playerSpawns[0];
    }
}
