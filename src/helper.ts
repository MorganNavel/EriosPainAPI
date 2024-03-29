import { Patient } from './models/PatientModel';

import casual from 'casual';

async function seedPatients() {
  try {
    const patientsData = [];

    // Générer 10 patients fictifs
    for (let i = 0; i < 10; i++) {
      const patient = {
        nom: casual.last_name,
        dateNaissance: casual.date('YYYY-MM-DD'),
        genre: casual.random_element(['Masculin', 'Féminin', 'Autre']),
      };
      patientsData.push(patient);
    }

    // Insérer les patients dans la base de données
    await Patient.bulkCreate(patientsData);

    console.log('Patients ajoutés avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'ajout des patients par défaut :', error);
  }
}
function dateParser(date: string): Date {
  console.log(typeof date);
  const dateSplitted = date.split(/[\/-]/);
  const day = dateSplitted[0];
  const month = dateSplitted[1];
  const year = dateSplitted[2];
  return new Date(Number(year), Number(month) - 1, Number(day));
}


  

export { seedPatients, dateParser };
