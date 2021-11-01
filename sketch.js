var player, playerImg, playerHurtImg, playerCollectImg, playerInvincibleImg;
var tank, tankImg, tankMode = false, spawnTankTime = 0, tankModeTime, baseTankModeTime = 60, tankSpeed = 4;
var enemy1,enemy2 ,enemy3 ,enemy4 ,enemy5 ,enemyImage;
var boss, bossImage, bossHealth = 1, bossHasSpawned = false, bossTurnSpeed = 10, bossMaxHealth = 1, bossName;
var coin,coinImg;
var gun, gunImg;
var bullet, bulletImg;
var randomDir1, randomDir2, randomDir3, randomDir4, randomDir5, randomDirBoss;
var life = 3;
var resetColor;
var gameState = 1;
var shootTimer = 0;
var score;
var GameOverText;
var RestartText;
var levelText;
var livesText;
var coinCount = 0;
var edge1, edge2, edge3, edge4;
var level = 1;
var enemiesAlive = 1;
var invincibilityPeriod = 0;
var levelStarted = true, enemiesSpawned = 1;
var enemySpeed = 3;
var turnSpeed = 30;
var playerSpeed = 5;
var shieldTime = 20;
var slowDownTime = 5;
var freezeTime = 0, freezeAll = false, baseFreeze = 20;
var nextTimeToFreeze = 0, nextTimeToInvincible  = 0, nextTimeToTank = 500;
var freezeReadyText, invincibileReadyText, tankReadyText;
var isFreezeReady, isInvincibileReady, isTankReady;
var fillFreeze = baseFreeze, fillInvincibilty = invincibilityPeriod, fillTank = baseTankModeTime;
var pauseText, isPaused = false;

let x = 1;
let y = 1;
let easing = 0.3;

var x1,x2,x3,x4,x5,x6;
var y1,y2,y3,y4,y5,y6;

let gameIconImage;
let visiblity = 255;

let song = [];
let index= 0;

//Variables for the shopsystem
var speedText, lifeText, shieldText, freezeText, shopText, tankText;
var speedCostText, lifeCostText, shieldCostText, freezeCostText, tankCostText;
var speedCost = 20, lifeCost = 50, shieldCost = 30, freezeCost = 10, tankCost = 40;
var shopButton, speedButton, lifeButton, shieldButton, freezeButton, tankButton, backButton;

//Variables for controls/options
var optionsButton, musicSlider, musicText;
var controlsText;
var forwardInput,backInput, leftInput, rightInput,freezeInput,invincibileInput, TankInput;
var forwardText,backText, leftText, rightText,freezeInpText,invincibileInpText, TankInpText;
var enableBarsText, enableBarsBox;

//Variables for about/help 
var helpButton;
var helpText1, helpText2, helpText3, helpText4, helpText5, helpText6;

function preload(){
    gunImg = loadImage("Gun.png");
    bulletImg = loadImage("bullet.png")
    playerImg = loadImage("Player.png");
    playerHurtImg = loadImage("PlayerHurt.png");
    playerCollectImg = loadImage("PlayerCollect.png");
    playerInvincibleImg = loadImage("PlayerInvincible.png");
    enemyAnimation = loadAnimation("Enemy1.png","Enemy2.png");
    coinImg = loadImage("Coin.png");
    bossImage = loadImage("Boss.png");
    tankImg = loadImage("tank.png");
    gameIconImage = loadImage("Icon.png");

    song[0] = loadSound("Song1.mp3");
    song[1] = loadSound("Song2.mp3");
    song[2] = loadSound("Song3.mp3");
    song[3] = loadSound("Song4.mp3");
}

function setup(){
    createCanvas(600,600);

    song[0].play();
    index = 0

    player = createSprite(300,300,50,50);
    player.addImage(playerHurtImg);
    player.addImage(playerCollectImg);
    player.addImage(playerInvincibleImg);
    player.addImage(playerImg);
    player.scale = 0.7;

    gun = createSprite(player.x,player.y+10,50,50);
    gun.addImage(gunImg)
    gun.scale = 0.1;

    weakEnemiesGroup = new Group();
    bulletsGroup = new Group()
    coinsGroup = new Group(); 

    //Top Edge
    edge1 = createSprite(0,0,1200,20);
    //Bottom Edge
    edge2 = createSprite(0,600,1200,20);
    //Left Edge
    edge3 = createSprite(0,0,20,1200);
    //Right Edge
    edge4 = createSprite(600,0,20,1200);

    edge1.shapeColor = "black";
    edge2.shapeColor = "black";
    edge3.shapeColor = "black";
    edge4.shapeColor = "black";

    freezeTime = baseFreeze;

    UI();
    createEnemies();
    lateDraw();
}

