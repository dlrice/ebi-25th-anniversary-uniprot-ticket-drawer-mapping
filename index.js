import Chance from "chance";

const seed = "EBI 25 Anniversary";
const minDrawer = 0;
const maxDrawer = 9;
const minTicket = 10 ** 4;
const maxTicket = 10 ** 5;

let chance;
let ticketToDrawer;
let drawerToTicket;

const setup = () => {
  const range = (start, stop) =>
    Array.from({ length: stop - start + 1 }, (x, i) => i + start);

  ticketToDrawer = {};
  drawerToTicket = range(minDrawer, maxDrawer).reduce(
    (o, n) => ({ ...o, [n]: [] }),
    {}
  );

  chance = new Chance(seed);

  for (let ticket = minTicket; ticket < maxTicket; ticket++) {
    const drawer = chance.integer({ min: minDrawer, max: maxDrawer });
    ticketToDrawer[ticket] = drawer;
    drawerToTicket[drawer].push(ticket);
  }

  // reset so that ticket selection is random between successive runs
  chance = new Chance();
};

const getDrawer = ticket => ticketToDrawer[ticket];

const getTicket = drawer => chance.pickone(drawerToTicket[drawer]);
