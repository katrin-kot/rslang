import './promo.css';
import { header } from '../../components/main/header/header';
import { footer } from '../../components/main/footer/footer';

const body = document.querySelector('body');
header();
const main = document.createElement('main');
main.innerHTML = `
<div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
    <img src="../../../assets/images/angliyskiy.jpg" alt="bg">
      <div class="carousel-caption d-md-block">
        <h1>Приветствуем вас в RS LangOctopus</h1>
        <img class="carousel-logo" src="../../../assets/images/logo.png">
      </div>
    </div>
    <div class="carousel-item">
   
      <img src="https://media.istockphoto.com/photos/colorful-english-word-cube-on-white-paper-background-picture-id646095094?k=6&m=646095094&s=612x612&w=0&h=tuJpV9Glz39spdzAp6XhEftIzPoHNWrFop-7a_8RJlc=" class="carousel-img" alt="...">
      <div class="carousel-caption d-md-block">
        <h1>Учи слова</h1>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://image.freepik.com/free-photo/english-lettering-blue-wooden-background_23-2148293461.jpg" class="carousel-img" alt="...">
      <div class="carousel-caption  d-md-block">
        <h1>Занимайся чаще</h1>
      </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

<div class="container">
<div id="about">
  <div id="heading" class="row">
    <h1 class="col-12">Лучший способ пополнить словарный запас это - RS LangOctopus</h1>
    <video class="col-12 col-sm-6" controls="controls"><source src="../../../assets/video/video.mp4"></source></video>
    <p class="lead col-12 col-sm-6">
    RS LangOctopus – приложение для изучения иностранных слов с методикой интервального повторения, отслеживанием индивидуального прогресса и мини-играми. 
    Главная страница - это основная часть приложения, в которой происходит изучение новых слов. Её прототипами являются приложение Lingvist и программа Anki.
    Всего в нашем приложении пять мини-игр: "SpeakIt", "Саванна", "Аудиовызов", "Спринт" и "Найди пару". 
    </p>
  </div>
  <div class="divider"></div>
  <div class="row">
    <div class="col-12 col-sm-8">
    <h3>Основная игра</h3>
      <p class="lead">
      Игра основана на методике интервального повторения. На поле появляется карточка с изучаемым словом.
      На карточке изображены подсказки. В поле ввода записывается слово.
      После нажатия на клавишу enter появляется перевод предложений и транскрипция, а также буквы в слове подсвечиваются:
      правильно - зеленый;
      мало ошибок - оранжевый;
      много ошибок - красный.
      Количество ошибок рассчитывается по формуле если мало значит меньше кол-во букв в слове / 2, если много то больше.
      В игре 6 интервалов (в днях): 1,3,7,10,14,21
      Эти интервалы меняются пользователем при нажатии кнопок(дни умножаются на коэффициент):
      Кнопки выбора сложности - коэффициент к дням: Трудно - 0.5, Хорошо - 1, Легко - 2
      При нажатии кнопки Снова или игрок ошибся в слове - слово показывается ещё раз в этой же игре.
      Если в изучаемом слове была допущена ошибка в ходе мини-игры, карточка с ним появится на ближайшей тренировке.
      </p>
         </div>
    <div class="col-12 col-sm-4">
      <img
        class="img-polaroid"
        src="../../../assets/images/sr.png"
        alt=""
      />
    </div>
  <div class="row">
    <div class="col-12 col-sm-4">
      <img
        class="img-polaroid"
        src="../../../assets/images/audiocall.png"
        alt=""
      />
    </div>
    <div class="col-12 col-sm-8">
    <h3>Игра "Аудиовызов"</h3>
      <p class="lead">
      Ход игры: звучит произношение слова на английском языке, 
      нужно выбрать перевод слова из пяти предложенных вариантов ответа.
      по мере прохождения игры плавно изменяется цвет фона как индикация прогресса прохождения
      </p>
        </div>
  </div>
  <div class="row">
    <div class="col-12 col-sm-8">
    <h3>Игра "Спринт"</h3>
      <p class="lead">
      Ход игры: пользователь видит слово на английском языке и перевод слова,
       нужно указать принадлежит ли данный перевод этому слову.
      Продолжительность раунда 1 минута (есть индикация времени), 
      в начале игры за каждое угаданное слово начисляется 10 баллов, 
      каждые четыре правильных ответа подряд увеличивают количество 
      баллов за каждое угаданное слово вдвое, при ошибке за угаданное 
      слово снова начисляется только 10 баллов.
      </p>
         </div>
    <div class="col-12 col-sm-4">
      <img
        class="img-polaroid"
        src="../../../assets/images/sprint.png"
        alt=""
      />
    </div>
    <div class="row">
    <div class="col-12 col-sm-4">
      <img
        class="img-polaroid"
        src="../../../assets/images/savanna.png"
        alt=""
      />
    </div>
    <div class="col-12 col-sm-8">
    <h3>Игра "Саванна"</h3>
      <p class="lead">
      Ход игры: После отчета стартовых секунд перед тобой появится 
      падающее вниз слово на английском и четыре варианта перевода. 
      Выбирать правильный ответ ты можешь двумя способами:
      кликнуть по нему мышкой;
      использовать клавиши 1, 2, 3, 4.
      Если ответ неправильный, или ты просто не успел его дать, то жизни уменьшаются.
      </p>
        </div>
  </div>
  <div class="row">
  <div class="col-12 col-sm-8">
  <h3>Игра "SpeakIt"</h3>
    <p class="lead">
    Ход игры: слова выводятся на страницу группами по 10 слов. Возле каждого слова отображается транскрипция и иконка аудио
    при клике по слову звучит его произношение, выводятся соответствующие данному слову картинка и перевод.
    Если распознавание речи включено, и приложению разрешён доступ к микрофону, все произнесённые игроком
    слова распознаются и отображаются в текстовом виде.
    </p>
       </div>
  <div class="col-12 col-sm-4">
    <img
      class="img-polaroid"
      src="../../../assets/images/speak.png"
      alt=""
    />
  </div>
  <div class="row">
  <div class="col-12 col-sm-4">
    <img
      class="img-polaroid"
      src="../../../assets/images/memory.png"
      alt=""
    />
  </div>
  <div class="col-12 col-sm-8">
  <h3>Игра "Найди пару"</h3>
    <p class="lead">
    Ход игры: 
    Вначале игры игроку дается 5 секунд запомнить расположение карточек, потом
          карточки переворачиваются рубашкой вверх. Игрок переворачивает по две карточки.
          Если слово на английском совпало с его переводом карточки обратно
          не переворачиваются. Если карточки не совпали – они переворачиваются обратно,
          игрок должен запомнить их. Зная расположение карточек, он сможет
          переворачивать правильные. Цель игры: перевернуть все карточки,
          совершив меньше ошибок
    </p>
      </div>
</div>
 

  </div>
</div>
<div class="divider"></div>

<div id="screenshots" class="row">
  <h1 class="col-12">Скриншоты приложения</h1>
  <div class="col-12 col-sm-6">
    <img class="img-polaroid" src="../../../assets/images/screen1.png" alt="" />
  </div>
  <div class="col-12 col-sm-6">
    <img class="img-polaroid" src="../../../assets/images/stat.png" alt="" />
  </div>
  <div class="col-12 col-sm-6">
    <img class="img-polaroid" src="../../../assets/images/savannn.png" alt="" />
  </div>
  <div class="col-12 col-sm-6">
    <img class="img-polaroid" src="../../../assets/images/dict.png" alt="" />
  </div>
   </div>
<div class="divider"></div>
</div>
</div>
`;
body.appendChild(main);
footer();
