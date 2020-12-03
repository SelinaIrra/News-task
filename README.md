**News-Task**
--

SPA для отображения списка новостей.

Запуск:
--
`npm i`

`npm start`

Демо:
--

[https://selinairra.github.io/News-task/demo](https://selinairra.github.io/News-task/demo/)

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

Стек:
--
React, react hooks, redux, redux-saga, axios
