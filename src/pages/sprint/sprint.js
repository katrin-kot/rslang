import './sprint.css';
import StartPage from './startPage';

class Builder {
  constructor() {
    this.startPage = new StartPage();
  }

  initialize() {
    this.startPage.getPage();
  }
}

const builder = new Builder();
builder.initialize();
