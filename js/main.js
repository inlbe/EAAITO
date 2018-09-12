class MyGame extends Game
{
  static get Palette()
  {
    let colourObj =
    {
      green: 'green',
      yellow: 'yellow',
      red: 'red',
      black: 'Black',
      aquaMarine: '#7FFFD4',
      teal: 'teal',
      indigo: 'indigo',
      slateBlue: '#6A5ACD',
      magenta: 'Magenta',
      lime: 'Lime',
      aqua: 'Aqua',
      dimGray: 'DimGray',
      lightGray: '#D3D3D3'
    };
    return colourObj;
  }
  constructor(xTiles, yTiles, tileSize)
  {
    super(xTiles, yTiles, tileSize);
    this.screens = null
    this.levels = [];
    this.levelData = new LevelData(this);

    window.addEventListener("keydown", function(e)
    {
      // space and arrow keys
      if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault();
      }
    }, false);
  }
  preload()
  {
    super.preload();
    this.spriteShapes.push([this.createCharacter('e1', MyGame.Palette.green)]);
    this.spriteShapes.push([this.createCharacter('p', MyGame.Palette.teal)]);
    let triPoints =
    [
      new Point(0, (this.gameWorld.tileSize / 2) - 1),
      new Point(this.gameWorld.tileSize, (this.gameWorld.tileSize / 2) - 1),
      new Point(this.gameWorld.tileSize / 2, this.gameWorld.tileSize)
    ];
    let tri = new PolyShape(triPoints,'',
        MyGame.Palette.indigo);
    this.spriteShapes.push([PolyShape.Circle(0, 0, this.gameWorld.tileSize / 2,
        MyGame.Palette.indigo, 't', undefined, 0, Math.PI), tri]);
    this.spriteShapes.push(new Array(PolyShape.Circle(0, 0,
        this.gameWorld.tileSize / 2, MyGame.Palette.red, "cR")));
    this.spriteShapes.push([this.createCharacter('e2', MyGame.Palette.slateBlue)]);
    this.spriteShapes.push(new Array(PolyShape.Circle(0, 0,
        this.gameWorld.tileSize / 4, MyGame.Palette.yellow, "b0")));
    this.spriteShapes.push(new Array(PolyShape.Circle(0, 0,
        this.gameWorld.tileSize / 4, MyGame.Palette.red, "b1")));
    this.spriteShapes.push(new Array(PolyShape.Circle(0, 0,
        this.gameWorld.tileSize / 4, MyGame.Palette.magenta, "b2")));
    this.spriteShapes.push(new Array(PolyShape.Circle(0,
        0, this.gameWorld.tileSize / 3,
        MyGame.Palette.black, "sB")));
    this.spriteShapes.push(new Array(PolyShape.Circle(0,
        0, this.gameWorld.tileSize / 4, MyGame.Palette.red, "s0")));
    this.spriteShapes.push(new Array(PolyShape.Circle(0,
        0, this.gameWorld.tileSize / 4, MyGame.Palette.green, "s1")));
    this.spriteShapes.push(new Array(PolyShape.Circle(0,
        0, this.gameWorld.tileSize / 3,
        MyGame.Palette.lime, "pU0", 6)));
    this.spriteShapes.push(new Array(PolyShape.Circle(0,
        0, this.gameWorld.tileSize / 3,
        MyGame.Palette.aqua, "pU1", 6)));
    this.spriteShapes.push(this.createBrick('w1', [MyGame.Palette.aquaMarine, MyGame.Palette.black]));
    this.spriteShapes.push(this.createBrick('b', [MyGame.Palette.dimGray, MyGame.Palette.lightGray],2, 2));
    this.spriteSheet = this.loadSpriteSheet();
  }
  createCharacter(name, backgroundColour)
  {
    return PolyShape.BevelledRectangle(0, 0, this.gameWorld.tileSize,
        this.gameWorld.tileSize,7, name, backgroundColour)

  }
  createBrick(name, colours, rows = 4, cols = 4)
  {

    let wholeBrickWidth = this.gameWorld.tileSize / cols;
    let halfBrickWidth = wholeBrickWidth / 2;
    let brickHeight = this.gameWorld.tileSize / rows;

    let array = [];
    for(let x = 0; x <= cols; x++)
    {
      for(let y = 0; y < rows; y++)
      {
        let index = 0;
        if(x)
        {
          index = x % 2;
        }
        if(Math.floor(y / 2) === y / 2 && x < cols)
        {
          //whole brick row
          array.push(PolyShape.Rectangle(x * wholeBrickWidth, y * brickHeight, wholeBrickWidth,
              brickHeight, '', colours[index]));
        }
        else
        {
          if(!x)
          {
            //half brick
            array.push(PolyShape.Rectangle(0, y * brickHeight, halfBrickWidth,
                brickHeight, '', colours[1 - index]));
          }
          else if(x === cols)
          {
            array.push(PolyShape.Rectangle(halfBrickWidth +
                (wholeBrickWidth * (cols - 1)), y * brickHeight, halfBrickWidth,
                brickHeight, '', colours[1 - index]));
          }
          else
          {
            array.push(PolyShape.Rectangle(halfBrickWidth +
                (wholeBrickWidth * (x - 1)), y * brickHeight, wholeBrickWidth,
                brickHeight, '', colours[1 - index]));
          }
        }
      }
    }
    array[0].name = name;
    return array;
  }
  create()
  {
    super.create();


    let collisionGrid = new CollisionGrid(this, LevelData.LevelDimensions.WIDTH, LevelData.LevelDimensions.HEIGHT);
    this.gameWorld.collisionGrid = collisionGrid;

    this.screens =
    {
      mainGameScreen: new MainGameScreen(this, 0, 0)
    };
    this.gameWorld.addChild(this.screens.mainGameScreen);
    this.gameWorld.start();

  }
}

