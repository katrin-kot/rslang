import './sprint.css';
import StartPage from './startPage';
import Game from './game';
import Result from './result';

class Builder {
  constructor() {
    this.resultPage = new Result();
    this.gamePage = new Game();
    this.startPage = new StartPage();
  }

  initialize() {
    this.startPage.initPage(this.startPage, this.gamePage, this.resultPage);
  }
}

const builder = new Builder();
builder.initialize();
