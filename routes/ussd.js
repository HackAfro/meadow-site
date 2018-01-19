const router = require('express').Router();

router.post('/', (req, res) => {
  console.log(req.body, req.body['text']);
  const data = req.body;
  if(data.sessionId && data.serviceCode && data.phoneNumber) {
    const {
      sessionId,
      serviceCode,
      phoneNumber,
      text
    } = data;
    let string;

    switch (text) {
      case '':
        string = `CON What do you want to check \n
                                1. Next Farming date \n
                                2. Income rates                
                `;
        break;
      case '1':
        string = `END Your next farming date is ${new Date().toString()}`;
        break;
      case '2':
        string = `END Your income rate is 12%`;
        break;
      default:
        break;
    }
    res.status(200).send(string);
  }
  else {
    res.status(400).send('Incomplete values have been sent');
  }
});

module.exports = router;