import axios from 'axios';

async function getAddress(req, res) {
  try {
    const { address } = req.body;

    const addressRep = address.split(' ').join('%20');

    const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressRep}&key=AIzaSyDPcJoqztWHCikJ5GKkEoC3gpZQ8StoAGs`;

    const reqExternalAPI = axios.post(URL);

    reqExternalAPI.then((resp) => res.status(200).send(resp.data));
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export { getAddress };
