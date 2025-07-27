
def get_all_nadeo_uploads():

    import requests
    import json, time
    from datetime import datetime

    # Import nadeo track data
    file_path = 'otherTests/AllNadeoTrackData.txt'
    track_info = {}
    with open(file_path, 'r') as file:
        headers = file.readline().strip().split('\t')
        for header in headers:
            track_info[header] = []

        for line in file:
            parts = line.strip().split('\t')
            for header, value in zip(headers, parts):
                track_info[header].append(value)

    # Get all replay data
    base_url = "https://tmnf.exchange/api/replays"
    fields = "ReplayId,User.UserId,User.Name,ReplayTime,ReplayScore,ReplayRespawns,Score,Position,IsBest,IsLeaderboard,TrackAt,ReplayAt"
    # all_uploads_headers = ['Username', 'WR Diff', 'ReplayTime', 'Score', 'UploadDate', 'UploadTime', 'IsBest', 'ReplayID', 'ReplayTimeMS', 'Track']
    all_uploads = []
    track_wrs = {}
    tic = time.perf_counter()
    for track_name, track_id in zip(track_info['TrackName'], track_info['TrackID']):
        print(f"Getting replays for: {track_name}, at time: {round(time.perf_counter() - tic, 2)}s")
        query_params = {"trackId": track_id, "fields": fields, "count": 1000, "format": "json"}
        has_more = True
        all_replays = []
        while has_more:
            response = requests.get(base_url, params=query_params, headers={"User-Agent": "TMXData/1.0"})
            if response.status_code != 200:
                print("Failed to retrieve data from the API. Status code:", response.status_code)
                break

            data = response.json()
            all_replays.extend(data['Results'])
            has_more = data['More']
            if has_more:
                last_replay_id = data['Results'][-1]['ReplayId']
                query_params['after'] = last_replay_id
            if track_name not in track_wrs:
                track_wrs[track_name] = data['Results'][0]['ReplayTime']

        current_map = []
        for replay in all_replays:
            user_id = replay["User"]["UserId"]
            username = replay['User']['Name'].replace('|', '')
            replay_time = f"{int(replay['ReplayTime'] // 60000):01}:{int((replay['ReplayTime'] / 1000) % 60):02}.{int(replay['ReplayTime'] % 1000 / 10):02}"
            replay_score = replay['Score']
            upload_date = datetime.fromisoformat(replay["ReplayAt"])
            # upload_date, upload_time = replay['ReplayAt'].split('T')
            # upload_time = upload_time[:8]
            is_best = int(replay['IsBest'])
            replay_id = replay['ReplayId']
            replay_seconds = replay['ReplayTime']
            wr_diff_ms = replay_seconds - track_wrs[track_name]
            wr_diff = f"{int(wr_diff_ms // 60000):01}:{int((wr_diff_ms / 1000) % 60):02}.{int(wr_diff_ms % 1000 / 10):02}"
            current_map.append([username, track_name, replay_time, replay_seconds, upload_date, user_id])

        current_map = sorted(current_map, key=lambda x: x[4])
        current_wr = current_map[0]
        index_wr = 1
        all_uploads.append([current_wr[0], current_wr[1],current_wr[2],current_wr[4].strftime("%d/%m/%Y"), ".", "Stadium", "TMNF", 1, current_wr[-1]])
        for run in current_map[1:]:
            if run[3] < current_wr[3]:
                current_wr = run
                index_wr += 1
                all_uploads.append([run[0], run[1], run[2], run[4].strftime("%d/%m/%Y"), ".", "Stadium", "TMNF", index_wr, run[-1]])
                
    # Sort and save replay data
    all_uploads = sorted(all_uploads, key=lambda k: k[4])
    with open('otherTests/AllUploads - New.txt', 'w') as file:
        for replay in all_uploads:
            print(';'.join(map(str, replay)), file=file)

print(get_all_nadeo_uploads())