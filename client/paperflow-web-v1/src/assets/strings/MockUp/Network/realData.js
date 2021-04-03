export const data = {
  nodes: [
    {
      id: 'data structure',
      depth: 1,
    },
    {
      id: 'mathemetics',
      depth: 1,
    },
    {
      id: 'exhausitive search',
      depth: 1,
    },
    {
      id: 'greedy algorithm',
      depth: 1,
    },
    {
      id: 'algorithm',
      depth: 0,
    },
  ],
  links: [
    {
      source: 'algorithm',
      target: [
        'data structure',
        'mathemetics',
        'exhausitive search',
        'greedy algorithm',
      ],
      depth: [0, 1],
    },
  ],
};
