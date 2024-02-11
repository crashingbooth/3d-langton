import { AbsoluteDirection, Ant, DirectionalChange } from './ant'
import { ColorScheme, scheme3, scheme4 } from './color'
import { Shape } from './drawing'
import { AntSoundPlayers, bpmToFrameRate, sp2, sp3, sp4 } from './sound'
import { Coordinate, SpaceConfig, coord, defaultConfig, makeEmptySpace } from './space'
import { System, Rule } from './system'


const antSoundPlayerFactory = (scale: number[], root: number = 48): AntSoundPlayers[] => {

    const dirPlayer = {
        channel: 2,
        mapping: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        ignoreZero: false,
        rearticulateOnRepeat: false,
        rootNote: 48,
        duration: 100
    }

    const statePlayer = {
        channel: 1,
        mapping: scale,
        ignoreZero: true,
        rearticulateOnRepeat: false,
        rootNote: 48,
        duration: 100
    }

    return [
        {
            statePlayer: { ...statePlayer, channel: 1, rootNote: root },
            facingDirPlayer: { ...dirPlayer, channel: 2 }
        },
        {
            statePlayer: { ...statePlayer, channel: 3, rootNote: root + 12 },
            facingDirPlayer: { ...dirPlayer, channel: 4 }
        }
    ]
}

const makePairAnts = (config: SpaceConfig,
    antSoundPlayers: AntSoundPlayers[],
    offsets: Coordinate = coord(0, 0, 0),): Ant[] => {

    const ant1: Ant = {
        coord: { x: Math.floor(2 * config.numX / 4) + offsets.x, y: Math.floor(2 * config.numY / 4) + offsets.y, z: Math.floor(2 * config.numZ / 4) + offsets.z + 2},
        orientation: { topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Front },
        antSoundPlayers: {
            statePlayer: sp3(1),
            facingDirPlayer: sp4(2)
        }
    }

    const ant2: Ant = {
        coord: { x: Math.floor(2 * config.numX / 4) + offsets.x, y: Math.floor(2 * config.numY / 4) + offsets.y, z: Math.floor(3 * config.numZ / 4) + offsets.z },
        orientation: { topDir: AbsoluteDirection.Front, facingDir: AbsoluteDirection.Right },
        antSoundPlayers: {
            statePlayer: sp3(3),
            facingDirPlayer: sp2(4)
        }
    }

    return [ant1, ant2]
}

const makeCentralAnt = (config: SpaceConfig): Ant[] => {
    const ant = {
        coord: { x: Math.floor(config.numX / 2), y: Math.floor(config.numY / 2), z: Math.floor(config.numZ / 2) },
        orientation: { topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Front },
        antSoundPlayers: {
            statePlayer: sp3(1),
            facingDirPlayer: sp4(1)
        }
    }

    return [ant]
}

// AFTER FIX

// patterny but no obvious HW
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants: makePairAnts(defaultConfig),
//     rule: [ DirectionalChange.PitchDown, DirectionalChange.PitchDown, DirectionalChange.PitchUp, DirectionalChange.PitchDown,DirectionalChange.TurnRight, DirectionalChange.TurnLeft,DirectionalChange.TurnRight   ]
// }


// finally! longish twisting hW
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants: makePairAnts(defaultConfig),
//     rule: [ DirectionalChange.PitchDown, DirectionalChange.PitchUp, DirectionalChange.TurnLeft, DirectionalChange.TurnLeft, DirectionalChange.PitchDown, DirectionalChange.PitchUp, DirectionalChange.TurnLeft, DirectionalChange.TurnLeft  ]
// }


// THIS:
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants: makePairAnts(defaultConfig),
//     rule: [ DirectionalChange.PitchUp, DirectionalChange.PitchDown, DirectionalChange.TurnLeft, DirectionalChange.TurnLeft, DirectionalChange.None, DirectionalChange.PitchUp, DirectionalChange.PitchDown, DirectionalChange.TurnLeft, DirectionalChange.TurnLeft, DirectionalChange.None ]
// }

// forms highway, but becomes 2d
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants:[ makeCentralAnt(defaultConfig)],//makePairAnts(defaultConfig),
//     rule: [ DirectionalChange.PitchUp, DirectionalChange.PitchDown, DirectionalChange.TurnLeft,DirectionalChange.PitchDown ]
// }

// good candidate
// forms highway, becomes perpendicular at meeting, then perpendicular again
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants:[ makeCentralAnt(defaultConfig)],//makePairAnts(defaultConfig),
//     rule: [ DirectionalChange.PitchUp, DirectionalChange.PitchUp, DirectionalChange.PitchDown,DirectionalChange.TurnLeft ]
// }


