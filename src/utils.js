'use strict';
var Utils = {
    getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomIntArray (ranges) {
        return Math.floor(Math.random() * (ranges[1] - ranges[0] + 1)) + ranges[0];
    },
    getRandomFloat (min, max) {
        return Math.random() * (max - min) + min;
    },
    clone (input) {
        return JSON.parse(JSON.stringify(input));
    },
    getDistanceBetween (x1, y1, x2, y2) {
        return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2);
    },
    getRandomSpawn (x, y, width, height) {
        return {
            x: this.getRandomInt(x, width),
            y: this.getRandomInt(y, height)
        };
    },
    randomPercentage (input) {
        let rand = this.getRandomInt(0, 100);
        return (rand <= input);
    },
    isRectangleContains: function (rx, ry, rw, rh, x, y) {
        return (x >= rx && x < (rx + rw) && y >= ry && y < (ry + rh));
    },
    /**
     *
     * @param {*} needle
     * @param {array} arrhaystack
     * @return {boolean}
     */
    arrayContains (needle, arrhaystack) {
        return (arrhaystack.indexOf(needle) > -1);
    },
    isObjectEmpty (object) {
        return (Object.keys(object).length === 0);
    },
    getRandomFromArray (array) {
        return array[Math.floor(Math.random() * array.length)];
    },
    isOnView: function (x, y, offsetX, offsetY) {
        let game = window.game;
        if (typeof offsetX === 'undefined') {
            let offsetX = 80;
        }
        if (typeof offsetY === 'undefined') {
            let offsetY = 80;
        }

        if (x >= game.camera.x - offsetX && x <= game.camera.x - offsetX + game.camera.width + offsetX &&
                y >= game.camera.y - offsetY && y <= game.camera.y - offsetY + game.camera.height + offsetY) {
            return true;
        }
        return false;
    },
    findNearest (target, array) {
        let nearestDistance = 999999;
        let nearestObject = null;
        array.forEach((element) => {
            let distance = this.getDistanceBetween(target.x, target.y, element.getPositionCenter().x, element.getPositionCenter().y);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestObject = element;
            }
        });
        return nearestObject;
    }

};

if (!(typeof exports === 'undefined')) {
    module.exports = Utils;
}