class MainGameScreen extends Sprite
{
  static get Levels()
  {
    let levels =
    [
      {walls: [], offlineButtons: '1fff', enemySpawnPoints: [], playerSpawnPoint: '88'},
      {walls: ['84a7'], offlineButtons: '8df1', enemySpawnPoints: ['0ff4', '01f4'], playerSpawnPoint: '11'},
      {walls: ['58a3'], offlineButtons: 'a81f7f', enemySpawnPoints: ['0ff5', '0f15'], playerSpawnPoint: '11'},
      {walls: ['3a833'], offlineButtons: '8a8511', enemySpawnPoints: ['01f5','1ff3'], playerSpawnPoint: 'f1'},
      {walls: ['2a533', 'c3aab'], offlineButtons: '5a5511c5ca', enemySpawnPoints: ['01f3','1ff3', '0881'], playerSpawnPoint: 'f1'},
      {walls: ['2bc22'], offlineButtons: '5b54c4cb9f', enemySpawnPoints: ['01f3','1ff2', '1112'], playerSpawnPoint: 'e6'}
    ]
    return levels;
  }
  constructor(game, x, y)
  {
    super(game, null, null, x, y, true, false);
    this.levelIndex = 0;

    this.game.gameWorld.collisionGrid.clear();
    this.tileMap = new TileMap(game);
    this.addChild(this.tileMap);
    this.nukeAlphaTween = this.game.gameWorld.addTween(new AlphaTween(this, 2, 1, Tween.CONST_ACCEL, 1, 0.2));
    this.nukeTweenContainer = this.game.gameWorld.addTween(new TweenContainer());

    let dis = this.game.gameWorld.tileSize * 0.5;
    let storePoint = new Point(0,0);
    for(let i = 0; i < 7; i++)
    {
      let ang = Math.random() * Math.PI * 2;
      storePoint.x = Math.cos(ang) * dis;
      storePoint.y = Math.sin(ang) * dis;
      this.nukeTweenContainer.addTween(new MoveTween(this, 0.1, 0, Tween.CONST_SPEED,
          new Point(0, 0), storePoint));
      this.nukeTweenContainer.addTween(new MoveTween(this, 0.1, 0, Tween.CONST_SPEED,
         storePoint, new Point(0,0)));
    }
    this.nukeTweenContainer.addTween(this.nukeAlphaTween);

    this.tutorialStrings =
    [
      [
        "PRESS THE 'wasd' KEYS TO",
        "MOVE YOUR TANK"],
      [
        "USE THE CURSOR KEYS TO",
        "AIM AND FIRE YOUR GUN"
      ],
      [
        "PICK UP POWER UPS-GIVE",
        "YOURSELF THE EDGE"
      ],
      [
        "RUN OVER ALL THE GREEN",
        "BUTTONS TO MAKE THE AI GO",
        "OFFLINE AND ADVANCE",
        "TO THE NEXT LEVEL"
      ]

    ];
    this.enterStrings =
    [
      "",
      "PRESS ENTER TO START"
    ];
    this.textTimer = new Timer(4);
    let textIndex = 0;
    this.game.levelData.HUDGroup.helpLabelGroup.setLabelTexts(this.tutorialStrings[textIndex].concat(this.enterStrings));
    this.textTimer.onComplete = (() =>
    {
      textIndex ++;
      if(textIndex === this.tutorialStrings.length)
      {
        textIndex = 0;
      }
      this.game.levelData.HUDGroup.helpLabelGroup.setLabelTexts(this.tutorialStrings[textIndex].concat(this.enterStrings));
      this.textTimer.reset(true);
    });
    this.game.gameWorld.timers.push(this.textTimer);

    this.events.onKeyDown = ((event) =>
    {
      if(event.keyCode === 13 && this.levelIndex === 0)
      {
        this.levelIndex ++;
        this.nextLevelScaleDownTween.active = true;
      }
    });
    this.nextLevelScaleDownTween = this.game.gameWorld.addTween(
        new ScaleTween(this, 2, 0, Tween.CONST_ACCEL, new Point(1, 1),
        new Point(0,0)));
    this.nextLevelScaleDownTween.onComplete = () =>
    {
      this.loadLevel(this.levelIndex);
      this.nextLevelScaleUpTween.active = true;
    }
    this.nextLevelScaleUpTween = this.game.gameWorld.addTween(
        new ScaleTween(this, 2, 0, Tween.CONST_ACCEL, new Point(0, 0),
        new Point(1,1)));
    this.loadLevel(this.levelIndex);
    this.nextLevelScaleUpTween.active = true;

  }
  loadLevel(index = 0)
  {

    let level = MainGameScreen.Levels[index];
    let nukeCallback = () =>
    {
      this.nukeTweenContainer.activateTweens();
      this.nukeAlphaTween.active = true;
    };
    let healthChangedCallback = (newHealth) =>
    {
      this.game.levelData.HUDGroup.healthLabel.countTo(newHealth);
    };
    let onPlayerSpriteTerminatedCallback = () =>
    {
      this.nextLevelScaleDownTween.active = true;
    }

    this.tileMap.clearTileSprites(this.game.gameWorld.collisionGrid);
    this.removeChild(this.game.levelData.HUDGroup);
    let buttonsPressedCount = 0;

    let levelObj = this.game.levelData.generateLevel(level.walls, level.offlineButtons,
        level.enemySpawnPoints, level.playerSpawnPoint);
    if(index === 0)
    {
      this.game.levelData.HUDGroup.helpLabelGroup.setVisible(true);
      this.game.levelData.powerUpsGroup.addPowerUp(0,
              new Point(this.game.gameWorld.tileSize * 12,
              this.game.gameWorld.tileSize * 12));
    }
    else
    {
      this.game.levelData.HUDGroup.helpLabelGroup.setVisible(false);
      this.textTimer.reset(false);
    }
    this.tileMap.createTileSprites(levelObj.mapData, this.game.gameWorld.collisionGrid);
    this.tileMap.setWallSpriteCollisionGroups(PlayerSprite.CollisionID);
    this.addChildren(levelObj.offlineButtons);
    this.addChild(levelObj.powerUpsGroup);
    this.addChildren(levelObj.enemySpawnPoints);
    this.addChild(levelObj.playerSpriteGroup);

    levelObj.playerSpriteGroup.sprite.onNukeDetonated.addListener(this, nukeCallback, true);
    levelObj.playerSpriteGroup.sprite.onHealthChanged.addListener(this, healthChangedCallback, true);
    levelObj.playerSpriteGroup.sprite.onTerminated.addListener(this, onPlayerSpriteTerminatedCallback, true)
    this.game.gameWorld.collisionGrid.addSprites(levelObj.offlineButtons);
    this.game.gameWorld.collisionGrid.addSprite(levelObj.playerSpriteGroup.sprite);
    levelObj.enemySpawnPoints.forEach((spawnPoint) =>
    {
      this.game.gameWorld.collisionGrid.addSprites(spawnPoint.sprites);
      spawnPoint.spawnTimer.reset(true);
    });

    levelObj.offlineButtons.forEach((offlineButton) =>
    {
      offlineButton.onPressed.addListener(this, (pressedButton) =>
      {
        buttonsPressedCount ++;
        if(buttonsPressedCount === levelObj.offlineButtons.length)
        {
          this.levelIndex ++;
          if(this.levelIndex === MainGameScreen.Levels.length)
          {
            this.levelIndex = 1;
          }
          this.nextLevelScaleDownTween.active = true;
        }
      }, true);
    });
    this.addChild(this.game.levelData.HUDGroup);
    this.nextLevelScaleUpTween.onComplete = () =>
    {
      if(this.levelIndex === 0)
      {
        this.textTimer.reset(true)
      }
    }
  }
  setVisible(visible)
  {
    super.setVisible(visible);
    if(visible)
    {
      this.loadLevel();
    }
  }
}

class HUDGroup extends Sprite
{
  constructor(game,x, y)
  {
    super(game, null, null, x, y, true, false);
    this.healthPrefix  = new Label(game, 0, 0, "HEALTH:", MyGame.Palette.yellow);
    this.addChild(this.healthPrefix);
    this.healthLabel = new CountingLabel(game, this.healthPrefix.width, 0, 100, MyGame.Palette.yellow, 0.05);
    this.addChild(this.healthLabel);

    this.scorePrefix = new Label(game, 0, 0, "SCORE:", MyGame.Palette.yellow);
    this.scoreLabel = new CountingLabel(game,0, 0, 0, MyGame.Palette.yellow, 0.01);
    this.addChild(this.scorePrefix);
    this.addChild(this.scoreLabel);

    this.helpLabelGroup = new LabelGroup(game, this.game.gameWorld.tileSize,
        this.game.gameWorld.tileSize);
    this.addChild(this.helpLabelGroup);
  }
  update()
  {
    this.scoreLabel.position.x = this.game.gameWorld.canvas.width - this.scoreLabel.width;
    this.scorePrefix.position.x = this.scoreLabel.position.x - this.scorePrefix.width;
  }
}

