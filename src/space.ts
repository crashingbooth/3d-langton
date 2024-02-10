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

