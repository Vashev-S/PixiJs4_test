//It's not finished
//It's study project
var pixiObj = {

  APPLICTAION: {},

  /**
  * Create applictaion
  */
  _createApp: function() {
    this.APPLICTAION = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
  },

  /**
  * Create scene
  */
  _createScene: function() {
    var _app = this.APPLICTAION;
    //append renderer to html
    document.body.appendChild(_app.view);
  },

  /**
  * Create texture
  * @param {String} path - path to image
  * @return {Object} PIXI sprite
  */
  createSprite: function(path) {
    return PIXI.Sprite.fromImage(path);
  },

  /**
  * Show sprite
  * @param {Object} sprite - Pixi sprite
  * @param {Object} Coordinates of sprite ( {x: [Integer], y: [Integer]} )
  */
  showSprites: function(sprite, coord) {
    var _app = this.APPLICTAION;
    // move the sprite to the center of the screen
    sprite.x = _app.renderer.width / 2;
    sprite.y = _app.renderer.width / 2;
    //add sprite to stage
    _app.stage.addChild(sprite);
  },

  /**
  * Prepare to draw
  */
  prepareToDraw: function() {
    //var sprite;
    this._createApp();
    this._createScene();
    //spirte = this.createSprite('../resources/1.png');
    //this.showSprites(spirte);
    //this.rotate(spirte);
  },

  /**
  * Rotate sprite
  * @param {Object} sprite - sprite to rotate
  */
  rotate: function(sprite) {
    var _app = this.APPLICTAION;
    //center the sprite's anchor point
    sprite.anchor.set(0.5);

    _app.ticker.add(function(delta) {
      //delta is 1 if running at 100% performance
      sprite.rotation += 0.01 * delta;
    });
  },

  /**
  * Create the slot line (reel)
  */
  createReel: function() {
    var _app = this.APPLICTAION,
        slot,
        reel = new PIXI.Container(),
        i;

    _app.stage.addChild(reel);
    // Create a 1x5 grid of slots
    for (i = 0; i < 25; i++) {
      slot = this.createSprite('../resources/1.png')
      slot.anchor.set(0);
      slot.y = Math.floor(i / 5) * 200;
      reel.addChild(slot);
    }
    //temporary solution
    reel.scale.x = reel.scale.y = 0.4;
    //for now it's centered
    reel.x = (_app.renderer.width - reel.width) / 2;
    reel.y = (_app.renderer.height - reel.height) / 2;
    requestAnimationFrame(this.moveReel.bind(this, reel));
  },

  /**
  * Move reel
  * @param {Object} container of sprites
  */
  moveReel: function(reel) {
    var seed = Math.floor(Math.random() * 6000) + 1000,
        interval;
    interval = setInterval(function() {
      reel.y += 1;
      if (reel.y > 600) { reel.y = 0};
    }, 10);

  },

  /**
  * Repeat function N times
  * @param {Integer} n - how many times call function
  * @param {Function} iterator - calling function
  * @return {Array} accum - Array of results
  */
  repeater: function(n, iterator) {
    var accum = Array(Math.max(0, n));
    for (let i = 0; i < n; i++) {
      accum[i] = iterator.call();
    }
    return accum;
  }
} 

document.addEventListener("DOMContentLoaded", function() {
  pixiObj.prepareToDraw();
  pixiObj.createReel();
});