class PowerUpsGroup extends Sprite
{
  constructor(game, x, y)
  {
    super(game, null, null, x, y, true, false);
    this.powerUpPools = game.levelData.powerUpPools;
  }
  addPowerUp(id, position)
  {
    let objectArgs = {game: this.game, x: position.x, y: position.y};
    let powerUp = null;
    powerUp = this.addChild(this.powerUpPools[id].obtain(objectArgs));
    this.game.gameWorld.collisionGrid.addSprite(powerUp);
  }
  removePowerUp(powerUp)
  {
    this.game.gameWorld.collisionGrid.removeSprite(powerUp);
    this.powerUpPools[powerUp.constructor.PowerUpID].free(powerUp);
    this.removeChild(powerUp);
  }
  reset()
  {
    super.reset();
    while(this.children.length > 0)
    {
      this.removePowerUp(this.children[0]);
    }
  }
}
class LevelData
{
  static get LevelDimensions()
  {
    return{WIDTH: 17, HEIGHT: 17};
  }
  constructor(game)
  {
    this.game = game;
    this.spawnPointPool = new SpawnPointPool();
    this.offlineButtonPool = new OfflineButtonPool();
    this.playerSpriteGroupPool = new PlayerSpriteGroupPool();
    this.powerUpPools =
    [
      new SpreadFirePowerUpPool(),
      new HealthPowerUpPool(),
      new NukePowerUpPool(),
      new SpeedPowerUpPool(),
      new MegaGunPowerUpPool()
    ];
    this.powerUpsGroupPool = new PowerUpsGroupPool();
    this.enemySprites = [];
    this.enemySpriteGroupPools =
    [
      new BasicEnemySpriteGroupPool(),
      new ShootingEnemySpriteGroupPool()
    ];



    this.backgroundFrame = 'b';
    this.wallFrames = ['w1'];
    this.playerSpriteGroup = null;
    this.powerUpsGroup = null;
    this.offlineButtons = [];
    this.enemySpawnPoints = [];
    this.gridPathFinderPools =
    {
      gridSquarePool: new GridSquarePool(),
      gridPathPool: new GridPathPool(),
      gridPathFinderPool: new GridPathFinderPool()
    };
    this.HUDGroup = new HUDGroup(game, 0, 0);
  }
  generateLevel(wallData, offlineButtonData, enemySpawnData, playerSpawnPosition)
  {
    this._resetLevel();
    this._generatePowerUpsGroup();
    this._generatePlayerSpriteGroup(playerSpawnPosition);
    this._generateOfflineButtons(offlineButtonData);
    this._generateEnemySpawnPoints(enemySpawnData);
    let mapData = this._generateMapData(wallData);
    this.enemySpawnPoints.forEach((spawnPoint) =>
    {
      spawnPoint.sprites.forEach((sprite) =>
      {
        this.enemySprites.push(sprite);
        sprite.playerSprite = this.playerSpriteGroup.sprite;
      });
    });
    return {playerSpriteGroup: this.playerSpriteGroup, offlineButtons: this.offlineButtons,
        enemySpawnPoints: this.enemySpawnPoints, mapData: mapData, powerUpsGroup: this.powerUpsGroup};
  }
  _resetLevel()
  {

    if(this.playerSpriteGroup)
    {
      this.game.gameWorld.collisionGrid.removeSprite(this.playerSpriteGroup.sprite);
      this.playerSpriteGroupPool.free(this.playerSpriteGroup);
      this.playerSpriteGroup.parent.removeChild(this.playerSpriteGroup);
      this.HUDGroup.healthLabel.setTo(this.playerSpriteGroup.sprite.health);
    }
    if(this.powerUpsGroup)
    {
      this.game.gameWorld.collisionGrid.removeSprites(this.powerUpsGroup.children);
      this.powerUpsGroupPool.free(this.powerUpsGroup);
      this.powerUpsGroup.parent.removeChild(this.powerUpsGroup);
    }
    this.offlineButtons.forEach((offlineButton) =>
    {
      this.game.gameWorld.collisionGrid.removeSprite(offlineButton);
      this.offlineButtonPool.free(offlineButton);
      offlineButton.parent.removeChild(offlineButton);
    });
    this.offlineButtons.length = 0;
    this.enemySpawnPoints.forEach((spawnPoint) =>
    {
      this.game.gameWorld.collisionGrid.removeSprites(spawnPoint.sprites);
      this.spawnPointPool.free(spawnPoint);
      spawnPoint.parent.removeChild(spawnPoint);
    });
    this.enemySpawnPoints.length = 0;
    this.enemySprites.length = 0;
  }
  _parseHexChar(hexString, charIndex)
  {
    return parseInt(hexString.charAt(charIndex), 16);
  }
  _generatePowerUpsGroup()
  {
    this.powerUpsGroup = this.powerUpsGroupPool.obtain({game: this.game, x: 0, y: 0});
  }
  _generatePlayerSpriteGroup(playerSpawnPosition)
  {
    this.playerSpriteGroup = this.playerSpriteGroupPool.obtain({game: this.game,
        x: 0, y: 0, spriteArgs: {game: this.game,
        x: this._parseHexChar(playerSpawnPosition, 0) * this.game.gameWorld.tileSize,
        y: this._parseHexChar(playerSpawnPosition, 1) * this.game.gameWorld.tileSize,
        animated: false, enemySprites: this.enemySprites}});
  }
  _generateOfflineButtons(offlineButtonData)
  {
    for(let i = 0; i < offlineButtonData.length; i += 2)
    {
      let offlineButton = new OfflineButton(this.game, 0, 0);
      offlineButton.position.x = this._parseHexChar(offlineButtonData, i) * this.game.gameWorld.tileSize +
          ((this.game.gameWorld.tileSize - offlineButton.width) / 2);
      offlineButton.position.y = this._parseHexChar(offlineButtonData,i + 1) * this.game.gameWorld.tileSize +
          ((this.game.gameWorld.tileSize - offlineButton.height) / 2);
      this.offlineButtons.push(offlineButton);
    }
  }
  _generateEnemySpawnPoints(enemySpawnData)
  {
    enemySpawnData.forEach((hexString) =>
    {
      let id = this._parseHexChar(hexString, 0);
      let x = this._parseHexChar(hexString, 1) * this.game.gameWorld.tileSize;
      let y = this._parseHexChar(hexString, 2) * this.game.gameWorld.tileSize;
      //let rate = (1 / 4) * this._parseHexChar(hexString, 3);
      let total = this._parseHexChar(hexString, 3);
      this.enemySpawnPoints.push(this.spawnPointPool.obtain({game: this.game,
          id: id,x: x, y: y, total: total}));
    });
  }
  _generateMapData(wallData)
  {
    let setWalls = ((end, reference, constant, setFunction) =>
    {
      if(end > reference)
      {
        for(let i = reference; i <= end; i++)
        {
          setFunction(i, constant);
        }
      }
      else
      {
        for(let i = reference; i >= end; i--)
        {
          setFunction(i, constant);
        }
      }
      return end;
    });
    let setWallAttribs = ((cell) =>
    {
      cell.frames = this.wallFrames;
      cell.wall = true;
      cell.animated = false;
    });
    let setWallVarX = ((varX, conY) =>
    {
      setWallAttribs(mapData.grid[varX][conY]);
    });
    let setWallVarY = ((varY, conX) =>
    {
      setWallAttribs(mapData.grid[conX][varY]);
    });

    let mapDims = this.constructor.LevelDimensions;
    let mapData = new MyGrid(mapDims.WIDTH, mapDims.HEIGHT, {frames: [], wall: false,
        animated: false, animRate: 1 / 2});

    for(let i = 0; i < LevelData.LevelDimensions.WIDTH; i++)
    {
      setWallAttribs(mapData.grid[i][0]);
      setWallAttribs(mapData.grid[i][LevelData.LevelDimensions.HEIGHT - 1]);
    }
    for(let i = 1; i < LevelData.LevelDimensions.HEIGHT - 1; i++)
    {
      setWallAttribs(mapData.grid[0][i]);
      setWallAttribs(mapData.grid[LevelData.LevelDimensions.WIDTH - 1][i]);
    }

    wallData.forEach((hexString) =>
    {
      let startWallPoint = new Point(this._parseHexChar(hexString, 0) + 1,
        this._parseHexChar(hexString, 1) + 1);
      let prevPoint = new Point(startWallPoint.x, startWallPoint.y);
      for(let i = 2; i < hexString.length; i++)
      {
        //x then y
        if(i % 2 === 0)
        {
          //x
          prevPoint.x = setWalls(this._parseHexChar(hexString, i) + 1,
              prevPoint.x, prevPoint.y, setWallVarX);
        }
        else
        {
          //y
          prevPoint.y = setWalls(this._parseHexChar(hexString, i) + 1,
              prevPoint.y, prevPoint.x, setWallVarY);
        }
      }
    });

    mapData.getAll().forEach((cell) =>
    {
      if(cell.obj.frames.length === 0)
      {
        cell.obj.frames = this.backgroundFrame;
      }
    });
    return mapData;
  }
}

