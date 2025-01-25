# torte-dashboard
Semi-Static web interface for visualization of pre-executed [torte](https://github.com/ekuiter/torte) simulations.

## Implementation Concept

### First Tech Stack

Our first setup was made up of tow things:

1. Astro frontend (used as middleware)
2. expressJS server

The reasoning was quite simple. We do not need an extensively reactive framework like React or Angular, as the frontend will effectively be a visualization tool based on a short selection process. Furthermore, Astro uses a concept called "Island Architecture" which allows for certain elements to be rendered asynchronously. Assuming a call to the server would take a long time, we would rather have a pending animation than an unresponsive site.
Secondly, we decided to use expressJS to build our backend because the choice of server does not matter greatly, and we already have experience using it.

### Complications
While the first iteration of the tech stack would have surely worked, there was room for improvement. 
For instance, the original plots were generated using python code, more specifically the python API of Plotly.
This means that we would either have to call the python scripts from our Javascript backend, or, alternatively, we would have to translate the python scripts into JS.
Because we would like to keep our tech stack as simple as possible, and have no desire to reinvent the wheel, we decided upon a new approach. 

### Second Iteration Tech Stack

The second iteration of our tech stack uses Svelte as our frontend and a Flask server for our backend.
Switching from expressJS allows us to only use python in our backend. However, Astro has no built-in compatibility with python backends.
Therefore, we decided to use svelte instead, because it is easy to use as well as both time and memory efficient as it compiles its components into optimized javascript.

So, the entire workflow will be:
1. user selects what to visualize
2. frontend sends request to server
3. server processes request, calls script
4. script creates figure, export (to file for caching?) as HTML
5. server responds with html 
6. Client renders html 

It is worth noting, that by exporting the figure in html (and not png/jpeg/svg), the user can still interact with the figure in the frontend.

## Proof of concept
As of now, this project includes a simple proof of concept.
To start the Flask server, simply run in a terminal:

```
// make sure you have flask installed
python server.py  // or flask --app server run
```