// good candidate
// makes complex twisting hW, might need a larger area, has a width of 8, maybe 2 perpendicular?
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants:[ makeCentralAnt(defaultConfig)],//makePairAnts(defaultConfig),
//     rule: [ DirectionalChange.PitchDown, DirectionalChange.PitchUp, DirectionalChange.PitchDown,DirectionalChange.TurnRight ]
// }


// v similar to DUDR
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants:[ makeCentralAnt(defaultConfig)],//makePairAnts(defaultConfig),
//     rule: [ DirectionalChange.PitchUp, DirectionalChange.PitchDown, DirectionalChange.PitchUp,DirectionalChange.TurnRight, DirectionalChange.PitchUp ]
// }

// more of the same
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants:[ makeCentralAnt(defaultConfig)],//makePairAnts(defaultConfig),
//     rule: [ DirectionalChange.PitchUp, DirectionalChange.PitchDown, DirectionalChange.PitchUp,DirectionalChange.TurnRight, DirectionalChange.PitchDown, DirectionalChange.TurnLeft ]
// }


// good candiadate
// instant diagonal hW, then perpendicular diagonl at collision
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants:[ makeCentralAnt(defaultConfig)],//makePairAnts(defaultConfig),
//     rule: [ DirectionalChange.PitchUp, DirectionalChange.TurnLeft, DirectionalChange.TurnLeft, DirectionalChange.PitchDown]
// }


// neat HW, but doesn't repattern
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants: makePairAnts(defaultConfig),
//     rule: [ DirectionalChange.LateralReverse, DirectionalChange.PitchDown, DirectionalChange.TurnLeft, DirectionalChange.None, DirectionalChange.PitchDown, DirectionalChange.TurnLeft ]
// }


//similar to RDLRDL - resilient
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants: makePairAnts(defaultConfig),
//     rule: [DirectionalChange.LateralReverse, DirectionalChange.PitchDown, DirectionalChange.TurnLeft, DirectionalChange.LateralReverse, DirectionalChange.PitchDown, DirectionalChange.TurnRight],
//     colorScheme: scheme4
// }

const ruleFactory = (inputString: string): Rule => {
    let arr = inputString.split("")

    const lookup = (char: String): DirectionalChange => {
        switch (char) {
        case "R":{ return DirectionalChange.TurnRight }
        case "L":{ return DirectionalChange.TurnLeft }
        case "D":{ return DirectionalChange.PitchDown }
        case "U":{ return DirectionalChange.PitchUp }
        case "B":{ return DirectionalChange.LateralReverse }
        case "N":{ return DirectionalChange.None }
        case "F":{ return DirectionalChange.PitchReverse}
        }
    }
    return arr.map(char => lookup(char))
}


export const presetBuilder = (spaceConfig: SpaceConfig,
    colorScheme: ColorScheme,
    bpm: number,
    scale: number[],
    ruleString: string,
    strokeWeight: number = 1, 
    shape: Shape = Shape.box): System => {

    return {
        space: makeEmptySpace(spaceConfig),
        spaceConfig: spaceConfig,
        ants: makePairAnts(spaceConfig, antSoundPlayerFactory(scale)),
        rule: ruleFactory(ruleString),
        drawConfig: {
            colorScheme: colorScheme,
            framerate: bpmToFrameRate(bpm),
            shape: shape,
            fillRatio: 0.8,
            strokeWeight: strokeWeight
        }
    }
}

export const preset1 = presetBuilder(
    defaultConfig,
    scheme4,
    320,
    [0,3,7,10,14,19],
    "BDLBDR",
    1
) 

export const preset2 = presetBuilder(
    defaultConfig,
    scheme3,
    320,
    [0,3,7,10,12,14,17,19,22],
    "LLRR"//"FLBRFLBU"//"LFDR"
)


// GOOD!!, forms simple HW, patterns over itself, makes a nice X, maybe good with  a collsion
// export const tempDefaultSystem: System = {
//     space: makeEmptySpace(defaultConfig),
//     spaceConfig: defaultConfig,
//     ants: makePairAnts(defaultConfig),
//     rule: [ DirectionalChange.LateralReverse, DirectionalChange.PitchDown, DirectionalChange.TurnLeft, DirectionalChange.LateralReverse, DirectionalChange.PitchDown, DirectionalChange.TurnLeft ]
// }