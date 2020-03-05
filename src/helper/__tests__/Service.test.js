import axios from 'axios';

import { getCars, getColors, getManufacturers, getOneCarInfo } from '../Service';

jest.mock('axios');

describe('getCars', () => {
    it('fetches successfully data from an API', async () => {
        const carsData = {
            "cars":[
                 {
                        "stockNumber":30562,
                        "manufacturerName":"Fiat",
                        "modelName":"Ducato",
                        "color":"yellow",
                        "mileage":{
                             "number":100013,
                             "unit":"km"
                        },
                        "fuelType":"Petrol",
                        "pictureUrl":"https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
                 },
                 {
                        "stockNumber":35592,
                        "manufacturerName":"Chrysler",
                        "modelName":"New Yorker",
                        "color":"white",
                        "mileage":{
                             "number":100115,
                             "unit":"km"
                        },
                        "fuelType":"Petrol",
                        "pictureUrl":"https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
                 }]
        };
      axios.get.mockImplementationOnce(() => Promise.resolve(carsData));
      await expect(getCars('')).resolves.toEqual(carsData);
    });
    it('fetches erroneously data from an API', async () => {
      const errorMessage = 'Network Error';
      axios.get.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage)),
      );
      await expect(getCars('')).rejects.toThrow(errorMessage);
    });
});

describe('getColors', () => {
    it('fetches successfully data from an API', async () => {
        const fakeColorData = {"colors":["red","blue","green","black","yellow","white","silver"]};
      axios.get.mockImplementationOnce(() => Promise.resolve(fakeColorData));
      await expect(getColors('')).resolves.toEqual(fakeColorData);
    });
    it('fetches erroneously data from an API', async () => {
      const errorMessage = 'Network Error';
      axios.get.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage)),
      );
      await expect(getColors('')).rejects.toThrow(errorMessage);
    });
});


describe('getManufacturers', () => {
    it('fetches successfully data from an API', async () => {
        const fakeManufacturersData = {
            "manufacturers":[
                 {
                        "name":"Audi",
                        "models":[]
                 },
                 {
                        "name":"BMW",
                        "models":[]
                 },
                 {
                        "name":"Chrysler",
                        "models":[]
                 }]
                };
      axios.get.mockImplementationOnce(() => Promise.resolve(fakeManufacturersData));
      await expect(getManufacturers('')).resolves.toEqual(fakeManufacturersData);
    });
    it('fetches erroneously data from an API', async () => {
      const errorMessage = 'Network Error';
      axios.get.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage)),
      );
      await expect(getManufacturers('')).rejects.toThrow(errorMessage);
    });
});


describe('getOneCarInfo', () => {
    it('fetches successfully data from an API', async () => {
        const carsData = {
            "stockNumber":30562,
            "manufacturerName":"Fiat",
            "modelName":"Ducato",
            "color":"yellow",
            "mileage":{
                 "number":100013,
                 "unit":"km"
            },
            "fuelType":"Petrol",
            "pictureUrl":"https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
     };
      axios.get.mockImplementationOnce(() => Promise.resolve(carsData));
      await expect(getOneCarInfo(30562)).resolves.toEqual(carsData);
    });
    it('fetches erroneously data from an API', async () => {
      const errorMessage = 'Network Error';
      axios.get.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage)),
      );
      await expect(getOneCarInfo(30562)).rejects.toThrow(errorMessage);
    });
});