function createBullets(x,y){
    bullet = createSprite(x,y,20,20);
    bullet.addImage(bulletImg);
    bullet.scale = 0.3;
    bullet.lifetime = 50;
    bullet.rotation = gun.rotation;
    bullet.setSpeedAndDirection(10,gun.rotation);
    bulletsGroup.add(bullet);
}

function createTankBullets(x,y){
    bullet = createSprite(x,y,20,20);
    bullet.addImage(bulletImg);
    bullet.scale = 0.3;
    bullet.lifetime = 50;
    bullet.rotation = 270;
    bullet.setSpeedAndDirection(10);
    bulletsGroup.add(bullet);
}

function createEnemies(){
    randomX1 = Math.round(random(10,590));
    randomY1 = Math.round(random(10,590));  
    randomX2 = Math.round(random(10,590));
    randomY2 = Math.round(random(10,590));  
    randomX3 = Math.round(random(10,590));
    randomY3 = Math.round(random(10,590));  
    randomX4 = Math.round(random(10,590));
    randomY4 = Math.round(random(10,590));  
    randomX5 = Math.round(random(10,590));
    randomY5 = Math.round(random(10,590));  

    if(enemiesAlive === 1){
        enemy1 = createSprite(randomX1,randomY1,30,30);
        enemy1.addAnimation("Walk",enemyAnimation);
        enemy1.scale = 0.65;
    
        weakEnemiesGroup.add(enemy1);

        x2 = enemy1.x;
        y2 = enemy1.y;
    }

    if(enemiesAlive === 2){
        enemy1 = createSprite(randomX1,randomY1,30,30);
        enemy1.addAnimation("Walk",enemyAnimation);
        enemy1.scale = 0.65;

        enemy2 = createSprite(randomX2,randomY2,30,30);
        enemy2.addAnimation("Walk",enemyAnimation);
        enemy2.scale = 0.65;

        weakEnemiesGroup.add(enemy1);
        weakEnemiesGroup.add(enemy2);

        x2 = enemy1.x;
        y2 = enemy1.y;
        x3 = enemy2.x;
        y3 = enemy2.y;
    }

    if(enemiesAlive === 3){
        enemy1 = createSprite(randomX1,randomY1,30,30);
        enemy1.addAnimation("Walk",enemyAnimation);
        enemy1.scale = 0.65;

        enemy2 = createSprite(randomX2,randomY2,30,30);
        enemy2.addAnimation("Walk",enemyAnimation);
        enemy2.scale = 0.65;

        enemy3 = createSprite(randomX3,randomY3,30,30);
        enemy3.addAnimation("Walk",enemyAnimation);
        enemy3.scale = 0.65;

        weakEnemiesGroup.add(enemy1);
        weakEnemiesGroup.add(enemy2);
        weakEnemiesGroup.add(enemy3);

        x2 = enemy1.x;
        y2 = enemy1.y;
        x3 = enemy2.x;
        y3 = enemy2.y;
        x4 = enemy3.x;
        y4 = enemy3.y;
    }

    if(enemiesAlive === 4){
        enemy1 = createSprite(randomX1,randomY1,30,30);
        enemy1.addAnimation("Walk",enemyAnimation);
        enemy1.scale = 0.65;

        enemy2 = createSprite(randomX2,randomY2,30,30);
        enemy2.addAnimation("Walk",enemyAnimation);
        enemy2.scale = 0.65;

        enemy3 = createSprite(randomX3,randomY3,30,30);
        enemy3.addAnimation("Walk",enemyAnimation);
        enemy3.scale = 0.65;

        enemy4 = createSprite(randomX4,randomY4,30,30);
        enemy4.addAnimation("Walk",enemyAnimation);
        enemy4.scale = 0.65;
        
        weakEnemiesGroup.add(enemy1);
        weakEnemiesGroup.add(enemy2);
        weakEnemiesGroup.add(enemy3);
        weakEnemiesGroup.add(enemy4);

        x2 = enemy1.x;
        y2 = enemy1.y;
        x3 = enemy2.x;
        y3 = enemy2.y;
        x4 = enemy3.x;
        y4 = enemy3.y;
        x5 = enemy4.x;
        y5 = enemy4.y;
    }

    if(enemiesAlive === 5){
        enemy1 = createSprite(randomX1,randomY1,30,30);
        enemy1.addAnimation("Walk",enemyAnimation);
        enemy1.scale = 0.65;

        enemy2 = createSprite(randomX2,randomY2,30,30);
        enemy2.addAnimation("Walk",enemyAnimation);
        enemy2.scale = 0.65;

        enemy3 = createSprite(randomX3,randomY3,30,30);
        enemy3.addAnimation("Walk",enemyAnimation);
        enemy3.scale = 0.65;

        enemy4 = createSprite(randomX4,randomY4,30,30);
        enemy4.addAnimation("Walk",enemyAnimation);
        enemy4.scale = 0.65;

        enemy5 = createSprite(randomX5,randomY5,30,30);
        enemy5.addAnimation("Walk",enemyAnimation);
        enemy5.scale = 0.65;

        weakEnemiesGroup.add(enemy1);
        weakEnemiesGroup.add(enemy2);
        weakEnemiesGroup.add(enemy3);
        weakEnemiesGroup.add(enemy4);
        weakEnemiesGroup.add(enemy5);

        
        x2 = enemy1.x;
        y2 = enemy1.y;
        x3 = enemy2.x;
        y3 = enemy2.y;
        x4 = enemy3.x;
        y4 = enemy3.y;
        x5 = enemy4.x;
        y5 = enemy4.y;
        x6 = enemy5.x;
        y6 = enemy5.y;
    }
}

