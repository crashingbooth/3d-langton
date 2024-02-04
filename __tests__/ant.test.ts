import { Orientation, AbsoluteDirection, DirectionalChange, turnAnt } from "../src/ant"


// lateral with face up


test('top up ant - lateral', () => {
  const topUp: Orientation = { topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Front }
  const result: Orientation = turnAnt(topUp, DirectionalChange.TurnLeft)

  expect(result).toEqual({ topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Left });
});

test('top up ant - lateral', () => {
  const topUp: Orientation = { topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Left }
  const result: Orientation = turnAnt(topUp, DirectionalChange.TurnLeft)

  expect(result).toEqual({ topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Back });
});

test('top up ant - lateral', () => {
  const topUp: Orientation = { topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Back }
  const result: Orientation = turnAnt(topUp, DirectionalChange.TurnLeft)

  expect(result).toEqual({ topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Right });
});

// non-lateral with face up

test('top up ant - up', () => {
  const topUp: Orientation = { topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Front }
  const result: Orientation = turnAnt(topUp, DirectionalChange.PitchUp)

  expect(result).toEqual({ topDir: AbsoluteDirection.Back, facingDir: AbsoluteDirection.Up });
});

test('top up ant - down', () => {
  const topUp: Orientation = { topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Front }
  const result: Orientation = turnAnt(topUp, DirectionalChange.PitchDown)

  expect(result).toEqual({ topDir: AbsoluteDirection.Front, facingDir: AbsoluteDirection.Down });
});

// RIGHT/UP

const rightUp = { topDir: AbsoluteDirection.Right, facingDir: AbsoluteDirection.Up }
test('RIGHT/UP - go left', () => {
  const result: Orientation = turnAnt(rightUp, DirectionalChange.TurnLeft)

  expect(result).toEqual({ topDir: AbsoluteDirection.Right, facingDir: AbsoluteDirection.Back });
});

test('RIGHT/UP - go right', () => {
  const result: Orientation = turnAnt(rightUp, DirectionalChange.TurnRight)

  expect(result).toEqual({ topDir: AbsoluteDirection.Right, facingDir: AbsoluteDirection.Front });
});

test('RIGHT/UP - go up', () => {
  const result: Orientation = turnAnt(rightUp, DirectionalChange.PitchUp)

  expect(result).toEqual({ topDir: AbsoluteDirection.Down, facingDir: AbsoluteDirection.Right });
});

test('RIGHT/UP - go down', () => {
  const result: Orientation = turnAnt(rightUp, DirectionalChange.PitchDown)

  expect(result).toEqual({ topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Left });
});

// RIGHT/DOWN

const rightDown = { topDir: AbsoluteDirection.Right, facingDir: AbsoluteDirection.Down }
test('RIGHT/DOWN - go left', () => {
  const result: Orientation = turnAnt(rightDown, DirectionalChange.TurnLeft)

  expect(result).toEqual({ topDir: AbsoluteDirection.Right, facingDir: AbsoluteDirection.Front });
});

test('RIGHT/DOWN - go right', () => {
  const result: Orientation = turnAnt(rightDown, DirectionalChange.TurnRight)

  expect(result).toEqual({ topDir: AbsoluteDirection.Right, facingDir: AbsoluteDirection.Back });
});

test('RIGHT/DOWN - go up', () => {
  const result: Orientation = turnAnt(rightDown, DirectionalChange.PitchUp)

  expect(result).toEqual({ topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Right });
});

test('RIGHT/DOWN - go down', () => {
  const result: Orientation = turnAnt(rightDown, DirectionalChange.PitchDown)

  expect(result).toEqual({ topDir: AbsoluteDirection.Down, facingDir: AbsoluteDirection.Left });
});



// DOWN BACK
const downBack: Orientation = { topDir: AbsoluteDirection.Down, facingDir: AbsoluteDirection.Back }
test('top DOWN/BACK - go left', () => {
  const result: Orientation = turnAnt(downBack, DirectionalChange.TurnLeft)

  expect(result).toEqual({ topDir: AbsoluteDirection.Down, facingDir: AbsoluteDirection.Left });
});

