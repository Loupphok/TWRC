import pandas as pd
from datetime import datetime
import os
import math

#~# Fonctions

def display(df, map_preciser=1, player_preciser=1, cheat_preciser=1):
    longueur_max = max(len(chaine) for chaine in df.player.tolist())
    map_list = df["map"].unique().tolist()
    print(f"╭{'─'*(25+4*map_preciser+(longueur_max+1)*player_preciser)}╮")
    
    for piste in map_list:
        for i in df.query(f"map == '{piste}'").index.tolist():
            print((f"├ {df['map'][i]} "+"-")*map_preciser+(not map_preciser)*"├"+f" {df.time[i]} - {df.date[i]} "+f"- {center_text(df.player[i],longueur_max)} "*player_preciser+"│"+" <- Cheated"*cheat_preciser*int(df.cheated[i]))
        
        if piste != map_list[-1]:
            print("├"+"─"*(25+4*map_preciser+(longueur_max+1)*player_preciser)+"┤")
    
    print(f"╰{'─'*(25+4*map_preciser+(longueur_max+1)*player_preciser)}╯")

def time_to_ms(time): return (60*int(time[0]) + int(time[2:4]))*1000 + int(time[5:])

def time_delta(former, newer):
    former_x_pos, newer_x_pos = x_detector(former), x_detector(newer)
    diff = str(time_to_ms(remplacer_caractere(former, former_x_pos, "0")) - time_to_ms(remplacer_caractere(newer, newer_x_pos, "0")) + 1000)
    return "Reseted" if int(diff) < 1000 else remplacer_caractere(f"-{int(diff[-4]) - 1}.{diff[-3:]}", former_x_pos + newer_x_pos, "?") + 's'

def x_detector(time):
    x_pos = []
    index = -1

    for _ in time:
        if time[index] == "x": x_pos.append(index)
        index -= 1

    return x_pos

def remplacer_caractere(chaine, position, nouveau_caractere):
    liste_caracteres = list(chaine) # Convertir la chaîne en une liste de caractères

    for elem in position:
        liste_caracteres[elem] = nouveau_caractere # Remplacer le caractère à la position spécifiée

    nouvelle_chaine = ''.join(liste_caracteres) # Reconvertir la liste en une chaîne de caractères
    return nouvelle_chaine

def parse_date(date_str):
    day, month, year = date_str.split('/')
    return day, month, year

def speculation(date_str1, date_str2):
    if date_str1 == date_str2:
        return "???"

    day1, month1, year1 = parse_date(date_str1)
    day2, month2, year2 = parse_date(date_str2)
    #harmonisation année
    if not(year1 == "????" or year2 == "????"): #on part du fait que si on connait pas l'année, on sait pas le mois
        if year1 != year2:
            if month1 == "??":
                month1 = "12"
            if month2 == "??":
                month2 = "01"
    else:
        if year1 == "????":
            return "???"
        elif int(year1) < 2017 or (int(year1) == 2017 and int(month1) < 5):
            year2, month2, day2 = "2017", "05", "09"
        else:
            return "???"

    if year1 != year2:
        if month1 != month2:
            if day1 == "??":
                if month1 in ["01","03","05","07","08","10","12"]:
                    day1 = "31"
                elif month1 == "02":
                    if int(year1)%4 == 0:
                        day1 = "29"
                    else:
                        day1 = "28"
                else:
                    day1 = "30"
            if day2 == "??":
                day2 = "01"
    else:
        if month1 != month2 and not(month1 == "??" or month2 == "??"):
            if day1 == "??":
                if month1 in ["01","03","05","07","08","10","12"]:
                    day1 = "31"
                elif month1 == "02":
                    if int(year1)%4 == 0:
                        day1 = "29"
                    else:
                        day1 = "28"
                else:
                    day1 = "30"
            if day2 == "??":
                day2 = "01"
        else:
            return "???"
    
    return [[day1,month1,year1], [day2,month2,year2]]

def compare_dates(date_str1, date_str2):
    day1, month1, year1 = parse_date(date_str1)
    day2, month2, year2 = parse_date(date_str2)
    specu_preciser = 0

    # Vérifier si une des dates contient des "?"
    if "?" in day1 or "?" in month1 or "?" in year1 or "?" in day2 or "?" in month2 or "?" in year2:
        newdates = speculation(date_str1, date_str2)
        if newdates == "???":
            return "???"
        
        specu_preciser = 1
        day1, month1, year1 = newdates[0][0], newdates[0][1], newdates[0][2]
        day2, month2, year2 = newdates[1][0], newdates[1][1], newdates[1][2]
    
    
    # Convertir les parties de date en entiers
    day1, month1, year1 = int(day1), int(month1), int(year1)
    day2, month2, year2 = int(day2), int(month2), int(year2)
    
    # Créer des objets datetime
    date1 = datetime(year1, month1, day1)
    date2 = datetime(year2, month2, day2)
    
    # Calculer la différence en jours
    delta = abs((date2 - date1).days)
    return f"{specu_preciser*'(~) '}{delta}"

