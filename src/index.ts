import * as p5 from 'p5';
import { drawSpace, logCoord } from './space';
import { applyRule, System, tempDefaultSystem } from './system';

let system: System
let frame = 0
export const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(1200, 1200, p.WEBGL);
        system = tempDefaultSystem
        
    }

    p.draw = () => {

        p.frameRate(40)
        frame++
        p.rotateY(p.radians(frame/10))
        p.rotateZ(p.radians(frame/5))
        p.rotateX(p.radians(frame/7))
        p.background(220);
        p.rotateX(p.radians(p.mouseY/2))
        // p.rotateY(p.radians(p.mouseX/2))
        // p.rotateX(p.radians(490));
        p.rotateY(p.radians(490));
        drawSpace(p, system.space, system.spaceConfig)
        if (frame % 5 === 0 ) {
        system = applyRule(system)
        }
        // console.log(`top: ${system.ants[0].orientation.topDir}, face: ${ system.ants[0].orientation.facingDir}, coord: ${logCoord(system.ants[0].coord)} `);


        
       
    }
}

export const myp5 = new p5(sketch, document.body);