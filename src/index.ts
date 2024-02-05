import * as p5 from 'p5';
import { articulate, sp1, webMidiInit } from './sound';
import { autorotation, drawFromMetadata, drawSpace, logCoord, mouseRotation, offsetAxes, keyRotation } from './space';
import { applyRule, System, tempDefaultSystem } from './system';

let system: System
let frame = 0
let screenUnit = 145
let rotX = 0
let rotY = 0
let rotZ = 0
export const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(16 * screenUnit, 9 * screenUnit, p.WEBGL);
        system = tempDefaultSystem
        // console.log(`SETUP: ${system.ants[0].facingDirPlayer}`);
        webMidiInit()
    }

    p.draw = () => {
        mouseRotation(p)
        keyRotation(p, rotX, rotY, rotZ)
        // autorotation(p, frame, 2)
        offsetAxes(p, system.spaceConfig)
        p.background(30);
        p.frameRate(14.5)
        frame++


        drawSpace(p, system.space, system.spaceConfig)
        if (frame % 2 === 0) {
            system = applyRule(system)
            articulate(system)
        }
        // console.log(`top: ${system.ants[0].orientation.topDir}, face: ${ system.ants[0].orientation.facingDir}, coord: ${logCoord(system.ants[0].coord)} `);
    }

    p.keyPressed = () => {
        if (p.keyCode === p.LEFT_ARROW) {
          rotX -= 1
        } else if (p.keyCode === p.RIGHT_ARROW) {
            rotX += 1
        } else if (p.keyCode === p.UP_ARROW) {
            rotY += 1
        } else if (p.keyCode === p.DOWN_ARROW) {
            rotY -= 1
        }
      }

}

export const myp5 = new p5(sketch, document.body);