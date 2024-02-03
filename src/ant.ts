
import { Coordinate, SpaceConfig } from "./space"

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


// TODO: rewrite in terms of rotationalCycle
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
    if (val >= max) {
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
const xzCycle: RotationalCycle = [AbsoluteDirection.Front, AbsoluteDirection.Right, AbsoluteDirection.Back, AbsoluteDirection.Left] // dredyl
const xyCycle: RotationalCycle = [AbsoluteDirection.Up, AbsoluteDirection.Right, AbsoluteDirection.Down, AbsoluteDirection.Left] // clock
const yzCycle: RotationalCycle = [AbsoluteDirection.Front, AbsoluteDirection.Down, AbsoluteDirection.Back,AbsoluteDirection.Up ] // bicycle

const lateralRotation = (orientation: Orientation, changeDir: DirectionalChange): Orientation => {
    if (!isLateralChange(changeDir)) { 
        console.log(`PROBLEM! with lateral rotation`);
        return orientation
    }

    let seq: RotationalCycle
    if ([AbsoluteDirection.Up, AbsoluteDirection.Down].includes(orientation.topDir)) {
        seq = xzCycle
        console.log(`seq xz`);
        
    } else if ([AbsoluteDirection.Back, AbsoluteDirection.Front].includes(orientation.topDir)) {
        seq = xyCycle
              console.log(`seq yz`);
    } else {
        seq = yzCycle
              console.log(`seq yz`);
    }

    const startIndex = seq.indexOf(orientation.facingDir)
    const rawDestinationIndex = startIndex + (changeDir == DirectionalChange.TurnLeft ? -1 : 1)
     console.log(`raw after tuen index: ${rawDestinationIndex}`);
    const normalizedDestinationIndex = normalize(rawDestinationIndex, 4)
       console.log(`normal after tuen index: ${normalizedDestinationIndex}`);
    const newFacingDir = seq[normalizedDestinationIndex]
     console.log(`newdis: ${newFacingDir}`);
    return {topDir: orientation.topDir, facingDir: newFacingDir}
}

export const turnAnt = (startingOrientation: Orientation, changeDir: DirectionalChange): Orientation => {
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

