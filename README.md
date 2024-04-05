# EriosPainAPI


## DPI Test Environment

This repository serves as a testing environment aimed at replicating a Digitized Patient Information (DPI) system, albeit without guaranteeing its veracity. The primary focus is to simulate the functionalities and interactions within a DPI system, particularly regarding patient data management.

### Database Hosting

The database is hosted on a free server utilizing **Render**, a platform providing cloud services. You can find more information about Render [here](https://render.com/).

### Database Schema

The database comprises two main entities: **Patient** and **PainRecord**.

#### Patient
- **id**: Unique identifier for each patient.
- **name**: Name of the patient.
- **Date of birth**: Date of birth of the patient.
- **genre**: Gender of the patient.

#### PainRecord
- **id**: Unique identifier for each pain record.
- **level**: Intensity level of pain recorded.
- **evaluation date**: Date of pain evaluation.
- **patient id**: Reference to the corresponding patient.

### API Endpoints

The API exposes various endpoints to interact with the database.

#### GET Endpoints:
- **"/api/patient/:id/streams"**: Retrieves pain data for a specific patient.
- **"/api/patients"**: Retrieves information about all patients.

#### POST Endpoints:
- **"/api/patient/:id/streams"**: Adds pain data for a specific patient.
- **"/api/patient"**: Adds a new patient to the database.

#### DELETE Endpoints:
- **"/api/patient/:id/streams"**: Deletes pain data for a specific patient within a given interval.
- **"/api/patient/:id"**: Deletes a patient from the database.

### Usage

To utilize this repository effectively, follow these steps:
1. Ensure you have the necessary dependencies installed.
2. Set up the database hosting using Render or a similar service.
3. Configure the API endpoints according to your requirements.
4. Test and modify the repository as needed to replicate your desired DPI environment.

### Disclaimer

Please note that while this repository aims to simulate a DPI environment, it does not ensure the accuracy or reliability of the data. Use it solely for testing and educational purposes.
