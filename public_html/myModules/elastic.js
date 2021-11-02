// const { Client, errors } = require('@elastic/elasticsearch')
// var elastic = new Client({ node: 'http://127.0.0.1:9200' })

var elasticsearch = require('elasticsearch')
var elastic = elasticsearch.Client({
  host: 'localhost:9200'
})

// exports.find = (query) => {
//     return elastic.search(
//         query
//     )
// }


// elastic.search({
//     index: 'books',
//     type: 'book',
//     body: {
//       query: {
//         multi_match: {
//           query: 'express js',
//           fields: ['title', 'description']
//         }
//       }
//     }
//   }).then(function (response) {
//     var hits = response.hits.hits
//     var hits = response.hits.hits
//   }, function (error) {
//     console.trace(error.message)
//   })

// elastic.search({
//     body: {
//     }
//   }).then(function (response) {
//     var hits = response.hits.hits
//     console.log(hits)
//   }, function (error) {
//     console.trace(error.message)
//   })

// elastic.search({
//     body: {
//       query: {
//         multi_match: {
//           query: 'express js',
//           fields: ['title', 'description']
//         }
//       }
//     }
//   }).then(function (response) {
//     var hits = response.hits.hits
//     var hits = response.hits.hits
//   }, function (error) {
//     console.trace(error.message)
//   })



////////////////////////// EXAMPLE QUERY FOR APP.JS //////////////////////////
// elastic.find(
//     {
//         "query": {
//             "bool": {
//                 "must": [
//                     {
//                         "match_all": {}
//                     }
//                 ],
//                 "must_not": [],
//                 "should": []
//             }
//         },
//         "from": 0,
//         "size": 25000,
//         "sort": [],
//         "aggs": {}
//     }
// ).then((result)=>{
//     console.log(result.body.hits.hits)
// })
////////////////////////// EXAMPLE QUERY FOR APP.JS //////////////////////////

////////////////////////// EXAMPLE WRITE BULK DATA FOR THIS JS //////////////////////////
// var  myArray = []
// ( "Firstly all datas to push myArray" )
// function add(entry) {
//     console.log("Entryed")
//     console.log("Writing to Elastic now")
//     var dataset = myArray
//     const body = dataset.flatMap(doc => [{ index: { _index: 'medicines' } }, doc])
//     elastic.bulk({
//         index: "medicines",
//         type: "p",
//         body: body
//     }, function (err, resp) {
//         console.log(err);
//     })
//     console.log("Writing to MongoDb now")
// }
////////////////////////// EXAMPLE WRITE BULK DATA FOR THIS JS //////////////////////////

////////////////////////// EXAMPLE WRITE SINGLE DATA FOR THIS JS //////////////////////////
// elastic.index({
//     index: "eczaneler",
//     type: "p",
//     body: {
//         "name": "Armağan Eczanesi",
//         "city": "İstanbul",
//         "location": "Maltepe Feyzullah Mahallesi No:6",
//         "status": 200,
//         "products": [{
//             "productName": "Agumentin",
//             "entryPrice": 8.75,
//             "outputPrice": 12.75
//         }]
//     }
// })
////////////////////////// EXAMPLE WRITE SINGLE DATA FOR THIS JS //////////////////////////