import Phaser from 'phaser';
import Balance from './../core/Balance';
import Upgrades from './../core/Upgrades';

export default class extends Phaser.State {
    init () {}

    preload () {
        this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
        this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');

        this.load.setPreloadSprite(this.loaderBar);
        //
        // load your assets
        //
        this.game.load.image('metro_part', 'assets/images/metro_part.png');

        this.game.load.tilemap('map', 'assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.spritesheet('doorAnimation', 'assets/images/doorAnimation.png', 15, 32);
        this.game.load.spritesheet('tileset', 'assets/images/tileset.png', 32, 32);
        this.game.load.spritesheet('passangers', 'assets/images/passangers.png', 24, 24);
        this.game.load.image('dirt', 'assets/images/dirt.png');

        // UI
        this.game.load.spritesheet('buyButton', 'assets/images/ui/buyButton.png', 128, 50);
        this.game.load.spritesheet('icons', 'assets/images/ui/icons.png', 32, 32);
        this.game.load.spritesheet('workButton', 'assets/images/ui/workButton.png', 128, 50);
        this.game.load.image('bar', 'assets/images/ui/bar.png');
        this.game.load.image('stationNameBar', 'assets/images/ui/stationNameBar.png');
        this.game.load.image('penality', 'assets/images/ui/penality.png');
        this.game.load.spritesheet('wide_buttons', 'assets/images/ui/wide_buttons.png', 152, 60);

        this.game.load.image('help_space', 'assets/images/ui/help_space.png');
        this.game.load.image('help_arrows', 'assets/images/ui/help_arrows.png');
        this.game.load.image('help_space', 'assets/images/ui/help_space.png');
        this.game.load.image('h_key', 'assets/images/ui/h_key.png');
        this.game.load.image('gameBg', 'assets/images/ui/gameBg.png');

        window.balance = new Balance(0);
        window.upgrades = new Upgrades();
    }

    create () {
        this.state.start('Game');
    }
}
