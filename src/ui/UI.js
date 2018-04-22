'use strict';
import 'phaser';
import config from './../config';

export default class {
    /**
     *
     * @param {Player} player
     */
    constructor (
        player
    ) {
        /**
         * @type {Phaser.Game} game
         */
        this.game = window.game;

        let style = {fill: 'white', font: '15px Consolas, Arial'};

        this.customUIGroup = this.game.add.group();

        this.barMoney = this.game.add.image(10, 5, 'bar');
        this.barMoney.fixedToCamera = true;
        this.barMoneyIcon = this.game.add.image(10, 8, 'icons', 0);
        this.barMoneyIcon.fixedToCamera = true;
        this.barMoneyText = this.game.add.text(50, 18, '415', style);
        this.barMoneyText.fixedToCamera = true;

        this.barSpeed = this.game.add.image(120, 5, 'bar');
        this.barSpeed.fixedToCamera = true;
        this.barSpeedIcon = this.game.add.image(123, 12, 'icons', 2);
        this.barSpeedIcon.fixedToCamera = true;
        this.barSpeedText = this.game.add.text(160, 18, '80', {fill: 'white', font: '12px Consolas, Arial'});
        this.barSpeedText.fixedToCamera = true;

        this.barTime = this.game.add.image(230, 5, 'bar');
        this.barTime.fixedToCamera = true;
        this.barTimeIcon = this.game.add.image(232, 10, 'icons', 1);
        this.barTimeIcon.fixedToCamera = true;
        this.barTimeText = this.game.add.text(280, 18, '12', style);
        this.barTimeText.fixedToCamera = true;

        this.barDistance = this.game.add.image(340, 5, 'bar');
        this.barDistance.fixedToCamera = true;
        this.barDistanceIcon = this.game.add.image(342, 10, 'icons', 3);
        this.barDistanceIcon.fixedToCamera = true;
        this.barDistanceText = this.game.add.text(385, 18, '12', style);
        this.barDistanceText.fixedToCamera = true;

        this.stationNameBar = this.game.add.image((config.gameWidth / 2), (config.gameHeight / 2) + 200, 'stationNameBar');
        this.stationNameBar.anchor.setTo(0.5);
        this.stationNameBar.fixedToCamera = true;
        this.stationNameBar.alpha = 0;

        this.stationName = this.game.add.text((config.gameWidth / 2) + 18, (config.gameHeight / 2) + 200, 'Ceskomoravska', {fill: 'white', font: '20px Consolas, Arial'});
        this.stationName.anchor.setTo(0.5);
        this.stationName.fixedToCamera = true;
        this.stationName.alpha = 0;

        // penality proimpty

        this.penalityBar = this.game.add.image((config.gameWidth / 2), (config.gameHeight / 2) - 100, 'penality');
        this.penalityBar.anchor.setTo(0.5);
        this.penalityBar.fixedToCamera = true;
        this.penalityBar.alpha = 0;

        this.penalityText = this.game.add.text((config.gameWidth / 2) + 18, (config.gameHeight / 2) - 100, '', {fill: 'red', font: '15px Consolas, Arial'});
        this.penalityText.anchor.setTo(0.5);
        this.penalityText.fixedToCamera = true;
        this.penalityText.alpha = 0;

        this.timeBonusText = this.game.add.text(280, 60, '', {fill: 'lime', font: '20px Consolas, Arial'});
        this.timeBonusText.anchor.setTo(0.5);
        this.timeBonusText.fixedToCamera = true;
        this.timeBonusText.alpha = 0;
    }

    update () {
        this.barMoneyText.setText(window.balance.get());
        this.barSpeedText.setText(window.player.getFakeVelocity() + 'km/h');
        this.barTimeText.setText(window.world.timeLeftToNextStation + 's');
        this.barDistanceText.setText(Math.round(window.player.playerCamera._getDistanceToStation() / 5) + 'm');
    }

    promptStationName (name) {
        this.stationName.setText(name);
        this.game.add.tween(this.stationNameBar).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
        this.game.add.tween(this.stationName).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
        let self = this;
        setTimeout(() => {
            self.game.add.tween(this.stationNameBar).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
            self.game.add.tween(this.stationName).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
        }, 3000);
    }

    promptPenality (text) {
        this.penalityText.setText(text);
        this.game.add.tween(this.penalityBar).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
        this.game.add.tween(this.penalityText).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
        let self = this;
        setTimeout(() => {
            self.game.add.tween(this.penalityBar).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
            self.game.add.tween(this.penalityText).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
        }, 5000);
    }

    promptTimeBonus (time) {
        this.timeBonusText.setText(time);
        this.game.add.tween(this.timeBonusText).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
        let self = this;
        setTimeout(() => {
            self.game.add.tween(this.timeBonusText).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
        }, 2000);
    }

    destroy () {
        this.barMoney.destroy();
        this.barMoneyIcon.destroy();
        this.barMoneyText.destroy();

        this.barSpeed.destroy();
        this.barSpeedIcon.destroy();
        this.barSpeedText.destroy();

        this.barTime.destroy();
        this.barTimeIcon.destroy();
        this.barTimeText.destroy();

        this.barDistance.destroy();
        this.barDistanceIcon.destroy();
        this.barDistanceText.destroy();

        this.stationNameBar.destroy();
        this.stationName.destroy();

        this.customUIGroup.destroy();

        this.penalityBar.destroy();
        this.penalityText.destroy();

        this.timeBonusText.destroy();
    }
}
