export const networkConfig = {
  repulsive: 100,
  iterations: 90,
  linkThickness: (e) => 2 * (2 - e.source.depth),
  distanceMin: 100,
};

export const nodeStandard = {
  0: {
    radius: 140,
    color: '#9A9CEA',
    fontSize: 45,
  },
  1: {
    radius: 90,
    color: '#A2B9EE',
    fontSize: 30,
  },
  2: {
    radius: 70,
    color: '#A2D3E2',
    fontSize: 22,
  },
  3: {
    radius: 70,
    color: '#C4DEEE',
    fontSize: 22,
  },
};

export const linkStandard = {
  0: {
    0: 250,
    1: 200,
    2: 200,
    3: 200,
  },
  1: {
    1: 200,
    2: 100,
    3: 170,
  },
  2: {
    2: 60,
  },
  3: {
    2: 60,
  },
};

export const months = Array.from({ length: 12 }, (_, i) => (`0${String(i + 1)}`).slice(-2));
export const years = ['2017', '2018', '2019', '2020', '2021'];
