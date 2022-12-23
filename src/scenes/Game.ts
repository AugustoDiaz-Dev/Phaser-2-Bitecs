import Phaser from 'phaser'

import{
    createWorld, 
    addEntity, 
    addComponent, 
    System, 
    IWorld
} from 'bitecs'

import { Position } from '../components/Position'
import { Velocity } from '../components/Velocity'
import { Sprite } from '../components/Sprite'
import { Player } from '../components/Player'
import { Rotation } from '../components/Rotation'
import { CPU } from '../components/CPU'

import { createSpriteSystem } from '../systems/SpriteSystem'
import { createMovementSystem } from '../systems/MovementSystem'
import { createPlayerSystem } from '../systems/PlayerSystem'
import createCPUSystem from '../systems/CPUSystem'

export default class Game extends Phaser.Scene {

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private world?: IWorld
    private spriteSystem?: System
    private movementSystem?: System
    private playerSystem?: System
    private cpuSystem?: System

    constructor() {
        super('game');
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    preload()
    {
        this.load.image('tank-blue', 'assets/tank_blue.png')
		this.load.image('tank-green', './assets/tank_green.png')
		this.load.image('tank-red', '../public/assets/tank_red.png')
    }

    create() {
        this.world = createWorld();
        const tank = addEntity(this.world);

        addComponent(this.world, Position, tank);

        Position.x[tank] = 100
        Position.y[tank] = 100

        addComponent(this.world, Rotation, tank);

        addComponent(this.world, Velocity, tank);

        Velocity.x[tank] = 5
        Velocity.y[tank] = 5

        addComponent(this.world, Sprite, tank);

        Sprite.texture[tank] = 0;

        addComponent(this.world, Player, tank)

        const { width, height } = this.scale

        for(let i = 0; i < 20; i++) {
            const tank = addEntity(this.world)

            addComponent(this.world, Position, tank)

            Position.x[tank] = Phaser.Math.Between(width * 0.25, width * 0.75)
            Position.y[tank] = Phaser.Math.Between(height * 0.25, height * 0.75)

            addComponent(this.world, Rotation, tank)

            addComponent(this.world, Velocity, tank)

            addComponent(this.world, Sprite, tank)
            Sprite.texture[tank] = Phaser.Math.Between(1,2)

            addComponent(this.world, CPU, tank)
            CPU.timeBetweenAction[tank] = Phaser.Math.Between(0, 500)

        }

        this.spriteSystem = createSpriteSystem(this, ['tank-blue', 'tank-green', 'tank-red']);
        this.movementSystem = createMovementSystem()
        this.playerSystem = createPlayerSystem(this.cursors)
        this.cpuSystem = createCPUSystem(this)
    }

    update(t: number, dt: number) {
        if(!this.world) {
            return
        }

        this.playerSystem?.(this.world)
        this.cpuSystem?.(this.world)
        this.movementSystem?.(this.world)
        this.spriteSystem?.(this.world)
    }

}