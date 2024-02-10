import * as p5 from 'p5';
import { articulate, bpmToFrameRate, webMidiInit } from './sound';
import { autorotation, mouseRotation, offsetAxes, keyRotation } from './space';
import { applyRule, System } from './system';
import { drawSpace } from './drawing';
import { preset1, preset2 } from './preset';

let system: System
let frame = 0 // -700
let screenUnit = 145
let rotX = 0
let rotY = 0
let rotZ = 80

export const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(16 * screenUnit, 9 * screenUnit, p.WEBGL);
        system = preset2
        webMidiInit()
    }

    p.draw = () => {
        frame++
        console.log(`frame:${frame}`)
        mouseRotation(p)
        autorotation(p, frame, 2)
        offsetAxes(p, system.spaceConfig)
        p.frameRate(bpmToFrameRate(220))


        drawSpace(p, system, frame)
        if (frame < 0) { return }
        if (frame % 3 === 0) {
            system = applyRule(system)
            articulate(system)
        }
    }

}

export const myp5 = new p5(sketch, document.body);