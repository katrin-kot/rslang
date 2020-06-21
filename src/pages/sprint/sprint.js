import './sprint.css';
import Game from './game';
import Result from './result';
import StartPage from './startPage';
class Builder {
  constructor() {
    this.startPage = new StartPage();
    //this.game = new Game();
    //this.result = new Result();
  }

  initialize() {
    this.startPage.getPage();
    //this.game.getPage();
    //this.result.getPage();
  }
}

const builder = new Builder();
builder.initialize();
