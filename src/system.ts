import { defaultConfig, getState, makeEmptySpace, setState, Space, SpaceConfig, Coordinate } from "./space";
import { AbsoluteDirection, Ant, DirectionalChange, moveAnt, turnAnt } from "./ant";
import { normalize } from "./utilities";
import { sp1, sp2, sp3 ,sp4} from "./sound";
import { ColorScheme, scheme4 } from "./color";

type Rule = DirectionalChange[]

export interface System {
    space: Space,
    spaceConfig: SpaceConfig
    ants: Ant[],
    rule: Rule,
    turnMetadata?: TurnMetadata, 
    colorScheme: ColorScheme
}

export interface TurnMetadata {
    modifiedCoords?: Coordinate[]
}

export const applyRule = (system: System): System => {
    let resultSystem = system
    resultSystem.turnMetadata = {modifiedCoords: []}
    system.ants.forEach((ant, i) => {
        // move machine in its direction, get new Point (normalized)
        const newPoint = moveAnt(ant, system.spaceConfig)
  
        // get state for new point
        const newPointState = getState(system.space, newPoint)

        const changeDir = system.rule[(normalize(newPointState, system.rule.length, true))]

        // apply changeDir to ant
        const antNewOrientation = turnAnt(ant.orientation, changeDir)

        // update space 
        const nextState = normalize(newPointState + 1, system.rule.length )
        const resultSpace = setState(system.space, newPoint, nextState)
        resultSystem.space = resultSpace

        // update ant
        resultSystem.ants[i] = {...ant, coord: newPoint, orientation: antNewOrientation}
        resultSystem.turnMetadata.modifiedCoords.push(newPoint)
    })

    return resultSystem
}

const makeCentralAnt = (config: SpaceConfig): Ant => {
    const ant =  {
        coord: {x: Math.floor(config.numX / 2), y: Math.floor(config.numY / 2), z: Math.floor(config.numZ/ 2)}, 
        orientation: {topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Front},
        statePlayer: sp3(1),
        facingDirPlayer: sp4(2)
    }
    
    return ant
} 

const makePairlAnt = (config: SpaceConfig): Ant[] => {
    const yOffset = -2//0
    const xOffset = -8//10
    const zOffset = -11//4
    const ant1: Ant =  {
        coord: {x: Math.floor(2 * config.numX / 4) + xOffset , y: Math.floor(2* config.numY / 4) -1 +  yOffset, z: Math.floor(2* config.numZ/ 4) +  zOffset},  
        orientation: {topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Front},
        statePlayer: sp3(1),
        facingDirPlayer: sp4(2)
    }

    const ant2: Ant = {
        coord: {x: Math.floor(2 * config.numX / 4) + xOffset, y: Math.floor(2* config.numY / 4) +  yOffset, z: Math.floor(3 * config.numZ/ 4) +  zOffset}, 
        orientation: {topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Right},
        statePlayer: sp3(3),
        facingDirPlayer: sp2(4)
    }
    
    return [ant1, ant2]
} 

// angled highway
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants: [makeCentralAnt(defaultConfig)],
//     rule: [DirectionalChange.TurnLeft, DirectionalChange.PitchUp, DirectionalChange.TurnRight, DirectionalChange.PitchDown]
// }

// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants: makePairlAnt(defaultConfig),
//     rule: [DirectionalChange.TurnLeft, DirectionalChange.PitchUp, DirectionalChange.TurnRight, DirectionalChange.PitchDown, DirectionalChange.TurnLeft, DirectionalChange.PitchUp, DirectionalChange.TurnRight, DirectionalChange.PitchDown]
// }


// starts with highway, but goes chaotic on conflict
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants: [makeCentralAnt(defaultConfig)],
//     rule: [ DirectionalChange.PitchDown,DirectionalChange.PitchUp,DirectionalChange.TurnRight, DirectionalChange.PitchDown,DirectionalChange.PitchUp ]
// }

// nice! makes simple highways perpendicular, eventually falls into boring pattern
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants: [makeCentralAnt(defaultConfig)],
//     rule: [ DirectionalChange.PitchDown, DirectionalChange.TurnRight, DirectionalChange.PitchDown, DirectionalChange.TurnLeft,  ]
// }

// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants: makePairlAnt(defaultConfig),
//     rule: [ DirectionalChange.PitchDown, DirectionalChange.TurnRight, DirectionalChange.PitchDown, DirectionalChange.TurnLeft ]
// }

// good, keeps making perpendicular towers, keeps reforming highway
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants: [makeCentralAnt(defaultConfig)],
//     rule: [ DirectionalChange.PitchDown, DirectionalChange.TurnRight, DirectionalChange.PitchDown, DirectionalChange.TurnLeft  ]
// }

// more perp towers
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants: [makeCentralAnt(defaultConfig)],
//     rule: [ DirectionalChange.PitchDown, DirectionalChange.TurnLeft, DirectionalChange.Reverse, DirectionalChange.None   ]
// }

