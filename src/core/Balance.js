'use strict';
import 'phaser';

export default class {
    constructor () {
        /**
         * @type {number}
         */
        this.currentBalance = 0;
    }

    /**
     * @param {number} amount
     */
    add (amount) {
        this.currentBalance += amount;
    }

    /**
     * @param {number} amount
     */
    take (amount) {
        this.currentBalance -= amount;
    }
    /**
     * @returns {number}
     */
    get () {
        return this.currentBalance;
    }

    resetBalance () {
        this.currentBalance = 0;
    }
}
