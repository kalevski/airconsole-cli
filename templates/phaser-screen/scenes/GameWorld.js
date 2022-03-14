import { Scene } from 'phaser'

class GameWorld extends Scene {

    airconsole = null

    init() {
        this.airconsole = new window.AirConsole()
    }

    create() {
        // your game code
        this.add.text(640, 360, 'game screen', { fontSize: 42 })
            .setOrigin(.5)
    }

}

export default GameWorld