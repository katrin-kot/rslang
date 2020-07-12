import { createElement } from '../SRgame/helpers';

export default class Member {
  constructor({
    name, image, github, description,
  }) {
    this.name = name;
    this.image = image;
    this.github = github;
    this.description = description;
  }

  createMemberElement() {
    const element = createElement('div', 'team-member');
    const template = `
      <div class="team__image"><img src="assets/images/team/${this.image}.JPG" alt="photo"></div>
      <a class="team__github" href="https://github.com/${this.github}">${this.name}</a>
      <div class="team__description">${this.description}</div>`;
    element.innerHTML = template;
    return element;
  }
}