// chaotic but potentially interesting, loops around itself
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants: [makeCentralAnt(defaultConfig)],
//     rule: [ DirectionalChange.PitchDown,  DirectionalChange.None, DirectionalChange.None, DirectionalChange.None,DirectionalChange.None , DirectionalChange.TurnLeft,  DirectionalChange.None, DirectionalChange.None, DirectionalChange.None, DirectionalChange.None   ]
// }

// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants: [makeCentralAnt(defaultConfig)],
//     rule: [ DirectionalChange.PitchDown,  DirectionalChange.TurnLeft, DirectionalChange.TurnRight, DirectionalChange.PitchUp  ]
// }


// AFTER FIX

// patterny but no obvious HW
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants: makePairlAnt(defaultConfig),
//     rule: [ DirectionalChange.PitchDown, DirectionalChange.PitchDown, DirectionalChange.PitchUp, DirectionalChange.PitchDown,DirectionalChange.TurnRight, DirectionalChange.TurnLeft,DirectionalChange.TurnRight   ]
// }


// finally! longish twisting hW
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants: makePairlAnt(defaultConfig),
//     rule: [ DirectionalChange.PitchDown, DirectionalChange.PitchUp, DirectionalChange.TurnLeft, DirectionalChange.TurnLeft, DirectionalChange.PitchDown, DirectionalChange.PitchUp, DirectionalChange.TurnLeft, DirectionalChange.TurnLeft  ]
// }


// THIS:
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants: makePairlAnt(defaultConfig),
//     rule: [ DirectionalChange.PitchUp, DirectionalChange.PitchDown, DirectionalChange.TurnLeft, DirectionalChange.TurnLeft, DirectionalChange.None, DirectionalChange.PitchUp, DirectionalChange.PitchDown, DirectionalChange.TurnLeft, DirectionalChange.TurnLeft, DirectionalChange.None ]
// }

// forms highway, but becomes 2d
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants:[ makeCentralAnt(defaultConfig)],//makePairlAnt(defaultConfig),
//     rule: [ DirectionalChange.PitchUp, DirectionalChange.PitchDown, DirectionalChange.TurnLeft,DirectionalChange.PitchDown ]
// }

// good candidate
// forms highway, becomes perpendicular at meeting, then perpendicular again
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants:[ makeCentralAnt(defaultConfig)],//makePairlAnt(defaultConfig),
//     rule: [ DirectionalChange.PitchUp, DirectionalChange.PitchUp, DirectionalChange.PitchDown,DirectionalChange.TurnLeft ]
// }


// good candidate
// makes complex twisting hW, might need a larger area, has a width of 8, maybe 2 perpendicular?
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants:[ makeCentralAnt(defaultConfig)],//makePairlAnt(defaultConfig),
//     rule: [ DirectionalChange.PitchDown, DirectionalChange.PitchUp, DirectionalChange.PitchDown,DirectionalChange.TurnRight ]
// }


// v similar to DUDR
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants:[ makeCentralAnt(defaultConfig)],//makePairlAnt(defaultConfig),
//     rule: [ DirectionalChange.PitchUp, DirectionalChange.PitchDown, DirectionalChange.PitchUp,DirectionalChange.TurnRight, DirectionalChange.PitchUp ]
// }

// more of the same
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants:[ makeCentralAnt(defaultConfig)],//makePairlAnt(defaultConfig),
//     rule: [ DirectionalChange.PitchUp, DirectionalChange.PitchDown, DirectionalChange.PitchUp,DirectionalChange.TurnRight, DirectionalChange.PitchDown, DirectionalChange.TurnLeft ]
// }


// good candiadate
// instant diagonal hW, then perpendicular diagonl at collision
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants:[ makeCentralAnt(defaultConfig)],//makePairlAnt(defaultConfig),
//     rule: [ DirectionalChange.PitchUp, DirectionalChange.TurnLeft, DirectionalChange.TurnLeft, DirectionalChange.PitchDown]
// }

// GOOD!!, forms simple HW, patterns over itself, makes a nice X, maybe good with  a collsion
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants: makePairlAnt(defaultConfig),
//     rule: [ DirectionalChange.Reverse, DirectionalChange.PitchDown, DirectionalChange.TurnLeft, DirectionalChange.Reverse, DirectionalChange.PitchDown, DirectionalChange.TurnLeft ]
// }

// neat HW, but doesn't repattern
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants: makePairlAnt(defaultConfig),
//     rule: [ DirectionalChange.Reverse, DirectionalChange.PitchDown, DirectionalChange.TurnLeft, DirectionalChange.None, DirectionalChange.PitchDown, DirectionalChange.TurnLeft ]
// }


//similar to RDLRDL - resilient
export const tempDefaultSystem: System = {
    space: makeEmptySpace(defaultConfig),
    spaceConfig: defaultConfig,
    ants: makePairlAnt(defaultConfig),
    rule: [ DirectionalChange.Reverse, DirectionalChange.PitchDown, DirectionalChange.TurnLeft, DirectionalChange.Reverse, DirectionalChange.PitchDown, DirectionalChange.TurnRight],
    colorScheme: scheme4
}



