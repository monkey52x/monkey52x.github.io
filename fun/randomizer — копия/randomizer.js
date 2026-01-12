function randomizeNumbers() {
        var min = parseInt(document.getElementById("minNumber").value);
        var max = parseInt(document.getElementById("maxNumber").value);
        var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        document.getElementById("randomNumber").innerText = "Случайное число: " + randomNumber;
        document.getElementById("retryNumbers").innerHTML = "<button onclick='retryNumbers()'>Повторить</button>";
    }

    function retryNumbers() {
        randomizeNumbers();
    }

    function randomizeFromList() {
        var inputList = document.getElementById("inputList").value.trim().split("\n");
        var attempts = parseInt(document.getElementById("attempts").value);
        var count = {};
        
        for (var i = 0; i < inputList.length; i++) {
            count[inputList[i]] = 0;
        }

        for (var j = 0; j < attempts; j++) {
            var randomIndex = Math.floor(Math.random() * inputList.length);
            var selectedItem = inputList[randomIndex].trim();
            count[selectedItem]++;
        }

        var result = "";
        for (var key in count) {
            var percentage = (count[key] / attempts) * 100;
            result += key + ": " + count[key] + " (" + percentage.toFixed(2) + "%)<br>";
        }

        document.getElementById("randomListItem").innerHTML = result;
        document.getElementById("retryList").innerHTML = "<button onclick='retryList()'>Повторить</button>";
    }

    function retryList() {
        randomizeFromList();
    }