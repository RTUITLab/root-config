# RTU ITLab managing system frontend, that was splitted using single-spa.

## Project setup
Create config.json in ./itlab-front/public with the next content:
```
{
    "VUE_APP_AUTHORITY": "https://dev.identity.rtuitlab.ru",
    "VUE_APP_CLIENT_ID": "itlab_spa",
    "VUE_APP_REDIRECT_URI": "http://localhost:9000/logincallback",
    "VUE_APP_RESPONSE_TYPE": "code",
    "VUE_APP_SCOPE": "openid profile itlab.events itlab.projects itlab.salary",
    "VUE_APP_POST_LOGOUT_REDIRECT_URL": "http://localhost:9000",
    "VUE_APP_SILENT_REDIRECT_URI": "http://localhost:9000/silentcallback",
    "VUE_APP_VK_GROUP_DIALOG_URL": "https://vk.com/im?sel=-181627275",
    "VUE_APP_DEV_FUNC_ENABLED": true,
    "VUE_APP_FILES_BASE_ADDRESS": "https://dev.mfs.rtuitlab.ru"
} 
```

Then run following command

```
npm i
```

in the next folders: 
```
./
./itlab-front
./itlab-projects-front
```

## Project run

| Folder                | Command       | Default port |
|-----------------------|---------------|--------------|
| ./                    | npm start     | 9000         |
| ./itlab-front         | npm run serve | 9001         |
| ./itlab-project-front | npm start     | 8500         |

Application will be run on http://localhost:9000/
