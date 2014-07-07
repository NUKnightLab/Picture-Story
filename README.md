Bootstrap Picture Story
=====================

Bootstrap theme for photo layouts. For use in photojournalism classes.

##Images
To have an enlargable image, put the image inside a link to the larger image. Add the class `enlarge` to the link. 
It's a good idea to add the class `img-responsive` to most images so that they fill the column width they are in and remain responsive.
```html
<figure>
	<a href="photos/pumpkin_queen/pumpkin_8386.jpg" rel="enlarge" class="enlarge">
		<img src="photos/pumpkin_queen/pumpkin_8386.jpg" class="img-responsive">
	</a>
	<figcaption class="credit">Zach Wise</figcaption>
	<figcaption>
		Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, 
		id pulvinar odio lorem non turpis. Nullam sit amet enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
	</figcaption>
</figure>
```