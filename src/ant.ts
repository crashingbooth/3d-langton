
import { SoundPlayer } from "./sound"
import { Coordinate, logCoord, SpaceConfig } from "./space"
import { normalize } from "./utilities"

export interface Orientation {
    facingDir: AbsoluteDirection,
    topDir: AbsoluteDirection
}

export interface Ant {
    coord: Coordinate,
    orientation: Orientation
    statePlayer: SoundPlayer
    facingDirPlayer: SoundPlayer
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
    PitchDown, 
    None, 
    Reverse
}

const isLateralChange = (change: DirectionalChange): Boolean => {
    return [DirectionalChange.TurnLeft, DirectionalChange.TurnRight].includes(change)
}

export const moveAnt = (ant: Ant, config: SpaceConfig): Coordinate => {
    let newCoord: Coordinate
    if (ant.orientation.facingDir == AbsoluteDirection.Left) {
        newCoord = { ...ant.coord, x: normalize(ant.coord.x - 1, config.numX) }
    } else if (ant.orientation.facingDir == AbsoluteDirection.Right) {
        newCoord = { ...ant.coord, x: normalize(ant.coord.x + 1, config.numX) }
    } else if (ant.orientation.facingDir == AbsoluteDirection.Up) {
        newCoord = { ...ant.coord, y: normalize(ant.coord.y - 1, config.numY) }
    } else if (ant.orientation.facingDir == AbsoluteDirection.Down) {
        newCoord = { ...ant.coord, y: normalize(ant.coord.y + 1, config.numY) }
    } else if (ant.orientation.facingDir == AbsoluteDirection.Back) {
        newCoord = {  ...ant.coord, z: normalize(ant.coord.z + 1, config.numZ)}
    } else if (ant.orientation.facingDir == AbsoluteDirection.Front) {
        newCoord = {...ant.coord, z: normalize(ant.coord.z - 1, config.numZ), }
    }
    return newCoord
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
        
    } else if ([AbsoluteDirection.Back, AbsoluteDirection.Front].includes(orientation.topDir)) {
        seq = xyCycle
    } else {
        seq = yzCycle
    }

    const startIndex = seq.indexOf(orientation.facingDir)
    const basicDirectionalChange = changeDir == DirectionalChange.TurnLeft ? -1 : 1
    const modifiedDirectionalChange = [AbsoluteDirection.Up, AbsoluteDirection.Right, AbsoluteDirection.Back].includes(orientation.topDir) ? 1 : -1
    const rawDestinationIndex = startIndex + (basicDirectionalChange * modifiedDirectionalChange)
    //  console.log(`raw after tuen index: ${rawDestinationIndex}`);
    const normalizedDestinationIndex = normalize(rawDestinationIndex, 4)
    //    console.log(`normal after tuen index: ${normalizedDestinationIndex}`);
    const newFacingDir = seq[normalizedDestinationIndex]
    //  console.log(`newdis: ${newFacingDir}`);
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
        } else if (changeDir == DirectionalChange.None) {
            return startingOrientation
        } else if (changeDir == DirectionalChange.Reverse) {
            return { topDir: startingOrientation.topDir, facingDir: oppositeDir(startingOrientation.facingDir) }
        } 
    }
}

