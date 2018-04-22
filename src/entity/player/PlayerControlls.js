import 'phaser';
import Player from './Player';

export default class {
    /**
     * @param {Player} player
     */
    constructor (player) {
        /**
         * @type {Phaser.Game}
         */
        this.game = window.game;

        /**
         * @type {Player}
         */
        this.player = player;

        /**
         * @type {Phaser.CursorKeys}
         */
        this._cursors = this.game.input.keyboard.createCursorKeys();

        /**
         * @type {boolean}
         */
        this._canReverse = false;

        this._canStartTimer = true;
    }

    update () {
        if (this.game.input.keyboard.enabled === false) {
            this.game.input.keyboard.reset();
            return;
        }

        // reverse lock
        if (this.player.body.velocity.y > 0 && this._canStartTimer) {
            this._canStartTimer = false;
            let self = this;
            setTimeout(() => {
                self._canReverse = true;
                self._canStartTimer = true;
            }, 1000);
        }
        // reset reverse lock
        if (this.player.body.velocity.y < 0) {
            this._canReverse = false;
        }

        if (this._cursors.up.isDown) {
            this.game.physics.arcade.accelerationFromRotation(
                this.player.rotation - Math.PI / 2,
                this.player.getAcceleration().forward,
                this.player.body.acceleration
            );
        } else if (this._cursors.down.isDown) {
            this.game.physics.arcade.accelerationFromRotation(
                this.player.rotation - Math.PI / 2,
                -this.player.getAcceleration().backward,
                this.player.body.acceleration
            );
        } else {
            this.player.body.acceleration.set(0);
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.player.doors.forEach((door) => {
                if (door.canToggle()) {
                    door.toggle();
                }
            });
        }

        // debug - go to shop
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            // this.game.state.restart();
            // this.game.state.clearCurrentState();
            this.game.state.start('Shop');
        }
        // if (this.game.input.keyboard.isDown(Phaser.Keyboard.R)) {
        //     window.ui.promptPenality('-$200 You miss station');
        // }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.H)) {
            window.help.show();
        }

        // debug switch camera
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.R)) {
            this.player.playerCamera.focusStation();
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.F)) {
            this.player.playerCamera.focusTrain();
        }
    }
}
