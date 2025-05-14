// 1,000,000개의 몬스터가 123,456개 있는 경우

// 1 <= 방의 개수(roomCount) <= 123,456
// 1 <= 용사의 초기 공력력(initDamage) <= 1,000,000
// 1 <= a, h <= 1,000,000

const MAX_HP = BigInt(1e18);

class Soldier {
  constructor(damage, hp) {
    this.damage = damage;
    this.maxHp = hp;
    this.currHp = hp;
  }

  drinkPotion(damage, hp) {
    this.damage += damage;

    if (this.maxHp < this.currHp + hp) {
      this.currHp = this.maxHp;
    } else {
      this.currHp += hp;
    }
  }

  fightMonster(damage, hp) {
    // 몬스터랑 싸우기
    const attackCount = hp / this.damage;

    if (hp % this.damage === 0n) {
      this.currHp -= damage * (attackCount - 1n);
    } else {
      this.currHp -= damage * attackCount;
    }

    // 승패 여부에 따라
    return this.currHp <= 0 ? false : true;
  }
}

class Dungeon {
  constructor(rooms) {
    this.rooms = rooms;
    this.isClear = true;
  }

  init() {
    this.isClear = true;
  }

  start(soldier) {
    this.init();

    for (const [type, damage, hp] of rooms) {
      switch (type) {
        case 1n:
          const result = soldier.fightMonster(damage, hp);
          this.isClear = result;

          if (!result) return;
          break;
        case 2n:
          soldier.drinkPotion(damage, hp);
          break;
        default:
          break;
      }
    }
  }
}

function solution(rooms, initDamage) {
  const dungeon = new Dungeon(rooms);

  let ltr = 1n,
    rtr = MAX_HP;

  while (ltr < rtr) {
    const maxHp = (ltr + rtr) / 2n;
    dungeon.start(new Soldier(initDamage, maxHp));

    if (dungeon.isClear) {
      rtr = maxHp;
    } else {
      ltr = maxHp + 1n;
    }
  }

  return rtr.toString();
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [_, initDamage] = input[0].split(" ").map(Number);
const rooms = input.slice(1).map((el) => el.split(" ").map(BigInt));

console.log(solution(rooms, BigInt(initDamage)));