function upgradeSpeed(){
    if(coinCount >= speedCost && playerSpeed < 12){
        playerSpeed += 1;
        coinCount -= speedCost;
        speedCost += 5;
        speedCostText.html(speedCost + " Coins");
    }

    if(playerSpeed === 12){
        speedCostText.html("Fully Upgraded");
    }
}

function upgradeLife(){
    if(coinCount >= lifeCost && life < 15){
        life += 1;
        coinCount -= lifeCost;
        lifeCostText.html(lifeCost + " Coins");
    }

    if(life === 15){
        lifeCostText.html("Max Lives");  
    }
}

function upgradeShield(){
   if(coinCount >= shieldCost && shieldTime < 45){
       shieldTime += 5;
       coinCount -= shieldCost;
       shieldCost += 15
       shieldCostText.html(shieldCost + " Coins");
    }

    if(shieldTime === 45){
        shieldCostText.html("Fully Upgraded");
    }
}

function upgradeFreezeTime(){
    if(coinCount >= freezeCost && baseFreeze < 45){
        baseFreeze += 5
        coinCount -= freezeCost;
        freezeCost += 10
        freezeCostText.html(freezeCost + " Coins");
    }
 
    if(baseFreeze === 45){
        freezeCostText.html("Fully Upgraded");
    } 

}

function upgradeTankTime(){
    if(coinCount >= tankCost && baseTankModeTime < 180){
        baseTankModeTime += 20;
        tankSpeed += 0.5;
        coinCount -= tankCost;
        tankCost += 25;
        tankCostText.html(tankCost + " Coins");
    }

    if(baseTankModeTime === 180){
        tankCostText.html("Fully Upgraded");
    }
}

