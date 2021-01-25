let oGlobals = {
  aStatusMapping: {
    inprogress: 'oInProgress',
    backlog: 'oBacklog',
    archived: 'oArchived',
  },
  oTasks: {
    oInProgress: [],
    oBacklog: [],
    oArchived: []
  }
};

let _ = {
  appendTask: ({ sId, sTaskName }, eParent) => {
    eParent.innerHTML += `
      <li>
        <input type="checkbox" value="${sId}">
        <span>${sTaskName}</span>
      </li>
    `;
  },

  getElement: (sSelector, eParent) =>
    (eParent || document).querySelector(sSelector),

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
  displayTasks();

  function loadFromLocalStorage() {
    let nTaskCounter = _.localGet('task-counter');
    if (!nTaskCounter) return;

    for (let i = nTaskCounter; i > 0; i--) {
      let oTask = _.localGet(`task-${i}`);

      let sStatusKey = oGlobals.aStatusMapping[oTask.sStatus] || 'oBacklog';
      oGlobals.oTasks[sStatusKey].push(oTask);
    }
  }

  function displayTasks() {
    let eInProgressList = _.getElement('#inprogress ul');
    let eBacklogList = _.getElement('#backlog ul');
    let eArchivedList = _.getElement('#archived ul');

    oGlobals.oTasks.oInProgress.forEach(oTask => {
      _.appendTask(oTask, eInProgressList);
    });

    oGlobals.oTasks.oBacklog.forEach(oTask => {
      _.appendTask(oTask, eBacklogList);
    });

    oGlobals.oTasks.oArchived.forEach(oTask => {
      _.appendTask(oTask, eArchivedList);
    });
  }

}());
