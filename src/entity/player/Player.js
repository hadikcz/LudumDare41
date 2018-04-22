import 'phaser';
import MetroSegment from './MetroSegment';
import PlayerControlls from './PlayerControlls';
import EnergyCapacitor from './../../EnergyCapacitor';
import World from './../../core/World';
import PlayerCamera from './../../core/camera/PlayerCamera';
import Balance from './../../core/Balance';
import config from './../../config';
import Upgrades from './../../core/Upgrades';
import Station from './../../core/Station';

export default class extends Phaser.Sprite {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor (x, y) {
        // kabina
        let bmd = window.game.add.bitmapData(80, 30);
        bmd.fill(200, 200, 200, 0);

        super(window.game, x, y, bmd);

        /**
         * @type {World}
         */
        this.gameWorld = window.world;

        /**
         * @type {Balance}
         */
        this.balance = window.balance;

        this.gameWorld.metroGroup.add(this);
        this.game.add.existing(this);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.setSize(80, 30, 0, 0);

        /**
         * @type {PlayerControlls}
         */
        this.controlls = new PlayerControlls(this);

        /**
         * @type {array}
         */
        this.doors = this.gameWorld.doorsNonGroup;

        /**
         * @type {Upgrades}
         */
        this.upgrades = window.upgrades;

        /**
         * @type {Station}
         */
        this.nearStation = null;

        /**
         * @type {array}
         */
        this.segments = [];

        this.body.maxVelocity = new Phaser.Point(0, this.upgrades.getMaxSpeed());
        this.body.drag.set(25);

        let pivot = -15;
        let segmentHeight = 180;
        let segmentSpace = 5;
        for (let i = 0; i < 3; i++) {
            let segment = new MetroSegment(this, segmentHeight);
            segment.pivot.y = pivot;
            segment.pivot.x = 50;
            this.addChild(segment);
            this.segments.push(segment);
            pivot -= segmentHeight + segmentSpace;
        }

        /**
         * @type {PlayerCamera}
         */
        this.playerCamera = new PlayerCamera(this);
        this.addChild(this.playerCamera);

        // interval for check opened door and penality
        this.game.time.events.loop(Phaser.Timer.SECOND, () => {
            // Opened doors penality
            if (this.doors[0].isOpened() && this.isMoving() && Math.abs(this.getFakeVelocity()) >= config.penality.doorSpeed) {
                // console.log('PENALITY: Doors are open !!!');
                let penality = config.balance.penality.doors;
                window.ui.promptPenality('-$' + penality + ' Opened doors while drive!');
                this.balance.take(config.balance.penality.doors);
            }

            // reverse drive penality
            if (this.body.velocity.y > 100) {
                let self = this;
                setTimeout(() => {
                    // metro is still going back
                    if (self.body.velocity.y > 100) {
                        // console.log('PENALITY: You are mad ? You cant go reverse !!!');
                        let penality = config.balance.penality.reverse;
                        window.ui.promptPenality('-$' + penality + 'You can`t reverse');
                        this.balance.take(penality);
                    }
                }, 3000);
            }
        }, this);
    }

    update () {
        this.controlls.update();
        this._speedLimiter();
        this.segments.forEach((child) => {
            child.update();
        });
        this.playerCamera.update();

        // check for enter depo
        try {
            this.game.physics.arcade.overlap(this.gameWorld.cameraTriggersGroup, this, function (self, /** @type {CameraTrigger} */cameraTrigger) {
                if (cameraTrigger.isDepo()) {
                    this.game.state.start('Shop');
                }
            }, null, this);
        } catch (e) { console.log(e); }
    }

    getAcceleration () {
        return {
            forward: this.upgrades.getAcceleration(),
            backward: this.upgrades.getBreaks()
        };
    }

    getFakeVelocity () {
        return Math.round(-this.body.velocity.y / config.metro.speedFakeModifier);
    }

    isMoving () {
        return this.body.velocity.y !== 0;
    }

    /**
     * @returns {boolean}
     */
    isOpenDoors () {
        return this.doors[0].isOpened();
    }

    _speedLimiter () {
        // reverse locker
        if (!this.controlls._canReverse && this.body.velocity.y > 0) {
            this.body.velocity.y = 0;
        }

        // reverse max speed
        if (this.body.velocity.y > config.metro.maxReverseSpeed) {
            this.body.velocity.y = config.metro.maxReverseSpeed;
        }
    }

    destroy () {
        this.doors.forEach((door) => {
            door.destroy();
        });
        this.segments.forEach((door) => {
            door.destroy();
        });
        super.destroy();
    }
}
