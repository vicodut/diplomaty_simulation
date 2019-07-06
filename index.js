'use strict';

class Army {
    constructor(
        name, 
        position,
        action,
        destination,
        strength, 
        support,
        exist) {
            this.name = name;
            this.position = position;
            this.action = action;
            this.destination = destination;
            this.strength = strength;
            this.support = support;
            this.exist = exist;
        }
}

// Complete the evaluateActions function below.
function evaluateActions(actions) {
    let armies = [];
    for (let action of actions) {
        let act = action.split(' ');
        armies.push(
            new Army(
                act[0],
                act[1],
                act[2],
                act[3] ? act[3] : null,
                1,
                false,
                true
            )
        );
    }

    armies = move(armies)
    armies = calcStrength(armies);
    armies = battle(armies);
    return buildResult(armies);
}

function move(armies) {
    for(let army of armies) {
        if(army.action === 'Move') {
            army.position = army.destination;
        }
    }
    return armies;
}

function calcStrength(armies) {
    for(let army of armies) {
        if(army.action === 'Support' && !attacked(armies, army.position)) {
            armies = addStrength(armies, army.destination);
        }
    }
    return armies;
}

function attacked(armies, pos) {
    return armies.filter((army) => {return army.position == pos}).length > 1;
}

function battle(armies) {
    for(let army1 of armies) {
        for(let army2 of armies) {
            if(army1.name !== army2.name && army1.position === army2.position) {
                if(army1.strength < army2.strength) {
                    army1.exist = false;
                } else if(army2.strength < army1.strength) {
                  army2.exist = false;
                } else if (army1.strength === army2.strength) {
                    army1.exist = false;
                    army2.exist = false;
                }
            }
        }
    }
    return armies;
}
function addStrength(armies, name) {
    for(let army of armies) {
        if(army.name == name) {
            army.strength++;
        }
    }
    return armies;
}

function buildResult(armies) {
    let res = [];
    for(let army of armies) {
        res.push(`${army.name} ${army.exist ? army.position : '[dead]'}`);
    }
    return res;
}

module.exports = {
    evaluateActions
}