var express = require('express');
var router = express.Router();

//tutti gli ospiti
router.get('/', function(req, res) {

  let query = "SELECT * FROM `ospiti` ORDER BY id ASC";

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.render('index', {
      layout: 'guests',
      template: 'home-template',
      title: 'Ospiti',
      guests: result
    });
  });

});

router.post('/', function(req, res) {
  let query =  "INSERT INTO `ospiti` (`name`, `lastname`, `date_of_birth`, `document_type`, `document_number`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, NOW(), NOW());";
  var params = req.body;
 // execute query
 db.query(query, [params.name, params.lastname, params.date_of_birth, params.document_type, params.document_number, params.created_at, params.updated_at], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
      res.render('index', {
       layout: 'guest',
       template: 'home-template',
       title: 'Ospite',
       guests: result
     });
  })

});

//ospite singolo
router.get('/guest/:id', function(req, res) {
  if(req.params.id){
    let id = req.params.id;
    let query = "SELECT * FROM `ospiti` WHERE id = " + id;

    // execute query
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.render('index', {
        layout: 'guest',
        template: 'home-template',
        title: 'Ospite',
        guests: result
      });
    })
  } else {
    console.log('nessun id selezionato');
  }

});



module.exports = router;