function UI(){

    //All the UI for options
    //#region
    //Buttons & Sliders
    optionsButton = createButton("Options")
    optionsButton.position(670,10)

    musicSlider = createSlider(0,1,0.7,0.01);
    musicSlider.position(660,40);

    //Input
    forwardInput = createInput("W");
    forwardInput.position(700,130)
    forwardInput.size(20)

    leftInput = createInput("A");
    leftInput.position(700,160)
    leftInput.size(20)

    backwardInput = createInput("S");
    backwardInput.position(700,190)
    backwardInput.size(20)

    rightInput = createInput("D");
    rightInput.position(700,220)
    rightInput.size(20)

    invincibileInput = createInput("E");
    invincibileInput.position(700,250)
    invincibileInput.size(20)

    freezeInput = createInput("F");
    freezeInput.position(700,280)
    freezeInput.size(20)
  
    TankInput = createInput("T");
    TankInput.position(700,310)
    TankInput.size(20)

    //Check Box
    enableBarsBox = createCheckbox('', true);
    enableBarsBox.position(710, 70);

    //Text
    musicText = createElement("h4");
    musicText.html("Music");
    musicText.position(610,20);

    enableBarsText = createElement("h4");
    enableBarsText.html("Powerup Bars ")
    enableBarsText.position(610,50)

    controlsText = createElement("h3");
    controlsText.html("Controls");
    controlsText.position(610,80)

    forwardText = createElement("h4");
    forwardText.html("Forward")
    forwardText.position(610,110);

    leftText = createElement("h4");
    leftText.html("Left")
    leftText.position(610,140);

    backwardText = createElement("h4");
    backwardText.html("Backward")
    backwardText.position(610,170);

    rightText = createElement("h4");
    rightText.html("Right")
    rightText.position(610,200);

    invincibileInpText = createElement("h4");
    invincibileInpText.html("Invincibility")
    invincibileInpText.position(610,230);

    freezeInpText = createElement("h4");
    freezeInpText.html("Freeze")
    freezeInpText.position(610,260);
    
    TankInpText = createElement("h4");
    TankInpText.html("Tank")
    TankInpText.position(610,290);
    //#endregion

    //All the UI for shop system
    //#region
    shopButton = createButton("Shop");
    shopButton.position(610,10);

    backButton = createButton("Back");
    backButton.position(610,10);

    speedButton = createButton("Upgrade");
    speedButton.position(670,50);

    lifeButton = createButton("Upgrade");
    lifeButton.position(670,80);

    shieldButton = createButton("Upgrade");
    shieldButton.position(670,110);

    freezeButton = createButton("Upgrade");
    freezeButton.position(670,140);

    tankButton = createButton("Upgrade");
    tankButton.position(670,170);

    //Text
    speedText = createElement("h4"); 
    speedText.html("Speed");
    speedText.position(612,30)

    lifeText = createElement("h4"); 
    lifeText.html("Life");
    lifeText.position(612,60)

    shieldText = createElement("h4"); 
    shieldText.html("Shield");
    shieldText.position(612,90)

    freezeText = createElement("h4"); 
    freezeText.html("Freeze");
    freezeText.position(612,120)

    tankText = createElement("h4"); 
    tankText.html("Tank");
    tankText.position(612,150)

    speedCostText = createElement("h4"); 
    speedCostText.html(speedCost + " Coins");
    speedCostText.position(750,30)

    lifeCostText = createElement("h4"); 
    lifeCostText.html(lifeCost + " Coins");
    lifeCostText.position(750,60)

    shieldCostText = createElement("h4"); 
    shieldCostText.html(shieldCost + " Coins");
    shieldCostText.position(750,90)

    freezeCostText = createElement("h4"); 
    freezeCostText.html(freezeCost + " Coins");
    freezeCostText.position(750,120)

    tankCostText = createElement("h4"); 
    tankCostText.html(tankCost + " Coins");
    tankCostText.position(750,150)
    //#endregion

    //All the UI for help 
    //#region
    //Buttons
    helpButton = createButton("Help");
    helpButton.position(745,10);

    //Text
    helpText1 = createElement("h3");
    helpText1.html("Hello Player!! Welcome to Blue Rooms so first lets start with the basics.")
    helpText1.position(615, 20)

    helpText2 = createElement("h3");
    helpText2.html("1.You can move with WASD and shoot with the left mouse button pretty obvious.")
    helpText2.position(615, 50)

    helpText3 = createElement("h3");
    helpText3.html("2.You have three powerups to use and upgrade. The first is to become invincible, the second is to freeze all enemies except the boss and third is to become a tank.");
    helpText3.position(615, 80);
    
    helpText4 = createElement("h3");
    helpText4.html("3.Fight enemies, get coins and upgrade. Watch out for Kevin who spawns every 8 levels, he is uh a little hard but can be obliterated by the tank.");
    helpText4.position(615, 130);

    helpText5 = createElement("h3");
    helpText5.html("4.You can tweak a few setting in the options menu including the controls but remember to type the whole key name. Also if you find the powerup bar annoying you can disable it. The text at the bottom of the screen shows if a powerup is ready. Enjoy :)");
    helpText5.position(615, 180);
    //#endregion

    //Setting up the UI
    //#region
    speedButton.hide();
    speedText.hide();

    lifeButton.hide();
    lifeText.hide();

    shieldButton.hide();
    shieldText.hide();

    freezeButton.hide();
    freezeText.hide();

    tankButton.hide();
    tankText.hide();

    speedCostText.hide();
    lifeCostText.hide();
    shieldCostText.hide();
    freezeCostText.hide();
    tankCostText.hide();

    backButton.hide();

    musicSlider.hide();
    musicText.hide();

    controlsText.hide();

    forwardInput.hide();
    forwardText.hide();

    backwardInput.hide();
    backwardText.hide();

    leftInput.hide();
    leftText.hide();

    rightInput.hide();
    rightText.hide();

    freezeInput.hide();
    freezeInpText.hide();

    invincibileInput.hide();
    invincibileInpText.hide();

    TankInput.hide();
    TankInpText.hide()

    enableBarsBox.hide();
    enableBarsText.hide();

    helpText1.hide();
    helpText2.hide();
    helpText3.hide();
    helpText4.hide();
    helpText5.hide();
    //#endregion

    //Open the different menus
    shopButton.mousePressed(openShop);
    backButton.mousePressed(closeUI);
    optionsButton.mousePressed(openOptions);
    helpButton.mousePressed(openHelp);

    //Upgrade the player
    speedButton.mousePressed(upgradeSpeed);
    lifeButton.mousePressed(upgradeLife);
    shieldButton.mousePressed(upgradeShield);
    freezeButton.mousePressed(upgradeFreezeTime);
    tankButton.mousePressed(upgradeTankTime);
}

