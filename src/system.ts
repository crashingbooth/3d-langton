import { defaultConfig, getState, makeEmptySpace, setState, Space, SpaceConfig, Coordinate } from "./space";
import { AbsoluteDirection, Ant, DirectionalChange, moveAnt, turnAnt } from "./ant";
import { normalize } from "./utilities";
import { sp1, sp2, sp3 ,sp4} from "./sound";
import { ColorScheme, scheme4 } from "./color";

export type Rule = DirectionalChange[]

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




