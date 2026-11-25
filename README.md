# Portfolio — Tristan Dhersin

Site portfolio personnel : ingénieur développeur web full-stack (Java / Spring Boot & Angular).

Site statique en **HTML, CSS et JavaScript** sans dépendance ni build.

## Contenu

Une seule page en deux colonnes : identité, disponibilité et contact à gauche (fixe sur ordinateur), puis profil, expérience, projets, formation, associatif et compétences.

Thème sombre automatique selon le réglage du système, mise en page adaptée au mobile et à l'impression.

## Lancer en local

Ouvrir `index.html` dans un navigateur, ou :

```bash
npx serve .
```

## Déployer sur GitHub Pages

Settings → Pages → Source : `Deploy from a branch` → branche `main`, dossier `/ (root)`.
Le site sera disponible sur `https://tristanbrouille.github.io/Portfolio_Tristan/`.

## Structure

```
index.html          version anglaise (par défaut)
fr/index.html       version française
en/index.html       redirige vers la racine (anciens liens)
style.css
script.js
assets/
  photo.jpg
  CV_Tristan_Dhersin.pdf      CV en français
  CV_Tristan_Dhersin_EN.pdf   CV en anglais
```

Le bouton FR / EN mémorise la langue choisie.