function openOptions(){
    //Setting framerate to 0 pauses the game
    frameRate(0)

    //Hiding/Showing UI for options menu
    shopButton.hide();
    optionsButton.hide();
    helpButton.hide();
    backButton.show();

    controlsText.show();

    forwardInput.show();
    forwardText.show();

    backwardInput.show();
    backwardText.show();

    leftInput.show();
    leftText.show();

    rightInput.show();
    rightText.show();

    freezeInput.show();
    freezeInpText.show();

    invincibileInput.show();
    invincibileInpText.show();

    TankInput.show();
    TankInpText.show();
    
    musicSlider.show();
    musicText.show();

    enableBarsBox.show();
    enableBarsText.show();

    enableBarsBox.changed(disablePowerupBars)
}

function openHelp(){
    frameRate(0)
    
    shopButton.hide();
    optionsButton.hide();
    helpButton.hide();
    backButton.show();

    helpText1.show();
    helpText2.show();
    helpText3.show();
    helpText4.show();
    helpText5.show();
}

function openShop(){
    frameRate(0)
    shopButton.hide();
    optionsButton.hide();
    helpButton.hide();
    backButton.show();

    speedButton.show();
    speedText.show();

    lifeButton.show();
    lifeText.show();

    shieldButton.show();
    shieldText.show();

    freezeButton.show();
    freezeText.show();

    tankButton.show();
    tankText.show();
    
    speedCostText.show();
    lifeCostText.show();
    shieldCostText.show();
    freezeCostText.show();
    tankCostText.show();
}

function closeUI(){
    frameRate(30)
    shopButton.show();
    optionsButton.show();
    helpButton.show();
    backButton.hide();

    speedButton.hide();
    speedText.hide();

    lifeButton.hide();
    lifeText.hide();

    shieldButton.hide();
    shieldText.hide();

    freezeButton.hide();
    freezeText.hide();

    tankButton.hide();
    tankText.hide();
    
    speedCostText.hide();
    lifeCostText.hide();
    shieldCostText.hide();
    freezeCostText.hide();
    tankCostText.hide();

    musicSlider.hide();
    musicText.hide();

    controlsText.hide();

    forwardInput.hide();
    forwardText.hide();

    backwardInput.hide();
    backwardText.hide();

    leftInput.hide();
    leftText.hide();

    rightInput.hide();
    rightText.hide();

    freezeInput.hide();
    freezeInpText.hide();

    invincibileInput.hide();
    invincibileInpText.hide();

    TankInput.hide();
    TankInpText.hide();

    enableBarsBox.hide();
    enableBarsText.hide();

    helpText1.hide();
    helpText2.hide();
    helpText3.hide();
    helpText4.hide();
    helpText5.hide();
}

function lateDraw(){
    //Other UI
    freezeReadyText = createElement("h4");
    freezeReadyText.html("Freeze:- " + isFreezeReady);
    freezeReadyText.position(612,500)

    invincibleReadyText = createElement("h4");
    invincibleReadyText.html("Invincible:- " + isInvincibileReady);
    invincibleReadyText.position(612,530)

    tankReadyText = createElement("h4");
    tankReadyText.html("Tank:- " + isTankReady);
    tankReadyText.position(612,560)
}

function redrawUI(){
    freezeReadyText.html("Freeze:- " + isFreezeReady);
    invincibleReadyText.html("Invincible:- " + isInvincibileReady);
    tankReadyText.html("Tank:- " + isTankReady);
}

function startBossFight(){
    boss = createSprite(300,300,10,10);
    boss.addImage(bossImage)
    boss.scale = 0.3;

    boss.velocity.x = Math.round(random(9,14));
    boss.velocity.y = Math.round(random(7,14));

    bossHasSpawned = true;
    bossHealth = bossMaxHealth;
    enemiesAlive = 0;
}

function disablePowerupBars(){
     if(enableBarsBox.checked()){
        stroke(0);
        strokeWeight(4);
        noFill();
        rect(450, 380, 20, 150);

        noStroke();
        fill(0, 255, 255);
        rect(451, 530, 18, map(fillFreeze, 0, 150 , 0, -150));

        stroke(0);
        strokeWeight(4);
        noFill();
        rect(490, 380, 20, 150);

        noStroke();
        fill(141, 255, 0);
        rect(491, 530, 18, map(fillInvincibilty, 0, 200, 0, -150));

        stroke(0);
        strokeWeight(4);
        noFill();
        rect(530, 380, 20, 150);

        noStroke();
        fill(196, 164, 132);
        rect(531, 530, 18, map(fillTank, 0, 500, 0, -150));
    }
}

