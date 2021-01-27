let rock: Sprite = null
let ship: Sprite = null
let score = 0
let timeInterval = 1000
ship = sprites.create(img`
    ........feebbbef........
    ........f24bdb2e........
    .......ce2222222e.......
    ......cbc22bb22e6cf.....
    ......b962e99e2b6dc.....
    ......c6b2e69e2e6bf.....
    ...cccee222ab222eeeccc..
    .fbbbddddb4eeebbbbbbbbcf
    febbddbcdddbbdddbcbbbbbf
    fe2bddcbdddcbddddccbb42f
    .f24bddddddbbdddbbbb42f.
    ..ff24bddddddddbbbb22f..
    ....fee244bbbb4444ee....
    .....fbbe2222e22ebbf....
    ......ffffbbbbfffff.....
    ..........fffff.........
`, SpriteKind.Player)
ship.setPosition(20, 60)
controller.moveSprite(ship, 0, 100)
ship.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
sprites.onDestroyed(SpriteKind.Enemy, function(rock) {
    info.changeScoreBy(1)
})
game.onUpdateInterval(timeInterval, function() {
    rock = sprites.createProjectileFromSide(img`
        . . . . . . . . c c c c . . . .
        . . . . c c c c c c c c c . . .
        . . . c f c c a a a a c a c . .
        . . c c f f f f a a a c a a c .
        . . c c a f f c a a f f f a a c
        . . c c a a a a b c f f f a a c
        . c c c c a c c b a f c a a c c
        c a f f c c c a b b 6 b b b c c
        c a f f f f c c c 6 b b b a a c
        c a a c f f c a 6 6 b b b a a c
        c c b a a a a b 6 b b a b b a .
        . c c b b b b b b b a c c b a .
        . . c c c b c c c b a a b c . .
        . . . . c b a c c b b b c . . .
        . . . . c b b a a 6 b c . . . .
        . . . . . . b 6 6 c c . . . . .
    `, -40, 0)
    rock.setKind(SpriteKind.Enemy)
    rock.y = randint(0, 120)

    score = info.score()
    if (score > 10 && score <= 20) {
        rock.vx = -60
        controller.moveSprite(ship, 0, 150)
        timeInterval = 800
    } else if (score > 20 && score <= 30) {
        rock.vx = -80
        controller.moveSprite(ship, 0, 150)
        timeInterval = 300
    } else if (score > 30 && score <= 40) {
        rock.vx = -100
        controller.moveSprite(ship, 0, 150)
        timeInterval = 200
    } else if (score > 40 && score <= 50) {
        rock.vx = -120
        controller.moveSprite(ship, 0, 150)
        timeInterval = 100
    } else if (score > 50) {
        rock.vx = -140
        controller.moveSprite(ship, 0, 150)
        timeInterval = 50
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(ship, rock) {
    game.over()
})