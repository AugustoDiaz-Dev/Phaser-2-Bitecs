import{
    defineSystem, 
    defineQuery, 
    enterQuery, 
    exitQuery,
} from 'bitecs'

import { Position } from '../components/Position'
import { Sprite } from '../components/Sprite'
import { Rotation } from '../components/Rotation'

export const createSpriteSystem = (scene: Phaser.Scene, textures: string[]) => {
    
    const spritesById = new Map<number, Phaser.GameObjects.Sprite>()
    const spriteQuery = defineQuery([Sprite, Position, Rotation]);
    const spriteQueryEnter = enterQuery(spriteQuery); 
    const spriteQueryExit = exitQuery(spriteQuery);

     return defineSystem((world) => {
        const enterEntities = spriteQueryEnter(world);
        for (let i = 0; i < enterEntities.length; i++) {
            const id = enterEntities[i];
            const texId = Sprite.texture[id];
            const texture = textures[texId];
            spritesById.set(id, scene.add.sprite(0, 0, texture))
        }
        
        const entities = spriteQuery(world);
        for (let i = 0; i < entities.length; i++) {
            const id = entities[i];
            const sprite = spritesById.get(id);
            if (!sprite) {
                continue
            }
            sprite.x = Position.x[id];
            sprite.y = Position.y[id];
            sprite.angle = Rotation.angle[id];
        }

        const exitEntities = spriteQueryExit(world);
        for (let i = 0; i < exitEntities.length; i++) {
            const id = exitEntities[i]; 
            const sprite = spritesById.get(id);

            if (!sprite) {
                continue
            }
            sprite.destroy();
            spritesById.delete(id);
        }

        return world;
    });
}