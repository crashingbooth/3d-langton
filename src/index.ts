import * as p5 from 'p5';
import { drawSpace, logCoord } from './space';
import { applyRule, System, tempDefaultSystem } from './system';

let system: System
let frame = 0
export const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(800, 800, p.WEBGL);
        system = tempDefaultSystem
        
    }

    p.draw = () => {

        p.frameRate(10)
        frame++
        p.background(220);
        p.rotateX(p.radians(p.mouseY/2))
        // p.rotateY(p.radians(p.mouseX/2))
        // p.rotateX(p.radians(490));
        p.rotateY(p.radians(490));
        drawSpace(p, system.space, system.spaceConfig)
        if (frame % 2 === 0 ) {
        system = applyRule(system)
        }
        // console.log(`top: ${system.ants[0].orientation.topDir}, face: ${ system.ants[0].orientation.facingDir}, coord: ${logCoord(system.ants[0].coord)} `);


        
       
    }
}

export const myp5 = new p5(sketch, document.body);