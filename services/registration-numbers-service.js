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
    
    return {
        addRegNum,
        getRegNums,
        getFilteredRegNums,
        deleteAllRegNums
    }
}