# 5.4 Effets visuels avancés

## Introduction

Les effets visuels avancés en CSS permettent de créer des interfaces modernes, immersives et esthétiquement plaisantes. Ces techniques exploitent les dernières fonctionnalités CSS pour produire des effets sophistiqués sans recours à JavaScript ou à des images externes.

## Filtres CSS

### Filtres de base

```css
/* Flou gaussien */
.blur {
  filter: blur(5px);
}

/* Luminosité */
.brightness {
  filter: brightness(1.5); /* 150% de luminosité */
}

/* Contraste */
.contrast {
  filter: contrast(200%);
}

/* Teinte grise */
.grayscale {
  filter: grayscale(100%);
}

/* Inversion des couleurs */
.invert {
  filter: invert(100%);
}

/* Saturation */
.saturate {
  filter: saturate(200%);
}

/* Sépia */
.sepia {
  filter: sepia(75%);
}

/* Rotation de teinte */
.hue-rotate {
  filter: hue-rotate(90deg);
}
```

**Aperçu :**

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <div style="text-align: center;">
    <div style="width: 80px; height: 80px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 10px; margin: 0 auto; filter: blur(5px);"></div>
    <p><code>blur(5px)</code></p>
  </div>
  <div style="text-align: center;">
    <div style="width: 80px; height: 80px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 10px; margin: 0 auto; filter: brightness(1.5);"></div>
    <p><code>brightness(1.5)</code></p>
  </div>
  <div style="text-align: center;">
    <div style="width: 80px; height: 80px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 10px; margin: 0 auto; filter: contrast(200%);"></div>
    <p><code>contrast(200%)</code></p>
  </div>
  <div style="text-align: center;">
    <div style="width: 80px; height: 80px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 10px; margin: 0 auto; filter: grayscale(100%);"></div>
    <p><code>grayscale(100%)</code></p>
  </div>
  <div style="text-align: center;">
    <div style="width: 80px; height: 80px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 10px; margin: 0 auto; filter: invert(100%);"></div>
    <p><code>invert(100%)</code></p>
  </div>
  <div style="text-align: center;">
    <div style="width: 80px; height: 80px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 10px; margin: 0 auto; filter: saturate(200%);"></div>
    <p><code>saturate(200%)</code></p>
  </div>
  <div style="text-align: center;">
    <div style="width: 80px; height: 80px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 10px; margin: 0 auto; filter: sepia(75%);"></div>
    <p><code>sepia(75%)</code></p>
  </div>
  <div style="text-align: center;">
    <div style="width: 80px; height: 80px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 10px; margin: 0 auto; filter: hue-rotate(90deg);"></div>
    <p><code>hue-rotate(90deg)</code></p>
  </div>
</div>

### Combinaison de filtres

```css
.photo-vintage {
  filter: 
    sepia(30%) 
    contrast(120%) 
    brightness(110%) 
    saturate(90%);
  transition: filter 0.3s ease;
}

.photo-vintage:hover {
  filter: 
    sepia(0%) 
    contrast(100%) 
    brightness(100%) 
    saturate(100%);
}
```

**Aperçu :**

<div style="display: flex; gap: 2rem; align-items: center; margin: 1rem 0;">
  <div style="text-align: center;">
    <div style="width: 120px; height: 120px; background: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23ff6b6b%22/><circle cx=%2230%22 cy=%2230%22 r=%2215%22 fill=%22%234ecdc4%22/><rect x=%2250%22 y=%2250%22 width=%2230%22 height=%2230%22 fill=%22%2345b7d1%22/></svg>'), linear-gradient(45deg, #ff6b6b, #4ecdc4); background-size: cover; border-radius: 10px; margin: 0 auto; filter: sepia(30%) contrast(120%) brightness(110%) saturate(90%); transition: filter 0.3s ease;"></div>
    <p>État normal<br><small>(effet vintage)</small></p>
  </div>
  <div style="font-size: 1.5rem;">→</div>
  <div style="text-align: center;">
    <div style="width: 120px; height: 120px; background: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23ff6b6b%22/><circle cx=%2230%22 cy=%2230%22 r=%2215%22 fill=%22%234ecdc4%22/><rect x=%2250%22 y=%2250%22 width=%2230%22 height=%2230%22 fill=%22%2345b7d1%22/></svg>'), linear-gradient(45deg, #ff6b6b, #4ecdc4); background-size: cover; border-radius: 10px; margin: 0 auto; filter: sepia(0%) contrast(100%) brightness(100%) saturate(100%);"></div>
    <p>Au survol<br><small>(original)</small></p>
  </div>
</div>

### Filtres avancés

```css
/* Ombre portée avec filtre */
.shadow-filter {
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
}

/* Effet de flou en arrière-plan */
.backdrop-blur {
  backdrop-filter: blur(10px) saturate(150%);
  background: rgba(255, 255, 255, 0.1);
}

/* Effet de verre dépoli */
.glass-effect {
  backdrop-filter: blur(20px) brightness(1.1);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

**Aperçu :**

<div style="display: flex; gap: 2rem; margin: 1rem 0; background: linear-gradient(45deg, #667eea, #764ba2); padding: 2rem; border-radius: 10px;">
  <div style="text-align: center;">
    <div style="width: 100px; height: 100px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 10px; margin: 0 auto; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));"></div>
    <p style="color: white; margin-top: 0.5rem;"><code>drop-shadow</code></p>
  </div>
  <div style="text-align: center;">
    <div style="width: 100px; height: 100px; backdrop-filter: blur(10px) saturate(150%); background: rgba(255, 255, 255, 0.1); border-radius: 10px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.2);"></div>
    <p style="color: white; margin-top: 0.5rem;"><code>backdrop-filter</code></p>
  </div>
  <div style="text-align: center;">
    <div style="width: 100px; height: 100px; backdrop-filter: blur(20px) brightness(1.1); background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1)); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 10px; margin: 0 auto;"></div>
    <p style="color: white; margin-top: 0.5rem;"><code>glass-effect</code></p>
  </div>
</div>

## Masques et découpes

### CSS Masks

```css
/* Masque avec image */
.masked-image {
  mask: url(mask.svg);
  mask-size: cover;
  mask-repeat: no-repeat;
}

/* Masque avec gradient */
.gradient-mask {
  mask: linear-gradient(
    to bottom,
    black 0%,
    black 70%,
    transparent 100%
  );
}

