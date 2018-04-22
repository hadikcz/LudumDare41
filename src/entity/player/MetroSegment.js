import 'phaser';
import Player from './Player';
import Doors from './Doors';

export default class extends Phaser.Sprite {
    /**
     * @param {Player} player
     * @param {number} height
     */
    constructor (player, height) {
        // let bmd = window.game.add.bitmapData(80, height);
        // bmd.fill(150, 150, 150, 255);
        super(window.game, 0, 0, 'metro_part');

        this.scale.setTo(1.5, 1.1);

        this.game.add.existing(this);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.doors = new Doors(player);
        this.doors.anchor.setTo(0.5);
        this.doors.pivot.y = -height / 2;
        this.doors.pivot.x = -10;
        this.addChild(this.doors);
    }

    update () {
        this.doors.update();
    }
}
