
'use strict';
import 'phaser';
import config from './../config';

export default class {
    constructor () {
        /**
         * @type {number}
         */
        this.accelerationLevel = 0;

        /**
          * @type {number}
          */
        this.maxSpeedLevel = 0;

        /**
           * @type {number}
           */
        this.breaksLevel = 0;
    }

    upgradeAccelerationLevel () {
        if (this.accelerationLevel < 3) {
            this.accelerationLevel++;
        }
    }

    upgradeMaxSpeedLevel () {
        if (this.maxSpeedLevel < 3) {
            this.maxSpeedLevel++;
        }
    }

    upgradeBreaksLevel () {
        if (this.breaksLevel < 3) {
            this.breaksLevel++;
        }
    }

    getAcceleration () {
        switch (this.accelerationLevel) {
            case 0: return 75;
            case 1: return 150;
            case 2: return 200;
            case 3: return 250;
        }
    }

    getMaxSpeed () {
        let maxSpeed;
        switch (this.accelerationLevel) {
            case 0:
                maxSpeed = 80;
                break;
            case 1:
                maxSpeed = 100;
                break;
            case 2:
                maxSpeed = 120;
                break;
            case 3:
                maxSpeed = 150;
                break;
        }
        return maxSpeed * config.metro.speedFakeModifier;
    }

    getBreaks () {
        switch (this.accelerationLevel) {
            case 0: return 150;
            case 1: return 300;
            case 2: return 450;
            case 3: return 750;
        }
    }

    resetUpgrades () {
        this.accelerationLevel = 0;
        this.maxSpeedLevel = 0;
        this.breaksLevel = 0;
    }
}
