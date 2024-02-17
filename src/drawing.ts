import { Coordinate, Space, SpaceConfig, getState } from './space';
import { System } from './system';
import { ColorScheme } from './color';

export interface DrawConfig {
    colorScheme: ColorScheme
    framerate: number
    shape: Shape
    strokeWeight: number
    fillRatio: number
    directionalLights: Coordinate[]
    screenSizeMultiplier: number
}

export enum Shape {
    sphere,
    box
}

export const predraw = (p: p5, system: System, frame: number) => {
    p.frameRate(system.drawConfig.framerate)
    mouseRotation(p)
    directionalLight(p, system.drawConfig.directionalLights)
    autorotation(p, frame, 2)
    offsetAxes(p, system.spaceConfig)
}

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
                    system.drawConfig.shape === Shape.box ? p5.box(shapeSize) : p5.sphere(shapeSize)
                }

                p5.pop()
            })
            p5.pop()
        })
    })
    p5.pop()
}

const autorotation = (p: p5, frame: number, factor: number) => {
    p.rotateY(p.radians((frame / 10) / factor))
    p.rotateZ(p.radians((frame / 5) / factor))
    p.rotateX(p.radians((frame / 7) / factor))
}

const mouseRotation = (p: p5) => {
    p.rotateX(p.radians(p.mouseY * -0.4))
    p.rotateZ(p.radians(p.mouseX * -0.4))
}

const keyRotation = (p: p5, rotX: number, rotY: number, rotZ: number) => {
    p.rotateX(p.radians(rotX))
    p.rotateY(p.radians(rotY))
    p.rotateZ(p.radians(rotZ))
}

const offsetAxes = (p: p5, config: SpaceConfig) => {
    p.translate(
        (config.numX * config.unit) / -2,
        (config.numY * config.unit) / -2,
        (config.numX * config.unit) / -2
    )
}

const directionalLight = (p: p5, lights: Coordinate[]) => {
    for (let light of lights) {
        p.directionalLight(255,255,255,light.x, light.y, light.z)
    }
}