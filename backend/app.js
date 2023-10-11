const { default: Surreal } = require('surrealdb.js');

const db = new Surreal();

async function main() {

    try {
        // Connect to the database
        await db.connect('http://127.0.0.1:8000/rpc');

        // Signin as a namespace, database, or root user
        await db.signin({
            user: 'root',
            pass: 'root',
        });

        // Select a specific namespace / database
        await db.use({ ns: 'test', db: 'newone' });

        // Create a new person with a random id each time node is run a new person is created randomly
        let created = await db.create("person", {
            name: 's' + Math.random().toString(36).slice(2, 4) + 'i',
            marketing: true,
            identifier: Math.random().toString(36).slice(2, 12),
        });

        // Update a person record with a specific id
        // let updated = await db.merge("person:jaime", {
        //     marketing: true,
        // });

        // Select all people records
        let people = await db.select("person");

        // Perform a custom  query
        let groups = await db.query('SELECT * FROM type::table($tb) ', {
            tb: 'person',
        });

        //comment out below query to clear all of the data in the `person` record
        // await db.query('DELETE person');
        console.log(people);

    } catch (e) {

        console.error('ERROR', e);

    }

}

main();