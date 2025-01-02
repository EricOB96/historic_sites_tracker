FROM python:3.9

ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y \
    gdal-bin \
    libgdal-dev \
    python3-gdal \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /code

COPY requirements.txt /code/
RUN pip install -r requirements.txt

COPY . /code/

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]