function draw() {
    x1 = player.position.x;
    y1 = player.position.y;

    background("#1a66ff");

    let targetX = winMouseX;
    let dx = targetX - x;
    x += dx * easing;
  
    let targetY = winMouseY;
    let dy = targetY - y;
    y += dy * easing;


    song.forEach(sound => {
        sound.onended(go)
        sound.setVolume(musicSlider.value());
    });

    if(frameCount % 1 === 0){
        redrawUI();
    }

    if(nextTimeToFreeze === 0){
        isFreezeReady = "Ready";
        fillFreeze = 150
    }
    else{
        isFreezeReady = "Not Ready";
        fillFreeze += 0.5;
    }

    if(nextTimeToInvincible === 0){
        isInvincibileReady = "Ready";
        fillInvincibilty = 200
    }
    else{
        isInvincibileReady = "Not Ready";
        fillInvincibilty += 0.5
    }

    if(spawnTankTime === 0){
        isTankReady = "Ready";
        fillTank = 500;
    }
    else{
        isTankReady = "Not Ready";
        fillTank += 0.5
    }

    if(spawnTankTime > 0){
        spawnTankTime -= 1;
    }

    if(nextTimeToFreeze > 0){
        nextTimeToFreeze -= 0.5;
    }

    if(nextTimeToInvincible > 0){
        nextTimeToInvincible -= 0.5;
    }

    if(invincibilityPeriod > 0){
        invincibilityPeriod -= 0.5;
        player.addImage(playerInvincibleImg);
        resetColor =  invincibilityPeriod;
    }

    if(freezeTime > 0){
        freezeTime -= 0.5;
        freezeAll = true;
    }

    if(freezeTime === 0){
        freezeAll =  false;
    }

    disablePowerupBars();

    textSize(32);
    fill("white")
    score = text("Coins:- " + coinCount, 15,540);
    levelText = text("Level:- " + level, 17,580);
    livesText = text("Lives:- " + life, 440, 580);
    textSize(40);



    gun.pointTo(x, y);
    gun.position = player.position;

    if(shootTimer > 0){
        shootTimer -= 1;
    }

    if(gameState === 1){

        if(enemiesAlive === 0 && bossHasSpawned === false){
            level += 1
            nextLevel();
            console.log(level);
        }

        if(tankMode === false){
            if(keyDown(leftInput.value())){
                player.x -= playerSpeed;
            }
            if(keyDown(rightInput.value())){
                player.x += playerSpeed;
            }
            if(keyDown(forwardInput.value())){
                player.y -= playerSpeed;
            }
            if(keyDown(backwardInput.value())){
                player.y += playerSpeed;
            }
            if(mouseWentDown("leftButton") && shootTimer === 0){
                shootTimer = 10;
                createBullets(gun.x,gun.y);
            }
            
            if(keyWentDown(invincibileInput.value()) && nextTimeToInvincible <= 0){
                fillInvincibilty = 0
                invincibilityPeriod = shieldTime;
                nextTimeToInvincible = 200;
            }
            if(keyWentDown(freezeInput.value()) && nextTimeToFreeze <= 0 ){
                fillFreeze = 0
                freezeTime = baseFreeze;
                nextTimeToFreeze =150;
            }
        }

        if(spawnTankTime === 0 && keyWentDown(TankInput.value()) && tankMode === false){
            startTank();
            tankMode = true;
            spawnTankTime === nextTimeToTank;
            tankModeTime = baseTankModeTime;
            player.position.x = 10000
        }

        if(tankMode === true){
            
            if(keyDown("a")){
                tank.x -= tankSpeed;
            }

            if(keyDown("d")){
                tank.x += tankSpeed;
            }

            if(mouseWentDown("leftButton")){
            createTankBullets(tank.x,tank.y-40)
            }
            
            tank.bounceOff(edge1);
            tank.bounceOff(edge2);
            tank.bounceOff(edge3);
            tank.bounceOff(edge4);

            tank.overlap(weakEnemiesGroup,destroyEnemy)

            
            if(tankModeTime > 0){
                tankModeTime -= 1;
            }

            if(tankModeTime <= 0){
                fillTank = 0;
                spawnTankTime = 500;
                tankMode = false;
                player.position.x = 300;
                player.position.y = 500;
                tank.destroy();
            }
        }


        }else if(gameState === 2){
            player.visible = false;
            gun.visible = false;
            GameOverText = text("Game Over", 185,250);
            RestartText = text("Press Space To Restart", 70, 300);
            
            if(bossHasSpawned){
                boss.destroy();
            }else{
                weakEnemiesGroup.destroyEach();
            }

            coinsGroup.destroyEach();

            if(keyDown("space")){
                gameState = 1;
                coinCount = 0;
                life = 3;
                enemySpeed = 3;
                turnSpeed = 30;
                bossTurnSpeed = 10;
                playerSpeed = 5;
                shieldTime = 20;
                slowDownTime = 5;
                level = 1;
                baseFreeze = 20;
                baseTankModeTime = 60;
                tankSpeed = 4;
                speedCost = 20;
                lifeCost = 50;
                shieldCost = 30;
                freezeCost = 10;
                tankCost = 40;
                player.visible = true;
                gun.visible = true
                enemiesAlive = 1;
                nextTimeToFreeze = 0;
                nextTimeToInvincible = 0;
                bossHasSpawned = false;
                bossMaxHealth = 1;
                spawnTankTime = 0;
                speedCostText.html(speedCost + " Coins");
                shieldCostText.html(shieldCost + " Coins");
                lifeCostText.html(lifeCost + " Coins");
                freezeCostText.html(freezeCost + " Coins");
                tankCostText.html(tankCost + " Coins");
                createEnemies();
            }
        }

        if(levelStarted === true){
            enemiesSpawned = enemiesAlive;
            levelStarted = false;
        }

        if(bossHasSpawned === true){
            if(gameState === 1){
                bossName = text("Kevin", 260, 45)
            
                stroke(0);
                strokeWeight(4);
                noFill();
                rect(100, 55, 400, 20);
            
                noStroke();
                fill(255, 0, 0);
                rect(100, 56, map(bossHealth, 0, bossMaxHealth, 0, 400), 18);
            }

            if(boss.x > 595){
                boss.velocity.x -= bossTurnSpeed;
            } 
            else if(boss.x < 5){
                boss.velocity.x += bossTurnSpeed;
            }

            if(boss.y < 5){
                boss.velocity.y -= bossTurnSpeed;
            }
            else if(boss.y > 595){ 
                boss.velocity.y += bossTurnSpeed;
            }

            if(player.isTouching(boss) && invincibilityPeriod <= 0){
                life -= 1;
                resetColor = 50;
                player.x = 200;
                player.y = 200;
                invincibilityPeriod = 30;
                nextTimeToInvincible = 0;
                lifeCostText.html(lifeCost + " Coins")
            }

            bulletsGroup.overlap(boss,reduceHealth);

            if(bossHealth === 0){
                level += 1
                boss.destroy();
                nextLevel();
                console.log(level);
                bossHasSpawned = false;
                coinCount += 20;
            }

            boss.bounceOff(edge1);
            boss.bounceOff(edge2);
            boss.bounceOff(edge3);
            boss.bounceOff(edge4);

        }

        if(freezeAll === false){
            //Old Enemy Movement
            //#region 
            /*if(enemiesSpawned >= 1){
                if(randomDir1 === 1){
                    enemy1.x -= enemySpeed;
                    } else if(randomDir1 === 2){
                    enemy1.x += enemySpeed;
                    }else if(randomDir1 === 3){
                    enemy1.y -= enemySpeed;
                    }else if(randomDir1 === 4){
                    enemy1.y += enemySpeed;
                }
            }

            if(enemiesSpawned >= 2){
                if(randomDir2 === 1){
                    enemy2.x -= enemySpeed;
                    } else if(randomDir2 === 2){
                    enemy2.x += enemySpeed;
                    }else if(randomDir2 === 3){
                    enemy2.y -= enemySpeed;
                    }else if(randomDir2 === 4){
                    enemy2.y += enemySpeed;
                }   
            }
            
            if(enemiesSpawned >= 3){
                if(randomDir3 === 1){
                    enemy3.x -= enemySpeed;
                    } else if(randomDir3 === 2){
                    enemy3.x += enemySpeed;
                    }else if(randomDir3 === 3){
                    enemy3.y -= enemySpeed;
                    }else if(randomDir3 === 4){
                    enemy3.y += enemySpeed;
                }
        }

            if(enemiesSpawned >= 4){
                if(randomDir4 === 1){
                    enemy4.x -= enemySpeed;
                    } else if(randomDir4 === 2){
                    enemy4.x += enemySpeed;
                    }else if(randomDir4 === 3){
                    enemy4.y -= enemySpeed;
                    }else if(randomDir4 === 4){
                    enemy4.y += enemySpeed;
                }
            }

            if(enemiesSpawned >= 5){
                if(randomDir5 === 1){
                    enemy5.x -= enemySpeed;
                    } else if(randomDir5 === 2){
                    enemy5.x += enemySpeed;
                    }else if(randomDir5 === 3){
                    enemy5.y -= enemySpeed;
                    }else if(randomDir5 === 4){
                    enemy5.y += enemySpeed;
                }
            }

            if(Math.round(World.frameCount) % turnSpeed === 0){ 
                if(enemiesSpawned >= 1){
                    randomDir1 = Math.round(random(1,4));
                    if(enemiesSpawned >=2){
                        randomDir2 = Math.round(random(1,4));
                        if(enemiesSpawned>=3){
                            randomDir3 = Math.round(random(1,4));
                            if(enemiesSpawned >= 4){
                                randomDir4 = Math.round(random(1,4));
                                if(enemiesSpawned >=5){
                                    randomDir5 = Math.round(random(1,4));
                                }
                            }
                        }    
                    }
                }
            }*/
            //#endregion
            
            //New Movement
            var m1 = createVector(x2 - x1, y2 - y1);
            var m2 = createVector(x3 - x1, y3 - y1);
            var m3 = createVector(x4 - x1, y4 - y1);
            var m4 = createVector(x5 - x1, y5 - y1);
            var m5 = createVector(x6 - x1, y6 - y1);
    
            //This sets the magnitude so that it moves in a constant rate but in the right direction.
            m1.normalize();
            m2.normalize();
            m3.normalize();
            m4.normalize();
            m5.normalize();
    
            //Set d equal to the speed
            x2 -= m1.x * enemySpeed;
            y2 -= m1.y * enemySpeed;
            x3 -= m2.x * enemySpeed;
            y3 -= m2.y * enemySpeed;
            x4 -= m3.x * enemySpeed;
            y4 -= m3.y * enemySpeed;
            x5 -= m4.x * enemySpeed;
            y5 -= m4.y * enemySpeed;
            x6 -= m5.x * enemySpeed;
            y6 -= m5.y * enemySpeed;
    
            if(enemiesSpawned >= 1){
                enemy1.position.x = x2;
                enemy1.position.y = y2;
                if(enemiesSpawned >= 2){
                    enemy2.position.x = x3;
                    enemy2.position.y = y3;
                    if(enemiesSpawned >=3){
                        enemy3.position.x = x4;
                        enemy3.position.y = y4;
                        if(enemiesSpawned >= 4){
                            enemy4.position.x = x5;
                            enemy4.position.y = y5;
                            if(enemiesSpawned >= 5){
                                enemy5.position.x = x6;
                                enemy5.position.y = y6;
                            }
                        }
                    }
                }
            }
        }


        if(player.isTouching(weakEnemiesGroup)&& life > 0 && invincibilityPeriod <= 0){
            life -= 1;
            resetColor = 50;
            player.x = 200;
            player.y = 200;
            invincibilityPeriod = 20;
            nextTimeToInvincible = 0;
            lifeCostText.html(lifeCost + " Coins")
        }

        if(resetColor > 0){
            resetColor -= 1;
        }

        if(resetColor === 0){
            player.addImage(playerImg);
        }
        if(life === 0){
            gameState = 2;
        }

        player.bounceOff(edge1);
        player.bounceOff(edge2);
        player.bounceOff(edge3);
        player.bounceOff(edge4);

        weakEnemiesGroup.bounceOff(edge1);
        weakEnemiesGroup.bounceOff(edge2);
        weakEnemiesGroup.bounceOff(edge3);
        weakEnemiesGroup.bounceOff(edge4);

        bulletsGroup.overlap(weakEnemiesGroup,dropCoin);
        bulletsGroup.overlap(weakEnemiesGroup,kill);
        player.overlap(coinsGroup,addCoin);

        //console.log(enemiesAlive)
        drawSprites();
     
        tint(255, visiblity);
        image(gameIconImage, 0, 0, 600,600)
        visiblity -= 3  
}


