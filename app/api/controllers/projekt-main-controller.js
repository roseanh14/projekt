"use strict";
const ProjektMainAbl = require("../../abl/projekt-main-abl.js");

class ProjektMainController {
  init(ucEnv) {
    return ProjektMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return ProjektMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return ProjektMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new ProjektMainController();
