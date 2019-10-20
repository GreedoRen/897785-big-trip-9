import {Info} from './components/info';
import {Menu} from './components/menu';
import {Filters} from './components/filter';
// import {Sort} from './components/sort';
import {EventList} from './components/eventList';
import {Event} from './components/event';
import {EventEdit} from './components/eventEditor';
import {cityEvent, dateEvent, events} from "./utils/event";
import {dataMenu} from "./utils/menu";
import {dataFilters} from "./utils/filters";
import {render} from './utils/index';


const renderEvents = (data) => {
  tripEventsList.forEach((container) => {
    data.forEach((onlyCardData) => {
      const eventCard = new Event(onlyCardData);
      const eventForm = new EventEdit(onlyCardData);

      eventCard.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
        container.replaceChild(eventForm.getElement(), eventCard.getElement());
      });

      eventForm.getElement().querySelector(`.event--edit`).addEventListener(`submit`, () => {
        container.replaceChild(eventCard.getElement(), eventForm.getElement());
      });

      eventForm.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
        container.replaceChild(eventCard.getElement(), eventForm.getElement());
      });
      render(container, eventCard.getElement());
    });
  });
};
const renderMenu = (data) => {
  const tripControls = new Menu(data);
  render(tripControlsElement, tripControls.getElement());
};
const renderFilers = (data) => {
  const tripFilters = new Filters(data);
  render(tripControlsElement, tripFilters.getElement());
};
const renderEventList = (data) => {
  const eventList = new EventList(data);
  render(tripEventsContainer, eventList.getElement());
};
const renderTripInfo = (data) => {
  const tripInfo = new Info(data);
  render(tripInfoSection, tripInfo.getElement(), `begin`);
};
const updatePrice = (data) => {
  costValueElement.innerHTML = data;
};


const tripInfoSection = document.querySelector(`section.trip-main__trip-info`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const costValueElement = document.querySelector(`.trip-info__cost-value`);
const tripEventsContainer = document.querySelector(`.trip-events`);
let totalPrice = events.reduce((eventsPrice, currentItem) => {
  return eventsPrice + currentItem.price;
}, 0);

renderTripInfo(cityEvent);
renderMenu(dataMenu);
renderFilers(dataFilters);
renderEventList(dateEvent);
const tripEventsList = tripEventsContainer.querySelectorAll(`.trip-events__list`);
renderEvents(events);
updatePrice(totalPrice);
