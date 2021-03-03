// const {processLocationsForDisplay, TIME_FORMAT} = require("../public/helpers/utils");
// const moment = require('moment');
// const expect = require('chai').expect;
//
// describe('Locations Utils', () => {
//     let dummyShift = {
//         clockInTime: moment()
//     };
//    it ('Prepare Shift with location field', () => {
//        // Arrange
//        dummyShift.location = {
//            latitude: 32.789019,
//            longitude: 34.9596217
//        };
//       
//        // Act
//        let locations = processLocationsForDisplay(dummyShift);
//       
//        // Assert
//        expect(locations).to.not.be.null;
//        expect(locations.length === 1).to.be.true;
//        expect(locations[0].text === moment().format(TIME_FORMAT));
//    }); 
//    it ('Prepare Shift with locations field with single location', () => {
//        // Arrange
//        dummyShift.locations = [{
//            latitude: 32.789019,
//            longitude: 34.9596217,
//            date: moment('2020-03-03')
//        }];
//
//        // Act
//        let locations = processLocationsForDisplay(dummyShift);
//
//        // Assert
//        expect(locations).to.not.be.null;
//        expect(locations.length === 1).to.be.true;
//        expect(locations[0].text === moment('2020-03-03').format(TIME_FORMAT));
//    });
//    it ('Prepare Shift with locations field with 2 close locations', () => {
//        // Arrange
//        dummyShift.locations = [
//            {
//                latitude: 32.789019,
//                longitude: 34.9596217,
//                date: moment('2020-03-03')
//            },
//            {
//                latitude: 32.789019,
//                longitude: 34.9596217,
//                date: moment('2020-04-03')
//            }
//        ];
//
//        // Act
//        let locations = processLocationsForDisplay(dummyShift);
//
//        // Assert
//        expect(locations).to.not.be.null;
//        expect(locations).to.have.lengthOf(1);
//        expect(locations[0].text === `${moment('2020-03-03').format(TIME_FORMAT)}, ${moment('2020-04-03').format(TIME_FORMAT)}`);
//    });
//     it ('Prepare Shift with locations field with 2 distance locations', () => {
//         // Arrange
//         dummyShift.locations = [
//             {
//                 latitude: 32.789019,
//                 longitude: 34.9596217,
//                 date: moment('2020-03-03')
//             },
//             {
//                 latitude: 33.789019,
//                 longitude: 34.9596217,
//                 date: moment('2020-04-03')
//             }
//         ];
//
//         // Act
//         let locations = processLocationsForDisplay(dummyShift);
//
//         // Assert
//         expect(locations).to.not.be.null;
//         expect(locations.length === 2).to.be.true;
//         expect(locations[0].text === moment('2020-03-03').format(TIME_FORMAT));
//         expect(locations[1].text === moment('2020-04-03').format(TIME_FORMAT));
//
//     });
// });
