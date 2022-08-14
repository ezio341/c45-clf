import {parse} from 'csv-parse'
import fs from 'fs'
import { C45 } from 'c4.5'
// import c45Model from '../model/c45.json' assert {type: "json"}
import {createRequire} from 'module'
const require = createRequire(import.meta.url)
export const TrainData = async (req, res)=>{
  const raw = req.file
  const {type} = req.body
  const {colStart, colEnd} = req.query
  if(fs.existsSync('model/C45Model.json')){
    fs.unlinkSync('model/C45Model.json')
  }

  const csv = fs.readFileSync(raw.path)
  let trainData = []
  let features = []
  let target = []
  let featureTypes = JSON.parse(type)
  parse(csv, (err, result)=>{
    const headers = result[0]
    features = headers.slice(colStart, -1)
    target = headers[headers.length - 1]
    trainData = result.slice(1, -1).map(val=>{
      return val.slice(colStart, colEnd)
    })
    const c45 = C45()
    c45.train({
     data: trainData,
     target: target,
     features:features,
     featureTypes: featureTypes
    }, (err, model)=>{
     if(err){
       res.status(400).json(err)
       return
     }
     fs.writeFile('model/C45Model.json', c45.toJSON(), (err)=>{
       if(err){
         res.status(400).json(err)
       }
       res.json({status:200, result: 'train success'})
     })
   })
  })
}
const mClassify = (data) =>{
  const c45 = C45()
  c45.restore(require('../model/C45Model.json'))
  const model = c45.getModel()
  return {
    classify: data,
    result: model.classify(data)
  }
} 
export const classify = async (req, res)=>{
  const data = JSON.parse(req.body.data)
  res.json({status:200, ...mClassify(data)})
}