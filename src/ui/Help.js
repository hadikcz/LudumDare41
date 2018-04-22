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

        let bmd = window.game.add.bitmapData(config.gameWidth, config.gameHeight);
        bmd.fill(0, 0, 0, 0.7);
        this.bg = this.game.add.image(0, 0, bmd);
        this.bg.fixedToCamera = true;

        this.centerX = config.gameWidth / 2;
        this.centerY = config.gameHeight / 2;

        let style = {fill: 'white', font: '15px Consolas, Arial'};

        this.customUIGroup = this.game.add.group();

        this.beginButton = this.game.add.button(config.gameWidth / 2, config.gameHeight / 2 + 250, 'wide_buttons', () => {
            this.game.paused = false;
            window.showedHelp = true;
            this.hide();
        }, this, 1, 0, 0);
        this.beginButton.anchor.setTo(0.5);
        this.beginButton.fixedToCamera = true;
        this.beginText = this.game.add.text(this.centerX, this.centerY + 250, 'BEGIN', {fill: 'white', font: '35px Consolas, Arial'});
        this.beginText.fixedToCamera = true;
        this.beginText.anchor.setTo(0.5);

        this.arrowsIcon = this.game.add.image(this.centerX, this.centerY, 'help_arrows');
        this.arrowsIcon.fixedToCamera = true;
        this.arrowsIcon.anchor.setTo(0.5);
        this.arrowsIcon.scale.setTo(2);

        this.arrowsText1 = this.game.add.text(this.centerX + 50, this.centerY - 25, 'UP arrow move forward', style);
        this.arrowsText1.fixedToCamera = true;
        this.arrowsText2 = this.game.add.text(this.centerX + 50, this.centerY + 25, 'DOWN arrow move backward and break', style);
        this.arrowsText2.fixedToCamera = true;

        this.hIcon = this.game.add.image(this.centerX + 150, this.centerY - 200, 'h_key');
        this.hIcon.fixedToCamera = true;
        this.hIcon.anchor.setTo(0.5);
        this.hIcon.scale.setTo(2);
        this.hText = this.game.add.text(this.centerX + 200, this.centerY - 200, 'H key, show this help', style);
        this.hText.fixedToCamera = true;

        this.spaceIcon = this.game.add.image(this.centerX, this.centerY + 100, 'help_space');
        this.spaceIcon.fixedToCamera = true;
        this.spaceIcon.anchor.setTo(0.5);
        this.spaceIcon.scale.setTo(2);

        this.spaceText = this.game.add.text(this.centerX + 125, this.centerY + 95, 'SPACE Close/Open doors', style);
        this.spaceText.fixedToCamera = true;

        this.howToTitleText = this.game.add.text(this.centerX - 380, this.centerY - 200, 'How to:', {fill: 'lime', font: '20px Consolas, Arial'});
        this.howToTitleText.fixedToCamera = true;

        /* eslint-disable */
        let text = "- Stop on every station and open door\n";
        text += '- Pick up passanger and close door and\n';
        text += '  got to next station\n';
        text += '- Watch your time, you must arrive in\n';
        text += '  time between 1 to 30 sec, if you arive\n';
        text += '  early you wil get penality, when arrive\n';
        text += '  late also\n';
        text += '- After finishing day, you can upgrade your\n';
        text += '  train';
        text += '- Be carefull and start slow down\n';
        text += '  in time you can very easy miss\n';
        text += '  station and that is for penality';


        /* eslint-enable */
        this.howToText = this.game.add.text(this.centerX - 380, this.centerY - 180, text, {fill: 'white', font: '14px Consolas, Arial'});
        this.howToText.fixedToCamera = true;

        this.penalityTitleText = this.game.add.text(this.centerX - 380, this.centerY + 75, 'Penalities:', {fill: 'red', font: '20px Consolas, Arial'});
        this.penalityTitleText.fixedToCamera = true;

        let penalitiesText = '- 300$ Miss station/Not stoped\n';
        penalitiesText += '- 100$ Reverse for 5 seconds\n';
        penalitiesText += '- 50$ Drive with open doors, for every sec\n';
        penalitiesText += '- 1$ Per every sec when you arrive early\n';
        penalitiesText += '- 3$ Per every sec when you arrive ;ate\n';

        this.penalitiesText = this.game.add.text(this.centerX - 380, this.centerY + 100, penalitiesText, {fill: 'white', font: '14px Consolas, Arial'});
        this.penalitiesText.fixedToCamera = true;

        this.rewardTiteText = this.game.add.text(this.centerX - 380, this.centerY + 250, 'Rewards:', {fill: 'lime', font: '20px Consolas, Arial'});
        this.rewardTiteText.fixedToCamera = true;

        this.rewardText = this.game.add.text(this.centerX - 380, this.centerY + 280, '- 1 to 3$ for every picked passanger', {fill: 'white', font: '14px Consolas, Arial'});
        this.rewardText.fixedToCamera = true;

        this.balanceText = this.game.add.text(this.centerX - 390, this.centerY - 270, 'Your balance', {fill: 'orange', font: '14px Consolas, Arial'});
        this.balanceText.fixedToCamera = true;

        this.speedText = this.game.add.text(this.centerX - 250, this.centerY - 270, 'Speed', {fill: 'orange', font: '14px Consolas, Arial'});
        this.speedText.fixedToCamera = true;

        this.scheduleText = this.game.add.text(this.centerX - 150, this.centerY - 270, 'schedule', {fill: 'orange', font: '14px Consolas, Arial'});
        this.scheduleText.fixedToCamera = true;

        this.distanceText = this.game.add.text(this.centerX - 50, this.centerY - 270, 'Distance to nearest station', {fill: 'orange', font: '14px Consolas, Arial'});
        this.distanceText.fixedToCamera = true;

        this.gameOverTitleText = this.game.add.text(this.centerX + 110, this.centerY + 180, 'Game over:', {fill: 'red', font: '20px Consolas, Arial'});
        this.gameOverTitleText.fixedToCamera = true;
        let gameOverText = 'When you buy ticket to Hawai for\n15000$ or owe more then 3500$\n(you can go under zero)';
        this.gameOverText = this.game.add.text(this.centerX + 110, this.centerY + 210, gameOverText, {fill: 'white', font: '14px Consolas, Arial'});
        this.gameOverText.fixedToCamera = true;

        if (typeof window.showedHelp !== 'undefined') {
            this.hide();
        } else {
            let self = this;
            setTimeout(() => {
                self.show();
            }, 500);
        }
    }

    show () {
        this.game.paused = true;

        this.distanceText.visible = true;
        this.scheduleText.visible = true;
        this.speedText.visible = true;
        this.balanceText.visible = true;
        this.rewardText.visible = true;
        this.rewardTiteText.visible = true;
        this.penalitiesText.visible = true;
        this.penalityTitleText.visible = true;
        this.howToText.visible = true;
        this.howToTitleText.visible = true;
        this.spaceText.visible = true;
        this.spaceIcon.visible = true;
        this.arrowsText2.visible = true;
        this.arrowsText1.visible = true;
        this.arrowsIcon.visible = true;
        this.beginText.visible = true;
        this.beginButton.visible = true;
        this.bg.visible = true;
        this.hIcon.visible = true;
        this.hText.visible = true;
        this.gameOverTitleText.visible = true;
        this.gameOverText.visible = true;
    }

    hide () {
        this.distanceText.visible = false;
        this.scheduleText.visible = false;
        this.speedText.visible = false;
        this.balanceText.visible = false;
        this.rewardText.visible = false;
        this.rewardTiteText.visible = false;
        this.penalitiesText.visible = false;
        this.penalityTitleText.visible = false;
        this.howToText.visible = false;
        this.howToTitleText.visible = false;
        this.spaceText.visible = false;
        this.spaceIcon.visible = false;
        this.arrowsText2.visible = false;
        this.arrowsText1.visible = false;
        this.arrowsIcon.visible = false;
        this.beginText.visible = false;
        this.beginButton.visible = false;
        this.bg.visible = false;
        this.hIcon.visible = false;
        this.hText.visible = false;
        this.gameOverTitleText.visible = false;
        this.gameOverText.visible = false;
    }

    destroy () {
        this.distanceText.destroy();
        this.scheduleText.destroy();
        this.speedText.destroy();
        this.balanceText.destroy();
        this.rewardText.destroy();
        this.rewardTiteText.destroy();
        this.penalitiesText.destroy();
        this.penalityTitleText.destroy();
        this.howToText.destroy();
        this.howToTitleText.destroy();
        this.spaceText.destroy();
        this.spaceIcon.destroy();
        this.arrowsText2.destroy();
        this.arrowsText1.destroy();
        this.arrowsIcon.destroy();
        this.beginText.destroy();
        this.beginButton.destroy();
        this.bg.destroy();
        this.hIcon.destroy();
        this.hText.destroy();
        this.gameOverTitleText.destroy();
        this.gameOverText.destroy();
    }
}
