# REST Cats
- GET http://cats-application.com/api/cat READ -> getCats() <- Получение всех котов 
- GET http://cats-application.com/api/cat/10 READ -> getCatById() <- Получение одного котика по айди
- POST { "name": "Murzik", "image": "someurl" } http://cats-application.com/api/cat CREATE -> createNewCatId() -> createCat(id) <- id | Cat
- PUT { "name": "Barsik" } http://cats-application.com/api/cat/10 UPDATE -> updateCatById(id, catData) <- id
- DELETE http://cats-application.com/api/cat/id -> removeCatBydId(id) <- id

# MVC
- Model - бизнес логика
- Controller - принимает решения
- View? - презентация
