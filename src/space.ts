import * as p5 from 'p5';
import { blueOrangeBrown } from './color';

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
    numX: 25,
    numY: 25,
    numZ: 25,
    unit: 15
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
const colours = blueOrangeBrown
export const drawSpace = (p5: p5, space: Space, config: SpaceConfig) => {
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
                p5.stroke(50)

                if (state !== 0) {
                    p5.fill(colours[state])
                    p5.box(config.unit * 0.7)
                    //  p5.sphere(config.unit/2, 30, 30)
                }
               
               
                p5.pop()
            })
            p5.pop()
        })
    })
    p5.pop()
}

export const sampleSpace = () => {
    let s = makeEmptySpace(defaultConfig)
    return setState(s, coord(1, 1, 1), 1)
    // return s
}

