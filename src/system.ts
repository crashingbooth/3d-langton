import { defaultConfig, getState, makeEmptySpace, setState, Space, SpaceConfig } from "./space";
import { AbsoluteDirection, Ant, DirectionalChange, moveAnt, turnAnt } from "./ant";
import { normalize } from "./utilities";

type Rule = DirectionalChange[]

export interface System {
    space: Space,
    spaceConfig: SpaceConfig
    ants: Ant[],
    rule: Rule
}

export const applyRule = (system: System): System => {
    let resultSystem = system
    system.ants.forEach((ant, i) => {
        // move machine in its direction, get new Point
        const newPoint = moveAnt(ant, system.spaceConfig)
  
        // get state for new point
        const newPointState = getState(system.space, newPoint)

        const changeDir = system.rule[(normalize(newPointState, system.rule.length, true))]

        // apply changeDir to ant
        const antNewOrientation = turnAnt(ant.orientation, changeDir)

        // update space 
        const nextState = normalize(newPointState + 1, system.rule.length )
        const resultSpace = setState(system.space, newPoint, nextState)
        system.space = resultSpace

        // update ant
        system.ants[i] = {coord: newPoint, orientation: antNewOrientation}
    })

    return system
}

const makeCentralAnt = (config: SpaceConfig): Ant => {
    return {
        coord: {x: Math.floor(config.numX / 2), y: Math.floor(config.numY / 2), z: Math.floor(config.numZ/ 2)}, 
        orientation: {topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Front}
    }
} 

export const tempDefaultSystem: System = {
    space: makeEmptySpace(defaultConfig),
    spaceConfig: defaultConfig,
    ants: [makeCentralAnt(defaultConfig)],
    rule: [DirectionalChange.TurnLeft, DirectionalChange.PitchUp, DirectionalChange.TurnRight, DirectionalChange.PitchDown]
}