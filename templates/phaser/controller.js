import { Game, Scale, WEBGL } from 'phaser'

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

