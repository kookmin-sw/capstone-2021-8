export const data = {
  nodes: [
    [
      'algorithm',
      'graph',
      'data structure',
    ],
    [
      'mathemetics',
      'exhausitive search',
      'greedy algorithm',
      'BFS',
      'DFS',
      'stack',
      'queue',
      'deque',
      'shortest path',
    ],
    [
      'Brute-Force',
      'Backtracking',
      'Divide & Conquer',
      'Permutation',
      'Combination',
      'GCD LCM',
      'Matrix',
      'Linear Queue',
      'Circular Queue',
      'Priority Queue',
      'Dijkstra',
      'Bellman-Ford',
      'Floyd Warshall',
    ],
  ],
  links: [
    {
      source: 'algorithm',
      target: [
        'graph',
        'data structure',
      ],
      depth: [0, 0],
    },
    {
      source: 'graph',
      target: [
        'data structure',
      ],
      depth: [0, 0],
    },
    {
      source: 'algorithm',
      target: [
        'mathemetics',
        'exhausitive search',
        'greedy algorithm',
      ],
      depth: [0, 1],
    },
    {
      source: 'graph',
      target: [
        'BFS',
        'DFS',
        'shortest path',
      ],
      depth: [0, 1],
    },
    {
      source: 'data structure',
      target: [
        'stack',
        'queue',
        'deque',
      ],
      depth: [0, 1],
    },
    {
      source: 'exhausitive search',
      target: [
        'Brute-Force',
        'Backtracking',
        'Divide & Conquer',
      ],
      depth: [1, 2],
    },
    {
      source: 'mathemetics',
      target: [
        'Permutation',
        'Combination',
        'GCD LCM',
        'Matrix',
      ],
      depth: [1, 2],
    },
    {
      source: 'queue',
      target: [
        'Linear Queue',
        'Circular Queue',
        'Priority Queue',
      ],
      depth: [1, 2],
    },
    {
      source: 'shortest path',
      target: [
        'Dijkstra',
        'Bellman-Ford',
        'Floyd Warshall',
      ],
      depth: [1, 2],
    },
  ],
};