def wr_list(donnees, track):
    wr_count = donnees["map"].count()
    print(f"╒{'═'*33}╕\n│    {track} World Records Hisotry    │\n╘{'═'*33}╛")
    player_list = donnees.player.unique().tolist()

    dates = donnees.query(f"map == '{track}'").date.tolist()
    current_date = datetime.now() # Obtenir la date actuelle
    formatted_date = current_date.strftime("%d/%m/%Y") # Formater la date au format "DD/MM/YYYY"
    dates.append(formatted_date)

    days_delta_list = []
    for i in range(len(dates)):
        if dates[i][-7:] == "03/2013":
            days_delta_list.append("---")
        elif i < len(dates)-2:
            ajout = compare_dates(dates[i],dates[i+1])
            days_delta_list.append(f"{ajout}")
        elif i < len(dates)-1:
            ajout = compare_dates(dates[i],dates[i+1])
            days_delta_list.append(f"   (↗) {ajout}")

    longueur_max = max(len(chaine) for chaine in player_list)
    longueur_days_max = max(len(nb_jour) for nb_jour in days_delta_list)
    print(f'\n╔{"═"*12}╤{"═"*(2+longueur_days_max)}╤{"═"*10}╤{"═"*9}╤{"═"*(2+longueur_max)}╗\n║    Date    │ {center_text("DaysAsWR", longueur_days_max)} │   Time   │  Delta  │ {center_text("Player", longueur_max)} ║\n╠{"═"*12}╪{"═"*(2+longueur_days_max)}╪{"═"*10}╪{"═"*9}╪{"═"*(2+longueur_max)}╣')
    
    surplus_index = donnees.index[0]
    for elem in range(donnees.index[0],wr_count+surplus_index):

        cheat = 0 if donnees.cheated[elem] == 1 else 0
        player_to_show = donnees.player[elem]
        
        if elem == donnees.index[0]:
            print(f"║ {donnees.date[elem]} │ {(longueur_days_max-len(days_delta_list[elem-surplus_index]))*' '}{days_delta_list[elem-surplus_index]} │ {donnees.time[elem]} │ -?.???s │ {player_to_show}{(longueur_max-len(player_to_show))*' '} ║ {'Cheated'*cheat}")
        
        else:
            delta = time_delta(donnees.time[elem-1], donnees.time[elem])
            print(f"║ {donnees.date[elem]} │ {(longueur_days_max-len(days_delta_list[elem-surplus_index]))*' '}{days_delta_list[elem-surplus_index]} │ {donnees.time[elem]} │ {delta} │ {player_to_show}{(longueur_max-len(player_to_show))*' '} ║ {'Cheated'*cheat}")
    
    print(f'╚{"═"*12}╧{"═"*(2+longueur_days_max)}╧{"═"*10}╧{"═"*9}╧{"═"*(2+longueur_max)}╝')

def center_text(text, max_char):
    if len(text) == max_char:
        return text
    
    space_count = max_char - len(text)
    prefixe = int(math.floor(space_count/2))
    return prefixe * " " + text + (space_count - prefixe) * " "

def box_display(text):
    taille = len(text)
    print("╒"+"═"*(taille+4)+"╕\n"
          +"│  "+text+"  │\n"
          +"╘"+"═"*(taille+4)+"╛")

def rank_display(rank):
    rank = str(rank)

    if rank[-1] not in ["1", "2", "3"]:
        return f"{rank}th"
    
    else:
        if rank in ["11", "12", "13"]: 
            return f"{rank}th"
        
        else:
            if rank[-1] == "1": return f"{rank}st"

            elif rank[-1] == "2": return f"{rank}nd"

            else:
                return f"{rank}rd"
            
def nb_jours_tm2():
    current_date = datetime.now()
    date_start = datetime(2013, 6, 20)
    
    # Calculer la différence en jours
    return abs((current_date - date_start).days)

