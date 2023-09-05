export default function RegistrationNumbersRoutes(registrationService, registrationFactory) {
    async function showHome(req, res) {
        const regNumsList = await registrationService.getRegNums();

        res.render("index", { regNumsList, messages: req.flash() });
    }

    async function add(req, res) {
        const regNumInput = req.body.regNumInput;
        const townCheck = await registrationFactory.checkTownId(regNumInput);

        const validationCheck = await registrationFactory.validationErrorMsgs(regNumInput);

        req.flash("error", validationCheck)

        if (!validationCheck) {
            await registrationService.addRegNum(regNumInput, townCheck);

            const successMsg = "<i class='bi-check-circle-fill'></i>&nbsp;&nbsp;The registration number has been added successfully.";

            req.flash("success", successMsg)
        }

        res.redirect("/");
    }

    async function filter(req, res) {
        const selectedTown = req.body.townSelect;
        const townCheck = await registrationFactory.checkTownId(selectedTown);
        const filteredTowns = await registrationService.getFilteredRegNums(townCheck);

        if (!filteredTowns.length > 0) {
            req.flash("error", registrationFactory.filterErrorMsgs(selectedTown));
        }

        res.render("index", { regNumsList: filteredTowns, messages: req.flash() })
    }

    async function showAll(req, res) {
        res.redirect("/");
    }

    async function deleteAll(req, res) {
        await registrationService.deleteAllRegNums();

        const successMsg = "<i class='bi-check-circle-fill'></i>&nbsp;&nbsp;All your data has been successfully cleared";

        req.flash("success", successMsg)

        res.redirect("/")
    }

    async function deleteReg(req, res) {
        const regNum = req.body.elementText;

        await registrationService.deleteRegNum(regNum);

        res.redirect("/");
    }

    return {
        showHome,
        add,
        filter,
        showAll,
        deleteAll,
        deleteReg
    }
}