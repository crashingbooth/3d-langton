import { Space, SpaceConfig, getState } from './space';
import { System } from './system';
import { ColorScheme } from './color';

export interface DrawConfig {
    colorScheme: ColorScheme
    framerate: number
    shape: Shape
    strokeWeight: number
    fillRatio: number
}

export enum Shape {
    sphere,
    box
}


// export const predraw = (p5: p5, system: System) {

// }

export const drawSpace = (p5: p5, system: System, frame: number) => {
    let space = system.space
    let config = system.spaceConfig
    let colours = system.drawConfig.colorScheme
    p5.background(colours[0])
    if (frame < 0) { return } 
    space.forEach((layer, layerNum) => {
        p5.push()
        p5.translate(0, 0, config.unit)
        layer.forEach((row, rowNum) => {
            p5.push()
            p5.translate(0, config.unit * rowNum, 0)
            row.forEach((col, colNum) => {
                p5.push()
                p5.translate(config.unit * colNum, 0, 0)
                const state = getState(space, { x: colNum, y: rowNum, z: layerNum })

                // set up stroke
                if (system.drawConfig.strokeWeight === 0) {
                    p5.noStroke()
                } else {
                    p5.strokeWeight(system.drawConfig.strokeWeight)
                    p5.stroke(colours[0])
                }

                // make shape
                if (state !== 0) {
                    p5.fill(colours[state % colours.length])
                    const shapeSize = config.unit * system.drawConfig.fillRatio
                    system.drawConfig.shape === Shape.box ?  p5.box(shapeSize) : p5.sphere(shapeSize)
                }

                p5.pop()
            })
            p5.pop()
        })
    })
    p5.pop()
}

export const drawFromMetadata = (p5: p5, system: System) => {
    if (!system.turnMetadata) { return }
    const unit = system.spaceConfig.unit
    system.turnMetadata.modifiedCoords.forEach((coord) => {
        const newState = getState(system.space, coord)
        p5.push()
        p5.translate(unit * coord.x, unit * coord.y, unit * coord.z)
        p5.fill(system.drawConfig.colorScheme[newState])
        p5.box(unit * 0.7)
        p5.pop()
    })
}