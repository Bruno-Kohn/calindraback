import axios from 'axios';

async function getAddress(req, res) {
  try {
    const { address } = req.body;

    const addressRep = address.split(' ').join('%20');

    const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressRep}&key=AIzaSyDPcJoqztWHCikJ5GKkEoC3gpZQ8StoAGs`;

    const reqExternalAPI = axios.post(URL);

    reqExternalAPI.then((resp) => {
      const geo = resp.data.results.map((i) => ({
        address: i.formatted_address,
        lat: i.geometry.location.lat,
        lng: i.geometry.location.lng
      }));

      const distanceConfig = [];

      for (let i = 0; i < geo.length; i++) {
        for (let j = i + 1; j < geo.length; j++) {
          distanceConfig.push({
            address1: geo[i].address,
            address2: geo[j].address,
            distance: Math.sqrt(
              (geo[j].lat - geo[i].lat) ** 2 + (geo[j].lng - geo[i].lng) ** 2
            )
          });
        }
      }

      const nearAddresses = [];

      for (let i = 0; i < geo.length; i++) {
        nearAddresses.push({
          referenceAddress: geo[i].address,
          addressesByDistance: [
            distanceConfig
              .filter(
                (j) =>
                  j.address1 === geo[i].address || j.address2 === geo[i].address
              )
              .sort(function (a, b) {
                return a.distance - b.distance;
              })
          ]
        });
      }

      res.status(200).send({ distance: distanceConfig, nearAddresses });
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export { getAddress };
