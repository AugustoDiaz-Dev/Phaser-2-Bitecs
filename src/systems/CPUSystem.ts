import Phaser from 'phaser'
import {
    defineSystem, 
    defineQuery
} from 'bitecs'

import { Velocity} from '../components/Velocity'
import { Rotation} from '../components/Rotation'
import { CPU} from '../components/CPU'

export default function createCPUSystem(scene: Phaser.Scene) {
    const cpuQuery = defineQuery([CPU, Velocity, Rotation])
    return defineSystem(world => {
        const dt = scene.game.loop.delta
        const entities = cpuQuery(world)
        for (let i = 0; i < entities.length; i++) {
            const id = entities[i]
            CPU.acumulatedTime[id] += dt

            if (CPU.acumulatedTime[id] > CPU.timeBetweenAction[id]) {
                continue
            }

            CPU.acumulatedTime[id] = 0

            const rand = Phaser.Math.Between(0, 20)

            switch (rand) {
                case 0: 
                    Velocity.x[id] = -5
                    Velocity.y[id] = 0
                    Rotation.angle[id] = 180
                    break
                case 1:
                    Velocity.x[id] = 5
                    Velocity.y[id] = 0
                    Rotation.angle[id] = 0 
                    break
                case 2: 
                    Velocity.x[id] = 0
                    Velocity.y[id] = -5
                    Rotation.angle[id] = 270
                    break
                case 3: 
                    Velocity.x[id] = 0
                    Velocity.y[id] = 5
                    Rotation.angle[id] = 90
                    break
                default: 
                    Velocity.x[id] = 0
                    Velocity.y[id] = 0
                    break
            }
        }

        return world
    })
}