/* Masque circulaire */
.circular-mask {
  mask: radial-gradient(circle, black 60%, transparent 70%);
}
```

**Aperçu :**

<div style="display: flex; gap: 2rem; margin: 1rem 0;">
  <div style="text-align: center;">
    <div style="width: 120px; height: 120px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); mask: linear-gradient(to bottom, black 0%, black 70%, transparent 100%); border-radius: 10px; margin: 0 auto;"></div>
    <p><code>gradient-mask</code><br><small>Dégradé vertical</small></p>
  </div>
  <div style="text-align: center;">
    <div style="width: 120px; height: 120px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); mask: radial-gradient(circle, black 60%, transparent 70%); border-radius: 10px; margin: 0 auto;"></div>
    <p><code>circular-mask</code><br><small>Masque circulaire</small></p>
  </div>
</div>

### Clip Path

```css
/* Forme géométrique */
.polygon-clip {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

/* Cercle */
.circle-clip {
  clip-path: circle(50% at center);
}

/* Ellipse */
.ellipse-clip {
  clip-path: ellipse(40% 50% at center);
}

/* Forme complexe */
.custom-shape {
  clip-path: polygon(
    0% 15%, 
    15% 15%, 
    15% 0%, 
    85% 0%, 
    85% 15%, 
    100% 15%, 
    100% 85%, 
    85% 85%, 
    85% 100%, 
    15% 100%, 
    15% 85%, 
    0% 85%
  );
}
```

**Aperçu :**

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <div style="text-align: center;">
    <div style="width: 100px; height: 100px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); margin: 0 auto;"></div>
    <p><code>polygon</code><br><small>Diamant</small></p>
  </div>
  <div style="text-align: center;">
    <div style="width: 100px; height: 100px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); clip-path: circle(50% at center); margin: 0 auto;"></div>
    <p><code>circle</code><br><small>Cercle</small></p>
  </div>
  <div style="text-align: center;">
    <div style="width: 100px; height: 100px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); clip-path: ellipse(40% 50% at center); margin: 0 auto;"></div>
    <p><code>ellipse</code><br><small>Ellipse</small></p>
  </div>
  <div style="text-align: center;">
    <div style="width: 100px; height: 100px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); clip-path: polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%); margin: 0 auto;"></div>
    <p><code>custom-shape</code><br><small>Forme complexe</small></p>
  </div>
</div>

## Gradients avancés

### Gradients radiaux complexes

```css
/* Effet de spot lumineux */
.spotlight {
  background: radial-gradient(
    circle at 30% 40%,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0.4) 30%,
    rgba(0, 0, 0, 0.1) 70%,
    rgba(0, 0, 0, 0.8) 100%
  );
}

/* Gradient conique */
.conic-gradient {
  background: conic-gradient(
    from 0deg,
    #ff6b6b,
    #4ecdc4,
    #45b7d1,
    #96ceb4,
    #ffeaa7,
    #ff6b6b
  );
}
```

**Aperçu :**

<div style="display: flex; gap: 2rem; margin: 1rem 0;">
  <div style="text-align: center;">
    <div style="width: 120px; height: 120px; background: radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 30%, rgba(0, 0, 0, 0.1) 70%, rgba(0, 0, 0, 0.8) 100%); border-radius: 10px; margin: 0 auto;"></div>
    <p><code>spotlight</code><br><small>Effet projecteur</small></p>
  </div>
  <div style="text-align: center;">
    <div style="width: 120px; height: 120px; background: conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #ff6b6b); border-radius: 10px; margin: 0 auto;"></div>
    <p><code>conic-gradient</code><br><small>Dégradé conique</small></p>
  </div>
</div>

### Gradients animés

```css
.animated-gradient {
  background: linear-gradient(
    -45deg,
    #ff6b6b,
    #4ecdc4,
    #45b7d1,
    #ffeaa7
  );
  background-size: 400% 400%;
  animation: gradientMove 4s ease infinite;
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

**Aperçu :**

<div style="display: flex; justify-content: center; margin: 1rem 0;">
  <div style="text-align: center;">
    <div style="width: 200px; height: 100px; background: linear-gradient(-45deg, #ff6b6b, #4ecdc4, #45b7d1, #ffeaa7); background-size: 400% 400%; animation: gradientMove 4s ease infinite; border-radius: 10px; margin: 0 auto;"></div>
    <p><code>animated-gradient</code><br><small>Gradient en mouvement</small></p>
  </div>
</div>

<style>
@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>

### Patterns avec gradients

```css
/* Motif en rayures */
.stripes {
  background: repeating-linear-gradient(
    45deg,
    #ff6b6b 0px,
    #ff6b6b 10px,
    #4ecdc4 10px,
    #4ecdc4 20px
  );
}

/* Motif en damier */
.checkerboard {
  background: 
    repeating-conic-gradient(
      #000 0% 25%, 
      #fff 0% 50%
    );
  background-size: 20px 20px;
}

/* Motif de points */
.dots {
  background: 
    radial-gradient(circle, #333 2px, transparent 2px);
  background-size: 20px 20px;
}
```

**Aperçu :**

<div style="display: flex; gap: 2rem; margin: 1rem 0;">
  <div style="text-align: center;">
    <div style="width: 120px; height: 120px; background: repeating-linear-gradient(45deg, #ff6b6b 0px, #ff6b6b 10px, #4ecdc4 10px, #4ecdc4 20px); border-radius: 10px; margin: 0 auto;"></div>
    <p><code>stripes</code><br><small>Rayures diagonales</small></p>
  </div>
  <div style="text-align: center;">
    <div style="width: 120px; height: 120px; background: repeating-conic-gradient(#000 0% 25%, #fff 0% 50%); background-size: 20px 20px; border-radius: 10px; margin: 0 auto;"></div>
    <p><code>checkerboard</code><br><small>Damier</small></p>
  </div>
  <div style="text-align: center;">
    <div style="width: 120px; height: 120px; background: radial-gradient(circle, #333 2px, transparent 2px); background-size: 20px 20px; border-radius: 10px; margin: 0 auto;"></div>
    <p><code>dots</code><br><small>Points réguliers</small></p>
  </div>
</div>

## Effets de morphing et déformation

### CSS Shapes

```css
.morphing-shape {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 50%;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.morphing-shape:hover {
  border-radius: 20%;
  transform: scale(1.1) rotate(45deg);
}
```

**Aperçu :**

<div style="display: flex; gap: 2rem; align-items: center; margin: 1rem 0;">
  <div style="text-align: center;">
    <div style="width: 120px; height: 120px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 50%; margin: 0 auto; transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); cursor: pointer;" onmouseover="this.style.borderRadius='20%'; this.style.transform='scale(1.1) rotate(45deg)'" onmouseout="this.style.borderRadius='50%'; this.style.transform='scale(1) rotate(0deg)'"></div>
    <p>État normal<br><small>(survolez pour voir l'effet)</small></p>
  </div>
  <div style="font-size: 1.5rem;">→</div>
  <div style="text-align: center;">
    <div style="width: 120px; height: 120px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 20%; margin: 0 auto; transform: scale(1.1) rotate(45deg);"></div>
    <p>Au survol<br><small>(transformation)</small></p>
  </div>
</div>

### Déformations avec transform

```css
.skew-effect {
  transform: perspective(1000px) rotateX(15deg) rotateY(-15deg);
  transition: transform 0.3s ease;
}

.skew-effect:hover {
  transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.05);
}
```

**Aperçu :**

<div style="display: flex; gap: 2rem; align-items: center; margin: 1rem 0;">
  <div style="text-align: center;">
    <div style="width: 120px; height: 120px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 10px; margin: 0 auto; transform: perspective(1000px) rotateX(15deg) rotateY(-15deg); transition: transform 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.05)'" onmouseout="this.style.transform='perspective(1000px) rotateX(15deg) rotateY(-15deg)'"></div>
    <p>État normal<br><small>(perspective 3D)</small></p>
  </div>
  <div style="font-size: 1.5rem;">→</div>
  <div style="text-align: center;">
    <div style="width: 120px; height: 120px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 10px; margin: 0 auto; transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.05);"></div>
    <p>Au survol<br><small>(redressement + zoom)</small></p>
  </div>
</div>

## Effets de verre et transparence

### Glassmorphism

```css
.glass-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  padding: 2rem;
  color: #fff;
}

.glass-button {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 12px 24px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.glass-button:hover {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.2)
  );
  transform: translateY(-2px);
}
```

**Aperçu :**

<div style="background: linear-gradient(45deg, #667eea, #764ba2); padding: 2rem; border-radius: 10px; margin: 1rem 0;">
  <div style="display: flex; gap: 2rem; justify-content: center;">
    <div style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05)); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.18); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); padding: 1.5rem; color: #fff; text-align: center; min-width: 150px;">
      <h4 style="margin: 0 0 0.5rem 0; color: white;">Glass Card</h4>
      <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">Effet de verre dépoli</p>
    </div>
    <div style="display: flex; align-items: center;">
      <button style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1)); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 12px; padding: 12px 24px; color: white; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2))'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))'; this.style.transform='translateY(0)'">Glass Button</button>
    </div>
  </div>
