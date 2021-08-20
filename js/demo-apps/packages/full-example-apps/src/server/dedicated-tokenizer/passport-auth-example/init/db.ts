import {db} from '../db';


export default function initDb() {

  db.serialize(function() {
  });

  //db.close();
};
