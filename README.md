# torte-dashboard
Semi-Static web interface for visualization of pre-executed [torte](https://github.com/ekuiter/torte) simulations.

## Requirements
- (Semi-) Static frontend, similar to [Elixir Bootlin](https://elixir.bootlin.com/)
- selection of what to fetch should include
  - architecture/kernel etc
  - time frame (years or commits)
  - ..?
- Upon request, fetch pre-calculated and (possibly) precompiled csv file(s) from backend
- Frontend visualization should be interactive, i.e.
  - zoom, pan
  - exclude certain data ("Show me only linux") in this comparison
  - linux: "include/exclude dead parameters(?)"
  - maybe change axes (linear to log)
- visualizations should ideally be exportable to the usual formats (png, jpeg, svg)
- probably also include an "export citation" somewhere

## Tech-Stack

### Frontend, Scaffolding
React, Vue etc. would be overkill. Since I still want to learn something new i will choose [Astro](https://astro.build/):
- island architecture; `"[It] works by rendering the majority of your page to fast, static HTML with smaller “islands” of JavaScript added when interactivity or personalization is needed on the page (an image carousel, for example)."`
- Supposedly works well with anything 
- comes with themes

(It is still overkill, probably - but less than React etc.)
### Frontend, Visualization
Will use the JavaScript library [Plotly](https://plotly.com/javascript/), as the original plots were generated using its Python library.
- Should make it easier to re-create the plots since its the same framework

### Backend Server
Will probably stay in the JS macrocosm and use good old expressJS. Keep it simple.
For the transmission of data, I might have to transform the csv files to e.g. json. Conventience npm modules like [csvtojson](https://www.npmjs.com/package/csvtojson) exist for that purpose.