</div>

### Effet de réfraction

```css
.refraction-effect {
  position: relative;
  overflow: hidden;
}

.refraction-effect::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 70%
  );
  transform: rotate(45deg);
  animation: shine 2s infinite;
}

@keyframes shine {
  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}
```

**Aperçu :**

<div style="display: flex; justify-content: center; margin: 1rem 0;">
  <div style="position: relative; overflow: hidden; width: 200px; height: 120px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
    <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%); transform: rotate(45deg); animation: shine 2s infinite;"></div>
    <span style="position: relative; z-index: 1;">Effet de brillance</span>
  </div>
</div>

<style>
@keyframes shine {
  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}
</style>

## Ombres avancées

### Ombres multiples

```css
.multi-shadow {
  box-shadow: 
    0 1px 3px rgba(0,0,0,0.12),
    0 1px 2px rgba(0,0,0,0.24),
    0 3px 6px rgba(0,0,0,0.16),
    0 10px 20px rgba(0,0,0,0.19),
    0 15px 25px rgba(0,0,0,0.25);
}

/* Ombre neuomorphique */
.neumorphic {
  background: #e0e0e0;
  box-shadow: 
    20px 20px 60px #bebebe,
    -20px -20px 60px #ffffff;
  border-radius: 20px;
}

/* Ombre colorée */
.colored-shadow {
  box-shadow: 
    0 10px 25px rgba(255, 107, 107, 0.3),
    0 15px 35px rgba(78, 205, 196, 0.2);
}
```

**Aperçu :**

<div style="display: flex; gap: 2rem; margin: 1rem 0; padding: 1rem; background: #f5f5f5; border-radius: 10px;">
  <div style="text-align: center;">
    <div style="width: 100px; height: 100px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 10px; margin: 0 auto; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24), 0 3px 6px rgba(0,0,0,0.16), 0 10px 20px rgba(0,0,0,0.19), 0 15px 25px rgba(0,0,0,0.25);"></div>
    <p><code>multi-shadow</code><br><small>Ombres multiples</small></p>
  </div>
  <div style="text-align: center;">
    <div style="width: 100px; height: 100px; background: #e0e0e0; border-radius: 20px; margin: 0 auto; box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff; display: flex; align-items: center; justify-content: center; color: #666; font-weight: bold;">Neo</div>
    <p><code>neumorphic</code><br><small>Neumorphisme</small></p>
  </div>
  <div style="text-align: center;">
    <div style="width: 100px; height: 100px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 10px; margin: 0 auto; box-shadow: 0 10px 25px rgba(255, 107, 107, 0.3), 0 15px 35px rgba(78, 205, 196, 0.2);"></div>
    <p><code>colored-shadow</code><br><small>Ombres colorées</small></p>
  </div>
</div>

### Ombres animées

```css
.animated-shadow {
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  transition: box-shadow 0.3s ease;
}

.animated-shadow:hover {
  box-shadow: 
    0 15px 35px rgba(0,0,0,0.3),
    0 5px 15px rgba(0,0,0,0.1);
  transform: translateY(-5px);
}
```

**Aperçu :**

<div style="display: flex; gap: 2rem; align-items: center; margin: 1rem 0; padding: 2rem; background: #f9f9f9; border-radius: 10px;">
  <div style="text-align: center;">
    <div style="width: 120px; height: 120px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 10px; margin: 0 auto; box-shadow: 0 5px 15px rgba(0,0,0,0.2); transition: all 0.3s ease; cursor: pointer; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;" onmouseover="this.style.boxShadow='0 15px 35px rgba(0,0,0,0.3), 0 5px 15px rgba(0,0,0,0.1)'; this.style.transform='translateY(-5px)'" onmouseout="this.style.boxShadow='0 5px 15px rgba(0,0,0,0.2)'; this.style.transform='translateY(0)'">Survolez</div>
    <p style="margin-top: 1rem;">Ombre animée au survol</p>
  </div>
</div>

## Effets de texte avancés

### Gradients de texte

```css
.gradient-text {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  font-size: 3rem;
}

.animated-text-gradient {
  background: linear-gradient(
    90deg,
    #ff6b6b,
    #4ecdc4,
    #45b7d1,
    #ffeaa7,
    #ff6b6b
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textGradient 3s ease infinite;
}

@keyframes textGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

**Aperçu :**

<div style="text-align: center; margin: 2rem 0;">
  <div style="margin-bottom: 2rem;">
    <h2 style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold; font-size: 2.5rem; margin: 0;">Gradient Text</h2>
    <p><code>gradient-text</code> - Texte avec dégradé statique</p>
  </div>
  <div>
    <h2 style="background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #ffeaa7, #ff6b6b); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: textGradient 3s ease infinite; font-weight: bold; font-size: 2.5rem; margin: 0;">Animated Text</h2>
    <p><code>animated-text-gradient</code> - Texte avec dégradé animé</p>
  </div>
</div>

<style>
@keyframes textGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>

### Effets de texte 3D

```css
.text-3d {
  font-size: 4rem;
  font-weight: bold;
  color: #333;
  text-shadow: 
    1px 1px 0px #ccc,
    2px 2px 0px #ccc,
    3px 3px 0px #ccc,
    4px 4px 0px #ccc,
    5px 5px 0px #ccc,
    6px 6px 0px #ccc,
    7px 7px 10px rgba(0,0,0,0.4);
}

.neon-text {
  color: #fff;
  text-shadow: 
    0 0 5px #4ecdc4,
    0 0 10px #4ecdc4,
    0 0 15px #4ecdc4,
    0 0 20px #4ecdc4,
    0 0 35px #4ecdc4,
    0 0 40px #4ecdc4;
  animation: neonFlicker 2s infinite alternate;
}

