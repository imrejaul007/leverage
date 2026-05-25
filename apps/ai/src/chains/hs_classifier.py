"""
HS Code Classifier chain
"""
from typing import List, Dict, Any, Optional
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
import os
import json

HS_CLASSIFIER_TEMPLATE = """You are an expert customs classifier for the Harmonized System (HS) of tariff classification.

Classify the following product description into the appropriate HS code.

Product Description: {product_description}
Origin Country: {origin_country}
Destination Country: {destination_country}

Return a JSON response with:
- predicted_hs_code: The most likely HS code (6-digit level minimum)
- confidence: Your confidence in this classification (0.0-1.0)
- description: Brief description of the classified product
- category: The broad category (e.g., "Machinery", "Textiles")
- alternative_codes: Other possible classifications with reasons
- restrictions: Any known import/export restrictions for this product
- notes: Additional classification notes"""

class HSClassifierChain:
    """Chain for HS code classification."""

    # Common HS code mappings for quick lookup
    HS_LOOKUP = {
        "computer": {"code": "8471.30", "description": "Portable digital computers"},
        "laptop": {"code": "8471.30", "description": "Portable digital computers"},
        "phone": {"code": "8517.12", "description": "Telephones for cellular networks"},
        "smartphone": {"code": "8517.12", "description": "Telephones for cellular networks"},
        "vehicle": {"code": "8703.23", "description": "Motor vehicles"},
        "car": {"code": "8703.23", "description": "Motor vehicles"},
        "clothing": {"code": "6209.20", "description": "Babies' garments of cotton"},
        "shoes": {"code": "6403.99", "description": "Footwear"},
        "furniture": {"code": "9403.60", "description": "Wooden furniture"},
        "machine": {"code": "8479.89", "description": "Machines and mechanical appliances"},
        "chemical": {"code": "2933.59", "description": "Heterocyclic compounds"},
        "food": {"code": "2001.90", "description": "Other vegetables prepared"},
    }

    def __init__(self):
        self.llm = ChatOpenAI(
            model=os.getenv("LLM_MODEL", "gpt-4o"),
            temperature=0.1,
            api_key=os.getenv("OPENAI_API_KEY")
        )
        self.prompt = PromptTemplate.from_template(HS_CLASSIFIER_TEMPLATE)

    async def classify(self, product_description: str, origin_country: str = "US", destination_country: str = "US") -> Dict[str, Any]:
        """Classify product to HS code."""
        desc_lower = product_description.lower()

        # Quick lookup first
        for keyword, data in self.HS_LOOKUP.items():
            if keyword in desc_lower:
                return {
                    "predicted_hs_code": data["code"],
                    "confidence": 0.7,
                    "description": data["description"],
                    "category": self._get_category(data["code"]),
                    "alternative_codes": [],
                    "restrictions": self._check_restrictions(data["code"], origin_country, destination_country),
                    "notes": "Quick match from keyword lookup"
                }

        # Use LLM for complex classification
        try:
            formatted = self.prompt.format(
                product_description=product_description,
                origin_country=origin_country,
                destination_country=destination_country
            )
            response = await self.llm.apredict(formatted)
            return self._parse_classification(response)
        except Exception as e:
            return self._fallback_classification(product_description)

    def _get_category(self, hs_code: str) -> str:
        """Get category from HS code prefix."""
        categories = {
            "84": "Machinery & Equipment",
            "85": "Electrical Machinery",
            "87": "Vehicles",
            "61": "Apparel (Knitted)",
            "62": "Apparel (Woven)",
            "64": "Footwear",
            "94": "Furniture",
            "29": "Chemicals",
            "30": "Pharmaceuticals",
        }
        return categories.get(hs_code.split(".")[0], "Other goods")

    def _check_restrictions(self, hs_code: str, origin: str, dest: str) -> List[str]:
        """Check for trade restrictions."""
        restrictions = []

        # License requirements for certain HS codes
        license_codes = ["8471", "8517", "8703", "9001"]
        if any(hs_code.startswith(code) for code in license_codes):
            restrictions.append("May require export license")

        # Sanctioned countries
        sanctioned = ["IR", "KP", "SY", "CU", "VE", "RU"]
        if origin in sanctioned or dest in sanctioned:
            restrictions.append("Additional license requirements due to country restrictions")

        return restrictions

    def _parse_classification(self, response: str) -> Dict[str, Any]:
        """Parse LLM classification response."""
        try:
            # Try to extract JSON from response
            if "```json" in response:
                json_str = response.split("```json")[1].split("```")[0]
            elif "```" in response:
                json_str = response.split("```")[1].split("```")[0]
            else:
                json_str = response

            data = json.loads(json_str.strip())
            if "category" not in data and "predicted_hs_code" in data:
                data["category"] = self._get_category(data["predicted_hs_code"])
            return data
        except:
            return self._fallback_classification(response)

    def _fallback_classification(self, product_description: str) -> Dict[str, Any]:
        """Fallback classification when LLM fails."""
        return {
            "predicted_hs_code": "9999.99.9999",
            "confidence": 0.3,
            "description": product_description,
            "category": "Unclassified",
            "alternative_codes": [],
            "restrictions": ["Consult customs broker for proper classification"],
            "notes": "Classification requires manual review"
        }


# Global instance
hs_classifier = HSClassifierChain()
