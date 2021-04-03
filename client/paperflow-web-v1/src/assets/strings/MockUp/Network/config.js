export const networkConfig = {
  repulsive: 150,
  iterations: 90,
  linkThickness: (e) => 2 * (2 - e.source.depth),
  distanceMin: 10,
};

export const nodeStandard = {
  0: {
    radius: 80,
    color: 'rgb(244, 117, 96)',
  },
  1: {
    radius: 60,
    color: 'rgb(97, 205, 187)',
  },
  2: {
    radius: 20,
    color: 'rgb(232, 193, 160)',
  },
};

export const linkStandard = {
  0: {
    0: 240,
    1: 360,
  },
  1: {
    1: 120,
    2: 60,
  },
  2: {
    2: 60,
  },
};
