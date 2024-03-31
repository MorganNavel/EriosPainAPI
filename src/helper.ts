import { Patient } from './models/PatientModel';

import casual from 'casual';


function dateParser(date: string): Date {
  const dateSplitted = date.split(" ");
  if (dateSplitted.length !== 2) {
    dateSplitted[1]= "00:00:00";
  }
  const datePart = dateSplitted[0].split(/[\/-]/);
  const timePart = dateSplitted[1].split(":");
  const day = datePart[0];
  const month = datePart[1];
  const year = datePart[2];
  const hour = timePart[0];
  const minute = timePart[1];
  const second = timePart[2];

  return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
}


  

export { dateParser };
