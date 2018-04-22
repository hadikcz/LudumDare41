'use strict';
import 'phaser';
import Utils from './../utils';
import Passanger from './../entity/Passanger';
import config from './../config';
import World from './World';
import Player from './../entity/player/Player';

export default class {
    /**
     * @param {object} properties
     */
    constructor (properties) {
        /**
        * @type {Phaser.Game}
        */
        this.game = window.game;

        /**
         * @type {World}
         */
        this.gameWorld = window.world;

        /**
         * @type {Balance}
         */
        this.balance = window.balance;

        /**
         * @type {object}
         */
        this.properties = properties;

        /**
         * @type {array}
         */
        this.passangers = [];

        /**
         * @type {boolean}
         */
        this._isStationTaken = false;

        /**
         * @type {boolean}
         */
        this._isStationCleared = false;

        /**
         * @type {boolean}
         */
        this.openedDoorsOnThisStation = false;

        // console.log('creating station ' + this.properties.name);
    }

    update () {
        if (this._isPlayerNear()) {
            window.player.nearStation = this;
            if (window.player.isOpenDoors()) {
                this.openedDoorsOnThisStation = true;
            }

            if (this._isStationTaken === false) {
                if (this.properties.name !== 'Depo') {
                    this._spawnPassangers();
                }
                // console.log('creating passanger');
                window.ui.promptStationName(this.properties.name);
                this._isStationTaken = true;
                if (this.gameWorld.timeLeftToNextStation < 0) {
                    // console.log('PENALITY: You are late');
                    let penality = config.balance.penality.latePerSec * Math.abs(this.gameWorld.timeLeftToNextStation);
                    window.ui.promptPenality('-$' + penality + ' You are late for ' + Math.abs(this.gameWorld.timeLeftToNextStation) + 's');
                    this.balance.take(penality);
                    this.gameWorld.timeLeftToNextStation = 15;
                    window.ui.promptTimeBonus('=15s');
                }

                if (this.gameWorld.timeLeftToNextStation > 30) {
                    let penality = config.balance.penality.earlyPerSec * Math.abs(this.gameWorld.timeLeftToNextStation);
                    window.ui.promptPenality('-$' + penality + ' You are too early for ' + Math.abs(this.gameWorld.timeLeftToNextStation) + 's max 30s');
                    this.balance.take(penality);
                    this.gameWorld.timeLeftToNextStation = 15;

                    window.ui.promptTimeBonus('=15s');
                }
                window.ui.promptTimeBonus('+' + config.stations.bonusTimePerStation + 's');
                this.gameWorld.timeLeftToNextStation += config.stations.bonusTimePerStation;
            }
        } else if (this.passangers.length !== 0 && this._isStationCleared === false && this._isStationTaken) {
            this._clearPassangers();
            this._isStationCleared = true;
            // console.log('clearing passanger ' + this.properties.name);
            if (!this.openedDoorsOnThisStation) {
                let penality = config.balance.penality.missStation;
                // console.log('PENALITY: You miss station');
                window.ui.promptPenality('-$' + penality + ' You miss station');
                this.balance.take(penality);
            }
            this._moveGetInPassangerForGetingOut();
        }
    }

    /**
     * @returns {Phaser.Point}
     */
    getPositionCenter () {
        return new Phaser.Point(
            this.properties.x + this.properties.width / 2,
            this.properties.y + this.properties.height / 2
        );
    }

    /**
     * @returns {Phaser.Point}
     */
    getRandomPosition () {
        return new Phaser.Point(
            Utils.getRandomInt(this.properties.x, this.properties.x + this.properties.width),
            Utils.getRandomInt(this.properties.y, this.properties.y + this.properties.height)
        );
    }

    _spawnPassangers () {
        let passangerCount = Utils.getRandomIntArray(config.stations.passangersCount);
        for (let i = 0; i < passangerCount; i++) {
            let passangerPosition = this.getRandomPosition();
            let passanger = new Passanger(passangerPosition.x, passangerPosition.y, this, this._getRandomHead(), false);
            this.passangers.push(passanger);
            this.gameWorld.passangersGroup.add(passanger);
        }
    }

    _clearPassangers () {
        this.passangers.forEach((/** @type {Passanger} */passanger) => {
            passanger.destroy();
        });
    }

    /**
     * @returns {boolean}
     */
    _isPlayerNear () {
        if (typeof window.player === 'undefined') return false;

        return (Utils.getDistanceBetween(
            this.getPositionCenter().x,
            this.getPositionCenter().y,
            window.player.x,
            window.player.y
        ) <= config.stations.activeDistance);
    }

    _moveGetInPassangerForGetingOut () {
        window.player.doors.forEach((door) => {
            door.passangerCount = Math.round(Utils.clone(door.getInCount) / 2);
            door.getInCount = 0;
        });
    }

    /**
     * @returns {number}
     */
    _getRandomHead () {
        return Utils.getRandomFromArray([0, 2, 4, 6, 8, 10, 12, 14, 16]);
    }

    /**
     * @returns {number}
     */
    static getRandomHead () {
        return Utils.getRandomFromArray([0, 2, 4, 6, 8, 10, 12, 14, 16]);
    }
}
