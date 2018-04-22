import 'phaser';
import PlayerControlls from './../../entity/player/PlayerControlls';
import World from './../World';
import Player from './../../entity/player/Player';
import Station from './../../core/Station';
import Utils from './../../utils';
import CameraTrigger from './CameraTrigger';

export default class extends Phaser.Sprite {
    /**
     * @param {Player}
     */
    constructor (player) {
        // kabina
        let bmd = window.game.add.bitmapData(80, 30);
        bmd.fill(0, 255, 150, 0);

        super(window.game, 0, 0, bmd);

        this.game.add.existing(this);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        /**
         * @type {World}
         */
        this.gameWorld = window.world;

        /**
         * @type {Player}
         */
        this.player = player;

        /**
         * @type {Station}
         */
        this._nearestStation = null;

        this._previousDistance = 0;

        this.pivot.x = 50;
    }

    update () {
        this._nearestStation = this._findNearestStation();

        this.game.physics.arcade.overlap(this.gameWorld.cameraTriggersGroup, this.player, function (self, /** @type {CameraTrigger} */cameraTrigger) {
            if (cameraTrigger.isFocusStation()) {
                this.focusStation();
            } else if (cameraTrigger.isFocusTrain()) {
                this.focusTrain();
            } else if (cameraTrigger.isFocusStationUp()) {
                this.focusStationUp();
            }
        }, null, this);
    }

    focusStation () {
        if (typeof this.tween !== 'undefined') {
            this.tween.stop();
        }
        this.tween = this.game.add.tween(this.pivot).to({x: 350, y: -320}, 2500, Phaser.Easing.Linear.None, true);
    }

    focusStationUp () {
        if (typeof this.tween !== 'undefined') {
            this.tween.stop();
        }
        this.tween = this.game.add.tween(this.pivot).to({x: 0, y: -320}, 2500, Phaser.Easing.Linear.None, true);
    }

    focusTrain () {
        if (typeof this.tween !== 'undefined') {
            this.tween.stop();
        }
        this.tween = this.game.add.tween(this.pivot).to({x: 50, y: 0}, 1500, Phaser.Easing.Linear.None, true);
    }

    /**
     * @returns {Station}
     */
    _findNearestStation () {
        let nereastDistance = 99999999;
        let nearestStation = null;

        this.gameWorld.stations.forEach((/** @type {Station} */station) => {
            let stationPosition = station.getPositionCenter();
            let distance = Utils.getDistanceBetween(stationPosition.x, stationPosition.y, this.player.x, this.player.y);
            if (distance < nereastDistance) {
                nereastDistance = distance;
                nearestStation = station;
            }
        });
        return nearestStation;
    }

    /**
     * @returns {number}
     */
    _getDistanceToStation () {
        if (this._nearestStation) {
            let stationPosition = this._nearestStation.getPositionCenter();
            return Utils.getDistanceBetween(stationPosition.x, stationPosition.y, this.player.x, this.player.y);
        } else {
            return 0;
        }
    }
}
