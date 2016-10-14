#            <td><a href="https://play.spotify.com/track/7D88UPDgOxn32w8gqBcCWv">Heat Of The Moment </a></td>
#            <td>Asia </td>
#            <td class="star"><div db-data="value"/></td>


import csv

from tabulate import tabulate

with open("baileys_playlist.csv", "r", encoding="utf-8") as bk_file:
    with open("parkers_playlist.csv", "r", encoding="utf-8") as pk_file:

        bk_data = csv.reader(bk_file)
        pk_data = csv.reader(pk_file)
        bk_temp = []
        pk_temp = []
        for bk_row in bk_data:
            bk_temp.append({'uri': bk_row[0], 'song': bk_row[1].rsplit('-', 1)[0], 'artist': bk_row[2]})
            for pk_row in pk_data:
                pk_temp.append({'uri': pk_row[0], 'song': pk_row[1].rsplit('-', 1)[0], 'artist': pk_row[2]})

        bk_temp.pop(0)
        pk_temp.pop(0)
        bk_temp.sort(key=lambda x:x['artist'])
        pk_temp.sort(key=lambda x:x['artist'])
        match_song_list = []
        bk_song_list = []
        pk_song_list = []
        for bk, pk in [(bk, pk) for bk in bk_temp for pk in pk_temp]:
            if bk['song'] == pk['song']:
                bk_htmlString = '<tr>\n' \
                '<td><a href="https://play.spotify.com/track/' + bk['uri'].split(':')[2] + '">' + bk['song'] + '</a></td>\n' \
                '<td>' + bk['artist'] + '</td>\n' \
                '<td class="star"><div db-data="value"/></td>\n' \
                '</tr>'

                pk_htmlString = '<tr>\n' \
                '<td><a href="https://play.spotify.com/track/' + pk['uri'].split(':')[2] + '">' + pk['song'] + '</a></td>\n' \
                '<td>' + pk['artist'] + '</td>\n' \
                '<td class="star"><div db-data="value"/></td>\n' \
                '</tr>'
                match_song_list.append(bk_htmlString)
                bk_temp.remove(bk)
                pk_temp.remove(pk)

        for bk in bk_temp:
            bk_htmlString = '<tr>\n' \
                            '<td><a href="https://play.spotify.com/track/' + bk['uri'].split(':')[2] + '">' + bk[ 'song'] + '</a></td>\n' \
                            '<td>' + bk['artist'] + '</td>\n' \
                            '<td class="star"><div db-data="value"/></td>\n' \
                            '</tr>'
        for pk in pk_temp:
            pk_htmlString = '<tr>\n' \
                            '<td><a href="https://play.spotify.com/track/' + pk['uri'].split(':')[2] + '">' + pk['song'] + '</a></td>\n' \
                            '<td>' + pk['artist'] + '</td>\n' \
                            '<td class="star"><div db-data="value"/></td>\n' \
                            '</tr>'

            bk_song_list.append(bk_htmlString)
            pk_song_list.append(pk_htmlString)

        with open('comparison_results_v2', 'w', encoding="utf-8") as results:
            results.writelines(pk_song_list)

        results.close()
        bk_file.close()
        pk_file.close()

        # Compare playlists
        # Find same songs in playlists
        # List difference between playlists