class SpawnPoint extends Sprite
{
  constructor(game, id, x, y, total)
  {
    super(game, null, null, 0, 0, true, false);
    this.enemySpriteGroupPools = game.levelData.enemySpriteGroupPools;
    this.spritesTotal = total;
    this.sprites = [];
    this.spawnTimer = new Timer(3);
    this.spawnTimer.onComplete = () =>
    {
      this.spawn();
      this.spawnTimer.reset(true);
    };
    game.gameWorld.timers.push(this.spawnTimer);
    this.spawnPosition = new Point(x, y);
    this._initSprites(id);
  }
  _initSprites(id)
  {
    let spriteGroup = null;
    for(let i = 0; i < this.spritesTotal; i++)
    {
      spriteGroup = this.enemySpriteGroupPools[id].obtain({game: this.game, x: 0, y: 0,
              spriteArgs: {game: this.game, x: 0, y: 0}});
      this.sprites.push(spriteGroup.sprite);
    }
    this.sprites.forEach((sprite) =>
    {
      sprite.setVisible(false);
      sprite.position.setTo(this.spawnPosition);
      this.addChild(sprite.parent);
    });
  }
  spawn()
  {
    this.sprites.some((sprite) =>
    {
      if(!sprite.visible)
      {

        sprite.position.setTo(this.spawnPosition);
        if(!this.game.gameWorld.collisionGrid.collisionTest(sprite))
        {
          sprite.setVisible(true);
          sprite.spawnScaleTween.active = true;
          sprite.initGridPos();
          return true;
        }
      }
    });
  }
  set(objectArgs)
  {
    this.spawnPosition.x = objectArgs.x;
    this.spawnPosition.y = objectArgs.y;
    this.spritesTotal = objectArgs.total;
    this._initSprites(objectArgs.id);
  }
  reset()
  {
    super.reset();
    this.sprites.forEach((sprite) =>
    {
      this.enemySpriteGroupPools[sprite.constructor.EnemySpriteID].free(sprite.parent);
      sprite.reset();
      this.removeChild(sprite.parent);
    });
    this.sprites.length = 0;
    this.spawnTimer.reset(false);
  }
}

class OfflineButton extends Sprite
{
  static get CollisionID()
  {
    return 1 << 3;
  }
  constructor(game, x, y)
  {
    super(game, Sprite.Type.SPRITE_SHEET, ["sB"], x, y, true, false);
    this.width = this.height = this.game.gameWorld.tileSize / 1.5;
    this.collisionWidth = this.collisionHeight = 1;
    this.offlineButtonCentre = new OfflineButtonCentre(game, 0, 0);
    this.offlineButtonCentre.position.x = (this.width - this.offlineButtonCentre.width) / 2;
    this.offlineButtonCentre.position.y = (this.height - this.offlineButtonCentre.height) / 2;
    this.addChild(this.offlineButtonCentre);
    this.on = true;
    this.solid = false;
    this.onCollide.addListener(this, () =>
        {
          if(this.on)
          {
            this.on = false;
            this.offlineButtonCentre.setFrame(1);
            this.onPressed.dispatch(this);
          }
        }, true);
    this.onPressed = new Signal(game, this);
    this.collisionGroup = PlayerSprite.CollisionID;
  }
  reset()
  {
    super.reset();
    this.on = true;
    this.onPressed.listeners.length = 0;
  }
}

class OfflineButtonCentre extends Sprite
{
  constructor(game, x, y)
  {

    super(game, Sprite.Type.SPRITE_SHEET, ["s1", "s0"], x, y, true, false);
    this.width = this.height = this.game.gameWorld.tileSize / 2;
  }
}


class SpriteGroup extends Sprite
{
  constructor(game, x, y)
  {
    super(game, null, null, x, y, true, false);
    this.sprite = null;
    this.bulletEmitters = [];
  }
  _setBulletEmitters(bulletEmitters)
  {
    bulletEmitters.forEach((bulletEmitter) =>
    {
      bulletEmitter.initSpawnSpeed = this.speed;
      bulletEmitter.setParticlesCollisionGroup(WallSprite.CollisionID);
      bulletEmitter.spawnOffset = new Point(this.game.gameWorld.tileSize / 4,
        this.game.gameWorld.tileSize / 4);
      this.addChild(bulletEmitter);
      this.game.gameWorld.collisionGrid.addSprites(bulletEmitter.particleSprites);
      bulletEmitter.spawnPosition = this.sprite.position;
      this.bulletEmitters.push(bulletEmitter);
    });

  }
  reset()
  {
    super.reset();
    this.bulletEmitters.forEach((bulletEmitter) =>
    {
      bulletEmitter.particleSprites.forEach((particleSprite) =>
      {
        if(particleSprite.visible)
        {
          particleSprite.setFinished()
        }
      });
      bulletEmitter.setEmitting(false);
    });

  }
}

class PlayerSpriteGroup extends SpriteGroup
{
  constructor(game, x, y, spriteArgs)
  {
    super(game, x, y);
    let bulletSprite = new BulletSprite(game,Sprite.Type.SPRITE_SHEET,['b0', 'b1'], 0, 0, false, 2);
    let bulletEmitters = [];
    let megaGunCallback = (activated) =>
    {
      let damage = 20;
      let frameIndex = 0
      if(activated)
      {
        damage = 40;
        frameIndex = 1;
      }
      this.bulletEmitters.forEach((bulletEmitter) =>
      {
        bulletEmitter.particleSprites.forEach((bullet) =>
        {
          bullet.damage = damage;
          bullet.setFrame(frameIndex);
        })
      });
    }
    for(let i = 0; i < 3; i++)
    {
      bulletEmitters.push(new ParticleEmitter(game, 0, 0, false, bulletSprite, 20, 0.4, 64, 64, 1));
      bulletEmitters[i].particleSprites.forEach((sprite) =>
      {
        sprite.onCollide.addListener(sprite, (thisSprite) =>
            {
              thisSprite.setFinished();
            }, true);
      });
    }
    this.sprite = new PlayerSprite(spriteArgs.game,
        spriteArgs.x, spriteArgs.y, spriteArgs.animated);
    this._setBulletEmitters(bulletEmitters);
    this.addChild(this.sprite);
    this.sprite.onMegaGunChanged.addListener(this, megaGunCallback, true);
  }
  set(objectArgs)
  {
    super.set({game: objectArgs.game, x: objectArgs.x, y: objectArgs.y});
    this.sprite.set(objectArgs.spriteArgs);
  }
  reset()
  {
    super.reset();
    this.sprite.reset();
  }
}

