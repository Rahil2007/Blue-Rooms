var player, playerImg, playerHurtImg, playerCollectImg, playerInvincibleImg;
var tank, tankImg, tankMode = false, spawnTankTime = 0, tankModeTime, baseTankModeTime = 60, tankSpeed = 4;
var enemy1,enemy2 ,enemy3 ,enemy4 ,enemy5 ,enemyImage;
var boss, bossImage, bossHealth = 1, bossHasSpawned = false, bossTurnSpeed = 40;;
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
var nextTimeToFreeze = 20, nextTimeToInvincible  = 0, nextTimeToTank = 500;
var song;

//Variables for the shopsystem
var speedText, lifeText, shieldText, freezeText, shopText, tankText;
var speedCostText, lifeCostText, shieldCostText, freezeCostText, tankCostText;
var speedCost = 20, lifeCost = 50, shieldCost = 30, freezeCost = 10, tankCost = 40;
var shopButton, speedButton, lifeButton, shieldButton, freezeButton, tankButton, backButton;

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
    song = loadSound("Theme.mp3");
}

function setup(){
    createCanvas(600,600);
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

    shopElements();
    freezeTime = baseFreeze;

    createEnemies();

}

function createBullets(x,y){
    bullet = createSprite(x,y,20,20);
    bullet.addImage(bulletImg);
    bullet.scale = 0.3;
    bullet.lifetime = 50;
    bullet.rotation = gun.rotation;
    bullet.setSpeedAndDirection(10,gun.rotation-180);
    bulletsGroup.add(bullet);
}

function createTankBullets(x,y){
    bullet = createSprite(x,y,20,20);
    bullet.addImage(bulletImg);
    bullet.scale = 0.3;
    bullet.lifetime = 50;
    bullet.rotation = 90;
    bullet.setSpeedAndDirection(-10);
    bulletsGroup.add(bullet);
}

function createEnemies(){
    if(enemiesAlive === 1){
        enemy1 = createSprite(100,100,30,30);
        enemy1.addAnimation("Walk",enemyAnimation);
        enemy1.scale = 0.65;

        weakEnemiesGroup.add(enemy1);
    }

    if(enemiesAlive === 2){
        enemy1 = createSprite(100,100,30,30);
        enemy1.addAnimation("Walk",enemyAnimation);
        enemy1.scale = 0.65;

        enemy2 = createSprite(300,300,30,30);
        enemy2.addAnimation("Walk",enemyAnimation);
        enemy2.scale = 0.65;

        weakEnemiesGroup.add(enemy1);
        weakEnemiesGroup.add(enemy2);
    }

    if(enemiesAlive === 3){
        enemy1 = createSprite(100,100,30,30);
        enemy1.addAnimation("Walk",enemyAnimation);
        enemy1.scale = 0.65;

        enemy2 = createSprite(300,300,30,30);
        enemy2.addAnimation("Walk",enemyAnimation);
        enemy2.scale = 0.65;

        enemy3 = createSprite(200,200,30,30);
        enemy3.addAnimation("Walk",enemyAnimation);
        enemy3.scale = 0.65;

        weakEnemiesGroup.add(enemy1);
        weakEnemiesGroup.add(enemy2);
        weakEnemiesGroup.add(enemy3);
    }

    if(enemiesAlive === 4){
        enemy1 = createSprite(100,100,30,30);
        enemy1.addAnimation("Walk",enemyAnimation);
        enemy1.scale = 0.65;

        enemy2 = createSprite(300,300,30,30);
        enemy2.addAnimation("Walk",enemyAnimation);
        enemy2.scale = 0.65;

        enemy3 = createSprite(200,200,30,30);
        enemy3.addAnimation("Walk",enemyAnimation);
        enemy3.scale = 0.65;

        enemy4 = createSprite(150,200,30,30);
        enemy4.addAnimation("Walk",enemyAnimation);
        enemy4.scale = 0.65;
        
        weakEnemiesGroup.add(enemy1);
        weakEnemiesGroup.add(enemy2);
        weakEnemiesGroup.add(enemy3);
        weakEnemiesGroup.add(enemy4);
    }

    if(enemiesAlive === 5){
        enemy1 = createSprite(100,100,30,30);
        enemy1.addAnimation("Walk",enemyAnimation);
        enemy1.scale = 0.65;

        enemy2 = createSprite(300,300,30,30);
        enemy2.addAnimation("Walk",enemyAnimation);
        enemy2.scale = 0.65;

        enemy3 = createSprite(200,200,30,30);
        enemy3.addAnimation("Walk",enemyAnimation);
        enemy3.scale = 0.65;

        enemy4 = createSprite(150,20,30,30);
        enemy4.addAnimation("Walk",enemyAnimation);
        enemy4.scale = 0.65;

        enemy5 = createSprite(300,500,30,30);
        enemy5.addAnimation("Walk",enemyAnimation);
        enemy5.scale = 0.65;

        weakEnemiesGroup.add(enemy1);
        weakEnemiesGroup.add(enemy2);
        weakEnemiesGroup.add(enemy3);
        weakEnemiesGroup.add(enemy4);
        weakEnemiesGroup.add(enemy5);
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
        nextTimeToTank -= 20;
        tankSpeed += 1;
        coinCount -= tankCost;
        tankCost += 15
        tankCostText.html(tankCost + " Coins");
    }

    if(baseTankModeTime === 180){
        tankCostText.html("Fully Upgraded");
    }
}

