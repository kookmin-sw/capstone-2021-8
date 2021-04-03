export const networkConfig = {
  repulsive: 10,
  iterations: 90,
  linkThickness: (e) => 2 * (2 - e.source.depth),
  distanceMin: 10,
};

export const nodeStandard = {
  0: {
    radius: 120,
    color: '#0D01E0',
    fontSize: 35,
  },
  1: {
    radius: 90,
    color: '#8882FF',
    fontSize: 30,
  },
  2: {
    radius: 70,
    color: '#AAB9CA',
    fontSize: 22,
  },
};

export const linkStandard = {
  0: {
    0: 170,
    1: 200,
  },
  1: {
    1: 120,
    2: 170,
  },
  2: {
    2: 60,
  },
};
