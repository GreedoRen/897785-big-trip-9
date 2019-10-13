import { Info } from './components/info';
import { Menu } from './components/menu';
import { Filters } from './components/filter';
import { Sort } from './components/sort';
import { EventList } from './components/event-list';
import { Event } from './components/event';
import { EventEdit } from './components/event-edit';

const render = (container, html, place = `beforeend`) => {
	container.insertAdjacentHTML(place, html);
};

const tripInfoSection = document.querySelector(`section.trip-main__trip-info`);
render(tripInfoSection, Info(), `afterbegin`);

const tripControlsHeadings = document.querySelectorAll(`.trip-main__trip-controls h2`);
render(tripControlsHeadings[0], Menu(), `afterend`);
render(tripControlsHeadings[1], Filters(), `afterend`);

const eventListTempContainer = document.createElement(`div`);
render(eventListTempContainer, EventList());

const tripEventsList = eventListTempContainer.querySelector(` ul.trip-events__list`);
render(tripEventsList, EventEdit());
for (let i = 3; i > 0; i--) {
	render(tripEventsList, Event());
}

const tripEventsSection = document.querySelector(`section.trip-events`);
render(tripEventsSection, Sort() + eventListTempContainer.innerHTML);
