# playlist
My fiance and I both use Spotify as our main source for music. So when it came to picking out songs for our wedding we decided to make playlists of our favorites. The struggle became apparent when we tried to compare our findings. 

I used [Exportify](https://github.com/watsonbox/exportify) to export our respective playlist to csv format. I wrote some python scripts to parse, compare, and generate three HTML tables. The first table had all the songs that we both had on our list. The other two consisted of the remaining songs from each our playlists. 

I created an API with node.js, express and mongodb to store and persist the music data. I routed a few calls to allow the ability to star or 'favorite' a particular song. I also made a counter that stickies to screen/scroll view to keep track of how many songs we had left to star/favorite. 

