var player, playerImg, playerHurtImg, playerCollectImg;
var enemy1,enemy2 ,enemy3 ,enemy4 ,enemy5 ,enemyAnimation;
var coin,coinImg;
var gun, gunImg;
var bullet, bulletImg;
var randomDir1, randomDir2, randomDir3, randomDir4, randomDir5;
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

function preload(){
    gunImg = loadImage("Gun.png");
    bulletImg = loadImage("bullet.png")
    playerImg = loadImage("Player.png");
    playerHurtImg = loadImage("PlayerHurt.png");
    playerCollectImg = loadImage("PlayerCollect.png");
    enemyAnimation = loadAnimation("Enemy1.png","Enemy2.png");
    coinImg = loadImage("Coin.png");
}

function setup(){
    createCanvas(600,600);
    player = createSprite(300,300,50,50);
    player.addImage(playerHurtImg);
    player.addImage(playerCollectImg);
    player.addImage(playerImg);
    player.scale = 0.7;
    gun = createSprite(player.x,player.y+10,50,50);
    gun.addImage(gunImg)
    gun.scale = 0.1;

    /*
    enemy1 = createSprite(300,200,30,30);
    enemy1.addAnimation("Walk",enemyAnimation);
    enemy1.scale = 0.65;

    enemy2 = createSprite(300,200,30,30);
    enemy2.addAnimation("Walk",enemyAnimation);
    enemy2.scale = 0.65;

    enemy3 = createSprite(300,200,30,30);
    enemy3.addAnimation("Walk",enemyAnimation);
    enemy3.scale = 0.65;

    enemy4 = createSprite(300,200,30,30);
    enemy4.addAnimation("Walk",enemyAnimation);
    enemy4.scale = 0.65;

    enemy5 = createSprite(300,200,30,30);
    enemy5.addAnimation("Walk",enemyAnimation);
    enemy5.scale = 0.65;
    */

    weakEnemiesGroup = new Group();
    bulletsGroup = new Group()
    coinsGroup = new Group(); 

    /*
    weakEnemiesGroup.add(enemy1);
    weakEnemiesGroup.add(enemy2);
    weakEnemiesGroup.add(enemy3);
    weakEnemiesGroup.add(enemy4);
    weakEnemiesGroup.add(enemy5);
    */
    

    edge1 = createSprite(0,0,1200,20);
    edge2 = createSprite(0,600,1200,20);
    edge3 = createSprite(0,0,20,1200);
    edge4 = createSprite(600,0,20,1200);

    edge1.shapeColor = "black";
    edge2.shapeColor = "black";
    edge3.shapeColor = "black";
    edge4.shapeColor = "black";

    createEnemies();
}

function createBullets(x,y){
    bullet = createSprite(x,y,20,20);;
    bullet.addImage(bulletImg);
    bullet.scale = 0.3;
    bullet.lifetime = 50;
    bullet.rotation = gun.rotation;
    bullet.setSpeedAndDirection(10,gun.rotation-180);
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

function draw() {
    if(enemiesAlive === 0){
        level += 1
        enemiesToBeSpawned();
        console.log(level);
    }


    if(invincibilityPeriod > 0){
        invincibilityPeriod -= 0.5;
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

    if(gameState === 1){
        if(keyDown("a")){
            player.x -= 5;
        }
            if(keyDown("d")){
            player.x += 5;
        }
            if(keyDown("w")){
            player.y -= 5;
        }
            if(keyDown("s")){
            player.y += 5;
        }
            if(mouseWentDown("leftButton") && shootTimer === 0){
            shootTimer = 10;
            createBullets(gun.x,gun.y);
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

    if(enemiesAlive >= 1){
        if(randomDir1 === 1){
            enemy1.x -= 3;
            } else if(randomDir1 === 2){
            enemy1.x += 3;
            }else if(randomDir1 === 3){
            enemy1.y -= 3;
            }else if(randomDir1 === 4){
            enemy1.y += 3;
        }
    }

    if(enemiesAlive >= 2){
        if(randomDir2 === 1){
            enemy2.x -= 3;
            } else if(randomDir2 === 2){
            enemy2.x += 3;
            }else if(randomDir2 === 3){
            enemy2.y -= 3;
            }else if(randomDir2 === 4){
            enemy2.y += 3;
        }   
    }
    
    if(enemiesAlive >= 3){
        if(randomDir3 === 1){
            enemy3.x -= 3;
            } else if(randomDir3 === 2){
            enemy3.x += 3;
            }else if(randomDir3 === 3){
            enemy3.y -= 3;
            }else if(randomDir3 === 4){
            enemy3.y += 3;
        }
   }

    if(enemiesAlive >= 4){
        if(randomDir4 === 1){
            enemy4.x -= 3;
            } else if(randomDir4 === 2){
            enemy4.x += 3;
            }else if(randomDir4 === 3){
            enemy4.y -= 3;
            }else if(randomDir4 === 4){
            enemy4.y += 3;
        }
    }

    if(enemiesAlive >= 5){
        if(randomDir5 === 1){
            enemy5.x -= 3;
            } else if(randomDir5 === 2){
            enemy5.x += 3;
            }else if(randomDir5 === 3){
            enemy5.y -= 3;
            }else if(randomDir5 === 4){
            enemy5.y += 3;
        }
    }

    if(Math.round(World.frameCount) % 30 === 0){ 
       if(enemiesAlive >= 1){
        randomDir1 = Math.round(random(1,4));
        if(enemiesAlive >=2){
            randomDir2 = Math.round(random(1,4));
            if(enemiesAlive>=3){
                randomDir3 = Math.round(random(1,4));
                if(enemiesAlive >= 4){
                    randomDir4 = Math.round(random(1,4));
                    if(enemiesAlive >=5){
                        randomDir5 = Math.round(random(1,4));
                    }
                }
            }    
        }
       }
    }

    if(player.isTouching(weakEnemiesGroup) && life > 0 && invincibilityPeriod <= 0){
        player.addImage(playerHurtImg);
        life -= 1;
        resetColor = 50;
        player.x = 200;
        player.y = 200;
        invincibilityPeriod = 20;
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

    console.log(enemiesAlive)
    drawSprites();
}

function kill(spriteA,spriteB){
    spriteA.destroy();
    spriteB.destroy();
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

function enemiesToBeSpawned(){
    enemiesAlive = Math.round(random(2,5));
    console.log(enemiesAlive)
    createEnemies();
    invincibilityPeriod = 20;
}