class CharacterSprite extends Sprite
{
  constructor(game, frames, x, y, animated)
  {
    super(game, Sprite.Type.SPRITE_SHEET, frames, x, y, false, animated);
    this.hitAlphaTween = this.game.gameWorld.addTween(new AlphaTween(this, 0.1, 1, Tween.CONST_SPEED, 1, 0.2));
    this.terminateTween = this.game.gameWorld.addTween
        (new ScaleTween(this, 0.3, 0, Tween.CONST_ACCEL, new Point(1, 1),
        new Point(0, 0)));
    this.terminateTween.onComplete = () =>
        {
          this.terminate();
          this.scale.x = this.scale.y = 1;
          this.health = 100;
        };
    this.onTerminated = new Signal(game, this);
    this.spawnScaleTween = this.game.gameWorld.addTween
        (new ScaleTween(this, 0.3, 0, Tween.CONST_ACCEL,
        new Point(0, 0), new Point(1, 1)));
    this.damage = 0;
  }
  doHit(collisionSprite)
  {
    this.hitAlphaTween.active = true;

    if(collisionSprite.setFinished)
    {
      collisionSprite.setFinished();
    }
    this.health -= collisionSprite.damage;
  }
  terminate()
  {
    this.setVisible(false);
    this.onTerminated.dispatch(this);
  }
}

class PlayerTop extends Sprite
{
  constructor(game, x, y)
  {
    super(game, Sprite.Type.SPRITE_SHEET, 't', x, y, true, false);
    this.scale.x = 0.75;
  }
}

