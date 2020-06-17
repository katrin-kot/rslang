class Result {
  constructor() {}
}

class Game {
  constructor() {}
}

class StartPage {
  constructor() {}

  getPage() {
    const body = document.querySelector('body');
    body.innerHTML = 'я спринт';
  }
}

class Builder {
  constructor() {
    this.startPage = new StartPage();
    this.game = new Game();
    this.Result = new Result();
  }

  initialize() {
    this.startPage.getPage();
  }
}

const builder = new Builder();
builder.initialize();