@keyframes neonFlicker {
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    text-shadow: 
      0 0 5px #4ecdc4,
      0 0 10px #4ecdc4,
      0 0 15px #4ecdc4,
      0 0 20px #4ecdc4,
      0 0 35px #4ecdc4,
      0 0 40px #4ecdc4;
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
}
```

**Aperçu :**

<div style="text-align: center; margin: 2rem 0; background: #2a2a2a; padding: 2rem; border-radius: 10px;">
  <div style="margin-bottom: 2rem;">
    <h2 style="font-size: 2.5rem; font-weight: bold; color: #333; text-shadow: 1px 1px 0px #ccc, 2px 2px 0px #ccc, 3px 3px 0px #ccc, 4px 4px 0px #ccc, 5px 5px 0px #ccc, 6px 6px 0px #ccc, 7px 7px 10px rgba(0,0,0,0.4); margin: 0;">3D TEXT</h2>
    <p style="color: #ccc; margin: 0.5rem 0;"><code>text-3d</code> - Effet de relief 3D</p>
  </div>
  <div>
    <h2 style="color: #fff; text-shadow: 0 0 5px #4ecdc4, 0 0 10px #4ecdc4, 0 0 15px #4ecdc4, 0 0 20px #4ecdc4, 0 0 35px #4ecdc4, 0 0 40px #4ecdc4; animation: neonFlicker 2s infinite alternate; font-size: 2.5rem; font-weight: bold; margin: 0;">NEON</h2>
    <p style="color: #ccc; margin: 0.5rem 0;"><code>neon-text</code> - Effet néon clignotant</p>
  </div>
</div>

<style>
@keyframes neonFlicker {
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    text-shadow: 
      0 0 5px #4ecdc4,
      0 0 10px #4ecdc4,
      0 0 15px #4ecdc4,
      0 0 20px #4ecdc4,
      0 0 35px #4ecdc4,
      0 0 40px #4ecdc4;
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
}
</style>

## Animations de particules CSS

### Effet de confetti

```css
.confetti-container {
  position: relative;
  overflow: hidden;
  height: 100vh;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #ff6b6b;
  animation: confettiFall 3s linear infinite;
}

.confetti:nth-child(2n) {
  background: #4ecdc4;
  animation-delay: -0.5s;
  animation-duration: 2.5s;
}

.confetti:nth-child(3n) {
  background: #45b7d1;
  animation-delay: -1s;
  animation-duration: 3.5s;
}

@keyframes confettiFall {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}
```

**Aperçu :**

<div style="position: relative; overflow: hidden; height: 200px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 10px; margin: 1rem 0;">
  <div style="position: absolute; width: 8px; height: 8px; background: #ff6b6b; left: 10%; animation: confettiFall 3s linear infinite;"></div>
  <div style="position: absolute; width: 8px; height: 8px; background: #4ecdc4; left: 30%; animation: confettiFall 2.5s linear infinite; animation-delay: -0.5s;"></div>
  <div style="position: absolute; width: 8px; height: 8px; background: #45b7d1; left: 50%; animation: confettiFall 3.5s linear infinite; animation-delay: -1s;"></div>
  <div style="position: absolute; width: 8px; height: 8px; background: #ffeaa7; left: 70%; animation: confettiFall 3s linear infinite; animation-delay: -1.5s;"></div>
  <div style="position: absolute; width: 8px; height: 8px; background: #ff6b6b; left: 90%; animation: confettiFall 2.8s linear infinite; animation-delay: -2s;"></div>
  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-weight: bold; text-align: center;">
    <p>Effet de confetti animé</p>
  </div>
</div>

<style>
@keyframes confettiFall {
  0% {
    transform: translateY(-20px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(220px) rotate(360deg);
    opacity: 0;
  }
}
</style>

### Effet de bulles flottantes

```css
.bubble {
  position: absolute;
  background: linear-gradient(45deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4));
  border-radius: 50%;
  animation: bubbleFloat 6s infinite linear;
}

.bubble:nth-child(1) {
  width: 40px;
  height: 40px;
  left: 10%;
  animation-delay: 0s;
}

.bubble:nth-child(2) {
  width: 20px;
  height: 20px;
  left: 20%;
  animation-delay: 2s;
  animation-duration: 5s;
}

.bubble:nth-child(3) {
  width: 60px;
  height: 60px;
  left: 35%;
  animation-delay: 4s;
}

@keyframes bubbleFloat {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) scale(1);
    opacity: 0;
  }
}
```

**Aperçu :**

<div style="position: relative; overflow: hidden; height: 200px; background: linear-gradient(180deg, #4ecdc4, #45b7d1); border-radius: 10px; margin: 1rem 0;">
  <div style="position: absolute; width: 30px; height: 30px; background: linear-gradient(45deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4)); border-radius: 50%; left: 15%; animation: bubbleFloat 4s infinite linear;"></div>
  <div style="position: absolute; width: 20px; height: 20px; background: linear-gradient(45deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4)); border-radius: 50%; left: 35%; animation: bubbleFloat 3.5s infinite linear; animation-delay: -1s;"></div>
  <div style="position: absolute; width: 25px; height: 25px; background: linear-gradient(45deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4)); border-radius: 50%; left: 55%; animation: bubbleFloat 4.5s infinite linear; animation-delay: -2s;"></div>
  <div style="position: absolute; width: 18px; height: 18px; background: linear-gradient(45deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4)); border-radius: 50%; left: 75%; animation: bubbleFloat 3.8s infinite linear; animation-delay: -0.5s;"></div>
  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-weight: bold; text-align: center;">
    <p>Bulles flottantes</p>
  </div>
</div>

<style>
@keyframes bubbleFloat {
  0% {
    transform: translateY(180px) scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-20px) scale(1);
    opacity: 0;
  }
}
</style>

## Effets de parallaxe CSS

L'effet de parallaxe crée une illusion de profondeur en déplaçant différents éléments à des vitesses différentes lors du défilement. Voici un exemple simple d'effet de parallaxe avec plusieurs couches.

```css
.parallax-container {
  height: 100vh;
  overflow-y: auto;
  position: relative;
}

.parallax-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  will-change: transform;
}

