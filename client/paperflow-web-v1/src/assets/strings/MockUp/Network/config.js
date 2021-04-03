export const networkConfig = {
  repulsive: 10,
  iterations: 90,
  linkThickness: (e) => 2 * (2 - e.source.depth),
  distanceMin: 10,
};

export const nodeStandard = {
  0: {
    radius: 100,
    color: '#0D01E0',
    fontSize: 35,
  },
  1: {
    radius: 80,
    color: '#8882FF',
    fontSize: 26,
  },
  2: {
    radius: 55,
    color: '#AAB9CA',
    fontSize: 16,
  },
};

export const linkStandard = {
  0: {
    0: 500,
    1: 300,
  },
  1: {
    1: 120,
    2: 170,
  },
  2: {
    2: 60,
  },
};
