import { Scene } from 'phaser'

class Gamepad extends Scene {

    airconsole = null

    init() {
        this.airconsole = new window.AirConsole()
    }

    create() {
        // your gamepad code
        this.add.text(640, 360, 'gamepad', { fontSize: 82 })
            .setOrigin(.5)
    }

}

export default Gamepad