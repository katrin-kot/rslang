import View from './view'
import createNode from './createNode'

import diffLevel from './../../components/main/difficultOptions/difficultOptions'
import {getWordforGame} from './../../services/userWordService'
import {getUserID} from './../../services/authService'
class StartPageView extends View {
    constructor() {
      super()

      this.Sound = true

      this.trueAnswers = []
      this.wrongAnswers = []

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
      })
    }

    exitGame() {
        this.exitButton.addEventListener('click', event => {
            //event.preventDefault()

            console.log('ПЕРЕХОДИМ НА СТРАНИЦУ ТРЕНИРОВОК')
        })
    }

    displayGame() {
        // отображение обратного отсчета
        this.awaitBlock = createNode('div', 'await-block')
        this.keyboardImage = createNode('div', 'await-block__keyboard')
        this.promt = createNode('p', 'await-block__promt')
        this.promt.textContent = 'Используйте клавишы 1, 2, 3 и 4, чтобы дать быстрый ответ'

        this.diffLevel = createNode('div')
        this.diffLevel.innerHTML = diffLevel()

        this.form = createNode('form', 'await-block__form')

        this.inputField = createNode('input', 'form__input')
        this.inputField.setAttribute('placeholder', 'Введите число от 5 до 20')
        this.inputField.setAttribute('required', 'true')

        this.submitButton = createNode('button', 'button', 'form__button', 'button--start')
        this.submitButton.setAttribute('type', 'submit')
        this.submitButton.setAttribute('id', 'submitButton')
        this.submitButton.textContent = 'Продолжить'

        this.form.append(this.inputField, this.diffLevel, this.submitButton)

        this.awaitBlock.append(this.keyboardImage, this.promt, this.form)
        this.appContainer.append(this.awaitBlock)

        this.form.addEventListener('click', () => {
            const inputElements = this.form.querySelectorAll('input[type="radio"]')
            inputElements.forEach(item => {
                if (item.checked) {
                    localStorage.setItem('difficultSprint', item.value)
                } 
            })
        })

        this.continueListener()
    }

    continueListener() {
        this.form.addEventListener('submit', event => {
            event.preventDefault()
            let inputValue = this.form.querySelector('input').value

            if (this.error) this.error.remove()
            if (!Number.isInteger(Number(inputValue)) || inputValue > 20 || inputValue < 5) return this.showError()
            else {
                new Audio('/assets/audio/startGame.mp3').play()
                this.awaitBlock.classList.add('hidden')


                this.startLoading()
                this.updateBody()
                this.getInfo(inputValue)
            }
        })
    }

    showError() {
        this.error = createNode('p', 'form__error')
        this.error.textContent = 'Внимание! Введите число от 5 до 20'
        this.form.prepend(this.error)
        this.form.querySelector('input').value = ''
    }

    startLoading() {
        this.loading = createNode('div', 'loading')
        this.appContainer.append(this.loading)
    }

    stopLoading() {
        this.loading.remove()
    }

    updateBody() {
        this.soundToggle = createNode('button', 'button', 'button--sound')

        this.soundToggle.addEventListener('click', event => {
            event.preventDefault()

            event.target.classList.toggle('sound-disabled')

            this.Sound = this.Sound ? false : true
        })

        this.lifesWrapper = createNode('div', 'lifes-wrapper')
        for (let i = 0; i < 5; i++) {
            const heartIcon = createNode('div', 'heart-icon')
            heartIcon.setAttribute('data-heart', `${i + 1}`)
            this.lifesWrapper.append(heartIcon)
        }

        this.topButtonsWrapper.prepend(this.soundToggle, this.lifesWrapper)

        this.gameBlock = createNode('div', 'game-block')
        this.engWord = createNode('button', 'button', 'button--english')

        this.rusAnswersSection = createNode('div', 'answers-wrapper')
        for (let i = 0; i < 4; i++) {
            const answerButton = createNode('button', 'button', 'button--rus')
            answerButton.setAttribute('data-answer', `${i + 1}`)
            this.rusAnswersSection.append(answerButton)
        }
        
        this.gameBlock.append(this.engWord, this.rusAnswersSection)
        this.appContainer.append(this.gameBlock)
    }

    async getInfo(numberOfWords) {

        try {
            let dataArray = await getWordforGame(getUserID(), localStorage.getItem('difficultSprint'), numberOfWords)
            if (dataArray.Error) {
                this.stopLoading()
                throw new Error(dataArray.Error)
            }

            const data = dataArray.filter((item, index) => index < numberOfWords)

            let rusAnswers = []

            for (let key of dataArray) {
                rusAnswers.push(key.wordTranslate)
            }

            this.updateButtonsContent(data, rusAnswers)
            this.waitingAnswer(data, rusAnswers)
            this.stopLoading()

        } catch (e){
            alert(e)
        }
    }

    updateButtonsContent(data, rusAnswers) {
        
        this.engWord.textContent = data[data.length - 1].word
        this.engWord.setAttribute('data-trans', data[data.length - 1].wordTranslate)

        let answersArray = this.rusAnswersSection.querySelectorAll('button')
        let answerWords = []

        let dataLength = data.length - 1

        for (let i = 0; i < 4; i++) {
            if (dataLength - i < 0) {
                dataLength = data.length + i + 10
            }
            answerWords.push(rusAnswers[dataLength - i])
        }
        
        let sortAnsArray = answerWords.sort(() => Math.random() - 0.5)

        answersArray.forEach((item, index) => {
            item.textContent = sortAnsArray[index]
        })
    }

    waitingAnswer(data, rusAnswers) {

        /*let timerId = setTimeout(() => {
            this.getWrongAnswer(data)
        }, 4000)*/

        this.rusAnswersSection.addEventListener('click', event => {
            event.preventDefault()

            if (event.target.tagName !== 'BUTTON') return
            else {
                //clearTimeout(timerId)
                if (event.target.textContent == this.engWord.getAttribute('data-trans')) {
                    this.getRightAnswer(data, rusAnswers)
                } else {
                    this.getWrongAnswer(data, rusAnswers) 
                }
            }
        })

        document.addEventListener('keydown', event => {
            event.preventDefault()

            let answers = this.rusAnswersSection.querySelectorAll('button')

            if (event.code == 'Digit1' || event.code == 'Numpad1') {
                //clearTimeout(timerId)
                
                if (answers[0].textContent == this.engWord.getAttribute('data-trans')) {
                    this.getRightAnswer(data, rusAnswers)
                } else {
                    this.getWrongAnswer(data, rusAnswers)
                }
            }
            
            if (event.code == 'Digit2' || event.code == 'Numpad2') {
                //clearTimeout(timerId)

                if (answers[1].textContent == this.engWord.getAttribute('data-trans')) {
                    this.getRightAnswer(data, rusAnswers)
                } else {
                    this.getWrongAnswer(data, rusAnswers)
                }
            }

            if (event.code == 'Digit3' || event.code == 'Numpad3') {
                //clearTimeout(timerId)

                if (answers[2].textContent == this.engWord.getAttribute('data-trans')) {
                    this.getRightAnswer(data, rusAnswers)
                } else {
                    this.getWrongAnswer(data, rusAnswers)
                }
            }

            if (event.code == 'Digit4' || event.code == 'Numpad4') {
                //clearTimeout(timerId)

                if (answers[3].textContent == this.engWord.getAttribute('data-trans')) {
                    this.getRightAnswer(data, rusAnswers)
                } else {
                    this.getWrongAnswer(data, rusAnswers)
                }
            }
        })
    }

    getRightAnswer(data, rusAnswers) {
        this.trueAnswers.push(data.pop())
        
        if (this.Sound) new Audio('/assets/audio/correct.mp3').play()

        if (data.length == 0) return this.showResults()
                    
        this.updateButtonsContent(data, rusAnswers)
    }

    getWrongAnswer(data, rusAnswers) {
        this.wrongAnswers.push(data.pop())

        if (this.Sound) new Audio('/assets/audio/error.mp3').play()

        this.lifesWrapper.querySelector('.heart-icon').classList.add('heart-icon--disabled')
        this.lifesWrapper.querySelector('.heart-icon').classList.remove('heart-icon')

        let lostLifes = this.lifesWrapper.querySelectorAll('.heart-icon')
        
        if (lostLifes.length == 0 || data.length == 0) return this.showResults()

        this.updateButtonsContent(data, rusAnswers)
    }

    showResults() {
        new Audio('/assets/audio/endGame.mp3').play()       

        this.appContainer.innerHTML = ''
        this.overlay = createNode('div', 'overlay')

        this.resultsModal = createNode('div', 'game-results')

        this.resultsText = createNode('p', 'game-results__text')

        if (this.wrongAnswers.length == 0) {
            this.resultsText.textContent = 'Молодец! Отличный результат!'
        } else if (this.wrongAnswers.length < 4) {
            this.resultsText.textContent = 'Неплохо, но есть над чем поработать'
        } else this.resultsText.textContent = 'Слабо! Попробуй еще раз!'
            
        
        this.resultsLink = createNode('p', 'game-results__result')

        if (this.wrongAnswers.length == 0) {
            this.resultsLink.textContent = `${this.trueAnswers.length} слов изучено, ${this.wrongAnswers.length} слов на изучении`
        } else if (this.wrongAnswers.length == 1) {
            this.resultsLink.textContent = `${this.trueAnswers.length} слов изучено, ${this.wrongAnswers.length} слово на изучении`
        } else if (this.wrongAnswers.length < 5) {
            this.resultsLink.textContent = `${this.trueAnswers.length} слов изучено, ${this.wrongAnswers.length} слова на изучении`
        } else this.resultsLink.textContent = `${this.trueAnswers.length} слова изучено, ${this.wrongAnswers.length} слов на изучении`

        this.resultsDescriptionContainer = createNode('div', 'game-results__description')


        this.resultsRightContainer = createNode('div', 'game-results__right-block')

        this.resRightTitle = createNode('p', 'block-title', 'block-title--right')
        this.resRightTitle.textContent = `Знаю: ${this.trueAnswers.length}`

        this.resultsRightContainer.append(this.resRightTitle)

        if (this.trueAnswers.length !== 0) {
            this.trueAnswers.map(item => {
                this.resultsRightContainer.innerHTML += `<div>
                                                            <p class="game-results__answer">${item.word}  -  ${item.wordTranslate}</p>
                                                            <audio src="https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${item.audio}" preload="none"></audio>
                                                        </div>`
            })
        }



        this.resultsWrongContainer = createNode('div', 'game-results__wrong-block')

        this.resWrongTitle = createNode('p', 'block-title', 'block-title--wrong')
        this.resWrongTitle.textContent = `Ошибок: ${this.wrongAnswers.length}`

        this.resultsWrongContainer.append(this.resWrongTitle)

        if (this.wrongAnswers.length !== 0) {
            this.wrongAnswers.map(item => {
                this.resultsWrongContainer.innerHTML += `<div>
                                                            <p class="game-results__answer">${item.word}  -  ${item.wordTranslate}</p>
                                                            <audio src="https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${item.audio}" preload="none"></audio>
                                                        </div>`
            })
        }

        this.resultsDescriptionContainer.append(this.resultsRightContainer, this.resultsWrongContainer)

        
        
        this.tryAgain = createNode('p', 'game-results__try')
        this.tryAgain.textContent = 'Продолжить тренировку'

        this.backToAnotherTrain = createNode('p', 'game-results__back')
        this.backToAnotherTrain.textContent = 'К списку тренировок'

        this.resultsModal.append(this.resultsText, this.resultsLink, this.resultsDescriptionContainer, this.tryAgain, this.backToAnotherTrain)


        this.appContainer.append(this.overlay, this.resultsModal)

        this.resultsListener()
        this.playAudioResults()
        console.log(this.trueAnswers, this.wrongAnswers)
    }

    resultsListener() {
        this.appContainer.addEventListener('click', event => {
            event.preventDefault()

            if (event.target.tagName !== 'P') return
            else {
                if (event.target == this.resultsLink) {
                    this.resultsDescriptionContainer.classList.toggle('game-results__description--click')
                }

                if (event.target == this.tryAgain) {
                    window.location.reload()
                }

                if (event.target == this.backToAnotherTrain) {
                    console.log('ПЕРЕХОДИМ НА СТРАНИЦУ ТРЕНИРОВОК')
                }
            }
        })
    }

    playAudioResults() {
        this.resultsDescriptionContainer.addEventListener('click', event => {

            if (event.target.classList.value !== 'game-results__answer') return 
            else {
                event.target.closest('div').querySelector('audio').play()
            }
        })
    }
  }
  
  export default new StartPageView() 