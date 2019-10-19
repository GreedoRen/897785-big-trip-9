import {info} from './components/info';
import {menu} from './components/menu';
import {filters} from './components/filter';
import {sort} from './components/sort';
import {eventList} from './components/eventList';
import {event} from './components/event';
import {eventEdit} from './components/eventEditor';
import {cityEvent, dateEvent, events} from "./utils/event";
import {dataMenu} from "./utils/menu";
import {dataFilters} from "./utils/filters";


const render = (container, html, place = `beforeend`) => {
  container.insertAdjacentHTML(place, html);
};
const renderEvents = (containers, template, data, place = `beforeend`) => {
  containers.forEach((container) => {
    data.forEach((i) => container.insertAdjacentHTML(place, template(i)));
  });
};
const renderMenu = (container, template, data, place = `afterend`) => {
  container.insertAdjacentHTML(place, template(data));
};
const renderFilers = (container, template, data, place = `afterend`) => {
  container.insertAdjacentHTML(place, template(data));
};
const renderEventList = (container, template, data, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template(data));
};
const renderTripInfo = (container, template, data, place = `afterbegin`) => {
  container.insertAdjacentHTML(place, template(data));
};
const renderEventEdit = (container, template, data, place = `afterbegin`) => {
  container.insertAdjacentHTML(place, template(data));
};
const pushCostSumm = (element, data) => {
  element.innerHTML = data.reduce((value, currentItem) => {
    return value + currentItem.price;
  }, 0);
};

const tripInfoSection = document.querySelector(`section.trip-main__trip-info`);
const tripControlsHeadings = document.querySelectorAll(`.trip-main__trip-controls h2`);
const tripEventsSection = document.querySelector(`section.trip-events`);
const costValueElement = document.querySelector(`.trip-info__cost-value`);
const eventListTempContainer = document.createElement(`div`);

renderTripInfo(tripInfoSection, info, cityEvent);
renderMenu(tripControlsHeadings[0], menu, dataMenu); //
renderFilers(tripControlsHeadings[1], filters, dataFilters); //
renderEventList(eventListTempContainer, eventList, dateEvent);
const tripEventsList = eventListTempContainer.querySelectorAll(`.trip-events__list`);
renderEventEdit(tripEventsList[0], eventEdit, events[0]);
renderEvents(tripEventsList, event, events);
render(tripEventsSection, sort() + eventListTempContainer.innerHTML);
pushCostSumm(costValueElement, events);
