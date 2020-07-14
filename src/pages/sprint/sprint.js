import './sprint.css';
import StartPage from './startPage';
import Game from './game';
import Result from './result';
import { infoPage } from './infoPage';

class Builder {
  constructor() {
    this.resultPage = new Result();
    this.gamePage = new Game();
    this.startPage = new StartPage();
  }

  initialize() {
    infoPage(this.startPage, this.gamePage, this.resultPage);
  }
}

const builder = new Builder();
builder.initialize();
