import 'phaser';
import Player from './Player';
import World from './../../core/World';
import config from './../../config';
import Utils from './../../utils';
import Passanger from '../Passanger';
import Station from './../../core/Station';
import FlyTextUI from './../../ui/FlyTextUI';

export default class extends Phaser.Sprite {
    /**
     * @param {Player} player
     */
    constructor (player) {
        let bmd = window.game.add.bitmapData(10, 50);
        bmd.fill(255, 255, 255, 0);
        super(window.game, 0, 0, bmd);
        this.tint = 0xFF0000;

        // 4, -12
        this.image = this.game.add.image(-4, -12, 'doorAnimation', 0);
        this.addChild(this.image);

        /**
         * @type {World}
         */
        this.gameWorld = window.world;

        /**
         * @type {Player}
         */
        this.player = player;

        this.game.add.existing(this);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.setSize(10, 50, 0, 0);

        this.gameWorld.doorsNonGroup.push(this);

        this._isOpened = false;

        this._canToggle = true;

        this.defaultAnimation = this.image.animations.add('toggle');
        this.defaultAnimationReverse = this.image.animations.add('close', [8, 7, 6, 5, 4, 3, 2, 1, 0]);

        this.passangerCount = 0;

        this.getInCount = 0;
    }

    update () {
        let self = this;
        this.game.physics.arcade.overlap(this.gameWorld.passangersGroup, this, function (me, passanger) {
            if (!passanger.getOut) {
                let reward = Utils.getRandomIntArray(config.balance.rewards.passanger);
                new FlyTextUI(window.game, this.world.x, this.world.y, '+' + reward, '#48bc2d', '#225616', 16);
                self.player.balance.add(reward);
                // POPUP reward
                // make some sound for reward
                console.log('TODO: remove from station for clear GC');
                passanger.destroy();
                this.getInCount++;
            }
        }, null, this);

        if (this._isOpened) {
            this.tint = 0x00FF00;
        } else {
            this.tint = 0xFF0000;
        }

        if (this._canPassangerGetOut()) {
            for (let i = 0; i < this.passangerCount; i++) {
                setTimeout(() => {
                    // if (self._canPassangerGetOut()) {
                    let passanger = new Passanger(self.world.x, self.world.y, self.player.nearStation, Station.getRandomHead(), true);
                    self.player.nearStation.passangers.push(passanger);
                    self.gameWorld.passangersGroup.add(passanger);
                    // this.taken++;
                    // }
                }, Utils.getRandomInt(100, 1000));
            }
            this.passangerCount = 0;
        }
    }

    isMoving () {
        return this.player.isMoving();
    }

    toggle () {
        this._isOpened = !this._isOpened;
        if (this.isOpened()) {
            this.defaultAnimation.play(10, false);
        } else {
            this.defaultAnimationReverse.play(10, false);
        }
        this._canToggle = false;
        setTimeout(() => {
            this._canToggle = true;
        }, config.doors.delay, this);
    }

    canToggle () {
        return this._canToggle;
    }

    isOpened () {
        return this._isOpened;
    }

    _canPassangerGetOut () {
        return (
            this.player.nearStation &&
            !this.player.isMoving() &&
            this.isOpened() &&
            Utils.getDistanceBetween(
                this.world.x,
                this.world.y,
                this.player.nearStation.getPositionCenter().x,
                this.player.nearStation.getPositionCenter().y
            ) <= 500 &&
            this.passangerCount > 0
        );
    }
}
