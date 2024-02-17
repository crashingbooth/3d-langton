import * as p5 from 'p5';
import { articulate, bpmToFrameRate, webMidiInit } from './sound';
import { applyRule, System } from './system';
import { drawSpace, predraw } from './drawing';
import { preset1, preset2 } from './preset';

let system: System
let frame =  -500

export const sketch = (p: p5) => {
    p.setup = () => {
        system = preset2
        const screenUnit = system.drawConfig.screenSizeMultiplier
        p.createCanvas(16 * screenUnit, 9 * screenUnit, p.WEBGL);
        webMidiInit()
    }

    p.draw = () => {
        frame++
        console.log(`frame:${frame}`)
        
        predraw(p, system, frame)
        drawSpace(p, system, frame)
        if (frame < 0) { return }
        if (frame % 2 === 0) {
            system = applyRule(system)
            articulate(system)
        }
    }
}

export const myp5 = new p5(sketch, document.body);