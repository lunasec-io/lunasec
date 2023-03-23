FROM python:3.8

RUN pip install pipenv

ENV PROJECT_DIR /usr/local/src/webapp

WORKDIR ${PROJECT_DIR}

COPY Pipfile Pipfile.lock ${PROJECT_DIR}/

RUN pipenv install --system --deploy

COPY . /usr/local/src/webapp

EXPOSE 50051

CMD ["python", "server.py"]
