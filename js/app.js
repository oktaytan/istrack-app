class App {
  constructor() {
    this.avatar = document.querySelector(".avatar");
    this.user = document.querySelector(".user");
    this.menu = document.querySelector(".menu");
    this.message_valid = document.querySelector(".message_valid");
    this.message_invalid = document.querySelector(".message_invalid");
    this.taskForm = document.querySelector("#addTask");
    this.taskList = document.querySelector("#taskList");
    this.username = JSON.parse(localStorage.getItem("user"))[0];
    this.x = document.getElementsByClassName("custom-select");
    this.a = document.createElement("DIV");
    this.b = document.createElement("DIV");
    this.c = document.createElement("DIV");
    this.idStack = [
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      "Q",
      "W",
      "E",
      "R",
      "T",
      "Y",
      "U",
      "I",
      "O",
      "P",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0"
    ];
  }

  // Create select custom selectbox
  createSelectBox() {
    /* Look for any elements with the class "custom-select": */
    for (let i = 0; i < this.x.length; i++) {
      let selElmnt = this.x[i].getElementsByTagName("select")[0];
      /* For each element, create a new DIV that will act as the selected item: */
      this.a = document.createElement("DIV");
      this.a.setAttribute("class", "select-selected");
      this.a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      this.x[i].appendChild(this.a);
      /* For each element, create a new DIV that will contain the option list: */
      this.b = document.createElement("DIV");
      this.b.setAttribute("class", "select-items select-hide");
      for (let j = 0; j < selElmnt.length; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        this.c = document.createElement("DIV");
        this.c.innerHTML = selElmnt.options[j].innerHTML;
        this.c.addEventListener("click", function (e) {
          /* When an item is clicked, update the original select box,
          and the selected item: */
          let y, s, h;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          h = this.parentNode.previousSibling;
          for (let i = 0; i < s.length; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              for (let k = 0; k < y.length; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
        });
        this.b.appendChild(this.c);
      }
      this.x[i].appendChild(this.b);
      this.a.addEventListener("click", (e) => {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        this.closeAllSelect(this.a);
        this.a.nextSibling.classList.toggle("select-hide");
        this.a.classList.toggle("select-arrow-active");
      });
    }
  }

  submitThenSelectItemsReset() {
    let select = document.querySelector('.select-selected');
    select.textContent = 'Low';
  }

  // Close select
  closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (let i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (let i = 0; i < x.length - 1; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }

  // Setting the user tag to the avatar's center
  userCenter() {
    this.user.innerHTML = this.username;
    let avatarCenter = this.avatar.offsetLeft + this.avatar.offsetWidth / 2;
    let userPosition = avatarCenter - this.user.offsetWidth / 2;
    this.user.style.left = `${userPosition}px`;
  }

  // Menu show
  menuShow() {
    if (this.menu.classList.contains("show")) {
      this.menu.classList.remove("show");
    } else {
      this.menu.classList.add("show");
    }
  }

  // Menu hide
  menuHide(e) {
    if (e.target !== this.avatar && e.target !== this.menu) {
      if (this.menu.classList.contains("show")) {
        this.menu.classList.remove("show");
        this.user.classList.remove("show");
      }
    }
  }

  // User label show
  userShow() {
    if (!this.user.classList.contains("show")) {
      this.user.classList.add("show");
    }
  }

  // User label show
  userHide() {
    if (!this.menu.classList.contains("show")) {
      this.user.classList.remove("show");
    }
  }

  // Fetch existing tasks
  getTasks() {
    try {
      this.taskList.innerHTML = "";
      if (JSON.parse(localStorage.getItem("tasks")).length !== 0) {
        let tasks = JSON.parse(localStorage.getItem("tasks"));

        for (let i = 0; i < tasks.length; i++) {
          let id = tasks[i].id;
          let desc = tasks[i].desc;
          let severity = tasks[i].severity;
          let team = tasks[i].team;
          let status = tasks[i].status;

          this.taskList.innerHTML += `
          <div class="task" data-id="${id}">
            <h4 class="task__title">Task ID : <span class="task__ID">${id}</span></h4>
            <span class="task__status ${status}">${status}</span>
            <h3 class="task__content">${desc}</h3>
            <div class="task__icons">
              <div class="task__icon"><i class="fas fa-signal"></i><span class="task__severity">${severity}</span></div>
              <div class="task__icon"><i class="fas fa-user-alt"></i><span class="task__author">${this.username}</span></div>
              <div class="task__icon"><i class="fas fa-sitemap"></i><span class="task__team">${team}</span></div>
            </div>
            <div class="task__buttons">
              <button class="btn task__close ${status}" type="button">Close</button>
              <button class="btn task__delete" type="button">Delete</button>
            </div>
          </div>
          `;
        }

      } else {
        this.taskList.innerHTML = `
          <div class="empty__list">
            <span>Hi<span class="user__name">${this.username}</span></span>
            There is no task here!
          </div>
        `;
      }

      // Set severity color
      this.severityTasksColorSet();

      this.closeDeleteActivate();
    } catch (err) {
      console.log(err);
    }
  }

  // Set severity color
  severityTasksColorSet() {
    const severityTasks = document.querySelectorAll(".task__severity");
    severityTasks.forEach(severityTask => {
      if (severityTask.innerHTML === "high") {
        severityTask.classList.add("high");
        severityTask.previousElementSibling.classList.add("high");
      } else if (severityTask.innerHTML === "medium") {
        severityTask.classList.add("medium");
        severityTask.previousElementSibling.classList.add("medium");
      } else if (severityTask.innerHTML === "low") {
        severityTask.classList.add("low");
        severityTask.previousElementSibling.classList.add("low");
      }
    });
  }

  closeDeleteActivate() {
    const closeBtns = document.querySelectorAll(".task__close");
    const deleteBtns = document.querySelectorAll(".task__delete");

    closeBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        btn.style.backgroundColor = "red";
        this.setStatusClosed(e);
      });
    });

    deleteBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        this.deleteTask(e);
      });
    });
  }

  setStatusClosed(e) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == e.target.parentElement.parentElement.dataset.id) {
        if (tasks[i].status !== "close") {
          tasks[i].status = "close";
        } else if (tasks[i].status === "close") {
          tasks[i].status = "open";
        }
      }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.getTasks();
  }

  deleteTask(e) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == e.target.parentElement.parentElement.dataset.id) {
        tasks.splice(i, 1);
      }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.getTasks();
  }

  randomID() {
    let id = "";
    for (let i = 0; i <= 9; i++) {
      let randomIndex = Math.floor(Math.random() * this.idStack.length);
      id += this.idStack[randomIndex];
    }
    return id;
  }

  setTask() {
    let id = this.randomID();
    let status = "open";
    let desc = document.querySelector("#description").value;
    let severity = document.querySelector("#severity").value;
    let team = document.querySelector("#team").value;

    let task = {
      id,
      desc,
      severity,
      team,
      status
    };

    if (localStorage.getItem("tasks") === null) {
      let tasks = [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    this.taskForm.reset();
    this.getTasks();
  }

  addForm() {
    let description = document.querySelector("#description").value;
    let severity = document.querySelector("#severity").value;
    let team = document.querySelector("#team").value;

    if (description === "" || severity === "" || team === "") {
      if (
        !this.message_valid.classList.contains("hide") &&
        !this.message_invalid.classList.contains("show")
      ) {
        this.message_valid.classList.add("hide");
        this.message_invalid.classList.add("show");
        setTimeout(() => {
          this.message_valid.classList.remove("hide");
          this.message_invalid.classList.remove("show");
        }, 3000);
      }
    } else {
      this.setTask();
      this.submitThenSelectItemsReset();
    }
  }
}





const app = new App();

function eventListeners() {
  app.avatar.addEventListener("click", () => {
    app.menuShow();
  });

  window.addEventListener("click", e => {
    app.menuHide(e);
    if (e.target !== app.a) {
      app.a.nextSibling.classList.add("select-hide");
      app.a.classList.remove("select-arrow-active");
    }
  });

  app.avatar.addEventListener("mouseenter", () => {
    app.userShow();
  });

  app.avatar.addEventListener("mouseleave", () => {
    app.userHide();
  });

  app.taskForm.addEventListener("submit", e => {
    e.preventDefault();
    app.addForm();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  app.createSelectBox();
  app.userCenter();
  app.getTasks();
  eventListeners();
});