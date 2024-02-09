import * as p5 from 'p5';
import { articulate, bpmToFrameRate, webMidiInit } from './sound';
import { autorotation, drawFromMetadata, drawSpace, mouseRotation, offsetAxes, keyRotation } from './space';
import { applyRule, System, tempDefaultSystem } from './system';

let system: System
let frame = 0//-850
let screenUnit = 145
let rotX = 0
let rotY = 0
let rotZ = 0
export const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(16 * screenUnit, 9 * screenUnit, p.WEBGL);
        system = tempDefaultSystem
        webMidiInit()
    }

    p.draw = () => {
        frame++
        console.log(`frame:${frame}`)
        if (frame < 0) { return }
        mouseRotation(p)
        autorotation(p, frame, 2)
        offsetAxes(p, system.spaceConfig)
        p.frameRate(bpmToFrameRate(220))


        drawSpace(p, system.space, system.spaceConfig)
        if (frame % 3 === 0) {
            system = applyRule(system)
            articulate(system)
        }
    }

}

export const myp5 = new p5(sketch, document.body);