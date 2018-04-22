import 'phaser';
import Player from './player/Player';
import World from './../core/World';
import Utils from './../utils';
import config from './../config';
import Station from './../core/Station';

export default class extends Phaser.Sprite {
    /**
     * @param {number} x
     * @param {number} y
     * @param {Station} station
     * @param {number} headIndex
     * @param {boolean} getOut
     */
    constructor (x, y, station, headIndex, getOut) {
        super(window.game, x, y, 'passangers', headIndex);

        /**
         * @type {World}
         */
        this.gameWorld = window.world;

        this.game.add.existing(this);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.setSize(10, 10, 0, 0);

        this.scale.setTo(1.5);

        /**
         * @type {Door}
         */
        this.nereastDoors = null;

        this.passangerBody = this.game.add.image(0, 0, 'passangers', headIndex + 1);
        this.passangerBody.anchor.setTo(0, 0);
        this.addChild(this.passangerBody);

        /**
         * @type {Station}
         */
        this.station = station;

        /**
         * @type {string}
         */
        this.aiState = 'wandering';

        /**
         * @type {Phaser.Point}
         */
        this.wanderTarget = null;

        this.getOut = getOut;

        this.canEscape = false;

        this.escapeTarget = null;

        if (this.getOut) {
            let self = this;
            setTimeout(() => {
                self.canEscape = true;
            }, Utils.getRandomInt(3000, 4500));
        }

        this.willEnterToPlayer = this._generateIsWillEnter();

        this.isWanderTargetExpired = false;

        setInterval(() => {
            this.isWanderTargetExpired = true;
        }, Utils.getRandomIntArray(config.passanger.wanderingSwitchTimes));

        this.angleLeft = this.angle - 2;
        this.angleRight = this.angle + 2;
        this.bodyRight = true;

        let self = this;
        this.interval = setInterval(() => {
            if (this.body.velocity.x !== 0) {
                if (self.bodyRight === true) {
                    self.passangerBody.angle = self.angleLeft;
                    self.bodyRight = false;
                } else {
                    self.passangerBody.angle = self.angleRight;
                    self.bodyRight = true;
                }
            }
        }, 100);
    }

    update () {
        /** @type {Doors} */
        let nereastDoors = this._findNereastDoors();
        if (nereastDoors && nereastDoors.isOpened() && !nereastDoors.isMoving() && this.willEnterToPlayer && !this.getOut) {
            this.aiState = 'get_in';
        } else if (this.canEscape) {
            this.aiState = 'escape';
        } else {
            this.aiState = 'wandering';
        }

        // handling AI states
        switch (this.aiState) {
            case 'wandering':
                this._handleAiWandering();
                break;
            case 'get_in':
                this.game.physics.arcade.moveToObject(this, nereastDoors.world, config.passanger.speeds.getIn);
                break;
            case 'come_to_station':
                // coming to the station
                break;
            case 'escape':
                this._handleAiEscape();
                break;
        }
        if (this.escapeTarget && Utils.getDistanceBetween(this.x, this.y, this.escapeTarget.x, this.escapeTarget.y) < 10) {
            this.destroy();
        }
    }

    _handleAiWandering () {
        if (this.isWanderTargetExpired) {
            this.wanderTarget = null;
            this.isWanderTargetExpired = false;
        }
        if (!this.wanderTarget) {
            this.wanderTarget = this.station.getRandomPosition();
        }

        if (Utils.getDistanceBetween(this.x, this.y, this.wanderTarget.x, this.wanderTarget.y) > 5) {
            this.game.physics.arcade.moveToObject(this, this.wanderTarget, config.passanger.speeds.getIn);
        } else {
            this.body.velocity.set(0);
        }
    }

    _handleAiEscape () {
        if (!this.escapeTarget) {
            this.escapeTarget = this._findEscapeTarget();
        }

        this.game.physics.arcade.moveToObject(this, this.escapeTarget, config.passanger.speeds.wandering);
    }

    /**
     * @returns {Doors|null}
     */
    _findNereastDoors () {
        let nereastDistance = 99999999;
        let nereastDoor = null;
        this.gameWorld.doorsNonGroup.forEach((door) => {
            let distance = Utils.getDistanceBetween(door.world.x, door.world.y, this.x, this.y);
            if (
                distance < nereastDistance &&
                distance < config.passanger.minimalFollowDistance &&
                !door.isMoving() &&
                door.isOpened()
            ) {
                nereastDistance = distance;
                nereastDoor = door;
            }
        });
        return nereastDoor;
    }

    _findEscapeTarget () {
        let nereastDistance = 99999999;
        let nereastEscape = null;
        this.gameWorld.escapeZones.forEach((zone) => {
            let distance = Utils.getDistanceBetween(zone.x, zone.y, this.x, this.y);
            if (Utils.getDistanceBetween(zone.x, zone.y, this.x, this.y) < nereastDistance) {
                nereastDistance = distance;
                nereastEscape = zone;
            }
        });
        return nereastEscape;
    }

    _generateIsWillEnter () {
        return Utils.getRandomInt(0, 10) > 1; // 90% chance to enter
    }

    destroy () {
        clearInterval(this.interval);
        super.destroy();
    }
}
