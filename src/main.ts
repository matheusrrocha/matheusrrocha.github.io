import './style.css';
import { k } from './kaboomCtx';
import { playerSpeed, scaleFactor } from './constants';

k.loadSprite('spritesheet', './spritesheet.png', {
  sliceX: 39,
  sliceY: 31,
  anims: {
    'idle-down': 948,
    'walk-down': { from: 948, to: 951, loop: true, speed: playerSpeed },
    'idle-side': 987,
    'walk-side': { from: 987, to: 990, loop: true, speed: playerSpeed },
    'idle-up': 1026,
    'walk-up': { from: 1026, to: 1029, loop: true, speed: playerSpeed },
  }
});

k.loadSprite('map', './map.png');
k.setBackground(k.Color.fromHex('#311047'));

k.scene('main', async () => {
  const mapData = await (await fetch('./map.json')).json();
  const layers = mapData.layers;

  const map = k.make([
    k.sprite('map'),
    k.pos(0),
    k.scale(scaleFactor)
  ]);

  const player = k.make([
    k.sprite('spritesheet', {
      anim: 'idle-down'
    }),
    k.area({
      shape: new k.Rect(k.vec2(0, 3), 10, 10)
    }),
    k.body(),
    k.anchor('center'),
    k.pos(),
    k.scale(scaleFactor),
    {
      speed: 250,
      direction: 'down',
      isInDialog: false
    },
    'player'
  ]);

  for (const layer of layers) {
    if (layer.name === 'boundaries') {
      for (const boundary of layer.objects) {
        map.add([
          k.area({
            shape: new k.Rect(k.vec2(0), boundary.width, boundary.height)
          }),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name
        ]);

        if (boundary.name) {
          player.onCollide(boundary.name, () => {
            player.isInDialog = true;
            // TODO
          })
        }
      }
    }
  }
});

k.go('main');

