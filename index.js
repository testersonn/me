// init draw id
draw_id = 0
draw_number = 0
min_treshold = 0

// fetch latest draw id
fetch("https://suribet.sr/VirtualRoulette/GetActiveDrawsInfo", {
    method: "POST",
})
    .then((response) => response.json())
    .then(function (data) {
        draw_id = data["ActiveDrawsInfo"][0]["DI"]
        draw_number = data["ActiveDrawsInfo"][0]["Dn"]

        document.getElementById("draw_id").innerHTML = `Draw ID: ${draw_id}`
        document.getElementById("draw_number").innerHTML = `Draw #: ${draw_number}`
    })

if (draw_id == 0) {
    draw_id = prompt("Fill in draw id")
    draw_number = prompt("Fill in draw number")
    min_treshold = prompt("Fill in minimum treshold")
    document.getElementById("draw_id").innerHTML = `Draw ID: ${draw_id}`
    document.getElementById("draw_number").innerHTML = `Draw #: ${draw_number}`
}

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
                draw_number++
                document.getElementById("draw_id").innerHTML = `Draw ID - ${draw_id}`
                document.getElementById("draw_number").innerHTML = `Draw #: ${draw_number}`
            }


            // Set the text of the slots
            if (data.length > 1) {
                // numbers
                for (let i = 0; i < 37; i++) {
                    document.getElementById(`${i + 1}`).innerHTML = `${i} - ${data[i]["Ts"] == 5000 && !data[i]["IsSoldOut"] ? 0 : data[i]["Ts"]}`
                    if (data[i]["Ts"] == 5000 && !data[i]["IsSoldOut"]) {
                        document.getElementById(`${i + 1}`).classList.remove("highlight")
                    }
                    else if (data[i]["Ts"] >= min_treshold) {
                        document.getElementById(`${i + 1}`).classList.add("highlight")
                    }
                    else {
                        document.getElementById(`${i + 1}`).classList.remove("highlight")
                    }
                }

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