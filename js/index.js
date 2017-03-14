//It's not finished
//It's study project
var pixiObj = {

  APPLICTAION: {},
  appHeight: 600,
  appWidth: 800,

  /**
  * Create applictaion
  */
  _createApp: function() {
    this.APPLICTAION = new PIXI.Application(this.appWidth, this.appHeight, {backgroundColor : 0x1099bb});
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
        slotFace,
        slotBack,
        faceReel = new PIXI.Container(),
        backReel = new PIXI.Container(),
        i;

    _app.stage.addChild(faceReel);
    _app.stage.addChild(backReel);
    // Create a 1x5 grid of slots
    for (i = 0; i < 5; i++) {
      slotFace = this.createSprite('../resources/1.png');
      slotBack = this.createSprite('../resources/2.png');
      slotFace.anchor.set(0);
      slotBack.anchor.set(0);

      slotFace.y = i * 220;
      slotBack.y = i * 220;

      faceReel.addChild(slotFace);
      backReel.addChild(slotBack);
    }
    //temporary solution
    faceReel.scale.x = faceReel.scale.y = 0.55;
    backReel.scale.x = backReel.scale.y = 0.55;
    //for now it's centered
    faceReel.x = backReel.x = (_app.renderer.width - faceReel.width) / 2;
    faceReel.y = 0;

    //TODO: The last element doesnot count in container height
    //That's why we need 200 * 0.4
    //Yeah this is bug
    backReel.y = faceReel.y + faceReel.height + 220 * 0.55;
    requestAnimationFrame(this.moveReel.bind(this, faceReel));
    requestAnimationFrame(this.moveReel.bind(this, backReel));
  },

  /**
  * Move reel
  * @param {Object} container of sprites
  */
  moveReel: function(reel) {
    var seed = Math.floor(Math.random() * 6000) + 1000,
        interval;
    interval = setInterval(function() {
      isOverFlow = reel.y - reel.height;
      reel.y += 1;
      if (this.isObjectOverflow(reel)) {
      }
      if (reel.y > 600) {
        reel.y = -reel.height;
      }
    }.bind(this), 10);
    setTimeout(clearTimeout.bind(null, interval), seed);
  },

  /**
  * Can we see a whole object/sprite/texture on Y axis
  * @param {Object} viewObject - object which are we checking
  * @return {Boolean} is object overflow
  */
  isObjectOverflow: function(viewObject) {
    var _appHeight = this.appHeight,
        _appWidth = this.appWidth,
        result = false;
    if (_appHeight - viewObject.y < viewObject.height || viewObject.y < 0) {
      result = true;
    }
    return result;

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
