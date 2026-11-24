# Infinite Background Generator

An procedural infinite random background generator using HTML Canvas. 

**Deployed at:** [ash-iol.github.io/infinite-background-generator/](https://ash-iol.github.io/infinite-background-generator/)

## Desc

Hi! This project stems from my interest to learn to use a modern rendering tool like HTML Canvas. I'm developing this as checkpoints of mini projects and eventually build up to an advanced stunning infinite background generator that can export backgrounds and implemented in other projects.

## How To Test

Scroll down to versions section for different instructions for different checkpoints/weeks.

## Tech Stack

- HTML
- CSS
- TypeScript

## Versions

### W1: "HTML Canvas Whiteboard"

**Demo Link:** [ash-iol.github.io/infinite-background-generator/versions/w1](https://ash-iol.github.io/infinite-background-generator/versions/w1)

**How to test:**

Simply open the website and mess around with the settings panel to the right. Try different configurations of cursor settings and background settings!

**What works:**

- You can select backgrounds
- You can select cursors
- Special events for different cursors (like when click, when held down, when scroll)
- (Scrolling with the flashlight lets you control its size)

**Examples:**

<img width="1440" height="671" alt="image" src="https://github.com/user-attachments/assets/ac4373b6-a2a3-4e50-9b2f-ee46b5c86411" />

### W2: "HTML Canvas Generative Art Experiment"

**Demo Link:** [ash-iol.github.io/infinite-background-generator/versions/w2](https://ash-iol.github.io/infinite-background-generator/versions/w2)

**How to test:**

Simply open the website and mess around with the settings panel to the right. Try different configurations of cursor settings and background settings!

**What works:**

- You can select backgrounds
- You can select cursors
- Special events for different cursors (like when click, when held down, when scroll)
- (Scrolling with the flashlight lets you control its size)

**New changes from previous week:**

- "Sticky Particle Collision" Background
- Better flashlight
- Cleaner UI
- Constellation Effects
- Better color customization

**Examples:**

<img width="1470" height="956" alt="image" src="https://github.com/user-attachments/assets/adbacdaa-25ef-4392-a9dd-9fb1a395742e" />

### W3: "Perlin Noise"

**Demo Link:** [ash-iol.github.io/infinite-background-generator/versions/w3](https://ash-iol.github.io/infinite-background-generator/versions/w3)

**Update overview:**

This update focuses on random generation and implements a from-scratch perlin noise algorithm.

**How to test:**

Simply open the website and mess around with the settings panel to the right. Try different configurations of cursor settings and background settings!

**What works:**

- You can select backgrounds
- You can select cursors
- Special events for different cursors (like when click, when held down, when scroll)
- (Scrolling with the flashlight lets you control its size)

**New changes from previous week:**

- BFS Island (A BFS floodfill algorithm with randomness)
- Caves (Another BFS that carves caves)
- Perlin Noise (A image of randomly generated perlin noise of octave 4)
- Map (A randomly generated map created using perlin noise).

**Examples:**

<img width="1470" height="956" alt="image" src="https://github.com/user-attachments/assets/616c478d-3e17-4cd4-a7ae-bf88515b2d32" />

### W4: "Algorithmic Generation Playground"

**Demo Link:** [ash-iol.github.io/infinite-background-generator/versions/w4](https://ash-iol.github.io/infinite-background-generator/versions/w4)

**Update overview:**

This update adds 3 new algorithms: the Mandelbrot set, Bridson's algorithm, and one I invented: Bridcident Algorithm

**How to test:**

Simply open the website and mess around with the settings panel to the right. Try different configurations of cursor settings and background settings! To test what this specific update adds: try the Mandelbrot Fractal, Brison's Algorthm, and Bridcident Algorthm backgrounds.

**What works:**

- You can select backgrounds
- You can select cursors
- Special events for different cursors (like when click, when held down, when scroll)
- (Scrolling with the flashlight lets you control its size)
- Mandelbrot set allows pannigng and zooming with wasdqe

**New changes from previous week:**

- Mandelbrot Fractal
- Bridson's Algorithm
- Bridcident Algorithm

**Examples:**

<img width="1466" height="920" alt="image" src="https://github.com/user-attachments/assets/fb7370ef-1834-4c7e-8bdc-148b0fbef2db" />

### W5: "Algorithmic Generation Playground 2"

**Demo Link:** [ash-iol.github.io/infinite-background-generator/versions/w5](https://ash-iol.github.io/infinite-background-generator/versions/w5)

**Update overview:**

This update cleans up some design, adds random perfect mazes with bfs and dfs search animations, and adds a conway's game of life randomly generated infinite simulation.

**How to test:**

Simply open the website and mess around with the settings panel to the right. Try different configurations of cursor settings and background settings! To test what this specific update adds: try the new cleaned up control panel in the right, try the conways game of life background, and try the maze background and press b to run BFS and press d to run DFS.

**What works:**

- You can select backgrounds
- You can select cursors
- Special events for different cursors (like when click, when held down, when scroll)
- (Scrolling with the flashlight lets you control its size)
- Mandelbrot set allows pannigng and zooming with wasdqe
- Responsive and clean control panel
- Maze allows bfs and dfs animations with b and d.

**New changes from previous week:**

- Clean and responsive control panel with search feature
- Conway's Game of Life simulation (runs automatically and resets when it hits a dead end)
- DFS perfect maze generation
- DFS and BFS search algorthm animations for the maze

**Examples:**

<img width="1466" height="920" alt="image" src="https://github.com/user-attachments/assets/fb7370ef-1834-4c7e-8bdc-148b0fbef2db" />

To Do: Add 1-0 BFS, make conways size expandable, maybe clickable and runnable, add instrucitons for each mode.