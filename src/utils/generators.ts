import { Star, Planet, Tile, TileDetail } from '../types/universe';

// Générateur de noms cosmiques
const starNames = [
  'Proxima', 'Vega', 'Altair', 'Rigel', 'Betelgeuse', 'Sirius', 'Canopus', 'Arcturus',
  'Capella', 'Aldebaran', 'Antares', 'Spica', 'Pollux', 'Fomalhaut', 'Deneb', 'Regulus'
];

const planetNames = [
  'Kepler', 'Gliese', 'Trappist', 'Proxima', 'Wolf', 'Ross', 'Lacaille', 'Groombridge',
  'Tau Ceti', 'Epsilon Eridani', 'Alpha Centauri', 'Barnard', 'Vega Prime', 'Altair Beta'
];

const tileDescriptions = {
  water: [
    "Un vaste océan aux eaux cristallines s'étend à perte de vue",
    "Des vagues turquoise viennent lécher des rivages mystérieux",
    "Un lac profond reflète les étoiles dans ses eaux sombres"
  ],
  land: [
    "Une plaine fertile s'étend sous un ciel changeant",
    "Des collines ondulantes offrent un paysage pastoral",
    "Un plateau rocheux domine la région environnante"
  ],
  forest: [
    "Une forêt dense abrite une biodiversité extraordinaire",
    "Des arbres millénaires forment une canopée impénétrable",
    "Une jungle luxuriante résonne de chants d'oiseaux exotiques"
  ],
  city: [
    "Une métropole futuriste s'élève vers les étoiles",
    "Les lumières de la ville scintillent dans la nuit cosmique",
    "Des tours de cristal abritent une civilisation avancée"
  ],
  ruins: [
    "D'anciennes ruines témoignent d'une civilisation perdue",
    "Des structures mystérieuses défient le temps et l'érosion",
    "Les vestiges d'un empire oublié émergent du sol"
  ],
  desert: [
    "Un désert de sable rouge s'étend sous deux soleils",
    "Des dunes mouvantes cachent des secrets enfouis",
    "L'immensité aride révèle la beauté de la désolation"
  ],
  mountain: [
    "Des pics enneigés percent les nuages cosmiques",
    "Une chaîne montagneuse forme une barrière naturelle",
    "Des sommets cristallins reflètent la lumière stellaire"
  ],
  ice: [
    "Une calotte glaciaire préserve les secrets du passé",
    "Des formations de glace créent un paysage féerique",
    "Un glacier millénaire raconte l'histoire de la planète"
  ]
};

export function generateStars(count: number = 50): Star[] {
  const stars: Star[] = [];
  
  for (let i = 0; i < count; i++) {
    const star: Star = {
      id: `star-${i}`,
      name: `${starNames[Math.floor(Math.random() * starNames.length)]}-${i + 1}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      color: ['#ffeb3b', '#ff9800', '#f44336', '#e91e63', '#9c27b0'][Math.floor(Math.random() * 5)],
      temperature: Math.random() * 30000 + 3000
    };
    stars.push(star);
  }
  
  return stars;
}

export function generatePlanets(stars: Star[]): Planet[] {
  const planets: Planet[] = [];
  
  stars.forEach((star, starIndex) => {
    const planetCount = Math.floor(Math.random() * 8) + 1;
    
    for (let i = 0; i < planetCount; i++) {
      const distance = (i + 1) * 15;
      const angle = Math.random() * 2 * Math.PI;
      
      const planet: Planet = {
        id: `planet-${starIndex}-${i}`,
        name: `${planetNames[Math.floor(Math.random() * planetNames.length)]}-${starIndex + 1}${String.fromCharCode(97 + i)}`,
        starId: star.id,
        x: star.x + Math.cos(angle) * distance,
        y: star.y + Math.sin(angle) * distance,
        size: Math.random() * 2 + 0.5,
        hasLife: Math.random() > 0.7,
        type: ['rocky', 'gas', 'ice', 'desert', 'ocean'][Math.floor(Math.random() * 5)] as Planet['type'],
        temperature: Math.random() * 600 - 200,
        atmosphere: ['oxygen', 'nitrogen', 'carbon_dioxide', 'methane', 'hydrogen'].filter(() => Math.random() > 0.5)
      };
      
      planets.push(planet);
    }
  });
  
  return planets;
}

export function generatePlanetMap(planetId: string, size: number = 20): Tile[][] {
  const map: Tile[][] = [];
  
  for (let y = 0; y < size; y++) {
    const row: Tile[] = [];
    for (let x = 0; x < size; x++) {
      const tileTypes: Tile['type'][] = ['water', 'land', 'forest', 'city', 'ruins', 'desert', 'mountain', 'ice'];
      const weights = [0.3, 0.25, 0.15, 0.05, 0.05, 0.1, 0.05, 0.05];
      
      let random = Math.random();
      let selectedType: Tile['type'] = 'land';
      
      for (let i = 0; i < tileTypes.length; i++) {
        if (random < weights[i]) {
          selectedType = tileTypes[i];
          break;
        }
        random -= weights[i];
      }
      
      const tile: Tile = {
        id: `tile-${planetId}-${x}-${y}`,
        planetId,
        x,
        y,
        type: selectedType,
        elevation: Math.random() * 1000,
        temperature: Math.random() * 60 - 20,
        humidity: Math.random() * 100,
        resources: ['water', 'minerals', 'energy', 'biomass', 'rare_metals'].filter(() => Math.random() > 0.7)
      };
      
      row.push(tile);
    }
    map.push(row);
  }
  
  return map;
}

export function generateTileDetail(tile: Tile, planetName: string): TileDetail {
  const descriptions = tileDescriptions[tile.type];
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  
  const titles = {
    water: ['Océan Cristallin', 'Mer Turquoise', 'Lac Mystique'],
    land: ['Plaines Fertiles', 'Collines Ondulantes', 'Plateau Rocheux'],
    forest: ['Forêt Primordiale', 'Jungle Luxuriante', 'Bois Millénaire'],
    city: ['Métropole Stellaire', 'Cité de Cristal', 'Ville Lumière'],
    ruins: ['Ruines Antiques', 'Vestiges Oubliés', 'Temple Perdu'],
    desert: ['Désert Écarlate', 'Dunes Mouvantes', 'Sables Éternels'],
    mountain: ['Pics Cristallins', 'Monts Célestes', 'Sommets Glacés'],
    ice: ['Calotte Polaire', 'Glacier Millénaire', 'Terres Gelées']
  };
  
  const title = titles[tile.type][Math.floor(Math.random() * titles[tile.type].length)];
  
  return {
    id: `detail-${tile.id}`,
    tileId: tile.id,
    title,
    description: `${description}. Cette région de ${planetName} présente des caractéristiques uniques qui en font un lieu d'intérêt particulier pour les explorateurs.`,
    metadata: {
      population: tile.type === 'city' ? Math.floor(Math.random() * 1000000) + 10000 : 
                  tile.type === 'ruins' ? Math.floor(Math.random() * 1000) : 0,
      era: tile.type === 'ruins' ? ['Ancien', 'Classique', 'Médiéval', 'Renaissance'][Math.floor(Math.random() * 4)] : 'Moderne',
      resources: tile.resources,
      danger_level: Math.floor(Math.random() * 10) + 1,
      points_of_interest: [
        'Site archéologique',
        'Formation géologique unique',
        'Écosystème rare',
        'Source d\'énergie',
        'Anomalie magnétique'
      ].filter(() => Math.random() > 0.6)
    },
    generated_at: new Date().toISOString()
  };
}