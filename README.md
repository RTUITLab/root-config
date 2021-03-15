# RTU ITLab managing system frontend, that was splitted using single-spa.

## Project setup

1. Prepare for build

   1. Add environmental variables by using command:

      > Powershell

      ```bash
      . .\environment.dev.ps1
      ```

      > Bash

      ```bash
      . ./environment.dev.sh
      ```

   2. While **developing** create config.json in ./itlab-front/public with the next content:

      ```
      {
          "VUE_APP_AUTHORITY": "https://dev.identity.rtuitlab.ru",
          "VUE_APP_CLIENT_ID": "itlab_spa",
          "VUE_APP_REDIRECT_URI": "http://localhost:9000/logincallback",
          "VUE_APP_RESPONSE_TYPE": "code",
          "VUE_APP_SCOPE": "openid profile itlab.events itlab.projects itlab.salary itlab.reports",
          "VUE_APP_POST_LOGOUT_REDIRECT_URL": "http://localhost:9000",
          "VUE_APP_SILENT_REDIRECT_URI": "http://localhost:9000/silentcallback",
          "VUE_APP_VK_GROUP_DIALOG_URL": "https://vk.com/im?sel=-181627275",
          "VUE_APP_DEV_FUNC_ENABLED": true,
          "VUE_APP_FILES_BASE_ADDRESS": "http://localhost:5550"
      }
      ```

   3. Install [jake](https://jakejs.com/)
      ```bash
      npm i -g jake
      ```

2. Build front. Install all **modules** and **build** all fronts
   ```bash
   jake
   ```
   > You can see all tasks using `jake -ls` and desciption how to start them

## Project run

| Folder                | Command       | Default port | CI/CD              |
| --------------------- | ------------- | ------------ | ------------------ |
| ./                    | npm start     | 9000         | no                 |
| ./itlab-front         | npm run serve | 9001         | :white_check_mark: |
| ./itlab-project-front | npm start     | 9002         | :white_check_mark: |
| ./itlab-reports-front | npm start     | 9003         | no                 |

Application will be run on http://127.0.0.1.xip.io:9000/

### Commit error

To fix commit hook run

```bash
npm run fixLint
```
