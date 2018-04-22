export default {
    gameWidth: 800,
    gameHeight: 640,
    worldSize: {
        x: 5120,
        y: 5120
    },
    localStorageName: 'phaseres6webpack',
    metro: {
        maxReverseSpeed: 200, // / 5 =  40
        speedFakeModifier: 5
    },
    passanger: {
        minimalFollowDistance: 500,
        wanderingSwitchTimes: [2000, 10000],
        speeds: {
            wandering: 50,
            getIn: 80
        }
    },
    doors: {
        delay: 800
    },
    stations: {
        activeDistance: 1000,
        passangersCount: [50, 80],
        bonusTimePerStation: 20
    },
    balance: {
        rewards: {
            passanger: [1, 3]
        },
        penality: {
            doors: 50,
            reverse: 100,
            missStation: 300,
            latePerSec: 3,
            earlyPerSec: 1
        }
    },
    shop: {
        acceleration: [250, 500, 1000],
        maxSpeed: [250, 500, 1000],
        breaks: [200, 400, 800],
        ticket: 10000
    },
    oweLimitToGameOver: -3500,
    penality: {
        doorSpeed: 20
    }
};
