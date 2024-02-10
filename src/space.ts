import * as p5 from 'p5';
import { scheme4 } from './color';
import { System } from './system';

export interface Coordinate {
    x: number,
    y: number,
    z: number
}

export const coord = (x: number, y: number, z: number): Coordinate => {
    return {
        x: x,
        y: y,
        z: z
    }
}

export const logCoord = (coord: Coordinate): String => {
    return `x: ${coord.x}, y: ${coord.y}, z: ${coord.z}`
}

export type State = number
export type Space = State[][][]

export interface SpaceConfig {
    numX: number,
    numY: number,
    numZ: number,
    unit: number
}

export const defaultConfig: SpaceConfig = {
    numX: 20,
    numY: 20,
    numZ: 20,
    unit: 33
}

const makeEmptyRow = (cols: number): number[] => {
    return Array.from({ length: cols }, () => 0)
}

const makeEmptyGrid = (rows: number, cols: number): number[][] => {
    return Array.from({ length: rows }, () => makeEmptyRow(cols))
}

export const makeEmptySpace = (config: SpaceConfig): Space => {
    return Array.from({ length: config.numZ }, () => makeEmptyGrid(config.numY, config.numX))
}

export const getState = (space: Space, coord: Coordinate): State => {
    return space[coord.z][coord.y][coord.x]
}

export const setState = (space: Space, coord: Coordinate, state: State): Space => {
    space[coord.z][coord.y][coord.x] = state
    return space
}

const colours = scheme4
export const drawSpace = (p5: p5, space: Space, config: SpaceConfig, frame: number) => {
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
                p5.stroke(colours[0] )
                p5.strokeWeight(4)
                // p5.noStroke()

                if (state !== 0) {
                    p5.fill(colours[state % colours.length])
                    p5.box(config.unit * 1 )
                    //  p5.sphere(config.unit/2)
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
        p5.fill(colours[newState])
        p5.box(unit * 0.7)
        p5.pop()
    })
}

export const sampleSpace = () => {
    let s = makeEmptySpace(defaultConfig)
    return setState(s, coord(1, 1, 1), 1)
    // return s
}

export const autorotation = (p: p5, frame: number, factor: number) => {
    p.rotateY(p.radians((frame / 10) / factor))
    p.rotateZ(p.radians((frame / 5) / factor))
    p.rotateX(p.radians((frame / 7) / factor))
}

export const mouseRotation = (p: p5) => {
    p.rotateX(p.radians(p.mouseY * 0.3 ))
    p.rotateZ(p.radians(p.mouseX * 0.3))
}

export const keyRotation = (p:p5, rotX: number, rotY: number, rotZ: number) => {
    p.rotateX(p.radians(rotX))
    p.rotateY(p.radians(rotY))
    p.rotateZ(p.radians(rotZ))
}

export const offsetAxes = (p: p5, config: SpaceConfig) => {
    p.translate(
        (config.numX * config.unit) / -2,
       0,// (config.numY * config.unit) / -2,
        (config.numX * config.unit) / -2
    )
}

