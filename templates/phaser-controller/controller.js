import { Game, Scale, WEBGL } from 'phaser'
import Gamepad from './scenes/Gamepad'

const controller = new Game({
    type: WEBGL,
    antialiasGL: true,
    parent: 'root',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
    },
    width: 1280,
    height: 720
})

controller.scene.add('gamepad', new Gamepad())

controller.scene.start('gamepad')