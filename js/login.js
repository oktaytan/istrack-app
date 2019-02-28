class Login {
  constructor() {
    this.labels = document.querySelectorAll('.form__control label');
    this.inputs = document.querySelectorAll('.form__control input');
    this.loginForm = document.querySelector('#loginForm');
    this.alert = document.querySelector('.alert');
    this.users = [];
    try {
      this.data = JSON.parse(localStorage.getItem('user'));
      document.querySelector('#username').value = this.data[0];
      document.querySelector('#password').value = this.data[1];
    } catch (err) {
      console.log(err);
    }
  }

  inputActivation() {
    this.inputs.forEach(this.inputListener);
    this.labels.forEach(this.labelEndStatus);
  }

  inputListener(input) {
    input.addEventListener('focus', function () {
      this.labels.forEach(label => {
        if (input.dataset.for === label.getAttribute('for')) {
          if (!label.classList.contains('move')) {
            label.classList.add('move');
          }
        }
      });
    });
    input.addEventListener('blur', function () {
      this.labels.forEach(label => {
        if (input.value === '' && label.classList.contains('move')) {
          label.classList.remove('move');
        }
      });
    });
  }

  loginFormActive() {
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;

    if (username === '') {
      this.alert.classList.add('show');
      this.alert.innerHTML = 'Kullanıcı adını giriniz.';
      setTimeout(() => {
        this.alert.classList.remove('show');
      }, 4000);
    } else if (password === '') {
      this.alert.classList.add('show');
      this.alert.innerHTML = 'Parolanızı giriniz.';
      setTimeout(() => {
        this.alert.classList.remove('show');
      }, 4000);
    } else {
      this.users.push(username);
      this.users.push(password);
      localStorage.setItem('user', JSON.stringify(this.users));
      window.location.href = './index.html';
      let data = JSON.parse(localStorage.getItem('user'));
      username = data[0];
      password = data[1];
    }
  }

  labelEndStatus(label) {
    if (document.querySelector('#username').value !== '' && document.querySelector('#password').value !== '') {
      label.classList.add('move');
    }
  }
}

// Create new login instance
const login = new Login();
login.inputActivation();
login.loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  login.loginFormActive();
});