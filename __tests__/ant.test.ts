import {Orientation, AbsoluteDirection, DirectionalChange, turnAnt}  from "../src/ant"


// lateral with face up


test('top up ant - lateral', () => {
    const topUp: Orientation = {topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Front }
    const result: Orientation = turnAnt(topUp, DirectionalChange.TurnLeft)
    
  expect(result).toEqual({topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Left });
});

test('top up ant - lateral', () => {
    const topUp: Orientation = {topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Left }
    const result: Orientation = turnAnt(topUp, DirectionalChange.TurnLeft)
    
  expect(result).toEqual({topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Back });
});

test('top up ant - lateral', () => {
    const topUp: Orientation = {topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Back }
    const result: Orientation = turnAnt(topUp, DirectionalChange.TurnLeft)
    
  expect(result).toEqual({topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Right });
});

// non-lateral with face up

test('top up ant - up', () => {
    const topUp: Orientation = {topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Front }
    const result: Orientation = turnAnt(topUp, DirectionalChange.PitchUp)
    
  expect(result).toEqual({topDir: AbsoluteDirection.Back, facingDir: AbsoluteDirection.Up });
});

test('top up ant - down', () => {
    const topUp: Orientation = {topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Front }
    const result: Orientation = turnAnt(topUp, DirectionalChange.PitchDown)
    
  expect(result).toEqual({topDir: AbsoluteDirection.Front, facingDir: AbsoluteDirection.Down });
});

// // face RIGHT

test('top right - go left', () => {
    const topUp: Orientation = {topDir: AbsoluteDirection.Right, facingDir: AbsoluteDirection.Up }
    const result: Orientation = turnAnt(topUp, DirectionalChange.TurnLeft)
    
  expect(result).toEqual({topDir: AbsoluteDirection.Right, facingDir: AbsoluteDirection.Back });
});

test('top right - go up', () => {
    const topUp: Orientation = {topDir: AbsoluteDirection.Right, facingDir: AbsoluteDirection.Up }
    const result: Orientation = turnAnt(topUp, DirectionalChange.PitchUp)
    
  expect(result).toEqual({topDir: AbsoluteDirection.Down, facingDir: AbsoluteDirection.Right });
});

test('top right - go up', () => {
    const topUp: Orientation = {topDir: AbsoluteDirection.Right, facingDir: AbsoluteDirection.Down }
    const result: Orientation = turnAnt(topUp, DirectionalChange.PitchUp)
    
  expect(result).toEqual({topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Right });
});


// FACE DOWN

test('top DOWN - go left', () => {
    const topUp: Orientation = {topDir: AbsoluteDirection.Down, facingDir: AbsoluteDirection.Back }
    const result: Orientation = turnAnt(topUp, DirectionalChange.TurnLeft)
    
  expect(result).toEqual({topDir: AbsoluteDirection.Down, facingDir: AbsoluteDirection.Right });
});

test('top DOWN - go left', () => {
    const topUp: Orientation = {topDir: AbsoluteDirection.Down, facingDir: AbsoluteDirection.Back }
    const result: Orientation = turnAnt(topUp, DirectionalChange.PitchDown)
    
  expect(result).toEqual({topDir: AbsoluteDirection.Back, facingDir: AbsoluteDirection.Up });
});