class PlayerSprite extends CharacterSprite
{
  static get CollisionID()
  {
    return 1 << 1;
  }
  constructor(game, x, y, animated)
  {
    super(game, 'p', x, y, animated);
    this._vec = new Point(0, 0);
    this._shootVec = new Point(0, 0);
    this.normalMoveSpeed = this.game.gameWorld.tileSize;
    this.fasterMoveSpeed = this.normalMoveSpeed * 1.5;
    this.moveSpeed = this.normalMoveSpeed;
    this.onMegaGunChanged = new Signal(game, this);

    this.collisionGroup = PlayerSprite.CollisionID + EnemySprite.CollisionID +
        WallSprite.CollisionID + EnemyBulletSprite.CollisionID + PowerUp.CollisionID;

    this.onCollide.addListener(this, (sprite, collisionSprite) =>
        {
          if(collisionSprite.constructor.CollisionID === EnemyBulletSprite.CollisionID)
          {
            this.doHit(collisionSprite);
          }
          if(collisionSprite.constructor.CollisionID === PowerUp.CollisionID)
          {
            this.game.levelData.powerUpsGroup.removePowerUp(collisionSprite);
            this._handlePowerUp(collisionSprite);
          }
          if(collisionSprite.constructor.CollisionID === EnemySprite.CollisionID &&
              !this.contactDamageTimer.active)
          {
            this.doHit(collisionSprite)
          }
        }, true);

    this.keyStates =
    {
      left: false,
      right: false,
      up: false,
      down: false,
      shootLeft: false,
      shootRight: false,
      shootUp: false,
      shootDown: false
    }

    this.events.onKeyDown = ((event) =>
    {
      if(event.key === 'd' || event.key === 'D')
      {
        this.keyStates.right = true;
      }
      else if(event.key === 'a' || event.key === 'A')
      {
        this.keyStates.left = true;
      }
      if(event.key === 'w' || event.key === 'W')
      {
        this.keyStates.up = true;
      }
      else if(event.key === 's' || event.key === 'S')
      {
        this.keyStates.down = true;
      }

      if(event.keyCode === 39)
      {
        this.keyStates.shootRight = true;
      }
      else if(event.keyCode === 37)
      {
        this.keyStates.shootLeft = true;
      }

      if(event.keyCode === 38)
      {
        this.keyStates.shootUp = true;
      }
      else if(event.keyCode === 40)
      {
        this.keyStates.shootDown = true;
      }
      this._doSpeed();
      this._doShooting();

    });
    this.events.onKeyUp = ((event) =>
    {

      if(event.key === 'd' || event.key === 'D')
      {
        this.keyStates.right = false;
      }
      else if(event.key === 'a' || event.key === 'A')
      {
        this.keyStates.left = false;
      }
      else if(event.key === 'w' || event.key === 'W')
      {
        this.keyStates.up = false;
      }
      else if(event.key === 's' || event.key === 'S')
      {
        this.keyStates.down = false;
      }

      if(event.keyCode === 39)
      {
        this.keyStates.shootRight = false;
      }
      else if(event.keyCode === 37)
      {
        this.keyStates.shootLeft = false;
      }
      else if(event.keyCode === 38)
      {
        this.keyStates.shootUp = false;
      }
      else if(event.keyCode === 40)
      {
        this.keyStates.shootDown = false;
      }
      this._doSpeed();
      this._doShooting();
    });

    this.contactDamageTimer = new Timer(2);
    this.game.gameWorld.timers.push(this.contactDamageTimer);
    this.contactDamageTimer.onComplete = () =>
    {
      this.contactDamageTimer.reset(false);
    }

    let spreadFirePowerUpHandler = () =>
    {
      if(this.parent.bulletEmitters[1].emitting)
      {
        this._doShooting(true);
      }
    }

    let healthPowerUpHandler = () =>
    {
      this.health = 100;
      this.onHealthChanged.dispatch(this.health);
    };

    let nukePowerUpHandler = () =>
    {
      this.game.levelData.enemySprites.forEach((sprite) =>
      {
        if(sprite.visible)
        {
          sprite.terminate();
        }
      });
      this.onNukeDetonated.dispatch();
    };


    let speedPowerUpHandler = () =>
    {
      this.moveSpeed = this.fasterMoveSpeed;
      this._doSpeed(true);
    };


    let megaGunPowerUpHandler = () =>
    {
      this.onMegaGunChanged.dispatch(true);
    };

    this.powerUpRegisters =
    {
      spreadFirePowerUpRegister: {id: SpreadFirePowerUp.PowerUpID,
          timer: new Timer(SpreadFirePowerUp.Duration), handler: spreadFirePowerUpHandler},
      healthPowerUpRegister: {id: HealthPowerUp.PowerUpID, timer: null,
          handler: healthPowerUpHandler},
      nukePowerUpRegister: {id: NukePowerUp.PowerUpID, timer: null,
          handler: nukePowerUpHandler},
      speedPowerUpRegister: {id: SpeedPowerUp.PowerUpID, timer: new Timer(NukePowerUp.Duration),
          handler: speedPowerUpHandler},
      megaGunPowerUpRegister: {id: MegaGunPowerUp.PowerUpID, timer: new Timer(MegaGunPowerUp.Duration),
          handler: megaGunPowerUpHandler}
    };
    for (var key in this.powerUpRegisters)
    {
      if(this.powerUpRegisters.hasOwnProperty(key))
      {
        let powerUpRegister = this.powerUpRegisters[key];
        if(powerUpRegister.timer)
        {
          this.game.gameWorld.timers.push(powerUpRegister.timer);
        }
      }
    }

    this.powerUpRegisters.spreadFirePowerUpRegister.timer.onComplete = (timer) =>
    {
      timer.reset(false);
      this.parent.bulletEmitters[0].setEmitting(false, 0);
      this.parent.bulletEmitters[2].setEmitting(false, 0);
    };
    this.powerUpRegisters.speedPowerUpRegister.timer.onComplete = (timer) =>
    {
      timer.reset(false);
      this.moveSpeed = this.normalMoveSpeed;
    };
    this.powerUpRegisters.megaGunPowerUpRegister.timer.onComplete = (timer) =>
    {
      timer.reset(false);
      this.onMegaGunChanged.dispatch(false);
    };
    this.onNukeDetonated = new Signal(game, this);
    this.onHealthChanged = new Signal(game, this);
    this.playerTop = new PlayerTop(game, 0, 0);
    this.addChild(this.playerTop);
  }
  _handlePowerUp(powerUp)
  {
    for (var key in this.powerUpRegisters)
    {
      if(this.powerUpRegisters.hasOwnProperty(key))
      {
        let powerUpRegister = this.powerUpRegisters[key];
        if(powerUpRegister.id === powerUp.constructor.PowerUpID)
        {
          if(powerUpRegister.timer)
          {
            powerUpRegister.timer.reset(true);
          }
          if(powerUpRegister.handler)
          {
            powerUpRegister.handler();
          }
        }
      }
    }
  }
  doHit(collisionSprite)
  {
    super.doHit(collisionSprite);
    if(collisionSprite.constructor.CollisionID === EnemySprite.CollisionID)
    {
      this.contactDamageTimer.reset(true);
    }
    this.onHealthChanged.dispatch(this.health);
  }
  set(objectArgs)
  {
    super.set(objectArgs);
    this.setVisible(true);
  }
  reset()
  {
    super.reset();
    this.onNukeDetonated.listeners.length = 0;
    this.onHealthChanged.listeners.length = 0;
    this.onTerminated.listeners.length = 0;
    this._shootVec.x = this._shootVec.y = 0;
    this._vec.x = this._vec.y = 0;
    for (var key in this.keyStates)
    {
      if (this.keyStates.hasOwnProperty(key))
      {
        this.keyStates[key] = false;
      }
    }
  }
  setGridPos(newGridPos)
  {
    super.setGridPos(newGridPos);
  }
  _doSpeed(override = false)
  {
    let oldVec = new Point(this._vec.x, this._vec.y);
    if(this.keyStates.left && !this.keyStates.right)
    {
      this._vec.x = -1;
    }
    else if(this.keyStates.right && !this.keyStates.left)
    {
      this._vec.x = 1;
    }
    else
    {
      this._vec.x = 0;
    }
    if(this.keyStates.up && !this.keyStates.down)
    {
      this._vec.y = -1;
    }
    else if(this.keyStates.down && !this.keyStates.up)
    {
      this._vec.y = 1;
    }
    else
    {
      this._vec.y = 0;
    }
    if(override || !this._vec.compare(oldVec))
    {
      let ang = Math.atan2(this._vec.y, this._vec.x);
      this.speed.x = Math.cos(ang) * this.moveSpeed * Math.abs(this._vec.x);
      this.speed.y = Math.sin(ang) * this.moveSpeed * Math.abs(this._vec.y);
    }
  }
  _doShooting(override = false)
  {
    let oldVec = new Point(this._shootVec.x, this._shootVec.y);
    if(this.keyStates.shootLeft && !this.keyStates.shootRight)
    {
      this._shootVec.x = -1;
    }
    else if(this.keyStates.shootRight && !this.keyStates.shootLeft)
    {
      this._shootVec.x = 1;
    }
    else
    {
      this._shootVec.x = 0;
    }
    if(this.keyStates.shootUp && !this.keyStates.shootDown)
    {
      this._shootVec.y = -1;
    }
    else if(this.keyStates.shootDown && !this.keyStates.shootUp)
    {
      this._shootVec.y = 1;
    }
    else
    {
      this._shootVec.y = 0;
    }
    if(override || !this._shootVec.compare(oldVec))
    {
      if(this._shootVec.x || this._shootVec.y)
      {
        let shootAng = Math.atan2(this._shootVec.y, this._shootVec.x);
        this.playerTop.angle = shootAng + (Math.PI / 2);
        if(this.powerUpRegisters.spreadFirePowerUpRegister.timer.active)
        {
          let angInc = 0.35;
          shootAng -= angInc;
          this.parent.bulletEmitters.forEach((bulletEmitter, index) =>
          {
             bulletEmitter.setEmitting(true, shootAng);
             shootAng += angInc;
          });
        }
        else
        {
          this.parent.bulletEmitters[1].setEmitting(true, shootAng);
        }

      }
      else
      {
        this.parent.bulletEmitters.forEach((bulletEmitter) =>
        {
          bulletEmitter.setEmitting(false, 0);
        });
      }
    }

  }
  update(deltaTime)
  {
    super.update(deltaTime);
    if(this.game.levelData.HUDGroup.healthLabel.value === 0 && !this.terminateTween.active)
    {
      this.terminateTween.active = true;
    }
  }
}

class EnemySpriteGroup extends SpriteGroup
{
  constructor(game, x, y)
  {
    super(game, x, y);
    this.givesScore = 100;
    this.givesScoreLabel = new Label(game, 0, 0, "+" + this.givesScore);
    this.addChild(this.givesScoreLabel);
    this.tweenContainer = this.game.gameWorld.addTween(new TweenContainer());
    this.givesScoreLabel.setVisible(false);
  }
  initGivesScore()
  {
    this.tweenContainer.addTween(new MoveTween(this.givesScoreLabel, 1, 0,
    Tween.CONST_SPEED, new Point(0, 0), new Point(0, this.game.gameWorld.tileSize * -2)));
    this.tweenContainer.addTween(new AlphaTween(this.givesScoreLabel, 1, 0, Tween.CONST_SPEED, 1, 0));
    let tweenCallback = () =>
    {
      this.givesScoreLabel.alpha = 1;
      this.givesScoreLabel.setVisible(false);
    };
    let callback = () =>
    {
      this.givesScoreLabel.position.setTo(this.sprite.position);
      this.tweenContainer.tweens[0].setStartEnd(this.givesScoreLabel.position,
          new Point(this.givesScoreLabel.position.x, this.givesScoreLabel.position.y - this.game.gameWorld.tileSize * 2));
      this.tweenContainer.activateTweens();
      this.givesScoreLabel.setVisible(true);
      this.tweenContainer.tweens[1].onComplete = tweenCallback;
      this.game.levelData.HUDGroup.scoreLabel.countTo
          (this.game.levelData.HUDGroup.scoreLabel.countToValue + this.givesScore);
    };
    this.sprite.onTerminated.addListener(this, callback, true);
  }
}

class BasicEnemySpriteGroup extends EnemySpriteGroup
{
  constructor(game, x, y, spriteArgs)
  {
    super(game, x, y);
    this.sprite = new BasicEnemySprite(spriteArgs.game, spriteArgs.x, spriteArgs.y);
    this.addChild(this.sprite);
    this.initGivesScore();
  }
}

