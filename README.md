Backend repository: https://github.com/ivanpereariza/server

Deployed project: https://capyquiz.vercel.app/

# Client routes

## Index

| URL            | Description       | Protected |
| -------------- | ----------------- | --------- |
| `/`            | Index page        |           |
| `/signup`      | Signup page       |           |
| `/login`       | Login page        |           |
| `/ranking`     | Ranking page      |           |

## User
| URL                 | Description       | Protected |
| ------------------- | ----------------- | --------- |
| `/profile/:id`      | User profile page | ✅       |
| `/profile/edit/:id` | Edit user profile | ✅       |


## Quizzes

base URL `/quizzes`

| URL            | Description       | Protected |
| -------------- | ----------------- | --------- |
| `/`            | Quizzes list page |           |
| `/edit/:id`    | Quiz edit page    | ✅       |
| `/play/:id`    | Quiz play page    | ✅       |
| `/create`      | Create new Quiz   | ✅       |



