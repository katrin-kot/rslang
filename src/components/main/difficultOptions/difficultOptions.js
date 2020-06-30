import './difficultOptions.css';

export default () => {
  const form = `
    <form class="form-difficult" action="difficult">
    <b>Выберите уровень сложности слов:</b>
     <input id="radio-difficult-1" name="difficult" type="radio" value="0" checked>
     <label class="label-difficult" for="radio-difficult-1">Базовый</label>
     <br>
     <input id="radio-difficult-2" name="difficult" type="radio" value="1">
     <label class="label-difficult" for="radio-difficult-2">Начальный</label>
     <br>
     <input id="radio-difficult-3" name="difficult" type="radio" value="3">
     <label class="label-difficult" for="radio-difficult-3">Лёгкий</label>
     <br>
     <input id="radio-difficult-4" name="difficult" type="radio" value="4">
     <label class="label-difficult" for="radio-difficult-4">Средний</label>
     <br>
     <input id="radio-difficult-5" name="difficult" type="radio" value="5">
     <label class="label-difficult" for="radio-difficult-5">Сложный</label>
     <br>
     <input id="radio-difficult-6" name="difficult" type="radio" value="6">
     <label class="label-difficult" for="radio-difficult-6">Максимальный</label>
   </form> `;

  return form;
};
