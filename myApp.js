let express = require('express')
let mongodb = require('mongodb')

let app = express()
let db = null

const MongodbClient = mongodb.MongoClient;

let dbString = 'mongodb+srv://appUser:987654321@atlascluster.4fap8.mongodb.net/myApp?retryWrites=true&w=majority'
let dbName = 'myApp'

let port = process.env.PORT
if(port == null || port ==""){
  port = 3000
}

MongodbClient.connect(dbString,{useNewUrlParser:true,useUnifiedTopology:true},function(err,client){
if(err){
  throw err;
}
db = client.db(dbName)
app.listen(port)
})

app.use(express.urlencoded({extended:false}))

app.use(express.static('public'))

app.get('/', function(req, res){
  res.send('./index.html')
})

app.post('/create-item',function(req,res){
  db.collection('items').insertOne({Name:req.body.name,Mail:req.body.mail,Subject:req.body.sub,Message:req.body.message},function(){
    res.redirect('/#Contact')
  })
 
})
