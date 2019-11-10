import Card from "../components/card.js";
import CardEdit from "../components/card-edit.js";
import {Position, KeyCode, render} from '../utils.js';
import {types, cities} from '../mocks/card.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import moment from 'moment';

export default class CardController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._card = new Card(data);
    this._cardEdit = new CardEdit(data);
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;

    this.init();
  }

  init() {
    flatpickr(this._cardEdit.getElement().querySelector(`input[name=event-start-time]`), {
      enableTime: true,
      dateFormat: `Y.m.d H:i`,
      defaultDate: this._data.startTime,
    });

    flatpickr(this._cardEdit.getElement().querySelector(`input[name=event-end-time]`), {
      enableTime: true,
      dateFormat: `Y.m.d H:i`,
      defaultDate: this._data.endTime,
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === KeyCode.ESCAPE || evt.key === KeyCode.ESC) {
        this._container.replaceChild(this._card.getElement(), this._cardEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._card.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._onChangeView();
        this._container.replaceChild(this._cardEdit.getElement(), this._card.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._cardEdit.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._container.replaceChild(this._card.getElement(), this._cardEdit.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._cardEdit.getElement()
      .addEventListener(`submit`, (evt) => {
        evt.preventDefault();

        const formData = new FormData(this._cardEdit.getElement());
        const entry = {
          type: types[types.findIndex((it) => it.id === formData.get(`event-type`))],
          city: cities[cities.findIndex((it) => it.name === formData.get(`event-destination`))],
          startTime: moment(formData.get(`event-start-time`)).format(),
          endTime: moment(formData.get(`event-end-time`)).format(),
          price: formData.get(`event-price`)
        };
        entry.type.offers.forEach((it) => {
          if (formData.get(`event-offer-${it.id}`)) {
            it.isApplied = true;
          } else {
            it.isApplied = false;
          }
        });

        this._onDataChange(entry, this._data);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._container, this._card.getElement(), Position.BEFOREEND);
  }

  setDefaultView() {
    if (this._container.contains(this._cardEdit.getElement())) {
      this._container.replaceChild(this._card.getElement(), this._cardEdit.getElement());
    }
  }

}