/* Arrière-plan lointain - se déplace très lentement */
.parallax-sky {
  height: 100%;
  background: linear-gradient(180deg, #1a1a2e, #16213e);
  z-index: 1;
}

/* Montagnes lointaines - vitesse lente */
.parallax-mountains-far {
  height: 60%;
  bottom: 0;
  background: url('mountains-far.svg') repeat-x bottom;
  z-index: 2;
}

/* Montagnes moyennes - vitesse intermédiaire */
.parallax-mountains-mid {
  height: 40%;
  bottom: 0;
  background: url('mountains-mid.svg') repeat-x bottom;
  z-index: 3;
}

/* Premier plan - se déplace rapidement */
.parallax-foreground {
  height: 30%;
  bottom: 0;
  background: url('trees.svg') repeat-x bottom;
  z-index: 4;
}

/* Contenu principal */
.parallax-content {
  position: relative;
  z-index: 5;
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 2rem;
  margin-top: 100vh;
}
```

```javascript
// JavaScript pour l'effet parallaxe
const parallaxContainer = document.querySelector('.parallax-container');
const layers = {
  sky: document.querySelector('.parallax-sky'),
  mountainsFar: document.querySelector('.parallax-mountains-far'),
  mountainsMid: document.querySelector('.parallax-mountains-mid'),
  foreground: document.querySelector('.parallax-foreground')
};

parallaxContainer.addEventListener('scroll', function() {
  const scrollTop = parallaxContainer.scrollTop;
  
  // Appliquer différentes vitesses à chaque couche
  layers.sky.style.transform = `translateY(${scrollTop * 0.1}px)`;
  layers.mountainsFar.style.transform = `translateY(${scrollTop * 0.3}px)`;
  layers.mountainsMid.style.transform = `translateY(${scrollTop * 0.5}px)`;
  layers.foreground.style.transform = `translateY(${scrollTop * 0.7}px)`;
});
```

**Aperçu :**

<div id="parallax-demo" style="position: relative; height: 250px; overflow-y: auto; border-radius: 10px; margin: 1rem 0; background: #000; border: 2px solid #333;">
  <!-- Couche arrière-plan très lointain -->
  <div id="layer-sky" style="position: absolute; width: 100%; height: 400px; background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); z-index: 1;">
    <!-- Étoiles -->
    <div style="position: absolute; top: 20px; left: 20%; width: 2px; height: 2px; background: white; border-radius: 50%;"></div>
    <div style="position: absolute; top: 40px; left: 60%; width: 2px; height: 2px; background: white; border-radius: 50%;"></div>
    <div style="position: absolute; top: 60px; left: 80%; width: 1px; height: 1px; background: white; border-radius: 50%;"></div>
  </div>
  
  <!-- Couche montagnes lointaines -->
  <div id="layer-mountains-far" style="position: absolute; width: 100%; height: 200px; bottom: 0; z-index: 2;">
    <svg width="100%" height="200" style="display: block;">
      <polygon points="0,200 0,120 100,80 200,100 300,60 400,90 500,40 600,70 800,200" fill="#2d3748"/>
    </svg>
  </div>
  
  <!-- Couche montagnes moyennes -->
  <div id="layer-mountains-mid" style="position: absolute; width: 100%; height: 150px; bottom: 0; z-index: 3;">
    <svg width="100%" height="150" style="display: block;">
      <polygon points="0,150 0,100 80,70 160,90 240,50 320,80 400,40 480,65 560,30 640,60 800,150" fill="#4a5568"/>
    </svg>
  </div>
  
  <!-- Couche premier plan -->
  <div id="layer-foreground" style="position: absolute; width: 100%; height: 100px; bottom: 0; z-index: 4;">
    <svg width="100%" height="100" style="display: block;">
      <polygon points="0,100 0,60 50,40 100,50 150,30 200,45 250,25 300,40 350,20 400,35 450,15 500,30 550,10 600,25 800,100" fill="#68d391"/>
    </svg>
  </div>
  
  <!-- Contenu avec du texte pour le scroll -->
  <div style="position: relative; z-index: 5; margin-top: 200px; padding: 2rem; background: rgba(0,0,0,0.8); color: white;">
    <h3 style="margin: 0 0 1rem 0;">Effet Parallaxe Interactif</h3>
    <p style="margin: 0 0 1rem 0;">Scrollez dans cette zone pour voir les différentes couches se déplacer à des vitesses différentes.</p>
    <p style="margin: 0 0 1rem 0;">• Le ciel (arrière-plan) se déplace très lentement</p>
    <p style="margin: 0 0 1rem 0;">• Les montagnes lointaines se déplacent lentement</p>
    <p style="margin: 0 0 1rem 0;">• Les montagnes moyennes se déplacent moyennement</p>
    <p style="margin: 0 0 1rem 0;">• Le premier plan se déplace rapidement</p>
    <br><br><br>
    <p style="margin: 0; opacity: 0.7;">Continuez à scroller pour voir l'effet...</p>
    <br><br><br>
    <p style="margin: 0; text-align: center;">🏔️ Effet de profondeur 3D 🏔️</p>
    <br><br><br>
  </div>
</div>

<script setup>
import { onMounted } from 'vue';
(function() {
  onMounted(() => {
    const parallaxContainer = document.getElementById('parallax-demo');
    const layers = {
      sky: document.getElementById('layer-sky'),
      mountainsFar: document.getElementById('layer-mountains-far'),
      mountainsMid: document.getElementById('layer-mountains-mid'),
      foreground: document.getElementById('layer-foreground')
    };
    
    parallaxContainer.addEventListener('scroll', function() {
      const scrollTop = parallaxContainer.scrollTop;
      
      // Différentes vitesses pour chaque couche
      layers.sky.style.transform = `translateY(${scrollTop * 0.1}px)`;
      layers.mountainsFar.style.transform = `translateY(${scrollTop * 0.3}px)`;
      layers.mountainsMid.style.transform = `translateY(${scrollTop * 0.5}px)`;
      layers.foreground.style.transform = `translateY(${scrollTop * 0.7}px)`;
    });
  });
})();
</script>

<p style="text-align: center; margin: 0.5rem 0; font-size: 0.9rem; opacity: 0.8;"><em>👆 Scrollez dans la zone ci-dessus pour voir l'effet de parallaxe en action</em></p>

## Interactions avancées

### Effet de hover sophistiqué

```css
.advanced-card {
  position: relative;
  width: 300px;
  height: 400px;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
}

.advanced-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.advanced-card:hover::before {
  transform: translateX(100%);
}

.advanced-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}

.card-content {
  position: relative;
  z-index: 2;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

**Aperçu :**

<div style="display: flex; justify-content: center; margin: 2rem 0;">
  <div style="position: relative; width: 200px; height: 250px; background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); border-radius: 20px; overflow: hidden; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); cursor: pointer;" onmouseover="this.style.transform='translateY(-10px) scale(1.02)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.4)'; this.querySelector('.shine-effect').style.transform='translateX(100%)'" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='none'; this.querySelector('.shine-effect').style.transform='translateX(-100%)'">
    <div class="shine-effect" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%); transform: translateX(-100%); transition: transform 0.6s;"></div>
    <div style="position: relative; z-index: 2; padding: 1.5rem; height: 100%; display: flex; flex-direction: column; justify-content: space-between; color: white;">
      <h3 style="margin: 0; font-size: 1.2rem;">Carte Interactive</h3>
      <p style="margin: 0.5rem 0; font-size: 0.9rem; opacity: 0.9;">Survolez pour voir l'effet de brillance et l'élévation</p>
      <button style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">Action</button>
    </div>
  </div>
</div>

### Effet de révélation

```css
.reveal-container {
  position: relative;
  overflow: hidden;
}

.reveal-content {
  transform: translateY(100%);
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.reveal-container:hover .reveal-content {
  transform: translateY(0);
}

.reveal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease;
}

.reveal-container:hover .reveal-overlay {
  transform: scaleX(1);
}
```

**Aperçu :**

<div style="display: flex; justify-content: center; margin: 2rem 0;">
  <div style="position: relative; width: 250px; height: 150px; background: #f0f0f0; border-radius: 10px; overflow: hidden; cursor: pointer;" onmouseover="this.querySelector('.reveal-content').style.transform='translateY(0)'; this.querySelector('.reveal-overlay').style.transform='scaleX(1)'" onmouseout="this.querySelector('.reveal-content').style.transform='translateY(100%)'; this.querySelector('.reveal-overlay').style.transform='scaleX(0)'">
    <div style="padding: 1rem; color: #333;">
      <h3 style="margin: 0 0 0.5rem 0;">Contenu initial</h3>
      <p style="margin: 0; opacity: 0.7;">Survolez pour révéler le contenu caché</p>
    </div>
    <div class="reveal-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); transform: scaleX(0); transform-origin: left; transition: transform 0.5s ease;"></div>
    <div class="reveal-content" style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.8); color: white; padding: 1rem; transform: translateY(100%); transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);">
      <h4 style="margin: 0 0 0.5rem 0;">Contenu révélé !</h4>
      <p style="margin: 0; font-size: 0.9rem;">Animation de révélation avec overlay</p>
    </div>
  </div>