def next_page(lines, longueur, header):
    page = 0
    page_size = 10
    max_page = math.floor(len(lines)/10+1)
    test =  True

    while test:
        print("\n"*30) #Clear l'écran
        box_display(header)
        print("╭───────┬─"+"─"*longueur+"╮")

        for elem in range(0+page_size*page,page_size+page_size*page):
            if elem in range(0,len(lines)):
                print(lines[elem])
            else:
                print("│       │ "+" "*longueur+"│")
        print("╰───────┴─"+"─"*longueur+"╯")
        print(center_text(f" - Page {page+1}/{max_page} - ", longueur+9))

        move = input("P/N/PageNb >> ")

        if move == "P":
            if page != 0:
                page -= 1
        elif move == "N":
            if not page_size+page*page_size > len(lines):
                page += 1
        if move == "stop":
            test = False
        if move[0] in "0123456789":
            if int(move) in range(1,max_page+1):
                page = int(move)-1

def year_conversion(total_jours):
    # Calculer les années
    annees = total_jours // 365
    jours_restants = total_jours % 365

    # Calculer les mois
    mois = jours_restants // 30
    jours = jours_restants % 30

    if mois < 10: mois = "0"+str(mois)
    if jours < 10: jours = "0"+str(jours)
    return f"{annees}y/{mois}m/{jours}d"

#~# Initialisation

chemin_fichier_python = os.path.realpath(__file__)
repertoire_fichier = os.path.dirname(chemin_fichier_python)
os.chdir(repertoire_fichier)

#~# Importations

donnees_maps = pd.read_csv("./TMUF_fetch_historyProg.txt", header=0, sep=";")

#~# Answer process

test = False
command_list = ["[List] WR history on a map",
                "  [LB] WR count on a map",
                "[List] Player WR count",
                "[List] Cheated WR on a map",
                "  [LB] WR count from individual players",
                "[List] Cheated WR from a player",
                "  [LB] WR count on a map history",
                "[List] Maps a player got WR on",
                "  [LB] Most map WR by individual players",
                "  [LB] Ratio WR count and Map WR count",
                "  [LB] Longest standing WR on a map",
                "  [LB] Longest standing WR",
                "  [LB] Biggest WR improvement on a map",
                "  [LB] Biggest WR improvement",
                "  [LB] Unique players WR count on a map history",
                "  [LB] Current longest standing wr"
                ]
# AFFICHER DES STATS SOUS LES TITRES
# AJOUTER COULEURS
# diff jours (fourchette entre min et max possible)
# biggest date / biggest delta (global mtn)
# Leaderboard of player who got the most wr on a map (perso en mode telle map il a x WR classé)(et un lb global en mode lui a x sur x map)
# biggest cut hunter?

# data history
# most WR a player has on a map leaderboard (and alone)
# Chronological order of wr history for a player (function)
# compter le pourcentage de données 100% sure
longueur_max = max(len(chaine) for chaine in command_list)
n_list = len(str(len(command_list)))

while not test:
    print("\n"*30) #Clear l'écran
    print(f"╭{(3+longueur_max+n_list)*'─'}╮\n│ {center_text('COMMANDS LIST', longueur_max+n_list+1)} │\n├{n_list*'─'}┬─{longueur_max*'─'}─┤")
    for i in range(0,len(command_list)): print(f"│{i+1}{' '*(n_list-len(str(i+1)))}├ {command_list[i] + (longueur_max-len(command_list[i]))*' '} │")
    requette = int(input(f"╰{(n_list)*'─'}┴─{longueur_max*'─'}─╯\n\n>> "))
    if requette in range(1,len(command_list)+1): test = True

print("\n"*30) #Clear l'écran

