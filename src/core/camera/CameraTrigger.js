import 'phaser';

export default class extends Phaser.Sprite {
    /**
     * @param {object} properties
     */
    constructor (properties) {
        // kabina
        let bmd = window.game.add.bitmapData(properties.width, properties.height);
        bmd.fill(255, 170, 0, 0);

        super(window.game, properties.x, properties.y, bmd);

        this.game.add.existing(this);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.setSize(properties.width, properties.height, 0, 0);

        /**
         * @type {object}
         */
        this.properties = properties;

        if (this.properties.name !== 'focusStation' && this.properties.name !== 'focusTrain' && this.properties.name !== 'depo' && this.properties.name !== 'focusStationUp') {
            console.log('unexpected camera trigger named ' + properties.name);
        }
    }

    isFocusTrain () {
        return this.properties.name === 'focusTrain';
    }

    isFocusStation () {
        return this.properties.name === 'focusStation';
    }

    isFocusStationUp () {
        return this.properties.name === 'focusStationUp';
    }

    isDepo () {
        return this.properties.name === 'depo';
    }
}
