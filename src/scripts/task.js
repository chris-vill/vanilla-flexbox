(() => {
  'use strict';

  // Aside
  let eCreateBtn = _.getElement('#create-btn');
  let eAside = _.getElement('aside');
  let eTaskView = _.getElement('#task-view');

  // Task Form
  let eTaskForm = _.getElement('#task-form');
  let eTaskName = _.getElement('#task-name');
  let eDescription = _.getElement('#description');
  let eCancelBtn = _.getElement('#cancel-btn');
  let eSubmitBtn = _.getElement('#submit-btn');

  // Task List
  let eBacklogList = _.getElement('#inprogress ul');
  let eInProgressList = _.getElement('#backlog ul');
  let eArchivedList = _.getElement('#archived ul');

  // Aside Events
  eCreateBtn.addEventListener('click', showTaskForm);
  eCancelBtn.addEventListener('click', hideTaskForm);
  eSubmitBtn.addEventListener('click', createTask);

  // Task List Events
  eBacklogList.addEventListener('click', showTask);
  eInProgressList.addEventListener('click', showTask);
  eArchivedList.addEventListener('click', showTask);

  // ===========================================================================

  function createTask() {
    let nTaskCounter = (_.localGet('task-counter') || 0) + 1;
    let sTaskID = `task-${nTaskCounter}`;
    let oTask = {
      sTaskName: eTaskName.value,
      sDescription: eDescription.value,
      sId: sTaskID,
      sStatus: 'backlog'
    }

    // Save Task
    oGlobals.oTasks.oBacklog[sTaskID] = oTask;
    _.localSet(sTaskID, oTask);
    _.localSet('task-counter', nTaskCounter);

    // Display Task
    _.appendTask(oTask, eBacklogList);


    // Clear Fields
    eTaskName.value = '';
    eDescription.value = '';

    hideTaskForm();
  }

  function showTask({ target }) {
    if (['UL', 'INPUT'].indexOf(target.tagName) > -1) {
      return;
    }

    if (target.tagName !== 'LI') {
      target = target.parentElement;
    }

    // Get Task Object
    let sTaskId = _.getElement('input', target).value;
    let sTaskStatus = oGlobals.aStatusMapping[target.parentElement.parentElement.id];
    let oTask = oGlobals.oTasks[sTaskStatus].find(({ sId }) => {
      return sId === sTaskId;
    });

    // Add elements
    eTaskView.innerHTML = `
      <header>
        <h4>${oTask.sTaskName}</h4>
        <div class="close-task-btn">X</div>
      </header>
      <span>${oTask.sStatus}</span>
      <p>${oTask.sDescription}</p>
    `;

    // Add Events
    let eCloseTaskBtn = _.getElement('.close-task-btn');
    eCloseTaskBtn.addEventListener('click', closeTask);

    // Make Task View visible
    eTaskView.style.display = 'flex';
    setTimeout(() => {
      eTaskView.style.width = '350px';

      setTimeout(() => {
        eTaskView.classList.add('show');
      }, 250);
    }, 0);
  }

  function closeTask() {
    let eCloseTaskBtn = _.getElement('.close-task-btn');
    eCloseTaskBtn.removeEventListener('click', closeTask);
    eTaskView.innerHTML = '';

    // Make Task View hidden
    eTaskView.classList.remove('show');
    setTimeout(() => {
      eTaskView.style.width = '0';

      setTimeout(() => {
        eTaskView.style.display = 'none';
      }, 250);
    }, 250);
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
