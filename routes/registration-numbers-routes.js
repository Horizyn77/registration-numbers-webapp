export default function RegistrationNumbersRoutes(registrationService, registrationFactory) {
    async function showHome(req, res) {
        const regNumsList = await registrationService.getRegNums();

        res.render("index", { regNumsList, messages: req.flash() });
    }

    async function add(req, res) {
        const regNumInput = req.body.regNumInput;
        const townCheck = registrationFactory.checkTown(regNumInput);
        const validationCheck = registrationFactory.displayErrorMsg(regNumInput);

        req.flash("error", validationCheck)

        if (!validationCheck) {
            await registrationService.addRegNum(regNumInput, townCheck);
        }


        res.redirect("/");
    }

    async function filter(req, res) {
        const selectedTown = req.body.townSelect;
        const townCheck = registrationFactory.checkTown(selectedTown);
        const filteredTowns = await registrationService.getFilteredRegNums(townCheck);

        res.render("index", { regNumsList: filteredTowns })
    }

    async function showAll(req, res) {
        res.redirect("/");
    } 

    async function deleteAll(req, res) {
        await registrationService.deleteAllRegNums();

        res.redirect("/")
    }

    return {
        showHome,
        add,
        filter,
        showAll,
        deleteAll
    }
}