(() => {
  'use strict';

  // Aside
  let eCreateBtn = _.getElement('#create-btn');
  let eAside = _.getElement('aside');

  // Task Form
  let eTaskForm = _.getElement('#task-form');
  let eTaskName = _.getElement('#task-name');
  let eDescription = _.getElement('#description');
  let eCancelBtn = _.getElement('#cancel-btn');
  let eSubmitBtn = _.getElement('#submit-btn');

  eCreateBtn.addEventListener('click', showTaskForm);
  eCancelBtn.addEventListener('click', hideTaskForm);
  eSubmitBtn.addEventListener('click', createTask);

  // ===========================================================================

  function createTask() {
    let nTaskCounter = (_.localGet('task-counter') || 0) + 1;
    let sTaskID = `task-${nTaskCounter}`;
    let oTask = {
      sTaskName: eTaskName.value,
      sDescription: eDescription.value,
      sID: sTaskID,
      sStatus: 'backlog'
    }

    oGlobals.oTasks.oBacklog[sTaskID] = oTask;
    _.localSet(sTaskID, oTask);
    _.localSet('task-counter', nTaskCounter);

    // Clear Fields
    eTaskName.value = '';
    eDescription.value = '';

    hideTaskForm();
  }

  function showTaskForm() {
    eCreateBtn.style.opacity = '0';

    setTimeout(() => {
      eCreateBtn.style.display = 'none';
      eAside.style.width = "350px";

      setTimeout(() => {
        eTaskForm.style.display = 'flex';

        setTimeout(() => {
          eTaskForm.style.opacity = '1';

          setTimeout(() => {
            eTaskName.focus();
          }, 100);
        }, 100);
      }, 250);
    }, 250);
  }

  function hideTaskForm() {
    eTaskForm.style.opacity = '0';

    setTimeout(() => {
      eTaskForm.style.display = 'none';
      eAside.style.width = "200px";

      setTimeout(() => {
        eCreateBtn.style.display = 'flex';
        eCreateBtn.style.opacity = '1';
      }, 250);
    }, 500);
  }

})();
