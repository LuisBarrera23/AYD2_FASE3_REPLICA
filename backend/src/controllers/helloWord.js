
exports.helloWord = async (req, res) => {

    res.status(200).json({
      body: { hello: 'Hi everyone :D' },
    });
  
  }
  