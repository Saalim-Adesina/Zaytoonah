import random

existing_products = [
  {
    "id": 'p1',
    "categoryId": '1',
    "name": 'Almarai Fresh Milk',
    "quantity": '2L',
    "price": 5.50,
    "image": "require('../../assets/images/welcome.png')", 
    "description": 'Full fat fresh milk, rich in calcium and vitamins.',
    "brand": 'Almarai',
    "categories": ['Dairy', 'Milk', 'Fresh'],
    "qrCode": '1234567890123',
    "score": 92,
    "scoreLabel": 'Safe',
    "scoreColor": '#59df00',
    "verdict": 'Safe to consume daily.',
    "eatingInstructions": [
      'Keep refrigerated.',
      'Consume within 3 days of opening.'
    ],
    "nutrients": [
      { "name": 'Calcium', "level": 'High', "value": '30%', "color": '#59df00' },
      { "name": 'Fat', "level": 'Medium', "value": '3%', "color": '#FFD580' },
    ]
  },
  {
    "id": 'p2',
    "categoryId": '2',
    "name": 'Fresh Chicken Breast',
    "quantity": '500g',
    "price": 25.00,
    "image": "require('../../assets/images/welcome.png')",
    "description": 'Boneless, skinless chicken breast, perfect for grilling.',
    "brand": 'Alyoum',
    "categories": ['Poultry', 'Chicken', 'Meat'],
    "qrCode": '9876543210987',
    "score": 97,
    "scoreLabel": 'Safe',
    "scoreColor": '#59df00',
    "verdict": 'Excellent source of protein.',
    "eatingInstructions": [
      'Cook thoroughly before eating.',
      'Wash hands after handling raw meat.'
    ],
    "nutrients": [
      { "name": 'Protein', "level": 'High', "value": '25g', "color": '#59df00' },
      { "name": 'Sodium', "level": 'Low', "value": '50mg', "color": '#59df00' },
    ]
  },
  {
    "id": 'p3',
    "categoryId": '4',
    "qrCode": '6291107054346',
    "name": "BALADNA UHT Juice Pineapple",
    "quantity": '200ml',
    "price": 1.50,
    "image": "require('../../assets/images/products/pineapple_juice.jpg')", # Updated image
    "description": "Fruit Juice 200ml",
    "brand": 'Baladna',
    "categories": ['Sweets', 'Juice', 'Beverage'],
    "score": 22,
    "scoreLabel": 'Medium',
    "scoreColor": '#FFD580', 
    "verdict": 'Safe to eat only at minimum quantities',
    "eatingInstructions": [
      'Consume maximum twice per day',
      'Wait 3 hours before next consumption',
      'Only eat after taking aspirin'
    ],
    "nutrients": [
      { "name": 'Processing Level', "level": 'Ultra-processed Food', "value": '', "color": '#FF0000' },
      { "name": 'Saturated Fat', "level": 'High Fat', "value": '6.2g', "color": '#FFD580' },
      { "name": 'Sodium', "level": 'High Salt', "value": '510mg', "color": '#FFD580' },
    ]
  },
  {
    "id": 'p4',
    "categoryId": '3',
    "name": 'Whole Wheat Bread',
    "quantity": '600g',
    "price": 4.00,
    "image": "require('../../assets/images/Mask group (1).png')",
    "description": 'Healthy whole wheat bread.',
    "brand": 'Lusine',
    "categories": ['Breads', 'Bakery'],
    "qrCode": '456123789',
    "score": 90,
    "scoreLabel": 'Safe',
    "scoreColor": '#59df00',
    "verdict": 'Good source of fiber.',
    "eatingInstructions": ['Store in a cool dry place.'],
    "nutrients": []
  },
  {
    "id": 'p5',
    "categoryId": '2',
    "name": 'Chicken Thighs',
    "quantity": '900g',
    "price": 18.00,
    "image": "require('../../assets/images/image 4.png')",
    "description": 'Juicy chicken thighs.',
    "brand": 'Tanmiah',
    "categories": ['Poultry', 'Chicken'],
    "qrCode": '789456123',
    "score": 88,
    "scoreLabel": 'Safe',
    "scoreColor": '#59df00',
    "verdict": 'Safe to eat.',
    "eatingInstructions": ['Cook well.'],
    "nutrients": []
  }
]

