
import { WebMidi } from "webmidi";
import { Ant } from "./ant";
import { getState } from "./space";
import { System } from "./system";


export interface SoundPlayer {
    channel: number,
    mapping: number[],
    ignoreZero: boolean,
    rearticulateOnRepeat: boolean,
    rootNote: number,
    duration: number,
    lastInput?: number,
    debugToConsole?: boolean
}


export function webMidiInit() {
  WebMidi
      .enable()
      .then(onEnabled)
      .catch(err => alert(err));
}

function onEnabled() {
  if (WebMidi.inputs.length < 1) {
      console.log("no inputs")
  } else {
      let output = WebMidi.outputs[0]; // or
      console.log(`ENABLED`)
  }
}

const makeNoise = (inputValue: number, soundPlayer: SoundPlayer, name: string) => {
    if (inputValue === soundPlayer.lastInput && !soundPlayer.rearticulateOnRepeat) {
        return
    }
    soundPlayer.lastInput = inputValue
    if (soundPlayer.ignoreZero) {
        if (inputValue == 0) {
            return
        } else {
            inputValue = inputValue - 1
        }
    }

    const octaveSize = Math.floor(soundPlayer.mapping[soundPlayer.mapping.length - 1] / 12) + 1
    const octave = Math.floor(inputValue / soundPlayer.mapping.length)
    const note = soundPlayer.mapping[(inputValue % soundPlayer.mapping.length)] + 12 * octave * octaveSize + soundPlayer.rootNote
    WebMidi.outputs[0].channels[soundPlayer.channel].playNote(note, { duration: soundPlayer.duration })

    // if (soundPlayer.debugToConsole ?? false) {
        console.log(`${name} - ch: ${soundPlayer.channel}, note: ${note} (input: ${inputValue})`)
    // }
}

const articulateState = (system: System, ant: Ant) => {
    const state = getState(system.space, ant.coord) 
    makeNoise(state, ant.statePlayer, "statePlayer")
}

// todo: spearate facing dir, and top dir
const articulateDir = (system: System, ant: Ant) => {
    makeNoise(ant.orientation.facingDir, ant.facingDirPlayer, "dirPlayer")
}

// todo: add last change to metadata
// const articulateChange = (system: System, ant: Ant) => {
//     makeNoise(ant.lastChange, system.changePlayer, "changePlayer")
// }

export const articulate = (system: System) => {
    for (let ant of system.ants) {
        if (ant.statePlayer) {      
            articulateState(system, ant)
        }

        if (ant.facingDirPlayer) {
            articulateDir(system, ant)
        }

        // if (system.changePlayer) {
        //     articulateChange(system, ant)
        // }
    }
}

export const bpmToFrameRate = (bpm: number): number => {
    // assume four events per beat
    return bpm * 4 / 60
}

// export const addSoundPlayersFromPreset = (grid: Grid, preset: Preset): Grid => {
//     return { ...grid,
//         statePlayer: preset.statePlayer,
//         dirPlayer: preset.dirPlayer,
//         changePlayer: preset.changePlayer
//     } 
// }

export const sp1 = (channel: number)  => {
    return {
    channel: channel,
    // mapping: [0,10,3,5,-2,14,15,17],
    mapping: [0,3,7,10,14,15,19],
    ignoreZero: true,
    rearticulateOnRepeat: false,
    rootNote: 48,
    duration: 125,
    debugToConsole: false
}
}

export const sp2 = (channel: number) => {
    return {
    channel: channel,
    mapping: [0,1,2,3,4,5,6,7,8,9,10,11,12],
    ignoreZero: false,
    rearticulateOnRepeat: false,
    rootNote: 60,
    duration: 100,
    debugToConsole: false
}}

// export const addSoundPlayersToAnts = (system: System): System => {
//     let resultSystem = system
//     system.ants.forEach((ant, i) => {
//         resultSystem.ants[i] = {...ant, statePlayer: sp1, facingDirPlayer: sp2}
//     })
//     return system
// }