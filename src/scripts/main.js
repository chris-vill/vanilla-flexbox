let oGlobals = {
  oTasks: {
    oInProgress: {},
    oBacklog: {},
    oArchived: {}
  }
};

let _ = {
  getElement: sSelector =>
    document.querySelector(sSelector),

  localGet: (sKey) => {
    let sVal = localStorage.getItem(sKey);

    return sVal ? JSON.parse(sVal) : sVal;
  },

  localSet: (sKey, oVal) =>
    localStorage.setItem(sKey, JSON.stringify(oVal))
};

(function() {
  'use strict';

  loadFromLocalStorage();

  function loadFromLocalStorage() {
    let nTaskCounter = _.localGet('task-counter');
    if (!nTaskCounter) return;

    for (let i = nTaskCounter; i > 0; i--) {
      let oTask = _.localGet(`task-${i}`);
      let aStatusMapping = {
        inprogress: 'oInProgress',
        backlog: 'oBacklog',
        archived: 'oArchived',
      }

      let sStatusKey = aStatusMapping[oTask.sStatus] || 'oBacklog';
      oGlobals.oTasks[sStatusKey][oTask.sID] = oTask;
    }
  }

}());