new_products_data = [
    {"name": "Ayran Yoghurt Drink", "cat": "1", "img": "ayran.png", "brand": "Almarai"},
    {"name": "Tea Biscuits", "cat": "4", "img": "biscuits2.png", "brand": "Teashop"},
    {"name": "Chilli Dip", "cat": "6", "img": "chilli_dip.png", "brand": "Home"},
    {"name": "Cocktail Sweets", "cat": "4", "img": "cocktail_sweets.jpg", "brand": "Bakery"},
    {"name": "Coke Zero", "cat": "4", "img": "coke_zero.png", "brand": "Coca Cola"},
    {"name": "Digestive Biscuits", "cat": "4", "img": "digestive_buscuits.jpg", "brand": "McVities"},
    {"name": "Fatoush Salad", "cat": "6", "img": "fatoush_salad.jpg", "brand": "Deli"},
    {"name": "Fresh Cream", "cat": "1", "img": "freshqa.jpg", "brand": "Fresh"},
    {"name": "Ginger Ale", "cat": "4", "img": "ginger_ale.jpg", "brand": "Schweppes"},
    {"name": "Hummus", "cat": "6", "img": "hummus.jpg", "brand": "Mezzete"},
    {"name": "Fresh Lime", "cat": "6", "img": "lime.png", "brand": "Farm"},
    {"name": "Condensed Milk", "cat": "1", "img": "nestle_condensed_milk.jpg", "brand": "Nestle"},
    {"name": "Oman Chips", "cat": "4", "img": "oman_chips.png", "brand": "Chips Oman"},
    {"name": "Fresh Orange", "cat": "6", "img": "orange.jpg", "brand": "Farm"},
    {"name": "Toffee Candy", "cat": "4", "img": "Toffeee.png", "brand": "Quality Street"},
    {"name": "Fresh Yogurt", "cat": "1", "img": "yogurt.jpg", "brand": "Nada"},
]

def get_score_details(score):
    if score >= 80:
        return "Safe", "#59df00", "Safe to consume."
    elif score >= 50:
        return "Moderate", "#FFD580", "Consume in moderation."
    else:
        return "Risky", "#FF0000", "Avoid if possible."

generated_products = []
id_counter = 6

for p in new_products_data:
    score = random.randint(30, 100)
    label, color, verdict = get_score_details(score)
    
    product = {
        "id": f"p{id_counter}",
        "categoryId": p["cat"],
        "name": p["name"],
        "quantity": "1 Unit",
        "price": round(random.uniform(2.0, 20.0), 2),
        "image": f"require('../../assets/images/products/{p['img']}')",
        "description": f"Delicious {p['name']} from {p['brand']}.",
        "brand": p["brand"],
        "categories": ["General"],
        "qrCode": str(random.randint(1000000000000, 9999999999999)),
        "score": score,
        "scoreLabel": label,
        "scoreColor": color,
        "verdict": verdict,
        "eatingInstructions": ["Store in a cool place."],
        "nutrients": []
    }
    generated_products.append(product)
    id_counter += 1

all_products = existing_products + generated_products

print("export const PRODUCTS = [")
for p in all_products:
    print("  {")
    for k, v in p.items():
        if k == "image":
             print(f"    {k}: {v},")
        elif isinstance(v, str):
            print(f"    {k}: '{v}',")
        elif isinstance(v, list):
             # Handle list of objects or strings
             if len(v) > 0 and isinstance(v[0], dict):
                 print(f"    {k}: [")
                 for item in v:
                     print("      {", end="")
                     kv_pairs = []
                     for sk, sv in item.items():
                         kv_pairs.append(f"{sk}: '{sv}'")
                     print(", ".join(kv_pairs) + " },")
                 print("    ],")
             else:
                 print(f"    {k}: {v},")
        else:
            print(f"    {k}: {v},")
    print("  },")
print("];")
