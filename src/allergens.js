const allergens = {
  peanut_allergy: {
    avoid: [
      "peanuts",
      "peanut butter",
      "peanut flour",
      "cold pressed/expelled/expresser peanut oil"
    ],
    reference: "PubMed PMID: 32746625"
  },
  tree_nut_allergy: {
    avoid: [
      "almonds",
      "cashews",
      "walnuts",
      "hazelnuts",
      "pistachios",
      "brazil nuts",
      "pecans",
      "macadamia nuts",
      "pine nuts"
    ],
    reference: "PubMed PMID: 31932110"
  },
  milk_allergy: {
    avoid: [
      "milk",
      "cream",
      "butter",
      "cheese",
      "yogurt",
      "casein",
      "whey",
      "ghee"
    ],
    reference: "PubMed PMID: 29960649"
  },
  egg_allergy: {
    avoid: [
      "egg white",
      "egg yolk",
      "albumin",
      "ovomucoid",
      "ovalbumin",
      "lysozyme"
    ],
    reference: "PubMed PMID: 35136883"
  },
  wheat_allergy: {
    avoid: [
      "wheat flour",
      "bread (wheat-based)",
      "pasta (wheat-based)",
      "couscous",
      "bulgur",
      "seitan",
      "farina",
      "semolina"
    ],
    reference: "PubMed PMID: 28605664"
  }
};

export default allergens;
