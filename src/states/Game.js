/* globals __DEV__ */
import 'phaser';
import World from './../core/World';
import Player from './../entity/player/Player';
import config from './../config';
import Balance from '../core/Balance';
import UI from './../ui/UI';
import Help from './../ui/Help';

export default class extends Phaser.State {
    init () {}
    preload () {}

    create () {
        this.game.renderer.roundPixels = true;
        this.game.world.setBounds(0, 0, config.worldSize.x, config.worldSize.y);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.world = new World();

        let playerSpawn = this.world.gameMap.playerSpawn;
        this.player = new Player(
            playerSpawn.x + playerSpawn.width / 2,
            playerSpawn.y + playerSpawn.height / 2);
        window.player = this.player;

        /**
         * @type {UI}
         */
        this.ui = new UI(this.player);
        window.ui = this.ui;

        /**
         * @type {Help}
         */
        this.help = new Help();
        window.help = this.help;
    }

    update () {
        this.world.update();
        this.ui.update();

        if (window.balance.get() <= config.oweLimitToGameOver) {
            window.loseType = 'owe';
            this.game.state.start('GameOver');
        }
    }

    render () {
        // this.game.camera.focusOnXY(this.player.x - 200, this.player.y + 300);
        this.game.camera.follow(this.player.playerCamera);
        if (__DEV__) {
            // this.game.debug.text('render FPS: ' + (this.game.time.fps || '--'), 2, 14 + 100, '#00ff00');
            // this.game.debug.text('Speed: ' + this.player.getFakeVelocity(), 2, 25 + 100, '#00ff00');
            // this.game.debug.text('Balance: ' + window.balance.get(), 2, 38 + 100, '#00ff00');
            // this.game.debug.text('Timeleft: ' + window.world.timeLeftToNextStation, 2, 50 + 100, '#00ff00');
            // this.game.debug.text('Distance station: ' + Math.round(this.player.playerCamera._getDistanceToStation() / 5) + 'm', 2, 70 + 100, '#00ff00');
            // this.game.debug.text('Real distance station: ' + Math.round(this.player.playerCamera._getDistanceToStation()) + 'px', 2, 90 + 100, '#00ff00');

            // this.game.debug.spriteInfo(this.player, 0, 150);
        }
    }

    shutdown () {
        this.player.destroy();
        this.world.metroGroup.destroy();
        this.world.passangersGroup.destroy();
        this.world.cameraTriggersGroup.destroy();
        this.world.cameraTriggersGroup.destroy();
        this.world.dirtTexture.forEach((dirt) => {
            dirt.destroy();
        });
        this.world.gameMap.tilemap.destroy();
        this.ui.destroy();
        this.help.destroy();
    }
}
