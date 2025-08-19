# Currency Conversion API

Backend técnico para conversión de divisas (FIAT y Crypto) con:
- Node.js + FeathersJS
- MongoDB/Mongoose
- RabbitMQ
- Joi Validations
- PDF Reports

## Setup

```bash
git clone https://github.com/usuario/currency-conversion-api.git
cd currency-conversion-api
npm install
cp .env.example .env
npm run dev
```

##  Endpoints

### `GET /rates`
Obtiene tasas guardadas.

### `POST /rates`
Agrega o actualiza tasa.
Body:
```json
{ "symbol": "USD", "value": 18.5 }
```

### `POST /convert`
Convierte divisas.
Body:
```json
{ "from": "USD", "to": "MXN", "amount": 100 }
```

### `GET /report`
Descarga PDF con reporte diario.

##  Testing

```bash
npm test
```

Autor: **Roberto Perez**
