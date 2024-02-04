import * as p5 from 'p5';
import { autorotation, drawFromMetadata, drawSpace, logCoord, mouseRotation } from './space';
import { applyRule, System, tempDefaultSystem } from './system';

let system: System
let frame = 0
export const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(1200, 1200, p.WEBGL);
        system = tempDefaultSystem
        
    }

    p.draw = () => {
        p.background(0);
        p.frameRate(40)
        frame++
        mouseRotation(p)
        autorotation(p, frame, 2)
        drawSpace(p, system.space, system.spaceConfig)
        // drawFromMetadata(p, system)
        if (frame % 2 === 0 ) {
        system = applyRule(system)
        }
        // console.log(`top: ${system.ants[0].orientation.topDir}, face: ${ system.ants[0].orientation.facingDir}, coord: ${logCoord(system.ants[0].coord)} `);
       
    }
}

export const myp5 = new p5(sketch, document.body);