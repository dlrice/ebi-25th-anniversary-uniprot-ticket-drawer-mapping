import Chance from 'chance';

let chance;
let ticketToDrawer;
let drawerToTicket;

export const range = (start, stop) => Array.from({ length: stop - start + 1 }, (x, i) => i + start);

export const setup = ({ seed, minDrawer, maxDrawer, minTicket, maxTicket }) => {
  ticketToDrawer = {};
  drawerToTicket = range(minDrawer, maxDrawer).reduce((o, n) => ({ ...o, [n]: [] }), {});
  chance = new Chance(seed);

  for (let ticket = minTicket; ticket < maxTicket; ticket++) {
    const drawer = chance.integer({ min: minDrawer, max: maxDrawer });
    ticketToDrawer[ticket] = drawer;
    drawerToTicket[drawer].push(ticket);
  }

  // reset so that ticket selection is random between successive runs
  chance = new Chance();
};

export const getDrawer = ticket => ticketToDrawer[ticket];

export const getTicket = drawer => chance.pickone(drawerToTicket[drawer]);

export const generateTestData = () => {
  const ticketToDrawerTestData = {};
  chance.pickset(Object.keys(ticketToDrawer), 1000).forEach(ticket => {
    ticketToDrawerTestData[ticket] = ticketToDrawer[ticket];
  });
  console.log(ticketToDrawerTestData);
};
