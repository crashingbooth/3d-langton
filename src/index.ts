import * as p5 from 'p5';
import { articulate, sp1, webMidiInit } from './sound';
import { autorotation, drawFromMetadata, drawSpace, logCoord, mouseRotation, offsetAxes } from './space';
import { applyRule, System, tempDefaultSystem } from './system';

let system: System
let frame = 0
export const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(1600, 1200, p.WEBGL);
        system = tempDefaultSystem
        // console.log(`SETUP: ${system.ants[0].facingDirPlayer}`);
        webMidiInit()
    }

    p.draw = () => {
        mouseRotation(p)
           autorotation(p, frame, 2)
        offsetAxes(p, system.spaceConfig)
        p.background(0);
        p.frameRate(15)
        frame++
   

        drawSpace(p, system.space, system.spaceConfig)
        if (frame % 2 === 0 ) {
        system = applyRule(system)
        articulate(system)
        }
        // console.log(`top: ${system.ants[0].orientation.topDir}, face: ${ system.ants[0].orientation.facingDir}, coord: ${logCoord(system.ants[0].coord)} `);
       
    }
}

export const myp5 = new p5(sketch, document.body);