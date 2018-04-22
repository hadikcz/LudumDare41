'use strict';
import 'phaser';
import Utils from './../utils';
import Passanger from './../entity/Passanger';
import config from './../config';
import World from './World';
import Player from './../entity/player/Player';
import Station from './Station';

export default class extends Phaser.Image {
    /**
     * @param {object} properties
     */
    constructor (properties) {
        let bmd = window.game.add.bitmapData(properties.width, properties.height);
        bmd.fill(150, 150, 150, 0);
        super(window.game, properties.x, properties.y, bmd);
        this.game.add.existing(this);

        /**
        * @type {Phaser.Game}
        */
        this.game = window.game;

        /**
         * @type {World}
         */
        this.gameWorld = window.world;

        /**
         * @type {object}
         */
        this.properties = properties;

        /**
         * @type {boolean}
         */
        this._isActive = false;

        /**
         * @type {Station}
         */
        this.station = Utils.findNearest(this, this.gameWorld.stations);

        this._canSpawn = true;

        this.timeout = null;

        this.passangerLimit = 15;
    }

    update () {
        this._isActive = (typeof window.player !== 'undefined' && Utils.getDistanceBetween(this.x, this.y, window.player.x, window.player.y) <= 1000);

        if (this._isActive && this._canSpawn && this.passangerLimit > 0) {
            let passangerPosition = this.getRandomPosition();
            let passanger = new Passanger(passangerPosition.x, passangerPosition.y, this.station, Station.getRandomHead(), false);
            this.station.passangers.push(passanger);
            this.gameWorld.passangersGroup.add(passanger);
            this._canSpawn = false;
            this.passangerLimit--;
            let self = this;
            this.timeout = setTimeout(() => {
                self._canSpawn = true;
            }, Utils.getRandomInt(3000, 6000));
        }
    }

    /**
     * @returns {Phaser.Point}
     */
    getPositionCenter () {
        return new Phaser.Point(
            this.properties.x + this.properties.width / 2,
            this.properties.y + this.properties.height / 2
        );
    }

    /**
     * @returns {Phaser.Point}
     */
    getRandomPosition () {
        return new Phaser.Point(
            Utils.getRandomInt(this.properties.x, this.properties.x + this.properties.width),
            Utils.getRandomInt(this.properties.y, this.properties.y + this.properties.height)
        );
    }

    destroy () {
        clearTimeout(this.timeout);
        super.destroy();
    }
}
