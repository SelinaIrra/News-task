
Запуск:
--
`npm i`

`npm start`


Пользователи:
--
admin / admin

user / user


**Создание пользователя:**

```
curl -X POST 'https://jsonbox.io/box_de89fb56d9db75789047/users' \
    -H 'content-type: application/json' \
    -d '{"id": "id", "login": "login", "password": "password", "role": "admin" | "user"}'
```

В качестве back-end используется [jsonbox](https://github.com/vasanthv/jsonbox).