</div>

## Performance et optimisation

### Propriétés optimisées pour l'animation

```css
/* Propriétés qui déclenchent la composition */
.optimized-animation {
  /* ✅ Bonnes propriétés pour l'animation */
  transform: translateX(100px); /* Composition */
  opacity: 0.5; /* Composition */
  filter: blur(5px); /* Composition */
  
  /* ❌ Propriétés à éviter en animation */
  /* width: 200px; Paint + Layout */
  /* height: 200px; Paint + Layout */
  /* left: 100px; Paint + Layout */
  /* background-color: red; Paint */
}

/* Optimisation avec will-change */
.will-animate {
  will-change: transform, opacity;
}

.will-animate.finished {
  will-change: auto; /* Réinitialiser après animation */
}
```

### Animation avec GPU

```css
.gpu-optimized {
  transform: translateZ(0); /* Force la composition */
  backface-visibility: hidden; /* Évite les artefacts */
  perspective: 1000px; /* Active le contexte 3D */
}
```

## Exemple pratique complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Effets Visuels Avancés</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 2rem;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .hero {
      text-align: center;
      margin-bottom: 4rem;
    }
    
    .hero h1 {
      font-size: 4rem;
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1rem;
      animation: textShine 3s ease-in-out infinite;
    }
    
    @keyframes textShine {
      0%, 100% { filter: brightness(1) contrast(1); }
      50% { filter: brightness(1.2) contrast(1.1); }
    }
    
    .effects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 4rem;
    }
    
    .effect-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 2rem;
      text-align: center;
      color: white;
      position: relative;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      cursor: pointer;
    }
    
    .effect-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: left 0.5s;
    }
    
    .effect-card:hover::before {
      left: 100%;
    }
    
    .effect-card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }
    
    .morphing-demo {
      width: 100px;
      height: 100px;
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      border-radius: 50%;
      margin: 0 auto 1rem;
      transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .effect-card:hover .morphing-demo {
      border-radius: 25%;
      transform: rotate(45deg) scale(1.2);
    }
    
    .glitch-text {
      font-size: 2rem;
      font-weight: bold;
      color: #fff;
      position: relative;
      margin: 1rem 0;
    }
    
    .glitch-text::before,
    .glitch-text::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    .glitch-text::before {
      animation: glitch-1 0.3s infinite;
      color: #ff6b6b;
      z-index: -1;
    }
    
    .glitch-text::after {
      animation: glitch-2 0.3s infinite;
      color: #4ecdc4;
      z-index: -2;
    }
    
    @keyframes glitch-1 {
      0%, 14%, 15%, 49%, 50%, 99%, 100% { transform: translate(0); }
      15%, 49% { transform: translate(-2px, 2px); }
      50%, 99% { transform: translate(2px, -2px); }
    }
    
    @keyframes glitch-2 {
      0%, 20%, 21%, 62%, 63%, 99%, 100% { transform: translate(0); }
      21%, 62% { transform: translate(2px, 0); }
      63%, 99% { transform: translate(-2px, 2px); }
    }
    
    .particle-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    }
    
    .particle {
      position: absolute;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      animation: float 6s infinite linear;
    }
    
    .particle:nth-child(1) {
      width: 4px;
      height: 4px;
      left: 10%;
      animation-delay: 0s;
    }
    
    .particle:nth-child(2) {
      width: 6px;
      height: 6px;
      left: 20%;
      animation-delay: 2s;
    }
    
    .particle:nth-child(3) {
      width: 3px;
      height: 3px;
      left: 30%;
      animation-delay: 4s;
    }
    
    .particle:nth-child(4) {
      width: 5px;
      height: 5px;
      left: 40%;
      animation-delay: 1s;
    }
    
    .particle:nth-child(5) {
      width: 4px;
      height: 4px;
      left: 50%;
      animation-delay: 3s;
    }
    
    .particle:nth-child(6) {
      width: 6px;
      height: 6px;
      left: 60%;
      animation-delay: 5s;
    }
    
    .particle:nth-child(7) {
      width: 3px;
      height: 3px;
      left: 70%;
      animation-delay: 1.5s;
    }
    
    .particle:nth-child(8) {
      width: 5px;
      height: 5px;
      left: 80%;
      animation-delay: 3.5s;
    }
    
    .particle:nth-child(9) {
      width: 4px;
      height: 4px;
      left: 90%;
      animation-delay: 0.5s;
    }
    
    @keyframes float {
      0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
    
    .neon-button {
      background: transparent;
      border: 2px solid #4ecdc4;
      color: #4ecdc4;
      padding: 1rem 2rem;
      border-radius: 50px;
      font-size: 1.1rem;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    
    .neon-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(78, 205, 196, 0.2),
        transparent
      );
      transition: left 0.5s;
    }
    
    .neon-button:hover::before {
      left: 100%;
    }
    
    .neon-button:hover {
      color: #fff;
      box-shadow: 
        0 0 20px #4ecdc4,
        inset 0 0 20px rgba(78, 205, 196, 0.1);
    }
    
    @media (max-width: 768px) {
      .hero h1 {
        font-size: 2.5rem;
      }
      
      .effects-grid {
        grid-template-columns: 1fr;
      }
      
      .container {
        padding: 1rem;
      }
    }
  </style>
