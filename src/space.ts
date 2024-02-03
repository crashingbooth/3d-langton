import * as p5 from 'p5';

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

export type State = number
export type Space = State[][][]

export interface SpaceConfig {
    numX: number,
    numY: number,
    numZ: number,
    unit: number
}

export const defaultConfig: SpaceConfig = {
    numX: 3,
    numY: 3,
    numZ: 3,
    unit: 50
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

const getState = (space: Space, coord: Coordinate): State => {
    return space[coord.z][coord.y][coord.x]
}

const setState = (space: Space, coord: Coordinate, state: State): Space => {
    space[coord.z][coord.y][coord.x] = state
    return space
}

export const drawSpace = (p5: p5, space: Space, config: SpaceConfig) => {
    space.forEach((layer, layerNum) => {
        p5.translate(0, 0, config.unit)
        layer.forEach((row, rowNum) => {
            p5.push()
            p5.translate(0, config.unit * rowNum, 0)
            row.forEach((col, colNum) => {
                p5.push()
                p5.translate(config.unit * colNum, 0, 0)
                const state = getState(space, { x: colNum, y: rowNum, z: layerNum })
                p5.stroke(0, 0, 0, 30)
                p5.fill(state ? p5.color(0, 0, 250, 200) : p5.color(255, 255, 255, 10))
                p5.box(config.unit, config.unit, config.unit)
                p5.pop()
            })
            p5.pop()
        })
    })
}

export const sampleSpace = () => {
    let s = makeEmptySpace(defaultConfig)
    return setState(s, coord(1, 1, 1), 1)
    // return s
}

