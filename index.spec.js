import Chance from 'chance';
import { setup, getTicket, getDrawer, range } from '.';
import { ticketToDrawerTestData } from './testData';

const seed = 'EBI 25 Anniversary';
const minDrawer = 0;
const maxDrawer = 9;
const minTicket = 10 ** 4;
const maxTicket = 10 ** 5;

setup({
  seed,
  minDrawer,
  maxDrawer,
  minTicket,
  maxTicket,
});

chance = new Chance();

test('getDrawer(getTicket(x)) = x for 1000 randomly selected values of x', () => {
  chance.pickset(range(minDrawer, maxDrawer), 1000).forEach(drawer => {
    expect(getDrawer(getTicket(drawer))).toBe(drawer);
  });
});

test('Compare to pre-computed ticketToDrawer test data', () => {
  Object.keys(ticketToDrawerTestData).forEach(ticket => {
    expect(getDrawer(ticket)).toBe(ticketToDrawerTestData[ticket]);
  });
});
