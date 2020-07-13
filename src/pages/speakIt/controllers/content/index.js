import PubSub from '../pubSub';
import ContentView from '../../views/content';

class ContentController {
  init() {
    PubSub.subscribe('loadContent', this.loadContent);
  }

  loadContent() {
    ContentView.render();
  }
}

export default new ContentController();
