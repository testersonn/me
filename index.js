draw_id = 3971202

document.getElementById("draw_id").innerHTML = `Draw ID - ${draw_id}`

setInterval(() => {
    fetch("https://roulette.suribet.sr:8443/VirtualRouletteWebsiteApi/Api/RouletteWebsite/GetDrawParameters", {
        method: "POST",
        body: draw_id,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json())
        .then(function (data) {
            if (data.length == 0) {
                draw_id++
                document.getElementById("draw_id").innerHTML = `Draw ID - ${draw_id}`
            }


            // Set the text of the slots
            if (data.length > 1) {
                document.getElementById("1").innerHTML = `0 - ${data[0]["Ts"] == 5000 && !data[0]["IsSoldOut"] ? 0 : data[0]["Ts"]}`
                document.getElementById("2").innerHTML = `1 - ${data[1]["Ts"] == 5000 && !data[1]["IsSoldOut"] ? 0 : data[1]["Ts"]}`
                document.getElementById("3").innerHTML = `2 - ${data[2]["Ts"] == 5000 && !data[2]["IsSoldOut"] ? 0 : data[2]["Ts"]}`
                document.getElementById("4").innerHTML = `3 - ${data[3]["Ts"] == 5000 && !data[3]["IsSoldOut"] ? 0 : data[3]["Ts"]}`
                document.getElementById("5").innerHTML = `4 - ${data[4]["Ts"] == 5000 && !data[4]["IsSoldOut"] ? 0 : data[4]["Ts"]}`
                document.getElementById("6").innerHTML = `5 - ${data[5]["Ts"] == 5000 && !data[5]["IsSoldOut"] ? 0 : data[5]["Ts"]}`
                document.getElementById("7").innerHTML = `6 - ${data[6]["Ts"] == 5000 && !data[6]["IsSoldOut"] ? 0 : data[6]["Ts"]}`
                document.getElementById("8").innerHTML = `7 - ${data[7]["Ts"] == 5000 && !data[7]["IsSoldOut"] ? 0 : data[7]["Ts"]}`
                document.getElementById("9").innerHTML = `8 - ${data[8]["Ts"] == 5000 && !data[8]["IsSoldOut"] ? 0 : data[8]["Ts"]}`
                document.getElementById("10").innerHTML = `9 - ${data[9]["Ts"] == 5000 && !data[9]["IsSoldOut"] ? 0 : data[9]["Ts"]}`
                document.getElementById("11").innerHTML = `10 - ${data[10]["Ts"] == 5000 && !data[10]["IsSoldOut"] ? 0 : data[10]["Ts"]}`
                document.getElementById("12").innerHTML = `11 - ${data[11]["Ts"] == 5000 && !data[11]["IsSoldOut"] ? 0 : data[11]["Ts"]}`
                document.getElementById("13").innerHTML = `12 - ${data[12]["Ts"] == 5000 && !data[12]["IsSoldOut"] ? 0 : data[12]["Ts"]}`
                document.getElementById("14").innerHTML = `13 - ${data[13]["Ts"] == 5000 && !data[13]["IsSoldOut"] ? 0 : data[13]["Ts"]}`
                document.getElementById("15").innerHTML = `14 - ${data[14]["Ts"] == 5000 && !data[14]["IsSoldOut"] ? 0 : data[14]["Ts"]}`
                document.getElementById("16").innerHTML = `15 - ${data[15]["Ts"] == 5000 && !data[15]["IsSoldOut"] ? 0 : data[15]["Ts"]}`
                document.getElementById("17").innerHTML = `16 - ${data[16]["Ts"] == 5000 && !data[16]["IsSoldOut"] ? 0 : data[16]["Ts"]}`
                document.getElementById("18").innerHTML = `17 - ${data[17]["Ts"] == 5000 && !data[17]["IsSoldOut"] ? 0 : data[17]["Ts"]}`
                document.getElementById("19").innerHTML = `18 - ${data[18]["Ts"] == 5000 && !data[18]["IsSoldOut"] ? 0 : data[18]["Ts"]}`
                document.getElementById("20").innerHTML = `19 - ${data[19]["Ts"] == 5000 && !data[19]["IsSoldOut"] ? 0 : data[19]["Ts"]}`
                document.getElementById("21").innerHTML = `20 - ${data[20]["Ts"] == 5000 && !data[20]["IsSoldOut"] ? 0 : data[20]["Ts"]}`
                document.getElementById("22").innerHTML = `21 - ${data[21]["Ts"] == 5000 && !data[21]["IsSoldOut"] ? 0 : data[21]["Ts"]}`
                document.getElementById("23").innerHTML = `22 - ${data[22]["Ts"] == 5000 && !data[22]["IsSoldOut"] ? 0 : data[22]["Ts"]}`
                document.getElementById("24").innerHTML = `23 - ${data[23]["Ts"] == 5000 && !data[23]["IsSoldOut"] ? 0 : data[23]["Ts"]}`
                document.getElementById("25").innerHTML = `24 - ${data[24]["Ts"] == 5000 && !data[24]["IsSoldOut"] ? 0 : data[24]["Ts"]}`
                document.getElementById("26").innerHTML = `25 - ${data[25]["Ts"] == 5000 && !data[25]["IsSoldOut"] ? 0 : data[25]["Ts"]}`
                document.getElementById("27").innerHTML = `26 - ${data[26]["Ts"] == 5000 && !data[26]["IsSoldOut"] ? 0 : data[26]["Ts"]}`
                document.getElementById("28").innerHTML = `27 - ${data[27]["Ts"] == 5000 && !data[27]["IsSoldOut"] ? 0 : data[27]["Ts"]}`
                document.getElementById("29").innerHTML = `28 - ${data[28]["Ts"] == 5000 && !data[28]["IsSoldOut"] ? 0 : data[28]["Ts"]}`
                document.getElementById("30").innerHTML = `29 - ${data[29]["Ts"] == 5000 && !data[29]["IsSoldOut"] ? 0 : data[29]["Ts"]}`
                document.getElementById("31").innerHTML = `30 - ${data[30]["Ts"] == 5000 && !data[30]["IsSoldOut"] ? 0 : data[30]["Ts"]}`
                document.getElementById("32").innerHTML = `31 - ${data[31]["Ts"] == 5000 && !data[31]["IsSoldOut"] ? 0 : data[31]["Ts"]}`
                document.getElementById("33").innerHTML = `32 - ${data[32]["Ts"] == 5000 && !data[32]["IsSoldOut"] ? 0 : data[32]["Ts"]}`
                document.getElementById("34").innerHTML = `33 - ${data[33]["Ts"] == 5000 && !data[33]["IsSoldOut"] ? 0 : data[33]["Ts"]}`
                document.getElementById("35").innerHTML = `34 - ${data[34]["Ts"] == 5000 && !data[34]["IsSoldOut"] ? 0 : data[34]["Ts"]}`
                document.getElementById("36").innerHTML = `35 - ${data[35]["Ts"] == 5000 && !data[35]["IsSoldOut"] ? 0 : data[35]["Ts"]}`
                document.getElementById("37").innerHTML = `36 - ${data[36]["Ts"] == 5000 && !data[36]["IsSoldOut"] ? 0 : data[36]["Ts"]}`

                // blocks
                document.getElementById("122").innerHTML = `BLOCK 1 - ${data[121]["Ts"] == 5000 && !data[121]["IsSoldOut"] ? 0 : data[121]["Ts"]}`
                document.getElementById("123").innerHTML = `BLOCK 2 - ${data[122]["Ts"] == 5000 && !data[122]["IsSoldOut"] ? 0 : data[122]["Ts"]}`
                document.getElementById("124").innerHTML = `BLOCK 3 - ${data[123]["Ts"] == 5000 && !data[123]["IsSoldOut"] ? 0 : data[123]["Ts"]}`

                // columns
                document.getElementById("125").innerHTML = `C3 - ${data[124]["Ts"] == 5000 && !data[124]["IsSoldOut"] ? 0 : data[124]["Ts"]}`
                document.getElementById("126").innerHTML = `C2 - ${data[125]["Ts"] == 5000 && !data[125]["IsSoldOut"] ? 0 : data[125]["Ts"]}`
                document.getElementById("127").innerHTML = `C1 - ${data[126]["Ts"] == 5000 && !data[126]["IsSoldOut"] ? 0 : data[126]["Ts"]}`

                // others
                document.getElementById("134").innerHTML = `ZERO SPIEL - ${data[133]["Ts"] == 5000 && !data[133]["IsSoldOut"] ? 0 : data[133]["Ts"]}`
                document.getElementById("135").innerHTML = `VOISINS - ${data[134]["Ts"] == 5000 && !data[134]["IsSoldOut"] ? 0 : data[134]["Ts"]}`
                document.getElementById("136").innerHTML = `ORPHELINS - ${data[135]["Ts"] == 5000 && !data[135]["IsSoldOut"] ? 0 : data[135]["Ts"]}`
                document.getElementById("137").innerHTML = `TIERS - ${data[136]["Ts"] == 5000 && !data[136]["IsSoldOut"] ? 0 : data[136]["Ts"]}`
                document.getElementById("128").innerHTML = `EVEN - ${data[127]["Ts"] == 5000 && !data[127]["IsSoldOut"] ? 0 : data[127]["Ts"]}`
                document.getElementById("129").innerHTML = `ODD - ${data[128]["Ts"] == 5000 && !data[128]["IsSoldOut"] ? 0 : data[128]["Ts"]}`
                document.getElementById("130").innerHTML = `RED - ${data[129]["Ts"] == 5000 && !data[129]["IsSoldOut"] ? 0 : data[129]["Ts"]}`
                document.getElementById("131").innerHTML = `BLACK - ${data[130]["Ts"] == 5000 && !data[130]["IsSoldOut"] ? 0 : data[130]["Ts"]}`
                document.getElementById("132").innerHTML = `LOW - ${data[131]["Ts"] == 5000 && !data[131]["IsSoldOut"] ? 0 : data[131]["Ts"]}`
                document.getElementById("133").innerHTML = `HIGH - ${data[132]["Ts"] == 5000 && !data[132]["IsSoldOut"] ? 0 : data[132]["Ts"]}`

                // total red TS
                let red_numbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
                let total_red = 0
                for (let i = 0; i < red_numbers.length; i++) {
                    val = data[red_numbers[i]]['Ts'] == 5000 && !data[red_numbers[i]]['IsSoldOut'] ? 0 : data[red_numbers[i]]['Ts']
                    total_red += val
                }

                // total black TS
                let black_numbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
                let total_black = 0
                for (let i = 0; i < black_numbers.length; i++) {
                    val = data[black_numbers[i]]['Ts'] == 5000 && !data[black_numbers[i]]['IsSoldOut'] ? 0 : data[black_numbers[i]]['Ts']
                    total_black += val
                }

                document.getElementById("total_red").innerHTML = `Total RED TS: ${Math.round((total_red + Number.EPSILON) * 100) / 100}`
                document.getElementById("total_black").innerHTML = `Total BLACK TS: ${Math.round((total_black + Number.EPSILON) * 100) / 100}`
            }
        });
}, 500);