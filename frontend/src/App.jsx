// App.js

import React, { useEffect, useState } from 'react';
import { Surreal } from 'surrealdb.js';
import './app.css'
const App = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = new Surreal();

      try {
        // Connect to the database
        const db = new Surreal();
        db.connect('ws://localhost:8000/rpc', {
          ns: 'test',
          db: 'newone',
        });

        console.log('connected!');

        db.signin({
          user: 'root',
          pass: 'root',
        });

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

        // Select all people records
        const people = await db.select('person');
        // Perform a custom advanced query
        const response = await db.query(
          'SELECT * FROM type::table($tb)',
          {
            tb: 'person',
          }
        );
        db.close();
        console.log('disconnected!');
        if (response) {
          setGroups(response[0].result);
        }
        console.log(response[0].result);
      } catch (error) {
        console.error('ERROR', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id='main'>
      <h1><p>React + Nodejs</p> Surrealdb Starter</h1>
      <div>
        <h2>Rendered Groups :</h2>
        <br />
        <ul>
          {groups.map(item => (
            <table className="group-table" key={item.id}>
              <tbody>
                <tr>
                  <td className="label">Name:</td>
                  <td>{item.name}</td>
                </tr>
                <tr>
                  <td className="label">ID:</td>
                  <td>{item.id}</td>
                </tr>
                <tr>
                  <td className="label">Identifier:</td>
                  <td>{item.identifier}</td>
                </tr>
                <tr>
                  <td className="label">Marketing:</td>
                  <td>{item.marketing.toString()}</td>
                </tr>
              </tbody>
            </table>
          ))}
        </ul>
      </div>

      {/* Add any other necessary UI components or elements here */}
    </div>
  );
};

export default App;
