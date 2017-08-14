This is an annotated version of the script used to generate the rainbow polygon series on [Evan You's site.](http://evanyou.me/)

![Screenshot](/screenshot.png?raw=true "Screenshot")

I was curious how the script worked because of how beautiful effect is, and I also wanted to learn about how HTML5 canvas elements work.

In summary, the algorithm works by repeating these steps:
1. Draw a line between two starting points
2. Generate a third point that is rand() pixels to the right of the first two points
3. Create a polygon from the 3 points
4. Use the 2 recent-most points in the series as the starting points for the next polygon in the series

Improvements and fork requests are welcome. All credit for the script goes to Evan You, of course.