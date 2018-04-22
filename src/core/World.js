'use strict';
import 'phaser';
import Utils from './../utils';
import Passanger from './../entity/Passanger';
import GameMap from './GameMap';
import Station from './Station';
import CameraTrigger from './camera/CameraTrigger';
import config from './../config';
import StationEnter from './StationEnter';

export default class {
    constructor () {
        window.world = this;
        /**
        * @type {Phaser.Game}
        */
        this.game = window.game;

        /**
         * @type {array}
         */
        this.dirtTexture = [];

        /**
         * @type {GameMap}
         */
        this.gameMap = new GameMap();

        /**
         * @type {Phaser.Group}
         */
        this.metroGroup = this.game.add.group();

        /**
         * @type {Phaser.Group}
         */
        this.passangersGroup = this.game.add.group();

        /**
         * @type {Phaser.Group}
         */
        this.cameraTriggersGroup = this.game.add.group();

        /**
         * @type {Phaser.Group}
         */
        this.escapeZones = this.game.add.group();

        /**
         * @type {array}
         */
        this.doorsNonGroup = [];

        /**
         * @type {array}
         */
        this.stations = [];

        /**
         * @type {number}
         */
        this.timeLeftToNextStation = 15;

        // handle time take every sec and get penality for late
        this.game.time.events.loop(Phaser.Timer.SECOND, () => {
            this.timeLeftToNextStation--;
        }, this);

        this._spawnStationsPassangers();
        this._spawnCameraTriggers();

        this._spawnEscapeZones();
    }

    update () {
        this.stations.forEach((station) => {
            station.update();
        });
    }

    _createDirtTexture () {
        // 125 000
        let textureSize = 1024;
        for (let y = 122; y < (this.game.world.height / textureSize); y++) {
            let img = this.game.add.image(1411, y * textureSize, 'dirt');
            img.alpha = 0.3;
            this.dirtTexture.push(img);
        }

        for (let y = 122; y < (this.game.world.height / textureSize); y++) {
            let img = this.game.add.image(387, y * textureSize, 'dirt');
            img.alpha = 0.3;
            this.dirtTexture.push(img);
        }
    }

    _spawnStationsPassangers () {
        this.gameMap.stations.forEach((spawnZone) => {
            let station = new Station(spawnZone);
            this.stations.push(station);
        });
    }

    _spawnCameraTriggers () {
        this.gameMap.cameraTriggers.forEach((cameraTrigger) => {
            let trigger = new CameraTrigger(cameraTrigger);
            this.cameraTriggersGroup.add(trigger);
        });
    }

    _spawnEscapeZones () {
        this.gameMap.stationIncomeSpawnZones.forEach((zone) => {
            let escapeZone = new StationEnter(zone);
            this.escapeZones.add(escapeZone);
            // let bmd = window.game.add.bitmapData(zone.width, zone.height);
            // bmd.fill(150, 150, 150, 255);
            // let escapeZone = this.game.add.sprite(zone.x, zone.y, bmd);
            // this.game.physics.enable(escapeZone, Phaser.Physics.ARCADE);
            // escapeZone.body.setSize(zone.width, zone.height, 0, 0);
            // this.escapeZones.add(escapeZone);
        });
    }
}