</head>
<body>
  <div class="particle-bg">
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
  </div>
  
  <div class="container">
    <header class="hero">
      <h1>Effets Visuels Avancés</h1>
      <p style="color: rgba(255,255,255,0.8); font-size: 1.2rem;">
        Découvrez la puissance des effets CSS modernes
      </p>
    </header>
    
    <div class="effects-grid">
      <div class="effect-card">
        <div class="morphing-demo"></div>
        <h3>Morphing CSS</h3>
        <p>Transformations fluides et animations de formes</p>
      </div>
      
      <div class="effect-card">
        <div class="glitch-text" data-text="GLITCH">GLITCH</div>
        <h3>Effet Glitch</h3>
        <p>Effets de distorsion numériques</p>
      </div>
      
      <div class="effect-card">
        <div style="width: 100px; height: 100px; margin: 0 auto 1rem; 
                    background: conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #45b7d1, #ffeaa7, #ff6b6b);
                    border-radius: 50%; animation: spin 2s linear infinite;"></div>
        <h3>Gradients Coniques</h3>
        <p>Dégradés circulaires et animations rotatives</p>
      </div>
      
      <div class="effect-card">
        <div style="width: 100px; height: 100px; margin: 0 auto 1rem; 
                    background: #4ecdc4; clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
                    transition: clip-path 0.3s ease;"></div>
        <h3>Clip Path</h3>
        <p>Découpe de formes géométriques complexes</p>
      </div>
    </div>
    
    <div style="text-align: center;">
      <button class="neon-button">Découvrir Plus</button>
    </div>
  </div>
  <style>
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  </style>
</body>
</html>
```

**Aperçu du résultat :**

<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 400px; padding: 2rem; border-radius: 15px; margin: 1rem 0; position: relative; overflow: hidden;">
  <!-- Particules d'arrière-plan -->
  <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0;">
    <div style="position: absolute; width: 4px; height: 4px; background: rgba(255, 255, 255, 0.6); border-radius: 50%; left: 10%; animation: particleFloat 6s infinite linear;"></div>
    <div style="position: absolute; width: 6px; height: 6px; background: rgba(255, 255, 255, 0.6); border-radius: 50%; left: 30%; animation: particleFloat 8s infinite linear; animation-delay: -2s;"></div>
    <div style="position: absolute; width: 3px; height: 3px; background: rgba(255, 255, 255, 0.6); border-radius: 50%; left: 60%; animation: particleFloat 7s infinite linear; animation-delay: -4s;"></div>
    <div style="position: absolute; width: 5px; height: 5px; background: rgba(255, 255, 255, 0.6); border-radius: 50%; left: 80%; animation: particleFloat 9s infinite linear; animation-delay: -1s;"></div>
  </div>
  
  <div style="max-width: 1000px; margin: 0 auto; position: relative; z-index: 1;">
    <!-- Hero Section -->
    <header style="text-align: center; margin-bottom: 3rem;">
      <h1 style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold; font-size: 2.5rem; margin-bottom: 1rem; animation: textShine 3s ease-in-out infinite;">Effets Visuels Avancés</h1>
      <p style="color: rgba(255,255,255,0.8); font-size: 1.1rem; margin: 0;">Découvrez la puissance des effets CSS modernes</p>
    </header>
    <!-- Grille d'effets -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
      <!-- Carte Morphing -->
      <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(20px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.2); padding: 1.5rem; text-align: center; color: white; position: relative; overflow: hidden; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); cursor: pointer;" onmouseover="this.style.transform='translateY(-10px) scale(1.02)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.3)'; this.querySelector('.morphing-demo').style.borderRadius='25%'; this.querySelector('.morphing-demo').style.transform='rotate(45deg) scale(1.2)'" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='none'; this.querySelector('.morphing-demo').style.borderRadius='50%'; this.querySelector('.morphing-demo').style.transform='rotate(0deg) scale(1)'">
        <div class="morphing-demo" style="width: 80px; height: 80px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 50%; margin: 0 auto 1rem; transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);"></div>
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">Morphing CSS</h3>
        <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">Transformations fluides et animations de formes</p>
      </div>
      <!-- Carte Glitch -->
      <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(20px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.2); padding: 1.5rem; text-align: center; color: white; position: relative; overflow: hidden; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); cursor: pointer;" onmouseover="this.style.transform='translateY(-10px) scale(1.02)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.3)'" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='none'">
        <div style="font-size: 1.5rem; font-weight: bold; color: #fff; position: relative; margin: 1rem 0; height: 40px; display: flex; align-items: center; justify-content: center;">
          <span style="position: relative; z-index: 1;">GLITCH</span>
          <span style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; color: #ff6b6b; z-index: -1; animation: glitch1 0.3s infinite;">GLITCH</span>
          <span style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; color: #4ecdc4; z-index: -2; animation: glitch2 0.3s infinite;">GLITCH</span>
        </div>
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">Effet Glitch</h3>
        <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">Effets de distorsion numériques</p>
      </div>
      <!-- Carte Gradient Conique -->
      <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(20px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.2); padding: 1.5rem; text-align: center; color: white; position: relative; overflow: hidden; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); cursor: pointer;" onmouseover="this.style.transform='translateY(-10px) scale(1.02)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.3)'" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='none'">
        <div style="width: 80px; height: 80px; margin: 0 auto 1rem; background: conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #45b7d1, #ffeaa7, #ff6b6b); border-radius: 50%; animation: spin 2s linear infinite;"></div>
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">Gradients Coniques</h3>
        <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">Dégradés circulaires et animations rotatives</p>
      </div>
      <!-- Carte Clip Path -->
      <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(20px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.2); padding: 1.5rem; text-align: center; color: white; position: relative; overflow: hidden; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); cursor: pointer;" onmouseover="this.style.transform='translateY(-10px) scale(1.02)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.3)'" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='none'">
        <div style="width: 80px; height: 80px; margin: 0 auto 1rem; background: #4ecdc4; clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);"></div>
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">Clip Path</h3>
        <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">Découpe de formes géométriques complexes</p>
      </div>
    </div>
    <!-- Bouton Néon -->
    <div style="text-align: center;">
      <button style="background: transparent; border: 2px solid #4ecdc4; color: #4ecdc4; padding: 1rem 2rem; border-radius: 50px; font-size: 1rem; cursor: pointer; position: relative; overflow: hidden; transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 1px;" onmouseover="this.style.color='#fff'; this.style.boxShadow='0 0 20px #4ecdc4, inset 0 0 20px rgba(78, 205, 196, 0.1)'" onmouseout="this.style.color='#4ecdc4'; this.style.boxShadow='none'">
        Découvrir Plus
      </button>
    </div>
  </div>
</div>

<!-- Styles pour les animations -->
<style>
@keyframes particleFloat {
  0% {
    transform: translateY(100px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-420px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes textShine {
  0%, 100% { 
    background-position: 0% 50%; 
    filter: brightness(1) contrast(1); 
  }
  50% { 
    background-position: 100% 50%; 
    filter: brightness(1.2) contrast(1.1); 
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes glitch1 {
  0%, 14%, 15%, 49%, 50%, 99%, 100% { transform: translate(0); }
  15%, 49% { transform: translate(-2px, 2px); }
  50%, 99% { transform: translate(2px, -2px); }
}

@keyframes glitch2 {
  0%, 20%, 21%, 62%, 63%, 99%, 100% { transform: translate(0); }
  21%, 62% { transform: translate(2px, 0); }
  63%, 99% { transform: translate(-2px, 2px); }
}
</style>

## Bonnes pratiques

### ✅ Performance
- Privilégier les propriétés `transform` et `opacity` pour les animations
- Utiliser `will-change` avec parcimonie et le réinitialiser après usage
- Éviter d'animer les propriétés qui déclenchent le layout (width, height, left, top)
- Tester les performances sur différents appareils

### ✅ Accessibilité
- Respecter la préférence `prefers-reduced-motion`
- Fournir des alternatives statiques pour les animations critiques
- Éviter les effets qui peuvent déclencher des crises d'épilepsie
- Maintenir un contraste suffisant même avec les effets

### ✅ UX/UI
- Utiliser les effets avec modération et cohérence
- S'assurer que les effets servent un objectif fonctionnel
- Tester sur différents navigateurs et appareils
- Optimiser pour les performances mobile

### ✅ Maintenabilité
- Organiser les effets en classes réutilisables
- Documenter les effets complexes
- Utiliser des variables CSS pour les valeurs réutilisées
- Prévoir des fallbacks pour les navigateurs non compatibles

## Compatibilité navigateurs

La compatibilité des effets visuels avancés varie considérablement selon les navigateurs et leurs versions. Il est essentiel de comprendre ces différences pour créer des expériences utilisateur cohérentes.

### État du support par navigateur

Les effets CSS avancés ont évolué à des rythmes différents selon les navigateurs :

**🟢 Excellente compatibilité :**
- **Filtres CSS** : Supportés par tous les navigateurs modernes depuis 2014
- **Transformations 2D/3D** : Support universel depuis 2012
- **Gradients linéaires/radiaux** : Largement supportés avec préfixes historiques

**🟡 Compatibilité modérée :**
- **Backdrop-filter** : Chrome 76+, Firefox 103+, Safari 9+ (avec préfixe)
- **CSS Masks** : Support partiel, nécessite souvent des préfixes
- **Clip-path** : Chrome 55+, Firefox 3.5+, Safari 13.1+

**🔴 Support limité :**
- **Gradients coniques** : Chrome 69+, Firefox 83+, pas de support IE
- **Scroll-driven animations** : Très récent, support limité

### Stratégies de préfixes vendeurs

Les préfixes vendeurs permettent d'utiliser des fonctionnalités expérimentales avant leur standardisation :

```css
/* Ordre recommandé : préfixes puis standard */
.advanced-effect {
  /* Webkit (Chrome, Safari, Edge moderne) */
  -webkit-backdrop-filter: blur(10px);
  -webkit-filter: blur(5px);
  -webkit-mask: url(pattern.svg);
  -webkit-clip-path: circle(50%);
  
  /* Mozilla (Firefox) */
  -moz-filter: blur(5px);
  
  /* Microsoft (Edge legacy, IE) */
  -ms-filter: blur(5px);
  
  /* Standards (toujours en dernier) */
  backdrop-filter: blur(10px);
  filter: blur(5px);
  mask: url(pattern.svg);
  clip-path: circle(50%);
}
```

### Détection de support avec @supports

La règle `@supports` permet de détecter si un navigateur supporte une propriété spécifique :

```css
/* Test de support basic */
@supports (backdrop-filter: blur(10px)) {
  .glass-effect {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.1);
  }
}

