import React from 'react';
import useSWR from 'swr';
import { Surreal } from 'surrealdb.js';
import './app.css';

//fetchData should be async as it should return a promise .
const fetchData = async () => {
  const db = new Surreal();

  try {
    await db.connect('ws://localhost:8000/rpc', {
      ns: 'test',
      db: 'newone',
    });

    console.log('connected!');

    await db.signin({
      user: 'root',
      pass: 'root',
    });

    await db.select('person');
    const response = await db.query('SELECT * FROM type::table($tb)', {
      tb: 'person',
    });

    await db.close();
    console.log('disconnected!');

    return response[0].result;
  } catch (error) {
    console.error('ERROR', error);
    throw error; // Rethrow the error to be handled by SWR in App component .
  }
};

const App = () => {
  // below 'people' is used as an indentifier .
  const { data: groups, error } = useSWR('people', fetchData, {
    refreshInterval: 10000, // Fetch data every 10 seconds (10000 milliseconds) from the database to keep ui updated ! & cache in data field
  });
  if (error) {
    return <div id='error'><p>Error loading data</p></div>;
  }

  return (
    <div id='main'>
      <h1>
        <p>React + Nodejs</p> Surrealdb Starter
      </h1>
      <div>
        <h2>Rendered Groups :</h2>
        <br />
        <ul>
          {groups &&
            groups.map((item) => (
              <table className='group-table' key={item.id}>
                <tbody>
                  <tr>
                    <td className='label'>Name:</td>
                    <td>{item.name}</td>
                  </tr>
                  <tr>
                    <td className='label'>ID:</td>
                    <td>{item.id}</td>
                  </tr>
                  <tr>
                    <td className='label'>Identifier:</td>
                    <td>{item.identifier}</td>
                  </tr>
                  <tr>
                    <td className='label'>Marketing:</td>
                    <td>{item.marketing.toString()}</td>
                  </tr>
                </tbody>
              </table>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default App;







//alternatively we can use below query to create a new record
// Create a new person with a random id
// const created = await db.create('person', {
//   title: 'Founder & CEO',
//   name: {
//     first: 'Tobie',
//     last: 'Morgan Hitchcock',
//   },
//   marketing: true,
//   identifier: Math.random().toString(36).substr(2, 10),
// });

// Update a person record with a specific id
// const updated = await db.merge('person:jaime', {
//   marketing: true,
// });