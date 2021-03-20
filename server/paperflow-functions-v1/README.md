## How to start

### Running server

```
cd ./paperflowServer
python3 manage.py migrate
python3 manage.py runserver
```

### Setting virtual environment

- Creating VE

```
python3 -m venv ./venv
```

- Activating VE

```
source ./venv/bin/activate
```

### Managing Packages

- Installing & Exporting

```
./package.sh
```

- Installing

```
source ./venv/bin/activate
pip3 install -r requirements.txt
```

- Exporting

```
source ./venv/bin/activate
pip3 freeze > requirements.txt
```
