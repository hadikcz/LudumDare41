import 'phaser';
import Balance from './../core/Balance';
import Upgrades from './../core/Upgrades';
import config from './../config';

export default class extends Phaser.State {
    init () {}

    preload () {
    }

    create () {
        // some BG
        /**
         * @type {Phaser.Game}
         */
        this.game = window.game;

        /**
         * @type {Balance}
         */
        this.balance = window.balance;

        /**
         * @type {Upgrades}
         */
        this.upgrades = window.upgrades;

        this.center = {
            x: config.gameWidth / 2,
            y: config.gameHeight / 2
        };

        this.game.add.image(0, 0, 'gameBg');
        let self = this;

        var shopTitle = this.game.add.text(this.game.width / 2, 50, 'Shop / Upgrades', {fill: '#ffcc86', font: '42px Consolas, Arial'});
        shopTitle.stroke = '#a38254';
        shopTitle.strokeThickness = 5;
        shopTitle.anchor.setTo(0.5);
        let style = {fill: '#ffcc86', font: '20px Consolas, Arial'};
        // acceleration
        this.game.add.text(this.center.x - 300, this.center.y - 100, 'Acceleration upgrade', style);
        this.accelerationLevel = this.game.add.text(this.center.x - 70, this.center.y - 100, '(' + this.upgrades.accelerationLevel + '/3)', style);
        this.accelerationPrice = this.game.add.text(this.center.x, this.center.y - 100, '$' + config.shop.acceleration[this.upgrades.accelerationLevel], style);
        let buyButtonAcceleration = this.game.add.button(this.center.x + 130, this.center.y - 90, 'buyButton', () => {
            if (this.upgrades.accelerationLevel < 3) {
                let price = config.shop.acceleration[this.upgrades.accelerationLevel];
                if (this.canBuy(price)) {
                    this.balance.take(price);
                    this.upgrades.upgradeAccelerationLevel();
                    this.accelerationLevel.setText('(' + self.upgrades.accelerationLevel + '/3)');
                    if (typeof config.shop.acceleration[this.upgrades.accelerationLevel] !== 'undefined') {
                        this.accelerationPrice.setText('$' + config.shop.acceleration[this.upgrades.accelerationLevel]);
                    } else {
                        this.accelerationPrice.setText('MAX');
                    }
                }
            }
        }, this, 0, 0, 1);
        buyButtonAcceleration.anchor.setTo(0.5);

        // max speed
        this.game.add.text(this.center.x - 300, this.center.y - 50, 'Maxspeed uprade', style);
        this.maxSpeedLevel = this.game.add.text(this.center.x - 70, this.center.y - 50, '(' + this.upgrades.maxSpeedLevel + '/3)', style);
        this.maxSpeedLevelPrice = this.game.add.text(this.center.x, this.center.y - 50, '$' + config.shop.maxSpeed[this.upgrades.maxSpeedLevel], style);
        let buyButtonMaxSpeed = this.game.add.button(this.center.x + 130, this.center.y - 40, 'buyButton', () => {
            if (this.upgrades.maxSpeedLevel < 3) {
                let price = config.shop.maxSpeed[this.upgrades.maxSpeedLevel];
                if (this.canBuy(price)) {
                    this.balance.take(price);
                    this.upgrades.upgradeMaxSpeedLevel();
                    this.maxSpeedLevel.setText('(' + self.upgrades.maxSpeedLevel + '/3)');
                    if (typeof config.shop.maxSpeed[this.upgrades.maxSpeedLevel] !== 'undefined') {
                        this.maxSpeedLevelPrice.setText('$' + config.shop.maxSpeed[this.upgrades.maxSpeedLevel]);
                    } else {
                        this.maxSpeedLevelPrice.setText('MAX');
                    }
                }
            }
        }, this, 0, 0, 1);
        buyButtonMaxSpeed.anchor.setTo(0.5);

        // breaks
        this.game.add.text(this.center.x - 300, this.center.y, 'Breaks uprade', style);
        this.breaksLevel = this.game.add.text(this.center.x - 70, this.center.y, '(' + this.upgrades.breaksLevel + '/3)', style);
        this.breaksLevelPrice = this.game.add.text(this.center.x, this.center.y + 10, '$' + config.shop.breaks[this.upgrades.breaksLevel], style);
        let buyButtonBreaks = this.game.add.button(this.center.x + 130, this.center.y + 10, 'buyButton', () => {
            if (this.upgrades.breaksLevel < 3) {
                let price = config.shop.breaks[this.upgrades.breaksLevel];
                if (this.canBuy(price)) {
                    this.balance.take(price);
                    this.upgrades.upgradeBreaksLevel();
                    this.breaksLevel.setText('(' + self.upgrades.breaksLevel + '/3)');
                    if (typeof config.shop.breaks[this.upgrades.breaksLevel] !== 'undefined') {
                        this.breaksLevelPrice.setText('$' + config.shop.breaks[this.upgrades.breaksLevel]);
                    } else {
                        this.breaksLevelPrice.setText('MAX');
                    }
                }
            }
        }, this, 0, 0, 1);
        buyButtonBreaks.anchor.setTo(0.5);

        // buy ticket to hawai
        this.game.add.text(this.center.x - 300, this.center.y + 50, 'Ticket to hawai', style);

        this.game.add.text(this.center.x, this.center.y + 50, '$' + config.shop.ticket, style);
        let buyButtonTicket = this.game.add.button(this.center.x + 130, this.center.y + 60, 'buyButton', () => {
            if (this.canBuy(config.shop.ticket)) {
                this.state.start('Win');
            }
        }, this, 0, 0, 1);
        buyButtonTicket.anchor.setTo(0.5);

        // balance icon
        let dolarIcon = this.game.add.image(50, this.center.y + 150, 'icons', 0);
        dolarIcon.anchor.setTo(0.5);
        this.balanceText = this.game.add.text(80, this.center.y + 140, this.balance.get(), style);

        this.beginButton = this.game.add.button(config.gameWidth / 2, config.gameHeight / 2 + 250, 'wide_buttons', () => {
            this.state.start('Game');
        }, this, 1, 0, 0);
        this.beginButton.anchor.setTo(0.5);
        this.beginText = this.game.add.text(config.gameWidth / 2, config.gameHeight / 2 + 250, 'Next day', {fill: 'white', font: '24px Consolas, Arial'});
        this.beginText.anchor.setTo(0.5);
    }

    canBuy (price) {
        return this.balance.get() >= price;
    }

    update () {
        this.balanceText.setText(this.balance.get());
    }
}