class ShootingEnemySpriteGroup extends EnemySpriteGroup
{
  constructor(game, x, y, spriteArgs)
  {
    super(game, x, y);
    let bulletSprite = new EnemyBulletSprite(game,Sprite.Type.SPRITE_SHEET,'b2', 0, 0, false, 2,
        function()
        {
          this.setFinished();
        });
    let bulletEmitter = new ParticleEmitter(game, 0, 0, false, bulletSprite, 20, 3, 64, 64, 1);
    bulletEmitter.particleSprites.forEach((sprite) =>
    {
      sprite.onCollide.addListener(sprite, (thisSprite) =>
          {
            thisSprite.setFinished();
          }, true);
    });
    this.sprite = new ShootingEnemySprite(spriteArgs.game, spriteArgs.x, spriteArgs.y);
    this._setBulletEmitters([bulletEmitter]);
    this.addChild(this.sprite);
    this.initGivesScore();
  }
}

class InnerCircle extends Sprite
{
  constructor(game, x, y)
  {
    super(game, Sprite.Type.SPRITE_SHEET, 'cR', x, y, true, false);
    this.tweenContainer = this.game.gameWorld.addTween(new TweenContainer);
    this.tweenContainer.addTween(new ScaleTween(this, 1, 1, Tween.CONST_ACCEL,
        new Point(1, 1), new Point (0.1, 0.1)));
    let alphaTween = new AlphaTween(this, 1, 1, Tween.CONST_ACCEL,
        1, 0.1);
    this.tweenContainer.addTween(alphaTween);
    alphaTween.onComplete = () =>
    {
      this.tweenContainer.activateTweens();
    };
  }
}

class EnemySprite extends CharacterSprite
{
  static get CollisionID()
  {
    return 1 << 2;
  }
  static get EnemySpriteID()
  {
    return -1;
  }
  constructor(game, frames, x, y, animated)
  {
    super(game, frames, x, y, animated);
    this.powerUpsGroup = game.levelData.powerUpsGroup;
    this.moveSpeed = this.game.gameWorld.tileSize * 0.9;
    this.playerSprite = null;
    this.gridPathFinderPools = game.levelData.gridPathFinderPools;
    this.gridPathFinder = null;
    this.collisionGroup = PlayerSprite.CollisionID + EnemySprite.CollisionID
        + BulletSprite.CollisionID;
    this.gridPathIndex = 0;

    this.onCollide.addListener(this, (sprite, collisionSprite) =>
        {
          if(collisionSprite.constructor.CollisionID === BulletSprite.CollisionID)
          {
            this.doHit(collisionSprite);
          }
        }, true);
    this.gridPath = null;
    this.powerUpProbability = 1 / 4;
    this.availablePowerUps = [{id: 0, val: 1/5}, {id: 1, val: 1/5}, {id: 2, val: 1/5}, {id: 3, val: 1/5}, {id: 4, val: 1/5}];
    this.innerCircle = new InnerCircle(game, x, y);
    this.addChild(this.innerCircle);
    this.innerCircle.tweenContainer.activateTweens();
    this.damage = 20;
  }
  terminate()
  {
    super.terminate();
    this._doDropPowerUp();
  }
  _doDropPowerUp()
  {
    if(Math.random() <  this.powerUpProbability)
    {
      let rnd = Math.random();
      let lastVal = 0;
      let nextVal = 0;
      this.availablePowerUps.some((obj) =>
      {
        nextVal += obj.val;
        if(rnd >= lastVal && rnd < nextVal)
        {
          this.powerUpsGroup.addPowerUp(obj.id,
              new Point(this.position.x + ((this.width - this.game.gameWorld.tileSize / 1.5) / 2),
              this.position.y + ((this.height - this.game.gameWorld.tileSize / 1.5) / 2)));
          return true;
        }
        lastVal = nextVal;
      });
    }
  }
  doHit(collisionSprite)
  {
    super.doHit(collisionSprite);
    if(this.health <= 0)
    {
      this.terminateTween.active = true;
    }
  }
  createGridPath(from, to, collisionGroup)
  {
    if(this.gridPathFinder)
    {
      this.gridPathFinderPools.gridPathFinderPool.free(this.gridPathFinder);
    }
    this.gridPathFinder = this.gridPathFinderPools.gridPathFinderPool.obtain({fillGrid: this.game.gameWorld.collisionGrid,
    start: new Point(from.x, from.y), end: new Point(to.x, to.y), gridPaths: null,branchStart: null,
    gridSquarePool: this.gridPathFinderPools.gridSquarePool,
    gridPathPool: this.gridPathFinderPools.gridPathPool, collisionGroup: collisionGroup});
    return this.gridPathFinder.gridPaths[this.gridPathFinder.process().pathIndex];
  }
  setSpeedFromGridPos()
  {
    let gridSquare = this.gridPath.gridSquares[this.gridPathIndex];
    let direction = this.game.gameWorld.collisionGrid.directionObj.directions[gridSquare.direction - 1];
    let movAng = Math.atan2(direction.point.y, direction.point.x);
    this.speed.x = Math.cos(movAng) * this.moveSpeed * Math.abs(direction.point.x);
    this.speed.y = Math.sin(movAng) * this.moveSpeed * Math.abs(direction.point.y);
    this.gridPathIndex ++;
  }
  getCurrentGridSquare()
  {
    return ArrayFunctions.FindObject(this.gridPath.gridSquares, true, (gridSquare) =>
    {
      return gridSquare.position.compare(this.gridPos);
    });
  }
  handleNewGridPath()
  {
    this.gridPath = this.createGridPath(this.gridPos,
        this.playerSprite.gridPos, this.constructor.CollisionID);
    this.gridPathIndex = 0;
    this.setSpeedFromGridPos();
  }
  update(deltaTime)
  {
    //get current grid coordinate
    super.update(deltaTime);

    if((this.collidingX && this.speed.x && !this.speed.y) || (this.collidingY && this.speed.y && !this.speed.x) ||
        this.speed.x && this.speed.y && this.collidingX || this.collidingY)
    {
      this.handleNewGridPath();
    }

    if(this.speed.x === 0 && this.speed.y === 0)
    {
      this.handleNewGridPath();
    }

  }
  setGridPos(newGridPos)
  {
    super.setGridPos(newGridPos);
    this.handleNewGridPath();
  }
}

class BasicEnemySprite extends EnemySprite
{
  static get EnemySpriteID()
  {
    return 0;
  }
  constructor(game,x, y)
  {
    super(game, ['e1'],x,y, false);
  }
}

class ShootingEnemySprite extends EnemySprite
{
  static get EnemySpriteID()
  {
    return 1;
  }
  constructor(game, x, y)
  {
    super(game, ['e2'], x, y, false);
  }
  update(deltaTimeSec)
  {
    super.update(deltaTimeSec);
    let angTo = Math.atan2(this.playerSprite.centre.y - this.centre.y,
        this.playerSprite.centre.x - this.centre.x);
    let shootAng = Math.round((4 / Math.PI) * angTo) * (Math.PI / 4);
    if(!this.parent.bulletEmitters[0].emitting && this.visible)
    {
      this.parent.bulletEmitters[0].setEmitting(true, shootAng);
    }
    else
    {
      this.parent.bulletEmitters[0].spawnAngle = shootAng;
    }

  }
  setVisible(visible)
  {
    super.setVisible(visible);
    if(!visible)
    {
      this.parent.bulletEmitters[0].setEmitting(false, 0);
    }
  }
}