function shopElements(){
    // All the buttons
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

    //All the text

    shopText = createElement("h2")
    shopText.style('color', 'blue');
    shopText.html("Shop");
    shopText.position(690, -13)

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

    shopText.hide();
    backButton.hide();

    shopButton.mousePressed(openShop);
    backButton.mousePressed(closeShop);

    //Upgrade the player
    speedButton.mousePressed(upgradeSpeed);
    lifeButton.mousePressed(upgradeLife);
    shieldButton.mousePressed(upgradeShield);
    freezeButton.mousePressed(upgradeFreezeTime);
    tankButton.mousePressed(upgradeTankTime);
}

function openShop(){
    shopButton.hide();
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

    shopText.show();
}

function closeShop(){
    shopButton.show();
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

    shopText.hide();
}

function startBossFight(){
    boss = createSprite(300,70,10,10);
    boss.addImage(bossImage)
    boss.scale = 0.3;

    bossHasSpawned = true;
    enemiesAlive = 0;
}

function draw() {
    console.log(spawnTankTime);
    
    if(spawnTankTime > 0){
        spawnTankTime -= 1;
    }

    if(enemiesAlive === 0 && bossHasSpawned === false){
        level += 1
        nextLevel();
        console.log(level);
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

    background(255,100,100);
    textSize(32);
    fill("white")
    score = text("Coins:- " + coinCount, 15,40);
    levelText = text("Level:- " + level, 440,40);
    livesText = text("Lives:- " + life, 17, 80)
    textSize(40);

    gun.pointTo(mouseX, mouseY);
    gun.position = player.position;

    if(shootTimer > 0){
        shootTimer -= 1;
    }

    if(keyWentDown("r")){
     if (song.isPlaying()) {
        song.stop();
      } else {
        song.play();
      }
    }

    if(gameState === 1){
        if(tankMode === false){
            if(keyDown("a")){
                player.x -= playerSpeed;
            }
            if(keyDown("d")){
                player.x += playerSpeed;
            }
            if(keyDown("w")){
                player.y -= playerSpeed;
            }
            if(keyDown("s")){
                player.y += playerSpeed;
            }
            if(mouseWentDown("leftButton") && shootTimer === 0){
                shootTimer = 10;
                createBullets(gun.x,gun.y);
            }
            
            if(keyWentDown("e") && nextTimeToInvincible <= 0){
                invincibilityPeriod = shieldTime;
                nextTimeToInvincible = invincibilityPeriod + 40;
            }
            if(keyWentDown("f") && nextTimeToFreeze <= 0 ){
                freezeTime = baseFreeze;
                nextTimeToFreeze = freezeTime + 40;
            }
        }

        if(spawnTankTime === 0 && keyWentDown("t")){
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
                spawnTankTime = nextTimeToTank;
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

        if(keyDown("space")){
            window.location.reload();
        }
    }


    if(levelStarted === true){
        enemiesSpawned = enemiesAlive;
        levelStarted = false;
    }

    if(bossHasSpawned === true){

        if(Math.round(World.frameCount) % bossTurnSpeed === 0){ 
            randomDirBoss = Math.round(random(1,4));
        }

        if(randomDirBoss === 1){
            boss.x -= 9;
            } else if(randomDirBoss === 2){
            boss.x += 9;
            }else if(randomDirBoss === 3){
            boss.y -= 9;
            }else if(randomDirBoss === 4){
            boss.y += 9;
        }

        if(boss.isTouching(edge1)){
            randomDirBoss = 3
            bossTurnSpeed = 40;
        }

        if(boss.isTouching(edge2)){
            randomDirBoss = 4
            bossTurnSpeed = 40;
        }

        if(boss.isTouching(edge3)){
            randomDirBoss = 1
            bossTurnSpeed = 40;
        }

        if(boss.isTouching(edge4)){
            randomDirBoss = 2
            bossTurnSpeed = 40;
        }

        if(player.isTouching(boss) && invincibilityPeriod <= 0){
            life -= 1;
            resetColor = 50;
            player.x = 200;
            player.y = 200;
            invincibilityPeriod = 20;
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
        if(enemiesSpawned >= 1){
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
}


function startTank(){
    tank = createSprite(300,540,10,10); 
    tank.addImage(tankImg);
    tank.scale = 0.25;
}

function kill(spriteA,spriteB){
    spriteA.destroy();
    spriteB.destroy();
}

function destroyEnemy(spriteA, spriteB){
    spriteB.destroy();
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
    enemiesAlive -= 1
}

function addCoin(spriteA,spriteB){
    player.addImage(playerCollectImg);
    resetColor = 50;
    spriteB.destroy();
    coinCount += 1;
}

function nextLevel(){
    enemiesAlive = Math.round(random(2,5));
    nextTimeToInvincible = 0;
    nextTimeToFreeze = 0;

    if(level % 3 === 0 && enemySpeed > 8){
        enemySpeed += 0.5;
    }

    if(level % 5 === 0 && turnSpeed < 10){
        turnSpeed -= 0.5
    }

    if(level % 10 === 0){
        startBossFight();
        if(bossHealth <= 20){
            bossHealth += 2
        }
    }

    createEnemies();
    
    levelStarted = true;
    invincibilityPeriod = 20;
}