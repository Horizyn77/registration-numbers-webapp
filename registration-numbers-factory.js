export default function RegistrationNumbersFactory(registrationService) {

    async function checkTownId(regNumber) {
        let townId = 0;

        const townList = await registrationService.checkTown();

        townList.forEach(item => {
            if (regNumber.toLowerCase().substring(0, 2) === item.reg_code.toLowerCase() && regNumber.toLowerCase().charAt(2) !== "w") {
                townId = item.id;
            } else if (regNumber.toLowerCase().startsWith(item.reg_code.toLowerCase())) {
                townId = item.id;
            }
        })

        return townId;
    }

    async function validationErrorMsgs(regInput) {

        const pattern = /^[A-Z]{2,3} \d{3,5}$/

        const regexTest = pattern.test(regInput);

        const currentRegNums = await registrationService.getRegNums();

        if (!regInput) {
            return "<i class='bi-exclamation-octagon-fill'></i>&nbsp;&nbsp;Please enter a registration number.";
        } else if (!regexTest) {
            return "<i class='bi-exclamation-octagon-fill'></i>&nbsp;&nbsp;The registration number entered is not valid. Please follow the correct format. See guidelines <span id='aboutLink'>here</span>.";
        } else if (currentRegNums.includes(regInput)) {
            return "<i class='bi-exclamation-octagon-fill'></i>&nbsp;&nbsp;The registration number has already been added.";
        } else if (currentRegNums.length > 14) {
            return "<i class='bi-exclamation-octagon-fill'></i>&nbsp;&nbsp;The limit of registration numbers that can be added has been reached.";
        }
    }

    function filterErrorMsgs(town) {
        if (town === "ca") {
            return "<i class='bi-exclamation-octagon-fill'></i>&nbsp;&nbsp;There are currently no registration numbers for Cape Town.";
        } else if (town === "cj") {
            return "<i class='bi-exclamation-octagon-fill'></i>&nbsp;&nbsp;There are currently no registration numbers for Paarl.";
        } else if (town === "caw") {
            return "<i class='bi-exclamation-octagon-fill'></i>&nbsp;&nbsp;There are currently no registration numbers for George.";
        } else if (town === "cl") {
            return "<i class='bi-exclamation-octagon-fill'></i>&nbsp;&nbsp;There are currently no registration numbers for Stellenbosch.";
        } else if (town === "cy") {
            return "<i class='bi-exclamation-octagon-fill'></i>&nbsp;&nbsp;There are currently no registration numbers for Bellville.";
        }
    }

    return {
        checkTownId,
        validationErrorMsgs,
        filterErrorMsgs
    }

}