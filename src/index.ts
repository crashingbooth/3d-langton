import * as p5 from 'p5';
import * as s from './space';

let space: s.Space 

export const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(800, 800, p.WEBGL);
        space = s.sampleSpace()
        
    }

    p.draw = () => {
        p.background(220);
        p.rotateX(p.radians(490));
        p.rotateY(p.radians(490));
        s.drawSpace(p, space, s.defaultConfig)
        // console.log(`x: ${p.mouseX} , y ${p.mouseY}`);
        
       
    }
}

export const myp5 = new p5(sketch, document.body);