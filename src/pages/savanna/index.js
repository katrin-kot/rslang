import View from './view'
import createNode from './createNode'
class StartPageView extends View {
    constructor() {
      super()

      this.appContainer = createNode('div', 'savanna');

      this.app.append(this.appContainer)

      this.topButtonsWrapper = createNode('div', 'wrapper', 'wrapper--top-buttons')

      this.exitButton = createNode('button', 'button', 'button--return')
      

      this.startContainer = createNode('div', 'container')
      this.title = createNode('h1', 'savanna__title')
      this.title.textContent = 'Саванна'
      this.descriptionGame = createNode('p', 'savanna__description')
      this.descriptionGame.textContent = 'Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь'
      this.buttonStartGame = createNode('button', 'button', 'button--start')
      this.buttonStartGame.textContent = 'Начать'
    }
  
    render() {
        this.topButtonsWrapper.append(this.exitButton)
        this.startContainer.append(this.title, this.descriptionGame, this.buttonStartGame)
        this.appContainer.append(this.topButtonsWrapper, this.startContainer)

      this.startGame()
      this.exitGame()
    }
  
    startGame() {
      this.buttonStartGame.addEventListener('click', event => {
          event.preventDefault()
        this.startContainer.classList.add('hidden')

        this.displayGame()
      });
    }

    exitGame() {
        this.exitButton.addEventListener('click', event => {
            event.preventDefault()

            // реализовать переход на страницу выбора мини-игр
        })
    }

    displayGame() {
        // отображение обратного отсчета
        this.awaitBlock = createNode('div', 'await-block')
        this.keyboardImage = createNode('div', 'await-block__keyboard')
        this.promt = createNode('p', 'await-block__promt')
        this.promt.textContent = 'Используйте клавишы 1, 2, 3 и 4, чтобы дать быстрый ответ'

        this.awaitBlock.append(this.keyboardImage, this.promt)
        this.appContainer.append(this.awaitBlock)

        setTimeout(()=> {
            this.awaitBlock.classList.add('hidden')

            this.updateBody()
        }, 3000)
    }

    updateBody() {
        this.soundToggle = createNode('button', 'button', 'button--sound')

        this.soundToggle.addEventListener('click', event => {
            event.preventDefault()

            event.target.classList.toggle('sound-disabled')

            // + добавить отключение/включение звуков
        })

        this.lifesWrapper = createNode('div', 'life-wrapper')
        for (let i = 0; i < 5; i++) {
            const heartIcon = createNode('div', 'heart-icon')
            heartIcon.setAttribute('data-heart', `${i + 1}`)
            this.lifesWrapper.append(heartIcon)
        }

        this.topButtonsWrapper.prepend(this.soundToggle, this.lifesWrapper)

        this.gameBlock = createNode('div', 'game-block')
        this.engWord = createNode('button', 'button', 'button--english')

        this.rusAnswersSection = createNode('div', 'answer-wrapper')
        for (let i = 0; i < 4; i++) {
            const answerButton = createNode('button', 'button', 'button--rus')
            answerButton.setAttribute('data-answer', `${i + 1}`)
            this.rusAnswersSection.append(answerButton)
        }
        
        this.gameBlock.append(this.engWord, this.rusWordsSection)
        this.appContainer.append(this.gameBlock)

        this.rusAnswersSection.addEventListener('click', event => {
            event.preventDefault()

            if (event.target.tagName !== 'BUTTON') return
            else {
                console.log('Your answer')
            }
        })
    }
  }
  
  export default new StartPageView()