/* Fallback pour navigateurs non compatibles */
@supports not (backdrop-filter: blur(10px)) {
  .glass-effect {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
}

/* Détection de support complexe */
@supports (mask: url(pattern.svg)) or (-webkit-mask: url(pattern.svg)) {
  .masked-element {
    mask: url(pattern.svg);
    -webkit-mask: url(pattern.svg);
  }
}

/* Combinaison de conditions */
@supports (clip-path: circle(50%)) and (backdrop-filter: blur(10px)) {
  .modern-card {
    clip-path: circle(50%);
    backdrop-filter: blur(15px);
  }
}
```

### Fallbacks progressifs

Implémentez des alternatives dégradées pour assurer une expérience utilisable :

```css
/* Stratégie en cascade pour les filtres */
.image-effect {
  /* Fallback de base (tous navigateurs) */
  opacity: 0.8;
  
  /* Amélioration progressive */
  filter: grayscale(100%) contrast(120%);
  -webkit-filter: grayscale(100%) contrast(120%);
}

/* Glassmorphism avec fallbacks */
.glass-card {
  /* Base : arrière-plan semi-transparent */
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  /* Amélioration : flou d'arrière-plan */
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
}

/* Masques avec alternatives */
.text-reveal {
  /* Fallback : dégradé standard */
  background: linear-gradient(to right, #333, transparent);
  
  /* Amélioration : masque CSS */
  background: #333;
  mask: linear-gradient(to right, black 70%, transparent);
  -webkit-mask: linear-gradient(to right, black 70%, transparent);
}
```

### Détection JavaScript avancée

Pour des contrôles plus sophistiqués, utilisez JavaScript :

```javascript
// Fonction utilitaire de détection de support
function supportsCSS(property, value) {
  const element = document.createElement('div');
  element.style[property] = value;
  return element.style[property] === value;
}

// Tests spécifiques
const hasBackdropFilter = supportsCSS('backdropFilter', 'blur(10px)') || 
                         supportsCSS('webkitBackdropFilter', 'blur(10px)');

const hasClipPath = supportsCSS('clipPath', 'circle(50%)');

const hasMask = supportsCSS('mask', 'url(test.svg)') || 
               supportsCSS('webkitMask', 'url(test.svg)');

// Application conditionnelle des classes
if (hasBackdropFilter) {
  document.body.classList.add('supports-backdrop-filter');
} else {
  document.body.classList.add('no-backdrop-filter');
}

// Détection avec CSS.supports (moderne)
if (CSS.supports('backdrop-filter', 'blur(10px)')) {
  // Navigateur moderne avec support complet
  document.body.classList.add('modern-effects');
}
```

### Polyfills et alternatives

Pour certains effets, des polyfills JavaScript peuvent combler les lacunes :

```css
/* Alternative JavaScript pour backdrop-filter */
.glass-effect-polyfill {
  position: relative;
}

.glass-effect-polyfill::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  filter: blur(10px);
  z-index: -1;
}
```

### Tests multi-navigateurs

**Outils recommandés :**
- **BrowserStack** : Tests sur navigateurs réels
- **Sauce Labs** : Automatisation des tests de compatibilité
- **Can I Use** : Vérification du support des propriétés CSS

**Navigateurs prioritaires (2024) :**
- Chrome 120+ (70% du marché)
- Safari 17+ (20% du marché)
- Firefox 121+ (4% du marché)
- Edge 120+ (4% du marché)

### Bonnes pratiques de compatibilité

```css
/* 1. Ordre des propriétés (préfixes puis standard) */
.element {
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}

/* 2. Variables CSS pour la maintenance */
:root {
  --glass-blur: blur(20px);
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
}

.glass {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
}

/* 3. Classes conditionnelles */
.no-backdrop-filter .glass {
  background: rgba(255, 255, 255, 0.9);
}

.supports-backdrop-filter .glass {
  background: var(--glass-bg);
}
```

### Tableau de compatibilité rapide

| Propriété | Chrome | Firefox | Safari | Edge | IE |
|-----------|--------|---------|--------|------|-----|
| `filter` | 53+ | 35+ | 9.1+ | 12+ | ❌ |
| `backdrop-filter` | 76+ | 103+ | 9+ (-webkit) | 17+ | ❌ |
| `clip-path` | 55+ | 3.5+ | 13.1+ | 12+ | ❌ |
| `mask` | 120+ | 53+ | 15.4+ | 120+ | ❌ |
| `conic-gradient` | 69+ | 83+ | 12.1+ | 79+ | ❌ |

### Performance par navigateur

```css
/* Optimisations spécifiques */
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  /* Optimisations pour écrans Retina */
  .high-dpi-effect {
    filter: blur(0.5px); /* Réduction du flou sur Retina */
  }
}

/* Détection des préférences utilisateur */
@media (prefers-reduced-motion: reduce) {
  .animated-effect {
    animation: none;
    transition: none;
  }
}

@media (prefers-color-scheme: dark) {
  .glass-effect {
    background: rgba(0, 0, 0, 0.3);
  }
}
```

La clé d'une bonne compatibilité est la **dégradation gracieuse** : votre site doit rester fonctionnel même si certains effets avancés ne sont pas supportés, tout en offrant une expérience enrichie sur les navigateurs modernes.

## Résumé

Les effets visuels avancés en CSS permettent de créer des interfaces modernes et engageantes. La maîtrise des filtres, masques, gradients complexes et animations sophistiquées ouvre de nouvelles possibilités créatives tout en maintenant des performances optimales.

