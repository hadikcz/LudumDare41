/* globals __DEV__ */
import 'phaser';

import Player from './../entity/player/Player';
import config from './../config';
import UI from './../ui/UI';

export default class extends Phaser.State {
    init () {}
    preload () {}

    create () {
        this.game.world.setBounds(0, 0, config.worldSize.x, config.worldSize.y);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // this.world = new World();
        // window.world = this.world;

        this.player = new Player(1000, 1000);

        this.game.camera.follow(this.player);

        /**
         * @type {UI}
         */
        this.ui = new UI(this.player);
    }

    render () {
        if (__DEV__) {
            this.game.debug.text('render FPS: ' + (this.game.time.fps || '--'), 2, 14, '#00ff00');
            this.game.debug.spriteInfo(this.player, 0, 50);
        }
    }
}