function startTank(){
    tank = createSprite(300,540,10,10); 
    tank.addImage(tankImg);
    tank.scale = 0.25;
}

function kill(spriteA,spriteB){
    spriteA.destroy();
    spriteB.destroy();
    enemiesAlive -= 1
}

function destroyEnemy(spriteA, spriteB){
    spriteB.destroy();
    enemiesAlive -= 1
}

function reduceHealth(spriteA, spriteB){
    if(bossHealth > 0){
        spriteA.destroy();
        bossHealth -= 1
    } else if(bossHealth === 0){
        spriteA.destroy();
        spriteB.destroy();
    }
}

function dropCoin(spriteA){
    coin = createSprite(spriteA.x,spriteA.y,20,20);
    coin.addImage(coinImg);
    coin.scale = 0.4;
    coinsGroup.add(coin);
}

function addCoin(spriteA,spriteB){
    player.addImage(playerCollectImg);
    resetColor = 50;
    spriteB.destroy();
    coinCount += 1;
}

function nextLevel(){
    enemiesAlive = Math.round(random(2,5));

    if(level % 3 === 0 && enemySpeed > 8){
        enemySpeed += 1;
    }

    if(level % 5 === 0 && turnSpeed < 10){
        turnSpeed -= 1;
    }

    if(level % 8 === 0){
        if(bossHealth <= 20){
            bossMaxHealth += 2
        }
        startBossFight();
    }

    if(level % 10 === 0 && life < 15){
        life += 1;
        lifeCostText.html(lifeCost + " Coins");
    }

    createEnemies();
    
    levelStarted = true;
    invincibilityPeriod = 20;
}

function go(){
    if( index < song.length-1  ){
    song[index+1].play()
    index++
    }
}