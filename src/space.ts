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

export interface Orientation {
    facingDir: AbsoluteDirection,
    topDir: AbsoluteDirection
}

export interface Ant {
    coord: Coordinate,
    orientation: Orientation
}

export enum AbsoluteDirection {
    Back,
    Front,
    Up,
    Down,
    Left,
    Right
}

const oppositeDir = (dir: AbsoluteDirection): AbsoluteDirection => {
    switch (dir) {
        case AbsoluteDirection.Back:
            return AbsoluteDirection.Front
        case AbsoluteDirection.Front:
            return AbsoluteDirection.Back

        case AbsoluteDirection.Left:
            return AbsoluteDirection.Right
        case AbsoluteDirection.Right:
            return AbsoluteDirection.Left

        case AbsoluteDirection.Up:
            return AbsoluteDirection.Down
        case AbsoluteDirection.Down:
            return AbsoluteDirection.Up
    }
}

export enum DirectionalChange {
    TurnLeft,
    TurnRight,
    PitchUp,
    PitchDown
}

const isLateralChange = (change: DirectionalChange): Boolean => {
    return [DirectionalChange.TurnLeft, DirectionalChange.TurnRight].includes(change)
}

const normalize = (val: number, max: number) => {
    if (val <= max) {
        return val - max
    } else if (val < 0) {
        return val + max
    } else {
        return val
    }
}

const moveAnt = (ant: Ant, config: SpaceConfig): Coordinate => {
    if (ant.orientation.facingDir == AbsoluteDirection.Left) {
        return { x: normalize(ant.coord.x - 1, config.numX), ...ant.coord }
    } else if (ant.orientation.facingDir == AbsoluteDirection.Right) {
        return { x: normalize(ant.coord.x + 1, config.numX), ...ant.coord }
    } else if (ant.orientation.facingDir == AbsoluteDirection.Up) {
        return { x: normalize(ant.coord.y - 1, config.numY), ...ant.coord }
    } else if (ant.orientation.facingDir == AbsoluteDirection.Down) {
        return { x: normalize(ant.coord.y + 1, config.numY), ...ant.coord }
    } else if (ant.orientation.facingDir == AbsoluteDirection.Back) {
        return { x: normalize(ant.coord.x + 1, config.numZ), ...ant.coord }
    } else if (ant.orientation.facingDir == AbsoluteDirection.Front) {
        return { x: normalize(ant.coord.x - 1, config.numZ), ...ant.coord }
    }
}


type RotationalCycle = [AbsoluteDirection, AbsoluteDirection, AbsoluteDirection, AbsoluteDirection]
const xzCycle: RotationalCycle = [AbsoluteDirection.Front, AbsoluteDirection.Right, AbsoluteDirection.Back, AbsoluteDirection.Left] // dreydl
const xyCycle: RotationalCycle = [AbsoluteDirection.Up, AbsoluteDirection.Right, AbsoluteDirection.Down, AbsoluteDirection.Left] // clock
const yzCycle: RotationalCycle = [AbsoluteDirection.Front, AbsoluteDirection.Up, AbsoluteDirection.Back, AbsoluteDirection.Down] // bicycle

const lateralRotation = (orientation: Orientation, changeDir: DirectionalChange): Orientation => {
    if (!isLateralChange(changeDir)) { 
        console.log(`PROBLEM! with lateral rotation`);
        return orientation
    }

    let seq: RotationalCycle
    if ([AbsoluteDirection.Up, AbsoluteDirection.Down].includes(orientation.topDir)) {
        seq = xzCycle
    } else if ([AbsoluteDirection.Back, AbsoluteDirection.Front].includes(orientation.topDir)) {
        seq = xyCycle
    } else {
        seq = yzCycle
    }

    const startIndex = seq.indexOf(orientation.facingDir)
    const rawDestinationIndex = startIndex + (changeDir == DirectionalChange.TurnLeft ? -1 : 1)
    const normalizedDestinationIndex = normalize(rawDestinationIndex, 4)
    const newFacingDir = seq[normalizedDestinationIndex]
    return {topDir: orientation.topDir, facingDir: newFacingDir}
}

const turnAnt = (startingOrientation: Orientation, changeDir: DirectionalChange): Orientation => {
    if (isLateralChange(changeDir)) {
        // top orientation doesn't change, and we rotate on one of three axes
        return lateralRotation(startingOrientation, changeDir)
    } else {
        if (changeDir == DirectionalChange.PitchUp) {
            // top -> facing, opposite(facing) -> top
            return { topDir: (oppositeDir(startingOrientation.facingDir)), facingDir: startingOrientation.topDir }
        } else if (changeDir == DirectionalChange.PitchDown) {
            // facing -> top, opposite(top) -> facing
            return { topDir: startingOrientation.facingDir, facingDir: oppositeDir(startingOrientation.topDir) }
        }
    }
}