test('top DOWN/BACK - go down', () => {
  const result: Orientation = turnAnt(downBack, DirectionalChange.PitchDown)

  expect(result).toEqual({ topDir: AbsoluteDirection.Back, facingDir: AbsoluteDirection.Up });
});

test('top DOWN/BACK - go up', () => {
  const result: Orientation = turnAnt(downBack, DirectionalChange.PitchUp)

  expect(result).toEqual({ topDir: AbsoluteDirection.Front, facingDir: AbsoluteDirection.Down });
});

test('top DOWN/BACK - go right', () => {
  const result: Orientation = turnAnt(downBack, DirectionalChange.TurnRight)

  expect(result).toEqual({ topDir: AbsoluteDirection.Down, facingDir: AbsoluteDirection.Right });
});

// DOWN FRONT

const downFront: Orientation = { topDir: AbsoluteDirection.Down, facingDir: AbsoluteDirection.Front }
test('top DOWN/FRONT - go left', () => {
  const result: Orientation = turnAnt(downFront, DirectionalChange.TurnLeft)

  expect(result).toEqual({ topDir: AbsoluteDirection.Down, facingDir: AbsoluteDirection.Right });
});

test('top DOWN/FRONT - go down', () => {
  const result: Orientation = turnAnt(downFront, DirectionalChange.PitchDown)

  expect(result).toEqual({ topDir: AbsoluteDirection.Front, facingDir: AbsoluteDirection.Up });
});

test('top DOWN/FRONT - go up', () => {
  const result: Orientation = turnAnt(downFront, DirectionalChange.PitchUp)

  expect(result).toEqual({ topDir: AbsoluteDirection.Back, facingDir: AbsoluteDirection.Down });
});

test('top DOWN/FRONT - go right', () => {
  const result: Orientation = turnAnt(downFront, DirectionalChange.TurnRight)

  expect(result).toEqual({ topDir: AbsoluteDirection.Down, facingDir: AbsoluteDirection.Left });
});

// FRONT/DOWN

const frontDown: Orientation = { topDir: AbsoluteDirection.Front, facingDir: AbsoluteDirection.Down }
test('FRONT/DOWN - go left', () => {
  const result: Orientation = turnAnt(frontDown, DirectionalChange.TurnLeft)

  expect(result).toEqual({ topDir: AbsoluteDirection.Front, facingDir: AbsoluteDirection.Left });
});

test('FRONT/DOWN - go right', () => {
  const result: Orientation = turnAnt(frontDown, DirectionalChange.TurnRight)

  expect(result).toEqual({ topDir: AbsoluteDirection.Front, facingDir: AbsoluteDirection.Right });
});

test('FRONT/DOWN - go down', () => {
  const result: Orientation = turnAnt(frontDown, DirectionalChange.PitchDown)

  expect(result).toEqual({ topDir: AbsoluteDirection.Down, facingDir: AbsoluteDirection.Back });
});

test('FRONT/DOWN - go up', () => {
  const result: Orientation = turnAnt(frontDown, DirectionalChange.PitchUp)

  expect(result).toEqual({ topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Front });
});

// BACK/UP

const backUp: Orientation = { topDir: AbsoluteDirection.Back, facingDir: AbsoluteDirection.Up }
test('BACK/UP - go left', () => {
  const result: Orientation = turnAnt(backUp, DirectionalChange.TurnLeft)

  expect(result).toEqual({ topDir: AbsoluteDirection.Back, facingDir: AbsoluteDirection.Left });
});

test('BACK/UP - go right', () => {
  const result: Orientation = turnAnt(backUp, DirectionalChange.TurnRight)

  expect(result).toEqual({ topDir: AbsoluteDirection.Back, facingDir: AbsoluteDirection.Right });
});

test('BACK/UP - go down', () => {
  const result: Orientation = turnAnt(backUp, DirectionalChange.PitchDown)

  expect(result).toEqual({ topDir: AbsoluteDirection.Up, facingDir: AbsoluteDirection.Front });
});

test('BACK/UP - go up', () => {
  const result: Orientation = turnAnt(backUp, DirectionalChange.PitchUp)

  expect(result).toEqual({ topDir: AbsoluteDirection.Down, facingDir: AbsoluteDirection.Back });
});





