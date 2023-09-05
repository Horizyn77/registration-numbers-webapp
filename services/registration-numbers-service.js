export default function RegistrationNumbersService(db) {
    
    async function addRegNum(regNumber, townId) {

        const insertQuery = `INSERT INTO registration_numbers (reg_number, town_id) 
        VALUES ($1, $2);`

        await db.none(insertQuery, [regNumber, townId]);
    }

    async function getRegNums() {
        const selectQuery = `SELECT reg_number FROM registration_numbers;`

        const result = await db.manyOrNone(selectQuery);

        return result.map(item => item.reg_number);
    }

    async function getFilteredRegNums(townId) {
        const selectQuery = `SELECT reg_number FROM registration_numbers WHERE town_id = $1;`

        const result = await db.manyOrNone(selectQuery, [townId]);

        return result.map(item => item.reg_number);
    }

    async function deleteAllRegNums() {
        const deleteQuery = `DELETE FROM registration_numbers;`
        
        await db.none(deleteQuery);
    }    

    async function deleteRegNum(regNumber) {
        const deleteQuery = `DELETE FROM registration_numbers WHERE reg_number = $1;`

        await db.none(deleteQuery, [regNumber])
    }
    
    async function checkTown() {
        const selectQuery = `SELECT id, reg_code FROM towns;`

        return await db.many(selectQuery)
    
    }

    return {
        addRegNum,
        getRegNums,
        getFilteredRegNums,
        deleteAllRegNums,
        deleteRegNum,
        checkTown
    }
}