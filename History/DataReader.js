// ---
// --- Getting the data
// ---

// Import data

data = getData();


// Data fetching

const rows = data.split("|");
for(let i = 0; i < rows.length; i++){
    rows[i] = rows[i].split(";");
}


// Récupérer les paramètres de l'URL
const params = new URLSearchParams(window.location.search);

// Récupérer la valeur de l'ID
const id = params.get('id');
// Afficher ou utiliser la valeur récupérée
SelectedMap = id.replace(/_/g, ' ');

// ---
// --- Output of blocks on the page
// ---

// List insertion

document.write('<div class="MapChoiceBlock">')

document.write(createMapSelector());
document.write('<h1 class="output" id="output1">Map: '+SelectedMap+'</h1>')
const out1 = document.getElementById("output1"); // Getting what's inside "ouiput1"
document.write('</div>') // end of List block


// Leaderboard insertion

document.write('<div class="LeaderboardBlock">')
document.write(makeTableHTML(rows)); //La table
const LBtable = document.getElementById("Leaderboard");
document.write('</div>') // end of Leaderboard block


LBtable.innerHTML = modifyTable(rows, SelectedMap);


// Adding extra lines in the end to scroll down bellow leaderboard

document.write("<p><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></p>")
document.write("<p><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></p>")



function writeMapScroll() {
    document.write('<div class="scrollmenu">')
    
}

function createMapSelector() {
    code = '';
    code += '<div style="width: 75%; overflow-x: scroll; margin: auto;">';
    code += '<div class="scrollmenu", id="mapScroller" style="width: 2630px;">';
    for (let i = 1; i <= 15; i++) {
        format = i.toString().padStart(2, '0');
        code += '<div style="background-image: url(./assets/mapThumbnails/canyonA' + format + '.jpg); background-size: 175px; width: 175px; height: 117px;">';
        code += '<a href="#home">A' + format + '</a>';
        code += '</div>';
    }
    code += '</div></div>';
    return code;
}


// Modification of the content of the Leaderboard table

function modifyTable(myArray, SelectedMap){

    // Get both the Nation and Flag dictionnaries

    var Nation = getNationality();
    var Flag = getFlag();


    // Setup of the header of the table

    var result = "";
    result += "<tr><th colspan='2' class='LeaderboardPlayer' id='headerPlayer'>Player</th><th class='LeaderboardTime'>Time</th><th class='LeaderboardDate'>Date</th><th class='LeaderboardInfo'>Info</th></tr>";
    

    // Main loop to add each lines
    for(var i=0; i<myArray.length; i++) {
        if(myArray[i][1] == SelectedMap){
            result += "<tr>";

            var Cheat = false
            if(myArray[i][4] === "Cheated"){
                Cheat = true
            }

            for(var j=0; j<myArray[i].length; j++){

                if(j == 0){ // Player column
                    // Finding nationality
                    // result += "<td class='LeaderboardNation'>" + Nation[myArray[i][j]] + "</td>";
                    result += "<td class='LeaderboardNation'>" + '<div class="FlagPic"><img src="' + Flag[Nation[myArray[i][j]]] + '" alt=""></div>' + "</td>";


                    if(Cheat){
                        result += "<td class='LeaderboardPlayer'><span class='Cheated'>"+myArray[i][j]+"</span></td>";
                    }
                    else{
                        var redArray = '';
                        if(myArray[i][j] == "__"){
                            redArray = "<span class='Question'>__</span>";
                        }
                        else{
                            redArray=myArray[i][j];
                        }
                        result += "<td class='LeaderboardPlayer'>"+redArray+"</td>";
                    }
                }

                if(j == 2){ // Time column
                    if(Cheat){
                        result += "<td class='LeaderboardTime'><span class='Cheated'>"+myArray[i][j]+"</span></td>";
                    }
                    else{
                        var redArray = '';
                        for (elem of myArray[i][j]) {
                            if (elem === 'x') {
                                redArray += "<span class='Question'>" + elem + '</span>';
                            }
                            else {
                                redArray += elem;
                            }
                        }
                        result += "<td class='LeaderboardTime'>"+redArray+"</td>";
                    }
                }

                if(j == 3){ // Date column
                    if(Cheat){
                        result += "<td class='LeaderboardDate'><span class='Cheated'>"+myArray[i][j]+"</span></td>";
                    }
                    else{
                        var redArray = '';
                        for (elem of myArray[i][j]) {
                            if (elem === '?') {
                                redArray += "<span class='Question'>" + elem + '</span>';
                            }
                            else {
                                redArray += elem;
                            }
                        }
                        result += "<td class='LeaderboardDate'>"+redArray+"</td>";
                    }
                }

                if(j == 4){ // Info column
                    if(Cheat){
                        result += "<td class='LeaderboardInfo'><span class='Cheated'>"+myArray[i][j]+"</span></td>";
                    }
                    else{
                        if(myArray[i][j] === "."){
                            result += "<td class='LeaderboardInfo'> </td>";
                        }
                        else{
                            result += "<td class='LeaderboardInfo'>"+myArray[i][j]+"</td>";
                        }
                    }
                }
            }
            result += "</tr>";
        }
    }
    return result;
}

function getUniqueColumn(data, column){
    const Something = new Map()
    for(let i = 0; i < data.length; i++){
        Something.set(data[i][column], "sex");
    }
    return [...Something.keys()]

}

function MapSelector(maps){
    var result = '<select name="Maps" id="MapSelector" onchange="getSelectValue()">';
    for(let map of maps){
        result += '<option value="' + map + '">' + map + '</option>';
    }
    result += "</select>";
    return result;
}

// Function that creates the basis of the leaderboards when no maps is selected
function makeTableHTML(myArray) {
    var result = "<table id='Leaderboard'>";
    result += "<tr><th colspan='2'>Player</th><th>Time</th><th>Date</th><th>Info</th></tr>";
    result += "</table>";

    return result;
}

// ---
// --- Introduction of the data inside variables
// ---

// Get the nationality of each players
function getNationality() {
    return {
        "Guillaume" : "?",
        "J & B" : "?",
        "__" : "?",
        "Tha Base" : "?",
        "Smashy" : "?",
        "Wilson" : "?",
        "fo'camo" : "?",
        "TnT" : "?",
        "Dragon" : "?",
        "Tatu" : "?",
        "Totor" : "?",
        "Jadooky" : "?",
        "cuzynot" : "?",
        "SzNaJdeR" : "?",
        "Mad.dox" : "?",
        "Wouter" : "?",
        "Guillaume41" : "?",
        "Beliskner999" : "?",
        "lumatom" : "?",
        "YxalagOiram" : "?",
        "Alexony" : "?",
        "CretinusMania" : "?",
        "trace_8" : "?",
        "Alepede" : "?",
        "Globo" : "?",
        "BoktorBanane" : "?",
        "Firop" : "?",
        "ColdM4mba" : "?",
        "Pillday" : "?",
        "Melkey" : "?",
        "Qfireball" : "?",
        "milchshakee" : "?",
        "Nize" : "?",
        "Pascow" : "?",
        "Ludo" : "?",
        "Greenius" : "?",
        "Dean091" : "?",
        "mctavish01" : "?",
        "Loko" : "?",
        "DrBob" : "?",
        "Shezou" : "?",
        "MnstrsOmega" : "?",
        "Harryvanman" : "?",
        "ShineX" : "?",
        "katerbarg" : "?",
        "C1R10N" : "?",
        "Looz" : "?",
        "Robert" : "?",
        "Maverick-V8" : "?",
        "Sape27" : "?",
        "Hemerald" : "?",
        "RACETA" : "isr",
        "Dekz" : "isr",
        "Kripke" : "ger",
        "riolu" : "ger",
        "Blizz" : "ger",
        "racehans" : "ger",
        "Boerta" : "ger",
        "Netsky" : "ger",
        "the.Park" : "ger",
        "eprotizuu" : "ger",
        "Arcanos" : "ger",
        "Alecz" : "ger",
        "Beat" : "ger",
        "Spunki" : "ger",
        "nexx." : "ger",
        "DexteR" : "ger",
        "Maciey" : "ger",
        "Schmaniol" : "ger",
        "Passi" : "ger",
        "Hanni0" : "ger",
        "Philkos" : "ger",
        "Down" : "ger",
        "Peyman" : "ger",
        "Vogter" : "ger",
        "Tomsen" : "ger",
        "Detinu" : "ger",
        "Mystixor" : "ger",
        "Night" : "ger",
        "7777Alex7777" : "ger",
        "Thoringer" : "ger",
        "WhiteShadow" : "ger",
        "HQCookie" : "ger",
        "Techno" : "ger",
        "racerlight" : "ger",
        "Piotrunio" : "ger",
        "Taxon" : "ger",
        "styx" : "ger",
        "Rxyveax" : "ger",
        "Coodyyy" : "ger",
        "Azora" : "ger",
        "Anzone" : "ger",
        "Benitabor" : "ger",
        "Marius89" : "ger",
        "hec_ker" : "ger",
        "maysen" : "ger",
        "xxAlex765xx" : "ger",
        "DarkBringer" : "ger",
        "Pentacosmic" : "ger",
        "Speedy0407" : "ger",
        "oNion" : "ger",
        "TekkForce" : "ger",
        "Shock" : "ger",
        "Sphinx" : "ger",
        "Dellecto" : "ger",
        "GMAlf" : "ger",
        "Coradon24" : "ger",
        "Lars" : "ger",
        "Dused" : "ger",
        "Hivee" : "ger",
        "Nino" : "ger",
        "NJin" : "ger",
        "Derter" : "ger",
        "Dog" : "ger",
        "insane" : "ger",
        "Santus" : "ger",
        "Massa" : "ger",
        "oNio" : "ger",
        "bbAmerang" : "ger",
        "meson" : "ger",
        "iEnrage" : "ger",
        "Ploeder" : "ger",
        "hal.ko.TimaE" : "ger",
        "Vyrisus" : "ger",
        "Cravellas" : "ger",
        "Scholly1896" : "ger",
        "gtahabinet" : "ger",
        "Rimba92" : "ger",
        "Loupphok" : "fra",
        "MiThyX" : "fra",
        "Flechetas" : "fra",
        "ZedroX" : "fra",
        "Pieton" : "fra",
        "Camion" : "fra",
        "Aziix" : "fra",
        "LAMArtifice" : "fra",
        "Labaffue" : "fra",
        "Vulnerra" : "fra",
        "Sapi" : "fra",
        "Fire!" : "fra",
        "instable" : "fra",
        "KevinStrike" : "fra",
        "YodarK" : "fra",
        "WiiDii" : "fra",
        "Yosh" : "fra",
        "PetitPredator" : "fra",
        "Nawk" : "fra",
        "Samuel" : "fra",
        "Katic" : "fra",
        "hugo220" : "fra",
        "Forsaken" : "fra",
        "Wiloux" : "fra",
        "Gwen" : "fra",
        "BossWanted" : "fra",
        "trabadia" : "fra",
        "Panda" : "fra",
        "Bicougnon" : "fra",
        "Brandom" : "fra",
        "Switch" : "fra",
        "Ryxsar" : "fra",
        "ringoa" : "fra",
        "Cocho" : "fra",
        "Marco" : "fra",
        "Kaio" : "fra",
        "Symbiose" : "fra",
        "Space" : "fra",
        "Quentin43" : "fra",
        "Lzfix" : "fra",
        "Nemesis" : "fra",
        "Samerlifofwer" : "fra",
        "Gyrule" : "fra",
        "ender" : "fra",
        "Eyohna" : "fra",
        "fanakuri" : "fra",
        "ZyGoTo" : "fra",
        "Nath" : "fra",
        "hyp" : "fra",
        "Crinatiraxx" : "fra",
        "NeYo-8826" : "fra",
        "RS Tornado" : "fra",
        "Sky" : "fra",
        "NazgulAars" : "fra",
        "Sypher" : "fra",
        "kaka" : "fra",
        "Pks" : "fra",
        "Lanz" : "fra",
        "Guileboom" : "fra",
        "Knt-1" : "fra",
        "trckmn" : "fra",
        "Neko" : "fra",
        "Phenomega" : "fra",
        "Scorm" : "fra",
        "Lookid" : "fra",
        "btonios" : "fra",
        "Alyen" : "fra",
        "Guerro323" : "fra",
        "TheMonsterC2" : "fra",
        "AQueCCbob" : "fra",
        "tayck" : "fra",
        "FunnyBear" : "fra",
        "Kazey77" : "fra",
        "MrLag" : "fra",
        "Canon" : "fra",
        "Shamzie" : "fra",
        "Gunther" : "fra",
        "Lektro89" : "fra",
        "Purification" : "fra",
        "Nahoy" : "fra",
        "SiXav78" : "fra",
        "GarmouZze" : "fra",
        "Farcry69" : "fra",
        "Bluts" : "bel",
        "Scrapie" : "bel",
        "Ragha" : "bel",
        "Laurens" : "bel",
        "Flave" : "bel",
        "Suptim4L" : "bel",
        "Arcade" : "bel",
        "MGM" : "bel",
        "Session005" : "bel",
        "Demon" : "nl",
        "Trinity" : "nl",
        "Pinda" : "nl",
        "Spam" : "nl",
        "Cloud" : "nl",
        "Joepie" : "nl",
        "Schimmy" : "nl",
        "juvo" : "nl",
        "AM98" : "nl",
        "Grudge" : "nl",
        "Zooz" : "nl",
        "Koenz" : "nl",
        "Wag" : "nl",
        "TimonBoaz" : "nl",
        "Bill" : "nl",
        "RedExtra" : "nl",
        "Zycos" : "nl",
        "Astronautj" : "nl",
        "RotakeR" : "pol",
        "Doc_Me4ik" : "pol",
        "Danio" : "pol",
        "frvr" : "pol",
        "Savier" : "pol",
        "Frev" : "pol",
        "fliks" : "pol",
        "XoN" : "pol",
        "GravelGuy" : "pol",
        "mime" : "pol",
        "Kulisa" : "pol",
        "Mnichu" : "pol",
        "wortex" : "pol",
        "Plastorex" : "pol",
        "KarasT7" : "pol",
        "KarjeN" : "swe",
        "Pigge" : "swe",
        "Keby" : "swe",
        "Byfjunarn" : "swe",
        "Advision" : "swe",
        "Gosaft" : "swe",
        "frostBeule" : "swe",
        "Lokring" : "swe",
        "DeathRow" : "swe",
        "KlockreN" : "swe",
        "Skuggako" : "swe",
        "CarlJr" : "can",
        "Wally" : "can",
        "Knetogs" : "can",
        "Karhu" : "fin",
        "ClearVision" : "fin",
        "DanikB" : "cze",
        "Ancaqar" : "cze",
        "Shock77" : "cze",
        "Flyer" : "cze",
        "Synaptic" : "cze",
        "Kappa" : "cze",
        "rez" : "cze",
        "Wolfii" : "cze",
        "BigBang1112" : "cze",
        "Ondra" : "cze",
        "Edgekiwi" : "cze",
        "Richie" : "cze",
        "Rollin" : "aut",
        "Phip" : "aut",
        "Luffy" : "aut",
        "Kazuma" : "aut",
        "faqez" : "aut",
        "7Alvin" : "sui",
        "Affi" : "sui",
        "Coscos" : "sui",
        "Reyger" : "sui",
        "Loic" : "sui",
        "lacsyl" : "sui",
        "BGHM" : "sui",
        "L94" : "sui",
        "Deluxe699" : "sui",
        "Hakanai" : "sui",
        "masterkey" : "sui",
        "Galax39" : "sui",
        "JaV" : "nzd",
        "animruler2" : "nzd",
        "mt17" : "usa",
        "Nixotica" : "usa",
        "edk" : "usa",
        "Quasar" : "usa",
        "ydooWoody" : "usa",
        "wormk22" : "usa",
        "erikmania" : "usa",
        "Solidtrees" : "usa",
        "Dark_Abyssii" : "usa",
        "NixGames" : "usa",
        "Slimpikcet" : "usa",
        "Lumby" : "usa",
        "irtri" : "usa",
        "KAYS" : "usa",
        "Tween" : "slk",
        "n0body" : "uk",
        "LeoTM2" : "uk",
        "Pac" : "uk",
        "Artemis" : "uk",
        "Ricky" : "uk",
        "Speed" : "uk",
        "Howell" : "uk",
        "Mazzargh" : "uk",
        "Scotsman" : "uk",
        "Hefest" : "cro",
        "RKO 90" : "ita",
        "AleTheLegend" : "ita",
        "CircuitFerrari" : "ita",
        "mart1gann" : "por",
        "dragonpntm" : "por",
        "Zypher" : "por",
        "futurecat" : "por",
        "Jaja" : "mar",
        "Hectrox" : "esp",
        "JaviFlyer" : "esp",
        "Joltysonic" : "esp",
        "Kilarath" : "esp",
        "asier" : "esp",
        "DRIVER6479" : "esp",
        "Apoq" : "nor",
        "Phoebe" : "nor",
        "awba1" : "nor",
        "Levon" : "nor",
        "Yogosun" : "nor",
        "DarkLink94" : "nor",
        "Hyllez" : "nor",
        "Danneboy" : "nor",
        "Mubazen" : "nor",
        "Erizel" : "nor",
        "Serbi" : "den",
        "Madzen" : "den",
        "ivan" : "den",
        "Dunste" : "den",
        "Mudda" : "aus",
        "Mebe12" : "aus",
        "Jerome" : "aus",
        "mattjimjett" : "aus",
        "bcp" : "aus",
        "vrbica" : "slv",
        "marios2000" : "gre",
        "eddyey" : "kaz",
        "Pavel" : "blr",
        "Warrenz79" : "irl",
        "Demedi" : "hun",
        "Rosiante-S" : "jpn",
        "Bakatonorz" : "jpn",
        "Yuki" : "jpn",
        "acidmist" : "jpn",
        "Alewka" : "rus",
        "introC" : "rus",
        "Stik" : "rus",
        "Dark_QFX" : "rus",
        "Jjyyay" : "tga",
        "icenine" : "bra"
    }
}

// Get the flag image link of each nations
function getFlag() {
    return {
        "?":"assets/flags/question.png",
        "isr":"assets/flags/israel.png",
        "ger":"assets/flags/allemagne.png",
        "fra":"assets/flags/france.png",
        "bel":"assets/flags/la-belgique.png",
        "nl":"assets/flags/pays-bas.png",
        "pol":"assets/flags/pologne.png",
        "swe":"assets/flags/suede.png",
        "can":"assets/flags/canada.png",
        "fin":"assets/flags/finlande.png",
        "cze":"assets/flags/republique-tcheque.png",
        "aut":"assets/flags/lautriche.png",
        "sui":"assets/flags/suisse.png",
        "nzd":"assets/flags/nouvelle-zelande.png",
        "usa":"assets/flags/etats-unis.png",
        "slk":"assets/flags/slovaquie.png",
        "uk":"assets/flags/royaume-uni.png",
        "cro":"assets/flags/croatie.png",
        "ita":"assets/flags/italy.png",
        "por":"assets/flags/le-portugal.png",
        "mar":"assets/flags/maroc.png",
        "esp":"assets/flags/espagne.png",
        "nor":"assets/flags/norvege.png",
        "den":"assets/flags/danemark.png",
        "aus":"assets/flags/australie.png",
        "slv":"assets/flags/slovenie.png",
        "gre":"assets/flags/grece.png",
        "kaz":"assets/flags/kazakhstan.png",
        "blr":"assets/flags/bielorussie.png",
        "irl":"assets/flags/irlande.png",
        "hun":"assets/flags/hongrie.png",
        "jpn":"assets/flags/japon.png",
        "rus":"assets/flags/russie.png",
        "tga":"assets/flags/tonga.png",
        "bra":"assets/flags/bresil.png",
    }
}

// Get the world records data
function getData() {
    return "riolu;A01 - Canyon;23.978;17/10/2011;.;Canyon;TM2|\
Marco;A01 - Canyon;23.968;27/04/2012;check this chan;Canyon;TM2|\
riolu;A01 - Canyon;23.952;01/05/2012;.;Canyon;TM2|\
riolu;A01 - Canyon;23.945;23/05/2013;Cheated;Canyon;TM2|\
riolu;A01 - Canyon;23.708;15/06/2017;.;Canyon;TM2|\
Jerome;A01 - Canyon;23.691;02/07/2017;.;Canyon;TM2|\
riolu;A01 - Canyon;23.685;30/07/2017;.;Canyon;TM2|\
Mebe12;A01 - Canyon;23.684;10/06/2018;.;Canyon;TM2|\
riolu;A01 - Canyon;23.680;??/??/????;.;Canyon;TM2|\
Mebe12;A01 - Canyon;23.676;15/11/2019;.;Canyon;TM2|\
riolu;A01 - Canyon;23.675;15/11/2019;Cheated;Canyon;TM2|\
Yogosun;A01 - Canyon;23.657;22/07/2020;DUCK;Canyon;TM2|\
Mebe12;A01 - Canyon;23.652;26/06/2022;.;Canyon;TM2|\
riolu;A02 - Canyon;25.053;15/01/2012;.;Canyon;TM2|\
riolu;A02 - Canyon;25.047;??/??/2012;.;Canyon;TM2|\
Marco;A02 - Canyon;25.035;27/04/2012;.;Canyon;TM2|\
Marco;A02 - Canyon;25.02x;??/??/2012;.;Canyon;TM2|\
riolu;A02 - Canyon;25.016;09/10/2012;.;Canyon;TM2|\
riolu;A02 - Canyon;24.992;02/01/2013;Cheated;Canyon;TM2|\
riolu;A02 - Canyon;24.798;11/06/2017;.;Canyon;TM2|\
riolu;A02 - Canyon;24.786;??/??/????;.;Canyon;TM2|\
Mebe12;A02 - Canyon;24.775;30/05/2018;.;Canyon;TM2|\
riolu;A02 - Canyon;24.760;02/04/2019;.;Canyon;TM2|\
Yogosun;A02 - Canyon;24.758;11/09/2020;DUCK;Canyon;TM2|\
Yogosun;A02 - Canyon;24.750;14/09/2020;.;Canyon;TM2|\
Yogosun;A02 - Canyon;24.748;12/12/2020;.;Canyon;TM2|\
Yogosun;A02 - Canyon;24.738;14/12/2020;.;Canyon;TM2|\
Mebe12;A02 - Canyon;24.737;02/06/2022;.;Canyon;TM2|\
Yogosun;A02 - Canyon;24.732;29/08/2022;.;Canyon;TM2|\
Mebe12;A02 - Canyon;24.726;05/09/2022;.;Canyon;TM2|\
riolu;A03 - Canyon;17.278;15/09/2011;1 day after;Canyon;TM2|\
7Alvin;A03 - Canyon;17.24x;17/10/2011;Roof hit;Canyon;TM2|\
7Alvin;A03 - Canyon;17.23x;??/??/????;Official (claim);Canyon;TM2|\
riolu;A03 - Canyon;17.218;13/03/2012;.;Canyon;TM2|\
riolu;A03 - Canyon;17.198;??/??/2012;< 14/09/12;Canyon;TM2|\
riolu;A03 - Canyon;17.190;02/10/2012;.;Canyon;TM2|\
riolu;A03 - Canyon;17.158;20/02/2015;.;Canyon;TM2|\
DarkLink94;A03 - Canyon;16.998;09/05/2017;.;Canyon;TM2|\
DarkLink94;A03 - Canyon;16.968;12/05/2017;.;Canyon;TM2|\
marios2000;A03 - Canyon;16.951;25/05/2017;.;Canyon;TM2|\
riolu;A03 - Canyon;16.934;16/06/2017;.;Canyon;TM2|\
riolu;A03 - Canyon;16.911;09/08/2017;.;Canyon;TM2|\
Mebe12;A03 - Canyon;16.908;26/05/2018;.;Canyon;TM2|\
riolu;A03 - Canyon;16.898;??/??/????;> 26/10/17;Canyon;TM2|\
riolu;A03 - Canyon;16.886;??/??/????;.;Canyon;TM2|\
Yogosun;A03 - Canyon;16.881;27/04/2020;DUCK;Canyon;TM2|\
Cloud;A03 - Canyon;16.878;27/06/2020;.;Canyon;TM2|\
Yogosun;A03 - Canyon;16.871;01/07/2020;.;Canyon;TM2|\
Mebe12;A03 - Canyon;16.858;16/02/2021;.;Canyon;TM2|\
riolu;A04 - Canyon;21.674;25/11/2011;New cut;Canyon;TM2|\
riolu;A04 - Canyon;21.543;25/02/2012;.;Canyon;TM2|\
edk;A04 - Canyon;20.553;??/??/????;.;Canyon;TM2|\
riolu;A04 - Canyon;20.496;15/05/2014;.;Canyon;TM2|\
edk;A04 - Canyon;20.479;??/??/????;>29/03/15;Canyon;TM2|\
Wolfii;A04 - Canyon;19.923;28/04/2017;New cut;Canyon;TM2|\
Joepie;A04 - Canyon;19.821;??/04/2017;.;Canyon;TM2|\
riolu;A04 - Canyon;19.462;01/04/2017;.;Canyon;TM2|\
riolu;A04 - Canyon;19.069;17/06/2017;.;Canyon;TM2|\
Mebe12;A04 - Canyon;19.063;??/??/2017;< 07/08/17;Canyon;TM2|\
riolu;A04 - Canyon;19.019;??/??/2017;22 wr;Canyon;TM2|\
Mebe12;A04 - Canyon;18.910;13/08/2017;Sub 19;Canyon;TM2|\
Mebe12;A04 - Canyon;18.805;17/08/2017;.;Canyon;TM2|\
riolu;A04 - Canyon;18.765;18/08/2017;.;Canyon;TM2|\
Mebe12;A04 - Canyon;18.702;09/11/2017;.;Canyon;TM2|\
riolu;A04 - Canyon;18.697;??/11/2017;Cheated;Canyon;TM2|\
Mebe12;A04 - Canyon;18.643;22/11/2017;DUCK;Canyon;TM2|\
rez;A04 - Canyon;18.566;09/01/2018;.;Canyon;TM2|\
Mebe12;A04 - Canyon;18.521;23/09/2020;.;Canyon;TM2|\
Mebe12;A04 - Canyon;18.504;12/12/2020;.;Canyon;TM2|\
Mebe12;A04 - Canyon;18.391;15/12/2020;.;Canyon;TM2|\
riolu;A05 - Canyon;1:27.346;27/12/2011;.;Canyon;TM2|\
riolu;A05 - Canyon;1:26.950;21/01/2012;.;Canyon;TM2|\
riolu;A05 - Canyon;1:26.766;20/12/2012;.;Canyon;TM2|\
riolu;A05 - Canyon;1:26.413;31/07/2015;.;Canyon;TM2|\
Mebe12;A05 - Canyon;1:26.454;11/05/2018;.;Canyon;TM2|\
riolu;A05 - Canyon;1:26.408;??/05/2018;.;Canyon;TM2|\
Mebe12;A05 - Canyon;1:26.391;15/05/2018;.;Canyon;TM2|\
riolu;A05 - Canyon;???;??/05/2018;.;Canyon;TM2|\
Mebe12;A05 - Canyon;1:26.353;25/05/2018;.;Canyon;TM2|\
Mebe12;A05 - Canyon;1:26.336;25/05/2018;.;Canyon;TM2|\
riolu;A05 - Canyon;1:26.314;??/??/2018;.;Canyon;TM2|\
Mebe12;A05 - Canyon;1:26.292;16/06/2018;.;Canyon;TM2|\
riolu;A05 - Canyon;1:26.234;??/??/????;.;Canyon;TM2|\
Mebe12;A05 - Canyon;1:26.231;08/11/2019;.;Canyon;TM2|\
riolu;A05 - Canyon;1:26.184;15/11/2019;Cheated;Canyon;TM2|\
Mebe12;A05 - Canyon;1:26.146;22/06/2020;DUCK;Canyon;TM2|\
Mebe12;A05 - Canyon;1:26.071;02/04/2021;.;Canyon;TM2|\
riolu;A06 - Canyon;22.768;28/09/2011;.;Canyon;TM2|\
Plastorex;A06 - Canyon;22.75x;13/10/2011;.;Canyon;TM2|\
riolu;A06 - Canyon;22.743;??/??/????;<21/04/12;Canyon;TM2|\
riolu;A06 - Canyon;22.708;07/08/2013;.;Canyon;TM2|\
edk;A06 - Canyon;22.687;??/??/????;.;Canyon;TM2|\
riolu;A06 - Canyon;22.651;15/04/2015;.;Canyon;TM2|\
riolu;A06 - Canyon;22.451;18/06/2017;.;Canyon;TM2|\
riolu;A06 - Canyon;22.432;12/07/2019;.;Canyon;TM2|\
Mebe12;A06 - Canyon;22.428;21/07/2020;.;Canyon;TM2|\
Yogosun;A06 - Canyon;22.420;14/02/2021;.;Canyon;TM2|\
Mebe12;A06 - Canyon;22.417;16/02/2021;.;Canyon;TM2|\
Yogosun;A06 - Canyon;22.414;20/02/2021;.;Canyon;TM2|\
Mebe12;A06 - Canyon;22.413;26/02/2021;.;Canyon;TM2|\
Marco;A07 - Canyon;25.31x;25/09/2011;Flip;Canyon;TM2|\
7Alvin;A07 - Canyon;25.25x;26/09/2011;.;Canyon;TM2|\
riolu;A07 - Canyon;25.244;??/??/????;<04/05/12;Canyon;TM2|\
__;A07 - Canyon;24.99x;??/??/2012;<06/06/12;Canyon;TM2|\
riolu;A07 - Canyon;24.943;??/??/2012;<07/07/12;Canyon;TM2|\
Wouter;A07 - Canyon;24.87x;??/??/????;.;Canyon;TM2|\
riolu;A07 - Canyon;24.845;25/04/2013;.;Canyon;TM2|\
erikmania;A07 - Canyon;24.808;10/02/2016;.;Canyon;TM2|\
Warrenz79;A07 - Canyon;24.814;09/05/2017;.;Canyon;TM2|\
riolu;A07 - Canyon;24.606;10/06/2017;Cheated;Canyon;TM2|\
Mebe12;A07 - Canyon;24.567;11/09/2020;.;Canyon;TM2|\
Mebe12;A08 - Canyon;18.441;13/08/2018;.;Canyon;TM2|\
Yogosun;A08 - Canyon;18.437;25/11/2020;.;Canyon;TM2|\
Mebe12;A08 - Canyon;18.435;16/12/2020;.;Canyon;TM2|\
Mebe12;A08 - Canyon;18.426;10/12/2020;.;Canyon;TM2|\
Yogosun;A08 - Canyon;18.423;05/01/2021;.;Canyon;TM2|\
Mebe12;A08 - Canyon;18.418;06/01/2021;.;Canyon;TM2|\
riolu;A09 - Canyon;21.976;13/06/2018;.;Canyon;TM2|\
Mebe12;A09 - Canyon;21.963;16/08/2020;.;Canyon;TM2|\
Mebe12;A10 - Canyon;1:55.763;21/03/2020;.;Canyon;TM2|\
Mebe12;A10 - Canyon;1:55.646;03/01/2022;.;Canyon;TM2|\
riolu;A11 - Canyon;22.070;27/03/2019;.;Canyon;TM2|\
Mebe12;A11 - Canyon;22.058;10/08/2020;.;Canyon;TM2|\
riolu;A12 - Canyon;27.467;27/04/2020;.;Canyon;TM2|\
Mebe12;A12 - Canyon;27.448;20/07/2020;.;Canyon;TM2|\
Mebe12;A12 - Canyon;27.447;05/09/2022;.;Canyon;TM2|\
Yogosun;A12 - Canyon;27.444;07/09/2022;.;Canyon;TM2|\
Mebe12;A12 - Canyon;27.437;11/09/2022;.;Canyon;TM2|\
riolu;A13 - Canyon;18.817;28/05/2020;.;Canyon;TM2|\
Mebe12;A13 - Canyon;18.816;09/09/2020;.;Canyon;TM2|\
Artemis;A13 - Canyon;18.812;23/04/2022;.;Canyon;TM2|\
Artemis;A13 - Canyon;18.807;25/04/2022;.;Canyon;TM2|\
Artemis;A13 - Canyon;18.806;26/04/2022;.;Canyon;TM2|\
Artemis;A13 - Canyon;18.801;28/04/2022;.;Canyon;TM2|\
Artemis;A13 - Canyon;18.798;30/04/2022;.;Canyon;TM2|\
Mebe12;A13 - Canyon;18.785;01/05/2022;.;Canyon;TM2|\
riolu;A14 - Canyon;27.238;01/04/2019;.;Canyon;TM2|\
Mebe12;A14 - Canyon;27.218;07/08/2020;.;Canyon;TM2|\
Cloud;A14 - Canyon;27.201;08/05/2022;.;Canyon;TM2|\
Mebe12;A14 - Canyon;27.196;11/05/2022;.;Canyon;TM2|\
riolu;A15 - Canyon;2:18.238;20/07/2019;.;Canyon;TM2|\
Mebe12;A15 - Canyon;2:18.128;25/06/2020;.;Canyon;TM2|\
Mebe12;A15 - Canyon;2:18.043;11/09/2020;.;Canyon;TM2|\
Mebe12;A15 - Canyon;2:17.660;13/09/2020;.;Canyon;TM2|\
Cloud;A15 - Canyon;2:17.572;29/08/2022;.;Canyon;TM2|\
Mebe12;A15 - Canyon;2:17.452;09/08/2022;.;Canyon;TM2|\
riolu;B01 - Canyon;36.685;16/07/2019;.;Canyon;TM2|\
Mebe12;B01 - Canyon;36.675;19/07/2020;.;Canyon;TM2|\
Artemis;B01 - Canyon;36.674;05/12/2020;.;Canyon;TM2|\
Mebe12;B01 - Canyon;36.648;05/12/2020;.;Canyon;TM2|\
Mebe12;B01 - Canyon;36.640;17/12/2020;.;Canyon;TM2|\
Artemis;B01 - Canyon;36.627;07/02/2023;.;Canyon;TM2|\
Mebe12;B01 - Canyon;36.614;08/02/2023;.;Canyon;TM2|\
Artemis;B01 - Canyon;36.603;26/02/2023;.;Canyon;TM2|\
Mebe12;B01 - Canyon;36.597;06/03/2023;.;Canyon;TM2|\
riolu;B02 - Canyon;31.830;20/05/2018;.;Canyon;TM2|\
Mebe12;B02 - Canyon;31.828;21/08/2020;.;Canyon;TM2|\
Mebe12;B02 - Canyon;31.825;20/02/2021;.;Canyon;TM2|\
Mebe12;B02 - Canyon;31.820;20/02/2021;.;Canyon;TM2|\
Mebe12;B02 - Canyon;31.815;21/05/2021;.;Canyon;TM2|\
Mebe12;B02 - Canyon;31.811;23/05/2021;.;Canyon;TM2|\
Mebe12;B02 - Canyon;31.796;03/07/2021;.;Canyon;TM2|\
Ricky;B03 - Canyon;20.648;30/03/2020;.;Canyon;TM2|\
Mebe12;B03 - Canyon;20.600;25/08/2020;.;Canyon;TM2|\
riolu;B04 - Canyon;30.440;02/04/2019;.;Canyon;TM2|\
Mebe12;B04 - Canyon;30.420;17/07/2020;.;Canyon;TM2|\
Mebe12;B04 - Canyon;30.415;13/02/2021;.;Canyon;TM2|\
Mebe12;B04 - Canyon;30.411;13/02/2021;.;Canyon;TM2|\
Mebe12;B04 - Canyon;30.388;14/02/2021;.;Canyon;TM2|\
Mebe12;B04 - Canyon;30.376;30/03/2024;.;Canyon;TM2|\
Mebe12;B04 - Canyon;30.317;05/04/2024;.;Canyon;TM2|\
Yogosun;B04 - Canyon;30.310;08/04/2024;.;Canyon;TM2|\
Mebe12;B04 - Canyon;30.294;10/04/2024;.;Canyon;TM2|\
Cloud;B05 - Canyon;2:24.884;21/05/2020;.;Canyon;TM2|\
Mebe12;B05 - Canyon;2:24.832;26/06/2020;.;Canyon;TM2|\
Mebe12;B05 - Canyon;2:24.698;27/06/2020;.;Canyon;TM2|\
Cloud;B05 - Canyon;2:24.626;12/06/2022;.;Canyon;TM2|\
Mebe12;B05 - Canyon;2:24.512;13/06/2022;.;Canyon;TM2|\
riolu;B06 - Canyon;37.373;03/05/2020;.;Canyon;TM2|\
Mebe12;B06 - Canyon;37.353;19/06/2020;.;Canyon;TM2|\
riolu;B06 - Canyon;37.324;19/06/2020;.;Canyon;TM2|\
Mebe12;B06 - Canyon;37.318;15/09/2020;.;Canyon;TM2|\
Mebe12;B06 - Canyon;37.278;17/03/2022;.;Canyon;TM2|\
riolu;B07 - Canyon;37.876;28/05/2020;.;Canyon;TM2|\
Ricky;B07 - Canyon;37.860;08/06/2020;.;Canyon;TM2|\
Mebe12;B07 - Canyon;37.832;16/07/2020;.;Canyon;TM2|\
Mebe12;B07 - Canyon;37.811;22/07/2022;.;Canyon;TM2|\
Mebe12;B07 - Canyon;37.802;22/07/2022;.;Canyon;TM2|\
Mebe12;B07 - Canyon;37.774;22/07/2022;.;Canyon;TM2|\
riolu;B08 - Canyon;-;-;.;Canyon;TM2|\
Artemis;B08 - Canyon;16.565;21/04/2020;.;Canyon;TM2|\
Yogosun;B08 - Canyon;16.562;18/08/2020;.;Canyon;TM2|\
Yogosun;B08 - Canyon;16.544;29/08/2020;.;Canyon;TM2|\
Mebe12;B08 - Canyon;16.543;10/02/2023;.;Canyon;TM2|\
Mystixor;B08 - Canyon;15.983;07/09/2023;New cut;Canyon;TM2|\
Mebe12;B08 - Canyon;15.754;13/09/2023;.;Canyon;TM2|\
riolu;B09 - Canyon;32.645;13/07/2019;.;Canyon;TM2|\
Mebe12;B09 - Canyon;32.636;22/07/2020;.;Canyon;TM2|\
Cloud;B09 - Canyon;32.618;10/03/2021;.;Canyon;TM2|\
Mebe12;B09 - Canyon;32.613;12/03/2021;.;Canyon;TM2|\
Mebe12;B09 - Canyon;32.536;12/03/2021;.;Canyon;TM2|\
Cloud;B09 - Canyon;32.533;11/05/2022;.;Canyon;TM2|\
Cloud;B09 - Canyon;32.532;12/05/2022;.;Canyon;TM2|\
Cloud;B09 - Canyon;32.512;12/05/2022;.;Canyon;TM2|\
Mebe12;B09 - Canyon;32.491;12/05/2022;.;Canyon;TM2|\
Cloud;B09 - Canyon;32.423;23/05/2022;.;Canyon;TM2|\
Mebe12;B09 - Canyon;32.416;26/05/2022;.;Canyon;TM2|\
riolu;B10 - Canyon;1:37.435;02/08/2019;.;Canyon;TM2|\
Mebe12;B10 - Canyon;1:37.345;12/06/2020;.;Canyon;TM2|\
Yogosun;B10 - Canyon;1:37.272;16/06/2020;.;Canyon;TM2|\
Mebe12;B10 - Canyon;1:37.188;16/06/2020;.;Canyon;TM2|\
Cloud;B10 - Canyon;1:37.178;13/06/2022;.;Canyon;TM2|\
Mebe12;B10 - Canyon;1:37.136;13/06/2022;.;Canyon;TM2|\
Mebe12;B10 - Canyon;1:37.093;13/06/2022;.;Canyon;TM2|\
riolu;B11 - Canyon;41.157;05/05/2020;.;Canyon;TM2|\
Mebe12;B11 - Canyon;41.144;03/08/2020;.;Canyon;TM2|\
riolu;B12 - Canyon;31.742;11/12/2019;.;Canyon;TM2|\
Mebe12;B12 - Canyon;31.710;26/07/2020;.;Canyon;TM2|\
Yogosun;B12 - Canyon;31.705;13/03/2021;.;Canyon;TM2|\
Yogosun;B12 - Canyon;31.704;13/03/2021;.;Canyon;TM2|\
Yogosun;B12 - Canyon;31.664;14/03/2021;.;Canyon;TM2|\
Mebe12;B12 - Canyon;31.655;14/03/2021;.;Canyon;TM2|\
Yogosun;B12 - Canyon;31.650;15/03/2021;.;Canyon;TM2|\
Yogosun;B12 - Canyon;31.632;17/03/2021;.;Canyon;TM2|\
Yogosun;B12 - Canyon;31.618;17/03/2021;.;Canyon;TM2|\
Mebe12;B12 - Canyon;31.583;19/03/2021;.;Canyon;TM2|\
Yogosun;B12 - Canyon;31.573;01/04/2021;.;Canyon;TM2|\
Mebe12;B12 - Canyon;31.568;20/04/2021;.;Canyon;TM2|\
Yogosun;B13 - Canyon;11.610;20/03/2020;.;Canyon;TM2|\
Yogosun;B13 - Canyon;11.584;30/11/2020;.;Canyon;TM2|\
riolu;B14 - Canyon;35.670;29/03/2019;.;Canyon;TM2|\
Mebe12;B14 - Canyon;35.668;23/07/2020;.;Canyon;TM2|\
Yogosun;B14 - Canyon;35.663;13/02/2021;.;Canyon;TM2|\
Mebe12;B14 - Canyon;35.626;13/02/2021;.;Canyon;TM2|\
Mebe12;B14 - Canyon;35.614;17/03/2022;.;Canyon;TM2|\
Mebe12;B15 - Canyon;2:22.308;05/03/2020;.;Canyon;TM2|\
Cloud;B15 - Canyon;2:22.114;27/02/2021;.;Canyon;TM2|\
Mebe12;B15 - Canyon;2:22.050;27/02/2021;.;Canyon;TM2|\
Mebe12;B15 - Canyon;2:21.868;27/02/2021;.;Canyon;TM2|\
Mebe12;B15 - Canyon;2:21.828;27/02/2021;.;Canyon;TM2|\
Quentin43;B15 - Canyon;2:21.715;24/08/2021;.;Canyon;TM2|\
Mebe12;B15 - Canyon;2:21.378;24/08/2021;.;Canyon;TM2|\
riolu;C01 - Canyon;34.264;15/11/2019;.;Canyon;TM2|\
Mebe12;C01 - Canyon;34.258;29/08/2020;.;Canyon;TM2|\
Mebe12;C01 - Canyon;34.235;06/11/2022;.;Canyon;TM2|\
Mebe12;C01 - Canyon;34.158;06/11/2022;.;Canyon;TM2|\
riolu;C02 - Canyon;38.135;04/08/2019;.;Canyon;TM2|\
Mebe12;C02 - Canyon;38.104;08/08/2020;.;Canyon;TM2|\
Mebe12;C02 - Canyon;38.071;19/09/2020;.;Canyon;TM2|\
Mebe12;C02 - Canyon;38.048;12/07/2022;.;Canyon;TM2|\
Mebe12;C02 - Canyon;38.032;13/07/2022;.;Canyon;TM2|\
Mebe12;C02 - Canyon;38.031;13/07/2022;.;Canyon;TM2|\
Mebe12;C02 - Canyon;38.025;13/07/2022;.;Canyon;TM2|\
Mebe12;C02 - Canyon;38.021;13/07/2022;.;Canyon;TM2|\
Mebe12;C02 - Canyon;37.990;14/07/2022;.;Canyon;TM2|\
Mebe12;C03 - Canyon;17.836;26/06/2018;.;Canyon;TM2|\
Yogosun;C03 - Canyon;17.834;17/06/2020;.;Canyon;TM2|\
Yogosun;C03 - Canyon;17.830;17/06/2020;.;Canyon;TM2|\
Yogosun;C03 - Canyon;17.827;18/06/2020;.;Canyon;TM2|\
Yogosun;C03 - Canyon;17.826;25/06/2020;.;Canyon;TM2|\
Mebe12;C03 - Canyon;17.816;26/01/2021;.;Canyon;TM2|\
Mebe12;C03 - Canyon;17.807;27/01/2021;.;Canyon;TM2|\
Yogosun;C03 - Canyon;17.801;27/01/2021;.;Canyon;TM2|\
Mebe12;C03 - Canyon;17.798;29/01/2021;.;Canyon;TM2|\
Yogosun;C03 - Canyon;17.796;16/05/2021;.;Canyon;TM2|\
Mebe12;C03 - Canyon;17.795;18/05/2021;.;Canyon;TM2|\
irtri;C03 - Canyon;17.786;17/05/2022;.;Canyon;TM2|\
Yogosun;C03 - Canyon;17.784;23/05/2022;.;Canyon;TM2|\
Mebe12;C03 - Canyon;17.783;24/05/2022;.;Canyon;TM2|\
riolu;C04 - Canyon;34.554;17/07/2019;.;Canyon;TM2|\
Mebe12;C04 - Canyon;34.546;29/06/2020;.;Canyon;TM2|\
Mebe12;C04 - Canyon;34.528;24/11/2020;.;Canyon;TM2|\
Mebe12;C04 - Canyon;34.473;26/11/2020;.;Canyon;TM2|\
Mebe12;C04 - Canyon;34.453;09/10/2023;.;Canyon;TM2|\
Mebe12;C04 - Canyon;34.418;09/10/2023;.;Canyon;TM2|\
Mebe12;C04 - Canyon;34.368;14/10/2023;.;Canyon;TM2|\
riolu;C05 - Canyon;1:32.971;01/12/2019;.;Canyon;TM2|\
Mebe12;C05 - Canyon;1:32.948;24/06/2020;.;Canyon;TM2|\
riolu;C06 - Canyon;33.491;15/11/2019;.;Canyon;TM2|\
Mebe12;C06 - Canyon;33.454;18/06/2020;.;Canyon;TM2|\
Mebe12;C06 - Canyon;33.383;13/07/2020;.;Canyon;TM2|\
Cloud;C06 - Canyon;33.382;20/04/2022;.;Canyon;TM2|\
Cloud;C06 - Canyon;33.306;20/04/2022;.;Canyon;TM2|\
Mebe12;C06 - Canyon;33.288;26/04/2022;.;Canyon;TM2|\
riolu;C07 - Canyon;28.221;18/07/2019;.;Canyon;TM2|\
Mebe12;C07 - Canyon;28.171;02/07/2020;.;Canyon;TM2|\
Mebe12;C07 - Canyon;28.166;12/01/2021;.;Canyon;TM2|\
Mebe12;C07 - Canyon;28.160;12/01/2021;.;Canyon;TM2|\
Mebe12;C07 - Canyon;28.156;12/01/2021;.;Canyon;TM2|\
Mebe12;C07 - Canyon;28.138;12/05/2021;.;Canyon;TM2|\
Mebe12;C07 - Canyon;28.136;06/04/2024;.;Canyon;TM2|\
Mebe12;C07 - Canyon;28.123;08/04/2024;.;Canyon;TM2|\
riolu;C08 - Canyon;29.177;28/03/2019;.;Canyon;TM2|\
Night;C08 - Canyon;29.162;19/08/2020;.;Canyon;TM2|\
Night;C08 - Canyon;29.158;21/08/2020;.;Canyon;TM2|\
Mebe12;C08 - Canyon;29.154;22/09/2020;.;Canyon;TM2|\
Night;C08 - Canyon;29.153;03/10/2020;.;Canyon;TM2|\
Mebe12;C08 - Canyon;29.141;04/10/2020;.;Canyon;TM2|\
Night;C08 - Canyon;29.132;18/10/2020;.;Canyon;TM2|\
Mebe12;C08 - Canyon;29.128;26/10/2020;.;Canyon;TM2|\
Cloud;C09 - Canyon;35.777;10/02/2020;.;Canyon;TM2|\
Mebe12;C09 - Canyon;35.774;19/09/2020;.;Canyon;TM2|\
Artemis;C09 - Canyon;35.767;21/09/2020;.;Canyon;TM2|\
Mebe12;C09 - Canyon;35.754;22/09/2020;.;Canyon;TM2|\
Cloud;C09 - Canyon;35.752;23/09/2020;.;Canyon;TM2|\
Mebe12;C09 - Canyon;35.720;24/09/2020;.;Canyon;TM2|\
Mebe12;C09 - Canyon;35.715;10/12/2020;.;Canyon;TM2|\
Cloud;C09 - Canyon;35.681;29/07/2022;.;Canyon;TM2|\
Mebe12;C09 - Canyon;35.668;30/07/2022;.;Canyon;TM2|\
Mebe12;C09 - Canyon;35.587;30/07/2022;.;Canyon;TM2|\
riolu;C10 - Canyon;2:01.238;08/08/2020;.;Canyon;TM2|\
Mebe12;C10 - Canyon;2:01.113;25/06/2020;.;Canyon;TM2|\
riolu;C11 - Canyon;40.097;07/05/2020;.;Canyon;TM2|\
Mebe12;C11 - Canyon;40.085;13/08/2020;.;Canyon;TM2|\
Cloud;C11 - Canyon;40.078;17/11/2022;.;Canyon;TM2|\
Mebe12;C11 - Canyon;40.031;17/11/2022;.;Canyon;TM2|\
riolu;C12 - Canyon;38.818;29/12/2012;.;Canyon;TM2|\
erikmania;C12 - Canyon;38.765;01/11/2015;.;Canyon;TM2|\
riolu;C12 - Canyon;38.705;11/11/2015;.;Canyon;TM2|\
hyp;C12 - Canyon;38.555;17/07/2017;.;Canyon;TM2|\
riolu;C12 - Canyon;38.538;07/08/2017;bbonbbon acc;Canyon;TM2|\
Mebe12;C12 - Canyon;38.49x;05/12/2017;.;Canyon;TM2|\
riolu;C12 - Canyon;38.465;??/??/????;.;Canyon;TM2|\
Mebe12;C12 - Canyon;38.388;08/11/2019;.;Canyon;TM2|\
riolu;C12 - Canyon;38.375;17/11/2019;.;Canyon;TM2|\
Cloud;C12 - Canyon;38.373;25/05/2020;.;Canyon;TM2|\
Cloud;C12 - Canyon;38.335;26/05/2020;.;Canyon;TM2|\
riolu;C12 - Canyon;38.314;27/05/2020;.;Canyon;TM2|\
Cloud;C12 - Canyon;38.282;28/05/2020;.;Canyon;TM2|\
Mebe12;C12 - Canyon;38.274;22/07/2020;.;Canyon;TM2|\
Cloud;C12 - Canyon;38.250;05/09/2020;.;Canyon;TM2|\
Mebe12;C12 - Canyon;38.242;05/09/2020;.;Canyon;TM2|\
Quentin43;C12 - Canyon;38.238;07/08/2021;New Trick;Canyon;TM2|\
Mebe12;C12 - Canyon;38.204;10/08/2021;.;Canyon;TM2|\
Cloud;C12 - Canyon;38.202;24/11/2022;.;Canyon;TM2|\
Cloud;C12 - Canyon;38.104;24/11/2022;.;Canyon;TM2|\
Mebe12;C12 - Canyon;38.102;01/12/2022;.;Canyon;TM2|\
Mebe12;C13 - Canyon;20.166;30/07/2019;.;Canyon;TM2|\
Cloud;C13 - Canyon;20.161;26/06/2020;.;Canyon;TM2|\
Dekz;C13 - Canyon;20.122;26/06/2020;.;Canyon;TM2|\
Mebe12;C13 - Canyon;20.101;12/07/2020;.;Canyon;TM2|\
Dekz;C13 - Canyon;20.085;31/12/2020;.;Canyon;TM2|\
Mebe12;C13 - Canyon;20.071;01/01/2021;.;Canyon;TM2|\
Dekz;C13 - Canyon;20.052;10/01/2021;.;Canyon;TM2|\
Mebe12;C13 - Canyon;20.007;21/01/2021;.;Canyon;TM2|\
Dekz;C13 - Canyon;19.997;22/06/2021;Sub 20;Canyon;TM2|\
Mebe12;C13 - Canyon;19.957;30/06/2021;.;Canyon;TM2|\
riolu;C14 - Canyon;34.590;12/12/2019;.;Canyon;TM2|\
Mebe12;C14 - Canyon;34.582;04/08/2020;.;Canyon;TM2|\
Mebe12;C14 - Canyon;34.578;25/02/2022;.;Canyon;TM2|\
Mebe12;C14 - Canyon;34.541;27/02/2022;.;Canyon;TM2|\
Mebe12;C15 - Canyon;3:03.622;08/03/2020;.;Canyon;TM2|\
Cloud;C15 - Canyon;3:03.621;16/02/2021;.;Canyon;TM2|\
Mebe12;C15 - Canyon;3:03.514;17/02/2021;.;Canyon;TM2|\
Mebe12;C15 - Canyon;3:03.233;17/02/2021;.;Canyon;TM2|\
Cloud;C15 - Canyon;3:03.194;21/09/2022;.;Canyon;TM2|\
Cloud;C15 - Canyon;3:02.804;21/09/2022;.;Canyon;TM2|\
Mebe12;C15 - Canyon;3:02.836;21/09/2022;.;Canyon;TM2|\
Yogosun;D01 - Canyon;16.622;05/02/2020;.;Canyon;TM2|\
Yogosun;D01 - Canyon;16.613;23/11/2020;.;Canyon;TM2|\
Yogosun;D01 - Canyon;16.602;29/11/2020;.;Canyon;TM2|\
Yogosun;D01 - Canyon;16.574;21/05/2021;.;Canyon;TM2|\
irtri;D01 - Canyon;16.558;25/03/2022;.;Canyon;TM2|\
Yogosun;D01 - Canyon;16.554;08/07/2024;.;Canyon;TM2|\
Yogosun;D02 - Canyon;44.564;14/02/2020;.;Canyon;TM2|\
Yogosun;D02 - Canyon;43.845;04/09/2020;.;Canyon;TM2|\
riolu;D03 - Canyon;44.716;19/07/2019;.;Canyon;TM2|\
Mebe12;D03 - Canyon;44.681;14/07/2020;.;Canyon;TM2|\
Cloud;D03 - Canyon;44.662;11/11/2020;.;Canyon;TM2|\
Mebe12;D03 - Canyon;44.655;11/11/2020;.;Canyon;TM2|\
Cloud;D03 - Canyon;44.652;12/11/2020;.;Canyon;TM2|\
Mebe12;D03 - Canyon;44.640;12/11/2020;.;Canyon;TM2|\
Mebe12;D03 - Canyon;44.600;13/11/2020;.;Canyon;TM2|\
Cloud;D03 - Canyon;44.585;04/04/2021;.;Canyon;TM2|\
Mebe12;D03 - Canyon;44.571;04/04/2021;.;Canyon;TM2|\
Mebe12;D03 - Canyon;44.553;07/04/2021;.;Canyon;TM2|\
Mebe12;D03 - Canyon;44.487;07/04/2021;.;Canyon;TM2|\
riolu;D04 - Canyon;42.856;15/11/2019;.;Canyon;TM2|\
Mebe12;D04 - Canyon;42.806;16/07/2020;.;Canyon;TM2|\
Yogosun;D04 - Canyon;42.783;05/08/2021;.;Canyon;TM2|\
Yogosun;D04 - Canyon;42.754;07/08/2021;.;Canyon;TM2|\
Mebe12;D04 - Canyon;42.736;09/08/2021;.;Canyon;TM2|\
riolu;D05 - Canyon;3:40.161;31/07/2019;.;Canyon;TM2|\
Mebe12;D05 - Canyon;3:39.658;21/08/2020;.;Canyon;TM2|\
riolu;D06 - Canyon;50.573;04/05/2020;.;Canyon;TM2|\
Mebe12;D06 - Canyon;50.550;07/09/2020;.;Canyon;TM2|\
Cloud;D06 - Canyon;50.538;11/07/2024;.;Canyon;TM2|\
Mebe12;D06 - Canyon;50.500;11/07/2024;.;Canyon;TM2|\
riolu;D07 - Canyon;54.490;07/05/2020;Cheated;Canyon;TM2|\
Cloud;D07 - Canyon;54.398;31/08/2020;.;Canyon;TM2|\
Mebe12;D07 - Canyon;54.396;17/11/2020;.;Canyon;TM2|\
Cloud;D07 - Canyon;54.320;22/02/2021;.;Canyon;TM2|\
Mebe12;D07 - Canyon;54.174;22/02/2021;.;Canyon;TM2|\
Cloud;D07 - Canyon;54.148;22/02/2021;.;Canyon;TM2|\
Mebe12;D07 - Canyon;54.031;22/02/2021;.;Canyon;TM2|\
Mebe12;D07 - Canyon;54.001;24/02/2021;.;Canyon;TM2|\
Cloud;D07 - Canyon;53.890;24/02/2021;.;Canyon;TM2|\
Mebe12;D07 - Canyon;53.745;24/02/2021;.;Canyon;TM2|\
WhiteShadow;D08 - Canyon;26.036;28/03/2020;.;Canyon;TM2|\
Yogosun;D08 - Canyon;25.889;26/10/2021;.;Canyon;TM2|\
riolu;D09 - Canyon;51.368;12/08/2019;Cheated;Canyon;TM2|\
Mebe12;D09 - Canyon;51.318;13/08/2020;.;Canyon;TM2|\
Yogosun;D09 - Canyon;51.312;14/08/2021;.;Canyon;TM2|\
Yogosun;D09 - Canyon;51.258;15/08/2021;.;Canyon;TM2|\
Yogosun;D09 - Canyon;51.245;18/08/2021;.;Canyon;TM2|\
Yogosun;D09 - Canyon;51.242;21/08/2021;.;Canyon;TM2|\
Yogosun;D09 - Canyon;51.218;22/08/2021;.;Canyon;TM2|\
Yogosun;D09 - Canyon;51.192;25/08/2021;.;Canyon;TM2|\
Yogosun;D09 - Canyon;51.172;28/08/2021;.;Canyon;TM2|\
Yogosun;D09 - Canyon;51.168;30/08/2021;.;Canyon;TM2|\
Yogosun;D09 - Canyon;51.162;31/08/2021;.;Canyon;TM2|\
Mebe12;D09 - Canyon;51.138;31/08/2021;.;Canyon;TM2|\
Cloud;D10 - Canyon;3:04.198;24/05/2020;.;Canyon;TM2|\
Mebe12;D10 - Canyon;3:02.811;01/07/2020;.;Canyon;TM2|\
riolu;D11 - Canyon;47.442;19/07/2019;Cheated;Canyon;TM2|\
Mebe12;D11 - Canyon;47.368;27/07/2020;.;Canyon;TM2|\
Cloud;D11 - Canyon;47.282;23/07/2020;.;Canyon;TM2|\
Mebe12;D11 - Canyon;47.254;23/07/2020;.;Canyon;TM2|\
Cloud;D11 - Canyon;47.253;24/07/2020;.;Canyon;TM2|\
Mebe12;D11 - Canyon;47.225;24/07/2020;.;Canyon;TM2|\
Mebe12;D11 - Canyon;47.173;24/07/2020;.;Canyon;TM2|\
Cloud;D11 - Canyon;47.132;24/07/2020;.;Canyon;TM2|\
Mebe12;D11 - Canyon;47.047;27/07/2020;.;Canyon;TM2|\
Cloud;D11 - Canyon;47.034;17/08/2020;.;Canyon;TM2|\
Mebe12;D11 - Canyon;46.968;18/08/2020;Sub 47;Canyon;TM2|\
riolu;D12 - Canyon;1:00.886;??/??/????;< 13/01/2013;Canyon;TM2|\
erikmania;D12 - Canyon;1:00.885;22/09/2015;.;Canyon;TM2|\
riolu;D12 - Canyon;1:00.745;23/09/2015;.;Canyon;TM2|\
riolu;D12 - Canyon;1:00.715;09/10/2015;.;Canyon;TM2|\
Nath;D12 - Canyon;1:00.615;16/04/2018;No Holes;Canyon;TM2|\
riolu;D12 - Canyon;1:00.487;??/??/????;.;Canyon;TM2|\
Ondra;D12 - Canyon;1:00.285;11/11/2019;.;Canyon;TM2|\
Mebe12;D12 - Canyon;1:00.220;15/11/2019;.;Canyon;TM2|\
riolu;D12 - Canyon;59.942;17/11/2019;Cheated;Canyon;TM2|\
Mebe12;D12 - Canyon;59.936;14/09/2020;DUCK;Canyon;TM2|\
Ondra;D12 - Canyon;59.903;04/07/2024;.;Canyon;TM2|\
Mebe12;D12 - Canyon;59.901;09/07/2024;.;Canyon;TM2|\
Mebe12;D12 - Canyon;59.880;09/07/2024;.;Canyon;TM2|\
Mebe12;D12 - Canyon;59.858;09/07/2024;.;Canyon;TM2|\
Mebe12;D12 - Canyon;59.753;21/07/2024;.;Canyon;TM2|\
Yogosun;D13 - Canyon;16.546;21/02/2020;.;Canyon;TM2|\
Artemis;D13 - Canyon;16.418;10/06/2021;.;Canyon;TM2|\
Mebe12;D13 - Canyon;16.275;02/07/2021;.;Canyon;TM2|\
riolu;D14 - Canyon;44.072;03/05/2020;.;Canyon;TM2|\
Mebe12;D14 - Canyon;44.027;30/08/2020;.;Canyon;TM2|\
Cloud;D14 - Canyon;44.010;22/12/2020;.;Canyon;TM2|\
Mebe12;D14 - Canyon;43.992;22/12/2020;Sub 44;Canyon;TM2|\
Cloud;D14 - Canyon;43.963;22/12/2020;.;Canyon;TM2|\
Mebe12;D14 - Canyon;43.953;23/12/2020;.;Canyon;TM2|\
Yogosun;D14 - Canyon;43.925;25/12/2020;.;Canyon;TM2|\
Mebe12;D14 - Canyon;43.923;14/01/2021;.;Canyon;TM2|\
Cloud;D14 - Canyon;43.890;09/08/2022;.;Canyon;TM2|\
Mebe12;D14 - Canyon;43.847;12/08/2022;.;Canyon;TM2|\
Cloud;D14 - Canyon;43.748;13/08/2022;.;Canyon;TM2|\
Mebe12;D14 - Canyon;43.725;13/08/2022;.;Canyon;TM2|\
Mebe12;D14 - Canyon;43.693;13/08/2022;.;Canyon;TM2|\
Mebe12;D14 - Canyon;43.680;13/08/2022;.;Canyon;TM2|\
Mebe12;D14 - Canyon;43.668;13/08/2022;.;Canyon;TM2|\
Mebe12;D14 - Canyon;43.663;13/08/2022;.;Canyon;TM2|\
Mebe12;D14 - Canyon;43.625;13/08/2022;.;Canyon;TM2|\
Mebe12;D14 - Canyon;43.585;13/08/2022;.;Canyon;TM2|\
Cloud;D15 - Canyon;6:48.131;09/03/2020;.;Canyon;TM2|\
Cloud;D15 - Canyon;6:46.504;09/10/2020;.;Canyon;TM2|\
Mebe12;D15 - Canyon;6:45.355;16/11/2020;.;Canyon;TM2|\
Cloud;D15 - Canyon;6:45.018;10/05/2022;.;Canyon;TM2|\
Cloud;D15 - Canyon;6:44.374;11/05/2022;.;Canyon;TM2|\
Mebe12;D15 - Canyon;6:44.056;13/05/2022;.;Canyon;TM2|\
Yogosun;E01 - Canyon;45.938;24/05/2020;.;Canyon;TM2|\
Mebe12;E01 - Canyon;45.927;19/10/2020;.;Canyon;TM2|\
Mebe12;E01 - Canyon;45.916;19/10/2020;.;Canyon;TM2|\
Mebe12;E01 - Canyon;45.903;19/10/2020;.;Canyon;TM2|\
Mebe12;E01 - Canyon;45.815;19/10/2020;.;Canyon;TM2|\
Mebe12;E01 - Canyon;45.810;19/10/2020;.;Canyon;TM2|\
Mebe12;E01 - Canyon;45.717;19/10/2020;.;Canyon;TM2|\
riolu;E02 - Canyon;1:09.290;13/08/2019;.;Canyon;TM2|\
Mebe12;E02 - Canyon;1:09.221;31/08/2020;.;Canyon;TM2|\
Cloud;E02 - Canyon;1:09.115;06/10/2020;.;Canyon;TM2|\
Mebe12;E02 - Canyon;1:08.988;07/10/2020;.;Canyon;TM2|\
riolu;E03 - Canyon;1:41.060;09/08/2019;.;Canyon;TM2|\
Mebe12;E03 - Canyon;1:40.745;16/09/2020;.;Canyon;TM2|\
Yogosun;E03 - Canyon;1:40.605;19/09/2020;TikTok;Canyon;TM2|\
Mebe12;E03 - Canyon;1:39.988;30/08/2021;.;Canyon;TM2|\
riolu;E04 - Canyon;1:38.411;03/08/2019;.;Canyon;TM2|\
Cloud;E04 - Canyon;1:38.385;05/09/2020;.;Canyon;TM2|\
Mebe12;E04 - Canyon;1:37.603;04/11/2020;.;Canyon;TM2|\
Cloud;E04 - Canyon;1:37.568;21/02/2021;.;Canyon;TM2|\
Mebe12;E04 - Canyon;1:37.526;27/02/2021;.;Canyon;TM2|\
Cloud;E04 - Canyon;1:37.276;25/03/2021;.;Canyon;TM2|\
Mebe12;E04 - Canyon;1:36.917;31/03/2021;.;Canyon;TM2|\
riolu;E05 - Canyon;12:53.915;30/07/2019;.;Canyon;TM2|\
Mebe12;E05 - Canyon;12:53.717;14/09/2020;.;Canyon;TM2|\
Guillaume;A01 - Stadium;22.78x;??/03/2013;.;Stadium;TM2|\
RACETA;A01 - Stadium;22.77x;??/03/2013;.;Stadium;TM2|\
Kripke;A01 - Stadium;22.717;??/03/2013;.;Stadium;TM2|\
riolu;A01 - Stadium;22.621;25/06/2013;.;Stadium;TM2|\
Kripke;A01 - Stadium;22.590;16/08/2013;.;Stadium;TM2|\
riolu;A01 - Stadium;22.597;??/??/2017;.;Stadium;TM2|\
Kripke;A01 - Stadium;22.588;14/08/2017;.;Stadium;TM2|\
Kripke;A01 - Stadium;22.581;19/11/2017;.;Stadium;TM2|\
riolu;A01 - Stadium;22.578;22/04/2019;Cheated;Stadium;TM2|\
riolu;A01 - Stadium;22.561;22/04/2019;Cheated;Stadium;TM2|\
Bluts;A01 - Stadium;22.576;24/02/2020;.;Stadium;TM2|\
Bluts;A01 - Stadium;22.575;05/03/2021;.;Stadium;TM2|\
Bluts;A01 - Stadium;22.571;11/03/2021;.;Stadium;TM2|\
Bluts;A01 - Stadium;22.567;19/01/2022;.;Stadium;TM2|\
Loupphok;A01 - Stadium;22.564;25/05/2023;.;Stadium;TM2|\
Loupphok;A01 - Stadium;22.562;18/06/2023;.;Stadium;TM2|\
Loupphok;A01 - Stadium;22.554;03/07/2023;DUCK;Stadium;TM2|\
riolu;A02 - Stadium;22.667;23/03/2013;.;Stadium;TM2|\
riolu;A02 - Stadium;22.593;22/06/2013;.;Stadium;TM2|\
Blizz;A02 - Stadium;22.577;25/06/2013;.;Stadium;TM2|\
racehans;A02 - Stadium;22.572;10/08/2013;.;Stadium;TM2|\
riolu;A02 - Stadium;22.565;14/08/2013;.;Stadium;TM2|\
Demon;A02 - Stadium;22.553;09/01/2014;.;Stadium;TM2|\
riolu;A02 - Stadium;22.545;29/08/2015;.;Stadium;TM2|\
RotakeR;A02 - Stadium;22.525;09/05/2017;.;Stadium;TM2|\
RotakeR;A02 - Stadium;22.498;16/05/2017;.;Stadium;TM2|\
Kripke;A02 - Stadium;22.497;??/??/2017;vA;Stadium;TM2|\
Kripke;A02 - Stadium;22.487;21/11/2017;.;Stadium;TM2|\
RotakeR;A02 - Stadium;22.477;11/11/2018;.;Stadium;TM2|\
RotakeR;A02 - Stadium;22.460;12/11/2018;.;Stadium;TM2|\
MiThyX;A02 - Stadium;22.457;28/10/2020;.;Stadium;TM2|\
Flechetas;A02 - Stadium;22.455;04/11/2020;.;Stadium;TM2|\
ZedroX;A02 - Stadium;22.453;29/03/2021;.;Stadium;TM2|\
ZedroX;A02 - Stadium;22.452;30/06/2021;.;Stadium;TM2|\
ZedroX;A02 - Stadium;22.450;30/06/2021;.;Stadium;TM2|\
ZedroX;A02 - Stadium;22.447;30/06/2021;.;Stadium;TM2|\
ZedroX;A02 - Stadium;22.443;27/07/2021;.;Stadium;TM2|\
ZedroX;A02 - Stadium;22.435;07/08/2021;.;Stadium;TM2|\
Boerta;A03 - Stadium;10.713;02/07/2013;.;Stadium;TM2|\
Netsky;A03 - Stadium;10.698;05/09/2013;.;Stadium;TM2|\
Doc_Me4ik;A03 - Stadium;10.693;02/09/2015;.;Stadium;TM2|\
Doc_Me4ik;A03 - Stadium;10.648;23/06/2016;New trick;Stadium;TM2|\
Doc_Me4ik;A03 - Stadium;10.698;??/05/2017;.;Stadium;TM2|\
Trinity;A03 - Stadium;10.690;02/05/2018;.;Stadium;TM2|\
Pieton;A03 - Stadium;10.688;23/09/2018;.;Stadium;TM2|\
Camion;A03 - Stadium;10.687;05/01/2019;.;Stadium;TM2|\
Camion;A03 - Stadium;10.681;20/04/2019;.;Stadium;TM2|\
Pieton;A03 - Stadium;10.676;29/05/2019;.;Stadium;TM2|\
riolu;A03 - Stadium;10.671;14/06/2019;Cheated;Stadium;TM2|\
riolu;A03 - Stadium;10.668;28/06/2019;Cheated;Stadium;TM2|\
Camion;A03 - Stadium;10.658;01/07/2019;.;Stadium;TM2|\
riolu;A03 - Stadium;10.651;02/07/2019;Cheated;Stadium;TM2|\
Camion;A03 - Stadium;10.646;31/07/2019;.;Stadium;TM2|\
riolu;A03 - Stadium;10.643;??/??/2019;Cheated;Stadium;TM2|\
Camion;A03 - Stadium;10.642;31/10/2019;.;Stadium;TM2|\
riolu;A03 - Stadium;10.635;23/11/2020;Cheated;Stadium;TM2|\
Camion;A03 - Stadium;10.631;23/06/2021;DUCK;Stadium;TM2|\
Camion;A03 - Stadium;10.621;10/02/2022;.;Stadium;TM2|\
KarjeN;A04 - Stadium;23.29x;??/03/2013;.;Stadium;TM2|\
CarlJr;A04 - Stadium;23.174;27/06/2013;.;Stadium;TM2|\
Karhu;A04 - Stadium;23.171;17/07/2014;.;Stadium;TM2|\
the.Park;A04 - Stadium;23.133;21/05/2016;.;Stadium;TM2|\
RotakeR;A04 - Stadium;23.134;20/05/2017;.;Stadium;TM2|\
RACETA;A04 - Stadium;23.106;??/01/2018;.;Stadium;TM2|\
DanikB;A04 - Stadium;23.100;19/04/2019;.;Stadium;TM2|\
RACETA;A04 - Stadium;23.098;25/04/2019;.;Stadium;TM2|\
DanikB;A04 - Stadium;23.088;12/06/2019;.;Stadium;TM2|\
ZedroX;A04 - Stadium;23.076;19/06/2022;.;Stadium;TM2|\
MiThyX;A04 - Stadium;23.075;13/09/2022;.;Stadium;TM2|\
MiThyX;A04 - Stadium;23.072;27/09/2022;.;Stadium;TM2|\
MiThyX;A04 - Stadium;23.063;03/10/2022;.;Stadium;TM2|\
MiThyX;A04 - Stadium;23.061;19/11/2022;.;Stadium;TM2|\
riolu;A05 - Stadium;51.935;15/07/2013;.;Stadium;TM2|\
racehans;A05 - Stadium;51.904;29/07/2013;.;Stadium;TM2|\
riolu;A05 - Stadium;51.861;08/09/2013;.;Stadium;TM2|\
racehans;A05 - Stadium;51.722;17/05/2017;.;Stadium;TM2|\
riolu;A05 - Stadium;51.640;??/04/2018;.;Stadium;TM2|\
Rollin;A05 - Stadium;51.631;20/08/2018;.;Stadium;TM2|\
riolu;A05 - Stadium;51.618;28/08/2018;.;Stadium;TM2|\
Aziix;A05 - Stadium;51.607;01/03/2019;DUCK;Stadium;TM2|\
RotakeR;A05 - Stadium;51.580;12/03/2019;.;Stadium;TM2|\
RotakeR;A05 - Stadium;51.563;13/03/2019;.;Stadium;TM2|\
RotakeR;A05 - Stadium;51.545;13/03/2019;.;Stadium;TM2|\
RotakeR;A05 - Stadium;51.541;14/03/2019;.;Stadium;TM2|\
Aziix;A05 - Stadium;51.525;08/11/2019;.;Stadium;TM2|\
RotakeR;A05 - Stadium;51.488;28/01/2020;.;Stadium;TM2|\
Loupphok;A05 - Stadium;51.478;12/05/2024;.;Stadium;TM2|\
riolu;A06 - Stadium;27.378;11/03/2013;.;Stadium;TM2|\
CarlJr;A06 - Stadium;27.348;24/06/2013;.;Stadium;TM2|\
CarlJr;A06 - Stadium;27.290;27/06/2013;.;Stadium;TM2|\
7Alvin;A06 - Stadium;27.277;03/09/2013;.;Stadium;TM2|\
RACETA;A06 - Stadium;27.271;29/09/2013;.;Stadium;TM2|\
RACETA;A06 - Stadium;27.231;08/10/2013;.;Stadium;TM2|\
Symbiose;A06 - Stadium;27.234;14/05/2017;.;Stadium;TM2|\
RACETA;A06 - Stadium;27.218;??/11/2017;.;Stadium;TM2|\
Scrapie;A06 - Stadium;27.215;15/04/2018;.;Stadium;TM2|\
RACETA;A06 - Stadium;27.187;20/04/2018;.;Stadium;TM2|\
Kripke;A06 - Stadium;27.170;09/11/2018;.;Stadium;TM2|\
RACETA;A06 - Stadium;27.165;06/12/2018;.;Stadium;TM2|\
Kripke;A06 - Stadium;27.158;05/05/2019;.;Stadium;TM2|\
RACETA;A06 - Stadium;27.153;10/05/2019;.;Stadium;TM2|\
eprotizuu;A06 - Stadium;27.137;03/09/2019;.;Stadium;TM2|\
MiThyX;A06 - Stadium;27.136;09/08/2021;.;Stadium;TM2|\
RACETA;A06 - Stadium;27.118;28/08/2021;.;Stadium;TM2|\
MiThyX;A06 - Stadium;27.113;27/09/2021;.;Stadium;TM2|\
MiThyX;A06 - Stadium;27.100;27/09/2021;.;Stadium;TM2|\
riolu;A07 - Stadium;22.948;10/03/2013;.;Stadium;TM2|\
JaV;A07 - Stadium;22.936;10/07/2013;.;Stadium;TM2|\
J & B;A07 - Stadium;22.888;12/07/2013;.;Stadium;TM2|\
RACETA;A07 - Stadium;22.858;22/07/2013;.;Stadium;TM2|\
racehans;A07 - Stadium;22.798;29/07/2013;.;Stadium;TM2|\
riolu;A07 - Stadium;22.758;03/02/2014;.;Stadium;TM2|\
racehans;A07 - Stadium;22.786;??/05/2017;.;Stadium;TM2|\
LAMArtifice;A07 - Stadium;22.745;20/01/2018;.;Stadium;TM2|\
RACETA;A07 - Stadium;22.717;20/04/2018;.;Stadium;TM2|\
LAMArtifice;A07 - Stadium;22.714;03/05/2018;.;Stadium;TM2|\
RACETA;A07 - Stadium;22.680;04/05/2018;.;Stadium;TM2|\
LAMArtifice;A07 - Stadium;22.674;15/05/2018;.;Stadium;TM2|\
RACETA;A07 - Stadium;22.670;26/05/2018;.;Stadium;TM2|\
RACETA;A07 - Stadium;22.648;07/06/2018;.;Stadium;TM2|\
LAMArtifice;A07 - Stadium;22.646;29/09/2018;.;Stadium;TM2|\
RACETA;A07 - Stadium;22.633;30/09/2018;.;Stadium;TM2|\
LAMArtifice;A07 - Stadium;22.591;27/04/2019;.;Stadium;TM2|\
Loupphok;A07 - Stadium;22.586;09/08/2022;.;Stadium;TM2|\
mt17;A08 - Stadium;14.717;16/07/2013;.;Stadium;TM2|\
racehans;A08 - Stadium;14.704;??/??/????;.;Stadium;TM2|\
Ancaqar;A08 - Stadium;14.685;30/10/2014;.;Stadium;TM2|\
Ancaqar;A08 - Stadium;14.676;12/01/2017;.;Stadium;TM2|\
RotakeR;A08 - Stadium;14.626;23/05/2017;.;Stadium;TM2|\
Danio;A08 - Stadium;14.606;08/06/2017;.;Stadium;TM2|\
Labaffue;A08 - Stadium;14.595;30/06/2017;.;Stadium;TM2|\
Kripke;A08 - Stadium;14.584;06/04/2018;.;Stadium;TM2|\
Loupphok;A08 - Stadium;14.552;11/12/2018;New Trick;Stadium;TM2|\
Pieton;A08 - Stadium;14.526;19/10/2019;.;Stadium;TM2|\
RACETA;A08 - Stadium;14.521;06/05/2020;.;Stadium;TM2|\
Phip;A08 - Stadium;14.515;09/09/2022;.;Stadium;TM2|\
Loupphok;A08 - Stadium;14.508;13/09/2022;.;Stadium;TM2|\
Phip;A08 - Stadium;14.491;15/09/2022;.;Stadium;TM2|\
CarlJr;A09 - Stadium;24.740;25/07/2013;.;Stadium;TM2|\
riolu;A09 - Stadium;24.692;27/12/2014;.;Stadium;TM2|\
Shock77;A09 - Stadium;24.681;24/09/2015;.;Stadium;TM2|\
riolu;A09 - Stadium;24.658;03/10/2015;.;Stadium;TM2|\
RACETA;A09 - Stadium;24.63x;??/07/2017;.;Stadium;TM2|\
CarlJr;A09 - Stadium;24.631;14/07/2017;.;Stadium;TM2|\
racehans;A09 - Stadium;24.618;18/07/2017;.;Stadium;TM2|\
Pinda;A09 - Stadium;24.614;24/01/2018;.;Stadium;TM2|\
RACETA;A09 - Stadium;24.611;??/??/2018;> 04/18;Stadium;TM2|\
Vulnerra;A09 - Stadium;24.598;19/07/2018;.;Stadium;TM2|\
RACETA;A09 - Stadium;24.590;20/07/2018;.;Stadium;TM2|\
Vulnerra;A09 - Stadium;24.562;22/07/2018;.;Stadium;TM2|\
RACETA;A09 - Stadium;24.552;27/07/2018;.;Stadium;TM2|\
Vulnerra;A09 - Stadium;24.542;12/11/2018;.;Stadium;TM2|\
RACETA;A09 - Stadium;24.514;14/12/2018;.;Stadium;TM2|\
RotakeR;A09 - Stadium;24.511;04/07/2019;.;Stadium;TM2|\
riolu;A09 - Stadium;24.503;11/01/2020;Cheated;Stadium;TM2|\
Loupphok;A09 - Stadium;24.502;10/10/2021;DUCK;Stadium;TM2|\
Sapi;A09 - Stadium;24.484;16/05/2024;.;Stadium;TM2|\
Wally;A10 - Stadium;1:06.188;23/06/2013;.;Stadium;TM2|\
Demon;A10 - Stadium;1:05.918;15/07/2013;Sub 1:06;Stadium;TM2|\
Blizz;A10 - Stadium;1:05.866;20/07/2013;.;Stadium;TM2|\
Tween;A10 - Stadium;1:05.744;29/07/2013;.;Stadium;TM2|\
KarjeN;A10 - Stadium;1:05.344;24/09/2013;.;Stadium;TM2|\
CarlJr;A10 - Stadium;1:05.465;05/06/2017;Spreadsheet;Stadium;TM2|\
RACETA;A10 - Stadium;1:05.381;??/??/2018;> 04/18;Stadium;TM2|\
DanikB;A10 - Stadium;1:05.301;16/12/2018;.;Stadium;TM2|\
RACETA;A10 - Stadium;1:05.276;22/12/2018;.;Stadium;TM2|\
DanikB;A10 - Stadium;1:05.236;18/04/2019;.;Stadium;TM2|\
frvr;A10 - Stadium;1:05.136;14/01/2020;.;Stadium;TM2|\
RACETA;A10 - Stadium;1:05.111;27/08/2022;.;Stadium;TM2|\
n0body;A10 - Stadium;1:05.063;01/05/2023;.;Stadium;TM2|\
Loupphok;A10 - Stadium;1:05.061;20/05/2024;.;Stadium;TM2|\
Loupphok;A10 - Stadium;1:05.058;24/05/2024;.;Stadium;TM2|\
Loupphok;A10 - Stadium;1:05.038;24/05/2024;.;Stadium;TM2|\
Loupphok;A10 - Stadium;1:05.031;08/06/2024;.;Stadium;TM2|\
Loupphok;A10 - Stadium;1:04.961;08/06/2024;Sub 1:05;Stadium;TM2|\
CarlJr;A11 - Stadium;26.768;30/06/2013;.;Stadium;TM2|\
riolu;A11 - Stadium;26.638;01/07/2013;Cheated;Stadium;TM2|\
Rollin;A11 - Stadium;26.635;17/07/2017;.;Stadium;TM2|\
riolu;A11 - Stadium;26.608;08/08/2017;.;Stadium;TM2|\
racehans;A11 - Stadium;26.554;29/11/2017;.;Stadium;TM2|\
riolu;A11 - Stadium;26.528;14/04/2018;Cheated;Stadium;TM2|\
Fire!;A11 - Stadium;26.523;25/04/2018;.;Stadium;TM2|\
RACETA;A11 - Stadium;26.488;09/06/2018;.;Stadium;TM2|\
RotakeR;A11 - Stadium;26.442;26/08/2018;.;Stadium;TM2|\
eprotizuu;A11 - Stadium;26.432;08/09/2018;.;Stadium;TM2|\
riolu;A11 - Stadium;26.361;??/??/????;Cheated;Stadium;TM2|\
riolu;A11 - Stadium;26.355;27/05/2019;Cheated;Stadium;TM2|\
eprotizuu;A11 - Stadium;26.325;??/??/2019;.;Stadium;TM2|\
riolu;A11 - Stadium;26.321;23/11/2019;Cheated;Stadium;TM2|\
eprotizuu;A11 - Stadium;26.318;30/03/2020;.;Stadium;TM2|\
eprotizuu;A11 - Stadium;26.301;31/03/2020;.;Stadium;TM2|\
riolu;A11 - Stadium;26.298;07/03/2020;Cheated;Stadium;TM2|\
eprotizuu;A11 - Stadium;26.288;17/05/2020;.;Stadium;TM2|\
riolu;A11 - Stadium;26.266;19/06/2020;Cheated;Stadium;TM2|\
instable;A11 - Stadium;26.274;05/12/2021;.;Stadium;TM2|\
instable;A11 - Stadium;26.241;19/07/2023;DUCK;Stadium;TM2|\
instable;A11 - Stadium;26.237;21/04/2024;.;Stadium;TM2|\
instable;A11 - Stadium;26.228;24/04/2024;.;Stadium;TM2|\
instable;A11 - Stadium;26.211;26/04/2024;.;Stadium;TM2|\
riolu;A12 - Stadium;22.344;05/03/2013;.;Stadium;TM2|\
Luffy;A12 - Stadium;22.23x;??/06/2013;.;Stadium;TM2|\
CarlJr;A12 - Stadium;22.201;29/06/2013;.;Stadium;TM2|\
riolu;A12 - Stadium;22.178;20/08/2013;Cheated;Stadium;TM2|\
Kaio;A12 - Stadium;22.181;19/05/2017;.;Stadium;TM2|\
racehans;A12 - Stadium;22.143;19/06/2017;.;Stadium;TM2|\
Kripke;A12 - Stadium;22.131;25/08/2018;.;Stadium;TM2|\
Affi;A12 - Stadium;22.115;28/01/2019;.;Stadium;TM2|\
eprotizuu;A12 - Stadium;22.104;07/09/2019;.;Stadium;TM2|\
riolu;A12 - Stadium;22.103;25/12/2019;Cheated;Stadium;TM2|\
MiThyX;A12 - Stadium;22.096;12/11/2021;DUCK;Stadium;TM2|\
Loupphok;A12 - Stadium;22.094;02/06/2024;.;Stadium;TM2|\
riolu;A13 - Stadium;25.626;19/07/2013;.;Stadium;TM2|\
racehans;A13 - Stadium;25.608;20/08/2013;.;Stadium;TM2|\
riolu;A13 - Stadium;25.544;22/08/2013;.;Stadium;TM2|\
Kripke;A13 - Stadium;25.568;06/05/2017;.;Stadium;TM2|\
Hefest;A13 - Stadium;25.545;13/01/2018;.;Stadium;TM2|\
Hefest;A13 - Stadium;25.537;05/11/2018;.;Stadium;TM2|\
riolu;A13 - Stadium;25.523;08/11/2018;.;Stadium;TM2|\
Flechetas;A13 - Stadium;25.514;02/05/2019;.;Stadium;TM2|\
Flechetas;A13 - Stadium;25.496;02/10/2019;.;Stadium;TM2|\
Flechetas;A13 - Stadium;25.490;08/10/2019;.;Stadium;TM2|\
Flechetas;A13 - Stadium;25.474;09/10/2019;.;Stadium;TM2|\
Flechetas;A13 - Stadium;25.473;10/10/2019;.;Stadium;TM2|\
Flechetas;A13 - Stadium;25.468;12/10/2019;.;Stadium;TM2|\
riolu;A13 - Stadium;25.455;22/11/2019;Cheated;Stadium;TM2|\
Flechetas;A13 - Stadium;25.452;19/05/2021;DUCK;Stadium;TM2|\
ZedroX;A13 - Stadium;25.448;18/12/2021;.;Stadium;TM2|\
ZedroX;A13 - Stadium;25.444;18/12/2021;.;Stadium;TM2|\
Flechetas;A13 - Stadium;25.443;07/04/2024;.;Stadium;TM2|\
Flechetas;A13 - Stadium;25.426;26/04/2024;.;Stadium;TM2|\
riolu;A14 - Stadium;20.282;21/03/2013;.;Stadium;TM2|\
KarjeN;A14 - Stadium;20.163;23/03/2013;.;Stadium;TM2|\
LeoTM2;A14 - Stadium;20.127;25/06/2013;.;Stadium;TM2|\
Blizz;A14 - Stadium;20.126;25/06/2013;.;Stadium;TM2|\
CarlJr;A14 - Stadium;20.108;16/07/2013;.;Stadium;TM2|\
J & B;A14 - Stadium;20.078;17/07/2013;.;Stadium;TM2|\
riolu;A14 - Stadium;20.074;30/07/2013;.;Stadium;TM2|\
Flyer;A14 - Stadium;20.056;31/07/2013;.;Stadium;TM2|\
Demon;A14 - Stadium;20.040;26/12/2013;.;Stadium;TM2|\
riolu;A14 - Stadium;20.008;12/01/2016;.;Stadium;TM2|\
RotakeR;A14 - Stadium;19.973;11/06/2017;Sub 20;Stadium;TM2|\
RACETA;A14 - Stadium;19.964;??/??/2018;> 04/18;Stadium;TM2|\
Trinity;A14 - Stadium;19.952;18/07/2018;.;Stadium;TM2|\
RACETA;A14 - Stadium;19.951;27/07/2018;.;Stadium;TM2|\
eprotizuu;A14 - Stadium;19.940;13/07/2019;.;Stadium;TM2|\
Arcanos;A14 - Stadium;19.913;25/09/2019;.;Stadium;TM2|\
riolu;A14 - Stadium;19.905;15/01/2020;Cheated;Stadium;TM2|\
ZedroX;A14 - Stadium;19.910;18/05/2022;.;Stadium;TM2|\
ZedroX;A14 - Stadium;19.898;26/05/2022;DUCK;Stadium;TM2|\
ZedroX;A14 - Stadium;19.894;26/05/2022;.;Stadium;TM2|\
ZedroX;A14 - Stadium;19.884;26/05/2022;.;Stadium;TM2|\
RKO 90;A15 - Stadium;1:12.798;28/06/2013;.;Stadium;TM2|\
Demon;A15 - Stadium;1:12.617;16/07/2013;.;Stadium;TM2|\
RACETA;A15 - Stadium;1:12.587;07/07/2015;.;Stadium;TM2|\
riolu;A15 - Stadium;1:12.554;30/08/2016;.;Stadium;TM2|\
Pac;A15 - Stadium;1:12.457;31/08/2016;.;Stadium;TM2|\
Pac;A15 - Stadium;1:12.496;10/06/2017;.;Stadium;TM2|\
CarlJr;A15 - Stadium;1:12.422;15/07/2017;.;Stadium;TM2|\
RACETA;A15 - Stadium;1:12.398;28/12/2017;.;Stadium;TM2|\
Rollin;A15 - Stadium;1:12.305;21/08/2018;.;Stadium;TM2|\
Demon;A15 - Stadium;1:12.241;??/??/????;.;Stadium;TM2|\
Rollin;A15 - Stadium;1:12.190;??/??/????;.;Stadium;TM2|\
riolu;A15 - Stadium;1:12.173;03/05/2019;.;Stadium;TM2|\
Rollin;A15 - Stadium;1:12.154;04/07/2019;.;Stadium;TM2|\
riolu;A15 - Stadium;1:12.090;06/07/2019;.;Stadium;TM2|\
Rollin;A15 - Stadium;1:12.085;08/07/2019;DUCK;Stadium;TM2|\
Loupphok;A15 - Stadium;1:12.068;03/12/2022;.;Stadium;TM2|\
Wally;B01 - Stadium;34.890;24/06/2013;.;Stadium;TM2|\
racehans;B01 - Stadium;34.854;12/08/2013;.;Stadium;TM2|\
RACETA;B01 - Stadium;34.620;??/??/????;<03/15;Stadium;TM2|\
KevinStrike;B01 - Stadium;34.608;21/07/2015;.;Stadium;TM2|\
Ancaqar;B01 - Stadium;34.561;26/11/2015;.;Stadium;TM2|\
RACETA;B01 - Stadium;34.538;07/10/2016;.;Stadium;TM2|\
CarlJr;B01 - Stadium;34.868;??/05/2017;.;Stadium;TM2|\
Vulnerra;B01 - Stadium;34.857;10/05/2017;.;Stadium;TM2|\
KevinStrike;B01 - Stadium;34.626;20/05/2017;.;Stadium;TM2|\
Ancaqar;B01 - Stadium;34.617;15/06/2017;.;Stadium;TM2|\
__;B01 - Stadium;34.557;??/06/2017;Spreadsheet;Stadium;TM2|\
racehans;B01 - Stadium;34.400;19/07/2017;vA;Stadium;TM2|\
__;B01 - Stadium;34.334;??/08/2017;Panda/Raceta;Stadium;TM2|\
Pinda;B01 - Stadium;34.258;??/??/2018;> 04/18;Stadium;TM2|\
RACETA;B01 - Stadium;34.171;01/06/2018;.;Stadium;TM2|\
Pinda;B01 - Stadium;34.166;19/02/2019;.;Stadium;TM2|\
Affi;B01 - Stadium;34.161;28/03/2020;.;Stadium;TM2|\
Pinda;B01 - Stadium;34.150;28/03/2020;.;Stadium;TM2|\
Affi;B01 - Stadium;34.075;28/04/2020;.;Stadium;TM2|\
Pinda;B01 - Stadium;34.027;29/04/2020;.;Stadium;TM2|\
RACETA;B01 - Stadium;34.005;29/09/2022;.;Stadium;TM2|\
CarlJr;B02 - Stadium;25.807;28/06/2013;.;Stadium;TM2|\
racehans;B02 - Stadium;25.773;28/07/2013;.;Stadium;TM2|\
Kripke;B02 - Stadium;25.691;07/08/2013;.;Stadium;TM2|\
RACETA;B02 - Stadium;25.648;??/??/????;<03/15;Stadium;TM2|\
riolu;B02 - Stadium;25.643;29/01/2016;.;Stadium;TM2|\
Schimmy;B02 - Stadium;25.696;04/06/2017;.;Stadium;TM2|\
racehans;B02 - Stadium;25.633;25/07/2017;.;Stadium;TM2|\
riolu;B02 - Stadium;25.611;13/01/2018;.;Stadium;TM2|\
RACETA;B02 - Stadium;25.610;16/06/2018;.;Stadium;TM2|\
Kripke;B02 - Stadium;25.600;21/08/2018;.;Stadium;TM2|\
RACETA;B02 - Stadium;25.593;18/05/2019;.;Stadium;TM2|\
riolu;B02 - Stadium;25.561;23/05/2019;Cheated;Stadium;TM2|\
Loupphok;B02 - Stadium;25.573;31/05/2021;.;Stadium;TM2|\
RACETA;B02 - Stadium;25.553;22/03/2023;.;Stadium;TM2|\
mt17;B03 - Stadium;21.296;30/06/2013;.;Stadium;TM2|\
RACETA;B03 - Stadium;21.286;28/09/2013;.;Stadium;TM2|\
Demon;B03 - Stadium;21.278;28/09/2013;.;Stadium;TM2|\
Kazuma;B03 - Stadium;21.272;??/??/????;.;Stadium;TM2|\
RACETA;B03 - Stadium;21.208;16/02/2014;.;Stadium;TM2|\
racehans;B03 - Stadium;21.180;12/05/2017;.;Stadium;TM2|\
Kazuma;B03 - Stadium;21.172;21/05/2017;.;Stadium;TM2|\
RACETA;B03 - Stadium;21.166;??/12/2017;.;Stadium;TM2|\
Flechetas;B03 - Stadium;21.151;03/04/2018;.;Stadium;TM2|\
RACETA;B03 - Stadium;21.121;20/04/2018;.;Stadium;TM2|\
Flechetas;B03 - Stadium;21.081;19/05/2018;New trick;Stadium;TM2|\
RACETA;B03 - Stadium;21.068;24/05/2018;.;Stadium;TM2|\
Flechetas;B03 - Stadium;21.061;12/09/2018;.;Stadium;TM2|\
YodarK;B03 - Stadium;21.054;02/12/2018;.;Stadium;TM2|\
Flechetas;B03 - Stadium;21.038;05/05/2019;.;Stadium;TM2|\
Loupphok;B03 - Stadium;21.018;16/02/2019;New trick;Stadium;TM2|\
Flechetas;B03 - Stadium;21.015;05/05/2020;.;Stadium;TM2|\
Flechetas;B03 - Stadium;21.011;10/02/2022;.;Stadium;TM2|\
YodarK;B03 - Stadium;21.008;03/03/2022;.;Stadium;TM2|\
Flechetas;B03 - Stadium;20.998;30/06/2023;Sub 21;Stadium;TM2|\
YodarK;B03 - Stadium;20.991;21/09/2023;.;Stadium;TM2|\
ZedroX;B03 - Stadium;20.987;21/06/2024;.;Stadium;TM2|\
CarlJr;B04 - Stadium;28.364;01/07/2013;.;Stadium;TM2|\
CarlJr;B04 - Stadium;28.358;29/07/2013;.;Stadium;TM2|\
CarlJr;B04 - Stadium;28.318;29/07/2013;.;Stadium;TM2|\
riolu;B04 - Stadium;28.308;02/08/2013;.;Stadium;TM2|\
RotakeR;B04 - Stadium;28.286;02/06/2017;.;Stadium;TM2|\
racehans;B04 - Stadium;28.278;25/08/2017;.;Stadium;TM2|\
Pinda;B04 - Stadium;28.274;??/??/2017;.;Stadium;TM2|\
Vulnerra;B04 - Stadium;28.252;20/11/2017;.;Stadium;TM2|\
Pinda;B04 - Stadium;28.246;25/11/2017;.;Stadium;TM2|\
RACETA;B04 - Stadium;28.224;06/04/2018;.;Stadium;TM2|\
Pinda;B04 - Stadium;28.222;09/04/2018;.;Stadium;TM2|\
riolu;B04 - Stadium;28.190;14/04/2018;.;Stadium;TM2|\
Kripke;B04 - Stadium;28.160;17/04/2018;DUCK;Stadium;TM2|\
eprotizuu;B04 - Stadium;28.150;22/12/2018;.;Stadium;TM2|\
Loupphok;B04 - Stadium;28.148;22/09/2022;.;Stadium;TM2|\
Loupphok;B04 - Stadium;28.138;15/08/2023;.;Stadium;TM2|\
instable;B04 - Stadium;28.131;20/08/2023;.;Stadium;TM2|\
RotakeR;B04 - Stadium;28.127;26/08/2023;.;Stadium;TM2|\
RotakeR;B04 - Stadium;28.123;26/08/2023;.;Stadium;TM2|\
RotakeR;B04 - Stadium;28.120;27/08/2023;.;Stadium;TM2|\
instable;B04 - Stadium;28.116;03/09/2023;.;Stadium;TM2|\
instable;B04 - Stadium;28.110;03/09/2023;.;Stadium;TM2|\
instable;B04 - Stadium;28.102;03/09/2023;.;Stadium;TM2|\
instable;B04 - Stadium;28.098;05/09/2023;.;Stadium;TM2|\
instable;B04 - Stadium;28.095;06/09/2023;.;Stadium;TM2|\
instable;B04 - Stadium;28.086;06/09/2023;.;Stadium;TM2|\
instable;B04 - Stadium;28.083;07/09/2023;.;Stadium;TM2|\
instable;B04 - Stadium;28.071;10/09/2023;.;Stadium;TM2|\
instable;B04 - Stadium;28.070;10/09/2023;.;Stadium;TM2|\
instable;B04 - Stadium;28.065;15/09/2023;.;Stadium;TM2|\
instable;B04 - Stadium;28.056;18/09/2023;.;Stadium;TM2|\
instable;B04 - Stadium;28.031;08/10/2023;.;Stadium;TM2|\
WiiDii;B05 - Stadium;1:38.975;08/07/2013;.;Stadium;TM2|\
riolu;B05 - Stadium;1:38.842;07/08/2013;.;Stadium;TM2|\
WiiDii;B05 - Stadium;1:38.790;18/08/2013;.;Stadium;TM2|\
WiiDii;B05 - Stadium;1:38.042;20/08/2013;.;Stadium;TM2|\
WiiDii;B05 - Stadium;1:37.868;29/08/2013;Sub 1:38;Stadium;TM2|\
Space;B05 - Stadium;1.37.970;02/06/2017;.;Stadium;TM2|\
Yosh;B05 - Stadium;1.37.705;18/08/2017;.;Stadium;TM2|\
KlockreN;B05 - Stadium;1.37.523;30/08/2017;.;Stadium;TM2|\
riolu;B05 - Stadium;1:37.443;??/04/2018;.;Stadium;TM2|\
Fire!;B05 - Stadium;1:37.160;27/04/2018;.;Stadium;TM2|\
Aziix;B05 - Stadium;1:37.088;23/09/2018;.;Stadium;TM2|\
Aziix;B05 - Stadium;1:36.853;25/09/2018;Sub 1:37;Stadium;TM2|\
RotakeR;B05 - Stadium;1:36.678;26/09/2018;.;Stadium;TM2|\
Aziix;B05 - Stadium;1:36.612;30/09/2018;.;Stadium;TM2|\
riolu;B05 - Stadium;1:36.183;02/05/2019;.;Stadium;TM2|\
Aziix;B05 - Stadium;1:36.162;21/09/2019;DUCK;Stadium;TM2|\
Aziix;B05 - Stadium;1:36.092;06/06/2020;.;Stadium;TM2|\
Aziix;B05 - Stadium;1:36.087;07/06/2020;.;Stadium;TM2|\
Aziix;B05 - Stadium;1:36.035;08/06/2020;.;Stadium;TM2|\
Aziix;B05 - Stadium;1:35.948;08/06/2020;Sub 1:36;Stadium;TM2|\
Wally;B06 - Stadium;30.405;30/06/2013;.;Stadium;TM2|\
JaV;B06 - Stadium;30.405;30/06/2013;.;Stadium;TM2|\
JaV;B06 - Stadium;30.338;15/08/2013;.;Stadium;TM2|\
Demon;B06 - Stadium;30.333;21/10/2013;.;Stadium;TM2|\
JaV;B06 - Stadium;30.245;09/09/2014;.;Stadium;TM2|\
racehans;B06 - Stadium;30.242;22/05/2017;.;Stadium;TM2|\
Hefest;B06 - Stadium;30.161;20/04/2018;.;Stadium;TM2|\
RACETA;B06 - Stadium;30.146;??/??/2018;.;Stadium;TM2|\
Hefest;B06 - Stadium;30.141;08/07/2018;.;Stadium;TM2|\
Hefest;B06 - Stadium;30.117;??/07/2018;.;Stadium;TM2|\
Hefest;B06 - Stadium;30.093;17/07/2018;Non official;Stadium;TM2|\
RACETA;B06 - Stadium;30.113;12/07/2018;.;Stadium;TM2|\
riolu;B06 - Stadium;30.064;23/01/2020;Cheated;Stadium;TM2|\
Hefest;B06 - Stadium;30.028;02/05/2020;DUCK;Stadium;TM2|\
Loupphok;B06 - Stadium;30.018;02/09/2021;.;Stadium;TM2|\
Hefest;B06 - Stadium;30.011;21/05/2022;.;Stadium;TM2|\
Demon;B06 - Stadium;30.008;04/02/2023;.;Stadium;TM2|\
Loupphok;B06 - Stadium;29.998;30/06/2024;Sub 30;Stadium;TM2|\
Flyer;B07 - Stadium;32.853;19/07/2013;.;Stadium;TM2|\
riolu;B07 - Stadium;32.814;20/08/2013;.;Stadium;TM2|\
KarjeN;B07 - Stadium;32.788;16/09/2013;.;Stadium;TM2|\
riolu;B07 - Stadium;32.765;14/02/2016;.;Stadium;TM2|\
racehans;B07 - Stadium;32.806;??/05/2017;Spreadsheet;Stadium;TM2|\
RotakeR;B07 - Stadium;32.803;21/06/2017;.;Stadium;TM2|\
racehans;B07 - Stadium;32.780;11/07/2017;.;Stadium;TM2|\
RACETA;B07 - Stadium;32.768;20/04/2018;.;Stadium;TM2|\
Hefest;B07 - Stadium;32.763;??/??/2018;.;Stadium;TM2|\
RACETA;B07 - Stadium;32.760;19/07/2018;.;Stadium;TM2|\
Hefest;B07 - Stadium;32.726;19/07/2018;.;Stadium;TM2|\
RACETA;B07 - Stadium;32.725;27/07/2018;.;Stadium;TM2|\
Loupphok;B07 - Stadium;32.718;10/03/2020;.;Stadium;TM2|\
Loupphok;B07 - Stadium;32.716;17/03/2020;.;Stadium;TM2|\
Affi;B07 - Stadium;37.684;02/04/2020;New trick;Stadium;TM2|\
instable;B07 - Stadium;37.668;29/03/2024;.;Stadium;TM2|\
Flechetas;B07 - Stadium;37.665;09/04/2024;.;Stadium;TM2|\
Wally;B08 - Stadium;26.791;25/06/2013;.;Stadium;TM2|\
Wally;B08 - Stadium;26.780;01/07/2013;.;Stadium;TM2|\
CarlJr;B08 - Stadium;26.771;27/07/2013;.;Stadium;TM2|\
racehans;B08 - Stadium;26.768;01/08/2013;.;Stadium;TM2|\
racehans;B08 - Stadium;26.758;10/08/2013;.;Stadium;TM2|\
Alecz;B08 - Stadium;26.646;30/01/2015;.;Stadium;TM2|\
Ancaqar;B08 - Stadium;25.744;26/05/2015;New cut;Stadium;TM2|\
fliks;B08 - Stadium;26.279;20/05/2017;.;Stadium;TM2|\
Labaffue;B08 - Stadium;26.208;27/09/2017;.;Stadium;TM2|\
PetitPredator;B08 - Stadium;25.516;13/10/2017;.;Stadium;TM2|\
Nawk;B08 - Stadium;25.228;12/07/2018;.;Stadium;TM2|\
Samuel;B08 - Stadium;25.118;18/02/2019;.;Stadium;TM2|\
Bluts;B08 - Stadium;25.024;19/02/2019;.;Stadium;TM2|\
Samuel;B08 - Stadium;24.984;10/04/2019;.;Stadium;TM2|\
Bluts;B08 - Stadium;24.924;24/12/2021;.;Stadium;TM2|\
mart1gann;B08 - Stadium;24.881;03/04/2023;.;Stadium;TM2|\
WiiDii;B09 - Stadium;30.417;16/07/2013;.;Stadium;TM2|\
WiiDii;B09 - Stadium;30.161;18/08/2013;.;Stadium;TM2|\
Demon;B09 - Stadium;30.050;06/10/2013;.;Stadium;TM2|\
riolu;B09 - Stadium;29.842;09/12/2016;Sub 30;Stadium;TM2|\
racehans;B09 - Stadium;29.865;18/07/2017;.;Stadium;TM2|\
Pinda;B09 - Stadium;29.853;??/07/2017;Spreadsheet;Stadium;TM2|\
Pinda;B09 - Stadium;29.840;??/08/2017;Spreadsheet;Stadium;TM2|\
RotakeR;B09 - Stadium;29.677;04/12/2018;.;Stadium;TM2|\
eprotizuu;B09 - Stadium;29.672;??/??/????;.;Stadium;TM2|\
RACETA;B09 - Stadium;29.648;18/05/2019;.;Stadium;TM2|\
eprotizuu;B09 - Stadium;29.647;21/06/2019;.;Stadium;TM2|\
riolu;B09 - Stadium;29.618;11/01/2020;Cheated;Stadium;TM2|\
frvr;B09 - Stadium;29.595;03/02/2020;DUCK;Stadium;TM2|\
Pinda;B09 - Stadium;29.568;30/11/2020;.;Stadium;TM2|\
RACETA;B09 - Stadium;29.565;15/08/2022;.;Stadium;TM2|\
Pinda;B09 - Stadium;29.562;11/11/2022;.;Stadium;TM2|\
RotakeR;B09 - Stadium;29.535;29/08/2023;.;Stadium;TM2|\
RotakeR;B09 - Stadium;29.512;29/08/2023;.;Stadium;TM2|\
RotakeR;B09 - Stadium;29.478;30/08/2023;.;Stadium;TM2|\
instable;B09 - Stadium;29.463;14/02/2024;.;Stadium;TM2|\
instable;B09 - Stadium;29.458;15/02/2024;.;Stadium;TM2|\
instable;B09 - Stadium;29.438;16/02/2024;.;Stadium;TM2|\
instable;B09 - Stadium;29.425;16/02/2024;.;Stadium;TM2|\
instable;B09 - Stadium;29.412;18/02/2024;.;Stadium;TM2|\
instable;B09 - Stadium;29.404;20/02/2024;.;Stadium;TM2|\
Wally;B10 - Stadium;1:16.328;25/06/2013;.;Stadium;TM2|\
Beat;B10 - Stadium;1:15.590;19/07/2013;Sub 1:16;Stadium;TM2|\
CarlJr;B10 - Stadium;1:15.230;03/09/2013;.;Stadium;TM2|\
CarlJr;B10 - Stadium;1:14.940;10/08/2017;No hole;Stadium;TM2|\
CarlJr;B10 - Stadium;1:14.727;11/04/2018;.;Stadium;TM2|\
Spam;B10 - Stadium;1:14.675;??/??/????;.;Stadium;TM2|\
RACETA;B10 - Stadium;1:14.658;08/06/2020;.;Stadium;TM2|\
Spam;B10 - Stadium;1:14.608;08/06/2020;.;Stadium;TM2|\
RACETA;B10 - Stadium;1:14.584;16/02/2023;.;Stadium;TM2|\
Blizz;B11 - Stadium;31.435;16/07/2013;.;Stadium;TM2|\
Tween;B11 - Stadium;31.405;31/07/2013;.;Stadium;TM2|\
Demon;B11 - Stadium;31.340;04/01/2014;.;Stadium;TM2|\
riolu;B11 - Stadium;31.333;24/08/2015;.;Stadium;TM2|\
Spunki;B11 - Stadium;31.303;11/05/2017;.;Stadium;TM2|\
RotakeR;B11 - Stadium;31.290;16/06/2019;.;Stadium;TM2|\
Demon;B11 - Stadium;21.2xx;??/06/2019;.;Stadium;TM2|\
RotakeR;B11 - Stadium;31.267;19/06/2019;.;Stadium;TM2|\
Demon;B11 - Stadium;31.258;08/03/2020;.;Stadium;TM2|\
RotakeR;B11 - Stadium;31.253;10/04/2020;.;Stadium;TM2|\
Loupphok;B11 - Stadium;31.250;27/11/2020;.;Stadium;TM2|\
Demon;B11 - Stadium;31.238;03/01/2023;.;Stadium;TM2|\
Loupphok;B11 - Stadium;31.227;07/08/2023;.;Stadium;TM2|\
Jaja;B12 - Stadium;28.327;01/07/2013;.;Stadium;TM2|\
RACETA;B12 - Stadium;28.317;26/07/2013;.;Stadium;TM2|\
RACETA;B12 - Stadium;28.293;17/09/2013;.;Stadium;TM2|\
Demon;B12 - Stadium;28.278;29/09/2013;.;Stadium;TM2|\
Demon;B12 - Stadium;28.268;29/09/2013;.;Stadium;TM2|\
RACETA;B12 - Stadium;28.258;24/01/2014;.;Stadium;TM2|\
Detinu;B12 - Stadium;28.275;23/05/2017;.;Stadium;TM2|\
DexteR;B12 - Stadium;28.251;01/08/2017;.;Stadium;TM2|\
RotakeR;B12 - Stadium;28.247;18/09/2017;.;Stadium;TM2|\
CarlJr;B12 - Stadium;28.241;22/11/2017;.;Stadium;TM2|\
CarlJr;B12 - Stadium;28.233;31/03/2018;.;Stadium;TM2|\
Spam;B12 - Stadium;28.228;11/04/2018;.;Stadium;TM2|\
Vulnerra;B12 - Stadium;28.224;28/08/2018;.;Stadium;TM2|\
RACETA;B12 - Stadium;28.210;29/08/2018;.;Stadium;TM2|\
Affi;B12 - Stadium;28.208;22/02/2019;.;Stadium;TM2|\
RACETA;B12 - Stadium;28.201;05/03/2019;.;Stadium;TM2|\
Affi;B12 - Stadium;28.194;11/04/2019;.;Stadium;TM2|\
RACETA;B12 - Stadium;28.192;30/04/2019;.;Stadium;TM2|\
Affi;B12 - Stadium;28.187;23/08/2019;.;Stadium;TM2|\
Affi;B12 - Stadium;28.160;23/08/2019;.;Stadium;TM2|\
RACETA;B12 - Stadium;28.154;08/10/2022;.;Stadium;TM2|\
Tha Base;B13 - Stadium;26.618;24/06/2013;.;Stadium;TM2|\
Flyer;B13 - Stadium;24.815;25/06/2013;.;Stadium;TM2|\
Blizz;B13 - Stadium;24.455;26/06/2013;.;Stadium;TM2|\
CarlJr;B13 - Stadium;24.194;27/06/2013;.;Stadium;TM2|\
Demon;B13 - Stadium;23.938;10/05/2014;New cut;Stadium;TM2|\
Maciey;B13 - Stadium;24.025;17/06/2017;.;Stadium;TM2|\
CarlJr;B13 - Stadium;23.935;??/07/2017;Spreadsheet;Stadium;TM2|\
riolu;B13 - Stadium;23.865;??/??/2018;> 04/18;Stadium;TM2|\
CarlJr;B13 - Stadium;23.848;21/12/2018;.;Stadium;TM2|\
riolu;B13 - Stadium;23.722;18/05/2019;Cheated;Stadium;TM2|\
Synaptic;B13 - Stadium;23.805;06/08/2019;.;Stadium;TM2|\
Loupphok;B13 - Stadium;23.780;24/08/2021;.;Stadium;TM2|\
Demon;B13 - Stadium;23.751;09/02/2023;.;Stadium;TM2|\
Loupphok;B13 - Stadium;23.734;06/04/2023;.;Stadium;TM2|\
Loupphok;B13 - Stadium;23.728;25/04/2023;.;Stadium;TM2|\
Loupphok;B13 - Stadium;23.724;02/06/2023;.;Stadium;TM2|\
Loupphok;B13 - Stadium;23.692;02/06/2023;DUCK;Stadium;TM2|\
WiiDii;B14 - Stadium;32.533;14/07/2013;.;Stadium;TM2|\
Hectrox;B14 - Stadium;32.480;27/07/2013;.;Stadium;TM2|\
Smashy;B14 - Stadium;32.449;09/08/2013;.;Stadium;TM2|\
racehans;B14 - Stadium;32.447;15/08/2013;.;Stadium;TM2|\
racehans;B14 - Stadium;32.339;18/08/2013;.;Stadium;TM2|\
racehans;B14 - Stadium;32.289;19/08/2013;.;Stadium;TM2|\
racehans;B14 - Stadium;32.280;21/08/2013;.;Stadium;TM2|\
KevinStrike;B14 - Stadium;32.311;25/05/2017;.;Stadium;TM2|\
Pinda;B14 - Stadium;32.228;??/07/2017;Spreadsheet;Stadium;TM2|\
BossWanted;B14 - Stadium;32.142;04/08/2017;.;Stadium;TM2|\
RACETA;B14 - Stadium;32.032;02/06/2018;.;Stadium;TM2|\
Pinda;B14 - Stadium;31.987;29/11/2018;Sub 32;Stadium;TM2|\
Vulnerra;B14 - Stadium;31.939;08/12/2018;.;Stadium;TM2|\
Pinda;B14 - Stadium;31.916;09/02/2019;.;Stadium;TM2|\
eprotizuu;B14 - Stadium;31.892;18/08/2019;.;Stadium;TM2|\
Pinda;B14 - Stadium;31.886;01/01/2020;.;Stadium;TM2|\
Aziix;B14 - Stadium;31.851;08/01/2020;.;Stadium;TM2|\
Pinda;B14 - Stadium;31.838;04/03/2020;.;Stadium;TM2|\
ZedroX;B14 - Stadium;31.829;29/09/2021;.;Stadium;TM2|\
Pinda;B14 - Stadium;31.816;08/01/2022;.;Stadium;TM2|\
Loupphok;B14 - Stadium;31.786;31/05/2024;.;Stadium;TM2|\
Katic;B15 - Stadium;1:05.634;09/07/2013;.;Stadium;TM2|\
JaV;B15 - Stadium;1:05.573;10/07/2013;.;Stadium;TM2|\
Coscos;B15 - Stadium;1:05.498;11/07/2013;.;Stadium;TM2|\
Demon;B15 - Stadium;1:05.383;20/07/2013;.;Stadium;TM2|\
Tween;B15 - Stadium;1:05.368;23/07/2013;.;Stadium;TM2|\
KevinStrike;B15 - Stadium;1:05.243;09/05/2017;.;Stadium;TM2|\
hugo220;B15 - Stadium;1:05.212;23/07/2017;.;Stadium;TM2|\
Maciey;B15 - Stadium;1:05.177;29/07/2017;.;Stadium;TM2|\
CarlJr;B15 - Stadium;1:05.136;??/07/2017;Spreadsheet;Stadium;TM2|\
RotakeR;B15 - Stadium;1:05.041;21/09/2017;Spreadsheet;Stadium;TM2|\
CarlJr;B15 - Stadium;1:04.912;??/11/2017;Spreadsheet;Stadium;TM2|\
Forsaken;B15 - Stadium;1:04.861;15/07/2018;.;Stadium;TM2|\
CarlJr;B15 - Stadium;1:04.773;28/12/2018;.;Stadium;TM2|\
riolu;B15 - Stadium;1:04.643;03/05/2019;.;Stadium;TM2|\
Bluts;B15 - Stadium;1:04.641;14/03/2021;.;Stadium;TM2|\
Bluts;B15 - Stadium;1:04.567;14/05/2021;.;Stadium;TM2|\
Wiloux;C01 - Stadium;35.115;04/07/2013;.;Stadium;TM2|\
Wiloux;C01 - Stadium;35.000;27/07/2013;.;Stadium;TM2|\
racehans;C01 - Stadium;34.986;13/08/2013;Sub 35;Stadium;TM2|\
Ancaqar;C01 - Stadium;???;11/12/2014;.;Stadium;TM2|\
RotakeR;C01 - Stadium;34.761;26/04/2015;.;Stadium;TM2|\
Ancaqar;C01 - Stadium;34.738;01/05/2015;.;Stadium;TM2|\
Ancaqar;C01 - Stadium;34.713;02/06/2017;.;Stadium;TM2|\
__;C01 - Stadium;34.673;??/12/2017;Spreadsheet;Stadium;TM2|\
Pinda;C01 - Stadium;34.641;17/03/2018;.;Stadium;TM2|\
Kripke;C01 - Stadium;34.527;26/08/2018;.;Stadium;TM2|\
Reyger;C01 - Stadium;34.501;22/01/2020;.;Stadium;TM2|\
MiThyX;C01 - Stadium;34.490;24/03/2020;.;Stadium;TM2|\
Loupphok;C01 - Stadium;34.453;13/10/2020;.;Stadium;TM2|\
Schmaniol;C01 - Stadium;34.451;11/10/2023;.;Stadium;TM2|\
instable;C01 - Stadium;34.378;03/04/2024;.;Stadium;TM2|\
JaV;C02 - Stadium;43.841;02/07/2013;.;Stadium;TM2|\
CarlJr;C02 - Stadium;43.821;16/07/2013;.;Stadium;TM2|\
J & B;C02 - Stadium;43.626;27/07/2013;.;Stadium;TM2|\
Demon;C02 - Stadium;43.491;31/12/2013;.;Stadium;TM2|\
Ancaqar;C02 - Stadium;43.416;17/01/2015;.;Stadium;TM2|\
Shock77;C02 - Stadium;43.401;20/09/2015;.;Stadium;TM2|\
Ancaqar;C02 - Stadium;43.348;08/10/2015;.;Stadium;TM2|\
Ancaqar;C02 - Stadium;43.294;11/06/2017;.;Stadium;TM2|\
Maciey;C02 - Stadium;43.273;12/07/2017;.;Stadium;TM2|\
nexx.;C02 - Stadium;43.210;21/07/2017;.;Stadium;TM2|\
racehans;C02 - Stadium;43.115;23/08/2017;.;Stadium;TM2|\
riolu;C02 - Stadium;43.046;10/04/2018;.;Stadium;TM2|\
CarlJr;C02 - Stadium;42.963;11/04/2018;DUCK;Stadium;TM2|\
RotakeR;C02 - Stadium;42.891;13/04/2018;.;Stadium;TM2|\
DanikB;C02 - Stadium;42.812;13/11/2019;.;Stadium;TM2|\
Spam;C02 - Stadium;42.774;21/11/2019;.;Stadium;TM2|\
MiThyX;C02 - Stadium;42.690;14/12/2020;.;Stadium;TM2|\
Loupphok;C02 - Stadium;42.685;19/10/2023;.;Stadium;TM2|\
Loupphok;C02 - Stadium;42.648;19/10/2023;.;Stadium;TM2|\
Loupphok;C02 - Stadium;42.627;25/02/2024;.;Stadium;TM2|\
Loupphok;C02 - Stadium;42.615;28/02/2024;.;Stadium;TM2|\
Loupphok;C02 - Stadium;42.586;28/02/2024;.;Stadium;TM2|\
Loupphok;C02 - Stadium;42.583;29/02/2024;.;Stadium;TM2|\
Loupphok;C02 - Stadium;42.563;29/02/2024;.;Stadium;TM2|\
Loupphok;C02 - Stadium;42.554;02/03/2024;.;Stadium;TM2|\
Loupphok;C02 - Stadium;42.550;02/03/2024;.;Stadium;TM2|\
Loupphok;C02 - Stadium;42.523;02/03/2024;.;Stadium;TM2|\
Loupphok;C02 - Stadium;42.508;03/03/2024;.;Stadium;TM2|\
Loupphok;C02 - Stadium;42.468;03/03/2024;.;Stadium;TM2|\
JaV;C03 - Stadium;21.854;16/07/2013;.;Stadium;TM2|\
Passi;C03 - Stadium;21.804;16/07/2013;.;Stadium;TM2|\
Passi;C03 - Stadium;21.468;17/07/2013;.;Stadium;TM2|\
RACETA;C03 - Stadium;21.378;11/09/2016;.;Stadium;TM2|\
RACETA;C03 - Stadium;21.538;??/05/2017;vA;Stadium;TM2|\
ringoa;C03 - Stadium;21.508;06/08/2017;.;Stadium;TM2|\
RACETA;C03 - Stadium;21.492;??/11/2017;Spreadsheet;Stadium;TM2|\
Hefest;C03 - Stadium;21.302;??/04/2018;.;Stadium;TM2|\
RACETA;C03 - Stadium;21.255;14/04/2018;.;Stadium;TM2|\
Samuel;C03 - Stadium;21.235;16/06/2019;.;Stadium;TM2|\
Gwen;C03 - Stadium;21.205;14/05/2020;.;Stadium;TM2|\
Affi;C03 - Stadium;21.124;14/05/2020;.;Stadium;TM2|\
Bluts;C03 - Stadium;21.115;01/11/2022;.;Stadium;TM2|\
Yosh;C04 - Stadium;45.198;02/07/2013;.;Stadium;TM2|\
WiiDii;C04 - Stadium;44.590;08/07/2013;.;Stadium;TM2|\
riolu;C04 - Stadium;44.584;24/02/2014;.;Stadium;TM2|\
Fire!;C04 - Stadium;44.178;18/02/2015;.;Stadium;TM2|\
riolu;C04 - Stadium;44.032;13/09/2015;.;Stadium;TM2|\
BossWanted;C04 - Stadium;43.847;03/08/2017;Sub 44;Stadium;TM2|\
RACETA;C04 - Stadium;43.845;02/06/2018;.;Stadium;TM2|\
riolu;C04 - Stadium;43.833;??/??/2018;.;Stadium;TM2|\
RotakeR;C04 - Stadium;43.708;09/08/2018;.;Stadium;TM2|\
riolu;C04 - Stadium;43.690;??/??/2018;.;Stadium;TM2|\
eprotizuu;C04 - Stadium;43.512;12/12/2018;DUCK;Stadium;TM2|\
Samuel;C04 - Stadium;43.468;06/12/2019;.;Stadium;TM2|\
Loupphok;C04 - Stadium;43.435;29/12/2019;.;Stadium;TM2|\
Samuel;C04 - Stadium;43.371;06/01/2020;.;Stadium;TM2|\
Loupphok;C04 - Stadium;43.332;20/09/2022;.;Stadium;TM2|\
instable;C04 - Stadium;43.361;24/07/2023;.;Stadium;TM2|\
Loupphok;C04 - Stadium;43.288;30/07/2023;.;Stadium;TM2|\
Loupphok;C04 - Stadium;43.274;31/07/2023;.;Stadium;TM2|\
Loupphok;C04 - Stadium;43.265;20/09/2023;.;Stadium;TM2|\
mt17;C05 - Stadium;1:43.726;16/07/2013;.;Stadium;TM2|\
Tween;C05 - Stadium;1:41.712;23/07/2013;.;Stadium;TM2|\
Loic;C05 - Stadium;1:41.398;05/08/2013;.;Stadium;TM2|\
Loic;C05 - Stadium;1:41.624;15/06/2017;.;Stadium;TM2|\
CarlJr;C05 - Stadium;1:41.293;17/07/2017;.;Stadium;TM2|\
Spam;C05 - Stadium;1:41.231;06/04/2018;.;Stadium;TM2|\
Hefest;C05 - Stadium;1:40.673;07/08/2018;New cut;Stadium;TM2|\
Vulnerra;C05 - Stadium;1:40.506;30/10/2018;.;Stadium;TM2|\
riolu;C05 - Stadium;1:40.448;12/05/2019;.;Stadium;TM2|\
Affi;C05 - Stadium;1:40.323;05/05/2020;DUCK;Stadium;TM2|\
Gwen;C05 - Stadium;1:40.246;06/05/2020;.;Stadium;TM2|\
Affi;C05 - Stadium;1:39.980;07/05/2020;Sub 1:40;Stadium;TM2|\
Gwen;C05 - Stadium;1:39.742;15/05/2020;.;Stadium;TM2|\
Schmaniol;C05 - Stadium;1:39.670;25/10/2023;.;Stadium;TM2|\
JaV;C06 - Stadium;38.265;16/07/2013;.;Stadium;TM2|\
Shock77;C06 - Stadium;38.258;18/07/2013;.;Stadium;TM2|\
CarlJr;C06 - Stadium;37.960;25/07/2013;Sub 38;Stadium;TM2|\
riolu;C06 - Stadium;37.846;26/09/2014;Cheated;Stadium;TM2|\
__;C06 - Stadium;37.981;??/05/2017;Spreadsheet;Stadium;TM2|\
racehans;C06 - Stadium;37.844;01/08/2018;DUCK;Stadium;TM2|\
the.Park;C06 - Stadium;37.768;10/01/2018;.;Stadium;TM2|\
CarlJr;C06 - Stadium;37.668;31/03/2018;.;Stadium;TM2|\
Hefest;C06 - Stadium;37.641;21/08/2018;.;Stadium;TM2|\
Spam;C06 - Stadium;37.638;??/??/2018;.;Stadium;TM2|\
Scrapie;C06 - Stadium;37.578;23/08/2018;.;Stadium;TM2|\
RACETA;C06 - Stadium;37.558;11/11/2019;.;Stadium;TM2|\
Spam;C06 - Stadium;37.521;22/11/2019;.;Stadium;TM2|\
Loupphok;C06 - Stadium;37.511;25/04/2021;.;Stadium;TM2|\
Jaja;C07 - Stadium;35.723;01/07/2013;.;Stadium;TM2|\
Savier;C07 - Stadium;35.685;04/07/2013;.;Stadium;TM2|\
Demon;C07 - Stadium;35.596;19/07/2013;.;Stadium;TM2|\
__;C07 - Stadium;35.507;??/??/????;>07/15;Stadium;TM2|\
trabadia;C07 - Stadium;35.511;16/05/2017;.;Stadium;TM2|\
Kripke;C07 - Stadium;35.458;??/05/2017;Spreadsheet;Stadium;TM2|\
racehans;C07 - Stadium;35.450;21/08/2017;.;Stadium;TM2|\
__;C07 - Stadium;35.436;??/08/2017;Spreadsheet;Stadium;TM2|\
RACETA;C07 - Stadium;35.412;??/09/2017;Spreadsheet;Stadium;TM2|\
Kripke;C07 - Stadium;35.297;04/04/2018;.;Stadium;TM2|\
Pieton;C07 - Stadium;35.293;26/10/2019;.;Stadium;TM2|\
RACETA;C07 - Stadium;35.261;30/11/2019;.;Stadium;TM2|\
Bluts;C07 - Stadium;35.238;25/03/2021;.;Stadium;TM2|\
Loupphok;C07 - Stadium;35.211;20/02/2022;.;Stadium;TM2|\
Phip;C07 - Stadium;34.806;07/07/2022;New cut;Stadium;TM2|\
Loupphok;C07 - Stadium;34.684;13/07/2022;.;Stadium;TM2|\
Phip;C07 - Stadium;34.668;14/07/2022;.;Stadium;TM2|\
Loupphok;C07 - Stadium;34.410;14/07/2022;.;Stadium;TM2|\
Bluts;C07 - Stadium;34.255;15/07/2022;.;Stadium;TM2|\
Loupphok;C07 - Stadium;34.253;16/07/2022;.;Stadium;TM2|\
Bluts;C07 - Stadium;34.228;17/07/2022;.;Stadium;TM2|\
Phip;C07 - Stadium;34.186;07/04/2024;.;Stadium;TM2|\
Hanni0;C08 - Stadium;32.832;03/07/2013;.;Stadium;TM2|\
7Alvin;C08 - Stadium;32.591;17/07/2013;.;Stadium;TM2|\
mt17;C08 - Stadium;32.467;18/07/2013;.;Stadium;TM2|\
JaV;C08 - Stadium;32.407;15/06/2014;.;Stadium;TM2|\
mt17;C08 - Stadium;34.352;13/06/2017;.;Stadium;TM2|\
__;C08 - Stadium;32.250;??/06/2017;Spreadsheet;Stadium;TM2|\
Panda;C08 - Stadium;32.245;25/06/2017;.;Stadium;TM2|\
Maciey;C08 - Stadium;32.127;28/06/2017;.;Stadium;TM2|\
Loupphok;C08 - Stadium;32.122;21/07/2018;.;Stadium;TM2|\
MiThyX;C08 - Stadium;32.086;31/03/2019;.;Stadium;TM2|\
Loupphok;C08 - Stadium;32.065;31/03/2019;.;Stadium;TM2|\
MiThyX;C08 - Stadium;31.990;04/05/2019;Sub 32;Stadium;TM2|\
Loupphok;C08 - Stadium;31.984;16/06/2019;.;Stadium;TM2|\
RACETA;C08 - Stadium;31.940;19/11/2019;.;Stadium;TM2|\
Loupphok;C08 - Stadium;31.927;29/01/2020;.;Stadium;TM2|\
Loupphok;C08 - Stadium;31.907;26/06/2020;.;Stadium;TM2|\
Loupphok;C08 - Stadium;31.887;12/07/2020;.;Stadium;TM2|\
Loupphok;C08 - Stadium;31.865;13/04/2023;.;Stadium;TM2|\
Loupphok;C08 - Stadium;31.855;21/06/2023;.;Stadium;TM2|\
Loupphok;C08 - Stadium;31.828;13/08/2023;.;Stadium;TM2|\
Loupphok;C08 - Stadium;31.765;06/04/2024;.;Stadium;TM2|\
Blizz;C09 - Stadium;37.132;16/07/2013;.;Stadium;TM2|\
Shock77;C09 - Stadium;37.048;19/07/2013;.;Stadium;TM2|\
JaV;C09 - Stadium;36.794;19/09/2014;Sub 37;Stadium;TM2|\
Shock77;C09 - Stadium;36.487;09/08/2015;.;Stadium;TM2|\
RotakeR;C09 - Stadium;36.492;03/06/2017;.;Stadium;TM2|\
CarlJr;C09 - Stadium;36.332;18/07/2017;.;Stadium;TM2|\
RACETA;C09 - Stadium;36.278;22/11/2019;.;Stadium;TM2|\
Kappa;C09 - Stadium;36.198;21/04/2020;.;Stadium;TM2|\
Loupphok;C09 - Stadium;36.151;06/06/2021;.;Stadium;TM2|\
Levon;C09 - Stadium;36.102;08/08/2022;.;Stadium;TM2|\
Loupphok;C09 - Stadium;36.092;24/06/2023;.;Stadium;TM2|\
Wilson;C10 - Stadium;1:55.198;08/07/2013;.;Stadium;TM2|\
Katic;C10 - Stadium;1:53.857;09/07/2013;.;Stadium;TM2|\
Tween;C10 - Stadium;1:53.118;30/07/2013;.;Stadium;TM2|\
Tween;C10 - Stadium;1:52.952;31/07/2013;Sub 1:53;Stadium;TM2|\
JaV;C10 - Stadium;1:52.862;21/09/2014;.;Stadium;TM2|\
CarlJr;C10 - Stadium;1:52.302;18/07/2017;.;Stadium;TM2|\
Scrapie;C10 - Stadium;1:52.077;15/12/2018;.;Stadium;TM2|\
Spam;C10 - Stadium;1:52.038;17/12/2018;.;Stadium;TM2|\
RACETA;C10 - Stadium;1:52.015;13/06/2020;.;Stadium;TM2|\
Bicougnon;C10 - Stadium;1:51.965;01/02/2022;New cut (2x);Stadium;TM2|\
Bluts;C10 - Stadium;1:51.884;19/07/2022;.;Stadium;TM2|\
Loupphok;C10 - Stadium;1:51.737;13/11/2023;1 cut;Stadium;TM2|\
Yosh;C11 - Stadium;41.028;17/07/2013;.;Stadium;TM2|\
fo'camo;C11 - Stadium;41.018;17/07/2013;.;Stadium;TM2|\
Yosh;C11 - Stadium;40.865;18/07/2013;Sub 41;Stadium;TM2|\
Wiloux;C11 - Stadium;40.702;28/07/2013;.;Stadium;TM2|\
racehans;C11 - Stadium;40.542;18/05/2017;.;Stadium;TM2|\
Brandom;C11 - Stadium;40.502;??/??/2018;> 04/18;Stadium;TM2|\
LAMArtifice;C11 - Stadium;40.422;11/10/2018;.;Stadium;TM2|\
Pieton;C11 - Stadium;40.415;15/10/2018;.;Stadium;TM2|\
LAMArtifice;C11 - Stadium;40.268;15/10/2018;.;Stadium;TM2|\
LAMArtifice;C11 - Stadium;40.205;09/12/2018;.;Stadium;TM2|\
Vulnerra;C11 - Stadium;40.162;14/12/2018;.;Stadium;TM2|\
LAMArtifice;C11 - Stadium;40.122;18/12/2019;.;Stadium;TM2|\
Affi;C11 - Stadium;40.098;10/08/2019;.;Stadium;TM2|\
LAMArtifice;C11 - Stadium;40.085;24/08/2019;.;Stadium;TM2|\
Affi;C11 - Stadium;39.848;25/08/2019;Sub 40;Stadium;TM2|\
RACETA;C11 - Stadium;39.838;12/12/2019;.;Stadium;TM2|\
instable;C11 - Stadium;39.798;09/08/2022;.;Stadium;TM2|\
Jaja;C12 - Stadium;37.354;01/07/2013;.;Stadium;TM2|\
Katic;C12 - Stadium;37.292;11/07/2013;.;Stadium;TM2|\
Demon;C12 - Stadium;37.281;26/10/2013;.;Stadium;TM2|\
Demon;C12 - Stadium;37.253;29/04/2014;.;Stadium;TM2|\
__;C12 - Stadium;37.214;??/05/2017;Spreadsheet;Stadium;TM2|\
Maciey;C12 - Stadium;37.158;25/06/2017;.;Stadium;TM2|\
riolu;C12 - Stadium;???;??/??/????;> 04/18;Stadium;TM2|\
Hefest;C12 - Stadium;37.137;22/07/2018;.;Stadium;TM2|\
Vulnerra;C12 - Stadium;37.134;25/07/2018;.;Stadium;TM2|\
Hefest;C12 - Stadium;37.068;25/07/2018;.;Stadium;TM2|\
riolu;C12 - Stadium;37.045;10/05/2019;.;Stadium;TM2|\
Pieton;C12 - Stadium;37.026;13/10/2019;DUCK;Stadium;TM2|\
Bluts;C12 - Stadium;37.015;31/10/2019;.;Stadium;TM2|\
Loupphok;C12 - Stadium;37.008;01/11/2019;.;Stadium;TM2|\
Bluts;C12 - Stadium;36.998;02/11/2019;Sub 37;Stadium;TM2|\
Bluts;C12 - Stadium;36.992;22/11/2019;.;Stadium;TM2|\
RACETA;C12 - Stadium;36.975;30/11/2019;.;Stadium;TM2|\
Bluts;C12 - Stadium;36.936;04/05/2020;Non officiel;Stadium;TM2|\
Bluts;C12 - Stadium;36.958;04/06/2020;.;Stadium;TM2|\
RACETA;C12 - Stadium;36.948;27/03/2023;.;Stadium;TM2|\
Bluts;C12 - Stadium;36.945;04/04/2023;.;Stadium;TM2|\
Bluts;C12 - Stadium;36.938;27/12/2023;.;Stadium;TM2|\
7Alvin;C13 - Stadium;36.550;05/07/2013;.;Stadium;TM2|\
7Alvin;C13 - Stadium;36.423;09/07/2013;.;Stadium;TM2|\
7Alvin;C13 - Stadium;36.397;10/07/2013;.;Stadium;TM2|\
7Alvin;C13 - Stadium;36.270;13/07/2013;.;Stadium;TM2|\
JaV;C13 - Stadium;36.174;25/05/2014;.;Stadium;TM2|\
JaV;C13 - Stadium;36.171;25/05/2014;.;Stadium;TM2|\
Danio;C13 - Stadium;36.07x;??/05/2017;.;Stadium;TM2|\
lacsyl;C13 - Stadium;35.931;13/06/2017;New trick;Stadium;TM2|\
RotakeR;C13 - Stadium;37.928;18/06/2017;.;Stadium;TM2|\
RotakeR;C13 - Stadium;37.881;18/06/2017;.;Stadium;TM2|\
RotakeR;C13 - Stadium;37.838;18/06/2017;.;Stadium;TM2|\
Danio;C13 - Stadium;37.827;21/06/2017;.;Stadium;TM2|\
RotakeR;C13 - Stadium;37.786;21/06/2017;.;Stadium;TM2|\
Hefest;C13 - Stadium;35.772;11/07/2018;.;Stadium;TM2|\
RotakeR;C13 - Stadium;35.742;05/11/2018;.;Stadium;TM2|\
Samuel;C13 - Stadium;35.710;05/09/2019;.;Stadium;TM2|\
eprotizuu;C13 - Stadium;35.710;??/09/2019;.;Stadium;TM2|\
eprotizuu;C13 - Stadium;35.673;10/09/2019;.;Stadium;TM2|\
Samuel;C13 - Stadium;35.648;22/10/2019;.;Stadium;TM2|\
Loupphok;C13 - Stadium;35.633;14/04/2021;.;Stadium;TM2|\
Loupphok;C13 - Stadium;35.612;27/10/2023;.;Stadium;TM2|\
CarlJr;C14 - Stadium;38.658;01/07/2013;.;Stadium;TM2|\
CarlJr;C14 - Stadium;38.590;17/07/2013;.;Stadium;TM2|\
Philkos;C14 - Stadium;38.520;26/04/2014;.;Stadium;TM2|\
RotakeR;C14 - Stadium;38.478;01/05/2015;.;Stadium;TM2|\
Shock77;C14 - Stadium;38.465;08/08/2015;.;Stadium;TM2|\
RotakeR;C14 - Stadium;38.457;12/05/2017;.;Stadium;TM2|\
RotakeR;C14 - Stadium;38.428;17/05/2017;.;Stadium;TM2|\
RotakeR;C14 - Stadium;38.385;17/05/2017;.;Stadium;TM2|\
RotakeR;C14 - Stadium;38.334;17/05/2017;.;Stadium;TM2|\
Spam;C14 - Stadium;38.325;??/08/2018;.;Stadium;TM2|\
Spam;C14 - Stadium;38.291;05/08/2018;.;Stadium;TM2|\
Spam;C14 - Stadium;38.212;06/08/2018;.;Stadium;TM2|\
Spam;C14 - Stadium;38.160;08/08/2018;.;Stadium;TM2|\
RACETA;C14 - Stadium;38.147;21/12/2019;.;Stadium;TM2|\
MiThyX;C14 - Stadium;38.145;09/04/2021;.;Stadium;TM2|\
Loupphok;C14 - Stadium;38.132;24/06/2022;.;Stadium;TM2|\
RACETA;C14 - Stadium;38.123;22/04/2023;.;Stadium;TM2|\
Loupphok;C14 - Stadium;38.117;04/04/2024;BW car;Stadium;TM2|\
JaV;C15 - Stadium;1:38.701;??/??/2013;.;Stadium;TM2|\
Blizz;C15 - Stadium;1:35.421;23/07/2013;.;Stadium;TM2|\
Blizz;C15 - Stadium;1:35.263;26/07/2013;.;Stadium;TM2|\
Tween;C15 - Stadium;1:34.985;26/07/2013;Sub 1:35;Stadium;TM2|\
Serbi;C15 - Stadium;1:34.334;18/11/2015;.;Stadium;TM2|\
CarlJr;C15 - Stadium;1:34.648;??/07/2017;Spreadsheet;Stadium;TM2|\
CarlJr;C15 - Stadium;1:34.154;??/??/????;> 04/18;Stadium;TM2|\
riolu;C15 - Stadium;1:34.075;15/05/2019;.;Stadium;TM2|\
CarlJr;C15 - Stadium;1:34.032;17/11/2019;DUCK;Stadium;TM2|\
Loupphok;C15 - Stadium;1:34.031;09/11/2023;.;Stadium;TM2|\
Wiloux;D01 - Stadium;43.130;01/07/2013;.;Stadium;TM2|\
WiiDii;D01 - Stadium;42.758;17/07/2013;New cut;Stadium;TM2|\
Wiloux;D01 - Stadium;42.753;24/07/2013;.;Stadium;TM2|\
Wiloux;D01 - Stadium;42.622;02/08/2013;.;Stadium;TM2|\
Wiloux;D01 - Stadium;42.561;18/08/2013;.;Stadium;TM2|\
Fire!;D01 - Stadium;42.513;28/08/2013;.;Stadium;TM2|\
Wiloux;D01 - Stadium;42.450;06/09/2013;.;Stadium;TM2|\
riolu;D01 - Stadium;42.155;03/02/2016;.;Stadium;TM2|\
KevinStrike;D01 - Stadium;42.475;??/05/2017;.;Stadium;TM2|\
KevinStrike;D01 - Stadium;42.182;24/05/2017;.;Stadium;TM2|\
Pigge;D01 - Stadium;41.997;??/07/2017;DUCK;Stadium;TM2|\
Pigge;D01 - Stadium;41.972;??/08/2017;.;Stadium;TM2|\
riolu;D01 - Stadium;41.915;30/08/2017;.;Stadium;TM2|\
riolu;D01 - Stadium;41.752;30/08/2017;.;Stadium;TM2|\
Pigge;D01 - Stadium;41.328;??/09/2017;Spreadsheet;Stadium;TM2|\
Frev;D01 - Stadium;41.262;14/12/2017;.;Stadium;TM2|\
Pigge;D01 - Stadium;41.201;18/12/2017;.;Stadium;TM2|\
Vulnerra;D01 - Stadium;41.114;23/06/2018;.;Stadium;TM2|\
Frev;D01 - Stadium;40.752;21/09/2018;Sub 41;Stadium;TM2|\
Frev;D01 - Stadium;40.448;19/08/2019;New cut;Stadium;TM2|\
RACETA;D01 - Stadium;40.445;26/12/2019;.;Stadium;TM2|\
Loupphok;D01 - Stadium;40.401;12/05/2020;.;Stadium;TM2|\
Loupphok;D01 - Stadium;40.363;13/05/2020;.;Stadium;TM2|\
Schmaniol;D01 - Stadium;40.261;27/07/2021;New trick;Stadium;TM2|\
Loupphok;D01 - Stadium;40.145;31/05/2022;.;Stadium;TM2|\
Schmaniol;D01 - Stadium;40.138;05/08/2022;.;Stadium;TM2|\
Loupphok;D01 - Stadium;40.085;06/07/2024;.;Stadium;TM2|\
Flyer;D02 - Stadium;38.468;25/06/2013;.;Stadium;TM2|\
Wally;D02 - Stadium;38.164;27/06/2013;.;Stadium;TM2|\
Flyer;D02 - Stadium;37.941;07/10/2013;Sub 38;Stadium;TM2|\
JaviFlyer;D02 - Stadium;37.926;14/07/2015;.;Stadium;TM2|\
Scrapie;D02 - Stadium;37.918;05/06/2017;.;Stadium;TM2|\
CarlJr;D02 - Stadium;37.854;11/06/2017;.;Stadium;TM2|\
racehans;D02 - Stadium;37.853;25/11/2017;.;Stadium;TM2|\
CarlJr;D02 - Stadium;37.844;31/03/2018;.;Stadium;TM2|\
eprotizuu;D02 - Stadium;37.718;11/09/2018;.;Stadium;TM2|\
Mudda;D02 - Stadium;37.701;11/10/2018;.;Stadium;TM2|\
riolu;D02 - Stadium;37.618;15/10/2018;.;Stadium;TM2|\
Spam;D02 - Stadium;37.598;19/12/2018;DUCK;Stadium;TM2|\
RACETA;D02 - Stadium;37.586;31/12/2019;.;Stadium;TM2|\
Loupphok;D02 - Stadium;37.584;08/02/2022;.;Stadium;TM2|\
RACETA;D02 - Stadium;37.583;18/03/2023;.;Stadium;TM2|\
Loupphok;D02 - Stadium;37.578;26/09/2023;.;Stadium;TM2|\
CarlJr;D03 - Stadium;37.636;16/07/2013;.;Stadium;TM2|\
Wally;D03 - Stadium;37.548;17/07/2013;.;Stadium;TM2|\
Jaja;D03 - Stadium;37.542;26/07/2013;.;Stadium;TM2|\
Tween;D03 - Stadium;37.470;28/07/2013;.;Stadium;TM2|\
Netsky;D03 - Stadium;37.427;28/07/2013;.;Stadium;TM2|\
Tween;D03 - Stadium;37.347;30/07/2013;.;Stadium;TM2|\
Netsky;D03 - Stadium;37.295;01/08/2013;.;Stadium;TM2|\
Wiloux;D03 - Stadium;37.253;08/08/2013;.;Stadium;TM2|\
Demon;D03 - Stadium;37.141;01/06/2014;.;Stadium;TM2|\
RotakeR;D03 - Stadium;37.041;18/06/2017;.;Stadium;TM2|\
eprotizuu;D03 - Stadium;37.017;19/06/2017;.;Stadium;TM2|\
fliks;D03 - Stadium;36.96x;16/05/2018;New cut;Stadium;TM2|\
fliks;D03 - Stadium;36.92x;20/05/2018;.;Stadium;TM2|\
RotakeR;D03 - Stadium;36.693;23/05/2018;.;Stadium;TM2|\
fliks;D03 - Stadium;36.497;28/07/2018;.;Stadium;TM2|\
RACETA;D03 - Stadium;36.374;05/01/2020;.;Stadium;TM2|\
fliks;D03 - Stadium;36.077;16/07/2020;.;Stadium;TM2|\
TnT;D04 - Stadium;43.233;23/06/2013;.;Stadium;TM2|\
CarlJr;D04 - Stadium;43.197;17/07/2013;.;Stadium;TM2|\
JaV;D04 - Stadium;43.031;25/07/2013;.;Stadium;TM2|\
CarlJr;D04 - Stadium;42.928;28/07/2013;Sub 43;Stadium;TM2|\
Netsky;D04 - Stadium;42.854;04/09/2013;.;Stadium;TM2|\
Demon;D04 - Stadium;42.788;09/05/2014;.;Stadium;TM2|\
JaviFlyer;D04 - Stadium;42.645;14/07/2015;.;Stadium;TM2|\
Shock77;D04 - Stadium;42.592;05/09/2015;.;Stadium;TM2|\
RotakeR;D04 - Stadium;42.475;10/06/2017;.;Stadium;TM2|\
CarlJr;D04 - Stadium;42.468;12/08/2017;.;Stadium;TM2|\
the.Park;D04 - Stadium;42.440;11/07/2018;.;Stadium;TM2|\
Vulnerra;D04 - Stadium;42.428;04/09/2018;.;Stadium;TM2|\
Vulnerra;D04 - Stadium;42.398;05/09/2018;.;Stadium;TM2|\
LAMArtifice;D04 - Stadium;42.263;14/09/2018;.;Stadium;TM2|\
Vulnerra;D04 - Stadium;42.254;18/09/2018;.;Stadium;TM2|\
LAMArtifice;D04 - Stadium;42.244;20/09/2018;.;Stadium;TM2|\
Vulnerra;D04 - Stadium;42.182;20/09/2018;.;Stadium;TM2|\
eprotizuu;D04 - Stadium;42.148;??/09/2018;.;Stadium;TM2|\
Vulnerra;D04 - Stadium;42.142;27/09/2018;.;Stadium;TM2|\
eprotizuu;D04 - Stadium;42.135;28/09/2018;.;Stadium;TM2|\
Vulnerra;D04 - Stadium;42.134;30/09/2018;.;Stadium;TM2|\
Vulnerra;D04 - Stadium;42.046;13/10/2018;.;Stadium;TM2|\
eprotizuu;D04 - Stadium;42.018;19/10/2018;.;Stadium;TM2|\
RACETA;D04 - Stadium;41.951;09/01/2020;Sub 42;Stadium;TM2|\
Loupphok;D04 - Stadium;41.942;12/06/2024;.;Stadium;TM2|\
Tween;D05 - Stadium;1:36.852;23/07/2013;.;Stadium;TM2|\
CarlJr;D05 - Stadium;1:36.744;12/08/2013;.;Stadium;TM2|\
Tween;D05 - Stadium;1:35.650;13/08/2013;Sub 1:36;Stadium;TM2|\
CarlJr;D05 - Stadium;1:35.491;09/07/2017;.;Stadium;TM2|\
Kappa;D05 - Stadium;1:35.280;30/08/2018;Driven on Alt;Stadium;TM2|\
Kappa;D05 - Stadium;1:34.926;30/04/2020;Sub 1:35;Stadium;TM2|\
RACETA;D05 - Stadium;1:34.873;27/08/2020;.;Stadium;TM2|\
Flyer;D06 - Stadium;48.372;25/06/2013;.;Stadium;TM2|\
Wally;D06 - Stadium;48.064;29/06/2013;.;Stadium;TM2|\
Tween;D06 - Stadium;47.960;24/08/2013;Sub 48;Stadium;TM2|\
JaV;D06 - Stadium;47.918;23/08/2014;.;Stadium;TM2|\
mt17;D06 - Stadium;47.692;30/08/2015;.;Stadium;TM2|\
Vulnerra;D06 - Stadium;47.727;13/06/2017;.;Stadium;TM2|\
CarlJr;D06 - Stadium;47.541;14/06/2017;.;Stadium;TM2|\
Maciey;D06 - Stadium;47.433;27/07/2017;.;Stadium;TM2|\
hugo220;D06 - Stadium;47.375;03/08/2018;.;Stadium;TM2|\
eprotizuu;D06 - Stadium;???;??/??/2018;.;Stadium;TM2|\
riolu;D06 - Stadium;47.267;25/09/2018;.;Stadium;TM2|\
riolu;D06 - Stadium;47.252;??/??/2018;Cheated;Stadium;TM2|\
eprotizuu;D06 - Stadium;47.252;20/10/2018;.;Stadium;TM2|\
RACETA;D06 - Stadium;47.230;11/01/2020;.;Stadium;TM2|\
riolu;D06 - Stadium;47.221;13/01/2020;Cheated;Stadium;TM2|\
Loupphok;D06 - Stadium;47.098;08/05/2022;DUCK;Stadium;TM2|\
Down;D07 - Stadium;39.120;25/06/2013;.;Stadium;TM2|\
Dragon;D07 - Stadium;39.118;05/07/2013;.;Stadium;TM2|\
Demon;D07 - Stadium;39.038;12/10/2013;.;Stadium;TM2|\
Alecz;D07 - Stadium;38.963;18/10/2014;Sub 39;Stadium;TM2|\
Keby;D07 - Stadium;38.866;07/06/2017;.;Stadium;TM2|\
ClearVision;D07 - Stadium;38.854;08/06/2017;.;Stadium;TM2|\
racehans;D07 - Stadium;38.840;18/07/2017;.;Stadium;TM2|\
RotakeR;D07 - Stadium;38.783;19/08/2018;.;Stadium;TM2|\
Switch;D07 - Stadium;38.758;14/11/2018;.;Stadium;TM2|\
riolu;D07 - Stadium;38.755;29/01/2019;.;Stadium;TM2|\
Mudda;D07 - Stadium;38.730;23/03/2019;.;Stadium;TM2|\
riolu;D07 - Stadium;38.667;17/04/2019;.;Stadium;TM2|\
RACETA;D07 - Stadium;38.596;14/01/2020;DUCK;Stadium;TM2|\
Flyer;D08 - Stadium;22.332;25/06/2013;.;Stadium;TM2|\
CarlJr;D08 - Stadium;22.015;05/07/2013;.;Stadium;TM2|\
Shock77;D08 - Stadium;21.915;21/07/2013;Sub 22;Stadium;TM2|\
Tatu;D08 - Stadium;21.818;22/07/2013;.;Stadium;TM2|\
Blizz;D08 - Stadium;21.672;13/08/2013;.;Stadium;TM2|\
Demon;D08 - Stadium;21.608;11/05/2014;.;Stadium;TM2|\
Peyman;D08 - Stadium;21.152;27/07/2014;New cut;Stadium;TM2|\
riolu;D08 - Stadium;20.955;04/08/2014;Sub 21;Stadium;TM2|\
Smashy;D08 - Stadium;20.948;14/10/2014;.;Stadium;TM2|\
riolu;D08 - Stadium;20.781;10/01/2015;.;Stadium;TM2|\
riolu;D08 - Stadium;20.865;??/05/2017;.;Stadium;TM2|\
eprotizuu;D08 - Stadium;20.735;19/06/2017;.;Stadium;TM2|\
Samuel;D08 - Stadium;20.682;22/06/2019;.;Stadium;TM2|\
riolu;D08 - Stadium;20.645;27/06/2019;Cheated;Stadium;TM2|\
Samuel;D08 - Stadium;20.618;03/07/2019;DUCK;Stadium;TM2|\
Mebe12;D08 - Stadium;20.528;29/04/2023;.;Stadium;TM2|\
Shock77;D09 - Stadium;39.404;17/07/2013;.;Stadium;TM2|\
CarlJr;D09 - Stadium;39.271;28/07/2013;.;Stadium;TM2|\
JaV;D09 - Stadium;39.055;25/05/2014;.;Stadium;TM2|\
riolu;D09 - Stadium;39.048;01/10/2015;.;Stadium;TM2|\
hugo220;D09 - Stadium;38.954;??/05/2017;Spreadsheet;Stadium;TM2|\
Reyger;D09 - Stadium;38.872;??/??/2018;> 04/18;Stadium;TM2|\
hugo220;D09 - Stadium;38.772;18/06/2018;.;Stadium;TM2|\
Reyger;D09 - Stadium;38.692;??/??/????;.;Stadium;TM2|\
Reyger;D09 - Stadium;38.608;25/05/2019;.;Stadium;TM2|\
Reyger;D09 - Stadium;38.588;23/11/2019;.;Stadium;TM2|\
Reyger;D09 - Stadium;38.535;24/11/2019;.;Stadium;TM2|\
ZedroX;D09 - Stadium;38.528;16/08/2022;.;Stadium;TM2|\
Loupphok;D09 - Stadium;38.522;02/05/2024;.;Stadium;TM2|\
RACETA;D10 - Stadium;3:07.921;27/06/2013;.;Stadium;TM2|\
JaV;D10 - Stadium;3:04.066;18/07/2013;Sub 3:07;Stadium;TM2|\
Demon;D10 - Stadium;3:03.835;28/12/2013;Sub 3:03;Stadium;TM2|\
JaV;D10 - Stadium;3:03.208;28/08/2014;.;Stadium;TM2|\
hugo220;D10 - Stadium;3:02.805;16/06/2017;Sub 3:02;Stadium;TM2|\
fliks;D10 - Stadium;3:01.998;02/07/2017;New cut (1x);Stadium;TM2|\
Ryxsar;D10 - Stadium;2:58.804;31/07/2017;Cut on 5 laps;Stadium;TM2|\
fliks;D10 - Stadium;2:56.735;16/12/2017;Sub 2:58;Stadium;TM2|\
Bluts;D10 - Stadium;2:56.623;30/07/2019;.;Stadium;TM2|\
fliks;D10 - Stadium;2:54.905;04/09/2019;Sub 2:56;Stadium;TM2|\
Bluts;D10 - Stadium;2:54.514;05/09/2019;.;Stadium;TM2|\
Bluts;D10 - Stadium;2:54.350;31/05/2020;.;Stadium;TM2|\
Bluts;D10 - Stadium;2:53.115;26/06/2020;.;Stadium;TM2|\
Bluts;D10 - Stadium;2:52.506;24/01/2022;Sub 2:53;Stadium;TM2|\
Bluts;D10 - Stadium;2:52.141;16/02/2022;.;Stadium;TM2|\
Bluts;D10 - Stadium;2:51.754;25/02/2022;Sub 2:52;Stadium;TM2|\
Flyer;D11 - Stadium;47.486;03/07/2013;.;Stadium;TM2|\
Flyer;D11 - Stadium;47.038;27/07/2013;.;Stadium;TM2|\
Beat;D11 - Stadium;46.931;27/01/2014;Sub 47;Stadium;TM2|\
Flyer;D11 - Stadium;46.913;??/??/????;<05/17;Stadium;TM2|\
CarlJr;D11 - Stadium;47.126;??/05/2017;Spreadsheet;Stadium;TM2|\
Flyer;D11 - Stadium;47.021;??/07/2017;Spreadsheet;Stadium;TM2|\
CarlJr;D11 - Stadium;46.873;16/08/2017;.;Stadium;TM2|\
Flyer;D11 - Stadium;46.813;03/05/2018;.;Stadium;TM2|\
Demon;D11 - Stadium;46.793;23/11/2018;.;Stadium;TM2|\
Spam;D11 - Stadium;46.671;19/12/2018;.;Stadium;TM2|\
DanikB;D11 - Stadium;46.666;25/04/2019;.;Stadium;TM2|\
RACETA;D11 - Stadium;46.644;23/01/2020;.;Stadium;TM2|\
hugo220;D11 - Stadium;46.494;28/05/2020;.;Stadium;TM2|\
CarlJr;D12 - Stadium;54.533;22/06/2013;.;Stadium;TM2|\
Flyer;D12 - Stadium;54.461;27/06/2013;.;Stadium;TM2|\
Madzen;D12 - Stadium;54.229;01/08/2013;.;Stadium;TM2|\
racehans;D12 - Stadium;53.918;02/08/2013;Sub 54;Stadium;TM2|\
Demon;D12 - Stadium;54.786;01/06/2014;.;Stadium;TM2|\
__;D12 - Stadium;54.807;??/05/2017;Spreadsheet;Stadium;TM2|\
racehans;D12 - Stadium;54.708;25/07/2017;.;Stadium;TM2|\
hugo220;D12 - Stadium;53.674;??/08/2017;Spreadsheet;Stadium;TM2|\
hugo220;D12 - Stadium;53.647;??/08/2017;Spreadsheet;Stadium;TM2|\
hugo220;D12 - Stadium;53.544;17/08/2017;.;Stadium;TM2|\
CarlJr;D12 - Stadium;53.481;18/08/2017;.;Stadium;TM2|\
riolu;D12 - Stadium;53.447;18/10/2018;.;Stadium;TM2|\
RACETA;D12 - Stadium;53.413;25/01/2020;DUCK;Stadium;TM2|\
MiThyX;D12 - Stadium;53.388;24/10/2021;.;Stadium;TM2|\
Loupphok;D12 - Stadium;53.348;27/10/2021;.;Stadium;TM2|\
MiThyX;D12 - Stadium;53.345;02/11/2021;.;Stadium;TM2|\
Loupphok;D12 - Stadium;53.324;31/05/2022;.;Stadium;TM2|\
Loupphok;D12 - Stadium;53.295;01/06/2022;.;Stadium;TM2|\
MiThyX;D12 - Stadium;53.282;05/08/2022;.;Stadium;TM2|\
MiThyX;D12 - Stadium;53.271;05/08/2022;.;Stadium;TM2|\
MiThyX;D12 - Stadium;53.230;06/08/2022;.;Stadium;TM2|\
Loupphok;D12 - Stadium;53.228;08/08/2023;.;Stadium;TM2|\
Loupphok;D12 - Stadium;53.200;09/08/2023;.;Stadium;TM2|\
7Alvin;D13 - Stadium;30.154;28/06/2013;.;Stadium;TM2|\
7Alvin;D13 - Stadium;28.497;01/07/2013;New cut;Stadium;TM2|\
7Alvin;D13 - Stadium;28.360;01/07/2013;.;Stadium;TM2|\
Arcanos;D13 - Stadium;27.908;12/07/2015;Sub 28;Stadium;TM2|\
ringoa;D13 - Stadium;28.027;??/05/2017;.;Stadium;TM2|\
ringoa;D13 - Stadium;27.440;??/06/2017;Spreadsheet;Stadium;TM2|\
ringoa;D13 - Stadium;26.887;25/07/2017;New cut;Stadium;TM2|\
Samuel;D13 - Stadium;26.701;25/07/2018;.;Stadium;TM2|\
Samuel;D13 - Stadium;26.665;03/03/2019;.;Stadium;TM2|\
Samuel;D13 - Stadium;26.603;13/09/2019;.;Stadium;TM2|\
Samuel;D13 - Stadium;26.561;01/10/2019;.;Stadium;TM2|\
Samuel;D13 - Stadium;26.523;02/10/2019;.;Stadium;TM2|\
Samuel;D13 - Stadium;26.468;04/10/2019;.;Stadium;TM2|\
Samuel;D13 - Stadium;26.464;14/03/2020;.;Stadium;TM2|\
Samuel;D13 - Stadium;26.420;04/01/2022;.;Stadium;TM2|\
Samuel;D13 - Stadium;26.393;06/01/2022;.;Stadium;TM2|\
Samuel;D13 - Stadium;26.377;09/01/2022;.;Stadium;TM2|\
Phip;D13 - Stadium;26.317;02/08/2023;.;Stadium;TM2|\
Totor;D14 - Stadium;1:02.913;27/06/2013;.;Stadium;TM2|\
Shock77;D14 - Stadium;1:02.229;17/08/2013;.;Stadium;TM2|\
Tatu;D14 - Stadium;1:01.530;14/10/2013;Sub 1:02;Stadium;TM2|\
Shock77;D14 - Stadium;1:01.421;21/09/2015;.;Stadium;TM2|\
Byfjunarn;D14 - Stadium;1:01.598;24/05/2017;.;Stadium;TM2|\
CarlJr;D14 - Stadium;1:01.575;??/07/2017;Spreadsheet;Stadium;TM2|\
hugo220;D14 - Stadium;1:01.428;??/08/2017;.;Stadium;TM2|\
hugo220;D14 - Stadium;1:01.223;17/08/2017;.;Stadium;TM2|\
CarlJr;D14 - Stadium;1:01.144;24/11/2017;.;Stadium;TM2|\
Spam;D14 - Stadium;1:01.105;19/12/2018;.;Stadium;TM2|\
CarlJr;D14 - Stadium;1:00.901;22/04/2020;Sub 1:01;Stadium;TM2|\
Kappa;D14 - Stadium;1:00.861;26/04/2020;.;Stadium;TM2|\
Kappa;D14 - Stadium;1:00.794;28/04/2020;.;Stadium;TM2|\
Kappa;D14 - Stadium;1:00.681;03/05/2020;.;Stadium;TM2|\
Levon;D14 - Stadium;1:00.628;19/08/2022;.;Stadium;TM2|\
RACETA;D14 - Stadium;1:00.601;21/02/2023;.;Stadium;TM2|\
Vogter;D15 - Stadium;7:44.606;30/07/2013;.;Stadium;TM2|\
Tween;D15 - Stadium;7:43.658;30/07/2013;Sub 7:44;Stadium;TM2|\
Tween;D15 - Stadium;7:42.151;24/08/2013;.;Stadium;TM2|\
CarlJr;D15 - Stadium;7:42.481;??/07/2017;Spreadsheet;Stadium;TM2|\
CarlJr;D15 - Stadium;7:40.747;26/11/2017;7 years WR;Stadium;TM2|\
Sapi;D15 - Stadium;7:40.088;06/02/2024;.;Stadium;TM2|\
JaV;E01 - Stadium;1:01.310;18/07/2013;.;Stadium;TM2|\
Wally;E01 - Stadium;1:01.014;20/07/2013;.;Stadium;TM2|\
Wally;E01 - Stadium;1:00.448;22/07/2013;Sub 1:01;Stadium;TM2|\
Scrapie;E01 - Stadium;59.989;25/04/2014;Sub 1:00;Stadium;TM2|\
Jadooky;E01 - Stadium;59.906;28/04/2014;.;Stadium;TM2|\
DanikB;E01 - Stadium;1:00.108;??/05/2017;Spreadsheet;Stadium;TM2|\
Maciey;E01 - Stadium;59.989;30/07/2017;.;Stadium;TM2|\
CarlJr;E01 - Stadium;59.963;30/07/2017;.;Stadium;TM2|\
CarlJr;E01 - Stadium;59.514;14/01/2018;.;Stadium;TM2|\
Spam;E01 - Stadium;59.438;17/09/2018;.;Stadium;TM2|\
Kappa;E01 - Stadium;59.268;08/05/2020;.;Stadium;TM2|\
Loupphok;E01 - Stadium;59.266;16/06/2024;.;Stadium;TM2|\
Wally;E02 - Stadium;57.992;08/07/2013;.;Stadium;TM2|\
Tomsen;E02 - Stadium;57.734;20/08/2013;.;Stadium;TM2|\
vrbica;E02 - Stadium;57.305;25/06/2014;New cut;Stadium;TM2|\
racehans;E02 - Stadium;57.613;30/05/2017;.;Stadium;TM2|\
KevinStrike;E02 - Stadium;56.514;31/05/2017;Sub 57;Stadium;TM2|\
LAMArtifice;E02 - Stadium;55.835;30/11/2017;Sub 56;Stadium;TM2|\
Vulnerra;E02 - Stadium;55.796;05/01/2018;.;Stadium;TM2|\
LAMArtifice;E02 - Stadium;55.358;12/01/2018;.;Stadium;TM2|\
Bluts;E02 - Stadium;55.124;04/08/2019;.;Stadium;TM2|\
Bluts;E02 - Stadium;54.918;04/11/2019;Sub 55;Stadium;TM2|\
Phip;E02 - Stadium;54.850;12/04/2023;New cut;Stadium;TM2|\
Loupphok;E02 - Stadium;54.765;27/06/2024;Non official;Stadium;TM2|\
Tween;E03 - Stadium;1:59.928;24/07/2013;.;Stadium;TM2|\
Peyman;E03 - Stadium;1:59.393;20/07/2014;.;Stadium;TM2|\
riolu;E03 - Stadium;1:57.990;09/09/2015;New cut;Stadium;TM2|\
Spam;E03 - Stadium;1:57.528;14/07/2017;.;Stadium;TM2|\
DexteR;E03 - Stadium;1:57.053;15/07/2017;.;Stadium;TM2|\
CarlJr;E03 - Stadium;1:55.447;17/07/2017;Sub 1:57&1:56;Stadium;TM2|\
Nixotica;E03 - Stadium;1:55.407;05/05/2019;.;Stadium;TM2|\
Kappa;E03 - Stadium;1:55.040;12/05/2020;.;Stadium;TM2|\
Nixotica;E03 - Stadium;1:54.945;14/05/2020;Sub 1:55;Stadium;TM2|\
Kappa;E03 - Stadium;1:53.971;17/05/2020;New trick;Stadium;TM2|\
Yosh;E04 - Stadium;1:58.032;25/06/2013;.;Stadium;TM2|\
WiiDii;E04 - Stadium;1:57.553;19/07/2013;Sub 1:58;Stadium;TM2|\
WiiDii;E04 - Stadium;1:56.953;18/08/2013;Sub 1:57;Stadium;TM2|\
Fire!;E04 - Stadium;1:56.131;??/05/2017;Sub 1:56;Stadium;TM2|\
Yosh;E04 - Stadium;1:55.693;14/11/2017;Sub 1:55;Stadium;TM2|\
Ragha;E04 - Stadium;1:55.385;26/03/2018;Sub 1:56;Stadium;TM2|\
Fire!;E04 - Stadium;1:54.327;??/??/????;> 04/18;Stadium;TM2|\
Fire!;E04 - Stadium;1:53.901;28/09/2019;Sub 1:54;Stadium;TM2|\
Cocho;E04 - Stadium;1:53.807;29/11/2019;.;Stadium;TM2|\
Loupphok;E04 - Stadium;1:53.617;24/01/2023;New cut;Stadium;TM2|\
Loupphok;E04 - Stadium;1:53.498;25/01/2023;.;Stadium;TM2|\
Cocho;E04 - Stadium;1:53.440;28/01/2023;.;Stadium;TM2|\
Cocho;E04 - Stadium;1:53.286;02/02/2023;.;Stadium;TM2|\
Cocho;E04 - Stadium;1:53.078;02/02/2023;.;Stadium;TM2|\
Cocho;E04 - Stadium;1:52.878;02/02/2023;Sub 1:53;Stadium;TM2|\
Coscos;E05 - Stadium;9:05.021;09/07/2013;.;Stadium;TM2|\
Tween;E05 - Stadium;8:50.654;26/07/2013;Sub 9:00;Stadium;TM2|\
Demon;E05 - Stadium;8:50.564;22/08/2013;.;Stadium;TM2|\
Tween;E05 - Stadium;8:47.990;25/08/2013;Sub 8:50;Stadium;TM2|\
JaviFlyer;E05 - Stadium;8:45.292;03/09/2016;Sub 8:47;Stadium;TM2|\
CarlJr;E05 - Stadium;8:44.058;19/09/2017;Sub 8:45;Stadium;TM2|\
Scrapie;E05 - Stadium;8:43.630;29/12/2018;Sub 8:44;Stadium;TM2|\
Rollin;E05 - Stadium;8:42.552;02/01/2019;Sub 8:43;Stadium;TM2|\
DanikB;E05 - Stadium;8:42.113;25/05/2020;.;Stadium;TM2|\
Demon;E05 - Stadium;8:41.302;03/10/2021;Sub 8:41;Stadium;TM2|\
riolu;A01 - Valley;25.554;06/07/2013;.;Valley;TM2|\
Luffy;A01 - Valley;25.553;??/07/2013;.;Valley;TM2|\
riolu;A01 - Valley;25.546;25/07/2013;.;Valley;TM2|\
riolu;A01 - Valley;25.531;16/03/2015;.;Valley;TM2|\
riolu;A01 - Valley;22.461;09/06/2017;.;Valley;TM2|\
riolu;A01 - Valley;25.460;23/06/2017;.;Valley;TM2|\
riolu;A01 - Valley;25.458;23/06/2017;.;Valley;TM2|\
riolu;A01 - Valley;25.450;18/03/2018;.;Valley;TM2|\
Speed;A01 - Valley;25.450;16/04/2021;DUCK;Valley;TM2|\
Speed;A01 - Valley;25.446;17/04/2021;.;Valley;TM2|\
ivan;A01 - Valley;25.437;22/04/2021;BW Overwrite;Valley;TM2|\
Howell;A01 - Valley;25.444;19/02/2023;.;Valley;TM2|\
Howell;A01 - Valley;25.443;19/02/2023;.;Valley;TM2|\
Howell;A01 - Valley;25.440;21/02/2023;.;Valley;TM2|\
Mebe12;A01 - Valley;25.438;24/08/2023;.;Valley;TM2|\
Mebe12;A01 - Valley;25.435;25/08/2023;.;Valley;TM2|\
riolu;A02 - Valley;23.718;14/11/2019;.;Valley;TM2|\
Speed;A02 - Valley;23.713;06/12/2020;DUCK;Valley;TM2|\
Speed;A02 - Valley;23.708;01/08/2021;.;Valley;TM2|\
Mebe12;A02 - Valley;23.698;29/06/2022;.;Valley;TM2|\
BGHM;A03 - Valley;17.917;31/05/2020;.;Valley;TM2|\
BGHM;A03 - Valley;17.914;10/06/2020;.;Valley;TM2|\
Speed;A03 - Valley;17.910;08/10/2023;.;Valley;TM2|\
Mebe12;A03 - Valley;17.905;09/10/2023;.;Valley;TM2|\
riolu;A04 - Valley;22.458;19/05/2019;.;Valley;TM2|\
GravelGuy;A04 - Valley;22.466;05/08/2021;.;Valley;TM2|\
Mebe12;A04 - Valley;22.455;10/11/2022;.;Valley;TM2|\
Speed;A04 - Valley;22.454;05/02/2024;.;Valley;TM2|\
HQCookie;A04 - Valley;22.446;05/02/2024;.;Valley;TM2|\
Mebe12;A04 - Valley;22.444;06/02/2024;.;Valley;TM2|\
Mebe12;A04 - Valley;22.433;06/02/2024;.;Valley;TM2|\
Mebe12;A04 - Valley;22.428;06/02/2024;.;Valley;TM2|\
Mebe12;A04 - Valley;22.426;06/02/2024;.;Valley;TM2|\
Mebe12;A04 - Valley;22.420;06/02/2024;.;Valley;TM2|\
Mebe12;A04 - Valley;22.411;06/02/2024;.;Valley;TM2|\
Mebe12;A04 - Valley;22.401;06/02/2024;.;Valley;TM2|\
Mebe12;A04 - Valley;22.394;10/02/2024;.;Valley;TM2|\
Mebe12;A05 - Valley;-;-;.;Valley;TM2|\
riolu;A06 - Valley;28.280;01/01/2015;.;Valley;TM2|\
Speed;A06 - Valley;28.288;10/06/2021;.;Valley;TM2|\
Mebe12;A06 - Valley;28.264;09/11/2022;DUCK;Valley;TM2|\
Speed;A06 - Valley;28.261;19/09/2023;.;Valley;TM2|\
Mebe12;A06 - Valley;28.255;26/09/2023;.;Valley;TM2|\
Mebe12;A06 - Valley;28.251;05/04/2024;.;Valley;TM2|\
Mebe12;A06 - Valley;28.238;06/05/2024;.;Valley;TM2|\
riolu;A07 - Valley;28.281;13/03/2020;.;Valley;TM2|\
Speed;A07 - Valley;28.274;06/12/2020;.;Valley;TM2|\
Speed;A07 - Valley;28.245;07/12/2020;.;Valley;TM2|\
Mebe12;A07 - Valley;28.244;23/07/2021;.;Valley;TM2|\
Speed;A07 - Valley;28.235;26/07/2021;.;Valley;TM2|\
Mebe12;A07 - Valley;28.221;26/07/2021;.;Valley;TM2|\
Speed;A07 - Valley;28.218;29/07/2021;.;Valley;TM2|\
Mebe12;A07 - Valley;28.197;20/08/2021;.;Valley;TM2|\
BGHM;A08 - Valley;19.551;05/04/2019;.;Valley;TM2|\
Lzfix;A08 - Valley;19.543;15/06/2022;New cut;Valley;TM2|\
BGHM;A08 - Valley;19.528;18/01/2024;New trick;Valley;TM2|\
Mebe12;A08 - Valley;19.438;21/04/2024;.;Valley;TM2|\
riolu;A09 - Valley;26.998;01/05/2020;.;Valley;TM2|\
Speed;A09 - Valley;26.975;04/12/2020;.;Valley;TM2|\
Speed;A09 - Valley;26.965;20/12/2020;.;Valley;TM2|\
Speed;A09 - Valley;26.960;20/12/2020;.;Valley;TM2|\
Speed;A09 - Valley;26.958;21/12/2020;.;Valley;TM2|\
Speed;A09 - Valley;26.951;21/12/2020;.;Valley;TM2|\
Speed;A09 - Valley;26.948;22/12/2020;.;Valley;TM2|\
Speed;A09 - Valley;26.938;24/12/2020;.;Valley;TM2|\
Mebe12;A09 - Valley;26.924;15/08/2022;.;Valley;TM2|\
riolu;A10 - Valley;1:26.495;29/03/2020;.;Valley;TM2|\
Speed;A10 - Valley;1:26.478;05/12/2020;.;Valley;TM2|\
Mebe12;A10 - Valley;1:26.474;29/11/2021;.;Valley;TM2|\
Mebe12;A10 - Valley;1:26.450;29/11/2021;.;Valley;TM2|\
Mebe12;A10 - Valley;1:26.370;29/11/2021;.;Valley;TM2|\
riolu;A11 - Valley;26.441;27/03/2019;.;Valley;TM2|\
ivan;A11 - Valley;26.413;28/07/2020;DUCK;Valley;TM2|\
Mebe12;A11 - Valley;26.408;27/08/2023;.;Valley;TM2|\
GravelGuy;A12 - Valley;31.203;23/18/2018;.;Valley;TM2|\
riolu;A12 - Valley;31.195;27/03/2019;Cheated;Valley;TM2|\
Mebe12;A12 - Valley;31.200;09/08/2022;.;Valley;TM2|\
Mebe12;A12 - Valley;31.198;20/04/2023;.;Valley;TM2|\
Mebe12;A12 - Valley;31.196;21/04/2023;.;Valley;TM2|\
Mebe12;A12 - Valley;31.194;23/04/2023;DUCK;Valley;TM2|\
Howell;A12 - Valley;31.191;26/10/2023;.;Valley;TM2|\
Mebe12;A12 - Valley;31.188;28/10/2023;.;Valley;TM2|\
riolu;A13 - Valley;18.788;17/11/2019;.;Valley;TM2|\
Mebe12;A13 - Valley;18.784;25/07/2021;DUCK;Valley;TM2|\
ivan;A13 - Valley;18.776;14/08/2021;.;Valley;TM2|\
Mebe12;A13 - Valley;18.768;15/08/2021;.;Valley;TM2|\
Speed;A13 - Valley;18.766;17/09/2023;.;Valley;TM2|\
Mebe12;A13 - Valley;18.761;20/09/2023;.;Valley;TM2|\
riolu;A14 - Valley;28.457;23/01/2020;.;Valley;TM2|\
Speed;A14 - Valley;28.446;22/11/2020;DUCK;Valley;TM2|\
Speed;A14 - Valley;28.366;22/11/2020;.;Valley;TM2|\
Mebe12;A14 - Valley;28.347;06/08/2022;.;Valley;TM2|\
Mebe12;A15 - Valley;-;-;.;Valley;TM2|\
riolu;B01 - Valley;-;-;.;Valley;TM2|\
Speed;B01 - Valley;-;-;.;Valley;TM2|\
GravelGuy;B01 - Valley;-;-;.;Valley;TM2|\
Speed;B01 - Valley;-;-;.;Valley;TM2|\
GravelGuy;B01 - Valley;-;-;.;Valley;TM2|\
Speed;B01 - Valley;-;-;.;Valley;TM2|\
GravelGuy;B01 - Valley;-;-;.;Valley;TM2|\
GravelGuy;B01 - Valley;-;-;.;Valley;TM2|\
Mebe12;B01 - Valley;-;-;.;Valley;TM2|\
riolu;B02 - Valley;-;-;.;Valley;TM2|\
GravelGuy;B02 - Valley;-;-;.;Valley;TM2|\
ivan;B02 - Valley;-;-;.;Valley;TM2|\
Speed;B02 - Valley;-;-;.;Valley;TM2|\
ivan;B02 - Valley;-;-;.;Valley;TM2|\
Speed;B02 - Valley;-;-;.;Valley;TM2|\
Mebe12;B02 - Valley;-;-;.;Valley;TM2|\
Speed;B03 - Valley;-;-;.;Valley;TM2|\
Speed;B03 - Valley;-;-;.;Valley;TM2|\
riolu;B04 - Valley;-;-;.;Valley;TM2|\
Mebe12;B04 - Valley;-;-;.;Valley;TM2|\
Mebe12;B05 - Valley;-;-;.;Valley;TM2|\
KAYS;B05 - Valley;-;-;.;Valley;TM2|\
Mebe12;B05 - Valley;1:58.031;-;.;Valley;TM2|\
KAYS;B05 - Valley;1:58.025;14/08/2024;.;Valley;TM2|\
Mebe12;B05 - Valley;1:57.958;16/08/2024;.;Valley;TM2|\
KAYS;B05 - Valley;1:57.905;17/08/2024;.;Valley;TM2|\
riolu;B06 - Valley;-;-;.;Valley;TM2|\
Speed;B06 - Valley;-;-;.;Valley;TM2|\
Howell;B06 - Valley;-;-;.;Valley;TM2|\
riolu;B07 - Valley;-;-;.;Valley;TM2|\
Speed;B07 - Valley;-;-;.;Valley;TM2|\
SzNaJdeR;B08 - Valley;-;-;.;Valley;TM2|\
Mebe12;B08 - Valley;-;-;.;Valley;TM2|\
fanakuri;B08 - Valley;-;-;.;Valley;TM2|\
riolu;B09 - Valley;-;-;.;Valley;TM2|\
Speed;B09 - Valley;-;-;.;Valley;TM2|\
Speed;B09 - Valley;-;-;.;Valley;TM2|\
GravelGuy;B09 - Valley;-;-;.;Valley;TM2|\
Mebe12;B09 - Valley;-;-;.;Valley;TM2|\
riolu;B10 - Valley;-;-;.;Valley;TM2|\
Speed;B10 - Valley;-;-;.;Valley;TM2|\
Speed;B10 - Valley;-;-;.;Valley;TM2|\
Speed;B10 - Valley;-;-;.;Valley;TM2|\
styx;B10 - Valley;-;-;.;Valley;TM2|\
riolu;B11 - Valley;33.842;-;.;Valley;TM2|\
ender;B11 - Valley;33.77x;??/??/2019;.;Valley;TM2|\
riolu;B11 - Valley;33.765;29/11/2019;.;Valley;TM2|\
Speed;B11 - Valley;33.745;03/12/2019;.;Valley;TM2|\
riolu;B11 - Valley;33.738;03/12/2019;.;Valley;TM2|\
Speed;B11 - Valley;33.718;19/09/2020;.;Valley;TM2|\
Speed;B11 - Valley;33.712;20/09/2020;.;Valley;TM2|\
Speed;B11 - Valley;33.698;20/09/2020;.;Valley;TM2|\
Mebe12;B11 - Valley;33.645;14/08/2021;.;Valley;TM2|\
GravelGuy;B11 - Valley;33.644;30/11/2021;.;Valley;TM2|\
Mebe12;B11 - Valley;33.625;02/12/2021;.;Valley;TM2|\
riolu;B12 - Valley;-;-;.;Valley;TM2|\
Speed;B12 - Valley;-;-;.;Valley;TM2|\
Speed;B12 - Valley;-;-;.;Valley;TM2|\
Speed;B12 - Valley;-;-;.;Valley;TM2|\
Speed;B12 - Valley;-;-;.;Valley;TM2|\
Speed;B12 - Valley;-;-;.;Valley;TM2|\
Speed;B12 - Valley;-;-;.;Valley;TM2|\
Speed;B12 - Valley;-;-;.;Valley;TM2|\
Speed;B12 - Valley;-;-;.;Valley;TM2|\
Howell;B12 - Valley;-;-;.;Valley;TM2|\
riolu;B13 - Valley;-;-;.;Valley;TM2|\
styx;B13 - Valley;-;-;.;Valley;TM2|\
Mebe12;B13 - Valley;-;-;.;Valley;TM2|\
Mebe12;B13 - Valley;-;-;.;Valley;TM2|\
Mebe12;B13 - Valley;-;-;.;Valley;TM2|\
riolu;B14 - Valley;-;-;.;Valley;TM2|\
Speed;B14 - Valley;-;-;.;Valley;TM2|\
GravelGuy;B14 - Valley;-;-;.;Valley;TM2|\
Speed;B14 - Valley;-;-;.;Valley;TM2|\
Speed;B14 - Valley;-;-;.;Valley;TM2|\
Speed;B14 - Valley;-;-;.;Valley;TM2|\
riolu;B15 - Valley;-;-;.;Valley;TM2|\
Speed;B15 - Valley;-;-;.;Valley;TM2|\
Speed;B15 - Valley;-;-;.;Valley;TM2|\
Speed;B15 - Valley;-;-;.;Valley;TM2|\
Speed;B15 - Valley;-;-;.;Valley;TM2|\
Speed;B15 - Valley;-;-;.;Valley;TM2|\
Speed;B15 - Valley;-;-;.;Valley;TM2|\
Speed;B15 - Valley;-;-;.;Valley;TM2|\
riolu;C01 - Valley;-;-;.;Valley;TM2|\
Speed;C01 - Valley;-;-;.;Valley;TM2|\
Speed;C01 - Valley;-;-;.;Valley;TM2|\
Mebe12;C01 - Valley;-;-;.;Valley;TM2|\
HQCookie;C01 - Valley;-;-;.;Valley;TM2|\
Mebe12;C01 - Valley;-;-;.;Valley;TM2|\
Mebe12;C01 - Valley;-;-;.;Valley;TM2|\
Mebe12;C01 - Valley;-;-;.;Valley;TM2|\
riolu;C02 - Valley;-;-;.;Valley;TM2|\
Speed;C02 - Valley;-;-;.;Valley;TM2|\
Mebe12;C02 - Valley;-;-;.;Valley;TM2|\
HQCookie;C02 - Valley;-;-;.;Valley;TM2|\
HQCookie;C02 - Valley;-;-;.;Valley;TM2|\
Mebe12;C02 - Valley;-;-;.;Valley;TM2|\
Mebe12;C02 - Valley;-;-;.;Valley;TM2|\
Mebe12;C02 - Valley;-;-;.;Valley;TM2|\
BigBang1112;C03 - Valley;-;-;.;Valley;TM2|\
Speed;C03 - Valley;-;-;.;Valley;TM2|\
Mebe12;C03 - Valley;-;-;.;Valley;TM2|\
Mebe12;C03 - Valley;-;-;.;Valley;TM2|\
riolu;C04 - Valley;-;-;.;Valley;TM2|\
Speed;C04 - Valley;-;-;.;Valley;TM2|\
Mebe12;C04 - Valley;-;-;.;Valley;TM2|\
riolu;C05 - Valley;-;-;.;Valley;TM2|\
Speed;C05 - Valley;-;-;.;Valley;TM2|\
Speed;C05 - Valley;-;-;.;Valley;TM2|\
Mebe12;C05 - Valley;-;-;.;Valley;TM2|\
Speed;C05 - Valley;-;-;.;Valley;TM2|\
Mebe12;C05 - Valley;-;-;.;Valley;TM2|\
Speed;C05 - Valley;-;-;.;Valley;TM2|\
Mebe12;C05 - Valley;-;-;.;Valley;TM2|\
Speed;C05 - Valley;-;-;.;Valley;TM2|\
Mebe12;C05 - Valley;-;-;.;Valley;TM2|\
riolu;C06 - Valley;-;-;.;Valley;TM2|\
Speed;C06 - Valley;-;-;.;Valley;TM2|\
Mad.dox;C06 - Valley;-;-;.;Valley;TM2|\
Speed;C06 - Valley;-;-;.;Valley;TM2|\
Speed;C06 - Valley;-;-;.;Valley;TM2|\
Speed;C06 - Valley;-;-;.;Valley;TM2|\
Speed;C06 - Valley;-;-;.;Valley;TM2|\
Speed;C06 - Valley;-;-;.;Valley;TM2|\
Speed;C06 - Valley;-;-;.;Valley;TM2|\
Speed;C06 - Valley;-;-;.;Valley;TM2|\
Mebe12;C06 - Valley;-;-;.;Valley;TM2|\
riolu;C07 - Valley;-;-;.;Valley;TM2|\
Speed;C07 - Valley;-;-;.;Valley;TM2|\
Speed;C07 - Valley;-;-;.;Valley;TM2|\
Mebe12;C07 - Valley;-;-;.;Valley;TM2|\
HQCookie;C07 - Valley;-;-;.;Valley;TM2|\
Mebe12;C07 - Valley;-;-;.;Valley;TM2|\
riolu;C08 - Valley;-;-;.;Valley;TM2|\
Speed;C08 - Valley;-;-;.;Valley;TM2|\
GravelGuy;C08 - Valley;-;-;.;Valley;TM2|\
Speed;C08 - Valley;-;-;.;Valley;TM2|\
Speed;C08 - Valley;-;-;.;Valley;TM2|\
Speed;C08 - Valley;-;-;.;Valley;TM2|\
riolu;C09 - Valley;-;-;.;Valley;TM2|\
Speed;C09 - Valley;-;-;.;Valley;TM2|\
Speed;C09 - Valley;-;-;.;Valley;TM2|\
Speed;C09 - Valley;-;-;.;Valley;TM2|\
Speed;C09 - Valley;-;-;.;Valley;TM2|\
Speed;C09 - Valley;-;-;.;Valley;TM2|\
Speed;C09 - Valley;-;-;.;Valley;TM2|\
Speed;C09 - Valley;-;-;.;Valley;TM2|\
riolu;C10 - Valley;-;-;.;Valley;TM2|\
Speed;C10 - Valley;-;-;.;Valley;TM2|\
Speed;C10 - Valley;-;-;.;Valley;TM2|\
Speed;C10 - Valley;-;-;.;Valley;TM2|\
riolu;C11 - Valley;-;-;.;Valley;TM2|\
Speed;C11 - Valley;-;-;.;Valley;TM2|\
Speed;C11 - Valley;-;-;.;Valley;TM2|\
Speed;C11 - Valley;-;-;.;Valley;TM2|\
Speed;C11 - Valley;-;-;.;Valley;TM2|\
Speed;C11 - Valley;-;-;.;Valley;TM2|\
AM98;C11 - Valley;-;-;.;Valley;TM2|\
riolu;C12 - Valley;-;-;.;Valley;TM2|\
Speed;C12 - Valley;-;-;.;Valley;TM2|\
Speed;C12 - Valley;-;-;.;Valley;TM2|\
Joltysonic;C13 - Valley;30.729;03/08/2013;.;Valley;TM2|\
L94;C13 - Valley;30.622;23/08/2013;.;Valley;TM2|\
Joltysonic;C13 - Valley;30.547;02/09/2013;.;Valley;TM2|\
BigBang1112;C13 - Valley;30.352;23/08/2015;.;Valley;TM2|\
BigBang1112;C13 - Valley;30.154;18/12/2015;.;Valley;TM2|\
BigBang1112;C13 - Valley;30.005;04/02/2016;.;Valley;TM2|\
BigBang1112;C13 - Valley;29.899;14/02/2016;.;Valley;TM2|\
BigBang1112;C13 - Valley;29.894;29/02/2016;.;Valley;TM2|\
BigBang1112;C13 - Valley;29.795;17/05/2017;.;Valley;TM2|\
riolu;C13 - Valley;29.645;??/10/2017;.;Valley;TM2|\
BigBang1112;C13 - Valley;29.603;12/10/2017;.;Valley;TM2|\
riolu;C13 - Valley;29.470;14/10/2017;.;Valley;TM2|\
BigBang1112;C13 - Valley;29.455;03/05/2020;.;Valley;TM2|\
Speed;C13 - Valley;29.433;03/10/2023;.;Valley;TM2|\
riolu;C14 - Valley;-;-;.;Valley;TM2|\
Speed;C14 - Valley;-;-;.;Valley;TM2|\
Speed;C14 - Valley;-;-;.;Valley;TM2|\
Speed;C14 - Valley;-;-;.;Valley;TM2|\
Speed;C14 - Valley;-;-;.;Valley;TM2|\
Speed;C14 - Valley;-;-;.;Valley;TM2|\
Mebe12;C14 - Valley;-;-;.;Valley;TM2|\
riolu;C15 - Valley;-;-;.;Valley;TM2|\
Speed;C15 - Valley;-;-;.;Valley;TM2|\
Speed;C15 - Valley;-;-;.;Valley;TM2|\
Speed;C15 - Valley;-;-;.;Valley;TM2|\
Mebe12;C15 - Valley;-;-;.;Valley;TM2|\
riolu;D01 - Valley;-;-;.;Valley;TM2|\
Speed;D01 - Valley;-;-;.;Valley;TM2|\
Speed;D01 - Valley;-;-;.;Valley;TM2|\
Speed;D01 - Valley;-;-;.;Valley;TM2|\
Mebe12;D01 - Valley;-;-;.;Valley;TM2|\
Speed;D01 - Valley;-;-;.;Valley;TM2|\
Mebe12;D01 - Valley;-;-;.;Valley;TM2|\
Speed;D01 - Valley;-;-;.;Valley;TM2|\
Mebe12;D01 - Valley;-;-;.;Valley;TM2|\
riolu;D02 - Valley;-;-;.;Valley;TM2|\
Speed;D02 - Valley;-;-;.;Valley;TM2|\
Mebe12;D02 - Valley;-;-;.;Valley;TM2|\
Speed;D02 - Valley;-;-;.;Valley;TM2|\
Speed;D02 - Valley;-;-;.;Valley;TM2|\
Speed;D02 - Valley;-;-;.;Valley;TM2|\
Mebe12;D02 - Valley;-;-;.;Valley;TM2|\
riolu;D03 - Valley;-;-;.;Valley;TM2|\
Speed;D03 - Valley;-;-;.;Valley;TM2|\
Mebe12;D03 - Valley;-;-;.;Valley;TM2|\
Howell;D03 - Valley;-;-;.;Valley;TM2|\
Mebe12;D03 - Valley;-;-;.;Valley;TM2|\
riolu;D04 - Valley;-;-;.;Valley;TM2|\
Speed;D04 - Valley;-;-;.;Valley;TM2|\
Speed;D04 - Valley;-;-;.;Valley;TM2|\
fanakuri;D04 - Valley;-;-;.;Valley;TM2|\
GravelGuy;D04 - Valley;-;-;.;Valley;TM2|\
fanakuri;D04 - Valley;-;-;.;Valley;TM2|\
fanakuri;D04 - Valley;-;-;.;Valley;TM2|\
fanakuri;D04 - Valley;-;-;.;Valley;TM2|\
riolu;D05 - Valley;-;-;.;Valley;TM2|\
Speed;D05 - Valley;-;-;.;Valley;TM2|\
Speed;D05 - Valley;-;-;.;Valley;TM2|\
Speed;D06 - Valley;-;-;.;Valley;TM2|\
GravelGuy;D06 - Valley;-;-;.;Valley;TM2|\
Speed;D06 - Valley;-;-;.;Valley;TM2|\
Speed;D06 - Valley;-;-;.;Valley;TM2|\
Speed;D06 - Valley;-;-;.;Valley;TM2|\
Speed;D06 - Valley;-;-;.;Valley;TM2|\
Speed;D06 - Valley;-;-;.;Valley;TM2|\
Speed;D06 - Valley;-;-;.;Valley;TM2|\
Speed;D06 - Valley;-;-;.;Valley;TM2|\
riolu;D07 - Valley;-;-;.;Valley;TM2|\
Speed;D07 - Valley;-;-;.;Valley;TM2|\
Mebe12;D07 - Valley;-;-;.;Valley;TM2|\
Howell;D07 - Valley;-;-;.;Valley;TM2|\
Mebe12;D07 - Valley;-;-;.;Valley;TM2|\
BigBang1112;D08 - Valley;-;-;.;Valley;TM2|\
Speed;D08 - Valley;-;-;.;Valley;TM2|\
BigBang1112;D08 - Valley;-;-;.;Valley;TM2|\
riolu;D09 - Valley;-;-;.;Valley;TM2|\
Speed;D09 - Valley;-;-;.;Valley;TM2|\
Speed;D09 - Valley;-;-;.;Valley;TM2|\
Mebe12;D09 - Valley;-;-;.;Valley;TM2|\
riolu;D10 - Valley;-;-;.;Valley;TM2|\
GravelGuy;D10 - Valley;-;-;.;Valley;TM2|\
Speed;D10 - Valley;-;-;.;Valley;TM2|\
Mebe12;D10 - Valley;-;-;.;Valley;TM2|\
riolu;D11 - Valley;-;-;.;Valley;TM2|\
BigBang1112;D11 - Valley;-;-;.;Valley;TM2|\
BigBang1112;D11 - Valley;-;-;.;Valley;TM2|\
BigBang1112;D11 - Valley;-;-;.;Valley;TM2|\
Speed;D11 - Valley;-;-;.;Valley;TM2|\
riolu;D12 - Valley;-;-;.;Valley;TM2|\
Speed;D12 - Valley;-;-;.;Valley;TM2|\
Mebe12;D12 - Valley;-;-;.;Valley;TM2|\
Mebe12;D12 - Valley;-;-;.;Valley;TM2|\
riolu;D13 - Valley;-;-;.;Valley;TM2|\
Speed;D13 - Valley;-;-;.;Valley;TM2|\
riolu;D14 - Valley;-;-;.;Valley;TM2|\
BigBang1112;D14 - Valley;-;-;.;Valley;TM2|\
Mebe12;D14 - Valley;-;-;.;Valley;TM2|\
BigBang1112;D14 - Valley;-;-;.;Valley;TM2|\
Mebe12;D14 - Valley;-;-;.;Valley;TM2|\
Speed;D14 - Valley;-;-;.;Valley;TM2|\
Mebe12;D14 - Valley;-;-;.;Valley;TM2|\
riolu;D15 - Valley;-;-;.;Valley;TM2|\
Speed;D15 - Valley;-;-;.;Valley;TM2|\
Speed;D15 - Valley;-;-;.;Valley;TM2|\
GravelGuy;D15 - Valley;-;-;.;Valley;TM2|\
Mebe12;D15 - Valley;-;-;.;Valley;TM2|\
riolu;E01 - Valley;-;-;.;Valley;TM2|\
Speed;E01 - Valley;-;-;.;Valley;TM2|\
Speed;E01 - Valley;-;-;.;Valley;TM2|\
Speed;E01 - Valley;-;-;.;Valley;TM2|\
Speed;E01 - Valley;-;-;.;Valley;TM2|\
BigBang1112;E02 - Valley;-;-;.;Valley;TM2|\
riolu;E03 - Valley;-;-;.;Valley;TM2|\
Speed;E03 - Valley;-;-;.;Valley;TM2|\
Mebe12;E03 - Valley;-;-;.;Valley;TM2|\
riolu;E04 - Valley;-;-;.;Valley;TM2|\
Speed;E04 - Valley;-;-;.;Valley;TM2|\
riolu;E04 - Valley;-;-;.;Valley;TM2|\
Speed;E04 - Valley;-;-;.;Valley;TM2|\
Speed;E04 - Valley;-;-;.;Valley;TM2|\
Speed;E04 - Valley;-;-;.;Valley;TM2|\
Speed;E04 - Valley;-;-;.;Valley;TM2|\
Speed;E04 - Valley;-;-;.;Valley;TM2|\
Mebe12;E04 - Valley;-;-;.;Valley;TM2|\
riolu;E05 - Valley;-;-;.;Valley;TM2|\
GravelGuy;E05 - Valley;-;-;.;Valley;TM2|\
GravelGuy;E05 - Valley;-;-;.;Valley;TM2|\
Mebe12;E05 - Valley;-;-;.;Valley;TM2|\
GravelGuy;E05 - Valley;-;-;.;Valley;TM2|\
GravelGuy;E05 - Valley;-;-;.;Valley;TM2|\
Mebe12;E05 - Valley;-;-;.;Valley;TM2|\
GravelGuy;E05 - Valley;-;-;.;Valley;TM2|\
GravelGuy;E05 - Valley;-;-;.;Valley;TM2|\
Mebe12;E05 - Valley;-;-;.;Valley;TM2|\
riolu;A01 - Lagoon;23.550;25/05/2017;.;Lagoon;TM2|\
riolu;A01 - Lagoon;23.536;09/06/2017;.;Lagoon;TM2|\
XoN;A01 - Lagoon;23.525;29/12/2019;.;Lagoon;TM2|\
riolu;A01 - Lagoon;23.505;??/??/2019;.;Lagoon;TM2|\
riolu;A01 - Lagoon;23.495;31/01/2020;Cheated;Lagoon;TM2|\
7777Alex7777;A01 - Lagoon;23.491;16/02/2020;.;Lagoon;TM2|\
riolu;A01 - Lagoon;23.480;17/02/2020;Cheated;Lagoon;TM2|\
7777Alex7777;A01 - Lagoon;23.477;25/02/2020;.;Lagoon;TM2|\
7777Alex7777;A01 - Lagoon;23.474;03/03/2020;.;Lagoon;TM2|\
riolu;A01 - Lagoon;23.463;26/04/2020;Cheated;Lagoon;TM2|\
Thoringer;A01 - Lagoon;23.462;30/01/2021;Cheated;Lagoon;TM2|\
Flechetas;A01 - Lagoon;23.464;06/11/2021;.;Lagoon;TM2|\
Flechetas;A01 - Lagoon;23.461;12/11/2021;DUCK;Lagoon;TM2|\
Flechetas;A01 - Lagoon;23.460;14/11/2021;.;Lagoon;TM2|\
Flechetas;A01 - Lagoon;23.456;15/11/2021;.;Lagoon;TM2|\
eddyey;A01 - Lagoon;23.452;02/06/2024;.;Lagoon;TM2|\
7777Alex7777;A02 - Lagoon;27.462;27/03/2020;.;Lagoon;TM2|\
riolu;A02 - Lagoon;27.457;26/04/2020;Cheated;Lagoon;TM2|\
Thoringer;A02 - Lagoon;27.451;12/12/2020;Cheated;Lagoon;TM2|\
Nemesis;A02 - Lagoon;27.461;20/05/2022;.;Lagoon;TM2|\
Nemesis;A02 - Lagoon;27.451;22/04/2023;DUCK;Lagoon;TM2|\
riolu;A03 - Lagoon;23.323;19/03/2019;Cheated;Lagoon;TM2|\
Flechetas;A03 - Lagoon;23.331;04/10/2021;.;Lagoon;TM2|\
Flechetas;A03 - Lagoon;23.324;12/10/2021;.;Lagoon;TM2|\
Flechetas;A03 - Lagoon;23.315;21/10/2021;DUCK;Lagoon;TM2|\
eddyey;A03 - Lagoon;23.311;23/05/2023;.;Lagoon;TM2|\
DarkLink94;A04 - Lagoon;18.587;12/08/2019;.;Lagoon;TM2|\
riolu;A04 - Lagoon;18.568;13/08/2019;Cheated;Lagoon;TM2|\
Thoringer;A04 - Lagoon;18.562;06/12/2020;Cheated;Lagoon;TM2|\
Nemesis;A04 - Lagoon;18.584;20/11/2021;.;Lagoon;TM2|\
Flechetas;A04 - Lagoon;18.578;21/11/2021;.;Lagoon;TM2|\
Nemesis;A04 - Lagoon;18.567;27/11/2021;DUCK;Lagoon;TM2|\
Nemesis;A04 - Lagoon;18.565;07/08/2023;.;Lagoon;TM2|\
eddyey;A04 - Lagoon;18.563;13/07/2024;.;Lagoon;TM2|\
eddyey;A04 - Lagoon;18.555;14/07/2024;.;Lagoon;TM2|\
DarkLink94;A05 - Lagoon;39.048;02/12/2017;.;Lagoon;TM2|\
riolu;A05 - Lagoon;39.005;04/02/2020;Cheated;Lagoon;TM2|\
Thoringer;A05 - Lagoon;38.983;04/10/2020;Cheated;Lagoon;TM2|\
Nemesis;A05 - Lagoon;39.032;10/02/2022;.;Lagoon;TM2|\
Samerlifofwer;A05 - Lagoon;39.028;17/03/2023;.;Lagoon;TM2|\
Samerlifofwer;A05 - Lagoon;38.990;18/03/2023;DUCK;Lagoon;TM2|\
Quasar;A05 - Lagoon;38.976;28/03/2023;DUCK;Lagoon;TM2|\
Samerlifofwer;A05 - Lagoon;38.965;31/03/2023;.;Lagoon;TM2|\
Quasar;A05 - Lagoon;38.944;31/03/2023;.;Lagoon;TM2|\
Quasar;A05 - Lagoon;38.940;31/03/2023;.;Lagoon;TM2|\
Nemesis;A05 - Lagoon;38.928;06/05/2023;.;Lagoon;TM2|\
Nemesis;A05 - Lagoon;38.906;07/05/2023;.;Lagoon;TM2|\
riolu;A06 - Lagoon;23.228;26/05/2020;Cheated;Lagoon;TM2|\
Flechetas;A06 - Lagoon;23.238;11/09/2021;.;Lagoon;TM2|\
Flechetas;A06 - Lagoon;23.228;27/09/2021;DUCK;Lagoon;TM2|\
eddyey;A06 - Lagoon;23.215;01/05/2024;.;Lagoon;TM2|\
eddyey;A06 - Lagoon;23.211;01/05/2024;.;Lagoon;TM2|\
mime;A07 - Lagoon;18.391;17/02/2020;.;Lagoon;TM2|\
Gyrule;A07 - Lagoon;18.390;27/02/2020;.;Lagoon;TM2|\
mime;A07 - Lagoon;18.388;28/02/2020;.;Lagoon;TM2|\
mime;A07 - Lagoon;18.386;30/10/2020;.;Lagoon;TM2|\
Gyrule;A07 - Lagoon;18.383;31/10/2020;.;Lagoon;TM2|\
Speed;A07 - Lagoon;18.377;03/07/2022;.;Lagoon;TM2|\
BGHM;A08 - Lagoon;17.708;26/04/2019;.;Lagoon;TM2|\
ivan;A08 - Lagoon;17.698;21/03/2021;.;Lagoon;TM2|\
mime;A08 - Lagoon;17.697;22/03/2021;.;Lagoon;TM2|\
Mebe12;A08 - Lagoon;17.664;24/03/2021;.;Lagoon;TM2|\
mime;A08 - Lagoon;17.651;26/03/2021;.;Lagoon;TM2|\
ivan;A08 - Lagoon;17.637;01/04/2021;.;Lagoon;TM2|\
BGHM;A08 - Lagoon;17.636;01/04/2024;.;Lagoon;TM2|\
Techno;A09 - Lagoon;20.390;16/11/2019;Cheated;Lagoon;TM2|\
riolu;A09 - Lagoon;20.351;17/11/2019;Cheated;Lagoon;TM2|\
Nemesis;A09 - Lagoon;20.406;16/03/2020;.;Lagoon;TM2|\
Thoringer;A09 - Lagoon;20.348;26/01/2021;Cheated;Lagoon;TM2|\
Nemesis;A09 - Lagoon;20.390;17/04/2022;DUCK;Lagoon;TM2|\
Nemesis;A09 - Lagoon;20.388;30/04/2023;.;Lagoon;TM2|\
Nemesis;A09 - Lagoon;20.378;30/04/2023;.;Lagoon;TM2|\
eddyey;A09 - Lagoon;20.376;09/04/2023;.;Lagoon;TM2|\
eddyey;A09 - Lagoon;20.368;09/04/2023;.;Lagoon;TM2|\
eddyey;A09 - Lagoon;20.361;28/04/2023;.;Lagoon;TM2|\
Nemesis;A09 - Lagoon;20.351;29/07/2023;DUCK;Lagoon;TM2|\
Techno;A10 - Lagoon;37.918;28/05/2017;Cheated;Lagoon;TM2|\
riolu;A10 - Lagoon;37.895;29/05/2017;Cheated;Lagoon;TM2|\
Nemesis;A10 - Lagoon;37.968;06/03/2020;.;Lagoon;TM2|\
Thoringer;A10 - Lagoon;37.890;05/10/2020;Cheated;Lagoon;TM2|\
Thoringer;A10 - Lagoon;37.878;15/12/2020;Cheated;Lagoon;TM2|\
Flechetas;A10 - Lagoon;37.954;26/10/2021;.;Lagoon;TM2|\
Nemesis;A10 - Lagoon;37.948;20/11/2021;.;Lagoon;TM2|\
Nemesis;A10 - Lagoon;37.927;21/04/2023;.;Lagoon;TM2|\
Nemesis;A10 - Lagoon;37.911;22/04/2023;.;Lagoon;TM2|\
Nemesis;A10 - Lagoon;37.902;22/04/2023;.;Lagoon;TM2|\
Nemesis;A10 - Lagoon;37.895;23/04/2023;.;Lagoon;TM2|\
Nemesis;A10 - Lagoon;37.881;28/04/2023;DUCK;Lagoon;TM2|\
Nemesis;A10 - Lagoon;37.878;29/04/2023;DUCK;Lagoon;TM2|\
Nemesis;A10 - Lagoon;37.856;18/05/2023;.;Lagoon;TM2|\
riolu;A11 - Lagoon;22.918;28/11/2019;Cheated;Lagoon;TM2|\
mime;A11 - Lagoon;22.595;10/06/2020;New cut;Lagoon;TM2|\
ivan;A11 - Lagoon;22.385;14/01/2021;.;Lagoon;TM2|\
Speed;A11 - Lagoon;22.318;21/05/2022;.;Lagoon;TM2|\
Mebe12;A11 - Lagoon;22.180;10/07/2022;.;Lagoon;TM2|\
riolu;A12 - Lagoon;24.224;08/08/2017;Cheated;Lagoon;TM2|\
Thoringer;A12 - Lagoon;24.221;14/02/2021;Cheated;Lagoon;TM2|\
Gyrule;A12 - Lagoon;24.236;12/09/2021;.;Lagoon;TM2|\
Flechetas;A12 - Lagoon;24.231;12/09/2021;.;Lagoon;TM2|\
Flechetas;A12 - Lagoon;24.225;13/09/2021;.;Lagoon;TM2|\
Flechetas;A12 - Lagoon;24.222;13/09/2021;DUCK;Lagoon;TM2|\
Flechetas;A12 - Lagoon;24.214;15/09/2021;DUCK;Lagoon;TM2|\
Flechetas;A12 - Lagoon;24.210;22/09/2021;.;Lagoon;TM2|\
Flechetas;A12 - Lagoon;24.207;05/12/2022;.;Lagoon;TM2|\
Flechetas;A12 - Lagoon;24.205;08/09/2023;.;Lagoon;TM2|\
Flechetas;A12 - Lagoon;24.200;10/09/2023;.;Lagoon;TM2|\
Flechetas;A12 - Lagoon;24.198;01/02/2024;.;Lagoon;TM2|\
Flechetas;A12 - Lagoon;24.193;02/02/2024;.;Lagoon;TM2|\
juvo;A13 - Lagoon;17.954;28/07/2017;.;Lagoon;TM2|\
mime;A13 - Lagoon;17.785;16/06/2020;.;Lagoon;TM2|\
dragonpntm;A13 - Lagoon;17.545;15/03/2021;.;Lagoon;TM2|\
riolu;A14 - Lagoon;29.908;25/09/2017;Cheated;Lagoon;TM2|\
racerlight;A14 - Lagoon;29.971;20/07/2018;.;Lagoon;TM2|\
Techno;A14 - Lagoon;29.934;14/05/2020;Cheated;Lagoon;TM2|\
Nemesis;A14 - Lagoon;29.900;05/12/2021;DUCK;Lagoon;TM2|\
Speed;A14 - Lagoon;29.875;20/04/2022;.;Lagoon;TM2|\
Nemesis;A14 - Lagoon;29.839;13/05/2022;.;Lagoon;TM2|\
Mebe12;A14 - Lagoon;29.818;08/07/2022;.;Lagoon;TM2|\
Nemesis;A14 - Lagoon;29.759;21/08/2022;.;Lagoon;TM2|\
eddyey;A14 - Lagoon;29.758;16/05/2024;.;Lagoon;TM2|\
riolu;A15 - Lagoon;1:04.208;18/03/2019;Cheated;Lagoon;TM2|\
DarkLink94;A15 - Lagoon;1:04.197;23/02/2021;.;Lagoon;TM2|\
DarkLink94;A15 - Lagoon;1:03.940;22/05/2021;.;Lagoon;TM2|\
Speed;A15 - Lagoon;1:03.913;11/10/2021;.;Lagoon;TM2|\
Speed;A15 - Lagoon;1:03.772;17/10/2021;.;Lagoon;TM2|\
eddyey;A15 - Lagoon;1:03.751;06/05/2023;.;Lagoon;TM2|\
riolu;B01 - Lagoon;30.074;20/03/2020;Cheated;Lagoon;TM2|\
7777Alex7777;B01 - Lagoon;30.092;20/03/2020;.;Lagoon;TM2|\
Thoringer;B01 - Lagoon;30.068;30/01/2021;Cheated;Lagoon;TM2|\
Speed;B01 - Lagoon;30.090;10/05/2022;.;Lagoon;TM2|\
Nemesis;B01 - Lagoon;30.088;25/09/2022;.;Lagoon;TM2|\
Nemesis;B01 - Lagoon;30.087;09/06/2023;.;Lagoon;TM2|\
Nemesis;B01 - Lagoon;30.085;10/06/2023;.;Lagoon;TM2|\
Nemesis;B01 - Lagoon;30.084;06/07/2023;.;Lagoon;TM2|\
Nemesis;B01 - Lagoon;30.083;08/07/2023;.;Lagoon;TM2|\
Nemesis;B01 - Lagoon;30.078;08/07/2023;.;Lagoon;TM2|\
Nemesis;B01 - Lagoon;30.077;22/07/2023;.;Lagoon;TM2|\
Nemesis;B01 - Lagoon;30.070;22/07/2023;DUCK;Lagoon;TM2|\
Nemesis;B01 - Lagoon;30.063;13/03/2024;DUCK;Lagoon;TM2|\
Nemesis;B01 - Lagoon;30.061;13/03/2024;.;Lagoon;TM2|\
riolu;B02 - Lagoon;30.805;25/02/2019;Cheated;Lagoon;TM2|\
Thoringer;B02 - Lagoon;30.782;07/12/2020;Cheated;Lagoon;TM2|\
ivan;B02 - Lagoon;30.815;02/04/2021;.;Lagoon;TM2|\
Nemesis;B02 - Lagoon;30.812;29/05/2022;.;Lagoon;TM2|\
Quasar;B02 - Lagoon;30.795;28/02/2022;DUCK;Lagoon;TM2|\
Nemesis;B02 - Lagoon;30.785;28/01/2023;.;Lagoon;TM2|\
eddyey;B02 - Lagoon;30.783;25/06/2024;.;Lagoon;TM2|\
eddyey;B02 - Lagoon;30.767;30/06/2024;DUCK;Lagoon;TM2|\
riolu;B03 - Lagoon;20.697;05/12/2019;.;Lagoon;TM2|\
Mebe12;B03 - Lagoon;20.685;19/03/2021;DUCK;Lagoon;TM2|\
eddyey;B03 - Lagoon;20.666;20/08/2023;.;Lagoon;TM2|\
mime;B04 - Lagoon;30.344;03/05/2020;.;Lagoon;TM2|\
Techno;B04 - Lagoon;30.270;19/05/2020;Cheated;Lagoon;TM2|\
riolu;B04 - Lagoon;30.260;26/05/2020;Cheated;Lagoon;TM2|\
Nemesis;B04 - Lagoon;30.332;23/10/2021;.;Lagoon;TM2|\
Gyrule;B04 - Lagoon;30.327;28/10/2021;.;Lagoon;TM2|\
Nemesis;B04 - Lagoon;30.312;30/10/2021;.;Lagoon;TM2|\
Speed;B04 - Lagoon;30.305;27/07/2022;.;Lagoon;TM2|\
Speed;B04 - Lagoon;30.271;29/07/2022;.;Lagoon;TM2|\
Nemesis;B04 - Lagoon;30.265;23/08/2022;DUCK;Lagoon;TM2|\
Nemesis;B04 - Lagoon;30.236;26/08/2022;DUCK;Lagoon;TM2|\
eddyey;B04 - Lagoon;30.222;08/05/2024;.;Lagoon;TM2|\
riolu;B05 - Lagoon;1:37.548;14/10/2017;Cheated;Lagoon;TM2|\
Thoringer;B05 - Lagoon;1:37.480;23/10/2020;Cheated;Lagoon;TM2|\
Speed;B05 - Lagoon;1:37.616;09/10/2021;.;Lagoon;TM2|\
Flechetas;B05 - Lagoon;1:37.581;10/11/2021;.;Lagoon;TM2|\
Gyrule;B05 - Lagoon;1:37.545;11/11/2021;DUCK;Lagoon;TM2|\
Flechetas;B05 - Lagoon;1:37.538;11/11/2021;.;Lagoon;TM2|\
Gyrule;B05 - Lagoon;1:37.515;11/11/2021;.;Lagoon;TM2|\
Flechetas;B05 - Lagoon;1:37.471;11/11/2021;DUCK;Lagoon;TM2|\
Nemesis;B05 - Lagoon;1:37.461;21/05/2022;.;Lagoon;TM2|\
eddyey;B05 - Lagoon;1:37.460;11/05/2023;.;Lagoon;TM2|\
Kulisa;B06 - Lagoon;25.631;30/04/2019;.;Lagoon;TM2|\
riolu;B06 - Lagoon;25.601;01/05/2019;Cheated;Lagoon;TM2|\
Thoringer;B06 - Lagoon;25.592;22/11/2020;Cheated;Lagoon;TM2|\
Nemesis;B06 - Lagoon;25.624;29/12/2021;.;Lagoon;TM2|\
Quasar;B06 - Lagoon;25.618;14/06/2022;.;Lagoon;TM2|\
Mebe12;B06 - Lagoon;25.606;15/06/2022;.;Lagoon;TM2|\
Nemesis;B06 - Lagoon;25.600;17/06/2022;DUCK;Lagoon;TM2|\
Mebe12;B06 - Lagoon;25.595;17/06/2022;.;Lagoon;TM2|\
Nemesis;B06 - Lagoon;25.577;17/06/2022;DUCK;Lagoon;TM2|\
Mebe12;B06 - Lagoon;25.576;22/08/2022;.;Lagoon;TM2|\
Nemesis;B06 - Lagoon;25.573;02/09/2022;.;Lagoon;TM2|\
Mebe12;B06 - Lagoon;25.571;03/09/2022;.;Lagoon;TM2|\
Nemesis;B06 - Lagoon;25.561;20/01/2024;.;Lagoon;TM2|\
DarkLink94;B07 - Lagoon;26.483;15/11/2019;.;Lagoon;TM2|\
cuzynot;B07 - Lagoon;26.336;19/06/2020;.;Lagoon;TM2|\
ender;B07 - Lagoon;26.238;24/11/2021;.;Lagoon;TM2|\
Speed;B07 - Lagoon;26.155;31/03/2023;.;Lagoon;TM2|\
Kulisa;B08 - Lagoon;16.538;08/02/2020;.;Lagoon;TM2|\
riolu;B08 - Lagoon;16.513;10/02/2020;Cheated;Lagoon;TM2|\
Mebe12;B08 - Lagoon;16.536;04/07/2022;.;Lagoon;TM2|\
Mebe12;B08 - Lagoon;16.527;23/04/2023;.;Lagoon;TM2|\
Mebe12;B08 - Lagoon;16.514;23/04/2023;.;Lagoon;TM2|\
Mebe12;B08 - Lagoon;16.508;23/04/2023;DUCK;Lagoon;TM2|\
Mebe12;B08 - Lagoon;16.505;23/04/2023;.;Lagoon;TM2|\
Mebe12;B08 - Lagoon;16.493;23/04/2023;.;Lagoon;TM2|\
eddyey;B08 - Lagoon;16.491;14/01/2024;.;Lagoon;TM2|\
Mebe12;B08 - Lagoon;16.480;15/01/2024;.;Lagoon;TM2|\
Mebe12;B08 - Lagoon;16.471;15/01/2024;.;Lagoon;TM2|\
mime;B09 - Lagoon;26.877;06/05/2020;.;Lagoon;TM2|\
riolu;B09 - Lagoon;26.824;08/05/2020;Cheated;Lagoon;TM2|\
Speed;B09 - Lagoon;26.873;12/05/2022;.;Lagoon;TM2|\
Speed;B09 - Lagoon;26.847;13/05/2022;.;Lagoon;TM2|\
Speed;B09 - Lagoon;26.803;13/05/2022;DUCK;Lagoon;TM2|\
eddyey;B09 - Lagoon;26.799;29/04/2024;.;Lagoon;TM2|\
riolu;B10 - Lagoon;-;-;.;Lagoon;TM2|\
Thoringer;B10 - Lagoon;-;-;.;Lagoon;TM2|\
ivan;B10 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;B10 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;B10 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;B10 - Lagoon;-;-;.;Lagoon;TM2|\
Gyrule;B10 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;B10 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;B10 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;B10 - Lagoon;-;-;.;Lagoon;TM2|\
ydooWoody;B10 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;B10 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;B10 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;B10 - Lagoon;-;-;.;Lagoon;TM2|\
riolu;B11 - Lagoon;-;-;.;Lagoon;TM2|\
Thoringer;B11 - Lagoon;-;-;.;Lagoon;TM2|\
Flechetas;B11 - Lagoon;-;-;.;Lagoon;TM2|\
Flechetas;B11 - Lagoon;-;-;.;Lagoon;TM2|\
Flechetas;B11 - Lagoon;-;-;.;Lagoon;TM2|\
Flechetas;B11 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;B11 - Lagoon;-;-;.;Lagoon;TM2|\
DarkLink94;B12 - Lagoon;-;-;.;Lagoon;TM2|\
ivan;B12 - Lagoon;-;-;.;Lagoon;TM2|\
ydooWoody;B12 - Lagoon;-;-;.;Lagoon;TM2|\
Nemesis;B12 - Lagoon;-;-;.;Lagoon;TM2|\
Nemesis;B12 - Lagoon;-;-;.;Lagoon;TM2|\
ydooWoody;B12 - Lagoon;-;-;.;Lagoon;TM2|\
Nemesis;B12 - Lagoon;-;-;.;Lagoon;TM2|\
ydooWoody;B12 - Lagoon;-;-;.;Lagoon;TM2|\
ydooWoody;B12 - Lagoon;-;-;.;Lagoon;TM2|\
riolu;B13 - Lagoon;-;-;.;Lagoon;TM2|\
cuzynot;B13 - Lagoon;-;-;.;Lagoon;TM2|\
mime;B13 - Lagoon;-;-;.;Lagoon;TM2|\
cuzynot;B13 - Lagoon;-;-;.;Lagoon;TM2|\
mime;B13 - Lagoon;-;-;.;Lagoon;TM2|\
mime;B13 - Lagoon;-;-;.;Lagoon;TM2|\
Thoringer;B13 - Lagoon;-;-;.;Lagoon;TM2|\
Nemesis;B13 - Lagoon;-;-;.;Lagoon;TM2|\
Nemesis;B13 - Lagoon;-;-;.;Lagoon;TM2|\
riolu;B14 - Lagoon;-;-;.;Lagoon;TM2|\
DarkLink94;B14 - Lagoon;-;-;.;Lagoon;TM2|\
Samerlifofwer;B14 - Lagoon;-;-;.;Lagoon;TM2|\
Samerlifofwer;B14 - Lagoon;-;-;.;Lagoon;TM2|\
Nemesis;B14 - Lagoon;-;-;.;Lagoon;TM2|\
Samerlifofwer;B14 - Lagoon;-;-;.;Lagoon;TM2|\
Samerlifofwer;B14 - Lagoon;-;-;.;Lagoon;TM2|\
Samerlifofwer;B14 - Lagoon;-;-;.;Lagoon;TM2|\
ender;B15 - Lagoon;-;-;.;Lagoon;TM2|\
Mnichu;B15 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;B15 - Lagoon;-;-;.;Lagoon;TM2|\
riolu;C01 - Lagoon;-;-;.;Lagoon;TM2|\
mime;C01 - Lagoon;-;-;.;Lagoon;TM2|\
Eyohna;C01 - Lagoon;-;-;.;Lagoon;TM2|\
mime;C01 - Lagoon;-;-;.;Lagoon;TM2|\
Thoringer;C01 - Lagoon;-;-;.;Lagoon;TM2|\
XoN;C01 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;C01 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;C01 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;C01 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;C01 - Lagoon;-;-;.;Lagoon;TM2|\
riolu;C02 - Lagoon;-;-;.;Lagoon;TM2|\
Gyrule;C02 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;C02 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;C02 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;C02 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;C02 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;C02 - Lagoon;-;-;.;Lagoon;TM2|\
mime;C03 - Lagoon;-;-;.;Lagoon;TM2|\
ivan;C03 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;C03 - Lagoon;-;-;.;Lagoon;TM2|\
fanakuri;C03 - Lagoon;-;-;.;Lagoon;TM2|\
riolu;C04 - Lagoon;-;-;.;Lagoon;TM2|\
Thoringer;C04 - Lagoon;-;-;.;Lagoon;TM2|\
Thoringer;C04 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;C04 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;C04 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;C04 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;C04 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;C04 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;C04 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;C04 - Lagoon;-;-;.;Lagoon;TM2|\
mime;C05 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;C05 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;C05 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;C05 - Lagoon;-;-;.;Lagoon;TM2|\
fanakuri;C05 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;C05 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;C05 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;C05 - Lagoon;-;-;.;Lagoon;TM2|\
mime;C06 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;C06 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;C06 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;C06 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;C06 - Lagoon;-;-;.;Lagoon;TM2|\
riolu;C07 - Lagoon;-;-;.;Lagoon;TM2|\
Nemesis;C07 - Lagoon;-;-;.;Lagoon;TM2|\
Thoringer;C07 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;C07 - Lagoon;-;-;.;Lagoon;TM2|\
Gyrule;C07 - Lagoon;-;-;.;Lagoon;TM2|\
Gyrule;C07 - Lagoon;-;-;.;Lagoon;TM2|\
Nemesis;C07 - Lagoon;-;-;.;Lagoon;TM2|\
Gyrule;C07 - Lagoon;-;-;.;Lagoon;TM2|\
Gyrule;C07 - Lagoon;-;-;.;Lagoon;TM2|\
Gyrule;C07 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;C07 - Lagoon;-;-;.;Lagoon;TM2|\
Gyrule;C07 - Lagoon;-;-;.;Lagoon;TM2|\
Gyrule;C07 - Lagoon;-;-;.;Lagoon;TM2|\
Gyrule;C07 - Lagoon;-;-;.;Lagoon;TM2|\
riolu;C08 - Lagoon;-;-;.;Lagoon;TM2|\
Flechetas;C08 - Lagoon;-;-;.;Lagoon;TM2|\
ZyGoTo;C08 - Lagoon;-;-;.;Lagoon;TM2|\
Gyrule;C08 - Lagoon;-;-;.;Lagoon;TM2|\
ivan;C08 - Lagoon;-;-;.;Lagoon;TM2|\
wortex;C08 - Lagoon;-;-;.;Lagoon;TM2|\
ender;C08 - Lagoon;-;-;.;Lagoon;TM2|\
Gyrule;C08 - Lagoon;-;-;.;Lagoon;TM2|\
Flechetas;C08 - Lagoon;-;-;.;Lagoon;TM2|\
Gyrule;C08 - Lagoon;-;-;.;Lagoon;TM2|\
Flechetas;C08 - Lagoon;-;-;.;Lagoon;TM2|\
HQCookie;C08 - Lagoon;-;-;.;Lagoon;TM2|\
riolu;C09 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;C09 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;C09 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;C09 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;C09 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;C09 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;C09 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;C09 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;C09 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;C09 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;C09 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;C09 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;C09 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;C09 - Lagoon;-;-;.;Lagoon;TM2|\
DarkLink94;C10 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;C10 - Lagoon;-;-;.;Lagoon;TM2|\
Nemesis;C10 - Lagoon;-;-;.;Lagoon;TM2|\
Samerlifofwer;C10 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;C10 - Lagoon;-;-;.;Lagoon;TM2|\
Samerlifofwer;C10 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;C10 - Lagoon;-;-;.;Lagoon;TM2|\
Lumby;C11 - Lagoon;-;-;.;Lagoon;TM2|\
mime;C11 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;C11 - Lagoon;-;-;.;Lagoon;TM2|\
ydooWoody;C11 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;C11 - Lagoon;-;-;.;Lagoon;TM2|\
Quasar;C11 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;C11 - Lagoon;-;-;.;Lagoon;TM2|\
riolu;C12 - Lagoon;-;-;.;Lagoon;TM2|\
mime;C12 - Lagoon;-;-;.;Lagoon;TM2|\
GravelGuy;C12 - Lagoon;-;-;.;Lagoon;TM2|\
mime;C12 - Lagoon;-;-;.;Lagoon;TM2|\
Thoringer;C12 - Lagoon;-;-;.;Lagoon;TM2|\
mime;C12 - Lagoon;-;-;.;Lagoon;TM2|\
Thoringer;C12 - Lagoon;-;-;.;Lagoon;TM2|\
mime;C12 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;C12 - Lagoon;-;-;.;Lagoon;TM2|\
mime;C12 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;C12 - Lagoon;-;-;.;Lagoon;TM2|\
mime;C13 - Lagoon;-;-;.;Lagoon;TM2|\
Pavel;C13 - Lagoon;-;-;.;Lagoon;TM2|\
mime;C13 - Lagoon;-;-;.;Lagoon;TM2|\
mime;C13 - Lagoon;-;-;.;Lagoon;TM2|\
Pavel;C13 - Lagoon;-;-;.;Lagoon;TM2|\
mime;C13 - Lagoon;-;-;.;Lagoon;TM2|\
mime;C13 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;C13 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;C13 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;C13 - Lagoon;-;-;.;Lagoon;TM2|\
Pavel;C13 - Lagoon;-;-;.;Lagoon;TM2|\
mime;C13 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;C13 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;C13 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;C13 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;C13 - Lagoon;-;-;.;Lagoon;TM2|\
mattjimjett;C13 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;C13 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;C13 - Lagoon;-;-;.;Lagoon;TM2|\
wortex;C14 - Lagoon;-;-;.;Lagoon;TM2|\
riolu;C14 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;C14 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;C14 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;C14 - Lagoon;-;-;.;Lagoon;TM2|\
mime;C15 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;C15 - Lagoon;-;-;.;Lagoon;TM2|\
mime;C15 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;C15 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;C15 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;C15 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;C15 - Lagoon;-;-;.;Lagoon;TM2|\
Nemesis;D01 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;D01 - Lagoon;-;-;.;Lagoon;TM2|\
Kulisa;D02 - Lagoon;-;-;.;Lagoon;TM2|\
XoN;D02 - Lagoon;-;-;.;Lagoon;TM2|\
mime;D03 - Lagoon;-;-;.;Lagoon;TM2|\
mime;D03 - Lagoon;-;-;.;Lagoon;TM2|\
Nemesis;D03 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;D03 - Lagoon;-;-;.;Lagoon;TM2|\
riolu;D04 - Lagoon;-;-;.;Lagoon;TM2|\
Thoringer;D04 - Lagoon;-;-;.;Lagoon;TM2|\
Thoringer;D04 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;D04 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;D04 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;D04 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;D04 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;D04 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;D04 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;D04 - Lagoon;-;-;.;Lagoon;TM2|\
mime;D05 - Lagoon;-;-;.;Lagoon;TM2|\
Piotrunio;D05 - Lagoon;-;-;.;Lagoon;TM2|\
mime;D05 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;D05 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;D05 - Lagoon;-;-;.;Lagoon;TM2|\
Lumby;D06 - Lagoon;-;-;.;Lagoon;TM2|\
riolu;D06 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;D06 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;D06 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;D06 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;D06 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;D06 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;D06 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;D06 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;D06 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;D06 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;D06 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;D06 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;D06 - Lagoon;-;-;.;Lagoon;TM2|\
ender;D07 - Lagoon;-;-;.;Lagoon;TM2|\
riolu;D07 - Lagoon;-;-;.;Lagoon;TM2|\
ender;D07 - Lagoon;-;-;.;Lagoon;TM2|\
ender;D07 - Lagoon;-;-;.;Lagoon;TM2|\
Gyrule;D07 - Lagoon;-;-;.;Lagoon;TM2|\
ender;D07 - Lagoon;-;-;.;Lagoon;TM2|\
Samerlifofwer;D07 - Lagoon;-;-;.;Lagoon;TM2|\
Samerlifofwer;D07 - Lagoon;-;-;.;Lagoon;TM2|\
Samerlifofwer;D07 - Lagoon;-;-;.;Lagoon;TM2|\
ender;D07 - Lagoon;-;-;.;Lagoon;TM2|\
ender;D07 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;D07 - Lagoon;-;-;.;Lagoon;TM2|\
DarkLink94;D08 - Lagoon;-;-;.;Lagoon;TM2|\
ydooWoody;D08 - Lagoon;-;-;.;Lagoon;TM2|\
Flechetas;D08 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;D08 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;D08 - Lagoon;-;-;.;Lagoon;TM2|\
Taxon;D09 - Lagoon;-;-;.;Lagoon;TM2|\
mime;D09 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;D09 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;D09 - Lagoon;-;-;.;Lagoon;TM2|\
Taxon;D10 - Lagoon;-;-;.;Lagoon;TM2|\
mime;D10 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;D10 - Lagoon;-;-;.;Lagoon;TM2|\
ydooWoody;D10 - Lagoon;-;-;.;Lagoon;TM2|\
ydooWoody;D10 - Lagoon;-;-;.;Lagoon;TM2|\
mattjimjett;D10 - Lagoon;-;-;.;Lagoon;TM2|\
mattjimjett;D10 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;D10 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;D10 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;D10 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;D10 - Lagoon;-;-;.;Lagoon;TM2|\
Mebe12;D10 - Lagoon;-;-;.;Lagoon;TM2|\
mime;D11 - Lagoon;-;-;.;Lagoon;TM2|\
ydooWoody;D11 - Lagoon;-;-;.;Lagoon;TM2|\
cuzynot;D11 - Lagoon;-;-;.;Lagoon;TM2|\
mime;D11 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;D11 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;D11 - Lagoon;-;-;.;Lagoon;TM2|\
Kulisa;D12 - Lagoon;-;-;.;Lagoon;TM2|\
mime;D12 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;D12 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;D12 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;D12 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;D12 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;D12 - Lagoon;-;-;.;Lagoon;TM2|\
mime;D13 - Lagoon;-;-;.;Lagoon;TM2|\
mime;D13 - Lagoon;-;-;.;Lagoon;TM2|\
mime;D13 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;D13 - Lagoon;-;-;.;Lagoon;TM2|\
mime;D13 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;D13 - Lagoon;-;-;.;Lagoon;TM2|\
mime;D13 - Lagoon;-;-;.;Lagoon;TM2|\
wormk22;D13 - Lagoon;-;-;.;Lagoon;TM2|\
mime;D14 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;D14 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;D14 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;D14 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;D14 - Lagoon;-;-;.;Lagoon;TM2|\
Kulisa;D15 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;D15 - Lagoon;-;-;.;Lagoon;TM2|\
Lumby;E01 - Lagoon;-;-;.;Lagoon;TM2|\
mime;E01 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;E01 - Lagoon;-;-;.;Lagoon;TM2|\
mime;E01 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;E01 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;E01 - Lagoon;-;-;.;Lagoon;TM2|\
Pavel;E02 - Lagoon;-;-;.;Lagoon;TM2|\
Pavel;E02 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;E02 - Lagoon;-;-;.;Lagoon;TM2|\
mime;E03 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;E03 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;E03 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;E03 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;E03 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;E03 - Lagoon;-;-;.;Lagoon;TM2|\
riolu;E04 - Lagoon;-;-;.;Lagoon;TM2|\
Piotrunio;E04 - Lagoon;-;-;.;Lagoon;TM2|\
mime;E04 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;E04 - Lagoon;-;-;.;Lagoon;TM2|\
Pavel;E04 - Lagoon;-;-;.;Lagoon;TM2|\
Speed;E04 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;E04 - Lagoon;-;-;.;Lagoon;TM2|\
Kulisa;E05 - Lagoon;-;-;.;Lagoon;TM2|\
Kulisa;E05 - Lagoon;-;-;.;Lagoon;TM2|\
Kulisa;E05 - Lagoon;-;-;.;Lagoon;TM2|\
Thoringer;E05 - Lagoon;-;-;.;Lagoon;TM2|\
Kulisa;E05 - Lagoon;-;-;.;Lagoon;TM2|\
eddyey;E05 - Lagoon;-;-;.;Lagoon;TM2|\
Kazey77;001;32.37x;20/03/2016;.;Canyon;TMT|\
Luffy;001;32.270;24/03/2016;.;Canyon;TMT|\
Advision;001;32.230;25/03/2016;STM;Canyon;TMT|\
CarlJr;001;32.223;26/03/2016;.;Canyon;TMT|\
riolu;001;32.208;26/03/2016;.;Canyon;TMT|\
riolu;001;32.206;26/03/2016;Cheated;Canyon;TMT|\
marios2000;001;32.146;01/04/2016;.;Canyon;TMT|\
riolu;001;32.142;03/06/2016;.;Canyon;TMT|\
Jerome;001;32.126;10/08/2016;.;Canyon;TMT|\
riolu;001;32.088;31/08/2016;.;Canyon;TMT|\
Cloud;001;32.087;03/01/2021;DUCK;Canyon;TMT|\
Mebe12;001;32.085;20/07/2021;.;Canyon;TMT|\
fanakuri;001;32.077;29/09/2021;.;Canyon;TMT|\
fanakuri;001;32.074;30/09/2021;.;Canyon;TMT|\
fanakuri;001;32.072;30/09/2021;.;Canyon;TMT|\
fanakuri;001;32.070;01/10/2021;.;Canyon;TMT|\
fanakuri;001;32.046;01/10/2021;.;Canyon;TMT|\
hec_ker;002;35.030;24/03/2016;.;Canyon;TMT|\
maysen;002;35.028;25/03/2016;.;Canyon;TMT|\
Sky;002;35.013;25/03/2016;.;Canyon;TMT|\
Alewka;002;35.012;26/03/2016;.;Canyon;TMT|\
riolu;002;34.868;26/03/2016;STM;Canyon;TMT|\
riolu;002;34.846;31/03/2016;.;Canyon;TMT|\
Zypher;002;34.843;24/05/2016;.;Canyon;TMT|\
riolu;002;34.841;31/05/2016;.;Canyon;TMT|\
riolu;002;34.836;31/05/2016;.;Canyon;TMT|\
Zypher;002;34.818;04/06/2016;.;Canyon;TMT|\
riolu;002;34.806;04/06/2016;.;Canyon;TMT|\
riolu;002;34.79x;??/??/????;.;Canyon;TMT|\
riolu;002;34.773;01/09/2018;.;Canyon;TMT|\
Mebe12;002;34.794;03/01/2021;.;Canyon;TMT|\
Mebe12;002;34.773;03/01/2021;DUCK;Canyon;TMT|\
Mebe12;002;34.764;03/01/2021;.;Canyon;TMT|\
fanakuri;002;34.761;07/10/2021;.;Canyon;TMT|\
Mebe12;002;34.756;08/10/2021;.;Canyon;TMT|\
Mebe12;002;34.755;08/10/2021;.;Canyon;TMT|\
fanakuri;002;34.753;11/10/2021;.;Canyon;TMT|\
fanakuri;002;34.748;11/10/2021;.;Canyon;TMT|\
Mebe12;002;34.743;15/02/2022;.;Canyon;TMT|\
fanakuri;002;34.741;28/02/2022;.;Canyon;TMT|\
fanakuri;002;34.738;01/03/2022;.;Canyon;TMT|\
Mebe12;002;34.728;01/03/2022;.;Canyon;TMT|\
fanakuri;002;34.726;17/03/2022;.;Canyon;TMT|\
xxAlex765xx;003;28.384;24/03/2016;STM;Canyon;TMT|\
Coodyyy;003;28.36x;26/03/2016;.;Canyon;TMT|\
Guillaume41;003;28.353;26/03/2016;.;Canyon;TMT|\
Coodyyy;003;28.343;26/03/2016;.;Canyon;TMT|\
Luffy;003;28.290;30/03/2016;.;Canyon;TMT|\
riolu;003;28.243;31/03/2016;.;Canyon;TMT|\
Zypher;003;28.231;24/05/2016;.;Canyon;TMT|\
riolu;003;28.216;01/06/2016;.;Canyon;TMT|\
riolu;003;28.187;19/12/2018;beats a guy;Canyon;TMT|\
GravelGuy;003;28.196;19/07/2021;.;Canyon;TMT|\
Yogosun;003;28.187;17/08/2021;DUCK;Canyon;TMT|\
Yogosun;003;28.143;15/10/2021;.;Canyon;TMT|\
fanakuri;003;28.141;17/03/2023;.;Canyon;TMT|\
Rxyveax;003;28.136;??/??/2023;.;Canyon;TMT|\
fanakuri;003;28.128;10/05/2023;.;Canyon;TMT|\
Rxyveax;003;28.121;12/05/2023;.;Canyon;TMT|\
Alewka;004;25.278;24/03/2016;.;Canyon;TMT|\
maysen;004;25.137;25/03/2016;STM;Canyon;TMT|\
Marius89;004;25.088;28/03/2016;.;Canyon;TMT|\
riolu;004;25.041;30/03/2016;.;Canyon;TMT|\
Nawk;004;25.00x;16/04/2016;New Cut;Canyon;TMT|\
Nawk;004;24.853;16/04/2016;.;Canyon;TMT|\
gtahabinet;004;24.818;08/02/2017;.;Canyon;TMT|\
riolu;004;23.811;02/05/2017;.;Canyon;TMT|\
bcp;004;24.655;18/11/2017;.;Canyon;TMT|\
Solidtrees;004;23.306;24/12/2018;.;Canyon;TMT|\
riolu;004;23.037;05/03/2019;.;Canyon;TMT|\
ydooWoody;004;23.250;15/09/2021;.;Canyon;TMT|\
fanakuri;004;23.149;31/08/2022;.;Canyon;TMT|\
Solidtrees;004;23.137;21/08/2023;.;Canyon;TMT|\
fanakuri;004;23.017;17/12/2023;DUCK;Canyon;TMT|\
Quentin43;005;1:14.342;24/03/2016;.;Canyon;TMT|\
Quentin43;005;1:14.163;26/03/2016;.;Canyon;TMT|\
riolu;005;1:13.841;30/03/2016;STM;Canyon;TMT|\
Gosaft;005;1:13.723;03/04/2016;.;Canyon;TMT|\
DarkBringer;005;1:13.625;05/04/2016;.;Canyon;TMT|\
riolu;005;1:13.548;18/04/2016;.;Canyon;TMT|\
Zypher;005;1:13.508;26/05/2016;.;Canyon;TMT|\
riolu;005;1:13.365;01/09/2018;.;Canyon;TMT|\
GravelGuy;005;1:13.327;??/??/????;DUCK;Canyon;TMT|\
GravelGuy;005;1:13.290;19/07/2021;.;Canyon;TMT|\
fanakuri;005;1:13.245;13/10/2021;.;Canyon;TMT|\
Mebe12;005;1:13.230;18/10/2021;.;Canyon;TMT|\
Mebe12;005;1:13.221;18/10/2021;.;Canyon;TMT|\
fanakuri;005;1:13.212;19/10/2021;.;Canyon;TMT|\
fanakuri;005;1:13.207;31/10/2021;.;Canyon;TMT|\
Mebe12;005;1:13.204;31/10/2021;.;Canyon;TMT|\
fanakuri;005;1:13.200;05/11/2021;.;Canyon;TMT|\
fanakuri;005;1:13.148;05/11/2021;.;Canyon;TMT|\
Mebe12;005;1:13.138;11/10/2023;.;Canyon;TMT|\
xxAlex765xx;006;28.642;24/03/2016;.;Canyon;TMT|\
riolu;006;28.563;30/03/2016;.;Canyon;TMT|\
riolu;006;28.560;30/03/2016;.;Canyon;TMT|\
riolu;006;28.541;30/03/2016;.;Canyon;TMT|\
riolu;006;28.534;30/03/2016;STM;Canyon;TMT|\
riolu;006;28.521;30/03/2016;.;Canyon;TMT|\
riolu;006;28.511;31/03/2016;.;Canyon;TMT|\
riolu;006;28.488;31/03/2016;.;Canyon;TMT|\
riolu;006;28.470;01/04/2016;.;Canyon;TMT|\
riolu;006;28.468;01/04/2016;.;Canyon;TMT|\
riolu;006;28.445;01/04/2016;.;Canyon;TMT|\
Gosaft;006;28.444;03/04/2016;.;Canyon;TMT|\
marios2000;006;28.417;04/04/2016;.;Canyon;TMT|\
Zypher;006;28.415;28/05/2016;.;Canyon;TMT|\
riolu;006;28.414;02/06/2016;.;Canyon;TMT|\
Mebe12;006;28.408;31/01/2019;.;Canyon;TMT|\
Mebe12;006;28.398;31/01/2019;.;Canyon;TMT|\
riolu;006;28.388;01/02/2019;Cheated;Canyon;TMT|\
Mebe12;006;28.397;05/01/2021;.;Canyon;TMT|\
Mebe12;006;28.392;05/01/2021;.;Canyon;TMT|\
Mebe12;006;28.388;05/01/2021;DUCK;Canyon;TMT|\
Mebe12;006;28.385;05/01/2021;.;Canyon;TMT|\
Mebe12;006;28.378;15/09/2021;.;Canyon;TMT|\
Mebe12;006;28.377;15/09/2021;.;Canyon;TMT|\
Mebe12;006;28.374;15/09/2021;.;Canyon;TMT|\
fanakuri;006;28.368;21/03/2022;.;Canyon;TMT|\
Mebe12;006;28.365;22/03/2022;.;Canyon;TMT|\
fanakuri;006;28.364;22/03/2022;.;Canyon;TMT|\
Mebe12;006;28.360;24/03/2022;.;Canyon;TMT|\
Mebe12;006;28.353;24/03/2022;.;Canyon;TMT|\
maysen;007;25.246;25/03/2016;.;Canyon;TMT|\
Jjyyay;007;25.205;26/03/2016;.;Canyon;TMT|\
Knetogs;007;24.266;26/03/2016;.;Canyon;TMT|\
riolu;007;25.156;26/03/2016;STM;Canyon;TMT|\
riolu;007;25.122;01/04/2016;.;Canyon;TMT|\
riolu;007;25.078;01/04/2016;.;Canyon;TMT|\
marios2000;007;25.038;03/04/2016;.;Canyon;TMT|\
riolu;007;25.035;03/04/2016;.;Canyon;TMT|\
marios2000;007;25.030;06/04/2016;.;Canyon;TMT|\
Zypher;007;25.028;30/05/2016;.;Canyon;TMT|\
marios2000;007;25.018;17/04/2017;.;Canyon;TMT|\
riolu;007;25.008;02/09/2018;Cheated?;Canyon;TMT|\
fanakuri;007;24.99x;13/05/2021;DUCK;Canyon;TMT|\
Mebe12;007;24.988;20/07/2021;.;Canyon;TMT|\
fanakuri;007;24.968;06/03/2023;.;Canyon;TMT|\
fanakuri;007;24.965;06/04/2024;.;Canyon;TMT|\
fanakuri;007;24.950;06/04/2024;.;Canyon;TMT|\
NazgulAars;008;19.555;24/03/2016;.;Canyon;TMT|\
TekkForce;008;19.478;26/03/2016;.;Canyon;TMT|\
Pentacosmic;008;19.473;26/03/2016;.;Canyon;TMT|\
DarkLink94;008;19.45x;03/04/2016;.;Canyon;TMT|\
Sypher;008;19.443;12/04/2016;.;Canyon;TMT|\
DarkLink94;008;19.43x;14/04/2016;.;Canyon;TMT|\
Azora;008;19.410;17/04/2016;.;Canyon;TMT|\
7Alvin;008;19.390;02/08/2016;.;Canyon;TMT|\
Azora;008;19.368;05/08/2016;.;Canyon;TMT|\
riolu;008;19.348;19/12/2018;.;Canyon;TMT|\
Yogosun;008;19.333;06/02/2021;DUCK;Canyon;TMT|\
fanakuri;008;19.327;07/12/2021;.;Canyon;TMT|\
Yogosun;008;19.305;02/03/2023;.;Canyon;TMT|\
HQCookie;008;19.300;07/12/2023;.;Canyon;TMT|\
kaka;009;26.444;24/03/2016;.;Canyon;TMT|\
Rollin;009;26.374;25/03/2016;.;Canyon;TMT|\
Gosaft;009;26.344;30/03/2016;.;Canyon;TMT|\
Speedy0407;009;26.333;30/03/2016;.;Canyon;TMT|\
riolu;009;26.321;30/03/2016;.;Canyon;TMT|\
marios2000;009;26.303;03/04/2016;STM;Canyon;TMT|\
marios2000;009;26.258;11/04/2016;.;Canyon;TMT|\
riolu;009;26.250;01/05/2016;.;Canyon;TMT|\
riolu;009;26.243;02/05/2016;.;Canyon;TMT|\
riolu;009;26.195;02/05/2016;.;Canyon;TMT|\
Demedi;009;26.171;24/08/2018;.;Canyon;TMT|\
riolu;009;26.160;27/08/2018;.;Canyon;TMT|\
Demedi;009;26.145;13/06/2020;DUCK;Canyon;TMT|\
Mebe12;009;26.136;20/07/2021;.;Canyon;TMT|\
Mebe12;009;26.104;10/12/2023;.;Canyon;TMT|\
styx;010;1:12.186;24/03/2016;.;Canyon;TMT|\
Gosaft;010;1:12.034;28/03/2016;.;Canyon;TMT|\
Pac;010;1:11.782;30/03/2016;STM;Canyon;TMT|\
oNio;010;1:11.738;01/04/2016;.;Canyon;TMT|\
riolu;010;1:11.610;02/04/2016;.;Canyon;TMT|\
Zypher;010;1:11.598;30/05/2016;.;Canyon;TMT|\
riolu;010;1:11.533;31/05/2016;.;Canyon;TMT|\
Zypher;010;1:11.516;01/06/2016;.;Canyon;TMT|\
riolu;010;1:11.441;02/06/2016;.;Canyon;TMT|\
Zypher;010;1:11.400;03/06/2016;.;Canyon;TMT|\
riolu;010;1:11.330;03/06/2016;.;Canyon;TMT|\
Zypher;010;1:11.298;03/06/2016;.;Canyon;TMT|\
riolu;010;1:11.206;03/06/2016;.;Canyon;TMT|\
Mebe12;010;1:11.193;31/01/2019;.;Canyon;TMT|\
riolu;010;1:11.118;01/02/2019;Cheated?;Canyon;TMT|\
fanakuri;010;1:11.174;25/05/2022;.;Canyon;TMT|\
Mebe12;010;1:11.108;25/07/2022;DUCK;Canyon;TMT|\
Mebe12;010;1:11.090;25/07/2022;.;Canyon;TMT|\
Mebe12;010;1:11.071;25/07/2022;.;Canyon;TMT|\
Mebe12;010;1:11.042;25/07/2022;.;Canyon;TMT|\
BigBang1112;011;26.54x;24/03/2016;.;Valley;TMT|\
Edgekiwi;011;26.526;24/03/2016;.;Valley;TMT|\
BigBang1112;011;26.502;25/03/2016;.;Valley;TMT|\
NeYo-8826;011;26.501;26/03/2016;.;Valley;TMT|\
riolu;011;26.488;26/03/2016;.;Valley;TMT|\
marios2000;011;26.486;28/03/2016;.;Valley;TMT|\
riolu;011;26.461;01/04/2016;STM;Valley;TMT|\
Luffy;011;26.448;06/05/2016;.;Valley;TMT|\
riolu;011;26.442;08/05/2016;.;Valley;TMT|\
Thoringer;011;26.438;17/08/2021;Cheated;Valley;TMT|\
GravelGuy;011;26.433;23/09/2021;DUCK;Valley;TMT|\
HQCookie;011;26.428;04/01/2024;.;Valley;TMT|\
HQCookie;011;26.403;04/01/2024;.;Valley;TMT|\
Dused;012;27.12x;21/03/2016;.;Valley;TMT|\
Flave;012;27.05x;??/03/2016;.;Valley;TMT|\
NeYo-8826;012;26.985;24/03/2016;STM;Valley;TMT|\
BigBang1112;012;26.983;02/04/2016;.;Valley;TMT|\
riolu;012;26.961;02/04/2016;.;Valley;TMT|\
riolu;012;26.953;06/04/2016;.;Valley;TMT|\
frostBeule;012;26.944;13/04/2016;.;Valley;TMT|\
riolu;012;26.938;13/04/2016;.;Valley;TMT|\
BigBang1112;012;26.918;02/08/2016;.;Valley;TMT|\
NeYo-8826;012;26.908;05/08/2016;.;Valley;TMT|\
riolu;012;26.893;05/08/2016;.;Valley;TMT|\
Crinatiraxx;012;26.898;25/01/2020;.;Valley;TMT|\
fanakuri;012;26.883;15/09/2021;DUCK;Valley;TMT|\
fanakuri;012;26.876;03/07/2023;.;Valley;TMT|\
Anzone;012;26.865;??/??/2023;.;Valley;TMT|\
HQCookie;012;26.730;28/10/2023;.;Valley;TMT|\
fanakuri;012;26.684;30/10/2023;.;Valley;TMT|\
Pks;013;26.408;24/03/2016;.;Valley;TMT|\
Lanz;013;26.052;26/03/2016;.;Valley;TMT|\
riolu;013;25.935;30/03/2016;.;Valley;TMT|\
styx;013;25.825;31/03/2016;.;Valley;TMT|\
NeYo-8826;013;25.81x;31/03/2016;New Cut;Valley;TMT|\
NeYo-8826;013;25.775;31/03/2016;.;Valley;TMT|\
Luffy;013;25.745;08/05/2016;.;Valley;TMT|\
NeYo-8826;013;25.701;09/05/2016;.;Valley;TMT|\
Luffy;013;25.688;09/05/2016;.;Valley;TMT|\
NeYo-8826;013;25.688;09/05/2016;.;Valley;TMT|\
Luffy;013;25.646;10/05/2016;.;Valley;TMT|\
NeYo-8826;013;25.623;29/05/2016;.;Valley;TMT|\
riolu;013;25.614;14/12/2018;.;Valley;TMT|\
NeYo-8826;013;25.623;??/??/????;.;Valley;TMT|\
fanakuri;013;25.568;20/10/2022;DUCK;Valley;TMT|\
HQCookie;013;25.548;23/10/2022;.;Valley;TMT|\
fanakuri;013;25.544;24/10/2022;.;Valley;TMT|\
Suptim4L;014;18.642;24/03/2016;.;Valley;TMT|\
Deluxe699;014;18.614;25/03/2016;.;Valley;TMT|\
Guileboom;014;17.979;27/03/2016;Pool Trick;Valley;TMT|\
NeYo-8826;014;17.899;29/03/2016;.;Valley;TMT|\
riolu;014;17.868;14/04/2016;STM;Valley;TMT|\
frostBeule;014;17.849;14/04/2016;.;Valley;TMT|\
bcp;014;17.822;16/09/2017;.;Valley;TMT|\
bcp;014;17.819;09/09/2018;.;Valley;TMT|\
bcp;014;17.809;12/09/2018;.;Valley;TMT|\
bcp;014;17.808;18/09/2018;.;Valley;TMT|\
riolu;014;17.789;23/09/2018;.;Valley;TMT|\
GravelGuy;014;17.784;25/05/2020;.;Valley;TMT|\
GravelGuy;014;17.769;25/05/2020;.;Valley;TMT|\
riolu;014;17.751;31/05/2020;Cheated;Valley;TMT|\
fanakuri;014;17.736;28/10/2022;DUCK;Valley;TMT|\
styx;015;1:28.101;24/03/2016;.;Valley;TMT|\
riolu;015;1:27.223;02/04/2016;.;Valley;TMT|\
Zooz;015;1:26.926;03/04/2016;.;Valley;TMT|\
frostBeule;015;1:26.058;17/04/2016;STM;Valley;TMT|\
riolu;015;1:25.660;21/10/2016;kek_kekington;Valley;TMT|\
riolu;015;1:25.432;27/10/2016;.;Valley;TMT|\
riolu;015;1:24.957;??/??/????;>07/05/17;Valley;TMT|\
Demedi;015;1:25.248;??/??/????;.;Valley;TMT|\
fanakuri;015;1:25.143;04/11/2021;.;Valley;TMT|\
fanakuri;015;1:24.911;27/10/2022;.;Valley;TMT|\
HQCookie;015;1:24.763;22/01/2024;.;Valley;TMT|\
fanakuri;015;1:24.374;16/02/2024;.;Valley;TMT|\
Arcade;016;27.062;24/03/2016;.;Valley;TMT|\
maysen;016;27.008;25/03/2016;.;Valley;TMT|\
Edgekiwi;016;27.007;25/03/2016;.;Valley;TMT|\
Sky;016;26.932;26/03/2016;.;Valley;TMT|\
L94;016;26.895;31/03/2016;.;Valley;TMT|\
riolu;016;26.845;02/04/2016;.;Valley;TMT|\
frostBeule;016;26.822;??/04/2016;.;Valley;TMT|\
riolu;016;26.762;26/04/2016;STM;Valley;TMT|\
marios2000;016;26.74x;13/04/2017;.;Valley;TMT|\
riolu;016;26.693;15/04/2017;.;Valley;TMT|\
Samerlifofwer;016;26.664;17/04/2017;.;Valley;TMT|\
riolu;016;26.527;24/04/2017;.;Valley;TMT|\
riolu;016;26.493;24/04/2017;.;Valley;TMT|\
marios2000;016;26.465;25/04/2017;New Trick;Valley;TMT|\
riolu;016;26.398;25/04/2017;.;Valley;TMT|\
ender;016;26.396;04/10/2019;.;Valley;TMT|\
riolu;016;26.351;04/10/2019;Cheated;Valley;TMT|\
ender;016;26.388;26/12/2021;.;Valley;TMT|\
ender;016;26.382;27/12/2021;.;Valley;TMT|\
ender;016;26.340;24/05/2022;DUCK;Valley;TMT|\
Mebe12;016;26.318;14/12/2023;.;Valley;TMT|\
Mebe12;016;26.283;14/12/2023;.;Valley;TMT|\
Koenz;017;26.96x;21/03/2016;.;Valley;TMT|\
styx;017;26.922;25/03/2016;.;Valley;TMT|\
riolu;017;26.658;31/03/2016;STM;Valley;TMT|\
Knt-1;017;26.615;??/??/2016;<08/05/16;Valley;TMT|\
riolu;017;26.544;02/06/2016;.;Valley;TMT|\
riolu;017;26.448;06/08/2018;.;Valley;TMT|\
fanakuri;017;26.408;19/08/2020;.;Valley;TMT|\
riolu;017;26.385;19/08/2020;Cheated;Valley;TMT|\
fanakuri;017;26.37x;01/03/2021;DUCK;Valley;TMT|\
fanakuri;017;26.355;01/03/2021;.;Valley;TMT|\
fanakuri;017;26.321;12/09/2021;.;Valley;TMT|\
fanakuri;017;26.290;24/03/2023;.;Valley;TMT|\
fanakuri;017;26.264;18/12/2023;.;Valley;TMT|\
Mazzargh;018;22.826;24/03/2016;.;Valley;TMT|\
NeYo-8826;018;22.755;27/03/2016;STM;Valley;TMT|\
frostBeule;018;22.753;02/05/2016;.;Valley;TMT|\
riolu;018;22.750;03/05/2016;Cheated;Valley;TMT|\
Anzone;018;22.745;17/12/2019;DUCK;Valley;TMT|\
Dark_Abyssii;018;22.736;17/12/2019;.;Valley;TMT|\
fanakuri;018;22.733;19/10/2022;.;Valley;TMT|\
HQCookie;018;22.727;21/04/2023;.;Valley;TMT|\
styx;019;21.226;24/03/2016;.;Valley;TMT|\
trckmn;019;21.124;26/03/2016;.;Valley;TMT|\
riolu;019;21.103;31/03/2016;.;Valley;TMT|\
Shock;019;21.056;11/04/2016;STM;Valley;TMT|\
riolu;019;21.045;12/04/2016;.;Valley;TMT|\
7Alvin;019;21.041;02/05/2016;.;Valley;TMT|\
riolu;019;21.028;01/05/2016;.;Valley;TMT|\
riolu;019;21.016;01/05/2016;.;Valley;TMT|\
riolu;019;21.013;03/05/2016;.;Valley;TMT|\
riolu;019;20.976;03/05/2016;.;Valley;TMT|\
GravelGuy;019;20.946;20/07/2021;DUCK;Valley;TMT|\
fanakuri;019;20.937;13/01/2022;.;Valley;TMT|\
GravelGuy;019;20.932;24/01/2022;.;Valley;TMT|\
fanakuri;019;20.931;27/01/2022;.;Valley;TMT|\
fanakuri;019;20.930;31/01/2022;.;Valley;TMT|\
fanakuri;019;20.918;02/02/2022;.;Valley;TMT|\
Kripke;020;1:08.337;24/03/2016;.;Valley;TMT|\
Phenomega;020;1:08.039;01/04/2016;.;Valley;TMT|\
riolu;020;1:07.857;02/04/2016;Sub 1:07;Valley;TMT|\
frostBeule;020;1:06.643;03/05/2016;STM;Valley;TMT|\
riolu;020;1:06.611;06/05/2016;.;Valley;TMT|\
Knt-1;020;1:06.282;10/05/2016;.;Valley;TMT|\
Neko;020;1:06.273;11/05/2016;.;Valley;TMT|\
riolu;020;1:05.882;12/06/2016;Cheated?;Valley;TMT|\
RS Tornado;020;1:05.867;31/10/2020;DUCK;Valley;TMT|\
fanakuri;020;1:05.61x;04/03/2021;.;Valley;TMT|\
fanakuri;020;1:05.551;05/03/2021;.;Valley;TMT|\
fanakuri;020;1:05.363;29/12/2022;.;Valley;TMT|\
fanakuri;020;1:05.284;25/10/2023;.;Valley;TMT|\
fanakuri;020;1:05.192;25/10/2023;.;Valley;TMT|\
fanakuri;020;1:05.148;25/10/2023;.;Valley;TMT|\
Lars;021;21.62x;21/03/2016;.;Lagoon;TMT|\
MGM;021;21.618;24/03/2016;.;Lagoon;TMT|\
styx;021;21.577;25/03/2016;.;Lagoon;TMT|\
riolu;021;21.566;14/04/2016;.;Lagoon;TMT|\
Zypher;021;21.536;14/04/2016;.;Lagoon;TMT|\
7Alvin;021;21.525;19/04/2016;STM;Lagoon;TMT|\
frostBeule;021;21.524;21/04/2016;.;Lagoon;TMT|\
riolu;021;21.516;21/04/2016;.;Lagoon;TMT|\
riolu;021;21.508;21/04/2016;.;Lagoon;TMT|\
riolu;021;21.503;21/04/2016;.;Lagoon;TMT|\
DarkLink94;021;21.501;23/01/2017;.;Lagoon;TMT|\
riolu;021;21.500;23/01/2017;.;Lagoon;TMT|\
riolu;021;21.494;23/01/2017;.;Lagoon;TMT|\
DarkLink94;021;21.493;25/01/2017;.;Lagoon;TMT|\
Samerlifofwer;021;21.485;25/03/2017;First WR;Lagoon;TMT|\
DarkLink94;021;21.484;25/04/2017;.;Lagoon;TMT|\
DarkLink94;021;21.464;05/05/2017;.;Lagoon;TMT|\
riolu;021;21.451;24/04/2018;Cheated;Lagoon;TMT|\
Samerlifofwer;021;21.450;02/03/2020;.;Lagoon;TMT|\
riolu;021;21.444;01/07/2020;Cheated;Lagoon;TMT|\
Samerlifofwer;021;21.448;06/03/2023;.;Lagoon;TMT|\
futurecat;021;21.435;10/08/2024;DUCK;Lagoon;TMT|\
HQCookie;021;21.434;10/08/2024;.;Lagoon;TMT|\
Lars;022;24.58x;21/03/2016;.;Lagoon;TMT|\
Lars;022;24.578;24/03/2016;.;Lagoon;TMT|\
Phenomega;022;24.528;31/03/2016;STM;Lagoon;TMT|\
styx;022;24.518;01/04/2016;.;Lagoon;TMT|\
riolu;022;24.49x;??/04/2016;.;Lagoon;TMT|\
riolu;022;24.476;10/04/2016;.;Lagoon;TMT|\
DarkLink94;022;24.445;05/02/2017;.;Lagoon;TMT|\
riolu;022;24.350;18/11/2018;.;Lagoon;TMT|\
Samerlifofwer;022;24.346;11/02/2020;.;Lagoon;TMT|\
riolu;022;24.330;01/07/2020;Cheated;Lagoon;TMT|\
Samerlifofwer;022;24.32x;17/09/2020;DUCK;Lagoon;TMT|\
Thoringer;022;24.311;24/01/2021;Cheated;Lagoon;TMT|\
Samerlifofwer;022;24.30x;24/01/2021;DUCK;Lagoon;TMT|\
Samerlifofwer;022;24.18x;04/02/2021;.;Lagoon;TMT|\
RS Tornado;022;24.110;16/07/2021;.;Lagoon;TMT|\
Lars;023;20.76x;21/03/2016;.;Lagoon;TMT|\
Koenz;023;???;24/03/2016;.;Lagoon;TMT|\
Koenz;023;20.745;24/03/2016;.;Lagoon;TMT|\
styx;023;20.678;02/04/2016;STM;Lagoon;TMT|\
marios2000;023;20.664;09/04/2016;.;Lagoon;TMT|\
styx;023;20.630;10/04/2016;Cheated;Lagoon;TMT|\
riolu;023;20.623;21/04/2016;.;Lagoon;TMT|\
marios2000;023;20.601;22/04/2016;.;Lagoon;TMT|\
riolu;023;20.588;23/04/2016;.;Lagoon;TMT|\
marios2000;023;20.567;24/04/2016;.;Lagoon;TMT|\
styx;023;20.560;02/05/2016;.;Lagoon;TMT|\
marios2000;023;20.551;03/05/2016;.;Lagoon;TMT|\
riolu;023;20.528;17/10/2018;Cheated?;Lagoon;TMT|\
Crinatiraxx;023;20.518;20/02/2020;.;Lagoon;TMT|\
riolu;023;20.511;01/07/2020;Cheated;Lagoon;TMT|\
Thoringer;023;20.488;23/01/2021;Cheated;Lagoon;TMT|\
RS Tornado;023;20.497;16/07/2021;DUCK;Lagoon;TMT|\
Samerlifofwer;023;20.486;04/10/2021;DUCK;Lagoon;TMT|\
Samerlifofwer;023;20.481;16/04/2024;.;Lagoon;TMT|\
Samerlifofwer;023;20.478;17/04/2024;.;Lagoon;TMT|\
Lars;024;18.332;21/03/2016;.;Lagoon;TMT|\
marios2000;024;18.277;27/03/2016;.;Lagoon;TMT|\
styx;024;18.090;28/03/2016;STM;Lagoon;TMT|\
riolu;024;18.080;04/06/2016;.;Lagoon;TMT|\
Neko;024;18.048;15/06/2016;.;Lagoon;TMT|\
styx;024;18.021;15/06/2016;Cheated;Lagoon;TMT|\
riolu;024;18.020;15/06/2016;Cheated;Lagoon;TMT|\
styx;024;18.002;16/06/2016;Cheated;Lagoon;TMT|\
riolu;024;17.945;16/06/2016;Cheated;Lagoon;TMT|\
Thoringer;024;17.928;07/01/2021;Cheated;Lagoon;TMT|\
Samerlifofwer;024;17.960;29/05/2021;DUCK;Lagoon;TMT|\
Samerlifofwer;024;17.93x;30/05/2021;DUCK;Lagoon;TMT|\
Samerlifofwer;024;17.89x;01/06/2021;DUCK;Lagoon;TMT|\
fanakuri;024;17.891;02/11/2023;.;Lagoon;TMT|\
Samerlifofwer;024;17.835;14/12/2023;.;Lagoon;TMT|\
Lars;025;1:17.258;19/03/2016;.;Lagoon;TMT|\
riolu;025;1:17.062;26/03/2016;.;Lagoon;TMT|\
styx;025;1:16.718;27/03/2016;STM;Lagoon;TMT|\
riolu;025;1:16.488;27/03/2016;.;Lagoon;TMT|\
Phenomega;025;1:16.378;31/03/2016;.;Lagoon;TMT|\
Rosiante-S;025;1:16.285;28/02/2019;.;Lagoon;TMT|\
riolu;025;1:16.281;28/02/2019;Cheated?;Lagoon;TMT|\
Rosiante-S;025;1:16.253;??/??/2019;.;Lagoon;TMT|\
riolu;025;1:16.202;21/03/2019;.;Lagoon;TMT|\
ender;025;1:16.170;13/09/2021;DUCK;Lagoon;TMT|\
Anzone;025;1:16.163;15/01/2022;.;Lagoon;TMT|\
ender;025;1:16.082;18/01/2022;.;Lagoon;TMT|\
Anzone;025;1:16.068;15/05/2022;.;Lagoon;TMT|\
Anzone;025;1:16.022;20/05/2022;.;Lagoon;TMT|\
Samerlifofwer;025;1:16.013;28/08/2022;.;Lagoon;TMT|\
Samerlifofwer;025;1:16.008;29/08/2022;.;Lagoon;TMT|\
Samerlifofwer;025;1:16.007;30/08/2022;.;Lagoon;TMT|\
Samerlifofwer;025;1:15.968;30/08/2022;.;Lagoon;TMT|\
Luffy;026;21.286;24/03/2016;.;Lagoon;TMT|\
Dused;026;21.278;26/03/2016;.;Lagoon;TMT|\
Mubazen;026;21.271;28/03/2016;.;Lagoon;TMT|\
riolu;026;21.268;28/03/2016;STM;Lagoon;TMT|\
styx;026;21.266;04/04/2016;.;Lagoon;TMT|\
riolu;026;21.264;04/04/2016;.;Lagoon;TMT|\
Hivee;026;21.253;05/04/2016;.;Lagoon;TMT|\
riolu;026;21.251;13/04/2016;.;Lagoon;TMT|\
Knt-1;026;21.248;??/??/2016;<15/05/16;Lagoon;TMT|\
riolu;026;21.246;02/06/2016;.;Lagoon;TMT|\
riolu;026;21.245;11/06/2016;.;Lagoon;TMT|\
riolu;026;21.244;11/06/2016;.;Lagoon;TMT|\
Neko;026;21.238;11/06/2016;.;Lagoon;TMT|\
riolu;026;21.231;12/06/2016;.;Lagoon;TMT|\
DarkLink94;026;21.228;22/03/2017;.;Lagoon;TMT|\
riolu;026;21.225;20/11/2018;.;Lagoon;TMT|\
ydooWoody;026;21.224;28/01/2020;.;Lagoon;TMT|\
Samerlifofwer;026;21.196;19/03/2020;.;Lagoon;TMT|\
riolu;026;21.186;07/01/2021;Cheated;Lagoon;TMT|\
Joltysonic;026;21.173;11/12/2021;DUCK;Lagoon;TMT|\
Samerlifofwer;026;21.148;06/09/2022;.;Lagoon;TMT|\
Guerro323;027;28.684;24/03/2016;.;Lagoon;TMT|\
styx;027;28.675;25/03/2016;.;Lagoon;TMT|\
icenine;027;28.670;25/03/2016;.;Lagoon;TMT|\
maysen;027;28.574;27/03/2016;.;Lagoon;TMT|\
riolu;027;28.524;05/04/2016;STM;Lagoon;TMT|\
Zypher;027;28.504;15/04/2016;.;Lagoon;TMT|\
TheMonsterC2;027;28.493;19/04/2016;.;Lagoon;TMT|\
__;027;28.460;27/04/2016;.;Lagoon;TMT|\
__;027;28.445;29/04/2016;.;Lagoon;TMT|\
riolu;027;28.432;05/05/2016;.;Lagoon;TMT|\
riolu;027;28.303;05/05/2016;.;Lagoon;TMT|\
DRIVER6479;027;28.300;14/04/2017;.;Lagoon;TMT|\
riolu;027;28.235;16/10/2018;Cheated?;Lagoon;TMT|\
RS Tornado;027;28.218;09/02/2020;DUCK;Lagoon;TMT|\
Grudge;027;28.216;23/07/2022;.;Lagoon;TMT|\
RS Tornado;027;28.188;28/07/2022;.;Lagoon;TMT|\
Samerlifofwer;027;28.184;05/08/2022;.;Lagoon;TMT|\
Grudge;027;28.178;04/06/2023;.;Lagoon;TMT|\
Samerlifofwer;027;28.174;06/05/2024;.;Lagoon;TMT|\
MGM;028;31.181;24/03/2016;.;Lagoon;TMT|\
AQueCCbob;028;31.175;25/03/2016;.;Lagoon;TMT|\
Hakanai;028;31.125;26/03/2016;.;Lagoon;TMT|\
Phenomega;028;30.951;30/04/2016;STM;Lagoon;TMT|\
styx;028;30.901;30/04/2016;.;Lagoon;TMT|\
Nino;028;30.668;05/04/2016;New Cut;Lagoon;TMT|\
DarkLink94;028;30.507;07/04/2016;.;Lagoon;TMT|\
riolu;028;30.234;07/04/2016;.;Lagoon;TMT|\
Bakatonorz;028;30.175;08/04/2016;.;Lagoon;TMT|\
Derter;028;30.067;09/04/2016;.;Lagoon;TMT|\
riolu;028;29.770;20/10/2016;Live;Lagoon;TMT|\
Samerlifofwer;028;29.52x;25/12/2018;.;Lagoon;TMT|\
riolu;028;29.515;22/01/2019;Live;Lagoon;TMT|\
Gyrule;028;29.468;13/04/2020;DUCK;Lagoon;TMT|\
Samerlifofwer;028;29.281;10/06/2022;.;Lagoon;TMT|\
introC;029;25.965;24/03/2016;.;Lagoon;TMT|\
NJin;029;25.947;25/03/2016;.;Lagoon;TMT|\
racerlight;029;25.945;25/03/2016;.;Lagoon;TMT|\
tayck;029;25.927;27/03/2016;.;Lagoon;TMT|\
Zycos;029;25.856;27/03/2016;.;Lagoon;TMT|\
styx;029;25.808;28/03/2016;STM;Lagoon;TMT|\
styx;029;25.786;03/05/2016;Cheated;Lagoon;TMT|\
riolu;029;25.770;21/10/2016;Cheated;Lagoon;TMT|\
riolu;029;25.768;19/08/2018;Cheated;Lagoon;TMT|\
Samerlifofwer;029;25.750;18/02/2020;.;Lagoon;TMT|\
riolu;029;25.748;07/01/2021;Cheated;Lagoon;TMT|\
Thoringer;029;25.747;23/01/2021;Cheated;Lagoon;TMT|\
Samerlifofwer;029;25.742;25/01/2021;DUCKxDUCK;Lagoon;TMT|\
Thoringer;029;25.735;26/01/2021;Cheated;Lagoon;TMT|\
Samerlifofwer;029;25.72x;28/01/2021;.;Lagoon;TMT|\
Thoringer;029;25.723;28/01/2021;Cheated;Lagoon;TMT|\
Samerlifofwer;029;25.718;28/01/2021;.;Lagoon;TMT|\
Thoringer;029;25.700;28/01/2021;Cheated;Lagoon;TMT|\
Beliskner999;030;1:07.33x;24/03/2016;.;Lagoon;TMT|\
styx;030;1:07.121;25/03/2016;STM;Lagoon;TMT|\
riolu;030;1:07.026;01/04/2016;.;Lagoon;TMT|\
Phenomega;030;1:07.011;16/04/2016;.;Lagoon;TMT|\
riolu;030;1:07.006;28/04/2016;.;Lagoon;TMT|\
asier;030;1:06.987;03/10/2016;Sub 1:07;Lagoon;TMT|\
riolu;030;1:06.968;06/10/2016;.;Lagoon;TMT|\
DarkLink94;030;1:06.568;04/02/2017;.;Lagoon;TMT|\
riolu;030;1:06.372;24/10/2018;.;Lagoon;TMT|\
Samerlifofwer;030;1:05.931;03/03/2020;Sub 1:06;Lagoon;TMT|\
riolu;030;1:05.760;07/01/2021;Cheated;Lagoon;TMT|\
Samerlifofwer;030;1:05.85x;15/05/2023;.;Lagoon;TMT|\
Samerlifofwer;030;1:05.726;16/05/2023;DUCK;Lagoon;TMT|\
Samerlifofwer;030;1:05.691;17/05/2023;.;Lagoon;TMT|\
Samerlifofwer;030;1:05.623;17/05/2023;.;Lagoon;TMT|\
DarkLink94;031;23.688;19/03/2016;.;Stadium;TMT|\
racehans;031;23.615;26/03/2016;STM;Stadium;TMT|\
RotakeR;031;23.589;27/03/2016;.;Stadium;TMT|\
Symbiose;031;23.576;23/04/2016;.;Stadium;TMT|\
riolu;031;23.572;15/06/2016;.;Stadium;TMT|\
riolu;031;23.561;16/02/2019;Cheated;Stadium;TMT|\
instable;031;23.567;06/07/2021;.;Stadium;TMT|\
RotakeR;031;23.554;20/09/2023;DUCK;Stadium;TMT|\
Flechetas;031;23.540;14/08/2024;STM;Stadium;TMT|\
DarkLink94;032;22.933;19/03/2016;.;Stadium;TMT|\
Scorm;032;22.881;25/03/2016;.;Stadium;TMT|\
racehans;032;22.867;26/03/2016;.;Stadium;TMT|\
Demon;032;22.843;28/03/2016;.;Stadium;TMT|\
Symbiose;032;22.819;02/04/2016;.;Stadium;TMT|\
riolu;032;22.818;10/09/2018;DUCK;Stadium;TMT|\
Bluts;032;22.808;??/??/2021;.;Stadium;TMT|\
Bluts;032;22.803;06/07/2021;.;Stadium;TMT|\
Loupphok;032;22.801;02/10/2022;.;Stadium;TMT|\
Bluts;032;22.782;02/03/2023;.;Stadium;TMT|\
DarkLink94;033;23.248;18/03/2016;.;Stadium;TMT|\
styx;033;23.115;25/03/2016;STM;Stadium;TMT|\
Nawk;033;22.873;25/03/2016;.;Stadium;TMT|\
CarlJr;033;22.757;09/04/2016;Cheated;Stadium;TMT|\
riolu;033;22.148;18/11/2018;.;Stadium;TMT|\
Gwen;033;22.524;03/12/2021;.;Stadium;TMT|\
RS Tornado;033;22.250;27/09/2022;.;Stadium;TMT|\
HQCookie;033;22.225;04/10/2022;.;Stadium;TMT|\
HQCookie;033;22.187;04/10/2022;.;Stadium;TMT|\
HQCookie;033;22.151;04/10/2022;DUCK;Stadium;TMT|\
HQCookie;033;22.122;07/10/2022;.;Stadium;TMT|\
DarkLink94;034;25.628;20/03/2016;.;Stadium;TMT|\
Wag;034;25.551;29/03/2016;.;Stadium;TMT|\
Fire!;034;25.462;31/03/2016;STM;Stadium;TMT|\
RACETA;034;25.393;02/04/2016;.;Stadium;TMT|\
racehans;034;25.354;09/04/2016;Cheated?;Stadium;TMT|\
riolu;034;25.271;17/10/2018;.;Stadium;TMT|\
mime;034;25.347;23/06/2021;.;Stadium;TMT|\
instable;034;25.285;11/11/2021;.;Stadium;TMT|\
instable;034;25.278;21/11/2021;DUCK;Stadium;TMT|\
instable;034;25.230;23/11/2021;.;Stadium;TMT|\
HQCookie;034;22.205;04/01/2024;.;Stadium;TMT|\
DanikB;035;54.232;24/03/2016;.;Stadium;TMT|\
Space;035;54.055;28/03/2016;STM;Stadium;TMT|\
Fire!;035;53.468;01/04/2016;.;Stadium;TMT|\
racehans;035;53.301;02/04/2016;.;Stadium;TMT|\
Fire!;035;53.258;22/01/2017;.;Stadium;TMT|\
riolu;035;53.097;30/03/2017;DUCK;Stadium;TMT|\
Aziix;035;53.081;26/11/2019;Sub 53;Stadium;TMT|\
RotakeR;035;52.876;27/03/2020;.;Stadium;TMT|\
Aziix;035;52.874;08/03/2023;.;Stadium;TMT|\
Aziix;035;52.835;09/03/2023;.;Stadium;TMT|\
Aziix;035;52.825;12/03/2023;.;Stadium;TMT|\
Scotsman;036;23.531;24/03/2016;.;Stadium;TMT|\
Sphinx;036;23.393;25/03/2016;.;Stadium;TMT|\
AleTheLegend;036;23.334;25/03/2016;.;Stadium;TMT|\
Fire!;036;23.261;31/03/2016;.;Stadium;TMT|\
Lookid;036;23.258;31/03/2016;STM;Stadium;TMT|\
CarlJr;036;23.177;08/04/2016;.;Stadium;TMT|\
RACETA;036;23.171;09/04/2016;.;Stadium;TMT|\
riolu;036;23.154;26/04/2016;.;Stadium;TMT|\
7Alvin;036;23.124;24/05/2016;.;Stadium;TMT|\
7Alvin;036;23.122;24/05/2016;.;Stadium;TMT|\
7Alvin;036;23.092;25/05/2016;Cheated?;Stadium;TMT|\
riolu;036;23.040;04/11/2018;DUCK;Stadium;TMT|\
mime;036;23.034;08/08/2021;Sub 23;Stadium;TMT|\
HQCookie;036;22.975;27/11/2023;.;Stadium;TMT|\
KarasT7;037;26.831;24/03/2016;STM;Stadium;TMT|\
racehans;037;26.747;02/04/2016;.;Stadium;TMT|\
7Alvin;037;26.742;06/04/2016;.;Stadium;TMT|\
Symbiose;037;26.699;??/04/2016;.;Stadium;TMT|\
RACETA;037;26.678;09/04/2016;Cheated?;Stadium;TMT|\
riolu;037;26.666;20/11/2018;DUCK;Stadium;TMT|\
RotakeR;037;26.662;11/08/2022;.;Stadium;TMT|\
Bluts;037;26.661;04/03/2023;.;Stadium;TMT|\
Benitabor;037;26.653;28/02/2024;.;Stadium;TMT|\
Loupphok;037;26.652;15/04/2024;.;Stadium;TMT|\
Pieton;037;26.651;10/08/2024;.;Stadium;TMT|\
Loupphok;037;26.647;12/08/2024;.;Stadium;TMT|\
TimonBoaz;038;17.098;24/03/2016;.;Stadium;TMT|\
Hyllez;038;17.095;25/03/2016;.;Stadium;TMT|\
Dellecto;038;17.063;26/03/2016;.;Stadium;TMT|\
btonios;038;17.055;28/03/2016;.;Stadium;TMT|\
riolu;038;17.028;28/03/2016;STM;Stadium;TMT|\
racehans;038;17.008;01/04/2016;.;Stadium;TMT|\
CarlJr;038;16.98x;02/04/2016;.;Stadium;TMT|\
riolu;038;16.968;07/04/2016;.;Stadium;TMT|\
CarlJr;038;16.967;09/04/2016;.;Stadium;TMT|\
riolu;038;16.926;15/06/2016;.;Stadium;TMT|\
RS Tornado;038;16.917;06/03/2020;Cheated;Stadium;TMT|\
riolu;038;16.898;07/01/2021;.;Stadium;TMT|\
fanakuri;038;16.912;13/08/2022;.;Stadium;TMT|\
HQCookie;038;16.906;15/09/2023;.;Stadium;TMT|\
Loupphok;038;16.900;12/07/2024;DUCK;Stadium;TMT|\
Loupphok;038;16.880;12/07/2024;.;Stadium;TMT|\
GMAlf;039;28.085;24/03/2016;.;Stadium;TMT|\
Coradon24;039;28.006;26/03/2016;.;Stadium;TMT|\
Space;039;27.901;27/03/2016;.;Stadium;TMT|\
Dunste;039;27.757;28/03/2016;STM;Stadium;TMT|\
Alyen;039;27.555;29/03/2016;.;Stadium;TMT|\
Fire!;039;27.408;01/04/2016;.;Stadium;TMT|\
racehans;039;27.338;02/04/2016;.;Stadium;TMT|\
CarlJr;039;27.271;09/04/2016;.;Stadium;TMT|\
Neko;039;27.253;29/07/2016;.;Stadium;TMT|\
eprotizuu;039;27.148;??/??/????;Cheated;Stadium;TMT|\
riolu;039;27.108;08/02/2019;.;Stadium;TMT|\
HQCookie;039;27.128;24/01/2023;DUCK;Stadium;TMT|\
RotakeR;039;26.961;13/11/2023;.;Stadium;TMT|\
Scotsman;040;1:13.784;24/03/2016;.;Stadium;TMT|\
racerlight;040;1:13.703;28/03/2016;.;Stadium;TMT|\
Wag;040;1:13.112;29/03/2016;.;Stadium;TMT|\
racehans;040;1:12.827;02/04/2016;.;Stadium;TMT|\
Rollin;040;1:12.817;02/04/2016;STM;Stadium;TMT|\
CarlJr;040;1:12.470;07/04/2016;.;Stadium;TMT|\
riolu;040;1.12.268;27/01/2019;.;Stadium;TMT|\
Rollin;040;1.12.025;??/??/2019;Cheated;Stadium;TMT|\
riolu;040;1.11.991;06/03/2019;.;Stadium;TMT|\
Loupphok;040;1:12.020;20/04/2023;DUCK;Stadium;TMT|\
Loupphok;040;1:11.983;20/04/2023;.;Stadium;TMT|\
Richie;041;33.306;24/03/2016;.;Canyon;TMT|\
xxAlex765xx;041;33.293;25/03/2016;.;Canyon;TMT|\
bbAmerang;041;33.258;25/03/2016;STM;Canyon;TMT|\
trckmn;041;32.811;25/03/2016;.;Canyon;TMT|\
riolu;041;32.701;02/04/2016;.;Canyon;TMT|\
Zypher;041;32.688;31/05/2016;.;Canyon;TMT|\
riolu;041;32.608;02/06/2016;.;Canyon;TMT|\
fanakuri;041;32.656;24/08/2020;.;Canyon;TMT|\
irtri;041;32.645;11/08/2021;.;Canyon;TMT|\
fanakuri;041;32.62x;21/08/2021;DUCK;Canyon;TMT|\
fanakuri;041;32.596;22/05/2022;.;Canyon;TMT|\
fanakuri;041;32.575;23/10/2023;.;Canyon;TMT|\
fanakuri;041;32.570;24/10/2023;.;Canyon;TMT|\
fanakuri;041;32.548;24/10/2023;.;Canyon;TMT|\
Lokring;042;36.401;24/03/2016;.;Canyon;TMT|\
Ludo;042;36.392;25/03/2016;.;Canyon;TMT|\
Bill;042;36.267;25/03/2016;.;Canyon;TMT|\
maysen;042;36.200;25/03/2016;.;Canyon;TMT|\
meson;042;36.191;27/03/2016;.;Canyon;TMT|\
Skuggaco;042;36.170;29/03/2016;.;Canyon;TMT|\
Gosaft;042;36.060;01/04/2016;STM;Canyon;TMT|\
riolu;042;36.038;06/04/2016;.;Canyon;TMT|\
riolu;042;35.988;06/04/2016;.;Canyon;TMT|\
Canon;042;35.920;04/05/2016;.;Canyon;TMT|\
Canon;042;35.781;07/05/2016;.;Canyon;TMT|\
Zypher;042;35.776;02/06/2016;.;Canyon;TMT|\
Zypher;042;35.708;02/06/2016;.;Canyon;TMT|\
riolu;042;35.695;04/06/2016;DUCK;Canyon;TMT|\
Crinatiraxx;042;35.664;30/05/2020;.;Canyon;TMT|\
Yogosun;042;35.661;27/07/2021;.;Canyon;TMT|\
Yogosun;042;35.631;30/07/2021;.;Canyon;TMT|\
fanakuri;042;35.611;24/05/2022;.;Canyon;TMT|\
fanakuri;042;35.577;22/04/2024;.;Canyon;TMT|\
Koenz;043;25.10x;21/03/2016;.;Canyon;TMT|\
hec_ker;043;25.047;25/03/2016;.;Canyon;TMT|\
Greenius;043;25.011;25/03/2016;STM;Canyon;TMT|\
riolu;043;24.990;28/03/2016;.;Canyon;TMT|\
7Alvin;043;24.963;18/04/2016;.;Canyon;TMT|\
riolu;043;24.88x;18/04/2016;.;Canyon;TMT|\
Zypher;043;24.860;02/06/2016;.;Canyon;TMT|\
riolu;043;24.855;02/06/2016;.;Canyon;TMT|\
Zypher;043;24.813;05/06/2016;.;Canyon;TMT|\
riolu;043;24.792;06/06/2016;DUCK;Canyon;TMT|\
GravelGuy;043;24.777;16/07/2021;.;Canyon;TMT|\
fanakuri;043;24.767;15/10/2021;.;Canyon;TMT|\
fanakuri;043;24.762;25/10/2023;.;Canyon;TMT|\
Lars;044;29.510;24/03/2016;.;Canyon;TMT|\
Bill;044;29.350;25/03/2016;.;Canyon;TMT|\
RedExtra;044;29.257;25/03/2016;.;Canyon;TMT|\
Session005;044;29.121;27/03/2016;STM;Canyon;TMT|\
riolu;044;29.098;28/03/2016;.;Canyon;TMT|\
Gosaft;044;29.033;29/03/2016;.;Canyon;TMT|\
riolu;044;29.031;06/04/2016;.;Canyon;TMT|\
riolu;044;28.981;10/06/2016;.;Canyon;TMT|\
riolu;044;28.968;10/06/2016;.;Canyon;TMT|\
Jerome;044;28.955;08/08/2016;.;Canyon;TMT|\
riolu;044;28.931;31/08/2016;DUCK;Canyon;TMT|\
Crinatiraxx;044;28.915;19/08/2020;.;Canyon;TMT|\
Cloud;044;28.898;15/01/2021;.;Canyon;TMT|\
Mebe12;044;28.888;08/02/2021;.;Canyon;TMT|\
Mebe12;044;28.871;08/02/2021;.;Canyon;TMT|\
Mebe12;044;28.861;08/02/2021;.;Canyon;TMT|\
Mebe12;044;28.845;08/02/2021;.;Canyon;TMT|\
fanakuri;044;28.838;21/10/2021;.;Canyon;TMT|\
fanakuri;044;28.818;21/10/2021;.;Canyon;TMT|\
Mebe12;044;28.815;29/10/2021;.;Canyon;TMT|\
fanakuri;044;28.805;08/11/2021;.;Canyon;TMT|\
fanakuri;044;28.801;08/11/2021;.;Canyon;TMT|\
fanakuri;044;28.794;08/11/2021;.;Canyon;TMT|\
Mebe12;044;28.792;12/11/2021;.;Canyon;TMT|\
fanakuri;044;28.778;15/11/2021;.;Canyon;TMT|\
Mebe12;044;28.775;13/12/2022;.;Canyon;TMT|\
fanakuri;044;28.771;18/12/2022;.;Canyon;TMT|\
Stik;045;2:02.317;24/03/2016;.;Canyon;TMT|\
Greenius;045;2:02.281;25/03/2016;STM;Canyon;TMT|\
RedExtra;045;2:01.930;25/03/2016;.;Canyon;TMT|\
riolu;045;2:00.817;30/03/2016;.;Canyon;TMT|\
Zypher;045;2:00.708;14/04/2016;.;Canyon;TMT|\
riolu;045;2:00.538;10/06/2016;.;Canyon;TMT|\
Jerome;045;2:00.474;14/08/2016;.;Canyon;TMT|\
riolu;045;2:00.414;01/09/2016;<07/05/17;Canyon;TMT|\
Shamzie;045;1:59.957;??/??/????;.;Canyon;TMT|\
CircuitFerrari;045;1:59.917;11/05/2018;.;Canyon;TMT|\
riolu;045;1:59.696;24/01/2019;DUCK;Canyon;TMT|\
Phoebe;045;1:59.605;23/09/2019;.;Canyon;TMT|\
Mebe12;045;1:59.530;20/10/2021;.;Canyon;TMT|\
Mebe12;045;1:59.511;20/10/2021;.;Canyon;TMT|\
Mebe12;045;1:59.451;20/10/2021;.;Canyon;TMT|\
fanakuri;045;1:59.445;01/12/2021;.;Canyon;TMT|\
Mebe12;045;1:59.431;08/01/2022;.;Canyon;TMT|\
fanakuri;045;1:59.415;22/05/2022;.;Canyon;TMT|\
fanakuri;045;1:59.398;22/05/2022;.;Canyon;TMT|\
Mebe12;045;1:59.384;13/12/2022;.;Canyon;TMT|\
fanakuri;045;1:59.335;18/12/2022;.;Canyon;TMT|\
Mebe12;045;1:59.251;30/12/2022;.;Canyon;TMT|\
fanakuri;045;1:59.242;09/01/2023;.;Canyon;TMT|\
Azora;046;35.752;24/03/2016;.;Canyon;TMT|\
iEnrage;046;35.743;25/03/2016;.;Canyon;TMT|\
__;046;35.7xx;25/03/2016;.;Canyon;TMT|\
Ploeder;046;35.720;25/03/2016;.;Canyon;TMT|\
introC;046;35.690;26/03/2016;.;Canyon;TMT|\
Dean091;046;35.667;27/03/2016;.;Canyon;TMT|\
Gosaft;046;35.567;01/04/2016;.;Canyon;TMT|\
trabadia;046;35.558;09/04/2016;.;Canyon;TMT|\
riolu;046;35.505;13/04/2016;STM;Canyon;TMT|\
riolu;046;35.453;16/04/2016;.;Canyon;TMT|\
Jerome;046;35.437;14/08/2016;.;Canyon;TMT|\
riolu;046;35.407;31/08/2016;.;Canyon;TMT|\
riolu;046;35.383;21/10/2018;DUCK;Canyon;TMT|\
Samerlifofwer;046;35.37x;12/09/2020;.;Canyon;TMT|\
Samerlifofwer;046;35.35x;14/09/2020;.;Canyon;TMT|\
irtri;046;35.338;05/09/2021;.;Canyon;TMT|\
irtri;046;35.330;05/09/2021;.;Canyon;TMT|\
Cloud;046;35.288;05/05/2022;.;Canyon;TMT|\
Mebe12;046;35.265;05/05/2022;.;Canyon;TMT|\
Mebe12;046;35.226;05/05/2022;.;Canyon;TMT|\
Quentin43;046;35.218;25/04/2023;.;Canyon;TMT|\
Quentin43;046;35.190;27/04/2023;.;Canyon;TMT|\
Stik;047;32.897;24/03/2016;.;Canyon;TMT|\
mctavish01;047;32.890;25/03/2016;STM;Canyon;TMT|\
Greenius;047;32.322;25/03/2016;.;Canyon;TMT|\
hal.ko.TimaE;047;32.137;26/03/2016;.;Canyon;TMT|\
riolu;047;32.116;27/03/2016;.;Canyon;TMT|\
riolu;047;32.045;08/04/2016;.;Canyon;TMT|\
Azora;047;31.870;08/04/2016;.;Canyon;TMT|\
Azora;047;31.820;29/04/2016;.;Canyon;TMT|\
Azora;047;31.772;01/05/2016;.;Canyon;TMT|\
riolu;047;31.577;03/11/2018;DUCK;Canyon;TMT|\
Gunther;047;31.55x;29/04/2020;.;Canyon;TMT|\
Gunther;047;31.348;30/04/2020;.;Canyon;TMT|\
fanakuri;047;31.347;21/05/2022;.;Canyon;TMT|\
Azora;048;30.195;24/03/2016;.;Canyon;TMT|\
hal.ko.TimaE;048;30.068;25/03/2016;.;Canyon;TMT|\
Alewka;048;30.051;27/03/2016;.;Canyon;TMT|\
riolu;048;29.853;30/03/2016;STM;Canyon;TMT|\
riolu;048;29.765;04/04/2016;.;Canyon;TMT|\
Gosaft;048;29.746;06/04/2016;.;Canyon;TMT|\
riolu;048;29.726;05/05/2016;.;Canyon;TMT|\
Dark_Abyssii;048;29.696;11/11/2019;Cheated;Canyon;TMT|\
riolu;048;29.658;01/07/2020;.;Canyon;TMT|\
Crinatiraxx;048;29.663;25/06/2021;DUCK;Canyon;TMT|\
fanakuri;048;29.631;14/10/2021;.;Canyon;TMT|\
Mebe12;048;29.601;15/10/2021;.;Canyon;TMT|\
fanakuri;048;29.593;19/10/2021;.;Canyon;TMT|\
Mebe12;048;29.550;03/11/2021;.;Canyon;TMT|\
fanakuri;048;29.536;20/03/2024;.;Canyon;TMT|\
Dark_QFX;049;37.442;24/03/2016;.;Canyon;TMT|\
masterkey;049;37.213;25/03/2016;.;Canyon;TMT|\
introC;049;37.165;27/03/2016;.;Canyon;TMT|\
meson;049;37.110;28/03/2016;.;Canyon;TMT|\
Alewka;049;36.950;02/04/2016;STM;Canyon;TMT|\
riolu;049;36.865;07/04/2016;.;Canyon;TMT|\
marios2000;049;36.710;10/04/2016;.;Canyon;TMT|\
riolu;049;36.578;14/04/2016;.;Canyon;TMT|\
Dark_Abyssii;049;36.55x;26/07/2019;.;Canyon;TMT|\
RS Tornado;049;36.52x;??/??/2019;.;Canyon;TMT|\
Dark_Abyssii;049;36.515;19/08/2019;.;Canyon;TMT|\
riolu;049;36.503;19/08/2019;.;Canyon;TMT|\
RS Tornado;049;36.480;05/03/2020;Cheated;Canyon;TMT|\
riolu;049;36.441;01/07/2020;.;Canyon;TMT|\
fanakuri;049;36.468;25/06/2021;DUCK;Canyon;TMT|\
fanakuri;049;36.430;29/10/2021;.;Canyon;TMT|\
fanakuri;049;36.396;14/07/2022;.;Canyon;TMT|\
fanakuri;049;36.353;14/07/2022;.;Canyon;TMT|\
Pac;050;1:31.968;24/03/2016;.;Canyon;TMT|\
Greenius;050;1:31.738;25/03/2016;.;Canyon;TMT|\
Galax39;050;1:31.202;27/03/2016;.;Canyon;TMT|\
introC;050;1:30.636;27/03/2016;STM;Canyon;TMT|\
Zypher;050;1:30.295;14/04/2016;.;Canyon;TMT|\
riolu;050;1:30.206;22/04/2016;.;Canyon;TMT|\
asier;050;1:30.166;28/10/2016;.;Canyon;TMT|\
asier;050;1:30.025;28/10/2016;Live;Canyon;TMT|\
riolu;050;1:29.926;13/12/2016;.;Canyon;TMT|\
riolu;050;1:28.868;30/10/2018;DUCK;Canyon;TMT|\
Mebe12;050;1:28.454;05/02/2021;.;Canyon;TMT|\
fanakuri;050;1:28.278;27/10/2021;.;Canyon;TMT|\
Mebe12;050;1:28.004;13/11/2021;.;Canyon;TMT|\
fanakuri;050;1:27.945;15/11/2022;.;Canyon;TMT|\
Mebe12;050;1:27.845;16/12/2022;.;Canyon;TMT|\
fanakuri;050;1:27.828;27/12/2022;.;Canyon;TMT|\
Mebe12;050;1:27.826;02/01/2023;.;Canyon;TMT|\
fanakuri;050;1:27.808;09/01/2023;.;Canyon;TMT|\
Dark_QFX;051;36.931;24/03/2016;.;Valley;TMT|\
Vyrisus;051;36.818;01/04/2016;.;Valley;TMT|\
Cravellas;051;36.786;02/04/2016;STM;Valley;TMT|\
riolu;051;36.556;02/04/2016;.;Valley;TMT|\
riolu;051;36.503;05/04/2016;kek_kekington;Valley;TMT|\
riolu;051;36.495;21/10/2016;.;Valley;TMT|\
riolu;051;36.488;25/10/2016;.;Valley;TMT|\
asier;051;36.443;20/02/2017;Live;Valley;TMT|\
riolu;051;36.424;30/03/2017;.;Valley;TMT|\
Yuki;051;36.411;05/04/2019;.;Valley;TMT|\
riolu;051;36.278;06/04/2019;.;Valley;TMT|\
acidmist;051;36.301;??/??/????;DUCK;Valley;TMT|\
GravelGuy;051;36.264;20/07/2021;.;Valley;TMT|\
ender;051;36.183;02/10/2021;.;Valley;TMT|\
GravelGuy;051;36.094;26/01/2022;.;Valley;TMT|\
ender;051;36.075;15/07/2022;.;Valley;TMT|\
Koenz;052;30.123;24/03/2016;.;Valley;TMT|\
Slimpikcet;052;30.004;25/03/2016;.;Valley;TMT|\
riolu;052;29.953;01/04/2016;.;Valley;TMT|\
Loko;052;29.881;19/04/2016;STM;Valley;TMT|\
riolu;052;29.799;29/04/2016;.;Valley;TMT|\
Neko;052;29.785;19/06/2016;.;Valley;TMT|\
riolu;052;29.770;19/06/2016;.;Valley;TMT|\
riolu;052;29.706;29/06/2016;.;Valley;TMT|\
Demedi;052;29.632;01/09/2018;Live;Valley;TMT|\
riolu;052;29.616;20/09/2018;DUCK;Valley;TMT|\
Speed;052;29.614;13/08/2021;.;Valley;TMT|\
fanakuri;052;29.612;20/09/2021;.;Valley;TMT|\
fanakuri;052;29.585;21/09/2021;.;Valley;TMT|\
fanakuri;052;29.564;12/09/2023;.;Valley;TMT|\
fanakuri;052;29.547;12/09/2023;.;Valley;TMT|\
fanakuri;052;29.484;18/09/2023;.;Valley;TMT|\
Luffy;053;33.073;24/03/2016;.;Valley;TMT|\
NeYo-8826;053;33.071;25/03/2016;.;Valley;TMT|\
Scholly1896;053;33.056;26/03/2016;.;Valley;TMT|\
Lektro89;053;33.052;26/03/2016;.;Valley;TMT|\
Doc_Me4ik;053;33.046;28/03/2016;.;Valley;TMT|\
riolu;053;32.998;28/03/2016;STM;Valley;TMT|\
riolu;053;32.960;07/04/2016;.;Valley;TMT|\
Luffy;053;32.906;10/05/2016;.;Valley;TMT|\
Luffy;053;32.861;11/05/2016;.;Valley;TMT|\
Luffy;053;32.836;12/05/2016;.;Valley;TMT|\
riolu;053;32.824;18/05/2016;.;Valley;TMT|\
DarkLink94;053;32.780;12/06/2016;Cheated;Valley;TMT|\
riolu;053;32.764;11/06/2016;.;Valley;TMT|\
DarkLink94;053;32.771;08/08/2021;DUCK;Valley;TMT|\
fanakuri;053;32.763;08/07/2022;.;Valley;TMT|\
fanakuri;053;32.752;11/09/2023;.;Valley;TMT|\
fanakuri;053;32.738;11/09/2023;.;Valley;TMT|\
Purification;054;36.458;24/03/2016;.;Valley;TMT|\
styx;054;36.224;25/03/2016;.;Valley;TMT|\
Nahoy;054;36.158;29/03/2016;.;Valley;TMT|\
L94;054;36.011;30/03/2016;STM;Valley;TMT|\
riolu;054;35.131;01/04/2016;.;Valley;TMT|\
Spam;054;35.120;21/11/2016;.;Valley;TMT|\
riolu;054;35.067;24/11/2016;.;Valley;TMT|\
riolu;054;35.022;24/11/2016;.;Valley;TMT|\
riolu;054;34.975;24/11/2016;.;Valley;TMT|\
Demedi;054;34.870;30/08/2018;New Cut;Valley;TMT|\
Lanz;054;33.959;09/12/2018;.;Valley;TMT|\
riolu;054;33.677;09/12/2018;DUCK;Valley;TMT|\
Samerlifofwer;054;32.709;07/03/2019;.;Valley;TMT|\
fanakuri;054;32.477;08/06/2022;.;Valley;TMT|\
Purification;055;2:00.278;24/03/2016;.;Valley;TMT|\
Session005;055;2:00251;27/03/2016;Sub 2:00;Valley;TMT|\
DrBob;055;1:59.45x;28/03/2016;.;Valley;TMT|\
SiXav78;055;1:59.267;28/03/2016;Sub 1:58;Valley;TMT|\
riolu;055;1:57.958;01/04/2016;.;Valley;TMT|\
riolu;055;1:57.415;11/05/2016;.;Valley;TMT|\
riolu;055;1:57.301;15/05/2016;STM;Valley;TMT|\
Neko;055;1:56.765;11/06/2016;.;Valley;TMT|\
riolu;055;1:56.532;30/07/2016;Live;Valley;TMT|\
riolu;055;1:55.934;30/09/2018;DUCK;Valley;TMT|\
Speed;055;1:55.775;17/09/2019;.;Valley;TMT|\
Speed;055;1:55.490;18/09/2019;.;Valley;TMT|\
Speed;055;1:55.339;19/11/2020;.;Valley;TMT|\
Speed;055;1:55.124;19/11/2020;Sub 1:55;Valley;TMT|\
fanakuri;055;1:54.975;04/12/2021;.;Valley;TMT|\
Mazzargh;056;31.128;24/03/2016;.;Valley;TMT|\
Session005;056;31.007;27/03/2016;STM;Valley;TMT|\
riolu;056;30.578;28/03/2016;kek_kekington;Valley;TMT|\
riolu;056;30.533;21/10/2016;.;Valley;TMT|\
riolu;056;30.468;27/10/2016;His First WR;Valley;TMT|\
Speed;056;30.442;02/04/2018;.;Valley;TMT|\
riolu;056;30.36x;??/04/2018;Live;Valley;TMT|\
riolu;056;30.348;25/04/2018;.;Valley;TMT|\
ender;056;30.407;20/09/2021;DUCK;Valley;TMT|\
fanakuri;056;30.328;22/09/2021;.;Valley;TMT|\
fanakuri;056;30.252;23/09/2021;.;Valley;TMT|\
riolu;057;31.365;24/03/2016;.;Valley;TMT|\
kaka;057;31.223;31/03/2016;STM;Valley;TMT|\
NeYo-8826;057;29.776;01/04/2016;.;Valley;TMT|\
riolu;057;29.268;03/01/2019;DUCK;Valley;TMT|\
RS Tornado;057;29.263;20/02/2021;.;Valley;TMT|\
fanakuri;057;28.962;01/11/2022;.;Valley;TMT|\
animruler2;058;36.683;24/03/2016;.;Valley;TMT|\
NixGames;058;36.666;25/03/2016;.;Valley;TMT|\
Stik;058;36.582;26/03/2016;.;Valley;TMT|\
awba1;058;36.515;27/03/2016;.;Valley;TMT|\
hal.ko.timaE;058;36.485;27/03/2016;.;Valley;TMT|\
DeathRow;058;36.422;29/03/2016;.;Valley;TMT|\
SiXav78;058;36.401;30/03/2016;.;Valley;TMT|\
riolu;058;36.34x;08/04/2016;New Cut;Valley;TMT|\
Nawk;058;34.268;08/04/2016;STM;Valley;TMT|\
NeYo-8826;058;34.234;10/04/2016;.;Valley;TMT|\
asier;058;34.212;03/10/2016;.;Valley;TMT|\
NeYo-8826;058;34.139;28/11/2016;Live;Valley;TMT|\
riolu;058;34.004;06/01/2019;.;Valley;TMT|\
RS Tornado;058;34.10x;??/??/????;.;Valley;TMT|\
Samerlifofwer;058;34.08x;21/06/2021;Never Uploded;Valley;TMT|\
Samerlifofwer;058;34.005;??/12/2021;DUCK;Valley;TMT|\
fanakuri;058;33.989;11/01/2023;.;Valley;TMT|\
Mazzargh;059;37.931;24/03/2016;.;Valley;TMT|\
NixGames;059;37.723;25/03/2016;.;Valley;TMT|\
Njin;059;37.544;26/03/2016;.;Valley;TMT|\
Lars;059;37.352;26/03/2016;.;Valley;TMT|\
styx;059;37.256;26/03/2016;.;Valley;TMT|\
riolu;059;37.142;01/04/2016;.;Valley;TMT|\
DarkLink94;059;37.09x;??/??/2016;STM;Valley;TMT|\
DarkLink94;059;36.948;02/05/2016;.;Valley;TMT|\
riolu;059;36.938;07/05/2016;.;Valley;TMT|\
asier;059;30.911;26/10/2016;.;Valley;TMT|\
riolu;059;30.878;27/10/2016;.;Valley;TMT|\
DarkLink94;059;30.866;23/11/2016;.;Valley;TMT|\
riolu;059;30.758;24/11/2016;.;Valley;TMT|\
DarkLink94;059;30.722;25/11/2016;Live;Valley;TMT|\
riolu;059;30.674;01/09/2018;DUCK;Valley;TMT|\
fanakuri;059;30.641;27/08/2020;.;Valley;TMT|\
fanakuri;059;30.627;13/10/2022;.;Valley;TMT|\
fanakuri;059;30.574;13/10/2022;.;Valley;TMT|\
fanakuri;059;30.570;13/10/2022;.;Valley;TMT|\
fanakuri;059;30.548;14/10/2022;.;Valley;TMT|\
fanakuri;059;30.537;14/10/2022;.;Valley;TMT|\
fanakuri;059;30.533;14/10/2022;.;Valley;TMT|\
fanakuri;059;30.494;14/10/2022;.;Valley;TMT|\
Mazzargh;060;1:50.243;24/03/2016;.;Valley;TMT|\
introC;060;1:50.218;28/03/2016;.;Valley;TMT|\
GarmouZze;060;1:49.24x;29/03/2016;.;Valley;TMT|\
GarmouZze;060;1:47.958;30/03/2016;.;Valley;TMT|\
riolu;060;1:47.900;01/04/2016;.;Valley;TMT|\
riolu;060;1:47.505;04/05/2016;.;Valley;TMT|\
riolu;060;1:46.660;30/07/2016;STM;Valley;TMT|\
riolu;060;1:46.488;30/07/2016;.;Valley;TMT|\
riolu;060;1:46.375;14/01/2017;.;Valley;TMT|\
riolu;060;1:46.284;22/01/2017;.;Valley;TMT|\
riolu;060;1:45.848;??/??/????;.;Valley;TMT|\
Demedi;060;1:45.630;05/12/2018;Live;Valley;TMT|\
riolu;060;1:45.554;07/12/2018;DUCK;Valley;TMT|\
Speed;060;1:45.291;20/11/2020;.;Valley;TMT|\
Speed;060;1:45.128;20/11/2020;.;Valley;TMT|\
Scotsman;061;33.605;24/03/2016;.;Lagoon;TMT|\
Shezou;061;33.514;25/03/2016;.;Lagoon;TMT|\
Alexony;061;33.498;26/03/2016;.;Lagoon;TMT|\
MnstrsOmega;061;33.463;26/03/2016;.;Lagoon;TMT|\
Coradon24;061;33.408;27/03/2016;.;Lagoon;TMT|\
introC;061;33.363;28/03/2016;.;Lagoon;TMT|\
Lars;061;33.164;29/03/2016;.;Lagoon;TMT|\
styx;061;33.027;29/03/2016;.;Lagoon;TMT|\
riolu;061;32.976;01/04/2016;.;Lagoon;TMT|\
Phenomega;061;32.927;17/04/2016;STM;Lagoon;TMT|\
riolu;061;32.900;22/04/2016;.;Lagoon;TMT|\
styx;061;32.893;02/05/2016;.;Lagoon;TMT|\
riolu;061;32.837;12/06/2016;.;Lagoon;TMT|\
RS Tornado;061;32.434;02/03/2019;.;Lagoon;TMT|\
riolu;061;32.385;05/03/2019;DUCK;Lagoon;TMT|\
Lars;061;32.354;07/03/2019;.;Lagoon;TMT|\
Joltysonic;061;32.338;07/01/2020;.;Lagoon;TMT|\
Samerlifofwer;061;32.24x;23/11/2020;.;Lagoon;TMT|\
Samerlifofwer;061;32.185;01/02/2023;.;Lagoon;TMT|\
fanakuri;061;32.101;06/12/2023;.;Lagoon;TMT|\
MGM;062;30.299;24/03/2016;.;Lagoon;TMT|\
Shezou;062;30.288;25/03/2016;.;Lagoon;TMT|\
Harryvanman;062;30.255;25/03/2016;.;Lagoon;TMT|\
xxAlex765xx;062;30.234;25/03/2016;.;Lagoon;TMT|\
styx;062;30.011;25/03/2016;.;Lagoon;TMT|\
Guerro323;062;29.978;25/03/2016;.;Lagoon;TMT|\
Session005;062;29.875;27/03/2016;.;Lagoon;TMT|\
riolu;062;29.686;01/04/2016;.;Lagoon;TMT|\
ShineX;062;29.675;01/05/2016;STM;Lagoon;TMT|\
NJin;062;29.614;02/05/2016;.;Lagoon;TMT|\
riolu;062;29.505;03/05/2016;.;Lagoon;TMT|\
asier;062;29.503;10/11/2016;Live;Lagoon;TMT|\
riolu;062;29.485;04/09/2018;DUCK;Lagoon;TMT|\
Samerlifofwer;062;29.44x;22/01/2021;.;Lagoon;TMT|\
Samerlifofwer;062;29.35x;24/01/2021;.;Lagoon;TMT|\
HQCookie;062;29.336;13/11/2023;.;Lagoon;TMT|\
Samerlifofwer;062;29.305;12/01/2024;.;Lagoon;TMT|\
Koenz;063;35.325;24/03/2016;STM;Lagoon;TMT|\
Farcry69;063;35.050;03/04/2016;.;Lagoon;TMT|\
marios2000;063;35.018;19/07/2016;Live;Lagoon;TMT|\
riolu;063;34.955;04/09/2018;DUCK;Lagoon;TMT|\
Samerlifofwer;063;34.936;02/12/2020;.;Lagoon;TMT|\
Nemesis;063;34.928;04/02/2022;.;Lagoon;TMT|\
Nemesis;063;34.906;05/02/2022;.;Lagoon;TMT|\
Samerlifofwer;063;34.904;13/09/2022;.;Lagoon;TMT|\
Samerlifofwer;063;34.898;13/09/2022;.;Lagoon;TMT|\
Samerlifofwer;063;34.892;15/08/2022;.;Lagoon;TMT|\
fanakuri;063;34.880;31/10/2023;.;Lagoon;TMT|\
Samerlifofwer;063;34.851;20/05/2024;.;Lagoon;TMT|\
GarmouZze;064;33.421;24/03/2016;.;Lagoon;TMT|\
Shezou;064;33.246;25/03/2016;.;Lagoon;TMT|\
styx;064;33.241;25/03/2016;.;Lagoon;TMT|\
Guerro323;064;33.182;25/03/2016;.;Lagoon;TMT|\
Purification;064;33.103;28/03/2016;.;Lagoon;TMT|\
Danneboy;064;33.064;06/04/2016;STM;Lagoon;TMT|\
Phenomega;064;32.694;08/04/2016;.;Lagoon;TMT|\
riolu;064;32.692;16/04/2016;.;Lagoon;TMT|\
marios2000;064;32.623;19/04/2016;.;Lagoon;TMT|\
riolu;064;32.598;25/04/2018;sus;Lagoon;TMT|\
riolu;064;32.531;03/06/2019;.;Lagoon;TMT|\
RS Tornado;064;32.514;01/02/2020;Cheated;Lagoon;TMT|\
riolu;064;32.500;01/07/2020;DUCK;Lagoon;TMT|\
fanakuri;064;32.47x;03/02/2021;.;Lagoon;TMT|\
Samerlifofwer;064;32.45x;04/06/2021;.;Lagoon;TMT|\
Samerlifofwer;064;32.392;10/06/2021;.;Lagoon;TMT|\
Purification;065;1:21.387;24/03/2016;.;Lagoon;TMT|\
Lokring;065;1:21.372;25/03/2016;.;Lagoon;TMT|\
RedExtra;065;1:21.277;25/03/2016;.;Lagoon;TMT|\
Coradon24;065;1:21.272;27/03/2016;.;Lagoon;TMT|\
introC;065;1:21.005;28/03/2016;.;Lagoon;TMT|\
Phenomega;065;1:20.252;24/04/2016;STM;Lagoon;TMT|\
riolu;065;1:20.158;06/05/2016;.;Lagoon;TMT|\
styx;065;1:20.075;07/05/2016;.;Lagoon;TMT|\
riolu;065;1:20.031;15/06/2016;.;Lagoon;TMT|\
riolu;065;1:19.972;30/04/2017;.;Lagoon;TMT|\
Speed;065;1:19.970;26/07/2019;.;Lagoon;TMT|\
Speed;065;1:19.920;27/07/2019;.;Lagoon;TMT|\
Speed;065;1:19.906;27/07/2019;Cheated;Lagoon;TMT|\
riolu;065;1:19.77x;28/07/2019;.;Lagoon;TMT|\
Speed;065;1:19.856;29/11/2021;.;Lagoon;TMT|\
Speed;065;1:19.841;15/06/2022;.;Lagoon;TMT|\
Speed;065;1:19.814;16/06/2022;.;Lagoon;TMT|\
Samerlifofwer;065;1:19.802;07/10/2022;.;Lagoon;TMT|\
fanakuri;065;1:19.795;06/12/2023;DUCK;Lagoon;TMT|\
fanakuri;065;1:19.771;06/12/2023;.;Lagoon;TMT|\
fanakuri;065;1:19.732;07/12/2023;.;Lagoon;TMT|\
fanakuri;065;1:19.651;07/12/2023;.;Lagoon;TMT|\
marios2000;066;30.342;24/03/2016;.;Lagoon;TMT|\
katerbarg;066;30.145;25/03/2016;.;Lagoon;TMT|\
xxAlex765xx;066;29.865;25/03/2016;.;Lagoon;TMT|\
introC;066;29.531;29/03/2016;.;Lagoon;TMT|\
styx;066;29.425;03/04/2016;.;Lagoon;TMT|\
riolu;066;29.185;07/04/2016;STM;Lagoon;TMT|\
riolu;066;28.681;07/04/2016;.;Lagoon;TMT|\
Danneboy;066;28.594;07/04/2016;.;Lagoon;TMT|\
riolu;066;28.568;07/04/2016;.;Lagoon;TMT|\
Danneboy;066;28.510;25/04/2016;.;Lagoon;TMT|\
riolu;066;28.458;05/05/2016;.;Lagoon;TMT|\
Danneboy;066;28.442;12/09/2016;Live;Lagoon;TMT|\
riolu;066;28.441;18/12/2016;Live;Lagoon;TMT|\
riolu;066;28.418;18/12/2016;.;Lagoon;TMT|\
Speed;066;28.345;10/09/2019;.;Lagoon;TMT|\
Crinatiraxx;066;28.344;26/02/2020;Cheated;Lagoon;TMT|\
riolu;066;28.311;01/07/2021;DUCK;Lagoon;TMT|\
RS Tornado;066;28.29x;10/02/2021;Double Driver;Lagoon;TMT|\
RS Tornado;066;28.225;10/02/2021;.;Lagoon;TMT|\
Gyrule;066;28.212;29/05/2021;.;Lagoon;TMT|\
Samerlifofwer;066;28.08x;19/06/2021;.;Lagoon;TMT|\
fanakuri;066;28.061;01/11/2023;.;Lagoon;TMT|\
fanakuri;066;27.998;01/11/2023;.;Lagoon;TMT|\
Samerlifofwer;066;27.991;17/12/2023;.;Lagoon;TMT|\
Samerlifofwer;066;27.965;17/12/2023;.;Lagoon;TMT|\
ColdM4mba;067;31.738;24/03/2016;.;Lagoon;TMT|\
Richie;067;31.536;25/03/2016;.;Lagoon;TMT|\
tayck;067;31.533;26/03/2016;.;Lagoon;TMT|\
C1R10N;067;31.500;30/03/2016;.;Lagoon;TMT|\
riolu;067;31.450;01/04/2016;STM;Lagoon;TMT|\
Canon;067;31.356;28/04/2016;.;Lagoon;TMT|\
styx;067;31.330;02/05/2016;.;Lagoon;TMT|\
riolu;067;31.318;03/06/2016;.;Lagoon;TMT|\
Samerlifofwer;067;31.300;20/02/2020;Cheated;Lagoon;TMT|\
riolu;067;31.262;01/07/2020;Cheated;Lagoon;TMT|\
Thoringer;067;31.257;04/01/2021;.;Lagoon;TMT|\
Demedi;067;31.293;??/??/????;.;Lagoon;TMT|\
ender;067;31.288;18/08/2021;.;Lagoon;TMT|\
Samerlifofwer;067;31.264;31/05/2022;.;Lagoon;TMT|\
Samerlifofwer;067;31.263;10/07/2023;DUCK;Lagoon;TMT|\
Samerlifofwer;067;31.258;10/07/2023;DUCK;Lagoon;TMT|\
Samerlifofwer;067;31.246;12/07/2023;.;Lagoon;TMT|\
Samerlifofwer;067;31.244;12/07/2023;.;Lagoon;TMT|\
Looz;068;35.662;24/03/2016;.;Lagoon;TMT|\
Beliskner999;068;35.62x;25/03/2016;STM;Lagoon;TMT|\
styx;068;35.329;26/03/2016;.;Lagoon;TMT|\
styx;068;35.324;27/03/2016;.;Lagoon;TMT|\
riolu;068;35.315;11/04/2016;New Cut;Lagoon;TMT|\
Nawk;068;34.805;13/04/2016;.;Lagoon;TMT|\
DarkLink94;068;34.530;29/01/2017;.;Lagoon;TMT|\
Anzone;068;32.86x;10/06/2018;.;Lagoon;TMT|\
Samerlifofwer;068;32.695;05/11/2018;Live;Lagoon;TMT|\
riolu;068;32.294;22/12/2018;.;Lagoon;TMT|\
fanakuri;068;32.693;14/11/2023;.;Lagoon;TMT|\
Samerlifofwer;068;32.634;30/11/2023;.;Lagoon;TMT|\
Samerlifofwer;068;32.418;03/12/2023;.;Lagoon;TMT|\
Samerlifofwer;068;32.352;04/12/2023;DUCK;Lagoon;TMT|\
fanakuri;068;32.147;05/12/2023;.;Lagoon;TMT|\
Robert;069;33.040;24/03/2016;.;Lagoon;TMT|\
CarlJr;069;33.013;25/03/2016;.;Lagoon;TMT|\
Purification;069;32.908;25/03/2016;.;Lagoon;TMT|\
Lanz;069;32.848;27/03/2016;Cheated;Lagoon;TMT|\
styx;069;32.775;03/04/2016;.;Lagoon;TMT|\
riolu;069;32.70x;16/04/2016;STM;Lagoon;TMT|\
riolu;069;32.688;16/04/2016;Cheated;Lagoon;TMT|\
styx;069;32.548;02/05/2016;Cheated;Lagoon;TMT|\
styx;069;32.508;04/05/2016;Cheated;Lagoon;TMT|\
riolu;069;32.427;14/11/2017;DUCK;Lagoon;TMT|\
Samerlifofwer;069;32.508;26/02/2022;.;Lagoon;TMT|\
Samerlifofwer;069;32.462;??/??/????;.;Lagoon;TMT|\
Samerlifofwer;069;32.453;15/09/2023;.;Lagoon;TMT|\
Samerlifofwer;069;32.448;22/09/2023;.;Lagoon;TMT|\
Samerlifofwer;069;32.435;20/11/2023;.;Lagoon;TMT|\
Scotsman;070;2:06.209;24/03/2016;.;Lagoon;TMT|\
Maverick-V8;070;2:06.188;25/03/2016;.;Lagoon;TMT|\
MnstrsOmega;070;2:05.870;25/03/2016;.;Lagoon;TMT|\
Sape27;070;2:05.870;25/03/2016;.;Lagoon;TMT|\
Hemerald;070;2:05.167;25/03/2016;.;Lagoon;TMT|\
acidmist;070;2:05.019;25/03/2016;.;Lagoon;TMT|\
Danneboy;070;2:04.781;26/03/2016;.;Lagoon;TMT|\
Alexony;070;2:04.590;26/03/2016;.;Lagoon;TMT|\
Rimba92;070;2:04.32x;26/03/2016;.;Lagoon;TMT|\
Rimba92;070;2:04.306;26/03/2016;.;Lagoon;TMT|\
riolu;070;2:04.069;01/04/2016;.;Lagoon;TMT|\
riolu;070;2:03.860;03/05/2016;.;Lagoon;TMT|\
riolu;070;2:03.666;11/05/2016;STM;Lagoon;TMT|\
riolu;070;2:03.649;11/05/2016;.;Lagoon;TMT|\
Spam;070;2:03.540;12/10/2016;.;Lagoon;TMT|\
riolu;070;2:03.460;19/12/2016;.;Lagoon;TMT|\
riolu;070;2:02.976;04/03/2019;DUCK;Lagoon;TMT|\
Samerlifofwer;070;2:02.88x;11/05/2020;.;Lagoon;TMT|\
Samerlifofwer;070;2:02.798;15/08/2023;.;Lagoon;TMT|\
DanikB;071;36.592;24/03/2016;.;Stadium;TMT|\
Erizel;071;36.495;26/03/2016;.;Stadium;TMT|\
RACETA;071;36.351;31/03/2016;STM;Stadium;TMT|\
riolu;071;36.142;01/04/2016;.;Stadium;TMT|\
racehans;071;35.913;02/04/2016;.;Stadium;TMT|\
CarlJr;071;35.873;12/04/2016;.;Stadium;TMT|\
racehans;071;35.658;02/05/2016;.;Stadium;TMT|\
riolu;071;25.545;20/02/2019;.;Stadium;TMT|\
Pinda;071;25.565;22/01/2022;DUCK;Stadium;TMT|\
HQCookie;071;35.515;28/02/2023;.;Stadium;TMT|\
HQCookie;071;35.492;08/03/2023;.;Stadium;TMT|\
faqez;071;35.465;17/04/2024;.;Stadium;TMT|\
faqez;071;35.320;23/04/2024;.;Stadium;TMT|\
lumatom;072;27.065;24/03/2016;.;Stadium;TMT|\
YxalagOiram;072;27.063;25/03/2016;.;Stadium;TMT|\
Alexony;072;27.053;26/03/2016;Sub 27;Stadium;TMT|\
Erizel;072;26.893;26/03/2016;STM;Stadium;TMT|\
riolu;072;26.623;26/03/2016;.;Stadium;TMT|\
Symbiose;072;26.61x;19/04/2016;.;Stadium;TMT|\
Symbiose;072;26.58x;20/04/2016;.;Stadium;TMT|\
racehans;072;26.567;17/11/2016;Cheated?;Stadium;TMT|\
riolu;072;26.558;18/12/2016;Cheated;Stadium;TMT|\
riolu;072;26.467;23/02/2019;.;Stadium;TMT|\
mime;072;26.535;11/08/2021;.;Stadium;TMT|\
Kilarath;072;26.533;03/05/2022;.;Stadium;TMT|\
Loupphok;072;26.528;22/12/2023;.;Stadium;TMT|\
Loupphok;072;26.521;22/12/2023;.;Stadium;TMT|\
Loupphok;072;26.471;22/12/2023;DUCK;Stadium;TMT|\
Loupphok;072;26.462;23/12/2023;.;Stadium;TMT|\
CretinusMania;073;25.838;24/03/2016;.;Stadium;TMT|\
trace_8;073;25.812;25/03/2016;.;Stadium;TMT|\
racehans;073;25.755;26/03/2016;.;Stadium;TMT|\
Alepede;073;25.750;08/04/2016;.;Stadium;TMT|\
Nino;073;25.735;19/04/2016;STM;Stadium;TMT|\
CarlJr;073;25.725;20/04/2016;.;Stadium;TMT|\
CarlJr;073;25.723;21/04/2016;.;Stadium;TMT|\
riolu;073;25.702;10/05/2016;.;Stadium;TMT|\
riolu;073;26.664;21/12/2018;DUCK;Stadium;TMT|\
Affi;073;26.655;05/03/2020;.;Stadium;TMT|\
MGM;074;35.468;24/03/2016;.;Stadium;TMT|\
Dog;074;35.245;25/03/2016;.;Stadium;TMT|\
Koenz;074;34.46x;25/03/2016;STM;Stadium;TMT|\
Koenz;074;34.368;25/03/2016;.;Stadium;TMT|\
racehans;074;34.322;02/04/2016;.;Stadium;TMT|\
FunnyBear;074;34.204;05/04/2016;.;Stadium;TMT|\
CarlJr;074;34.168;06/04/2016;.;Stadium;TMT|\
racehans;074;34.098;30/04/2016;.;Stadium;TMT|\
Spam;074;34.065;22/03/2017;Cheated;Stadium;TMT|\
riolu;074;33.808;18/10/2018;.;Stadium;TMT|\
Spam;074;33.858;06/12/2021;DUCK;Stadium;TMT|\
RotakeR;074;33.780;29/09/2023;.;Stadium;TMT|\
Globo;075;1:41.592;24/03/2016;.;Stadium;TMT|\
BoktorBanane;075;1:40.857;26/03/2016;.;Stadium;TMT|\
racehans;075;1:39.780;26/03/2016;STM;Stadium;TMT|\
riolu;075;1:39.458;31/03/2016;.;Stadium;TMT|\
CarlJr;075;1:39.261;10/04/2016;.;Stadium;TMT|\
Firop;075;1:39.224;15/04/2016;.;Stadium;TMT|\
racehans;075;1:39.015;30/04/2016;.;Stadium;TMT|\
riolu;075;1:38.924;31/08/2016;.;Stadium;TMT|\
racehans;075;1:38.846;17/11/2016;Live;Stadium;TMT|\
riolu;075;1:38.667;04/09/2018;DUCK;Stadium;TMT|\
Aziix;075;1:38.391;10/03/2020;.;Stadium;TMT|\
Aziix;075;1:38.194;15/02/2022;.;Stadium;TMT|\
Aziix;075;1:37.852;14/03/2023;.;Stadium;TMT|\
Aziix;075;1:37.694;14/03/2023;.;Stadium;TMT|\
Tekkforce;076;33.496;25/03/2016;.;Stadium;TMT|\
racehans;076;33.443;26/03/2016;STM;Stadium;TMT|\
riolu;076;33.341;31/03/2016;.;Stadium;TMT|\
Apoq;076;33.271;03/04/2016;.;Stadium;TMT|\
CarlJr;076;33.091;10/04/2016;.;Stadium;TMT|\
racehans;076;32.948;??/04/2016;.;Stadium;TMT|\
CarlJr;076;32.947;26/04/2016;.;Stadium;TMT|\
racehans;076;32.935;28/04/2016;.;Stadium;TMT|\
riolu;076;32.901;18/10/2016;.;Stadium;TMT|\
Astronautj;076;32.844;23/03/2017;Live;Stadium;TMT|\
riolu;076;32.757;13/08/2018;.;Stadium;TMT|\
fanakuri;076;32.79x;05/11/2020;DUCK;Stadium;TMT|\
fanakuri;076;32.757;??/??/????;.;Stadium;TMT|\
Sapi;076;32.677;07/07/2021;.;Stadium;TMT|\
fanakuri;076;32.666;05/05/2023;.;Stadium;TMT|\
RotakeR;076;32.567;23/09/2023;.;Stadium;TMT|\
ColdM4mba;077;31.753;24/03/2016;.;Stadium;TMT|\
Pillday;077;31.646;25/03/2016;.;Stadium;TMT|\
racehans;077;31.426;26/03/2016;.;Stadium;TMT|\
Melkey;077;31.370;27/03/2016;STM;Stadium;TMT|\
insane;077;31.161;01/04/2016;.;Stadium;TMT|\
FunnyBear;077;31.021;06/04/2016;.;Stadium;TMT|\
Spam;077;30.95x;??/??/????;Live;Stadium;TMT|\
riolu;077;30.927;11/02/2019;.;Stadium;TMT|\
Spam;077;30.951;06/12/2021;.;Stadium;TMT|\
HQCookie;077;30.946;21/03/2023;.;Stadium;TMT|\
HQCookie;077;30.937;29/03/2023;DUCK;Stadium;TMT|\
HQCookie;077;30.924;29/03/2023;.;Stadium;TMT|\
fanakuri;077;30.861;29/11/2023;.;Stadium;TMT|\
Scotsman;078;29.078;24/03/2016;.;Stadium;TMT|\
Dog;078;28.850;25/03/2016;.;Stadium;TMT|\
Pillday;078;28.824;25/03/2016;.;Stadium;TMT|\
Luffy;078;28.747;25/03/2016;.;Stadium;TMT|\
Scrapie;078;28.491;25/03/2016;.;Stadium;TMT|\
racehans;078;28.373;26/03/2016;STM;Stadium;TMT|\
riolu;078;28.094;28/03/2016;kek_kekington;Stadium;TMT|\
riolu;078;27.932;21/10/2016;.;Stadium;TMT|\
CarlJr;078;27.888;04/11/2016;Cheated;Stadium;TMT|\
riolu;078;27.848;18/10/2018;.;Stadium;TMT|\
Loupphok;078;27.878;23/04/2023;.;Stadium;TMT|\
Loupphok;078;27.860;23/04/2023;.;Stadium;TMT|\
Loupphok;078;27.855;23/04/2023;DUCK;Stadium;TMT|\
Loupphok;078;27.780;23/04/2023;.;Stadium;TMT|\
fanakuri;078;27.758;19/06/2023;.;Stadium;TMT|\
Scotsman;079;34.746;24/03/2016;.;Stadium;TMT|\
Qfireball;079;34.634;25/03/2016;.;Stadium;TMT|\
trace_8;079;34.620;25/03/2016;.;Stadium;TMT|\
Santus;079;34.615;25/03/2016;.;Stadium;TMT|\
MrLag;079;34.487;25/03/2016;.;Stadium;TMT|\
milchshakee;079;34.331;26/03/2016;.;Stadium;TMT|\
Nize;079;34.295;28/03/2016;.;Stadium;TMT|\
DanikB;079;33.960;29/03/2016;STM;Stadium;TMT|\
Pac;079;33.843;30/03/2016;.;Stadium;TMT|\
CarlJr;079;33.82x;31/03/2016;.;Stadium;TMT|\
Massa;079;33.73x;07/04/2016;.;Stadium;TMT|\
Massa;079;33.663;07/04/2016;.;Stadium;TMT|\
CarlJr;079;33.608;10/04/2016;.;Stadium;TMT|\
racehans;079;33.551;02/05/2016;Live;Stadium;TMT|\
riolu;079;33.534;30/09/2018;.;Stadium;TMT|\
HQCookie;079;33.550;02/05/2016;.;Stadium;TMT|\
HQCookie;079;33.548;13/02/2023;DUCK;Stadium;TMT|\
HQCookie;079;33.513;13/02/2023;.;Stadium;TMT|\
RotakeR;079;33.465;11/11/2023;.;Stadium;TMT|\
Pascow;080;1:52.714;24/03/2016;.;Stadium;TMT|\
NixGames;080;1:52.108;25/03/2016;.;Stadium;TMT|\
xxAlex765xx;080;1:51.911;25/03/2016;.;Stadium;TMT|\
DanikB;080;1:49.766;25/03/2016;.;Stadium;TMT|\
Nize;080;1:49.281;28/03/2016;.;Stadium;TMT|\
Marco;080;1:49.046;30/02/2016;.;Stadium;TMT|\
racehans;080;1:48.408;02/04/2016;STM;Stadium;TMT|\
CarlJr;080;1:47.914;05/04/2016;.;Stadium;TMT|\
racehans;080;1:47.588;03/05/2016;Cheated;Stadium;TMT|\
riolu;080;1:47.475;22/10/2018;.;Stadium;TMT|\
Sapi;080;1:47.543;13/08/2021;DUCK;Stadium;TMT|\
Sapi;080;1:47.293;13/08/2021;.;Stadium;TMT|\
HQCookie;080;1:47.286;15/07/2024;.;Stadium;TMT|\
marios2000;081;40.128;24/03/2016;.;Canyon;TMT|\
B25KEN;081;40.003;25/03/2016;.;Canyon;TMT|\
Jerome;081;39.767;26/03/2016;.;Canyon;TMT|\
Danneboy;081;39.667;26/03/2016;.;Canyon;TMT|\
Galax39;081;39.488;26/03/2016;.;Canyon;TMT|\
Canon;081;39.408;28/03/2016;.;Canyon;TMT|\
Nodd;081;39.278;12/04/2016;.;Canyon;TMT|\
Zypher;081;39.200;18/04/2016;.;Canyon;TMT|\
CarlJr;081;39.048;28/04/2016;.;Canyon;TMT|\
riolu;081;38.992;07/05/2016;.;Canyon;TMT|\
Zypher;081;38.952;18/05/2016;.;Canyon;TMT|\
Zypher;081;38.896;19/05/2016;STM;Canyon;TMT|\
Zypher;081;38.850;19/05/2016;.;Canyon;TMT|\
riolu;081;38.807;06/04/2016;.;Canyon;TMT|\
fanakuri;081;38.562;-;.;Canyon;TMT|\
Azora;082;39.288;24/03/2016;.;Canyon;TMT|\
Lars;082;39.278;25/03/2016;.;Canyon;TMT|\
Lokring;082;39.064;25/03/2016;.;Canyon;TMT|\
Greenius;082;39.010;26/03/2016;.;Canyon;TMT|\
riolu;082;38.935;13/04/2016;STM;Canyon;TMT|\
riolu;082;38.926;06/05/2016;.;Canyon;TMT|\
7Alvin;082;38.920;18/05/2016;.;Canyon;TMT|\
riolu;082;38.916;26/05/2016;.;Canyon;TMT|\
Mebe12;082;38.857;-;.;Canyon;TMT|\
GRX;083;34.150;24/03/2016;.;Canyon;TMT|\
Lars;083;33.198;25/03/2016;.;Canyon;TMT|\
Nize;083;33.175;28/03/2016;.;Canyon;TMT|\
Lemonte;083;33.128;31/03/2016;.;Canyon;TMT|\
Nightmartin;083;32.547;03/04/2016;.;Canyon;TMT|\
riolu;083;31.862;11/04/2016;.;Canyon;TMT|\
Azora;083;31.836;24/05/2016;.;Canyon;TMT|\
fanakuri;083;31.727;-;.;Canyon;TMT|\
MGM;084;47.100;24/03/2016;.;Canyon;TMT|\
Robert;084;46.717;25/03/2016;.;Canyon;TMT|\
asier;084;46.648;26/03/2016;.;Canyon;TMT|\
Alexony;084;46.013;27/03/2016;.;Canyon;TMT|\
L94;084;44.826;02/04/2016;.;Canyon;TMT|\
riolu;084;44.258;05/04/2016;.;Canyon;TMT|\
riolu;084;44.163;03/05/2016;.;Canyon;TMT|\
riolu;084;44.020;03/05/2016;.;Canyon;TMT|\
riolu;084;43.967;05/05/2016;.;Canyon;TMT|\
Mebe12;084;43.343;-;.;Canyon;TMT|\
JuelzMtojay;085;2:45.269;24/03/2016;.;Canyon;TMT|\
Sepe27;085;2:44.424;25/03/2016;.;Canyon;TMT|\
Stik;085;2:43.688;26/03/2016;.;Canyon;TMT|\
masterkey;085;2:43.499;26/03/2016;.;Canyon;TMT|\
Bill;085;2:42.843;26/03/2016;.;Canyon;TMT|\
asier;085;2:42.101;26/03/2016;.;Canyon;TMT|\
racehans;085;2:41.949;26/03/2016;.;Canyon;TMT|\
Danneyboy;085;2:39.012;29/03/2016;.;Canyon;TMT|\
riolu;085;2:38.309;04/04/2016;.;Canyon;TMT|\
fanakuri;085;2:36.589;-;.;Canyon;TMT|\
marios2000;086;43.995;24/03/2016;.;Canyon;TMT|\
Greenius;086;43.572;26/03/2016;.;Canyon;TMT|\
Richie;086;43.477;27/03/2016;.;Canyon;TMT|\
riolu;086;43.237;03/04/2016;.;Canyon;TMT|\
riolu;086;43.108;15/05/2016;.;Canyon;TMT|\
Zypher;086;43.052;20/05/2016;.;Canyon;TMT|\
riolu;086;42.937;23/05/2016;.;Canyon;TMT|\
fanakuri;086;-;-;.;Canyon;TMT|\
marios2000;087;48.051;24/03/2016;.;Canyon;TMT|\
Maddeeen;087;47.795;27/03/2016;.;Canyon;TMT|\
Lemonte;087;47.688;31/03/2016;.;Canyon;TMT|\
Eve_v;087;47.538;01/04/2016;.;Canyon;TMT|\
riolu;087;46.888;03/04/2016;.;Canyon;TMT|\
Zypher;087;46.880;20/05/2016;.;Canyon;TMT|\
riolu;087;46.807;23/05/2016;.;Canyon;TMT|\
fanakuri;087;-;-;.;Canyon;TMT|\
hec_ker;088;39.995;24/03/2016;.;Canyon;TMT|\
badvertex;088;39.913;25/03/2016;.;Canyon;TMT|\
invader3;088;39.467;26/03/2016;.;Canyon;TMT|\
riolu;088;38.956;05/04/2016;.;Canyon;TMT|\
riolu;088;38.872;07/04/2016;.;Canyon;TMT|\
Zypher;088;38.708;20/05/2016;.;Canyon;TMT|\
riolu;088;38.515;23/05/2016;.;Canyon;TMT|\
fanakuri;088;-;-;.;Canyon;TMT|\
atomariel;089;53.580;24/03/2016;.;Canyon;TMT|\
ColdM4mba;089;53.052;25/03/2016;.;Canyon;TMT|\
Brosha;089;52.470;25/03/2016;.;Canyon;TMT|\
Greenius;089;51.892;26/03/2016;.;Canyon;TMT|\
riolu;089;51.077;03/04/2016;.;Canyon;TMT|\
Zypher;089;50.815;20/05/2016;.;Canyon;TMT|\
Zypher;089;50.570;20/05/2016;.;Canyon;TMT|\
Zypher;089;50.533;20/05/2016;.;Canyon;TMT|\
riolu;089;50.455;04/06/2016;.;Canyon;TMT|\
fanakuri;089;-;-;.;Canyon;TMT|\
JuelzMtojay;090;3:00.720;24/03/2016;.;Canyon;TMT|\
Lokring;090;2:58.729;25/03/2016;.;Canyon;TMT|\
masterkey;090;2:58.477;26/03/2016;.;Canyon;TMT|\
racehans;090;2:58.367;26/03/2016;.;Canyon;TMT|\
riolu;090;2:56.365;02/04/2016;.;Canyon;TMT|\
acidmist;090;2:55.404;17/05/2016;.;Canyon;TMT|\
fanakuri;090;-;-;.;Canyon;TMT|\
marios2000;091;-;-;.;Valley;TMT|\
Mazzargh;091;-;-;.;Valley;TMT|\
Lemonte;091;-;-;.;Valley;TMT|\
riolu;091;-;-;.;Valley;TMT|\
riolu;091;-;-;.;Valley;TMT|\
riolu;091;-;-;.;Valley;TMT|\
fanakuri;091;-;-;.;Valley;TMT|\
MGM;092;-;-;.;Valley;TMT|\
Lars;092;-;-;.;Valley;TMT|\
MatrixX;092;-;-;.;Valley;TMT|\
Luffy;092;-;-;.;Valley;TMT|\
DanikB;092;-;-;.;Valley;TMT|\
styx;092;-;-;.;Valley;TMT|\
riolu;092;-;-;.;Valley;TMT|\
Neko;092;-;-;.;Valley;TMT|\
riolu;092;-;-;.;Valley;TMT|\
riolu;092;-;-;.;Valley;TMT|\
riolu;092;-;-;.;Valley;TMT|\
fanakuri;092;-;-;.;Valley;TMT|\
Looz;093;-;-;.;Valley;TMT|\
atomariel;093;-;-;.;Valley;TMT|\
slimpikcet;093;-;-;.;Valley;TMT|\
BigBang1112;093;-;-;.;Valley;TMT|\
riolu;093;-;-;.;Valley;TMT|\
NeYo-8826;093;-;-;.;Valley;TMT|\
fanakuri;093;-;-;.;Valley;TMT|\
MGM;094;-;-;.;Valley;TMT|\
ColdM4mba;094;-;-;.;Valley;TMT|\
KamiPenguin;094;-;-;.;Valley;TMT|\
riolu;094;-;-;.;Valley;TMT|\
riolu;094;-;-;.;Valley;TMT|\
fanakuri;094;-;-;.;Valley;TMT|\
Slafz;095;-;-;.;Valley;TMT|\
Lars;095;-;-;.;Valley;TMT|\
Luffy;095;-;-;.;Valley;TMT|\
Mazzargh;095;-;-;.;Valley;TMT|\
Robert;095;-;-;.;Valley;TMT|\
Zypher;095;-;-;.;Valley;TMT|\
riolu;095;-;-;.;Valley;TMT|\
riolu;095;-;-;.;Valley;TMT|\
Neko;095;-;-;.;Valley;TMT|\
riolu;095;-;-;.;Valley;TMT|\
fanakuri;095;-;-;.;Valley;TMT|\
Pac;096;-;-;.;Valley;TMT|\
Lars;096;-;-;.;Valley;TMT|\
Mazzargh;096;-;-;.;Valley;TMT|\
KevinStrike;096;-;-;.;Valley;TMT|\
Adivision;096;-;-;.;Valley;TMT|\
Lear14ex;096;-;-;.;Valley;TMT|\
riolu;096;-;-;.;Valley;TMT|\
riolu;096;-;-;.;Valley;TMT|\
fanakuri;096;-;-;.;Valley;TMT|\
MGM;097;-;-;.;Valley;TMT|\
RedExtra;097;-;-;.;Valley;TMT|\
racehans;097;-;-;.;Valley;TMT|\
Koenz;097;-;-;.;Valley;TMT|\
riolu;097;-;-;.;Valley;TMT|\
riolu;097;-;-;.;Valley;TMT|\
fanakuri;097;-;-;.;Valley;TMT|\
Pac;098;-;-;.;Valley;TMT|\
asier;098;-;-;.;Valley;TMT|\
Coradon24;098;-;-;.;Valley;TMT|\
Nawk;098;-;-;.;Valley;TMT|\
NeYo-8826;098;-;-;.;Valley;TMT|\
fanakuri;098;-;-;.;Valley;TMT|\
MGM;099;-;-;.;Valley;TMT|\
Lars;099;-;-;.;Valley;TMT|\
DanikB;099;-;-;.;Valley;TMT|\
Mazzargh;099;-;-;.;Valley;TMT|\
riolu;099;-;-;.;Valley;TMT|\
riolu;099;-;-;.;Valley;TMT|\
riolu;099;-;-;.;Valley;TMT|\
riolu;099;-;-;.;Valley;TMT|\
fanakuri;099;-;-;.;Valley;TMT|\
Scotsman;100;-;-;.;Valley;TMT|\
Pac;100;-;-;.;Valley;TMT|\
styx;100;-;-;.;Valley;TMT|\
Alexony;100;-;-;.;Valley;TMT|\
Granady;100;-;-;.;Valley;TMT|\
L94;100;-;-;.;Valley;TMT|\
riolu;100;-;-;.;Valley;TMT|\
riolu;100;-;-;.;Valley;TMT|\
riolu;100;-;-;.;Valley;TMT|\
riolu;100;-;-;.;Valley;TMT|\
fanakuri;100;-;-;.;Valley;TMT|\
MGM;101;-;-;.;Lagoon;TMT|\
Luffy;101;-;-;.;Lagoon;TMT|\
styx;101;-;-;.;Lagoon;TMT|\
brosha;101;-;-;.;Lagoon;TMT|\
racehans;101;-;-;.;Lagoon;TMT|\
Lars;101;-;-;.;Lagoon;TMT|\
riolu;101;-;-;.;Lagoon;TMT|\
riolu;101;-;-;.;Lagoon;TMT|\
riolu;101;-;-;.;Lagoon;TMT|\
Laznox;101;-;-;.;Lagoon;TMT|\
Laznox;101;-;-;.;Lagoon;TMT|\
riolu;101;-;-;.;Lagoon;TMT|\
Laznox;101;-;-;.;Lagoon;TMT|\
riolu;101;-;-;.;Lagoon;TMT|\
Laznox;101;-;-;.;Lagoon;TMT|\
riolu;101;-;-;.;Lagoon;TMT|\
fanakuri;101;-;-;.;Lagoon;TMT|\
marios2000;102;-;-;.;Lagoon;TMT|\
MGM;102;-;-;.;Lagoon;TMT|\
Luffy;102;-;-;.;Lagoon;TMT|\
Robert;102;-;-;.;Lagoon;TMT|\
styx;102;-;-;.;Lagoon;TMT|\
RedExtra;102;-;-;.;Lagoon;TMT|\
Izu-3;102;-;-;.;Lagoon;TMT|\
Erizel;102;-;-;.;Lagoon;TMT|\
riolu;102;-;-;.;Lagoon;TMT|\
Corbaq;102;-;-;.;Lagoon;TMT|\
riolu;102;-;-;.;Lagoon;TMT|\
dkdevilsoul5;102;-;-;.;Lagoon;TMT|\
RS Tornado;102;-;-;.;Lagoon;TMT|\
Tgys;103;-;-;.;Lagoon;TMT|\
MGM;103;-;-;.;Lagoon;TMT|\
funnybear;103;-;-;.;Lagoon;TMT|\
Robert;103;-;-;.;Lagoon;TMT|\
Sypher;103;-;-;.;Lagoon;TMT|\
Adivision;103;-;-;.;Lagoon;TMT|\
riolu;103;-;-;.;Lagoon;TMT|\
Hivee;103;-;-;.;Lagoon;TMT|\
riolu;103;-;-;.;Lagoon;TMT|\
DarkLink94;103;-;-;.;Lagoon;TMT|\
Samerlifofwer;103;-;-;.;Lagoon;TMT|\
Excitude50;104;-;-;.;Lagoon;TMT|\
MGM;104;-;-;.;Lagoon;TMT|\
funnybear;104;-;-;.;Lagoon;TMT|\
Purification;104;-;-;.;Lagoon;TMT|\
Lars;104;-;-;.;Lagoon;TMT|\
ImperialApo;104;-;-;.;Lagoon;TMT|\
styx;104;-;-;.;Lagoon;TMT|\
riolu;104;-;-;.;Lagoon;TMT|\
Neko;104;-;-;.;Lagoon;TMT|\
riolu;104;-;-;.;Lagoon;TMT|\
fanakuri;104;-;-;.;Lagoon;TMT|\
Scotsman;105;-;-;.;Lagoon;TMT|\
MGM;105;-;-;.;Lagoon;TMT|\
Luffy;105;-;-;.;Lagoon;TMT|\
Robert;105;-;-;.;Lagoon;TMT|\
styx;105;-;-;.;Lagoon;TMT|\
Coradon24;105;-;-;.;Lagoon;TMT|\
L94;105;-;-;.;Lagoon;TMT|\
riolu;105;-;-;.;Lagoon;TMT|\
Fugma;105;-;-;.;Lagoon;TMT|\
riolu;105;-;-;.;Lagoon;TMT|\
Samerlifofwer;105;-;-;.;Lagoon;TMT|\
Eole;106;-;-;.;Lagoon;TMT|\
Pac;106;-;-;.;Lagoon;TMT|\
MGM;106;-;-;.;Lagoon;TMT|\
Luffy;106;-;-;.;Lagoon;TMT|\
Mazzargh;106;-;-;.;Lagoon;TMT|\
Galax39;106;-;-;.;Lagoon;TMT|\
Slafz;106;-;-;.;Lagoon;TMT|\
Coradon24;106;-;-;.;Lagoon;TMT|\
riolu;106;-;-;.;Lagoon;TMT|\
NJin;106;-;-;.;Lagoon;TMT|\
Neko;106;-;-;.;Lagoon;TMT|\
riolu;106;-;-;.;Lagoon;TMT|\
Samerlifofwer;106;-;-;.;Lagoon;TMT|\
Neyne-Inf;107;-;-;.;Lagoon;TMT|\
Pac;107;-;-;.;Lagoon;TMT|\
MGM;107;-;-;.;Lagoon;TMT|\
Luffy;107;-;-;.;Lagoon;TMT|\
styx;107;-;-;.;Lagoon;TMT|\
riolu;107;-;-;.;Lagoon;TMT|\
riolu;107;-;-;.;Lagoon;TMT|\
Samerlifofwer;107;-;-;.;Lagoon;TMT|\
Koenz;108;-;-;.;Lagoon;TMT|\
Pac;108;-;-;.;Lagoon;TMT|\
MGM;108;-;-;.;Lagoon;TMT|\
Luffy;108;-;-;.;Lagoon;TMT|\
funnybear;108;-;-;.;Lagoon;TMT|\
rublur;108;-;-;.;Lagoon;TMT|\
RedExtra;108;-;-;.;Lagoon;TMT|\
BigBang1112;108;-;-;.;Lagoon;TMT|\
NJin;108;-;-;.;Lagoon;TMT|\
riolu;108;-;-;.;Lagoon;TMT|\
NJin;108;-;-;.;Lagoon;TMT|\
Samerlifofwer;108;-;-;.;Lagoon;TMT|\
marios2000;109;-;-;.;Lagoon;TMT|\
acidmist;109;-;-;.;Lagoon;TMT|\
funnybear;109;-;-;.;Lagoon;TMT|\
EmulsifyTO;109;-;-;.;Lagoon;TMT|\
riolu;109;-;-;.;Lagoon;TMT|\
riolu;109;-;-;.;Lagoon;TMT|\
TheBoldMan;109;-;-;.;Lagoon;TMT|\
Samerlifofwer;109;-;-;.;Lagoon;TMT|\
Scotsman;110;-;-;.;Lagoon;TMT|\
Luffy;110;-;-;.;Lagoon;TMT|\
redhawk;110;-;-;.;Lagoon;TMT|\
brosha;110;-;-;.;Lagoon;TMT|\
CarlJr;110;-;-;.;Lagoon;TMT|\
Richie;110;-;-;.;Lagoon;TMT|\
riolu;110;-;-;.;Lagoon;TMT|\
riolu;110;-;-;.;Lagoon;TMT|\
styx;110;-;-;.;Lagoon;TMT|\
Samerlifofwer;110;-;-;.;Lagoon;TMT|\
Scotsman;111;-;-;.;Stadium;TMT|\
funnybear;111;-;-;.;Stadium;TMT|\
RedExtra;111;-;-;.;Stadium;TMT|\
Nelkey;111;-;-;.;Stadium;TMT|\
Koenz;111;-;-;.;Stadium;TMT|\
Koenz;111;-;-;.;Stadium;TMT|\
racehans;111;-;-;.;Stadium;TMT|\
RotakeR;111;-;-;.;Stadium;TMT|\
Koenz;112;-;-;.;Stadium;TMT|\
Zimiio;112;-;-;.;Stadium;TMT|\
DragonCreepr;112;-;-;.;Stadium;TMT|\
NixGames;112;-;-;.;Stadium;TMT|\
NixGames;112;-;-;.;Stadium;TMT|\
Nawk;112;-;-;.;Stadium;TMT|\
Super0rs;112;-;-;.;Stadium;TMT|\
Keby;112;-;-;.;Stadium;TMT|\
Nize;112;-;-;.;Stadium;TMT|\
CarlJr;112;-;-;.;Stadium;TMT|\
Emiel;112;-;-;.;Stadium;TMT|\
racehans;112;-;-;.;Stadium;TMT|\
Emiel;112;-;-;.;Stadium;TMT|\
fanakuri;112;-;-;.;Stadium;TMT|\
Scotsman;113;-;-;.;Stadium;TMT|\
Pac;113;-;-;.;Stadium;TMT|\
Koenz;113;-;-;.;Stadium;TMT|\
CarlJr;113;-;-;.;Stadium;TMT|\
racehans;113;-;-;.;Stadium;TMT|\
RotakeR;113;-;-;.;Stadium;TMT|\
Koenz;114;-;-;.;Stadium;TMT|\
DanikB;114;-;-;.;Stadium;TMT|\
Lookid;114;-;-;.;Stadium;TMT|\
funnybear;114;-;-;.;Stadium;TMT|\
CarlJr;114;-;-;.;Stadium;TMT|\
Bren;114;-;-;.;Stadium;TMT|\
racehans;114;-;-;.;Stadium;TMT|\
RotakeR;114;-;-;.;Stadium;TMT|\
Spam;115;-;-;.;Stadium;TMT|\
Pac;115;-;-;.;Stadium;TMT|\
Nize;115;-;-;.;Stadium;TMT|\
riolu;115;-;-;.;Stadium;TMT|\
Fire!;115;-;-;.;Stadium;TMT|\
CarlJr;115;-;-;.;Stadium;TMT|\
racehans;115;-;-;.;Stadium;TMT|\
RotakeR;115;-;-;.;Stadium;TMT|\
Spam;116;-;-;.;Stadium;TMT|\
Pac;116;-;-;.;Stadium;TMT|\
MGM;116;-;-;.;Stadium;TMT|\
TekkForce;116;-;-;.;Stadium;TMT|\
TheBigBerta;116;-;-;.;Stadium;TMT|\
DanikB;116;-;-;.;Stadium;TMT|\
CarlJr;116;-;-;.;Stadium;TMT|\
racehans;116;-;-;.;Stadium;TMT|\
DanikB;116;-;-;.;Stadium;TMT|\
Pekmez;116;-;-;.;Stadium;TMT|\
racehans;116;-;-;.;Stadium;TMT|\
racehans;116;-;-;.;Stadium;TMT|\
RotakeR;116;-;-;.;Stadium;TMT|\
Koenz;117;-;-;.;Stadium;TMT|\
Pac;117;-;-;.;Stadium;TMT|\
MGM;117;-;-;.;Stadium;TMT|\
funnybear;117;-;-;.;Stadium;TMT|\
Scotsman;117;-;-;.;Stadium;TMT|\
Quinoob;117;-;-;.;Stadium;TMT|\
DanikB;117;-;-;.;Stadium;TMT|\
CarlJr;117;-;-;.;Stadium;TMT|\
riolu;117;-;-;.;Stadium;TMT|\
racehans;117;-;-;.;Stadium;TMT|\
fanakuri;117;-;-;.;Stadium;TMT|\
Koenez;118;-;-;.;Stadium;TMT|\
MGM;118;-;-;.;Stadium;TMT|\
pascow;118;-;-;.;Stadium;TMT|\
TheBigBerta;118;-;-;.;Stadium;TMT|\
IceBluez;118;-;-;.;Stadium;TMT|\
FranLJump;118;-;-;.;Stadium;TMT|\
Nize;118;-;-;.;Stadium;TMT|\
Pac;118;-;-;.;Stadium;TMT|\
CarlJr;118;-;-;.;Stadium;TMT|\
fanakuri;118;-;-;.;Stadium;TMT|\
hec_ker;119;-;-;.;Stadium;TMT|\
Toxx.99;119;-;-;.;Stadium;TMT|\
Pac;119;-;-;.;Stadium;TMT|\
DanikB;119;-;-;.;Stadium;TMT|\
Granady;119;-;-;.;Stadium;TMT|\
sinto;119;-;-;.;Stadium;TMT|\
Nize;119;-;-;.;Stadium;TMT|\
CarlJr;119;-;-;.;Stadium;TMT|\
Hivee;119;-;-;.;Stadium;TMT|\
RotakeR;119;-;-;.;Stadium;TMT|\
Purification;120;-;-;.;Stadium;TMT|\
MGM;120;-;-;.;Stadium;TMT|\
MatrixX;120;-;-;.;Stadium;TMT|\
Zimiio;120;-;-;.;Stadium;TMT|\
ClearVision;120;-;-;.;Stadium;TMT|\
Nize;120;-;-;.;Stadium;TMT|\
Scrapie;120;-;-;.;Stadium;TMT|\
Sapi;120;-;-;.;Stadium;TMT|\
fanakuri;121;-;-;.;Canyon;TMT|\
fanakuri;122;-;-;.;Canyon;TMT|\
fanakuri;123;-;-;.;Canyon;TMT|\
fanakuri;124;-;-;.;Canyon;TMT|\
fanakuri;125;-;-;.;Canyon;TMT|\
fanakuri;126;-;-;.;Canyon;TMT|\
fanakuri;127;-;-;.;Canyon;TMT|\
fanakuri;128;-;-;.;Canyon;TMT|\
fanakuri;129;-;-;.;Canyon;TMT|\
fanakuri;130;-;-;.;Canyon;TMT|\
fanakuri;131;-;-;.;Valley;TMT|\
fanakuri;132;-;-;.;Valley;TMT|\
fanakuri;133;-;-;.;Valley;TMT|\
fanakuri;134;-;-;.;Valley;TMT|\
fanakuri;135;-;-;.;Valley;TMT|\
fanakuri;136;-;-;.;Valley;TMT|\
fanakuri;137;-;-;.;Valley;TMT|\
fanakuri;138;-;-;.;Valley;TMT|\
fanakuri;139;-;-;.;Valley;TMT|\
fanakuri;140;-;-;.;Valley;TMT|\
fanakuri;141;-;-;.;Lagoon;TMT|\
fanakuri;142;-;-;.;Lagoon;TMT|\
Samerlifofwer;143;-;-;.;Lagoon;TMT|\
fanakuri;144;-;-;.;Lagoon;TMT|\
Samerlifofwer;145;-;-;.;Lagoon;TMT|\
Samerlifofwer;146;-;-;.;Lagoon;TMT|\
Samerlifofwer;147;-;-;.;Lagoon;TMT|\
fanakuri;148;-;-;.;Lagoon;TMT|\
Samerlifofwer;149;-;-;.;Lagoon;TMT|\
Samerlifofwer;150;-;-;.;Lagoon;TMT|\
ender;151;-;-;.;Stadium;TMT|\
RotakeR;152;-;-;.;Stadium;TMT|\
fanakuri;153;-;-;.;Stadium;TMT|\
Hefest;154;-;-;.;Stadium;TMT|\
Schmaniol;155;-;-;.;Stadium;TMT|\
RotakeR;156;-;-;.;Stadium;TMT|\
RotakeR;157;-;-;.;Stadium;TMT|\
HQCookie;158;-;-;.;Stadium;TMT|\
fanakuri;159;-;-;.;Stadium;TMT|\
mime;160;-;-;.;Stadium;TMT|\
fanakuri;161;-;-;.;Canyon;TMT|\
fanakuri;162;-;-;.;Canyon;TMT|\
fanakuri;163;-;-;.;Canyon;TMT|\
fanakuri;164;-;-;.;Canyon;TMT|\
fanakuri;165;-;-;.;Canyon;TMT|\
fanakuri;166;-;-;.;Canyon;TMT|\
fanakuri;167;-;-;.;Canyon;TMT|\
fanakuri;168;-;-;.;Canyon;TMT|\
fanakuri;169;-;-;.;Canyon;TMT|\
fanakuri;170;-;-;.;Canyon;TMT|\
fanakuri;171;-;-;.;Valley;TMT|\
fanakuri;172;-;-;.;Valley;TMT|\
fanakuri;173;-;-;.;Valley;TMT|\
fanakuri;174;-;-;.;Valley;TMT|\
fanakuri;175;-;-;.;Valley;TMT|\
fanakuri;176;-;-;.;Valley;TMT|\
fanakuri;177;-;-;.;Valley;TMT|\
fanakuri;178;-;-;.;Valley;TMT|\
fanakuri;179;-;-;.;Valley;TMT|\
fanakuri;180;-;-;.;Valley;TMT|\
Samerlifofwer;181;-;-;.;Lagoon;TMT|\
Samerlifofwer;182;-;-;.;Lagoon;TMT|\
Samerlifofwer;183;-;-;.;Lagoon;TMT|\
faqez;184;-;-;.;Lagoon;TMT|\
Samerlifofwer;185;-;-;.;Lagoon;TMT|\
fanakuri;186;-;-;.;Lagoon;TMT|\
Samerlifofwer;187;-;-;.;Lagoon;TMT|\
Samerlifofwer;188;-;-;.;Lagoon;TMT|\
Samerlifofwer;189;-;-;.;Lagoon;TMT|\
Samerlifofwer;190;-;-;.;Lagoon;TMT|\
Sapi;191;-;-;.;Stadium;TMT|\
RotakeR;192;-;-;.;Stadium;TMT|\
fanakuri;193;-;-;.;Stadium;TMT|\
Loupphok;194;-;-;.;Stadium;TMT|\
fanakuri;195;-;-;.;Stadium;TMT|\
Sapi;196;-;-;.;Stadium;TMT|\
RotakeR;197;-;-;.;Stadium;TMT|\
fanakuri;198;-;-;.;Stadium;TMT|\
fanakuri;199;-;-;.;Stadium;TMT|\
fanakuri;200;-;-;.;Stadium;TMT|\
mime;200;1:02.886;02/08/2024;;Stadium;TMT";
}