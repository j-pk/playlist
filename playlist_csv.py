import csv

from tabulate import tabulate

with open("baileys_playlist.csv", "r", encoding="utf-8") as bk_file:
    with open("parkers_playlist.csv", "r", encoding="utf-8") as pk_file:

        bk_data = csv.reader(bk_file)
        pk_data = csv.reader(pk_file)

        bk_temp = []
        pk_temp = []
        for bk_row in bk_data:
            bk_temp.append({'song': bk_row[1].rsplit('-', 1)[0], 'artist': bk_row[2]})
            for pk_row in pk_data:
                pk_temp.append({'song': pk_row[1].rsplit('-', 1)[0], 'artist': pk_row[2]})

        bk_temp.pop(0)
        pk_temp.pop(0)
        bk_temp.sort(key=lambda x:x['artist'])
        pk_temp.sort(key=lambda x:x['artist'])
        match_song_list = []

        for bk, pk in [(bk, pk) for bk in bk_temp for pk in pk_temp]:
            if bk['song'] == pk['song']:
                match_song_list.append(bk)
                bk_temp.remove(bk)
                pk_temp.remove(pk)

        with open('comparison_results.html', 'w', encoding="utf-8") as results:
            results.write(tabulate(match_song_list, headers='keys', stralign='left', tablefmt="html"))
            results.write(tabulate(bk_temp, headers='keys', stralign='left', tablefmt="html"))
            results.write(tabulate(pk_temp, headers='keys', stralign='left', tablefmt="html"))

        results.close()
        bk_file.close()
        pk_file.close()

        # Compare playlists
        # Find same songs in playlists
        # List difference between playlists