class BasicEnemySpriteGroupPool extends Pool
{
  constructor()
  {
    super();
  }
  newObject(objectArgs)
  {
    return new BasicEnemySpriteGroup(objectArgs.game, objectArgs.x, objectArgs.y,
        objectArgs.spriteArgs);
  }
}

class ShootingEnemySpriteGroupPool extends Pool
{
  constructor()
  {
    super();
  }
  newObject(objectArgs)
  {
    return new ShootingEnemySpriteGroup(objectArgs.game, objectArgs.x, objectArgs.y,
        objectArgs.spriteArgs);
  }
}

class OfflineButtonPool extends Pool
{
  constructor()
  {
    super();
  }
  newObject(objectArgs)
  {
    return new OfflineButton(objectArgs.game, objectArgs.x, objectArgs.y);
  }
}

class SpawnPointPool extends Pool
{
  constructor()
  {
    super();
  }
  newObject(objectArgs)
  {
    return new SpawnPoint(objectArgs.game, objectArgs.id, objectArgs.x, objectArgs.y,
        objectArgs.total);
  }
}

class PlayerSpriteGroupPool extends Pool
{
  constructor()
  {
    super();
  }
  newObject(objectArgs)
  {
    return new PlayerSpriteGroup(objectArgs.game,
        objectArgs.x, objectArgs.y, objectArgs.spriteArgs);
  }
}

class SpreadFirePowerUpPool extends Pool
{
  constructor()
  {
    super();
  }
  newObject(objectArgs)
  {
    return new SpreadFirePowerUp(objectArgs.game, objectArgs.x, objectArgs.y);
  }
}
class HealthPowerUpPool extends Pool
{
  constructor()
  {
    super();
  }
  newObject(objectArgs)
  {
    return new HealthPowerUp(objectArgs.game, objectArgs.x, objectArgs.y);
  }
}

class SpeedPowerUpPool extends Pool
{
  constructor()
  {
    super();
  }
  newObject(objectArgs)
  {
    return new SpeedPowerUp(objectArgs.game, objectArgs.x, objectArgs.y);
  }
}

class NukePowerUpPool extends Pool
{
  constructor()
  {
    super();
  }
  newObject(objectArgs)
  {
    return new NukePowerUp(objectArgs.game, objectArgs.x, objectArgs.y);
  }
}

class MegaGunPowerUpPool extends Pool
{
  constructor()
  {
    super();
  }
  newObject(objectArgs)
  {
    return new MegaGunPowerUp(objectArgs.game, objectArgs.x, objectArgs.y);
  }
}

class PowerUpsGroupPool extends Pool
{
  constructor()
  {
    super();
  }
  newObject(objectArgs)
  {
    return new PowerUpsGroup(objectArgs.game, objectArgs.x, objectArgs.y);
  }
}

class Label extends Sprite
{
  constructor(game, x, y, initValue = "", fillStyle = 'Black')
  {
    super(game, Sprite.Type.TEXT,
        {font: 'bold 32px serif', text: initValue, fillStyle: fillStyle}, x, y, true, false);
  }
}

class LabelGroup extends Sprite
{
  constructor(game, x, y, labels = 10)
  {
    super(game, null, null, x, y, true, false);
    //create 10 labels by default
    for(let i = 0; i < labels; i++)
    {
      this.addChild(new Label(game, 0, 0, "", MyGame.Palette.black));
    }
    this.packLabels();
  }
  packLabels()
  {
    //assume labels are 1 tile high
    this.children.forEach((child, index) =>
    {
      child.position.y = index * this.game.gameWorld.tileSize;
    });
  }
  setLabelTexts(texts)
  {
    this.children.forEach((child) =>
    {
      child.frame.text = '';
    });
    texts.forEach((text, index) =>
    {
      this.children[index].frame.text = text;
    });
  }
}

class CountingLabel extends Label
{
  constructor(game, x, y, initValue = 0, fillStyle = 'Black', period = 0.1)
  {
    super(game, x, y, initValue, fillStyle);
    this.value = initValue;
    this.countToValue = this.value;
    this.period = period;
    this.countTimer = new Timer(this.period);
    this.game.gameWorld.timers.push(this.countTimer);
    this.countTimer.onComplete = (timer) =>
    {
      if(this.countToValue > this.value)
      {
        this.value ++;
      }
      else if(this.countToValue < this.value)
      {
        this.value --;
      }
      if(this.countToValue !== this.value)
      {
        timer.reset(true);
      }
      this.frame.text = this.value;
      this.width = this.game.measureTextWidth(this.frame);
    };
  }
  countTo(newValue)
  {
    this.countToValue = newValue;
    this.countTimer.reset(true);
  }
  setTo(value)
  {
    this.value = this.countToValue = value;
    this.countTimer.reset(false);
    this.frame.text = this.value
  }
}

class BulletSprite extends ParticleSprite
{
  static get CollisionID()
  {
    return 1 << 4;
  }
  constructor(game,type,frame, x, y, animated, lifeSpan, size = 16)
  {
    super(game, type, frame, x, y, animated, lifeSpan, size);
    this.damage = 20;
  }
}

class EnemyBulletSprite extends BulletSprite
{
  static get CollisionID()
  {
    return 1 << 5;
  }
  constructor(game,type,frame, x, y, animated, lifeSpan, size = 16)
  {
    super(game, type, frame, x, y, animated, lifeSpan, size);
  }
}

class PowerUp extends Sprite
{
  static get CollisionID()
  {
    return 1 << 6;
  }
  static get PowerUpID()
  {
    return -1;
  }
  static get Duration()
  {
    return 10;
  }
  constructor(game, x, y, symbol)
  {
    super(game, Sprite.Type.SPRITE_SHEET, ['pU0', 'pU1'], x, y, true, true);
    this.animRate = 1 / 5;
    let symbolSprite = new Sprite(game, Sprite.Type.TEXT,
        {font: '18px serif', text: symbol, fillStyle: MyGame.Palette.black}, 4, -15, true, false);
    this.addChild(symbolSprite);
    this.width = this.height = this.game.gameWorld.tileSize / 1.5;
    this.collisionWidth = this.collisionHeight = 1;
    this.scaleTween = this.game.gameWorld.addTween(new ScaleTween(this, 1, -1,
        Tween.CONST_ACCEL, this.scale,
        new Point(1.2, 1.2)));
    this.scaleTween.active = true;
  }
}

class SpreadFirePowerUp extends PowerUp
{
  static get PowerUpID()
  {
    return 0;
  }
  constructor(game, x, y)
  {
    super(game, x, y, 'S');
  }
}

class HealthPowerUp extends PowerUp
{
  static get PowerUpID()
  {
    return 1;
  }
  constructor(game, x, y)
  {
    super(game, x, y, 'H');
  }
}

class NukePowerUp extends PowerUp
{
  static get PowerUpID()
  {
    return 2;
  }
  constructor(game, x, y)
  {
    super(game, x, y, 'N');
  }
}

class SpeedPowerUp extends PowerUp
{
  static get PowerUpID()
  {
    return 3;
  }
  constructor(game, x, y)
  {
    super(game, x, y, 'F');
  }
}

class MegaGunPowerUp extends PowerUp
{
  static get PowerUpID()
  {
    return 4;
  }
  constructor(game, x, y)
  {
    super(game, x, y, 'M');
  }
}

var myGame = new MyGame(17, 17, 32);
myGame.preload();
