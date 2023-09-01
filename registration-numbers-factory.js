export default function RegistrationNumbersFactory() {

    function checkTown(regNumber) {

        let townId = 0;

        if (regNumber.toLowerCase().substring(0, 2) === "ca" && regNumber.toLowerCase().charAt(2) !== "w") {
            townId = 1;
        } else if (regNumber.toLowerCase().startsWith("cj")) {
            townId = 2;
        } else if (regNumber.toLowerCase().startsWith("caw")) {
            townId = 3;
        } else if (regNumber.toLowerCase().startsWith("cl")) {
            townId = 4;
        } else if (regNumber.toLowerCase().startsWith("cy")) {
            townId = 5;
        }

        return townId;
    }

    function displayErrorMsg(regInput) {

        const pattern = /^[A-Z]{2,3} \d{3,5}$/

        const regexTest = pattern.test(regInput);

        if (!regInput) {
            return "<i class='bi-exclamation-octagon-fill'></i>&nbsp;&nbsp;Please enter a registration number.";
            
        } else if (!regexTest) {
            return "<i class='bi-exclamation-octagon-fill'></i>&nbsp;&nbsp;The registration number entered is not valid. Please follow the correct format. See guidelines <span id='aboutLink'>here</span>.";
        }
        
        //  else if (regNumArr.includes(regInput.value)) {
        //     errorOrInfoDisplay.innerHTML = "<i class='bi-exclamation-octagon-fill'></i>&nbsp;&nbsp;The registration number has already been added.";
        //     errorOrInfoDisplay.classList.remove("hidden");
        //     errorOrInfoDisplay.classList.add("errorStyle")
        //     setTimeout(() => {
        //         errorOrInfoDisplay.classList.add("hidden")
        //         errorOrInfoDisplay.classList.remove("errorStyle")
        //     }, 3000)
        // } else if (regNumArr.length > 14) {
        //     errorOrInfoDisplay.innerHTML = "<i class='bi-exclamation-octagon-fill'></i>&nbsp;&nbsp;The limit of registration numbers that can be added has been reached.";
        //     errorOrInfoDisplay.classList.remove("hidden");
        //     errorOrInfoDisplay.classList.add("errorStyle")
        //     setTimeout(() => {
        //         errorOrInfoDisplay.classList.add("hidden")
        //         errorOrInfoDisplay.classList.remove("errorStyle")
        //     }, 3000)
        // }
    }
        return {
            checkTown,
            displayErrorMsg
        }
    }