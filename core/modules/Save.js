class Stat {
  constructor() {
    this.OwnerID = [];
  }
  addOwnerID(name) {
    if (this.OwnerID.includes(name)) return;
    this.OwnerID.push(name);
  }
}
var stat = new Stat();

module.exports = {
  stat,
};
