const Intl = require('intl')
const fs = require('fs')
const data = require('./data.json')
const { age, date } = require("./utils.js")


//show (mostrar)
exports.show = function(req, res) {
    //req.params 
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    }) 

    if (!foundInstructor) return res.send("Instructor not found!")


    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at)
    }



    return res.render("instructors/show", { instructor })
}


// create
exports.post = function(req, res) {
    // req.query
    //req.body

    const keys = Object.keys(req.body)

    for (key of keys) {
        // req.body.key == ""
        if (req.body[key] == "") {
            return res.send('Por favor, preencha todos os campos!')
        }
    }

    let {avatar_url, birth, gender, services, name} = req.body


    // padronizar a data assim como no created_at
    birth = Date.parse(birth)

    //criar data no momento que esta sendo salvo
    const created_at = Date.now()

    //organizar por id
    const id = Number(data.instructors.length +1)




    // [{...}]
    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    }) // [{....}, {....}]

    //salvar na pasta data.json e organizar em espaços de 2 como diz na function
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write File Error!")

        return res.redirect("/instructors")
    })


 //   return res.send(req.body)
}


//  edit   //
exports.edit = function(req, res){
       //req.params 
       const { id } = req.params

       const foundInstructor = data.instructors.find(function(instructor){
           return instructor.id == id
       }) 
   
       if (!foundInstructor) return res.send("Instructor not found!")
   
       const instructor = {
           ...foundInstructor,
           birth: ''

       }
   

    return res.render('instructors/edit', { instructor })
}