import 'phaser';
import PlayerControlls from './PlayerControlls';
import EnergyCapacitor from './../../EnergyCapacitor';

export default class extends Phaser.Sprite {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor (x, y) {
        super(window.game, x, y, 'tank');

        this.game.add.existing(this);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        /**
         * @type {World}
         */
        this.gameWorld = window.world;

        /**
         * @type {PlayerControlls}
         */
        this.controlls = new PlayerControlls(this);

        /**
         * @type {EnergyCapacitor}
         */
        this.energy = new EnergyCapacitor(100, 100);

        /**
         * @type {boolean}
         */
        this._onDirt = false;

        /**
         * @type {string}
         */
        this.direction = 'front';

        this.anchor.setTo(0.5);
    }

    update () {
        this.controlls.update();
    }

    getVelocity () {
        return 150;
    }
}
