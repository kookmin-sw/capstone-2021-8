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
    fontSize: 45,
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
  3: {
    radius: 70,
    color: '#AAB9CA',
    fontSize: 22,
  },
};

export const linkStandard = {
  0: {
    0: 170,
    1: 200,
    2: 200,
    3: 200,
  },
  1: {
    1: 120,
    2: 170,
    3: 170,
  },
  2: {
    2: 60,
  },
  3: {
    2: 60,
  },
};

export const months = Array.from({ length: 12 }, (_, i) => i + 1);
export const years = [2017, 2018, 2019, 2020];
