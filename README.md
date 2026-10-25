# ARISTA · Demo inmobiliaria

Plantilla responsive de demostración para el sector inmobiliario, construida con Next.js App Router, React, Tailwind CSS y TypeScript. La identidad usa una paleta arquitectónica de pizarra, marfil y acentos cálidos, con galerías por propiedad y filtros funcionales.

## Empezar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Compilar

```bash
npm run typecheck
npm run build
npm start
```

## Personalización

Los textos, propiedades, precios, imágenes, contacto, ubicación, horarios y reseñas se editan desde `src/data/siteData.ts`. Sustituye los datos ficticios, reseñas de ejemplo y zona de servicio antes de usar esta plantilla para una inmobiliaria real. Las fotografías incluidas son imágenes de demostración generadas para esta maqueta.

Las galerías esperan archivos WebP en `public/images/`. El formulario prepara una consulta por WhatsApp o email cuando esos campos están configurados en `siteData.ts`.