match requette:
    case 1: #[List] WR history on a map
        test = False
        while not test:
            box_display("What map?")
            track = str(input("\n>> "))
            print("\n"*30) #Clear l'écran

            if track in donnees_maps["map"].unique().tolist():
                test = True
                wr_list(donnees_maps.query(f"map == '{track}'"), track)

    case 2: #[LB] WR count on a map
        test = False
        while not test:
            box_display("What map?")
            track = str(input("\n>> "))
            print("\n"*30) #Clear l'écran

            if track in donnees_maps["map"].unique().tolist():
                test = True
                WR_count = donnees_maps.query(f"map == '{track}'")["map"].count()
                box_display(f"There has been {WR_count} WRs through {track}'s history.")

            else:
                box_display(f"The map '{track}' doesn't exist!")

    case 3: #[List] Player WR count
        test = False
        while not test:
            box_display("What player?")
            player = str(input("\n>> "))
            print("\n"*30) #Clear l'écran
            list_player_lower = [s.lower() for s in donnees_maps.player.unique().tolist()]

            if player.lower() in list_player_lower:
                test = True
                vrai_player = donnees_maps.player.unique()[list_player_lower.index(player.lower())]
                player_activity = donnees_maps.query(f"player == '{vrai_player}'")
                cheated_wr_count = player_activity.cheated.sum()
                cheat_preciser = 0 if cheated_wr_count == 0 else 1
                box_display(f"{vrai_player}: {player_activity.player.count()} WRs {f'({cheated_wr_count} Cheated)'*cheat_preciser}")
                display(player_activity, player_preciser=0)
            
            else:
                box_display(f"The player '{player}' doesn't have a WR :(")

    case 4: #[List] Cheated WR on a map
        test = False
        while not test:
            box_display("What map?")
            track = str(input("\n>> "))
            print("\n"*30) #Clear l'écran

            if track in donnees_maps["map"].unique().tolist():
                test = True
                cheated_wr_count = donnees_maps.query(f"map == '{track}'& cheated == 1").cheated.count()
                box_display(f"There are {cheated_wr_count} cheated WR on {track}:")
                display(donnees_maps.query(f"map == '{track}'& cheated == 1"), map_preciser = 0, cheat_preciser=0)
            
            else:
                box_display(f"The map '{track}' doesn't exist!")

    case 5: #[LB] WR count from individual players
        player_wr_count = {}
        player_list = donnees_maps.player.unique().tolist()

        for player in player_list:
            player_wr_count[player]=donnees_maps.query(f"player == '{player}'").player.count()

        sorted_scores = sorted(player_wr_count.items(), key=lambda item: item[1], reverse=True) # Trier le dictionnaire par les valeurs (scores) de manière décroissante
        longueur_max = max(len(chaine) for chaine in player_list) + max(len(chaine) for chaine in player_wr_count.items()) + 8
        
        displ = "Player World Record Leaderboard"
        box_display(displ)
        previous_count = 0
        equal_count = 0
        rank = 1
        affichage_ligne = []

        for name, count in sorted_scores:
            cheated_wr_count = donnees_maps.query(f"player == '{name}'").cheated.sum()
            cheat_preciser = 1 if cheated_wr_count != 0 else 0

            affichage_fin = f"{count} WR{'s' if count != 1 else ''} - {name}"

            if previous_count != count:
                equal_count = 0
                affichage_ligne.append(f"│ {rank_display(rank)}{' '*(3-len(str(rank)))} ├ {affichage_fin+' '*(longueur_max-len(affichage_fin))}│{cheat_preciser*f' <- ({cheated_wr_count} Cheated)'}")
            
            else:
                equal_count += 1
                affichage_ligne.append(f"│ {rank_display(rank - equal_count)}{' '*(3-len(str(rank - equal_count)))} ├ {affichage_fin+' '*(longueur_max-len(affichage_fin))}│{cheat_preciser*f' <- ({cheated_wr_count} Cheated)'}")
            
            previous_count = count
            rank += 1

        next_page(affichage_ligne, longueur_max, displ)

    case 6: #[List] Cheated WR from a player
        test = False
        while not test:
            player = str(input("What player: "))
            list_player_lower = [s.lower() for s in donnees_maps["player"].unique().tolist()]

            if player.lower() in list_player_lower:
                loc_vrai_joueur = list_player_lower.index(player.lower())
                vrai_player = donnees_maps["player"].unique()[loc_vrai_joueur]
                test = False
                cheated_wr_count = donnees_maps.query(f"player == '{vrai_player}' & cheated == 1")["player"].count()
                print(player, ": ",cheated_wr_count)
                display(donnees_maps.query(f"player == '{vrai_player}' & cheated == 1"), player_preciser=0)

            else:
                print(f"The player '{player}' doesn't have any cheated WR if any :)")

    case 7: #[LB] WR count on a map history
        map_wr_count = {}
        map_list = donnees_maps["map"].unique().tolist()

        for map in map_list:
            map_wr_count[map]=donnees_maps.query(f"map == '{map}'")["map"].count()

        sorted_scores = sorted(map_wr_count.items(), key=lambda item: item[1], reverse=True) # Trier le dictionnaire par les valeurs (scores) de manière décroissante
        longueur_max = max(len(chaine) for chaine in map_wr_count.items()) + 11

        box_display("Map World Record Leaderboard")
        print("╭───────┬─"+"─"*longueur_max+"╮")
        count = ""
        previous_count = 0
        equal_count = 0
        rank = 1

        for name, count in sorted_scores:
            cheated_wr_count = donnees_maps.query(f"map == '{name}'").cheated.sum()

            cheat_preciser = 1 if cheated_wr_count != 0 else 0
            s = "s" if count != 1 else ""

            affichage_fin = f"{count} WR{s} - {name}"
            
            if previous_count != count:
                equal_count = 0
                print(f"│ {rank_display(rank)}{' '*(3-(len(str(rank))))} ├ {affichage_fin+' '*(longueur_max-len(affichage_fin))}│{cheat_preciser*f' <- ({cheated_wr_count} Cheated)'}")
            
            else:
                equal_count += 1
                print(f"│ {rank_display(rank - equal_count)}{' '*(3-(len(str(rank - equal_count))))} ├ {affichage_fin+' '*(longueur_max-len(affichage_fin))}│{cheat_preciser*f' <- ({cheated_wr_count} Cheated)'}")
            
            previous_count = count
            rank += 1

        print("╰───────┴─"+"─"*longueur_max+"╯")

    case 8: #[List] Maps a player got WR on
        test = False
        while not test:
            box_display("What player?")
            player = str(input())
            print("\n"*30) #Clear l'écran
            list_player_lower = [s.lower() for s in donnees_maps.player.unique().tolist()]

            if player.lower() in list_player_lower:
                test = True
                vrai_player = donnees_maps["player"].unique()[list_player_lower.index(player.lower())]
                player_activity = donnees_maps.query(f"player == '{vrai_player}'")
                map_list_player = player_activity["map"].unique().tolist()
                box_display(f"{vrai_player} WR on {len(map_list_player)} maps")

                for elem in map_list_player:
                    print(f"- {elem}")

            else:
                box_display(f"The player {player} doesn't have any WR :(")

    case 9: #[LB] Most map WR by individual players
        player_map_count = {}
        player_list = donnees_maps.player.unique().tolist()

        for player in player_list:
            player_map_count[player]=len(donnees_maps.query(f"player == '{player}'")["map"].unique().tolist())

        sorted_scores = sorted(player_map_count.items(), key=lambda item: item[1], reverse=True) # Trier le dictionnaire par les valeurs (scores) de manière décroissante
        longueur_max = max(len(chaine) for chaine in player_list) + max(len(chaine) for chaine in player_map_count.items())+9
        
        displ = "Player WR Map Count Leaderboard"
        box_display(displ)
        previous_count = 0
        equal_count = 0
        rank = 1
        affichage_ligne = []

        for name, count in sorted_scores:
            cheated_wr_count = donnees_maps.query(f"player == '{name}'").cheated.sum()

            cheat_preciser = 1 if cheated_wr_count != 0 else 0
            s = "s" if count != 1 else ""

            affichage_fin = f"{count} Map{s} - {name}"

            if previous_count != count:
                equal_count = 0
                affichage_ligne.append(f"│ {rank_display(rank)}{' '*(3-len(str(rank)))} ├ {affichage_fin+' '*(longueur_max-len(affichage_fin))}│{cheat_preciser*f' <- ({cheated_wr_count} Cheated)'}")
            
            else:
                equal_count += 1
                affichage_ligne.append(f"│ {rank_display(rank - equal_count)}{' '*(3-len(str(rank - equal_count)))} ├ {affichage_fin+' '*(longueur_max-len(affichage_fin))}│{cheat_preciser*f' <- ({cheated_wr_count} Cheated)'}")
            
            previous_count = count
            rank += 1
        
        next_page(affichage_ligne, longueur_max, displ)

    case 10: #[LB] Ratio WR count and Map WR count
        player_info_count = {}
        player_list = donnees_maps.player.unique().tolist()
        
        for player in player_list:
            player_activity = donnees_maps.query(f"player == '{player}'")
            player_info_count[player] = [len(player_activity["map"].unique().tolist()),player_activity.player.count()]
        
        player_info_count_ratio = {}
        for player in player_info_count.keys():
            if player_info_count[player][1] != 1:
                player_info_count_ratio[player] = round(player_info_count[player][0]*100/player_info_count[player][1],1)
        
        sorted_scores = sorted(player_info_count_ratio.items(), key=lambda item: item[1], reverse=True) # Trier le dictionnaire par les valeurs (scores) de manière décroissante
        longueur_max = max(len(chaine) for chaine in player_list) + max(len(chaine) for chaine in player_info_count_ratio.items())+12

        displ = "Player WR Map Count Ratio Leaderboard"
        box_display(displ)
        previous_count = 0
        equal_count = 0
        rank = 1
        affichage_ligne = []
        for name, count in sorted_scores:
            cheated_wr_count = donnees_maps.query(f"player == '{name}'").cheated.sum()
            
            cheat_preciser = 1 if cheated_wr_count != 0 else 0
            s = "s" if count != 1 else ""
            
            affichage_fin = f"{count}% - {name} ({player_info_count[name][1]})"
            
            if previous_count != count:
                equal_count = 0
                affichage_ligne.append(f"│ {rank_display(rank)}{' '*(3-len(str(rank)))} ├ {affichage_fin+' '*(longueur_max-len(affichage_fin))}│{cheat_preciser*f' <- ({cheated_wr_count} Cheated)'}")
            
            else:
                equal_count += 1
                affichage_ligne.append(f"│ {rank_display(rank - equal_count)}{' '*(3-len(str(rank - equal_count)))} ├ {affichage_fin+' '*(longueur_max-len(affichage_fin))}│{cheat_preciser*f' <- ({cheated_wr_count} Cheated)'}")
            
            previous_count = count
            rank += 1

        next_page(affichage_ligne, longueur_max, displ)
    
    case 11: #[LB] Longest standing WR on a map
        test = False
        while not test:
            box_display("What map?")
            track = str(input("\n>> "))
            print("\n"*30) #Clear l'écran

            if track in donnees_maps["map"].unique().tolist():
                donnees = donnees_maps.query(f"map == '{track}'")
                test = True
                dates = donnees.date.tolist()
                current_date = datetime.now() # Obtenir la date actuelle
                formatted_date = current_date.strftime("%d/%m/%Y") # Formater la date au format "DD/MM/YYYY"
                dates.append(formatted_date)

                days_delta_list = {}
                for i in range(len(dates)):
                    if i < len(dates)-1:
                        ajout = compare_dates(dates[i],dates[i+1])
                        if ajout == "???" or dates[i][-7:] == "03/2013":
                            days_delta_list[i] = -1
                        elif ajout[:4] == "(~) ":
                            ajout = ajout[4:]
                        else:
                            days_delta_list[i] = int(ajout)

                sorted_wr = sorted(days_delta_list.items(), key=lambda item: item[1], reverse=True) # Trier le dictionnaire par les valeurs (dates) de manière décroissante
                longueur_max = max(len(chaine) for chaine in days_delta_list.items())+30
                player_list = donnees.player.tolist()
                longueur_max_pseudo = max(len(chaine) for chaine in player_list)

                box_display(f"Longest Standing WR on {track} Leaderboard")
                print("╭──────┬─"+"─"*(longueur_max + longueur_max_pseudo)+"╮")
                count = ""
                previous_count = 0
                equal_count = 0
                rank = 1
                surplus_index = donnees.index[0]

                for indx, count in sorted_wr:
                    count = days_delta_list[indx]

                    if count != -1:
                        s = "s" if count not in [0,1] else ""
                        pourcentage_top = round(count * 100 / nb_jours_tm2(), 1)
                        
                        affichage_fin = f"({pourcentage_top}%) {count} Day{s} - {donnees.time[indx+surplus_index]} by {donnees.player[indx+surplus_index]}"
                        if previous_count != count:
                            equal_count = 0
                            print(f"│ {rank_display(rank)}{' '*(2-(len(str(rank))))} ├ {affichage_fin+' '*(longueur_max + longueur_max_pseudo-len(affichage_fin))}│{donnees.cheated[indx+surplus_index]*' <- Cheated'}")
                        
                        else:
                            equal_count += 1
                            print(f"│ {rank_display(rank - equal_count)}{' '*(2-(len(str(rank - equal_count))))} ├ {affichage_fin+' '*(longueur_max + longueur_max_pseudo-len(affichage_fin))}│{donnees.cheated[indx+surplus_index]*' <- Cheated'}")
                        
                        previous_count = count

                    rank += 1

                print("╰──────┴─"+"─"*(longueur_max + longueur_max_pseudo)+"╯")
     
            else:
                box_display(f"The map '{track}' doesn't exist!")

    case 12: #[LB] Longest standing wr
        current_date = datetime.now() # Obtenir la date actuelle
        formatted_date = current_date.strftime("%d/%m/%Y") # Formater la date au format "DD/MM/YYYY"
        wr_days_info = []
        for track in donnees_maps["map"].unique().tolist():
            donnees = donnees_maps.query(f"map == '{track}'")
            dates = donnees.date.tolist()
            dates.append(formatted_date)

            for i in range(len(dates)):
                if i < len(dates)-1:
                    ajout = compare_dates(dates[i],dates[i+1])
                    if ajout == "???" or dates[i][-7:] == "03/2013":
                        wr_days_info.append([[track,i,0], -1])
                    elif ajout[:4] == "(~) ":
                        wr_days_info.append([[track,i,1], int(ajout[4:])])
                    elif dates[i+1] == formatted_date:
                        wr_days_info.append([[track,i,2], int(ajout)])
                    else:
                        wr_days_info.append([[track,i,0], int(ajout)])

            
        sorted_wr = sorted(wr_days_info, key=lambda item: item[1], reverse=True) # Trier le dictionnaire par les valeurs (dates) de manière décroissante  
        longueur_max = 36
        player_list = donnees_maps.player.unique().tolist()
        longueur_max_pseudo = max(len(chaine) for chaine in player_list)

        displ = "Longest Standing WR Leaderboards"
        box_display(displ)
        previous_count = 0
        equal_count = 0
        rank = 1
        affichage_ligne = []

        for indx, count in sorted_wr:

            if count != -1:
                s = "s" if count not in [0,1] else ""
                donnees_current_map = donnees_maps.query(f"map == '{indx[0]}'")
                surplus_index = donnees_current_map.index[0]
                badge = ""
                if indx[2] == 1: badge = "(~)"
                elif indx[2] == 2: badge = "(↗)"
                else: badge = '   '
                affichage_fin = f"{badge} {year_conversion(count)} - {indx[0]} - {donnees_current_map.time[indx[1]+surplus_index]} by {donnees_current_map.player[indx[1]+surplus_index]}"
    
                if previous_count != count:
                    equal_count = 0
                    affichage_ligne.append(f"│ {rank_display(rank)}{' '*(3-(len(str(rank))))} ├ {affichage_fin+' '*(longueur_max + longueur_max_pseudo-len(affichage_fin))}│{donnees_current_map.cheated[indx[1]+surplus_index]*' <- Cheated'}")
                        
                else:
                    equal_count += 1
                    affichage_ligne.append(f"│ {rank_display(rank - equal_count)}{' '*(3-(len(str(rank - equal_count))))} ├ {affichage_fin+' '*(longueur_max + longueur_max_pseudo-len(affichage_fin))}│{donnees_current_map.cheated[indx[1]+surplus_index]*' <- Cheated'}")
                    
                    previous_count = count
                    
                rank += 1

        next_page(affichage_ligne, longueur_max + longueur_max_pseudo, displ)
     
    case 13: #[LB] Biggest WR improvement on a map
        test = False
        while not test:
            box_display("What map?")
            track = str(input("\n>> "))
            print("\n"*30) #Clear l'écran

            if track in donnees_maps["map"].unique().tolist():
                donnees = donnees_maps.query(f"map == '{track}'")
                test = True
                wr_count = donnees.time.count()
                surplus_index = donnees.index[0]
                list_delta = {}

                for elem in range(donnees.index[0],wr_count+surplus_index):
                    if elem-surplus_index != 0:
                        delta = time_delta(donnees.time[elem-1], donnees.time[elem])
                        if delta == "Reseted" or "?" in delta:
                            ajout = -1
                        else:
                            ajout = delta[1]+delta[3:6]
                        list_delta[elem] = int(ajout)

                sorted_wr = sorted(list_delta.items(), key=lambda item: item[1], reverse=True) # Trier le dictionnaire par les valeurs (dates) de manière décroissante
                longueur_max = 21
                player_list = donnees.player.tolist()
                longueur_max_pseudo = max(len(chaine) for chaine in player_list)

                box_display(f"Biggest WR Improvement on {track} Leaderboard")
                print("╭──────┬─"+"─"*(longueur_max + longueur_max_pseudo)+"╮")
                count = ""
                previous_count = 0
                equal_count = 0
                rank = 1
                
                for indx, count in sorted_wr:
                    if count != -1:
                        count = (4-len(str(count)))*"0"+str(count)
                        count = count[0]+'.'+count[1:]+'s'

                        affichage_fin = f"{count} - {donnees.time[indx]} by {donnees.player[indx]}"
                        if previous_count != count:
                            equal_count = 0
                            print(f"│ {rank_display(rank)}{' '*(2-(len(str(rank))))} ├ {affichage_fin+' '*(longueur_max + longueur_max_pseudo-len(affichage_fin))}│{donnees.cheated[indx]*' <- Cheated'}")
                        
                        else:
                            equal_count += 1
                            print(f"│ {rank_display(rank - equal_count)}{' '*(2-(len(str(rank - equal_count))))} ├ {affichage_fin+' '*(longueur_max + longueur_max_pseudo-len(affichage_fin))}│{donnees.cheated[indx]*' <- Cheated'}")
                        
                        previous_count = count
                        rank += 1

                print("╰──────┴─"+"─"*(longueur_max + longueur_max_pseudo)+"╯")
     
            else:
                box_display(f"The map '{track}' doesn't exist!")

    case 15: #[LB] Unique players WR count on a map history
        map_wr_count = {}
        map_list = donnees_maps["map"].unique().tolist()

        for map in map_list:
            map_wr_count[map]=len(donnees_maps.query(f"map == '{map}'")["player"].unique().tolist())

        sorted_scores = sorted(map_wr_count.items(), key=lambda item: item[1], reverse=True) # Trier le dictionnaire par les valeurs (scores) de manière décroissante
        longueur_max = max(len(chaine) for chaine in map_wr_count.items()) + 15

        box_display("Unique Players WR count on maps Leaderboard")
        print("╭───────┬─"+"─"*longueur_max+"╮")
        count = ""
        previous_count = 0
        equal_count = 0
        rank = 1

        for name, count in sorted_scores:
            cheated_wr_count = donnees_maps.query(f"map == '{name}'").cheated.sum()

            cheat_preciser = 1 if cheated_wr_count != 0 else 0
            s = "s" if count != 1 else ""

            affichage_fin = f"{count} Player{s} - {name}"
            
            if previous_count != count:
                equal_count = 0
                print(f"│ {rank_display(rank)}{' '*(3-(len(str(rank))))} ├ {affichage_fin+' '*(longueur_max-len(affichage_fin))}│{cheat_preciser*f' <- {cheated_wr_count} Cheated'}")
            
            else:
                equal_count += 1
                print(f"│ {rank_display(rank - equal_count)}{' '*(3-(len(str(rank - equal_count))))} ├ {affichage_fin+' '*(longueur_max-len(affichage_fin))}│{cheat_preciser*f' <- {cheated_wr_count} Cheated'}")
            
            previous_count = count
            rank += 1

        print("╰───────┴─"+"─"*longueur_max+"╯")

    case 16: #[LB] Current longest standing wr
        current_date = datetime.now() # Obtenir la date actuelle
        formatted_date = current_date.strftime("%d/%m/%Y") # Formater la date au format "DD/MM/YYYY"
        wr_days_info = []
        for track in donnees_maps["map"].unique().tolist():
            donnees = donnees_maps.query(f"map == '{track}'")
            wr_count = len(donnees.time.tolist())
            date = donnees.date.tolist()[-1]
            ajout = compare_dates(date,formatted_date)
            player = donnees.player.tolist()[-1]
            temps = donnees.time.tolist()[-1]
            wr_days_info.append([[track, player, temps], int(ajout)])
        
        sorted_wr = sorted(wr_days_info, key=lambda item: item[1], reverse=True) # Trier le dictionnaire par les valeurs (dates) de manière décroissante  
        longueur_max = 32
        player_list = donnees_maps.player.unique().tolist()
        longueur_max_pseudo = max(len(chaine) for chaine in player_list)

        displ = "Current Longest Standing WR Leaderboards"
        box_display(displ)
        previous_count = 0
        equal_count = 0
        rank = 1
        affichage_ligne = []

        for indx, count in sorted_wr:

            if count != -1:
                s = "s" if count not in [0,1] else ""
                donnees_current_map = donnees_maps.query(f"map == '{indx[0]}'")
                surplus_index = donnees_current_map.index[0]
                
                affichage_fin = f"{year_conversion(count)} - {indx[0]} - {indx[2]} by {indx[1]}"
    
                if previous_count != count:
                    equal_count = 0
                    affichage_ligne.append(f"│ {rank_display(rank)}{' '*(3-(len(str(rank))))} ├ {affichage_fin+' '*(longueur_max + longueur_max_pseudo-len(affichage_fin))}│")
                        
                else:
                    equal_count += 1
                    affichage_ligne.append(f"│ {rank_display(rank - equal_count)}{' '*(3-(len(str(rank - equal_count))))} ├ {affichage_fin+' '*(longueur_max + longueur_max_pseudo-len(affichage_fin))}│")
                    
                    previous_count = count
                    
                rank += 1

        next_page(affichage_ligne, longueur_max + longueur_max_pseudo, displ)

    case 17: #[Xtra] Export history into csv
        pass